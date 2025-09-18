import Animal from "../models/Animal.js";

// Create animal
export async function createAnimal(req, res) {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json({ message: "Animal added", animal });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

// Get all animals
export async function getAnimals(req, res) {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch animals" });
  }
}

// Get single animal by earTag
export async function getAnimal(req, res) {
  try {
    const animal = await Animal.findOne({ earTag: req.params.earTag });
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json(animal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch animal" });
  }
}

// Update animal by earTag
export async function updateAnimal(req, res) {
  try {
    const animal = await Animal.findOneAndUpdate(
      { earTag: req.params.earTag },
      req.body,
      { new: true }
    );
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal updated", animal });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

// Delete animal by earTag
export async function deleteAnimal(req, res) {
  try {
    const animal = await Animal.findOneAndDelete({ earTag: req.params.earTag });
    if (!animal) return res.status(404).json({ error: "Animal not found" });
    res.json({ message: "Animal deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
