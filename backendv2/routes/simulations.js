const router = require("express").Router();

const Game = require("../models/Game");
const dataTest = require("../models/dataTest");
const { isAuthenticated } = require("../helpers/auth");
let app = require("./index");
const express = require("express");
const path = require("path");

router.get("/simulations/add", isAuthenticated, (req, res) => {
  res.render("simulations/new-simulation");
});

router.get("/menu", isAuthenticated, async (req, res) => {
  res.render("menu/main-menu");
});

router.get("/simulations/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render("simulations/edit-simulation", { note });
});

router.get("/playground/new-simulation", isAuthenticated, async (req, res) => {
  app.use(
    "/playground",
    express.static(path.join(__dirname, "../../frontend"))
  );
  //console.log(path.join(__dirname, "../frontend"));
  res.redirect("index-script.html");
});

router.get("/simulations/load-data-test", isAuthenticated, async (req, res) => {
  const datalist = await dataTest.find({ user: req.user._id}).exec();
  res.send(datalist)
 
})

router.post(
  "/simulations/new-simulation",
  isAuthenticated,
  async (req, res) => {
    req.flash("success_msg", "New stage created for a new simulation");
    res.redirect("/playground/new-simulation");
  }
);

router.post(
  "/simulations/save-data-test",
  isAuthenticated,
  async (req, res) => {
    console.log(JSON.stringify(req.body));
    const { variable } = req.body;
    const newData = new dataTest({ variable });
    newData.user = req.user._id;
    await newData.save();
    req.flash("success_msg", "Data Test saved");
    res.redirect("/menu/main-menu");
  }
);

router.post(
  "/simulations/save-simulation",
  isAuthenticated,
  async (req, res) => {
    //console.log(req.body)
    const data = req.body;
    //const newData = new Game({ data });
    let output = '';
    const object = req.body;
   //console.log(printObject(object))
   console.log(JSON.stringify(data)) 
   //console.log(JSON.stringify(stageParameters))
    //console.log(stageParameters.universeRules)
    //console.log(`A continuación se lee el valor de frontier: ${stageParameters.universeRules.frontier}`)
    const newData = new Game();
    newData.user = req.user._id;
    //newData.stageParameters.universeRules.frontier = stageParameters.universeRules.frontier;
    newData.stageParameters = data.stageParameters;
    newData.simulationParameters = data.simulationParameters;
    await newData.save();
    req.flash("success_msg", "Data Simulation saved");
    res.redirect("/menu/main-menu");
  }
);




router.put(
  "/simulations/edit-simulation/:id",
  isAuthenticated,
  async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect("/simulations");
  }
);

router.delete("/simulations/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Simulation Deleted Successfully");
  res.redirect("/simulations");
});

function printObject(objeto){
  let output = '';
  
  for (let property in objeto) {
    if (typeof objeto === 'object' && objeto !== null){ //Si es objeto
   output += property + ': ' + printObject(objeto[property])+'; ';
    }else{ //si no es objeto
    output += property + ': ' + objeto[property]+'; ';
    }
  }
  return output;
}

module.exports = router;
