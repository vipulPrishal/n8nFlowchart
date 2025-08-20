import React from "react";

export default function DetailsPanel({ selected, onClear }) {
  return (
    <div
      style={{
        width: "20%",
        minWidth: 240,
        padding: 12,
        background: "#0f0f0f",
        color: "#fff",
        overflowY: "auto",
        borderLeft: "1px solid #222",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 12 }}>Details</div>

      {!selected ? (
        <div style={{ color: "#9ca3af" }}>Select a node to see details.</div>
      ) : (
        <div style={{ display: "grid", gap: 8, fontSize: 12 }}>
          <div>
            <div style={{ color: "#9ca3af" }}>Label</div>
            <div style={{ fontWeight: 600, whiteSpace: "pre-wrap" }}>
              {selected.data?.label || "(no label)"}
            </div>
          </div>

          <div>
            <div style={{ color: "#9ca3af" }}>ID</div>
            <div>{selected.id}</div>
          </div>

          <div>
            <div style={{ color: "#9ca3af" }}>Type</div>
            <div>{selected.type}</div>
          </div>

          <div>
            <div style={{ color: "#9ca3af" }}>Position</div>
            <div>
              x: {Math.round(selected.position?.x ?? 0)}, y:{" "}
              {Math.round(selected.position?.y ?? 0)}
            </div>
          </div>

          {selected.data?.spec && (
            <>
              <div>
                <div style={{ color: "#9ca3af" }}>Shape</div>
                <div>{selected.data.spec.shape}</div>
              </div>
              <div>
                <div style={{ color: "#9ca3af" }}>Size</div>
                <div>
                  w: {selected.data.spec.w}px, h: {selected.data.spec.h}px
                </div>
              </div>
              {selected.data.spec.radius && (
                <div>
                  <div style={{ color: "#9ca3af" }}>Radius</div>
                  <div>{selected.data.spec.radius}</div>
                </div>
              )}
            </>
          )}

          <button
            onClick={onClear}
            style={{
              marginTop: 12,
              border: "1px solid #444",
              background: "#151515",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: 6,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Delete Node
          </button>
        </div>
      )}
    </div>
  );
}
