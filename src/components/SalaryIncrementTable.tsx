import { useState, useEffect } from "react";
import { Table, Input, Typography, Space, Flex, Collapse, Button } from "antd";
import { ConversionType } from "../utils/taxHandler";
import { calculateSalaryIncrements } from "../utils/salaryIncreasment";
import { convertAmount, getExchangeRates } from "../utils/currency";

const { Text } = Typography;

interface SalaryIncrementTableProps {
  baseSalary: number;
  conversionType: ConversionType;
  dependents?: number;
  percentageIncreases?: number[];
}

export default function SalaryIncrementTable({
  baseSalary,
  conversionType,
  dependents = 0,
  percentageIncreases = [10, 15, 20, 25, 30],
}: SalaryIncrementTableProps) {
  const [customIncrease, setCustomIncrease] = useState<string>("");
  const [customRow, setCustomRow] = useState<any | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    localStorage.getItem("selectedCurrency") || "USD"
  );
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );

  // Gọi API để lấy tỷ giá khi component mount
  useEffect(() => {
    getExchangeRates(setExchangeRates);
  }, []);

  const handleCalculateCustomIncrease = () => {
    const parsedIncrease = parseFloat(customIncrease);
    if (!isNaN(parsedIncrease) && parsedIncrease > 0) {
      const newRow = calculateSalaryIncrements(
        baseSalary,
        [parsedIncrease],
        conversionType,
        dependents
      )[0];
      setCustomRow(newRow);
    } else {
      setCustomRow(null);
    }
  };

  const handleDeleteCustomRow = () => {
    setCustomRow(null);
    setCustomIncrease("");
  };

  const dataSource = customRow
    ? [
        customRow,
        ...calculateSalaryIncrements(
          baseSalary,
          percentageIncreases,
          conversionType,
          dependents
        ).filter((row) => row.increasePercent !== customRow.increasePercent),
      ]
    : calculateSalaryIncrements(
        baseSalary,
        percentageIncreases,
        conversionType,
        dependents
      );

  const columns = [
    {
      title: "(%) tăng",
      dataIndex: "increasePercent",
      key: "increasePercent",
      render: (value: number, record: any) => (
        <Text strong={record === customRow}>{value}%</Text>
      ),
    },
    {
      title: "Giá trị (VND)",
      key: "salaryDetails",
      render: (_: any, record: any) => (
        <Space direction="vertical">
          <Text strong={record === customRow}>
            GROSS: {record.newGrossSalary.toLocaleString("vi-VN")}
          </Text>
          <Text type="secondary">
            {exchangeRates[selectedCurrency]
              ? convertAmount(
                  record.newGrossSalary,
                  exchangeRates,
                  selectedCurrency
                )
              : "Đang tải..."}{" "}
            {selectedCurrency}
          </Text>
          <Text strong={record === customRow}>
            NET: {record.newNetSalary.toLocaleString("vi-VN")}
          </Text>
          <Text type="secondary">
            {exchangeRates[selectedCurrency]
              ? convertAmount(
                  record.newNetSalary,
                  exchangeRates,
                  selectedCurrency
                )
              : "Đang tải..."}{" "}
            {selectedCurrency}
          </Text>
        </Space>
      ),
    },
    {
      title: "Xoá",
      key: "actions",
      render: (_: any, record: any) =>
        record === customRow ? (
          <Button danger size="small" onClick={handleDeleteCustomRow}>
            Xoá
          </Button>
        ) : null,
    },
  ];

  return (
    <Collapse className="result-section">
      <Collapse.Panel header="Xem mức lương có thể tăng" key="1">
        <Flex vertical gap={16}>
          <Flex gap={8} style={{ width: "100%" }}>
            <Input
              type="number"
              placeholder="Nhập tỉ lệ % mong muốn"
              value={customIncrease}
              onChange={(e) => setCustomIncrease(e.target.value)}
              style={{ flex: 1 }}
            />
            <Button
              type="primary"
              onClick={handleCalculateCustomIncrease}
              style={{ flex: 0.2 }}
            >
              Tính
            </Button>
          </Flex>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            rowKey="increasePercent"
          />
        </Flex>
      </Collapse.Panel>
    </Collapse>
  );
}
