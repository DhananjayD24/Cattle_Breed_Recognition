import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  earTag: { type: String, unique: true, required: true },  // Unique ID
  breed: { type: String, required: true },
  breedConfidence: Number,
  species: { type: String, required: true },  // Cattle / Buffalo
  gender: String,
  ageMonths: Number,  // age in months
  owner: {
    name: String,
    contact: String,
    village: String,
    district: String,
    state: String
  },
  image: String // optional
}, { timestamps: true });

export default mongoose.model("Animal", animalSchema);
