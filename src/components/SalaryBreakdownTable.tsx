import { useState, useEffect } from "react";
import { Table, Typography, theme } from "antd";
import { convertAmount } from "../utils/currency";

const { Text } = Typography;
const { useToken } = theme;

export default function SalaryBreakdownTable({
  breakdown,
}: {
  breakdown: any;
}) {
  const { token } = useToken();
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    localStorage.getItem("selectedCurrency") || "USD"
  );

  useEffect(() => {
    const cachedRates = localStorage.getItem("exchangeRates");
    if (cachedRates) {
      setExchangeRates(JSON.parse(cachedRates));
    }
  }, []);

  useEffect(() => {
    if (breakdown) {
      setExchangeRates((prevRates) => ({ ...prevRates }));
    }
  }, [breakdown]);

  const dataSource = [
    {
      key: "gross",
      label: "Lương GROSS",
      value: breakdown?.grossSalary,
      color: token.colorPrimary,
    },
    {
      key: "social",
      label: "Bảo hiểm xã hội (8%)",
      value: breakdown?.socialInsurance,
    },
    {
      key: "health",
      label: "Bảo hiểm y tế (1.5%)",
      value: breakdown?.healthInsurance,
    },
    {
      key: "unemployment",
      label: "Bảo hiểm thất nghiệp (1%)",
      value: breakdown?.unemploymentInsurance,
    },
    {
      key: "incomeBeforeTax",
      label: "Thu nhập trước thuế",
      value: breakdown?.incomeBeforeTax,
    },
    {
      key: "taxableIncome",
      label: "Thu nhập chịu thuế",
      value: breakdown?.taxableIncome,
    },
    { key: "tax", label: "Thuế thu nhập cá nhân", value: breakdown?.tax },
    {
      key: "net",
      label: "Lương NET",
      value: breakdown?.netSalary,
      color: token.colorPrimary,
    },
  ];

  const columns = [
    {
      title: "Mục",
      dataIndex: "label",
      key: "label",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
      render: (value: number, record: { key: string }) => {
        const isGrossOrNet = record.key === "gross" || record.key === "net";
        return (
          <div>
            <Text
              strong={isGrossOrNet}
              style={{
                color: isGrossOrNet ? token.colorPrimary : "inherit",
                fontSize: isGrossOrNet ? "16px" : "14px",
              }}
            >
              {value?.toLocaleString("vi-VN")} VNĐ
            </Text>
            <br />
            <Text type="secondary">
              {exchangeRates[selectedCurrency]
                ? `${convertAmount(
                    value || 0,
                    exchangeRates,
                    selectedCurrency
                  )} ${selectedCurrency}`
                : "Đang tải..."}
            </Text>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      bordered
      size="small"
    />
  );
}
