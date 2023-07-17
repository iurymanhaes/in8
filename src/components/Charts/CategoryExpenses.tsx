import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import Chart from "react-google-charts";

type Props = {
  transactions: Transaction[];
};


export function CategoryExpenses({ transactions }: Props) {
  const chartData: string[][] = [["Categoria", "Gastos"]];

  const categoryExpenses = transactions.reduce((acc: any, transaction: Transaction) => {
    const category = transaction.category;
    const value = +transaction.value;

    if (acc[category]) {
      acc[category] += value;
    } else {
      acc[category] = value;
    }

    return acc;
  }, {});

  for (const category in categoryExpenses) {
    chartData.push([category, categoryExpenses[category]]);
  }

  const chartOptions = {
    title: "Soma dos gastos por categoria",
    chartArea: { width: "70%", height: "70%" },
    is3D: true,
  };

  return (
    <div style={{ margin: 20 }}>
      <h2 style={{ margin: "20px 0" }}>Gastos por categoria</h2>
      {chartData.length === 1 ? (
        <p>Nenhum dado encontrado</p>
      ) : (
            <Chart
              height={"400px"}
              chartType="ColumnChart"
              data={chartData}
              options={chartOptions}
            />
      )}
    </div>
  );
}
