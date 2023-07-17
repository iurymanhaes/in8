import moment from "moment";
import { TransactionsContext } from "@/contexts/Transactions/TransactionsContext";
import { Table } from "antd";
import { useContext } from "react";

type Props = {
  filteredTransactions: Transaction[];
};

function TransactionTable({ filteredTransactions }: Props) {
  const { transactions, setTransactions } = useContext(TransactionsContext);

  const handleDeleteTransaction = (index: number) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };
  const columns = [
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
      render: (value: string) => (
        <span>
          {parseFloat(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      ),
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
      render: (record: Transaction) => {
        return (
          <div>
            <p>{moment(record.date).format("DD/MM/YYYY")}</p>
          </div>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (_: any, transaction: Transaction, index: number) => (
        <a onClick={() => handleDeleteTransaction(index)}>Deletar</a>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={filteredTransactions}
      pagination={{ position: ["bottomLeft"], defaultPageSize: 5 }}
      scroll={{ x: true }}
    />
  );
}

export default TransactionTable;
