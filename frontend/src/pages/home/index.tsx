import { useEffect, useState } from "react";
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
import api from "../../services/api";
import type {
  AllOrderService,
  ApiData,
  ChartData,
  Service,
} from "../../types/dashboard";
import { mockServiceOrders } from "../../mocks/dashboard.mock";

function formatApiData(allOrderService: AllOrderService[]): ApiData[] {
  const apiData = allOrderService.reduce<Record<string, ApiData>>((acc, os) => {
    const date = new Date(os.date);

    const month = date.getMonth();
    const year = date.getFullYear();

    const key = `${year}-${month}`;

    const osTotal = os.services.reduce(
      (sum, service) => sum + service.value,
      0,
    );

    if (!acc[key]) {
      acc[key] = {
        month,
        year,
        total: 0,
      };
    }

    acc[key].total += osTotal;

    return acc;
  }, {});

  return Object.values(apiData).sort(
    (a, b) =>
      new Date(a.year, a.month).getTime() - new Date(b.year, b.month).getTime(),
  );
}

function mostRequestedService(
  allOrderService: AllOrderService[],
): [string, Service[]] | null {
  const services = allOrderService.reduce<Service[]>((acc, os) => {
    return [...acc, ...os.services];
  }, []);

  const servicePerName = services.reduce<Record<string, Service[]>>(
    (acc, service) => {
      const key = service.name;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(service);

      return acc;
    },
    {},
  );

  const entries = Object.entries(servicePerName);

  return entries.length > 0
    ? entries.reduce((max, current) =>
        current[1].length > max[1].length ? current : max,
      )
    : null;
}

function formatChartData(apiData: ApiData[]): ChartData[] {
  return apiData.map((item) => ({
    dateKey:
      new Date(item.year, item.month)
        .toLocaleString("pt-BR", { month: "short" })
        .replace(".", "") +
      "-" +
      new Date(item.year, item.month).toLocaleString("pt-BR", {
        year: "numeric",
      }),
    total: item.total.toFixed(2),
  }));
}

function getLastMonthRange(months: number) {
  const now = new Date();
  return {
    startDate: new Date(now.getFullYear(), now.getMonth() - (months - 1)),

    endDate: new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    ),
  };
}

function Home() {
  const [open, setOpen] = useState(false);
  const [serviceOrders, setServiceOrders] = useState<AllOrderService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const currentMonth = now.getMonth() === 0 ? 11 : now.getMonth();
  const currentYear =
    now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const getMonth = new Date(currentYear, currentMonth).toLocaleDateString(
    "pt-BR",
    {
      month: "long",
    },
  );
  const dataMonth = getMonth.charAt(0).toUpperCase() + getMonth.slice(1);
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const { startDate, endDate } = getLastMonthRange(12);
  const currentYearOrders = serviceOrders.filter(
    (os) => os.date.getFullYear() === currentYear,
  );

  const apiData = formatApiData(serviceOrders);
  const chartData = formatChartData(apiData);
  const [mostRequestedServiceName, mostRequestedServices] =
    mostRequestedService(currentYearOrders) ?? ["Sem dados", []];
  const orderServicePerYear = currentYearOrders.length;
  const orderServiceCompleted = currentYearOrders.filter(
    (os) => os.status === "COMPLETED",
  ).length;
  const orderServicePending = currentYearOrders.filter(
    (os) => os.status === "PENDING",
  ).length;

  const currentCardData = apiData.find(
    (data) => data.month === currentMonth && data.year === currentYear,
  );
  const previousCardData = apiData.find(
    (data) => data.month === previousMonth && data.year === previousYear,
  );

  async function fetchDashboardData() {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("order-service");
      setServiceOrders(response.data);
    } catch (error) {
      setError("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }

  function testFormatChartData(allOrderService: AllOrderService[]) {
    setLoading(false);
    setError(null);
    setServiceOrders(
      allOrderService.filter((os) => os.date > startDate && os.date < endDate),
    );
  }

  useEffect(() => {
    // fetchDashboardData();
    testFormatChartData(mockServiceOrders); // Trocar pelo de cima, apenas teste
  }, []);

  return (
    <div className="main-container">
      <BlocoSuperior toggleSidebar={() => setOpen((prev) => !prev)} />
      <div className={`layout ${open ? "open" : ""}`}>
        <Sidebar open={open} />
        <main className="content-home">
          <header className="dashboard-header">
            <h1>Dashboard</h1>
            <span>{`${dataMonth} ${currentYear}`}</span>
          </header>

          <section className="cards">
            <div className="card">
              <span className="card-title">Faturamento {dataMonth}</span>
              {currentCardData ? (
                <div>
                  <h2>R$ {currentCardData.total.toLocaleString("pt-BR")}</h2>
                  {previousCardData && (
                    <p className="card-sub">
                      {Math.round(
                        (currentCardData?.total * 100) /
                          previousCardData?.total -
                          100,
                      )}
                      % vs mês anterior
                    </p>
                  )}
                </div>
              ) : (
                <h2>Ainda sem dados</h2>
              )}
            </div>
            <div className="card">
              <span className="card-title">
                Ordens de Serviço {currentYear}
              </span>
              <h2>{orderServicePerYear}</h2>
              <p className="card-sub">
                {orderServiceCompleted} concluídas • {orderServicePending}{" "}
                pendentes
              </p>
            </div>
            <div className="card">
              <span className="card-title">
                Serviço principal {currentYear}
              </span>
              <h2>{mostRequestedServiceName}</h2>
              <p className="card-sub">
                {mostRequestedServices.length} requisições
              </p>
            </div>
          </section>

          <section className="chart">
            <div className="full card">
              <span className="chart-title">Faturamento Mensal</span>
              {loading ? (
                <div className="chart-skeleton">Carregando dados...</div>
              ) : error ? (
                <div>
                  <span>{error}</span>
                  <button onClick={fetchDashboardData}>Tentar novamente</button>
                </div>
              ) : !chartData.length ? (
                <span>Sem dados disponíveis.</span>
              ) : (
                /* mudar para dados da api após reunião */
                <div className="chart-area">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      width={500}
                      height={300}
                      margin={{
                        top: 10,
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
                        dataKey="dateKey"
                        tick={{
                          fill: "#9ca3af",
                          fontSize: 14,
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
                        }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        labelStyle={{ color: "#dbd4e3" }}
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
                        }}
                        activeBar={{ fill: "#FCD34D" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
