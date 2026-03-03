import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { C, G, cardStyle } from "../styles/theme";

const steps = [
  "Цель",
  "Настройки",
  "Объявления",
  "Запуск",
];

export default function CampaignWizard({ onClose, onLaunch }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    goal: "", name: "", budget: "", geo: "Москва", type: "search",
    auto: "semi", keywords: "", negatives: "",
  });

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const Step0 = () => (
    <div>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Цель кампании</div>
      {[
        { k: "leads", l: "👥 Привлечение лидов", d: "Заявки, звонки, формы" },
        { k: "sales", l: "🛏️ Продажи", d: "Прямые продажи товаров/услуг" },
        { k: "traffic", l: "👥 Трафик", d: "Посещения сайта" },
        { k: "brand", l: "🌐 Бренд", d: "Узнаваемость бренда" },
      ].map(g => (
        <div key={g.k} onClick={() => upd("goal", g.k)}
          style={{
            padding: "14px 16px", borderRadius: 10, marginBottom: 8,
            cursor: "pointer", border: "1px solid " + (form.goal === g.k ? C.ac : C.bd),
            background: form.goal === g.k ? C.al : C.sf,
          }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>{g.l}</div>
          <div style={{ fontSize: 13, color: C.tt, marginTop: 2 }}>{g.d}</div>
        </div>
      ))}
    </div>
  );

  const Step1 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Настройки</div>
      {[
        { k: "name", l: "Название", ph: "Ремонт — Поиск" },
        { k: "budget", l: "Бюджет/день (₽)", ph: "5000" },
        { k: "geo", l: "География", ph: "Москва" },
      ].map(f => (
        <div key={f.k}>
          <div style={{ fontSize: 14, color: C.tt, marginBottom: 6 }}>{f.l}</div>
          <input value={form[f.k]} onChange={e => upd(f.k, e.target.value)}
            placeholder={f.ph}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 10,
              border: "1px solid " + C.bd, fontSize: 15,
              background: C.bg, color: C.tx, outline: "none", fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>
      ))}
      <div>
        <div style={{ fontSize: 14, color: C.tt, marginBottom: 6 }}>Тип</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ k: "search", l: "Поиск" }, { k: "display", l: "РСЯ" }, { k: "retarget", l: "Ретаргетинг" }].map(t => (
            <button key={t.k} onClick={() => upd("type", t.k)} style={{
              padding: "8px 14px", borderRadius: 8, fontSize: 14, cursor: "pointer",
              fontFamily: "inherit", border: "1px solid " + (form.type === t.k ? C.ac : C.bd),
              background: form.type === t.k ? C.al : C.sf,
              color: form.type === t.k ? C.ac : C.tx,
            }}>{t.l}</button>
          ))}
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Объявления</div>
      {[
        { k: "keywords", l: "Ключевые слова", ph: "ремонт квартир\nремонт офиса" },
        { k: "negatives", l: "Минус-слова", ph: "своими руками\nвидео\nкурсы" },
      ].map(f => (
        <div key={f.k}>
          <div style={{ fontSize: 14, color: C.tt, marginBottom: 6 }}>{f.l}</div>
          <textarea value={form[f.k]} onChange={e => upd(f.k, e.target.value)}
            placeholder={f.ph} rows={4}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 10,
              border: "1px solid " + C.bd, fontSize: 15,
              background: C.bg, color: C.tx, outline: "none",
              fontFamily: "inherit", resize: "none", boxSizing: "border-box",
            }}
          />
        </div>
      ))}
      <div style={{ padding: "12px 14px", borderRadius: 10, background: G.b + "08", border: "1px solid " + G.b + "20", fontSize: 14, color: C.ts }}>
        📊 Аналитик: прогноз ~140 кликов/день, CPA ~340₽
      </div>
    </div>
  );

  const Step3 = () => (
    <div>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Готово к запуску</div>
      <div style={{ background: C.bg, borderRadius: 12, padding: 16, marginBottom: 16 }}>
        {[
          { l: "Название", v: form.name || "—" },
          { l: "Тип", v: form.type },
          { l: "География", v: form.geo },
          { l: "Бюджет", v: form.budget ? form.budget + "₽" : "—" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid " + C.bd : "none" }}>
            <span style={{ fontSize: 14, color: C.tt }}>{r.l}</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{r.v}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 14px", borderRadius: 10, background: G.g + "08", border: "1px solid " + G.g + "20", fontSize: 14, color: C.ts, marginBottom: 16 }}>
        🛡️ Аудитор: чеклист пройден. Минус-слова добавлены.
      </div>
    </div>
  );

  const StepComponents = [Step0, Step1, Step2, Step3];
  const StepComp = StepComponents[step];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        background: C.sf, borderRadius: 16, padding: 28, width: 480,
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        maxHeight: "80vh", overflowY: "auto",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Новая кампания</div>
          <div style={{ display: "flex", gap: 6 }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                width: i === step ? 20 : 8, height: 8, borderRadius: 4,
                background: i <= step ? C.ac : C.bd,
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        </div>

        <StepComp />

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <button onClick={step === 0 ? onClose : () => setStep(s => s - 1)}
            style={{
              padding: "9px 18px", borderRadius: 10, border: "1px solid " + C.bd,
              background: C.sf, color: C.tx, fontSize: 15, cursor: "pointer",
              fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
            }}>
            <ArrowLeft size={14} />{step === 0 ? "Отмена" : "Назад"}
          </button>
          <button onClick={() => {
            if (step === steps.length - 1) {
              onLaunch(form);
            } else {
              setStep(s => s + 1);
            }
          }} style={{
            padding: "9px 18px", borderRadius: 10, border: "none",
            background: "#c7623e", color: "#FFF", fontSize: 15, fontWeight: 500,
            cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {step === steps.length - 1 ? (
              <><CheckCircle size={14} />Запустить</>
            ) : (
              <>Далее<ArrowRight size={14} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
