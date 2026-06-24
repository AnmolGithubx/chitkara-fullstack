const express = require("express");
const router = express.Router();

const processGraph = require("../services/graphProcessor");

router.post("/", (req, res) => {
  try {
    const result = processGraph(req.body.data || []);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;