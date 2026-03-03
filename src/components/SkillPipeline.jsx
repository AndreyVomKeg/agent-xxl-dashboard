import { useState } from "react";
import { CheckCircle, Clock, AlertTriangle, ChevronRight, Play, RotateCcw } from "lucide-react";
import { C, G, cardStyle } from "../styles/theme";

const PIPELINE_TEMPLATES = [
  {
    id: "daily_audit",
    name: "Ежедневный аудит",
    desc: "Автоматическая проверка всех кампаний",
    steps: [
      { id: "s1", agent: "analyst", skill: "anomaly_detection", label: "Обнаружение аномалий", status: "done" },
      { id: "s2", agent: "auditor", skill: "checklist", label: "Проверка чеклиста", status: "done" },
      { id: "s3", agent: "optimizer", skill: "bidding", label: "Коррекция ставок", status: "running" },
      { id: "s4", agent: "copywriter", skill: "brand_voice", label: "Обновление объявлений", status: "pending" },
    ],
  },
  {
    id: "launch_prep",
    name: "Подготовка запуска",
    desc: "Пиплайн для новых кампаний",
    steps: [
      { id: "p1", agent: "analyst", skill: "forecasting", label: "Прогноз эффективности", status: "pending" },
      { id: "p2", agent: "copywriter", skill: "ad_formats", label: "Генерация объявлений", status: "pending" },
      { id: "p3", agent: "optimizer", skill: "budget_rules", label: "Настройка бюджета", status: "pending" },
      { id: "p4", agent: "auditor", skill: "quality_score", label: "Финальная проверка", status: "pending" },
    ],
  },
];

const agentColors = { analyst: G.b, copywriter: G.g, optimizer: G.o, auditor: G.r };
const agentEmoji = { analyst: "📊", copywriter: "✏️", optimizer: "⚙️", auditor: "🛡️" };

export default function SkillPipeline() {
  const [pipelines, setPipelines] = useState(PIPELINE_TEMPLATES);
  const [selected, setSelected] = useState("daily_audit");
  const [running, setRunning] = useState(false);

  const pipe = pipelines.find(p => p.id === selected);

  const runPipeline = () => {
    setRunning(true);
    const pendingIdx = pipe.steps.findIndex(s => s.status === "pending");
    if (pendingIdx === -1) {
      // Reset all to pending
      setPipelines(prev => prev.map(p => p.id === selected
        ? { ...p, steps: p.steps.map(s => ({ ...s, status: "pending" })) }
        : p
      ));
      setRunning(false);
      return;
    }
    // Simulate running the next pending step
    setPipelines(prev => prev.map(p => p.id === selected
      ? {
          ...p, steps: p.steps.map((s, i) => {
            if (i === pendingIdx) return { ...s, status: "running" };
            return s;
          })
        }
      : p
    ));
    setTimeout(() => {
      setPipelines(prev => prev.map(p => p.id === selected
        ? {
            ...p, steps: p.steps.map((s, i) => {
              if (i === pendingIdx) return { ...s, status: "done" };
              return s;
            })
          }
        : p
      ));
      setRunning(false);
    }, 1500);
  };

  const resetPipeline = () => {
    setPipelines(prev => prev.map(p => p.id === selected
      ? { ...p, steps: p.steps.map(s => ({ ...s, status: "pending" })) }
      : p
    ));
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20 }}>
      {/* Left: pipeline list */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: C.tt }}>Шаблоны</div>
        {pipelines.map(p => (
          <div key={p.id} onClick={() => setSelected(p.id)}
            style={{
              ...cardStyle, padding: "14px 16px", marginBottom: 8,
              cursor: "pointer",
              border: "1px solid " + (selected === p.id ? C.ac : C.bd),
              background: selected === p.id ? C.al : C.sf,
            }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: selected === p.id ? C.ac : C.tx }}>{p.name}</div>
            <div style={{ fontSize: 13, color: C.tt, marginTop: 3 }}>{p.steps.length} шага</div>
          </div>
        ))}
      </div>

      {/* Right: pipeline detail */}
      {pipe && (
        <div style={{ ...cardStyle, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{pipe.name}</div>
              <div style={{ fontSize: 14, color: C.tt, marginTop: 4 }}>{pipe.desc}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={resetPipeline} style={{
                padding: "7px 14px", borderRadius: 9, border: "1px solid " + C.bd,
                background: C.sf, color: C.tx, fontSize: 14, cursor: "pointer",
                fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5,
              }}>
                <RotateCcw size={13} />Сброс
              </button>
              <button onClick={runPipeline} disabled={running} style={{
                padding: "7px 14px", borderRadius: 9, border: "none",
                background: running ? "rgba(199,98,62,0.5)" : "#c7623e",
                color: "#FFF", fontSize: 14, fontWeight: 500,
                cursor: running ? "default" : "pointer",
                fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5,
              }}>
                <Play size={13} />{running ? "Запуск..." : "Запустить"}
              </button>
            </div>
          </div>

          {/* Steps */}
          <div style={{ position: "relative" }}>
            {pipe.steps.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                {/* Connector line */}
                {i < pipe.steps.length - 1 && (
                  <div style={{
                    position: "absolute",
                    left: 19, top: i * 78 + 40,
                    width: 2, height: 38,
                    background: s.status === "done" ? G.g : C.bd,
                  }} />
                )}

                {/* Step icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: s.status === "done" ? "rgba(52,168,83,0.1)" :
                             s.status === "running" ? "rgba(66,133,244,0.1)" : C.sa,
                  border: "2px solid " + (s.status === "done" ? G.g : s.status === "running" ? G.b : C.bd),
                  fontSize: 18,
                }}>
                  {s.status === "done" ? <CheckCircle size={18} style={{ color: G.g }} /> :
                   s.status === "running" ? <Clock size={18} style={{ color: G.b, animation: "spin 2s linear infinite" }} /> :
                   agentEmoji[s.agent]}
                </div>

                {/* Step content */}
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{s.label}</span>
                    <span style={{
                      fontSize: 12, padding: "2px 7px", borderRadius: 6,
                      background: agentColors[s.agent] + "15",
                      color: agentColors[s.agent],
                    }}>{s.skill}</span>
                  </div>
                  <div style={{ fontSize: 13, color: C.tt, marginTop: 2 }}>
                    {agentEmoji[s.agent]} {s.agent === "analyst" ? "Аналитик" : s.agent === "copywriter" ? "Копирайтер" : s.agent === "optimizer" ? "Оптимизатор" : "Аудитор"}
                    {" · "}
                    {s.status === "done" ? "Выполнено" : s.status === "running" ? "В работе..." : "Ожидает"}
                  </div>
                </div>

                {/* Status badge */}
                <div style={{
                  padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 500,
                  background: s.status === "done" ? "rgba(52,168,83,0.08)" :
                             s.status === "running" ? "rgba(66,133,244,0.08)" : C.sa,
                  color: s.status === "done" ? G.g : s.status === "running" ? G.b : C.tt,
                }}>
                  {s.status === "done" ? "Готово" : s.status === "running" ? "Работает" : "Дожидает"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
