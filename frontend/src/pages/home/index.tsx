import { useState } from "react";
import { BlocoSuperior } from "../../components/bloco_superior/BlocoSuperior";
import "./style.css";
import { Sidebar } from "../../components/side_bar/Sidebar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Opacity } from "@mui/icons-material";

function Home() {
  const [open, setOpen] = useState(false);
  const data = [
    { month: "Janeiro", total: 36800 },
    { month: "Fevereiro", total: 42200 },
    { month: "Março", total: 42400 },
    { month: "Abril", total: 48200 },
    { month: "Maio", total: 45700 },
    { month: "Junho", total: 53100 },
    { month: "Julho", total: 47700 },
    { month: "Agosto", total: 39800 },
    { month: "Setembro", total: 46900 },
    { month: "Outubro", total: 51200 },
    { month: "Novembro", total: 55000 },
    { month: "Dezembro", total: 38300 },
  ];

  return (
    <div className="main-container">
      <BlocoSuperior toggleSidebar={() => setOpen((prev) => !prev)} />
      <div className={`layout ${open ? "open" : ""}`}>
        <Sidebar open={open} />
        <main className="content">
          <header className="dashboard-header">
            <h1>Dashboard</h1>
            <span>Abril 2026</span>
          </header>

          <section className="cards">
            <div className="card">
              <span className="card-title">Faturamento</span>
              <h2>R$ 48.200</h2>
              <p className="card-sub">+12% vs mês anterior</p>
            </div>
            <div className="card">
              <span className="card-title">Ordens de Serviço</span>
              <h2>124</h2>
              <p className="card-sub">98 concluídas • 26 pendentes</p>
            </div>
            <div className="card">
              <span className="card-title">Serviço principal</span>
              <h2>Limpeza de Fossa</h2>
              <p className="card-sub">62% das OS</p>
            </div>
          </section>

          <section className="chart">
            <div className="full card">
              <span className="chart-title">Faturamento Mensal</span>
              <div className="chart-area">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    width={500}
                    height={300}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barCategoryGap="10%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#2a3447"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{
                        fill: "#9ca3af",
                        fontSize: 14,
                        fontFamily: "Poppins",
                      }}
                      interval={0}
                      angle={-30}
                      textAnchor="end"
                      height={46}
                    />
                    <YAxis
                      tick={{
                        fill: "#9ca3af",
                        fontSize: 14,
                        fontFamily: "Poppins",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0F172A",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      labelStyle={{ color: "#dbd4e3", fontFamily: "Poppins" }}
                      formatter={(value) => [`R$ ${value}`, "Faturamento"]}
                    />
                    <Bar
                      dataKey="total"
                      fill="#FBBF24"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={50}
                      label={{
                        position: "top",
                        fill: "#9ca3af",
                        fontSize: "14",
                        fontFamily: "Poppins",
                      }}
                      activeBar={{ fill: "#FCD34D" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
