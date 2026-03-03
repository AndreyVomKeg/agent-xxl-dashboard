import { useState } from "react";
import { CheckCircle, Clock, AlertTriangle, Upload, X, ChevronRight, Activity, PenTool, Target, Shield } from "lucide-react";
import { G, C, cardStyle } from "../styles/theme";

const AGENTS = [
  {
    id: "analyst", name: "Аналитик", ic: Activity,
    color: G.b, bg: "rgba(66,133,244,0.08)",
    status: "working", task: "Анализ CPA по кампаниям",
    skills: [
      { id: "anomaly", name: "anomaly_detection", desc: "Обнаружение аномалий в показателях", active: true },
      { id: "forecast", name: "forecasting", desc: "Прогноз показателей на 7 дней", active: true },
    ],
    log: [
      { t: "10:32", msg: "Обнаружена аномалия CPA в Конкурентах: +63% от целевого", ok: false },
      { t: "09:15", msg: "Прогноз на завтра: клики +12%, CPA -5%", ok: true },
      { t: "08:00", msg: "Ежедневный отчёт сформирован", ok: true },
    ],
  },
  {
    id: "copywriter", name: "Копирайтер", ic: PenTool,
    color: G.g, bg: "rgba(52,168,83,0.08)",
    status: "working", task: "Генерация объявлений «Услуги»",
    skills: [
      { id: "brand", name: "brand_voice", desc: "Сохранение тона бренда", active: true },
      { id: "formats", name: "ad_formats", desc: "RSA, ETA, адаптивные", active: true },
    ],
    log: [
      { t: "10:45", msg: "3 RSA-объявления готовы к запуску", ok: true },
      { t: "10:20", msg: "Анализ топ-объявлений конкурентов завершён", ok: true },
    ],
  },
  {
    id: "optimizer", name: "Оптимизатор", ic: Target,
    color: G.o, bg: "rgba(251,188,5,0.08)",
    status: "idle", task: "Последнее: бюджет +10%",
    skills: [
      { id: "bidding", name: "bidding", desc: "Правила управления ставками", active: true },
      { id: "budget", name: "budget_rules", desc: "Автораспределение бюджета", active: true },
    ],
    log: [
      { t: "09:00", msg: "Бюджет ретаргетинга +10%", ok: true },
      { t: "08:30", msg: "Ставки скорректированы для 12 слов", ok: true },
    ],
  },
  {
    id: "auditor", name: "Аудитор", ic: Shield,
    color: G.r, bg: "rgba(234,67,53,0.08)",
    status: "alert", task: "Конфликт минус-слов в Поиске",
    skills: [
      { id: "check", name: "checklist", desc: "Предзапусковый чеклист", active: true },
      { id: "quality", name: "quality_score", desc: "Контроль значения ключевых слов", active: true },
    ],
    log: [
      { t: "10:50", msg: "Конфликт: «ремонт» в адгруппе и минусах одновременно", ok: false },
      { t: "09:30", msg: "Чеклист «Бренд»: все пункты выполнены", ok: true },
    ],
  },
];

export default function Agents() {
  const [selected, setSelected] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const ag = AGENTS.find(a => a.id === selected);

  return (
    <div style={{ display: "grid", gridTemplateColumns: selected ? "320px 1fr" : "1fr", gap: 20, transition: "all 0.3s" }}>
      {/* Agent cards list */}
      <div>
        {AGENTS.map(a => {
          const Icon = a.ic;
          return (
          <div key={a.id} onClick={() => setSelected(selected === a.id ? null : a.id)}
            style={{
              ...cardStyle, marginBottom: 12, cursor: "pointer",
              padding: "16px 20px",
              border: "1px solid " + (selected === a.id ? a.color + "50" : C.bd),
              background: selected === a.id ? a.bg : C.sf,
              transition: "all 0.2s",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: a.bg, border: "1px solid " + a.color + "30",
              }}><Icon size={22} style={{ color: a.color }} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{a.name}</div>
                <div style={{ fontSize: 14, color: C.tt, marginTop: 2 }}>{a.task}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: a.status === "working" ? G.g : a.status === "alert" ? G.r : G.o,
                  boxShadow: "0 0 0 3px " + (a.status === "working" ? G.g : a.status === "alert" ? G.r : G.o) + "30",
                }} />
                <span style={{ fontSize: 14, color: C.tt }}>
                  {a.status === "working" ? "Работает" : a.status === "alert" ? "Внимание!" : "Ожидает"}
                </span>
                <ChevronRight size={16} style={{ color: C.tt, transform: selected === a.id ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
              </div>
            </div>

            {/* Skills mini */}
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {a.skills.map(sk => (
                <span key={sk.id} style={{
                  fontSize: 13, padding: "3px 8px", borderRadius: 6,
                  background: sk.active ? a.bg : C.sa,
                  color: sk.active ? a.color : C.tt,
                  border: "1px solid " + (sk.active ? a.color + "30" : C.bd),
                }}>{sk.name}</span>
              ))}
            </div>
          </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {ag && (() => {
        const AgIcon = ag.ic;
        return (
        <div style={{ ...cardStyle, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: ag.bg, border: "1px solid " + ag.color + "40",
            }}><AgIcon size={26} style={{ color: ag.color }} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 600 }}>{ag.name}</div>
              <div style={{ fontSize: 15, color: C.tt }}>{ag.task}</div>
            </div>
            <button onClick={() => setShowSkillModal(true)} style={{
              padding: "8px 16px", borderRadius: 10, border: "none",
              background: "#c7623e", color: "#FFF", fontSize: 15, fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <Upload size={14} />Загрузить скилл
            </button>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Скиллы ({ag.skills.length})</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {ag.skills.map(sk => (
                <div key={sk.id} style={{
                  padding: "12px 14px", borderRadius: 10,
                  background: sk.active ? ag.bg : C.sa,
                  border: "1px solid " + (sk.active ? ag.color + "30" : C.bd),
                }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: sk.active ? ag.color : C.tx }}>{sk.name}</div>
                  <div style={{ fontSize: 14, color: C.tt, marginTop: 3 }}>{sk.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity log */}
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Журнал действий</div>
            {ag.log.map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid " + C.bd }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: l.ok ? "rgba(52,168,83,0.1)" : "rgba(234,67,53,0.1)", flexShrink: 0 }}>
                  {l.ok ? <CheckCircle size={13} style={{ color: G.g }} /> : <AlertTriangle size={13} style={{ color: G.r }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, color: C.ts }}>{l.msg}</div>
                  <div style={{ fontSize: 14, color: C.tt, marginTop: 2 }}>{l.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        );
      })()}

      {/* Skill upload modal */}
      {showSkillModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }} onClick={() => setShowSkillModal(false)}>
          <div style={{
            background: C.sf, borderRadius: 16, padding: 28, width: 420,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>Загрузить скилл</div>
              <button onClick={() => setShowSkillModal(false)} style={{ border: "none", background: "none", cursor: "pointer", padding: 4 }}>
                <X size={18} style={{ color: C.tt }} />
              </button>
            </div>
            <textarea
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              placeholder="Опишите скилл для агента..."
              rows={5}
              style={{
                width: "100%", borderRadius: 10, border: "1px solid " + C.bd,
                padding: 12, fontSize: 16, resize: "none",
                background: C.bg, color: C.tx, fontFamily: "inherit", outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
              <button onClick={() => setShowSkillModal(false)} style={{
                padding: "8px 16px", borderRadius: 8, border: "1px solid " + C.bd,
                background: C.sf, color: C.tx, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
              }}>Отмена</button>
              <button onClick={() => setShowSkillModal(false)} style={{
                padding: "8px 16px", borderRadius: 8, border: "none",
                background: "#c7623e", color: "#FFF", fontSize: 15, fontWeight: 500,
                cursor: "pointer", fontFamily: "inherit",
              }}>Загрузить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
