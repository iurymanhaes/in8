import { Card, Typography } from "antd";

interface Props {
  balance: number;
  title: string;
  color: string;
}
export function AccountBalanceCard({ balance, title, color }: Props) {
  return (
    <Card title={title}>
      <Typography.Title level={2} style={{ color: color }}>
        {balance.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Typography.Title>
    </Card>
  );
}
