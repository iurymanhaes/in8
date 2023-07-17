import { TransactionsContext } from "@/contexts/Transactions/TransactionsContext";
import { Form, InputNumberProps, Button, InputNumber, message } from "antd";
import {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ref extends InputNumberProps {
  focus: () => void;
}



export function InputBalance() {
  const [isEditable, setIsEditable] = useState(false);
  const { monthlyBalance, setMonthlyBalance, income } =
    useContext(TransactionsContext);

  const [form] = Form.useForm();
  const inputRef = useRef<ref>(null);
  

  const handleFinish = (values: any) => {
    try {
      if (values.monthlyBalance < income) {
        message.error("Saldo ficará negativo");
        return
      } else {
        setMonthlyBalance(values.monthlyBalance);
      }
    } catch (error) {
      console.error("Erro ao finalizar a operação:", error);
      message.error("Ocorreu um erro ao finalizar a operação.");
    } finally {
      setIsEditable(true);
    }
  };
  const handleEdit = () => {
    form.setFieldsValue({ monthlyBalance });
    setIsEditable(false);
  };

  useEffect(() => {
    if (inputRef.current && inputRef.current.focus) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={{ monthlyBalance }}
    >
      <Form.Item
        name="monthlyBalance"
        rules={[{ type: "number", min: 0, required: true }]}
      >
        <InputNumber
          inputMode="numeric"
          ref={inputRef as RefObject<any>}
          style={{ width: 200 }}
          value={monthlyBalance ? monthlyBalance.toString() : ""}
          disabled={isEditable}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          min={"0"}
          prefix={"R$"}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "20px" }}
        >
          Salvar
        </Button>
        <Button type="default" onClick={handleEdit}>
          Editar
        </Button>
      </Form.Item>
    </Form>
  );
}
