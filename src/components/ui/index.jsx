import { ChevronDown } from "lucide-react";
import { C, G } from "../../styles/theme";

const agentMeta = {
  analyst:    { emoji: "📊", label: "Аналитик",    color: G.b },
  copywriter: { emoji: "✏️",  label: "Копирайтер", color: G.g },
  optimizer:  { emoji: "⚙️",  label: "Оптимизатор", color: G.o },
  auditor:    { emoji: "🛡️", label: "Аудитор",    color: G.r },
};

export function Badge({ agent }) {
  const m = agentMeta[agent] || {};
  return (
    <span style={{
      fontSize: 13, fontWeight: 500, padding: "3px 8px", borderRadius: 8,
      background: (m.color || "#999") + "15", color: m.color || "#999",
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      {m.emoji} {m.label}
    </span>
  );
}

export function Chevron({ open }) {
  return (
    <ChevronDown
      size={16}
      style={{
        color: C.tt,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
        flexShrink: 0,
      }}
    />
  );
}
