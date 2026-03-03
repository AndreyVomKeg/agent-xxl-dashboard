import { useState, useRef, useEffect } from "react";
import { Sparkles, Bot, RefreshCw, ArrowUp, CheckCircle, Clock } from "lucide-react";
import { C } from "../styles/theme";
import { alerts } from "../data/mockData";
import { Badge, Chevron } from "./ui";

export default function RightPanel() {
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { r: "a", t: "Добро пожаловать в Agent XXL! Обнаружены 2 аномалии и 1 возможность оптимизации." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current && (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const q = input.toLowerCase();
    setMessages(p => [...p, { r: "u", t: input }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      let response = "Средний ROAS по аккаунту 3.2, CPA 318₽. Бюджет использован на 72%. 4 агента активны.";

      if (q.includes("cpa")) {
        response = "📊 CPA по кампаниям:\n\nЛучший: РСЯ — Ретаргетинг → 190₽ ✅\nСредний: Бренд — Москва → 245₽ ✅\nВысокий: Поиск — Услуги → 380₽ ⚠️\nКритический: Конкуренты → 520₽ ❌\n\nОптимизатор рекомендует снизить ставки в «Конкуренты» или перераспределить бюджет на ретаргетинг.";
      } else if (q.includes("бюджет")) {
        response = "💰 Распределение бюджетов:\n\nБренд — Москва: 5 000₽ (68% расход) ✅\nПоиск — Услуги: 8 000₽ (77% расход) ⚠️\nКонкуренты: 3 000₽ (96% расход) ❌\nРетаргетинг: 4 000₽ (53% расход) ✅\nГео СПб: пауза\n\nОбщий бюджет: 23 000₽/день\nОптимизатор предлагает: +25% ретаргетинг, -15% конкуренты.";
      } else if (q.includes("объявлен") || q.includes("текст")) {
        response = "✏️ Копирайтер подготовил 3 новых варианта для «Услуги»:\n\n1. «Все виды ремонта — Мастер сегодня» (прогноз CTR 5.5%)\n2. «Ремонт квартир от 990₽/м²» (прогноз CTR 6.2%)\n3. «Ремонт за 30 дней — Гарантия 2 года» (прогноз CTR 5.8%)\n\nA/B тест вариантов 2 и 3 готов к запуску.";
      } else if (q.includes("скилл") || q.includes("skill")) {
        response = "📚 Скиллы агентов:\n\nАналитик: 2 скилла (anomaly_detection, forecasting)\nКопирайтер: 2 скилла (brand_voice, ad_formats)\nОптимизатор: 2 скилла (bidding, budget_rules)\nАудитор: 2 скилла (checklist, quality_score)\n\nЗагрузите новый скилл во вкладке «Агенты» → выберите агента → «Загрузить скилл».";
      } else if (q.includes("кампани") || q.includes("создай") || q.includes("новую")) {
        response = "Чтобы создать кампанию, перейдите в «Кампании» и нажмите «+ Новая кампания».\n\nВы описываете цель — агенты подготовят:\n📊 Аналитик: прогноз и оценку потенциала\n✏️ Копирайтер: тексты объявлений\n⚙️ Оптимизатор: ставки и бюджет\n🛡️ Аудитор: чеклист перед запуском";
      } else if (q.includes("агент")) {
        response = "🤖 Статус агентов:\n\n📊 Аналитик — Работает (анализ CPA)\n✏️ Копирайтер — Работает (генерация «Услуги»)\n⚙️ Оптимизатор — Ожидает (последнее: бюджет +10%)\n🛡️ Аудитор — Внимание! (конфликт минус-слов)\n\nЗа неделю: 85 задач, 69 принято (81%).";
      }

      setTyping(false);
      setMessages(p => [...p, { r: "a", t: response }]);
    }, 1200);
  };

  return (
    <div style={{
      width: 520, borderLeft: "1px solid " + C.bd,
      display: "flex", flexDirection: "column", background: C.sf,
    }}>
      {/* Alerts */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid " + C.bd }}>
        <div onClick={() => setAlertsOpen(!alertsOpen)}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none", marginBottom: alertsOpen ? 14 : 0 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg,#C47B5B,#D4A574)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Sparkles size={14} style={{ color: "#FFF" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Рекомендации</span>
          <Chevron open={alertsOpen} />
          <span style={{
            fontSize: 11, fontWeight: 500, padding: "2px 9px", borderRadius: 10,
            background: "rgba(234,67,53,0.08)", color: "#EA4335", marginLeft: "auto",
          }}>2</span>
        </div>

        {alertsOpen && (
          <div>
            {alerts.map((al, i) => (
              <div key={i} style={{
                padding: 12, background: C.bg, borderRadius: 10,
                marginBottom: 8, border: "1px solid " + C.bd,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Badge agent={al.ag} />
                  <span style={{ fontSize: 11, color: C.tt, marginLeft: "auto" }}>
                    <Clock size={10} style={{ marginRight: 3 }} />{al.tm}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: C.ts, lineHeight: 1.5, marginBottom: 10 }}>{al.msg}</div>
                <button style={{
                  padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 500,
                  cursor: "pointer", fontFamily: "inherit",
                  background: C.al, color: C.ac, border: "1px solid " + C.am,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <CheckCircle size={12} />{al.act}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          padding: "12px 20px", borderBottom: "1px solid " + C.bd,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg,#C47B5B,#D4A574)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Bot size={15} style={{ color: "#FFF" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Чат с ассистентом</span>
        </div>

        <div ref={chatRef} style={{
          flex: 1, overflow: "auto", padding: 14,
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              maxWidth: "88%",
              alignSelf: m.r === "u" ? "flex-end" : "flex-start",
              padding: "10px 14px",
              borderRadius: m.r === "u" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.r === "u" ? "linear-gradient(135deg,#C47B5B,#D4A574)" : C.bg,
              border: m.r === "u" ? "none" : "1px solid " + C.bd,
              fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
              color: m.r === "u" ? "#FFF" : C.tx,
              animation: "fadeIn 0.3s ease-out",
            }}>{m.t}</div>
          ))}
          {typing && (
            <div style={{
              alignSelf: "flex-start", padding: "10px 16px",
              borderRadius: "14px 14px 14px 4px",
              background: C.bg, border: "1px solid " + C.bd,
              fontSize: 13, color: C.tt,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <RefreshCw size={14} style={{ animation: "spin 1s linear infinite", color: C.ac }} />
              Анализирую...
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: "10px 14px 14px" }}>
          <div style={{
            border: "1px solid " + C.bs, borderRadius: 22,
            background: C.sf, overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", padding: "10px 8px 6px 18px" }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Спросите агентов..."
                style={{
                  flex: 1, border: "none", background: "transparent",
                  color: C.tx, fontSize: 14, outline: "none", fontFamily: "inherit",
                }}
              />
            </div>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "2px 8px 8px 18px",
            }}>
              <span style={{ fontSize: 11, color: C.tt }}>CPA · бюджет · объявления · скиллы · агенты</span>
              <button onClick={send} style={{
                width: 32, height: 32, borderRadius: 10, border: "none",
                background: input.trim() ? "#c7623e" : "rgba(199,98,62,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: input.trim() ? "pointer" : "default",
              }}>
                <ArrowUp size={16} strokeWidth={2.5} style={{ color: input.trim() ? "#FFF" : "rgba(199,98,62,0.35)" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
