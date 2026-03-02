import { File } from "lucide-react";
import { G, C } from "../../styles/theme";

// Agent badge with color
export const Badge = ({ agent }) => {
  const colors = {
    "Аналитик": G.b,
    "Оптимизатор": G.g,
    "Копирайтер": "#D09D00",
    "Аудитор": G.r,
  };
  const co = colors[agent] || G.b;
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "3px 10px",
      borderRadius: 20, background: co + "18", color: co,
    }}>
      {agent}
    </span>
  );
};

// Status dot with label
export const StatusDot = ({ status }) => {
  const colors = { working: G.g, idle: C.tt, alert: G.r };
  const labels = { working: "Работает", idle: "Ожидает", alert: "Внимание" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: colors[status],
        animation: status === "working" ? "pulse 2s infinite" : "none",
      }} />
      <span style={{ fontSize: 12, fontWeight: 500, color: colors[status] }}>
        {labels[status]}
      </span>
    </div>
  );
};

// Chevron arrow
export const Chevron = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
    <path d="M6 4L10 8L6 12" stroke={C.ts} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// File type icon
export const FileIcon = ({ type }) => {
  const colors = { pdf: G.r, md: G.b, txt: C.ts, json: G.g };
  const co = colors[type] || C.tt;
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      background: co + "12",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <File size={14} style={{ color: co }} />
    </div>
  );
};
