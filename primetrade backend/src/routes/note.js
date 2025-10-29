const express = require("express");
const Note = require("../models/note");
const { userAuth } = require("../middleware/auth");
const noteRouter = express.Router();

// CREATE
noteRouter.post("/", userAuth, async (req, res) => {
  try {
    const note = new Note({ ...req.body, userId: req.user._id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ (get all notes for logged-in user)
noteRouter.get("/", userAuth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
noteRouter.put("/:id", userAuth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
noteRouter.delete("/:id", userAuth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = noteRouter;
