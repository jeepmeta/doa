import RugOMeter from "./RugOMeter";
import ChainOfPain from "./ChainOfPain";

const pieData = { rugged: 40, dumped: 25, survived: 35 };

export default function DOATelemetry() {
  return (
    <div
      className="w-full overflow-hidden border-brand-grey neon-border-white"
      style={{
        // Parent defines the only “real” layout dimensions.
        // Children are kept pixel-identical using a single scale transform.
        height: "360px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: "1rem",
      }}
    >
      {/* Rug‑O‑Meter (33%) - always square, 1/3 width */}
      <div style={{ flex: "0 0 33.333%", height: "100%", minWidth: "140px" }}>
        <div style={{ width: "100%", height: "100%", aspectRatio: "1 / 1" }}>
          <RugOMeter data={pieData} chain={""} />
        </div>
      </div>

      {/* Chain‑of‑Pain (66%) - same height, 2/3 width */}
      <div style={{ flex: "1 1 auto", height: "100%", minWidth: "200px" }}>
        <ChainOfPain />
      </div>
    </div>
  );
}

