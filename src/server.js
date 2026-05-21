const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3001;

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

// INTENTIONALLY VULNERABLE — demo for security webinar only
// Vuln: reflected XSS — the `search` query parameter is interpolated
// directly into HTML without sanitization or encoding.
// ZAP active scan detects this as a high-severity finding.
app.get("/", (req, res) => {
  const search = req.query.search || "";
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Traficom Radio Frequency Registry</title>
</head>
<body>
  <h1>Traficom Radio Frequency Registry</h1>
  <p><a href="/frequencies">View all frequency licences (JSON)</a></p>

  <h2>Search licences</h2>
  <form method="GET" action="/">
    <input type="text" name="search" placeholder="Search by region or type" value="${search}">
    <button type="submit">Search</button>
  </form>
  <h3>VULNERABLE: user input reflected without encoding</h3>
  <p>Search results for: ${search}</p>
</body>
</html>`);
});

app.get("/frequencies", (req, res) => {
  res.json(radioFrequencies);
});

// Unsafe: command injection — user input passed directly to exec
app.get("/ping", (req, res) => {
  const host = req.query.host;
  exec(`ping -c 1 ${host}`, (err, stdout) => {
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
