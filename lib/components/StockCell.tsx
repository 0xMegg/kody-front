export default function StockCell({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 11, color: "var(--k-text-muted)" }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 18,
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
          color,
        }}
      >
        {value.toLocaleString()}
      </span>
    </div>
  );
}
