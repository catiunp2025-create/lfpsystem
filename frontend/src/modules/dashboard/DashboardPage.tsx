import "./style.css";
import { useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { formatCurrency } from "../../utils/FormatCurrency";
import { useDashboard } from "./hooks/useDashboard";
import { InfoCard } from "../../components/cards/InfoCard";
import { RevenueChart } from "./components/RevenueChart";

function Dashboard() {
  const {
    chartData,
    loading,
    error,
    currentYear,
    dataMonth,
    orderServicePerYear,
    orderServiceCompleted,
    orderServicePending,
    currentCardData,
    mostRequestedServiceName,
    mostRequestedServices,
    percentage,
    refresh,
  } = useDashboard();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <MainLayout pageTitle="Início">
      <main className="content-dashboard">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <span>{`${dataMonth} ${currentYear}`}</span>
        </header>

        <section className="cards">
          <InfoCard
            title={`Faturamento ${dataMonth}`}
            value={
              currentCardData
                ? formatCurrency(currentCardData.total)
                : "Ainda sem dados"
            }
            subtitle={
              percentage !== null ? `${percentage}% vs mês anterior` : undefined
            }
          />
          <InfoCard
            title={`Ordens de Serviço ${currentYear}`}
            value={orderServicePerYear}
            subtitle={`${orderServiceCompleted} concluídas | ${orderServicePending}
              pendentes`}
          />
          <InfoCard
            title={`Serviço principal ${currentYear}`}
            value={mostRequestedServiceName}
            subtitle={`${mostRequestedServices.length} requisições`}
          />
        </section>

        <section className="chart">
          <div className="full card">
            <span className="chart-title">Faturamento Mensal</span>
            {loading ? (
              <div className="chart-skeleton">Carregando dados...</div>
            ) : error ? (
              <div>
                <span>{error}</span>
                <button className="button-retry" onClick={refresh}>
                  Tentar novamente
                </button>
              </div>
            ) : !chartData.length ? (
              <span>Sem dados disponíveis.</span>
            ) : (
              <div className="chart-area">
                <RevenueChart data={chartData} />
              </div>
            )}
          </div>
        </section>
      </main>
    </MainLayout>
  );
}

export default Dashboard;
