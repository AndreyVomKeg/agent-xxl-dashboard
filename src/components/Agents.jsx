import { useState, useRef } from "react";
import { Upload, Trash2 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { G, C, SH, cardStyle } from "../styles/theme";
import { agents, agentPerformance, skillVersions, impactData } from "../data/mockData";
import { Chevron, StatusDot, FileIcon } from "./ui";

export default function Agents({ skills, setSkills, onStartPipeline }) {
  const [expanded, setExpanded] = useState(null);
  const [subTab, setSubTab] = useState("skills");
  const [dragOver, setDragOver] = useState(null);
  const fileRefs = useRef({});

  return (
    <>
      {/* Agent summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {agents.map((a, i) => {
          const AI = a.ic;
          return (
            <div key={i} onClick={() => setExpanded(expanded === a.nm ? null : a.nm)}
              style={{ ...cardStyle, padding: "18px 20px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: a.co + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AI size={18} style={{ color: a.co }} />
                </div>
                <StatusDot status={a.st} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>{a.nm}</div>
              <div style={{ fontSize: 14, color: C.tt }}>{a.imp} · {(skills[a.nm] || []).length} скиллов</div>
            </div>
          );
        })}
      </div>

      {/* Performance chart */}
      <div style={{ ...cardStyle, padding: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Эффективность агентов</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={agentPerformance} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(60,40,20,0.05)" />
            <XAxis dataKey="name" tick={{ fill: C.tt, fontSize: 14 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: C.tt, fontSize: 14 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#FFF", border: "1px solid " + C.bd, borderRadius: 10, fontSize: 15 }} />
            <Bar dataKey="tasks" fill={G.b} radius={[6, 6, 0, 0]} name="Задачи" />
            <Bar dataKey="accepted" fill={G.g} radius={[6, 6, 0, 0]} name="Принято" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Agent expandable cards */}
      {agents.map((a, i) => {
        const isE = expanded === a.nm;
        const sks = skills[a.nm] || [];
        const vers = skillVersions[a.nm] || [];
        const imp = impactData[a.nm];
        const AI = a.ic;

        return (
          <div key={i} style={{ ...cardStyle, marginBottom: 16, overflow: "hidden" }}>
            {/* Header */}
            <div onClick={() => setExpanded(isE ? null : a.nm)}
              style={{ display: "flex", alignItems: "center", padding: "18px 24px", cursor: "pointer", gap: 14 }}>
              <Chevron open={isE} />
              <div style={{ width: 32, height: 32, borderRadius: 8, background: a.co + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AI size={16} style={{ color: a.co }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 500 }}>{a.nm}</div>
                <div style={{ fontSize: 14, color: C.tt }}>{a.ds}</div>
              </div>
              <StatusDot status={a.st} />
              <span style={{ fontSize: 14, color: C.ts }}>
                Скиллов: <span style={{ fontWeight: 500, color: a.co }}>{sks.length}</span>
              </span>
            </div>

            {/* Expanded content */}
            {isE && (
              <div style={{ borderTop: "1px solid " + C.bd }}>
                {/* Sub-tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid " + C.bd }}>
                  {[{ k: "skills", l: "Скиллы" }, { k: "versions", l: "Версии" }, { k: "impact", l: "Метрики" }].map(t => (
                    <button key={t.k} onClick={e => { e.stopPropagation(); setSubTab(t.k); }}
                      style={{
                        padding: "12px 20px", border: "none", cursor: "pointer",
                        fontSize: 15, fontWeight: 500, fontFamily: "inherit",
                        background: subTab === t.k ? C.sa : "transparent",
                        borderBottom: subTab === t.k ? "2px solid " + a.co : "2px solid transparent",
                        color: subTab === t.k ? C.tx : C.tt,
                      }}>{t.l}</button>
                  ))}
                </div>

                <div style={{ padding: 20 }}>
                  {/* SKILLS sub-tab */}
                  {subTab === "skills" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 8 }}>ТЕКУЩАЯ ЗАДАЧА</div>
                        <div style={{ padding: "10px 14px", borderRadius: 10, background: a.co + "08", border: "1px solid " + a.co + "20", fontSize: 15, marginBottom: 14 }}>{a.tk}</div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 8 }}>ПОСЛЕДНИЕ ДЕЙСТВИЯ</div>
                        {a.acts.map((ac, j) => (
                          <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 14 }}>
                            <span style={{ color: C.tt, minWidth: 32 }}>{ac.t}</span>
                            <span style={{ color: C.ts }}>{ac.x}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        {/* Upload area */}
                        <div
                          onDragOver={e => { e.preventDefault(); setDragOver(a.nm); }}
                          onDragLeave={() => setDragOver(null)}
                          onDrop={e => { e.preventDefault(); setDragOver(null); if (e.dataTransfer.files.length) onStartPipeline(a.nm, e.dataTransfer.files); }}
                          onClick={() => fileRefs.current[a.nm]?.click()}
                          style={{
                            border: "2px dashed " + (dragOver === a.nm ? a.co : C.bs),
                            borderRadius: 12, padding: "18px 16px", marginBottom: 12,
                            cursor: "pointer", background: dragOver === a.nm ? a.co + "08" : "transparent",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                          }}>
                          <input
                            ref={el => { fileRefs.current[a.nm] = el; }}
                            type="file" accept=".pdf,.md,.txt,.json" style={{ display: "none" }}
                            onChange={e => { if (e.target.files.length) onStartPipeline(a.nm, e.target.files); e.target.value = ""; }}
                          />
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: a.co + "12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Upload size={16} style={{ color: a.co }} />
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 500 }}>Загрузить скилл</div>
                          <div style={{ fontSize: 13, color: C.tt }}>PDF, MD, TXT, JSON</div>
                        </div>

                        {/* Skills list */}
                        {sks.map(s => (
                          <div key={s.id} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "8px 10px", borderRadius: 8, marginBottom: 4,
                            border: "1px solid " + (s.isNew ? a.co + "30" : C.bd),
                          }}>
                            <FileIcon type={s.tp} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 15, fontWeight: 500 }}>{s.nm}</div>
                              <div style={{ fontSize: 13, color: C.tt }}>{s.sz} · {s.rl} правил</div>
                            </div>
                            <button onClick={e => { e.stopPropagation(); setSkills(p => ({ ...p, [a.nm]: p[a.nm].filter(x => x.id !== s.id) })); }}
                              style={{ background: "none", border: "none", cursor: "pointer" }}>
                              <Trash2 size={13} style={{ color: C.tt }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VERSIONS sub-tab */}
                  {subTab === "versions" && (
                    <div>
                      {vers.length === 0 ? (
                        <div style={{ textAlign: "center", padding: 24, color: C.tt, fontSize: 15 }}>История версий появится после первого обновления скиллов</div>
                      ) : (
                        <div style={{ position: "relative", paddingLeft: 24 }}>
                          <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: C.bd }} />
                          {vers.map((v, j) => (
                            <div key={j} style={{ position: "relative", marginBottom: 20, paddingLeft: 20 }}>
                              <div style={{ position: "absolute", left: -24, top: 4, width: 16, height: 16, borderRadius: "50%", background: v.s === "current" ? a.co : v.s === "good" ? G.g : G.r, border: "3px solid " + C.sf }} />
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <span style={{ fontSize: 16, fontWeight: 500 }}>v{v.v}</span>
                                  {v.s === "current" && <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 10, background: a.co + "15", color: a.co }}>Текущая</span>}
                                  {v.s === "bad" && <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 10, background: C.dl, color: G.r }}>Ухудшение</span>}
                                </div>
                                <div style={{ fontSize: 14, color: C.tt, marginTop: 2 }}>{v.dt} · {v.ch}</div>
                                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                                  {Object.entries(v.mt).map(([k, val]) => (
                                    <span key={k} style={{
                                      fontSize: 13, padding: "2px 8px", borderRadius: 8,
                                      background: String(val).startsWith("+") ? C.ol : String(val).startsWith("-") ? C.dl : C.sa,
                                      color: String(val).startsWith("+") ? G.g : String(val).startsWith("-") ? G.r : C.tt,
                                    }}>{k}: {val}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* IMPACT sub-tab */}
                  {subTab === "impact" && (
                    <div>
                      {imp ? (
                        <>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                            {[
                              { l: "До", v: a.nm === "Копирайтер" ? "5.2% CTR" : "380₽", c: C.tt },
                              { l: "После", v: a.nm === "Копирайтер" ? "6.8% CTR" : "290₽", c: G.g },
                              { l: "Δ", v: a.nm === "Копирайтер" ? "+1.6%" : "-23.7%", c: G.g },
                            ].map((m, j) => (
                              <div key={j} style={{ background: C.bg, borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                                <div style={{ fontSize: 22, fontWeight: 500, color: m.c }}>{m.v}</div>
                                <div style={{ fontSize: 13, color: C.tt, marginTop: 2 }}>{m.l}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ background: C.bg, borderRadius: 12, padding: 16 }}>
                            <ResponsiveContainer width="100%" height={140}>
                              <LineChart data={imp}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(60,40,20,0.06)" />
                                <XAxis dataKey="w" tick={{ fill: C.tt, fontSize: 13 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: C.tt, fontSize: 13 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: "#FFF", border: "1px solid " + C.bd, borderRadius: 8, fontSize: 14 }} />
                                <Line type="monotone" dataKey="b" stroke={C.tt} strokeWidth={2} strokeDasharray="6 4" dot={false} name="До" />
                                <Line type="monotone" dataKey="a" stroke={G.g} strokeWidth={2.5} dot={false} name="После" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </>
                      ) : (
                        <div style={{ textAlign: "center", padding: 24, color: C.tt, fontSize: 15 }}>
                          Метрики влияния появятся через 7 дней после обновления скиллов
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
