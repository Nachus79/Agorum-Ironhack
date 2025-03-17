const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: String,
    link: { type: String, required: true },
    isOnline: { type: Boolean, required: true, default: false }, //¿QUITAR? (SE PUEDE PONER EN LOCALIZACIÓN)
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
