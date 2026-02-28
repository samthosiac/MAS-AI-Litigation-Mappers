
import React, { useMemo, useRef, useEffect } from "react";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";


// Helper to build Sankey data from cases
function buildSankeyData(cases) {
  const nodes = [];
  const nodeMap = {};
  const links = [];
  // Unique claim types and sectors
  cases.forEach(c => {
    if (!nodeMap[c.cl]) {
      nodeMap[c.cl] = nodes.length;
      nodes.push({ name: c.cl });
    }
    if (!nodeMap[c.sec]) {
      nodeMap[c.sec] = nodes.length;
      nodes.push({ name: c.sec });
    }
  });
  // Count flows from claim type to sector
  const linkMap = {};
  cases.forEach(c => {
    const source = nodeMap[c.cl];
    const target = nodeMap[c.sec];
    const key = `${source}->${target}`;
    if (!linkMap[key]) {
      linkMap[key] = { source, target, value: 0 };
      links.push(linkMap[key]);
    }
    linkMap[key].value += 1;
  });
  return { nodes, links };
}

export default function SankeyDiagram({ cases }) {
  const svgRef = useRef();
  const width = 800;
  const height = 500;
  const data = useMemo(() => buildSankeyData(cases), [cases]);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = "";
    const sankeyGen = sankey()
      .nodeWidth(24)
      .nodePadding(18)
      .extent([[40, 20], [width - 40, height - 20]]);
    const sankeyData = sankeyGen({ nodes: data.nodes.map(d => ({ ...d })), links: data.links.map(d => ({ ...d })) });
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.style.background = "none";

    sankeyData.links.forEach(link => {
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", sankeyLinkHorizontal()(link));
      path.setAttribute("stroke", "#60A5FA");
      path.setAttribute("stroke-width", Math.max(1, link.width));
      path.setAttribute("fill", "none");
      path.setAttribute("opacity", 0.4);
      svg.appendChild(path);
    });
    sankeyData.nodes.forEach(node => {
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", node.x0);
      rect.setAttribute("y", node.y0);
      rect.setAttribute("width", node.x1 - node.x0);
      rect.setAttribute("height", node.y1 - node.y0);
      rect.setAttribute("fill", node.index < data.nodes.length/2 ? "#FF6B4A" : "#A78BFA");
      rect.setAttribute("rx", 5);
      svg.appendChild(rect);
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", node.x0 < width/2 ? node.x1 + 8 : node.x0 - 8);
      text.setAttribute("y", (node.y0 + node.y1) / 2 + 4);
      text.setAttribute("text-anchor", node.x0 < width/2 ? "start" : "end");
      text.setAttribute("fill", "#FAFAFA");
      text.setAttribute("font-size", "15");
      text.setAttribute("font-family", "'Outfit',sans-serif");
      text.textContent = node.name;
      svg.appendChild(text);
    });
    svgRef.current.appendChild(svg);
  }, [data]);

  // Match BarChart container style for InsightsTabs
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
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Sankey Diagram: Claim Type → Sector</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <div ref={svgRef} style={{ width: width, height: height }} />
      </div>
    </div>
  );
}
