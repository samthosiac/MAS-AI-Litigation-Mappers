import React, { useState } from "react";

// Simple Bar Chart for case counts by year (example)
export default function BarChart({ cases }) {
  const [groupBy, setGroupBy] = useState("year");

  // Helper to get city if available (e.g., from jurisdiction or a city field)
  const getCity = c => c.city || (c.jur && c.jur.split(",")[0].trim()) || "Unknown";

  // Grouping logic
  let counts = {};
  let label = "";
  if (groupBy === "year") {
    counts = cases.reduce((acc, c) => {
      acc[c.yr] = (acc[c.yr] || 0) + 1;
      return acc;
    }, {});
    label = "Year";
  } else if (groupBy === "state") {
    counts = cases.reduce((acc, c) => {
      acc[c.st] = (acc[c.st] || 0) + 1;
      return acc;
    }, {});
    label = "State";
  } else if (groupBy === "city") {
    counts = cases.reduce((acc, c) => {
      const city = getCity(c);
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});
    label = "City";
  }
  const keys = Object.keys(counts).sort();
  const max = Math.max(...Object.values(counts), 1);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      minHeight: 0,
      minWidth: 0,
      padding: 32,
      overflow: "auto",
      background: "#18181B"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Cases by {label}</h2>
        <select value={groupBy} onChange={e => setGroupBy(e.target.value)} style={{ padding: "6px 12px", borderRadius: 6, fontSize: 14 }}>
          <option value="year">Year</option>
          <option value="state">State</option>
          <option value="city">City</option>
        </select>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 240, overflowX: "auto" }}>
        {keys.map((k) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, minWidth: 40 }}>
            <div style={{
              width: 36,
              height: `${(counts[k] / max) * 180}px`,
              background: "linear-gradient(180deg,#60A5FA,#2563EB)",
              borderRadius: 6,
              marginBottom: 8,
              transition: "height .4s"
            }} />
            <span style={{ fontSize: 13, color: "#FAFAFA", fontWeight: 600, wordBreak: "break-all", textAlign: "center" }}>{k}</span>
            <span style={{ fontSize: 12, color: "#60A5FA", fontWeight: 700 }}>{counts[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
