import Head from "next/head";
import { v4 as uuidv4 } from 'uuid';
import { Row, Col, Form, message, Typography } from "antd";
import TransactionForm from "../components/Forms/TransactionForm";
import { useContext } from "react";

import { TransactionsContext } from "@/contexts/Transactions/TransactionsContext";
import { AccountBalanceCard } from "@/components/Balance/AccountBalanceCard";
import { InputBalance } from "@/components/Balance/InputBalance";

export default function Home() {
  const [form] = Form.useForm();

  const {
    transactions,
    setTransactions,
    income,
    expense,
    monthlyBalance,
  } = useContext(TransactionsContext);

  const handleAddTransaction = (values: Transaction) => {
    const { description, value, date, category } = values;
    const newTransaction: Transaction = {
      id: uuidv4(),
      description,
      value,
      date,
      category,
    };
    try {
      setTransactions([...transactions, newTransaction]);
      form.resetFields();
      message.success("Transação adicionada com sucesso!");
    } catch (error) {
      message.error("Ocorreu um erro ao adicionar a transação.");
    }
  };

  return (
    <>
      <Head>
        <title>Expenses</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Typography.Title level={3}>Saldo do Mês</Typography.Title>

            <InputBalance />
          </Col>
        </Row>
        <Row justify="space-around" gutter={[10, 20]}>
          <Col xl={8} lg={6} md={12} sm={24} xs={24}>
            <AccountBalanceCard
              balance={income}
              title="Saldo"
              color={income < 0 ? "red" : "green"}
            />
          </Col>
          <Col xl={8} lg={6} md={12} sm={24} xs={24}>
            <AccountBalanceCard balance={expense} title="Saida" color="red" />
          </Col>
          <Col xl={8} lg={6} md={12} sm={24} xs={24}>
            <AccountBalanceCard
              balance={monthlyBalance || 0}
              title="Entrada"
              color="blue"
            />
          </Col>
        </Row>
        <Row gutter={[0, 20]}>
          <Col span={24} style={{ margin: "16px 0" }}>
            <Typography.Title level={3}>Adicionar Transação</Typography.Title>
            <TransactionForm form={form} onFinish={handleAddTransaction} />
          </Col>
        </Row>
      </>
    </>
  );
}
