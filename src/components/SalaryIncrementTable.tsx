import { useState } from "react";
import { Table, Input, Typography, Space, Flex, Collapse, Button } from "antd";
import { ConversionType } from "../utils/taxHandler";
import {
  calculateSalaryIncrements,
  formatCurrency,
} from "../utils/salaryIncreasment";

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
  percentageIncreases = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
}: SalaryIncrementTableProps) {
  const [customIncrease, setCustomIncrease] = useState<string>("");
  const [customRow, setCustomRow] = useState<any | null>(null);

  const increments = calculateSalaryIncrements(
    baseSalary,
    percentageIncreases,
    conversionType,
    dependents
  );

  const handleCalculateCustomIncrease = () => {
    const parsedIncrease = parseFloat(customIncrease);
    if (!isNaN(parsedIncrease) && parsedIncrease > 0) {
      const newRow = calculateSalaryIncrements(
        baseSalary,
        [parsedIncrease],
        conversionType,
        dependents
      )[0]; // Chỉ lấy hàng đầu tiên

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
        ...increments.filter(
          (row) => row.increasePercent !== customRow.increasePercent
        ),
      ]
    : increments;

  const columns = [
    {
      title: "Tỉ lệ tăng (%)",
      dataIndex: "increasePercent",
      key: "increasePercent",
      render: (value: number, record: any) => (
        <Text strong={record === customRow}>{value}%</Text>
      ),
    },
    {
      title: "Lương GROSS (VND)",
      dataIndex: "newGrossSalary",
      key: "newGrossSalary",
      render: (value: number, record: any) => (
        <Text strong={record === customRow}>{formatCurrency(value)}</Text>
      ),
    },
    {
      title: "Lương NET (VND)",
      dataIndex: "newNetSalary",
      key: "newNetSalary",
      render: (value: number, record: any) => (
        <Text strong={record === customRow}>{formatCurrency(value)}</Text>
      ),
    },
    {
      title: "Thao tác",
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
