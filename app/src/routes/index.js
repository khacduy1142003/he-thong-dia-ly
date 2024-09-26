
// module base
const baseDeleteRouter = require("./baseRouter/baseDeleteRouter");
const basePostRouter = require("./baseRouter/basePostRouter");
const baseGetRouter = require("./baseRouter/baseGetRouter");
const basePutRouter = require("./baseRouter/basePutRouter");
const baseJsonRouter = require("./baseRouter/baseJsonRouter");

// module other


function route(app) {

  // base
  app.use("/", baseDeleteRouter);
  app.use("/", basePostRouter);
  app.use("/", baseGetRouter);
  app.use("/", basePutRouter);
  app.use("/", baseJsonRouter);



}

module.exports = route;
