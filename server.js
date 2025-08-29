const express = require("express");
const speedTest = require("speedtest-net");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/speedtest", async (req, res) => {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
    res.json({
      ping: Math.round(result.ping.latency),
      download: (result.download.bandwidth * 8 / 1e6).toFixed(2),
      upload: (result.upload.bandwidth * 8 / 1e6).toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
