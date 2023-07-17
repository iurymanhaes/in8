import { Pagination, Table } from "antd";

type Props = {
  transactions: Transaction[];
};

function InfoTable({ transactions }: Props) {
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
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      pagination={{ position: ["bottomLeft"], defaultPageSize: 5 }}
      scroll={{ x: true }}
    />
  );
}

export default InfoTable;
