import moment from "moment";
import dynamic from "next/dynamic";
import { Chart, GoogleChartControlProp } from "react-google-charts";

type Props = {
  transactions: Transaction[];
};

const DynamicReportsPDFNoSSR = dynamic(
  async () => {
    const module = await import("@/components/Reports/ReportsPDF");
    return module.ReportsPDF;
  },
  { ssr: false }
);
export function TransactionChart({ transactions }: Props) {
  const chartData: any = [["Data", "Número de transações"]];

  chartData.push(
    ...transactions.map((transaction) => [
      moment(transaction.date).format("DD/MM/YYYY"),
      +transaction.value,
    ])
  );

  const chartOptions = {
    title: "Relatório de transações",
    chartArea: { width: "70%", height: "70%" },
    is3D: true,
    pieSliceText: "label",
  };

  const controls = [
    {
      controlEvents: [
        {
          eventName: "statechange",
          callback: ({ chartWrapper, controlWrapper }) => {
            console.log("State changed to", controlWrapper?.getState());
          },
        },
      ],
      controlType: "CategoryFilter",
      options: {
        format: { pattern: "dd/MM/yyyy" },
        filterColumnIndex: 0,
        ui: {
          caption: "Selecione uma data",
          labelStacking: "vertical",
          label: "Filtro por data:",
          allowTyping: false,
          allowMultiple: false,
          pattern: "DD/MM/YYYY",
          labelSeparator: "",
        },
      },
    },
  ] as GoogleChartControlProp[];

  return (
    <div style={{ marginBottom: 100 }}>
      <h2 style={{ margin: "20px 0" }}>Transações</h2>
      {chartData.length === 1 ? (
        <span>Nenhum dado encontrado</span>
      ) : (
        <>
          <Chart
            height={"300px"}
            chartType="PieChart"
            data={chartData}
            options={chartOptions}
            chartWrapperParams={{ view: { columns: [0, 1] } }}
            chartPackages={["corechart", "controls"]}
            controls={controls}
            chartLanguage="pt-BR"
          />
          <DynamicReportsPDFNoSSR transactions={transactions} />
        </>
      )}
    </div>
  );
}
