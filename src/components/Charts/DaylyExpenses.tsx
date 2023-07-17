import { Col, Row } from "antd";
import moment from "moment";
import Chart from "react-google-charts";
import InfoTable from "./InfoTable";
import dynamic from "next/dynamic";

type Props = {
  transactions: Transaction[];
};
const DynamicReportsPDFNoSSR = dynamic(
  async () => {
    const mod = await import("@/components/Reports/ReportsPDF");
    return mod.ReportsPDF;
  },
  { ssr: false }
);
export function DailyExpenses({ transactions }: Props) {
  const today = moment();

  const dailyExpenses = transactions.reduce(
    (acc: any, transaction: Transaction) => {
      const date = moment(transaction.date, "YYYY-MM-DD");
      const value = +transaction.value;

      if (today.isSame(date, "day")) {
        const category = transaction.category;
        if (acc[category]) {
          acc[category] += value;
        } else {
          acc[category] = value;
        }
      }

      return acc;
    },
    {}
  );

  const chartData = [["Categoria", "Valor"]];

  for (const category in dailyExpenses) {
    chartData.push([category, dailyExpenses[category]]);
  }

 

  const todaysTransactions = transactions.filter((transaction) => {
    const date = moment(transaction.date, "YYYY-MM-DD");
    return today.isSame(date, "day");
  });

  return (
    <div style={{ marginBottom: 100 }}>
      <h2>Gastos do dia</h2>
      {todaysTransactions.length < 0 ? (
        <p>Nenhum dado encontrado</p>
      ) : (
        <Row>
          <Col xs={24}>
            <InfoTable transactions={todaysTransactions} />
          </Col>

          {todaysTransactions.length < 0 && (
            <DynamicReportsPDFNoSSR transactions={todaysTransactions} />
          )}
        </Row>
      )}
    </div>
  );
}
