import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Zap, Check, X, Edit3, Trash2, AlertTriangle, ArrowLeft, CheckCircle } from "lucide-react";
import { G, C } from "../styles/theme";
import { agents } from "../data/mockData";

export default function SkillPipeline({ agentName, file, onClose, onApply }) {
  const agent = agents.find(a => a.nm === agentName);
  const [stage, setStage] = useState("processing"); // processing | review | conflicts | done
  const [progress, setProgress] = useState(0);
  const [rules, setRules] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  // Simulated processing
  useEffect(() => {
    if (stage !== "processing") return;
    const timers = [400, 1000, 1800, 2300, 2700].map((d, i) =>
      setTimeout(() => setProgress([15, 35, 60, 85, 100][i]), d)
    );
    const done = setTimeout(() => {
      setRules([
        { id: 1, t: "Тон: профессиональный, дружелюбный", tp: "tone", pr: "high", on: true, ed: false },
        { id: 2, t: "Запрещены: «дёшево», «халява», «бесплатно»", tp: "restrict", pr: "high", on: true, ed: false },
        { id: 3, t: "Упоминать гарантию в каждом объявлении", tp: "require", pr: "medium", on: true, ed: false },
        { id: 4, t: "Заголовок макс 30 символов", tp: "format", pr: "medium", on: true, ed: false },
        { id: 5, t: "Использовать цифры и конкретные сроки", tp: "style", pr: "low", on: true, ed: false },
        { id: 6, t: "Целевая аудитория: 25-45 лет, доход выше среднего", tp: "audience", pr: "medium", on: true, ed: false },
      ]);
      setConflicts([
        { id: 1, nr: "Запрещено «дёшево» в текстах", or: "Ключевое слово «купить дёшево» в кампании Конкуренты", res: null },
      ]);
      setStage("review");
    }, 3000);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [stage]);

  const handleConfirm = useCallback(() => {
    if (conflicts.some(c => !c.res)) { setStage("conflicts"); return; }
    onApply({
      id: Date.now(),
      nm: file?.name || "skill.pdf",
      sz: "—",
      tp: (file?.name || "").split(".").pop(),
      rl: rules.filter(r => r.on).length,
      isNew: true,
    });
    setStage("done");
    setTimeout(onClose, 2500);
  }, [conflicts, rules, file, onApply, onClose]);

  if (!agent) return null;
  const AI = agent.ic;
  const co = agent.co;

  const progressLabel = progress < 20 ? "Парсинг документа..." :
    progress < 40 ? "Извлечение структуры..." :
    progress < 65 ? "LLM-анализ контента..." :
    progress < 90 ? "Экстракция правил..." : "Финальная проверка...";

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(26,17,8,0.5)",
      backdropFilter: "blur(4px)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={e => { if (e.target === e.currentTarget && stage !== "processing") onClose(); }}>
      <div style={{
        background: C.sf, borderRadius: 20,
        width: stage === "review" || stage === "conflicts" ? 660 : 460,
        maxHeight: "85vh", overflow: "auto",
        boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid " + C.bd,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: co + "15",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><AI size={16} style={{ color: co }} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Skill Pipeline → {agentName}</div>
            <div style={{ fontSize: 14, color: C.tt }}>{file?.name}</div>
          </div>
          {stage !== "processing" && (
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <X size={18} style={{ color: C.tt }} />
            </button>
          )}
        </div>

        {/* PROCESSING */}
        {stage === "processing" && (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <RefreshCw size={32} style={{ color: co, animation: "spin 1.5s linear infinite", marginBottom: 20 }} />
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Обработка документа...</div>
            <div style={{ fontSize: 14, color: C.tt, marginBottom: 24 }}>{progressLabel}</div>
            <div style={{ height: 6, background: C.sa, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", background: co, borderRadius: 3, width: progress + "%", transition: "width 0.4s" }} />
            </div>
          </div>
        )}

        {/* REVIEW */}
        {stage === "review" && (
          <div style={{ padding: 24 }}>
            <div style={{
              background: co + "08", border: "1px solid " + co + "20",
              borderRadius: 12, padding: "12px 16px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <Zap size={16} style={{ color: co }} />
              <span style={{ fontSize: 15 }}>
                Извлечено <b>{rules.length} правил</b> из {file?.name}
              </span>
            </div>

            {/* Rules list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {rules.map(rule => (
                <div key={rule.id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 10,
                  border: "1px solid " + C.bd,
                  opacity: rule.on ? 1 : 0.4,
                }}>
                  {/* Toggle */}
                  <button onClick={() => setRules(p => p.map(r => r.id === rule.id ? { ...r, on: !r.on } : r))}
                    style={{
                      width: 20, height: 20, borderRadius: 6,
                      border: "2px solid " + (rule.on ? co : C.bs),
                      background: rule.on ? co : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", flexShrink: 0,
                    }}>
                    {rule.on && <Check size={12} style={{ color: "#FFF" }} />}
                  </button>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    {rule.ed ? (
                      <input autoFocus value={rule.t}
                        onChange={e => setRules(p => p.map(r => r.id === rule.id ? { ...r, t: e.target.value } : r))}
                        onBlur={() => setRules(p => p.map(r => r.id === rule.id ? { ...r, ed: false } : r))}
                        style={{ width: "100%", border: "none", borderBottom: "2px solid " + co, background: "transparent", fontSize: 15, outline: "none", fontFamily: "inherit" }}
                      />
                    ) : (
                      <div style={{ fontSize: 15 }}>{rule.t}</div>
                    )}
                    <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                      <span style={{ fontSize: 12, padding: "1px 7px", borderRadius: 8, background: C.sa, color: C.tt }}>{rule.tp}</span>
                      <span style={{
                        fontSize: 12, padding: "1px 7px", borderRadius: 8,
                        background: rule.pr === "high" ? C.dl : "rgba(251,188,5,0.1)",
                        color: rule.pr === "high" ? G.r : "#D09D00",
                      }}>{rule.pr}</span>
                    </div>
                  </div>

                  <button onClick={() => setRules(p => p.map(r => r.id === rule.id ? { ...r, ed: true } : r))}
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Edit3 size={13} style={{ color: C.tt }} />
                  </button>
                  <button onClick={() => setRules(p => p.filter(r => r.id !== rule.id))}
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Trash2 size={13} style={{ color: C.tt }} />
                  </button>
                </div>
              ))}
            </div>

            {/* Conflict warning */}
            {conflicts.length > 0 && (
              <div style={{
                background: "rgba(234,67,53,0.04)", border: "1px solid rgba(234,67,53,0.15)",
                borderRadius: 10, padding: "10px 14px", marginBottom: 16,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <AlertTriangle size={14} style={{ color: G.r }} />
                <span style={{ fontSize: 15, fontWeight: 500, color: G.r }}>{conflicts.length} конфликт требует разрешения</span>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={onClose} style={{
                padding: "8px 16px", borderRadius: 8, border: "1px solid " + C.bd,
                background: C.sf, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
              }}>Отменить</button>
              <button onClick={handleConfirm} style={{
                padding: "8px 16px", borderRadius: 8, border: "none",
                background: "#c7623e", color: "#FFF", fontSize: 14, fontWeight: 500,
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <CheckCircle size={14} />
                {conflicts.some(c => !c.res) ? "Разрешить конфликты" : `Применить ${rules.filter(r => r.on).length} правил`}
              </button>
            </div>
          </div>
        )}

        {/* CONFLICTS */}
        {stage === "conflicts" && (
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <button onClick={() => setStage("review")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <ArrowLeft size={18} style={{ color: C.ts }} />
              </button>
              <AlertTriangle size={18} style={{ color: G.r }} />
              <span style={{ fontSize: 16, fontWeight: 600 }}>Разрешение конфликтов</span>
            </div>

            {conflicts.map(cf => (
              <div key={cf.id} style={{
                borderRadius: 12, border: "1px solid rgba(234,67,53,0.15)",
                overflow: "hidden", marginBottom: 16,
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: 14, background: "rgba(234,67,53,0.03)" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: G.r, marginBottom: 4 }}>НОВОЕ ПРАВИЛО</div>
                    <div style={{ fontSize: 15 }}>{cf.nr}</div>
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: G.b, marginBottom: 4 }}>СУЩЕСТВУЮЩЕЕ</div>
                    <div style={{ fontSize: 15 }}>{cf.or}</div>
                  </div>
                </div>
                <div style={{
                  padding: "10px 14px", borderTop: "1px solid " + C.bd,
                  display: "flex", gap: 6, background: C.sa,
                }}>
                  {["new", "old", "both"].map(o => (
                    <button key={o}
                      onClick={() => setConflicts(p => p.map(c => c.id === cf.id ? { ...c, res: o } : c))}
                      style={{
                        padding: "5px 10px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                        cursor: "pointer", fontFamily: "inherit",
                        border: "1px solid " + (cf.res === o ? G.g : C.bd),
                        background: cf.res === o ? C.ol : "transparent",
                        color: cf.res === o ? G.g : C.tx,
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                      {cf.res === o && <Check size={11} />}
                      {o === "new" ? "Применить новое" : o === "old" ? "Оставить старое" : "Оставить оба"}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => { if (conflicts.every(c => c.res)) handleConfirm(); }}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: "none",
                  background: "#c7623e", color: "#FFF", fontSize: 14, fontWeight: 500,
                  cursor: "pointer", fontFamily: "inherit",
                  opacity: conflicts.every(c => c.res) ? 1 : 0.5,
                }}>Применить</button>
            </div>
          </div>
        )}

        {/* DONE */}
        {stage === "done" && (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: C.ol,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <CheckCircle size={28} style={{ color: G.g }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>Скилл успешно применён!</div>
            <div style={{ fontSize: 15, color: C.ts, marginTop: 4 }}>
              {rules.filter(r => r.on).length} правил добавлено для агента «{agentName}»
            </div>
            <div style={{ fontSize: 14, color: C.tt, marginTop: 8 }}>
              Метрики влияния будут доступны через 7 дней
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
