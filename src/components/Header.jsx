import { Sparkles } from "lucide-react";
import { C } from "../styles/theme";

export default function Header({ tab, setTab }) {
  return (
    <div style={{
      padding: "14px 28px", display: "flex", alignItems: "center",
      justifyContent: "space-between", borderBottom: "1px solid " + C.bd,
      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 12px rgba(60,40,20,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: "linear-gradient(135deg,#C47B5B,#D4A574)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 20H9L12 14L15 20H21L12 2Z" fill="#FFF" opacity="0.9" />
            <circle cx="12" cy="8" r="2.5" fill="#FFF" />
            <circle cx="7" cy="17" r="1.5" fill="#FFF" opacity="0.7" />
            <circle cx="17" cy="17" r="1.5" fill="#FFF" opacity="0.7" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600 }}>Agent XXL</div>
          <div style={{ fontSize: 12, color: C.tt }}>Google Ads · Мультиагентная система</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {["overview", "campaigns", "agents"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "7px 18px", borderRadius: 10, border: "none",
            cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "inherit",
            background: tab === t ? C.al : "transparent",
            color: tab === t ? C.ac : C.tx,
          }}>
            {t === "overview" ? "Обзор" : t === "campaigns" ? "Кампании" : "Агенты"}
          </button>
        ))}
        <div style={{ width: 1, height: 24, background: C.bd, margin: "0 10px" }} />
        <div style={{
          padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500,
          background: "rgba(52,168,83,0.08)", color: "#34A853",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#34A853", animation: "pulse 2s infinite",
          }} />
          4 агента
        </div>
      </div>
    </div>
  );
}
