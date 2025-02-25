const express = require("express");
const Progress = require("../models/Progress"); // Import the Progress model
const router = express.Router();

// ✅ GET progress for a user and level
router.get("/:userId/:levelFile", async (req, res) => {
  try {
    const { userId, levelFile } = req.params;
    console.log(`Fetching progress for User: ${userId}, Level: ${levelFile}`);

    const progress = await Progress.findOne({ userId, levelFile });

    if (progress) {
      console.log("Progress Found:", progress);
      res.json({ lastLesson: progress.lastLesson });
    } else {
      console.log("No progress found, returning default 0.");
      res.json({ lastLesson: 0 }); // Default progress if not found
    }
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ POST or UPDATE progress
router.post("/", async (req, res) => {
  try {
    const { userId, levelFile, lastLesson } = req.body;

    console.log("Received Progress Update Request:", req.body);

    if (!userId || !levelFile) {
      return res.status(400).json({ error: "Missing userId or levelFile" });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId, levelFile },
      { lastLesson },
      { new: true, upsert: true } // Create if doesn't exist
    );

    console.log("Saved Progress:", progress);
    res.json({ message: "Progress saved successfully", progress });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;