import "./style.css";

interface InfoCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function InfoCard({ title, value, subtitle }: InfoCardProps) {
  return (
    <div className="card">
      <span className="card-title">{title}</span>

      <h2>{value}</h2>

      {subtitle && <p className="card-sub">{subtitle}</p>}
    </div>
  );
}
