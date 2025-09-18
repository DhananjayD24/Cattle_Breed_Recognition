import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function recognizeBreed(req, res) {
  try {
    console.log("Received request for breed recognition");
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = path.resolve(req.file.path);
    const base64Image = fs.readFileSync(imagePath).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Identify the cattle or buffalo breed in this image.Try to give indian name of that breed and if their indian name is not there , write in bracket country name.
Return strictly JSON like:
{
  "predictions": [
    {
      "class": "Brown_Swiss",
      "class_id": 7,
      "confidence": 0.915
    }
  ]
}`;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image,
        },
      },
    ]);

    // Raw text from Gemini
    let text =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 🔑 Clean Markdown fences such as ```json ... ```
    text = text.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();

    // Remove uploaded file to keep server clean
    fs.unlink(imagePath, () => {});

    // Parse cleaned text as JSON
    const parsed = JSON.parse(text);

    res.json(parsed);
  } catch (err) {
    console.error("Breed recognition failed:", err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "Breed recognition failed" });
  }
}
