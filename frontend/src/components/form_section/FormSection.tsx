import "./style.css";

type FormSectionProps = {
  title: string;
  children: React.ReactNode;
};

function FormSection({ title, children }: FormSectionProps) {
  return (
    <section className="form-section">
      <h3>{title}</h3>

      <div className="form-section-content">{children}</div>
    </section>
  );
}

export default FormSection;
