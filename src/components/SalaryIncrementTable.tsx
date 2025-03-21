import { useState, useEffect } from "react";
import { Table, Input, Typography, Space, Flex, Collapse, Button } from "antd";
import { ConversionType } from "../utils/taxHandler";
import { calculateSalaryIncrements } from "../utils/salaryIncreasment";
import { convertAmount, getExchangeRates } from "../utils/currency";
import { DeleteOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

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
  percentageIncreases = [10, 20, 30],
}: SalaryIncrementTableProps) {
  const [customIncrease, setCustomIncrease] = useState<string>("");
  const [customRows, setCustomRows] = useState<any[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    localStorage.getItem("selectedCurrency") || "USD"
  );
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );
  const [hoveredRowKey, setHoveredRowKey] = useState<string | null>(null);
  const [deletedRowKeys, setDeletedRowKeys] = useState<string[]>([]);

  useEffect(() => {
    getExchangeRates(setExchangeRates);
  }, []);

  useEffect(() => {
    if (customRows.length > 0) {
      const updatedRows = customRows.map((row) => {
        const updated = calculateSalaryIncrements(
          baseSalary,
          [row.increasePercent],
          conversionType,
          dependents
        )[0];
        return Object.assign({}, updated, {
          isCustom: true,
          key: row.key,
        }) as any;
      });
      setCustomRows(updatedRows);
    }
  }, [baseSalary, conversionType, dependents]);

  const handleCalculateCustomIncrease = () => {
    const parsedIncrease = parseFloat(customIncrease);
    if (!isNaN(parsedIncrease) && parsedIncrease > 0) {
      const newRow = calculateSalaryIncrements(
        baseSalary,
        [parsedIncrease],
        conversionType,
        dependents
      )[0];

      const rowWithExtras = Object.assign({}, newRow, {
        isCustom: true,
        key: uuidv4(),
      }) as any;
      setCustomRows((prevRows) => [rowWithExtras, ...prevRows]);
      setCustomIncrease("");
    }
  };

  const handleDeleteRow = (key: string) => {
    setDeletedRowKeys((prev) => [...prev, key]);

    setCustomRows((prevRows) => prevRows.filter((row) => row.key !== key));
  };

  const defaultData = calculateSalaryIncrements(
    baseSalary,
    percentageIncreases,
    conversionType,
    dependents
  ).map(
    (row, index) =>
      Object.assign({}, row, {
        key: `default-${row.increasePercent}-${index}`,
      }) as any
  );

  const combinedData = [...customRows, ...defaultData];

  const dataSource = combinedData.filter(
    (row) => !deletedRowKeys.includes(row.key)
  );

  const columns = [
    {
      title: "(%) tăng",
      dataIndex: "increasePercent",
      key: "increasePercent",
      render: (value: number, record: any) => (
        <Text strong={record.isCustom}>{value}%</Text>
      ),
    },
    {
      title: "Giá trị (VND)",
      key: "salaryDetails",
      render: (_: any, record: any) => (
        <div style={{ position: "relative" }}>
          <Space direction="vertical">
            <Text strong={record.isCustom}>
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
            <Text strong={record.isCustom}>
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
          <AnimatePresence>
            {hoveredRowKey === record.key && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Button
                  danger
                  type="text"
                  icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
                  style={{
                    backgroundColor: "#fff1f0",
                    borderRadius: 4,
                    padding: 4,
                  }}
                  onClick={() => handleDeleteRow(record.key)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
    },
  ];

  return (
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
        rowKey="key"
        onRow={(record) => ({
          onMouseEnter: () => setHoveredRowKey(record.key),
          onMouseLeave: () => setHoveredRowKey(null),
        })}
      />
    </Flex>
  );
}
