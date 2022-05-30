const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//Initializations
const app = express();
require("./database");

//Setting
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: [
      path.join(app.get("views"), "partials"),
      path.join(app.get("views"), "menu"),
      path.join(app.get("views"), "playground"),
    ],
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use(flash());
//Glbal Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
//Routes
app.use(require("./routes/index"));
app.use(require("./routes/simulations"));
app.use(require("./routes/users"));

//Static Files
//app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "test")));
//app.use('/playground',express.static(path.join(__dirname, "../frontend")));
//app.use(express.static("test"));
//app.use('/test', express.static('public'));

//Server is listenning
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

module.exports = app;

/* Código final
https://github.com/FaztTech/nodejs-notes-app */
