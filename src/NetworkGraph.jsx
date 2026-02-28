
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "./NetworkGraph.module.css";


// Helper to build network data: nodes = organizations, links = shared cases
function buildNetworkData(cases) {
  const orgSet = new Set();
  const links = [];
  cases.forEach(c => {
    // Split organizations by comma, trim
    const orgs = (c.df + "," + (c.pl || "")).split(",").map(s => s.trim()).filter(Boolean);
    orgs.forEach(o => orgSet.add(o));
    // Link every pair in this case
    for (let i = 0; i < orgs.length; i++) {
      for (let j = i + 1; j < orgs.length; j++) {
        links.push({ source: orgs[i], target: orgs[j], case: c.name });
      }
    }
  });
  const nodes = Array.from(orgSet).map(name => ({ id: name }));
  return { nodes, links };
}

export default function NetworkGraph({ cases }) {
  const svgRef = useRef();
  const width = 800;
  const height = 500;
  const data = buildNetworkData(cases);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = "";
    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background", "none");

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-220))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#A78BFA")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .attr("stroke", "#FFF")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 16)
      .attr("fill", "#60A5FA")
      .call(drag(simulation));

    const label = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", 11)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "'Outfit',sans-serif")
      .attr("text-anchor", "middle")
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, [cases]);

  // Use CSS module for container and title
  return (
    <div className={styles["network-graph-container"]}>
      <div>
        <h2 className={styles["network-graph-title"]}>Network Graph: Organizations (Defendants & Plaintiffs)</h2>
      </div>
      <div className={styles["network-graph-svg-wrapper"]}>
        <div ref={svgRef} style={{ width: width, height: height }} />
      </div>
    </div>
  );
}
