import { ReactNode, useEffect, useState } from "react";
import { TransactionsContext } from "./TransactionsContext";

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);

  const [monthlyBalance, setMonthlyBalance] = useState<number>(0);

  useEffect(() => {
    const monthlyBalanceString = localStorage.getItem("monthlyBalance");
    if (monthlyBalanceString) {
      const balance = JSON.parse(monthlyBalanceString);
      setMonthlyBalance(balance);
    }
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("monthlyBalance", JSON.stringify(monthlyBalance));
    let totalIncome = 0;
    let totalExpense = 0;

    if (monthlyBalance !== null) {
      transactions.forEach((transaction) => {
        totalExpense += +transaction.value;
      });

      const balance = monthlyBalance - totalExpense;
      totalIncome += balance;
      setExpense(totalExpense);
      setIncome(totalIncome);
    }
  }, [transactions, monthlyBalance]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        income,
        expense,
        monthlyBalance,
        setMonthlyBalance,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
