// server/controllers/statsController.js
import Animal from "../models/Animal.js";

/**
 * Overview: total animals, by species, distinct breeds count
 */
export async function overview(req, res) {
  try {
    const total = await Animal.countDocuments();
    const bySpecies = await Animal.aggregate([
      { $group: { _id: "$species", count: { $sum: 1 } } }
    ]);
    const distinctBreeds = await Animal.distinct("breed");
    res.json({
      total,
      bySpecies,
      distinctBreedsCount: distinctBreeds.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute overview" });
  }
}

/**
 * Breeds: count per breed and average confidence
 */
export async function breeds(req, res) {
  try {
    const top = await Animal.aggregate([
      { $group: {
          _id: "$breed",
          count: { $sum: 1 },
          avgConfidence: { $avg: "$breedConfidence" }
      }},
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    // normalize result
    const results = top.map(r => ({
      breed: r._id || "Unknown",
      count: r.count,
      avgConfidence: r.avgConfidence || 0
    }));
    res.json({ breeds: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch breed stats" });
  }
}

/**
 * Age distribution: buckets
 */
export async function ageDistribution(req, res) {
  try {
    // boundaries in months: 0-6,7-12,13-24,25-60,61-120,120+
    const buckets = await Animal.aggregate([
      {
        $bucket: {
          groupBy: "$ageMonths",
          boundaries: [0, 6, 12, 24, 60, 120],
          default: "120+",
          output: { count: { $sum: 1 } }
        }
      }
    ]);
    res.json({ buckets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute age distribution" });
  }
}

/**
 * Low confidence records (threshold param optional, default 0.7)
 */
export async function lowConfidence(req, res) {
  try {
    const threshold = parseFloat(req.query.threshold) || 0.7;
    const items = await Animal.find({ breedConfidence: { $lt: threshold } })
      .sort({ createdAt: -1 })
      .limit(200)
      .select("earTag breed breedConfidence species owner ageMonths createdAt");
    res.json({ threshold, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch low-confidence records" });
  }
}

/**
 * Animals grouped by owner (top owners)
 */
export async function byOwner(req, res) {
  try {
    const topOwners = await Animal.aggregate([
      { $group: { _id: "$owner.name", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    res.json({ owners: topOwners.map(o => ({ owner: o._id || "Unknown", count: o.count }))});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch owner stats" });
  }
}

/**
 * Monthly registrations (requires timestamps in schema)
 */
export async function monthlyRegistrations(req, res) {
  try {
    const monthly = await Animal.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json({ monthly });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute monthly registrations" });
  }
}
