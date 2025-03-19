import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Radio,
  Typography,
  Flex,
  Space,
  Divider,
  Grid,
} from "antd";
import {
  getDetailedBreakdown,
  ConversionType,
  DetailedSalaryBreakdown,
} from "../utils/taxHandler";
import { parseNumber, formatCurrency } from "../utils/number";
import "antd/dist/reset.css";
import AnimatedWallet from "./AnimatedWallet";
import SalaryBreakdownTable from "./SalaryBreakdownTable";
import SalaryIncrementTable from "./SalaryIncrementTable";
import { motion } from "framer-motion";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid; // Hook để lấy kích thước màn hình

export default function SalaryConverter() {
  const [salary, setSalary] = useState<number | string>("");
  const [dependents, setDependents] = useState<number | string>("");
  const [type, setType] = useState<ConversionType>(ConversionType.GrossToNet);
  const [breakdown, setBreakdown] = useState<DetailedSalaryBreakdown | null>(
    null
  );

  const screens = useBreakpoint(); // Lấy kích thước màn hình

  const handleConvert = () => {
    const parsedSalary = Number(salary);
    const parsedDependents = Number(dependents);

    if (isNaN(parsedSalary) || parsedSalary <= 0) return;
    const validDependents = isNaN(parsedDependents) ? 0 : parsedDependents;

    const result = getDetailedBreakdown(parsedSalary, validDependents, type);
    setBreakdown(result);
  };

  return (
    <Flex
      justify="center"
      align="center"
      className="salary-converter-container"
    >
      <Card className="salary-converter-card">
        <Flex
          gap={32}
          wrap="wrap"
          vertical={screens.md ? false : true}
          style={{ width: "100%" }}
        >
          <Flex vertical flex={1} className="salary-converter-column-left">
            <Title level={2} style={{ textAlign: "center" }}>
              TANSA
            </Title>
            <Text type="secondary" style={{ textAlign: "center" }}>
              Công cụ tính lương GROSS, NET chính xác
            </Text>

            <Divider />

            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Nhập mức lương (VNĐ):</Text>
                <Input
                  type="text"
                  value={formatCurrency(salary)}
                  onChange={(e) => setSalary(parseNumber(e.target.value))}
                />
              </Space>

              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Số người phụ thuộc:</Text>
                <Input
                  type="text"
                  value={formatCurrency(dependents)}
                  onChange={(e) => setDependents(parseNumber(e.target.value))}
                />
              </Space>

              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Loại chuyển đổi:</Text>
                <Radio.Group
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <Space>
                    <Radio value={ConversionType.GrossToNet}>GROSS ➜ NET</Radio>
                    <Radio value={ConversionType.NetToGross}>NET ➜ GROSS</Radio>
                  </Space>
                </Radio.Group>
              </Space>

              <Button type="primary" block onClick={handleConvert}>
                Chuyển đổi
              </Button>
            </Space>
          </Flex>

          <Flex
            vertical
            flex={1}
            align="center"
            justify="center"
            className="salary-converter-column-right"
          >
            {breakdown ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }}
              >
                <SalaryBreakdownTable breakdown={breakdown} />
                <SalaryIncrementTable
                  baseSalary={parseNumber(salary)}
                  conversionType={type}
                  dependents={Number(dependents) || 0}
                />
              </motion.div>
            ) : (
              <AnimatedWallet />
            )}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
