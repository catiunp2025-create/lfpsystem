export type Step = {
  id: number;
  title: string;
  subTitle: string;
};

export const steppers: Step[] = [
    {
      id: 1,
      title: "Veículo",
      subTitle: "Equipe e transporte",
    },
    {
      id: 2,
      title: "Cliente",
      subTitle: "Dados e endereço",
    },
    {
      id: 3,
      title: "Serviços",
      subTitle: "Itens da ordem",
    },
    {
      id: 4,
      title: "Finalizar",
      subTitle: "Revisão e abertura",
    },
  ];