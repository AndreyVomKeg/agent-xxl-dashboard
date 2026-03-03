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
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Группы объявлений</div>
                        {d.adGroups.map((ag, j) => (
                          <div key={j} style={{ background: C.bg, borderRadius: 10, padding: 12, marginBottom: 8, border: "1px solid " + C.bd }}>
                            <div style={{ fontSize: 15, fontWeight: 500 }}>{ag.name}</div>
                            <div style={{ fontSize: 13, color: C.tt, marginTop: 4 }}>{ag.keywords.length} ключевых слов · {ag.ads} объявлений</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                              {ag.keywords.map((kw, k) => (
                                <span key={k} style={{ fontSize: 12, padding: "2px 7px", borderRadius: 6, background: C.sa, color: C.ts }}>{kw}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Агентские рекомендации</div>
                        {d.recommendations.map((r, j) => (
                          <div key={j} style={{ fontSize: 14, color: C.ts, padding: "8px 12px", borderRadius: 8, background: C.bg, marginBottom: 6, border: "1px solid " + C.bd }}>
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AGENT LOG sub-tab */}
                  {subTab === "agentlog" && (
                    <div>
                      {[
                        { ag: "analyst", t: "10 мин", msg: "Анализ CPA: текущий CPA " + c.cpa + "₽. Целевой: 300₽. Рекомендую перераспределить бюджет." },
                        { ag: "copywriter", t: "25 мин", msg: "Генерация 3 RSA-объявлений завершена. Лучший прогноз CTR: 6.2%." },
                        { ag: "optimizer", t: "1 ч", msg: "Ставки скорректированы: +8% для высококонвертирующих слов." },
                        { ag: "auditor", t: "2 ч", msg: "Чеклист пройден. 3 минус-слова добавлено." },
                      ].map((lg, j) => (
                        <div key={j} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid " + C.bd }}>
                          <Badge agent={lg.ag} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, color: C.ts }}>{lg.msg}</div>
                            <div style={{ fontSize: 13, color: C.tt, marginTop: 3 }}>{lg.t} назад</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SETTINGS sub-tab */}
                  {subTab === "settings" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Параметры</div>
                        {[
                          { l: "Тип", v: tpLbl[c.tp] || c.tp },
                          { l: "География", v: c.geo },
                          { l: "Бюджет/день", v: c.b.toLocaleString() + "₽" },
                          { l: "Режим", v: autoLbl[c.auto] },
                        ].map((p, j) => (
                          <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid " + C.bd }}>
                            <span style={{ fontSize: 14, color: C.tt }}>{p.l}</span>
                            <span style={{ fontSize: 14, fontWeight: 500 }}>{p.v}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Режим автоматизации</div>
                        {["watch", "semi", "auto"].map(a => (
                          <button key={a} onClick={e => { e.stopPropagation(); setCamps(p => p.map(x => x.id === c.id ? { ...x, auto: a } : x)); }}
                            style={{
                              display: "block", width: "100%", padding: "10px 14px",
                              borderRadius: 8, marginBottom: 8,
                              border: "1px solid " + (c.auto === a ? C.ac : C.bd),
                              background: c.auto === a ? C.al : C.sf,
                              color: c.auto === a ? C.ac : C.tx,
                              fontSize: 14, fontWeight: 500, cursor: "pointer",
                              fontFamily: "inherit", textAlign: "left",
                            }}>
                            {autoLbl[a]}
                          </button>
                        ))}
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
