import { TransactionsContext } from "@/contexts/Transactions/TransactionsContext";
import {
  Form,
  Input,
  Button,
  Select,
  FormInstance,
  message,
  DatePicker,
  Col,
  Row,
} from "antd";
import moment from "moment";
import { useContext } from "react";

const categories: Transaction["category"][] = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Outros",
];

type Props = {
  form: FormInstance;
  onFinish: (values: Transaction) => void;
};

function TransactionForm({ form, onFinish }: Props) {
  const { monthlyBalance, income } = useContext(TransactionsContext);

  const handleFinish = (values: any) => {
    values.date = moment(values.date).format("YYYY-MM-DD");
    onFinish(values);
  };

  const handleValidateFields = () => {
    const value = form.getFieldValue("value");
    if (value > income || value > monthlyBalance) {
      message.error(
        `O valor da transação não pode ser maior que o saldo disponível (${income})`
      );
    } else if (
      monthlyBalance === null ||
      monthlyBalance === undefined ||
      isNaN(monthlyBalance)
    ) {
      message.error("Informe o valor mensal disponível");
    } else {
      form.validateFields().then((values: any) => {
        handleFinish(values);
      });
    }
  };

  const disabledDate = (current: any) => {
    return current.month() !== moment().month();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Form.Item
            label="Descrição"
            name="description"
            rules={[{ required: true, message: "Informe uma descrição" }]}
          >
            <Input
              placeholder="Descrição"
              disabled={monthlyBalance === null || monthlyBalance === undefined}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={4}>
          <Form.Item
            label="Valor"
            name="value"
            rules={[{ required: true, message: "Informe um valor" }]}
          >
            <Input
              type="number"
              placeholder="Valor"
              disabled={monthlyBalance === null || monthlyBalance === undefined}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={4}>
          <Form.Item
            label="Data"
            name="date"
            rules={[{ required: true, message: "Informe uma data" }]}
          >
            <DatePicker
              format={"DD/MM/YYYY"}
              disabledDate={disabledDate}
              disabled={monthlyBalance === null || monthlyBalance === undefined}
              style={{ width: "100%" }}
              placeholder="Selecione uma data"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Form.Item
            label="Categoria"
            name="category"
            rules={[{ required: true, message: "Selecione uma categoria" }]}
          >
            <Select
              placeholder="Selecione uma categoria"
              disabled={monthlyBalance === null || monthlyBalance === undefined}
            >
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={2}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              onClick={handleValidateFields}
              style={{ width: "100%" }}
            >
              Adicionar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default TransactionForm;
