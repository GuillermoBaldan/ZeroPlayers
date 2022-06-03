const router = require("express").Router();

const Game = require("../models/Game");
const { isAuthenticated } = require("../helpers/auth");

router.get("/simulations/add", isAuthenticated, (req, res) => {
  res.render("simulations/new-simulation");
});

router.post(
  "/simulations/new-simulation",
  isAuthenticated,
  async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
      errors.push({ text: "Please Write a title" });
    }
    if (!description) {
      errors.push({ text: "Please Write a description" });
    }
    if (errors.length > 0) {
      res.render("simulations/new-simulation", {
        errors,
        title,
        description,
      });
    } else {
      const newNote = new Note({ title, description });
      newNote.user = req.user._id;
      await newNote.save();
      req.flash("success_msg", "Note Added Successfully");
      res.redirect("/simulations");
    }
  }
);

router.get("/simulations", isAuthenticated, async (req, res) => {
  const notes = await Note.find({ user: req.user._id })
    .sort({ date: "desc" })
    .lean();
  res.render("simulations/all-simulations", { notes });
});

router.get("/simulations/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render("simulations/edit-simulation", { note });
});

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

module.exports = router;
