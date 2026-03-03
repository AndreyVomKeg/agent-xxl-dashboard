import { useState } from "react";
import { Plus, X } from "lucide-react";
import { C } from "../styles/theme";

export default function CampaignWizard({ onClose, onCreate }) {
  const [wiz, setWiz] = useState({ step: 1, nm: "", tp: "search", geo: "Москва", b: 3000, mc: 500, auto: "watch" });
  const [messages, setMessages] = useState([
    { r: "a", t: "Опишите цель кампании.\nНапример: «Хочу лиды на ремонт квартир в СПб до 500₽»" },
  ]);

  const sendBrief = (text) => {
    const m = [...messages, { r: "u", t: text }];
    setWiz(p => ({ ...p, step: 2, nm: text.length > 30 ? text.slice(0, 27) + "…" : text }));
    setTimeout(() => {
      setMessages([...m, {
        r: "a",
        t: "📊 Аналитик: ~1800 запросов/мес, конкуренция средняя.\nПрогноз CPA: 320-450₽, CTR ~4.5%.\n\n✏️ Копирайтер подготовил 3 варианта:\n• «Ремонт квартир — Гарантия 2 года»\n• «Мастер сегодня. От 990₽/м²»\n• «Ремонт под ключ за 30 дней»\n\n⚙️ Оптимизатор: старт 3000₽/день, ручные ставки.\n🛡️ Аудитор: добавьте минус-слова «своими руками», «видео».\n\nНастройте параметры ниже и нажмите «Создать».",
      }]);
    }, 1200);
  };

  const handleCreate = () => {
    onCreate({
      id: Date.now(),
      n: wiz.nm || "Новая кампания",
      s: "draft",
      tp: wiz.tp,
      b: wiz.b,
      sp: 0,
      cpa: 0,
      roas: 0,
      t: "up",
      auto: wiz.auto,
      geo: wiz.geo,
      agActs: [
        { ag: "Аналитик", x: "Прогноз подготовлен", t: "сейчас" },
        { ag: "Копирайтер", x: "3 объявления готовы", t: "сейчас" },
        { ag: "Аудитор", x: "Чеклист пройден ✅", t: "сейчас" },
      ],
    });
    onClose();
  };

  const inputStyle = {
    width: "100%", border: "1px solid " + C.bd, borderRadius: 8,
    padding: "8px 10px", fontSize: 15, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(26,17,8,0.5)",
      backdropFilter: "blur(4px)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: C.sf, borderRadius: 20, width: 560, maxHeight: "85vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid " + C.bd,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: C.al,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Plus size={16} style={{ color: C.ac }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Новая кампания</div>
            <div style={{ fontSize: 14, color: C.tt }}>
              Шаг {wiz.step}/2 · {wiz.step === 1 ? "Опишите цель" : "Настройте параметры"}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <X size={18} style={{ color: C.tt }} />
          </button>
        </div>

        {/* Chat messages */}
        <div style={{
          flex: 1, overflow: "auto", padding: 16,
          display: "flex", flexDirection: "column", gap: 8,
          minHeight: 200, maxHeight: 300,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              maxWidth: "88%",
              alignSelf: m.r === "u" ? "flex-end" : "flex-start",
              padding: "10px 14px",
              borderRadius: m.r === "u" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.r === "u" ? "linear-gradient(135deg,#C47B5B,#D4A574)" : C.bg,
              border: m.r === "u" ? "none" : "1px solid " + C.bd,
              fontSize: 15, lineHeight: 1.6, whiteSpace: "pre-wrap",
              color: m.r === "u" ? "#FFF" : C.tx,
            }}>{m.t}</div>
          ))}
        </div>

        {/* Step 1: Brief input */}
        {wiz.step === 1 && (
          <div style={{ padding: "12px 16px", borderTop: "1px solid " + C.bd }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input autoFocus placeholder="Опишите цель кампании..."
                onKeyDown={e => { if (e.key === "Enter" && e.target.value.trim()) { sendBrief(e.target.value); e.target.value = ""; } }}
                style={{ flex: 1, border: "1px solid " + C.bs, borderRadius: 10, padding: "10px 14px", fontSize: 15, outline: "none", fontFamily: "inherit" }}
              />
              <button onClick={e => {
                const inp = e.target.closest("div").querySelector("input");
                if (inp.value.trim()) { sendBrief(inp.value); inp.value = ""; }
              }} style={{
                padding: "10px 16px", borderRadius: 10, border: "none",
                background: "#c7623e", color: "#FFF", fontSize: 15,
                cursor: "pointer", fontFamily: "inherit",
              }}>→</button>
            </div>
          </div>
        )}

        {/* Step 2: Configuration form */}
        {wiz.step === 2 && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid " + C.bd }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.tt, marginBottom: 4 }}>НАЗВАНИЕ</div>
                <input value={wiz.nm} onChange={e => setWiz(p => ({ ...p, nm: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.tt, marginBottom: 4 }}>ТИП</div>
                <select value={wiz.tp} onChange={e => setWiz(p => ({ ...p, tp: e.target.value }))}
                  style={{ ...inputStyle, background: C.sf }}>
                  <option value="search">Поиск</option>
                  <option value="display">РСЯ</option>
                  <option value="retarget">Ретаргетинг</option>
                </select>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.tt, marginBottom: 4 }}>ГЕО</div>
                <input value={wiz.geo} onChange={e => setWiz(p => ({ ...p, geo: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.tt, marginBottom: 4 }}>БЮДЖЕТ ₽/ДЕНЬ</div>
                <input type="number" value={wiz.b} onChange={e => setWiz(p => ({ ...p, b: +e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.tt, marginBottom: 4 }}>МАКС CPA ₽</div>
                <input type="number" value={wiz.mc} onChange={e => setWiz(p => ({ ...p, mc: +e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.tt, marginBottom: 4 }}>АВТОНОМИЯ АГЕНТОВ</div>
                <select value={wiz.auto} onChange={e => setWiz(p => ({ ...p, auto: e.target.value }))}
                  style={{ ...inputStyle, background: C.sf }}>
                  <option value="watch">Наблюдение</option>
                  <option value="semi">Полуавтомат</option>
                  <option value="auto">Автопилот</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={onClose} style={{
                padding: "10px 18px", borderRadius: 10, border: "1px solid " + C.bd,
                background: C.sf, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
              }}>Отменить</button>
              <button onClick={handleCreate} style={{
                padding: "10px 18px", borderRadius: 10, border: "none",
                background: "#c7623e", color: "#FFF", fontSize: 15, fontWeight: 500,
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 6,
              }}><Plus size={14} />Создать черновик</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
