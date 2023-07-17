type Category = "Alimentação" | "Transporte" | "Moradia" | "Lazer" | "Outros";

interface Transaction {
  id: string;
  description: string;
  value: string;
  date: Date;
  category: Category | "Todos";
}

interface TransactionsContextData {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  income: number;
  expense: number;
  monthlyBalance: number ;
  setMonthlyBalance: React.Dispatch<React.SetStateAction<number>>;
}
