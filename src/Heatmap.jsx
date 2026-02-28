import React from "react";

export default function Heatmap({ cases }) {
  // TODO: Implement co-occurrence matrix logic
  return (
    <div style={{
      padding: 40,
      background: '#18181B',
      borderRadius: 12,
      color: '#FAFAFA',
      minHeight: 400,
      boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
      margin: 32
    }}>
      <h2 style={{color:'#FAFAFA'}}>Heatmap (Co-occurrence Matrix)</h2>
      <p style={{color:'#A1A1AA'}}>Coming soon...</p>
    </div>
  );
}
