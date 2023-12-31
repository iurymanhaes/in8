import {
  CategoryExpenses,
  DailyExpenses,
  TransactionChart,
} from "@/components/Charts/";
import { TransactionsContext } from "@/contexts/Transactions/TransactionsContext";
import Head from "next/head";
import { useContext } from "react";

export default function Charts() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <>
      <Head>
        <title>Gráficos</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TransactionChart transactions={transactions} />
      <DailyExpenses transactions={transactions} />
      <CategoryExpenses transactions={transactions} />
    </>
  );
}
