"use client";

import { useState } from "react";

export interface TableColumn<T> {
  key: keyof T & string;
  label: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  width?: number | string;
}

interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  renderCell?: (key: keyof T & string, value: unknown, row: T) => React.ReactNode;
}

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  renderCell,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal == null || bVal == null) return 0;
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      })
    : data;

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                style={{
                  height: 40,
                  padding: "0 16px",
                  backgroundColor: "var(--n-bg-sub)",
                  borderBottom: "1px solid var(--n-border)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--n-text-muted)",
                  textAlign: col.align ?? "left",
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  width: col.width,
                }}
              >
                {col.label}
                {col.sortable && sortKey === col.key && (
                  <span style={{ marginLeft: 4, fontSize: 10 }}>
                    {sortDir === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              key={i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={{
                cursor: onRowClick ? "pointer" : "default",
                backgroundColor: i % 2 === 1 ? "var(--n-bg-sub)" : "transparent",
                transition: "background-color 180ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--n-bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  i % 2 === 1 ? "var(--n-bg-sub)" : "transparent";
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    height: 44,
                    padding: "0 16px",
                    borderBottom: "1px solid var(--n-border)",
                    fontSize: 15,
                    color: "var(--n-text)",
                    textAlign: col.align ?? "left",
                  }}
                >
                  {renderCell
                    ? renderCell(col.key, row[col.key], row)
                    : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
