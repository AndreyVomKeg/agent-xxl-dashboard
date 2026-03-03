import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MousePointer, Eye, Target, DollarSign, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { G, C, SH, cpaColor, roasColor, cardStyle } from "../styles/theme";
import { chartData, channels } from "../data/mockData";

export default function Overview({ camps }) {
  return (
    <>
      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { ic: MousePointer, lb: "Клики", vl: "1 480", ch: "+12.1%", up: true },
          { ic: Eye, lb: "Показы", vl: "20.8K", ch: "+5.3%", up: true },
          { ic: Target, lb: "Конверсии", vl: "52", ch: "+8.3%", up: true },
          { ic: DollarSign, lb: "Средний CPA", vl: "290₽", ch: "-6.5%", up: true },
        ].map((m, i) => {
          const MI = m.ic;
          return (
            <div key={i} style={{ ...cardStyle, padding: "20px 22px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 90, height: 90, borderRadius: "50%", background: m.up ? "rgba(52,168,83,0.08)" : "rgba(234,67,53,0.08)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: C.sa }}>
                  <MI size={18} style={{ color: C.tt }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, background: "rgba(52,168,83,0.08)", color: C.ok, fontSize: 14, fontWeight: 500 }}>
                  <ArrowUpRight size={13} />{m.ch}
                </div>
              </div>
              <div style={{ fontSize: 30, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{m.vl}</div>
              <div style={{ fontSize: 15, color: C.tt, marginTop: 4 }}>{m.lb}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Area chart */}
        <div style={{ ...cardStyle, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Динамика эффективности</div>
            <div style={{ display: "flex", gap: 16 }}>
              {[{ l: "Клики", c: G.b }, { l: "Конверсии", c: G.g }].map(x => (
                <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: C.tt }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: x.c }} />{x.l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={G.b} stopOpacity={0.2} /><stop offset="100%" stopColor={G.b} stopOpacity={0} /></linearGradient>
                <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={G.g} stopOpacity={0.2} /><stop offset="100%" stopColor={G.g} stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(60,40,20,0.05)" />
              <XAxis dataKey="d" tick={{ fill: C.tt, fontSize: 14 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="l" tick={{ fill: C.tt, fontSize: 14 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="r" orientation="right" tick={{ fill: C.tt, fontSize: 14 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#FFF", border: "1px solid " + C.bd, borderRadius: 10, fontSize: 15 }} />
              <Area yAxisId="l" type="monotone" dataKey="cl" stroke={G.b} fill="url(#gB)" strokeWidth={2.5} dot={false} name="Клики" />
              <Area yAxisId="r" type="monotone" dataKey="cv" stroke={G.g} fill="url(#gG)" strokeWidth={2.5} dot={false} name="Конверсии" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div style={{ ...cardStyle, padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Каналы трафика</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={channels} cx="50%" cy="50%" innerRadius={40} outerRadius={62} dataKey="v" stroke="#FFF" strokeWidth={2}>
                {channels.map((e, i) => <Cell key={i} fill={e.c} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {channels.map((ch, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: ch.c }} />
                  <span style={{ fontSize: 15, color: C.ts }}>{ch.n}</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{ch.v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns table */}
      <div style={{ ...cardStyle, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Кампании</div>
          <div style={{ fontSize: 14, color: C.tt }}>Обновлено 5 мин назад</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 0.8fr 1.2fr 0.8fr 0.8fr 0.5fr", padding: "0 0 14px", borderBottom: "1px solid " + C.bd }}>
          {["Название", "Статус", "Бюджет / Расход", "CPA", "ROAS", ""].map(h => (
            <div key={h} style={{ fontSize: 13, fontWeight: 500, color: C.tt, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
          ))}
        </div>
        {camps.filter(c => c.s !== "draft").map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 0.8fr 1.2fr 0.8fr 0.8fr 0.5fr", padding: "15px 0", borderBottom: "1px solid " + C.bd, alignItems: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 500 }}>{c.n}</div>
            <div>
              <span style={{ fontSize: 13, fontWeight: 500, padding: "4px 11px", borderRadius: 20, background: c.s === "active" ? "rgba(52,168,83,0.08)" : C.sa, color: c.s === "active" ? C.ok : C.tt }}>
                {c.s === "active" ? "Активна" : "Пауза"}
              </span>
            </div>
            <div style={{ fontSize: 15, fontVariantNumeric: "tabular-nums" }}>
              <span style={{ fontWeight: 500 }}>{c.sp.toLocaleString()}₽</span>
              <span style={{ color: C.tt }}> / {c.b.toLocaleString()}₽</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, fontVariantNumeric: "tabular-nums", color: cpaColor(c.cpa) }}>{c.cpa}₽</div>
            <div style={{ fontSize: 16, fontWeight: 500, fontVariantNumeric: "tabular-nums", color: roasColor(c.roas) }}>{c.roas}x</div>
            <div>
              {c.t === "up"
                ? <TrendingUp size={18} style={{ color: G.g }} />
                : <TrendingDown size={18} style={{ color: G.r }} />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
