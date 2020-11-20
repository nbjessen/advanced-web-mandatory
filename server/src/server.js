/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const checkJwt = require("express-jwt");

/**** Configuration ****/
const app = express();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/questions'; 

async function createServer() {
  // Connect db
  await mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

  // Create data
  const questionDB = require('./questionDB')(mongoose);
  // await questionDB.bootstrap();
  
  // Require routes
  const routes = require("./routes")(questionDB); // Inject mongoose into routes module

  // Add middleware
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  // Add routes
  app.use("/api/", routes);

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );
  
  const openPaths = [
    // Open "/api/users/authenticate" for POST requests
    { url: "/api/users/authenticate", methods: ["POST"] },
  
    // Open everything that doesn't begin with "/api" REGULAR EXPRESSION NÅR MAN SKAL HAVE ID TIL ET SPØRGSMÅL
    /^(?!\/api).*/gim,
  
    // Open all GET requests on the form "/api/questions/*" using a regular expression
    { url: /\/api\/questions\.*/gim, methods: ["GET"] }
  ];

  // The secret value. Defaults to "the cake is a lie" THE SALT.
  const secret = process.env.SECRET || "the cake is a lie";

  // Validate the user token using checkJwt middleware.
  app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths }));

  // This middleware checks the result of checkJwt above
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") { // If the user didn't authorize correctly
    res.status(401).json({ error: err.message }); // Return 401 with error message.
  } else {
    next(); // If no errors, forward request to next middleware or route handler
  }
});

// The routes
const usersRouter = require("./usersRouter")(secret);
const questionRouter = require("./routes")(questionDB);
app.use("/api/users", usersRouter);
app.use("/api/questions", questionRouter);


app.listen(port, () => console.log(`Auth Kittens API running on port ${port}!`));
  return app;
}

module.exports = createServer;