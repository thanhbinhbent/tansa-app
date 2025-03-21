import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Input,
  Radio,
  Typography,
  Space,
  Divider,
  Grid,
  Tooltip,
  Collapse,
} from "antd";
import {
  getDetailedBreakdown,
  ConversionType,
  DetailedSalaryBreakdown,
} from "../utils/taxHandler";
import { parseNumber, formatCurrency } from "../utils/currency";
import "antd/dist/reset.css";
import AnimatedWallet from "./AnimatedWallet";
import SalaryBreakdownTable from "./SalaryBreakdownTable";
import SalaryIncrementTable from "./SalaryIncrementTable";
import { motion } from "framer-motion";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function SalaryConverter() {
  const [salary, setSalary] = useState<number | string>("");
  const [dependents, setDependents] = useState<number | string>("");
  const [type, setType] = useState(ConversionType.GrossToNet);
  const [breakdown, setBreakdown] = useState<DetailedSalaryBreakdown | null>(
    null
  );
  const [insuranceSalary, setInsuranceSalary] = useState<number | undefined>(
    undefined
  );
  const [hasCalculated, setHasCalculated] = useState(false);

  const screens = useBreakpoint();

  useEffect(() => {
    if (!hasCalculated) return;

    const parsedSalary = Number(salary);
    const parsedDependents = Number(dependents);
    const parsedInsuranceSalary =
      insuranceSalary !== undefined ? Number(insuranceSalary) : undefined;

    if (!isNaN(parsedSalary) && parsedSalary > 0) {
      const validDependents = isNaN(parsedDependents) ? 0 : parsedDependents;
      const validInsuranceSalary =
        parsedInsuranceSalary !== undefined && !isNaN(parsedInsuranceSalary)
          ? parsedInsuranceSalary
          : parsedSalary;

      const result = getDetailedBreakdown(
        parsedSalary,
        validDependents,
        type,
        validInsuranceSalary
      );
      setBreakdown(result);
    } else {
      setBreakdown(null);
    }
  }, [salary, dependents, type, insuranceSalary, hasCalculated]);

  const handleCalculate = () => {
    const parsedSalary = Number(salary);
    const parsedDependents = Number(dependents);
    const parsedInsuranceSalary =
      insuranceSalary !== undefined ? Number(insuranceSalary) : undefined;

    if (!isNaN(parsedSalary) && parsedSalary > 0) {
      const validDependents = isNaN(parsedDependents) ? 0 : parsedDependents;
      const validInsuranceSalary =
        parsedInsuranceSalary !== undefined && !isNaN(parsedInsuranceSalary)
          ? parsedInsuranceSalary
          : parsedSalary;

      const result = getDetailedBreakdown(
        parsedSalary,
        validDependents,
        type,
        validInsuranceSalary
      );
      setBreakdown(result);
      setHasCalculated(true);
    } else {
      setBreakdown(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Card>
        <div
          style={{
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
            flexDirection: screens.md ? "row" : "column",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: screens.md ? "320px" : "100%" }}>
            <Title level={2} style={{ textAlign: "center" }}>
              TANSA
            </Title>
            <Text
              type="secondary"
              style={{ textAlign: "center", display: "block", width: "100%" }}
            >
              Công cụ tính lương GROSS, NET chính xác
            </Text>
            <Divider />
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Nhập mức lương (VNĐ):</Text>
                <Input
                  type="text"
                  value={salary !== "" ? formatCurrency(salary) : ""}
                  onChange={(e) => setSalary(parseNumber(e.target.value))}
                />
              </Space>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Số người phụ thuộc:</Text>
                <Input
                  type="text"
                  value={dependents !== "" ? formatCurrency(dependents) : ""}
                  onChange={(e) => setDependents(parseNumber(e.target.value))}
                />
              </Space>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Tooltip title="Chỉ nhập trong trường hợp lương đóng bảo hiểm khác với lương thực tế.">
                  <Text strong>Mức lương đóng bảo hiểm:</Text>
                </Tooltip>
                <Input
                  type="text"
                  value={
                    insuranceSalary !== undefined
                      ? formatCurrency(insuranceSalary)
                      : ""
                  }
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const parsedValue = parseNumber(inputValue);
                    setInsuranceSalary(
                      inputValue === "" || parsedValue === null
                        ? undefined
                        : parsedValue
                    );
                  }}
                />
              </Space>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Loại chuyển đổi:</Text>
                <Radio.Group
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <Space direction="vertical">
                    <Radio value={ConversionType.GrossToNet}>GROSS ➜ NET</Radio>
                    <Radio value={ConversionType.NetToGross}>NET ➜ GROSS</Radio>
                  </Space>
                </Radio.Group>
              </Space>
              {!hasCalculated && (
                <Button type="primary" onClick={handleCalculate} block>
                  Chuyển đổi
                </Button>
              )}
            </Space>
          </div>

          {breakdown ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ flex: 1 }}
              >
                <Collapse
                  defaultActiveKey={["1"]}
                  style={{
                    minWidth: screens.md ? "400px" : "100%",
                  }}
                  items={[
                    {
                      key: "1",
                      label: "Kết quả",
                      children: <SalaryBreakdownTable breakdown={breakdown} />,
                    },
                  ]}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ flex: 1 }}
              >
                <Collapse
                  defaultActiveKey={["1"]}
                  style={{
                    minWidth: screens.md ? "400px" : "100%",
                  }}
                  items={[
                    {
                      key: "1",
                      label: "Xem mức lương có thể tăng",
                      children: (
                        <SalaryIncrementTable
                          baseSalary={parseNumber(salary)}
                          conversionType={type}
                          dependents={Number(dependents) || 0}
                        />
                      ),
                    },
                  ]}
                />
              </motion.div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnimatedWallet />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
