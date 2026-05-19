const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const radioFrequencies = {
  data: [
    {
      id: "RF-2024-001",
      licenseNumber: "2401-FI-0042",
      frequencyMHz: 97.5,
      bandwidthKHz: 200,
      usageType: "FM broadcasting",
      region: "Helsinki",
      powerWatts: 10000,
      antennaHeightMeters: 312,
      status: "active",
      licenseExpiresAt: "2028-12-31",
    },
    {
      id: "RF-2024-002",
      licenseNumber: "2401-FI-0117",
      frequencyMHz: 450.225,
      bandwidthKHz: 12.5,
      usageType: "private mobile radio",
      region: "Tampere",
      powerWatts: 25,
      antennaHeightMeters: 48,
      status: "active",
      licenseExpiresAt: "2027-06-30",
    },
    {
      id: "RF-2024-003",
      licenseNumber: "2401-FI-0203",
      frequencyMHz: 2400.0,
      bandwidthKHz: 20000,
      usageType: "fixed wireless link",
      region: "Oulu",
      powerWatts: 1,
      antennaHeightMeters: 85,
      status: "suspended",
      licenseExpiresAt: "2026-03-15",
    },
  ],
  meta: {
    total: 3,
    generatedAt: "2026-05-19T00:00:00Z",
    source: "Traficom Radio Frequency Registry (demo)",
  },
};

app.get("/frequencies", (req, res) => {
  res.json(radioFrequencies);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
