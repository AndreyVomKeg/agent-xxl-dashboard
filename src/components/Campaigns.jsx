import { useState } from "react";
import { TrendingUp, TrendingDown, Eye, List, Activity, Settings, Plus, Play, Pause } from "lucide-react";
import { G, C, SH, cpaColor, roasColor, cardStyle } from "../styles/theme";
import { campaignDetails } from "../data/mockData";
import { Chevron, Badge } from "./ui";

const stCol = { active: "#34A853", draft: "#D09D00", paused: "#9C8E80" };
const stLbl = { active: "Активна", draft: "Черновик", paused: "Пауза" };
const stBg = { active: "rgba(52,168,83,0.08)", draft: "rgba(251,188,5,0.1)", paused: "#EDE6DB" };
const autoLbl = { watch: "👁 Наблюдение", semi: "⚡ Полуавтомат", auto: "🤖 Автопилот" };
const tpLbl = { search: "Поиск", display: "РСЯ", retarget: "Ретаргетинг" };

export default function Campaigns({ camps, setCamps, onNewCampaign }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const [subTab, setSubTab] = useState("overview");

  const filtered = filter === "all" ? camps : camps.filter(c => c.s === filter);

  return (
    <>
      {/* Filters + New button */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        {[{ k: "all", l: "Все" }, { k: "active", l: "Активные" }, { k: "draft", l: "Черновики" }, { k: "paused", l: "Пауза" }].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} style={{
            padding: "8px 16px", borderRadius: 10, fontSize: 15, fontWeight: 500,
            cursor: "pointer", fontFamily: "inherit",
            border: "1px solid " + (filter === f.k ? C.ac : C.bd),
            background: filter === f.k ? C.al : C.sf,
            color: filter === f.k ? C.ac : C.tx,
          }}>
            {f.l}
            <span style={{ fontSize: 13, color: C.tt, marginLeft: 4 }}>
              {camps.filter(c => f.k === "all" || c.s === f.k).length}
            </span>
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={onNewCampaign} style={{
          padding: "8px 18px", borderRadius: 10, border: "none",
          background: "#c7623e", color: "#FFF", fontSize: 15, fontWeight: 500,
          cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Plus size={14} />Новая кампания
        </button>
      </div>

      {/* Campaign cards */}
      {filtered.map(c => {
        const d = campaignDetails[c.n];
        const isE = expanded === c.id;

        return (
          <div key={c.id} style={{
            ...cardStyle, marginBottom: 12, overflow: "hidden",
            border: "1px solid " + (c.s === "draft" ? "rgba(251,188,5,0.25)" : C.bd),
          }}>
            {/* Header row */}
            <div onClick={() => { setExpanded(isE ? null : c.id); setSubTab("overview"); }}
              style={{ display: "flex", alignItems: "center", padding: "16px 20px", cursor: "pointer", gap: 12 }}>
              <Chevron open={isE} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 500 }}>{c.n}</div>
                <div style={{ fontSize: 13, color: C.tt }}>
                  {tpLbl[c.tp] || c.tp} · {c.geo} · {autoLbl[c.auto]}
                </div>
              </div>
              <span style={{
                fontSize: 13, fontWeight: 500, padding: "4px 11px", borderRadius: 20,
                background: stBg[c.s], color: stCol[c.s],
              }}>{stLbl[c.s]}</span>

              {c.s !== "draft" && <>
                <span style={{ fontSize: 15, color: C.tt }}>
                  CPA <span style={{ fontWeight: 500, color: cpaColor(c.cpa) }}>{c.cpa}₽</span>
                </span>
                <span style={{ fontSize: 15, color: C.tt }}>
                  ROAS <span style={{ fontWeight: 500, color: roasColor(c.roas) }}>{c.roas}x</span>
                </span>
                <div>{c.t === "up" ? <TrendingUp size={16} style={{ color: G.g }} /> : <TrendingDown size={16} style={{ color: G.r }} />}</div>
              </>}

              {c.s === "draft" && (
                <button onClick={e => { e.stopPropagation(); setCamps(p => p.map(x => x.id === c.id ? { ...x, s: "active" } : x)); }}
                  style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: G.g, color: "#FFF", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                  <Play size={12} />Запустить
                </button>
              )}
            </div>

            {/* Expanded content */}
            {isE && (
              <div style={{ borderTop: "1px solid " + C.bd }}>
                {/* Sub-tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid " + C.bd }}>
                  {[
                    { k: "overview", l: "Обзор", ic: Eye },
                    { k: "structure", l: "Структура", ic: List },
                    { k: "agentlog", l: "Агенты", ic: Activity },
                    { k: "settings", l: "Настройки", ic: Settings },
                  ].map(t => {
                    const TI = t.ic;
                    return (
                      <button key={t.k} onClick={e => { e.stopPropagation(); setSubTab(t.k); }}
                        style={{
                          padding: "10px 16px", border: "none", cursor: "pointer",
                          fontSize: 14, fontWeight: 500, fontFamily: "inherit",
                          background: subTab === t.k ? C.sa : "transparent",
                          borderBottom: subTab === t.k ? "2px solid " + C.ac : "2px solid transparent",
                          color: subTab === t.k ? C.tx : C.tt,
                          display: "flex", alignItems: "center", gap: 5,
                        }}>
                        <TI size={13} />{t.l}
                      </button>
                    );
                  })}
                </div>

                <div style={{ padding: 20 }}>
                  {/* OVERVIEW sub-tab */}
                  {subTab === "overview" && (
                    <div>
                      {c.s === "draft" ? (
                        <div style={{ textAlign: "center", padding: 20 }}>
                          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>Прогноз от Аналитика</div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                            {[{ l: "Клики/день", v: "120-180" }, { l: "Прогноз CPA", v: "320-450₽" }, { l: "Прогноз CTR", v: "~4.5%" }].map((m, j) => (
                              <div key={j} style={{ background: C.bg, borderRadius: 10, padding: 14, textAlign: "center" }}>
                                <div style={{ fontSize: 20, fontWeight: 500 }}>{m.v}</div>
                                <div style={{ fontSize: 13, color: C.tt, marginTop: 2 }}>{m.l}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginTop: 16, fontSize: 14, color: C.ts, padding: "10px 14px", borderRadius: 10, background: G.g + "08", border: "1px solid " + G.g + "20" }}>
                            🛡️ Аудитор: чеклист пройден. Минус-слова: «своими руками», «видео», «курсы»
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                          {[
                            { l: "Бюджет", v: c.b.toLocaleString() + "₽" },
                            { l: "Расход", v: c.sp.toLocaleString() + "₽" },
                            { l: "CPA", v: c.cpa + "₽", co: cpaColor(c.cpa) },
                            { l: "ROAS", v: c.roas + "x", co: roasColor(c.roas) },
                          ].map((m, j) => (
                            <div key={j} style={{ background: C.bg, borderRadius: 10, padding: 14, textAlign: "center" }}>
                              <div style={{ fontSize: 20, fontWeight: 500, color: m.co || C.tx }}>{m.v}</div>
                              <div style={{ fontSize: 13, color: C.tt, marginTop: 2 }}>{m.l}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* STRUCTURE sub-tab */}
                  {subTab === "structure" && d && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 8 }}>КЛЮЧЕВЫЕ СЛОВА</div>
                        {d.kw.map((k, j) => (
                          <div key={j} style={{
                            display: "flex", justifyContent: "space-between",
                            padding: "8px 10px", borderRadius: 8, marginBottom: 4,
                            border: "1px solid " + (k.qs < 5 ? "rgba(234,67,53,0.12)" : C.bd),
                            background: k.qs < 5 ? "rgba(234,67,53,0.03)" : "transparent",
                          }}>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 500 }}>{k.w}</div>
                              <div style={{ fontSize: 13, color: C.tt }}>
                                {k.m} · QS <span style={{ color: k.qs >= 7 ? G.g : k.qs >= 5 ? "#D09D00" : G.r }}>{k.qs}</span>/10
                              </div>
                            </div>
                            <div style={{ textAlign: "right", fontSize: 14 }}>
                              <div>CTR {k.ctr}%</div>
                              <div style={{ color: cpaColor(k.cpa) }}>CPA {k.cpa}₽</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 8 }}>ОБЪЯВЛЕНИЯ</div>
                        {d.ads.map((a, j) => (
                          <div key={j} style={{ padding: "8px 10px", borderRadius: 8, marginBottom: 4, border: "1px solid " + C.bd }}>
                            <div style={{ fontSize: 15, fontWeight: 500, color: G.b }}>{a.t}</div>
                            <div style={{ fontSize: 13, color: C.tt }}>
                              CTR {a.ctr}% · {a.cv} конв. ·{" "}
                              <span style={{ color: a.st === "testing" ? "#D09D00" : G.g }}>
                                {a.st === "testing" ? "A/B тест" : "Активно"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {subTab === "structure" && !d && (
                    <div style={{ textAlign: "center", padding: 20, color: C.tt, fontSize: 15 }}>
                      {c.s === "draft" ? "Структура будет сгенерирована агентами при запуске" : "Данные загружаются из Google Ads API..."}
                    </div>
                  )}

                  {/* AGENT LOG sub-tab */}
                  {subTab === "agentlog" && (
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 10 }}>ДЕЙСТВИЯ АГЕНТОВ</div>
                      {(c.agActs || []).map((a, j) => (
                        <div key={j} style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "10px 12px", borderRadius: 10, marginBottom: 6,
                          border: "1px solid " + C.bd,
                        }}>
                          <Badge agent={a.ag} />
                          <div style={{ flex: 1, fontSize: 15 }}>{a.x}</div>
                          <span style={{ fontSize: 13, color: C.tt }}>{a.t}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SETTINGS sub-tab */}
                  {subTab === "settings" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 6 }}>БЮДЖЕТ ₽/ДЕНЬ</div>
                        <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 16 }}>{c.b.toLocaleString()}₽</div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 6 }}>ГЕО</div>
                        <div style={{ fontSize: 16, marginBottom: 16 }}>{c.geo}</div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 6 }}>ТИП</div>
                        <div style={{ fontSize: 16 }}>{tpLbl[c.tp] || c.tp}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: C.tt, marginBottom: 6 }}>АВТОНОМИЯ АГЕНТОВ</div>
                        <div style={{ padding: "10px 14px", borderRadius: 10, background: C.bg, marginBottom: 16 }}>
                          {[
                            { k: "watch", l: "👁 Наблюдение", d: "Только рекомендации" },
                            { k: "semi", l: "⚡ Полуавтомат", d: "Мелкие действия автоматически" },
                            { k: "auto", l: "🤖 Автопилот", d: "В рамках заданных лимитов" },
                          ].map(o => (
                            <div key={o.k}
                              onClick={() => setCamps(p => p.map(x => x.id === c.id ? { ...x, auto: o.k } : x))}
                              style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "8px 10px", borderRadius: 8, marginBottom: 4, cursor: "pointer",
                                background: c.auto === o.k ? C.al : "transparent",
                                border: "1px solid " + (c.auto === o.k ? C.ac : "transparent"),
                              }}>
                              <div style={{
                                width: 16, height: 16, borderRadius: "50%",
                                border: "2px solid " + (c.auto === o.k ? C.ac : C.bs),
                                background: c.auto === o.k ? C.ac : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                {c.auto === o.k && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFF" }} />}
                              </div>
                              <div>
                                <div style={{ fontSize: 14, fontWeight: 500 }}>{o.l}</div>
                                <div style={{ fontSize: 13, color: C.tt }}>{o.d}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {c.s === "active" && (
                          <button onClick={() => setCamps(p => p.map(x => x.id === c.id ? { ...x, s: "paused" } : x))}
                            style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(234,67,53,0.3)", background: "rgba(234,67,53,0.08)", color: G.r, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                            <Pause size={12} />Поставить на паузу
                          </button>
                        )}
                        {c.s === "paused" && (
                          <button onClick={() => setCamps(p => p.map(x => x.id === c.id ? { ...x, s: "active" } : x))}
                            style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: G.g, color: "#FFF", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                            <Play size={12} />Возобновить
                          </button>
                        )}
                      </div>
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
