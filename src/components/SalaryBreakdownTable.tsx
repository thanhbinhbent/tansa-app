import { Table, Collapse, Typography, theme } from "antd";

const { Text } = Typography;
const { useToken } = theme;

export default function SalaryBreakdownTable({
  breakdown,
}: {
  breakdown: any;
}) {
  const { token } = useToken();

  const dataSource = [
    {
      key: "gross",
      label: "Lương GROSS",
      value: breakdown.grossSalary,
      color: token.colorPrimary,
    },
    {
      key: "social",
      label: "Bảo hiểm xã hội (8%)",
      value: breakdown.socialInsurance,
    },
    {
      key: "health",
      label: "Bảo hiểm y tế (1.5%)",
      value: breakdown.healthInsurance,
    },
    {
      key: "unemployment",
      label: "Bảo hiểm thất nghiệp (1%)",
      value: breakdown.unemploymentInsurance,
    },
    {
      key: "incomeBeforeTax",
      label: "Thu nhập trước thuế",
      value: breakdown.incomeBeforeTax,
    },
    {
      key: "taxableIncome",
      label: "Thu nhập chịu thuế",
      value: breakdown.taxableIncome,
    },
    { key: "tax", label: "Thuế thu nhập cá nhân", value: breakdown.tax },
    {
      key: "net",
      label: "Lương NET",
      value: breakdown.netSalary,
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
      title: "Giá trị (VNĐ)",
      dataIndex: "value",
      key: "value",
      render: (value: number, record: any) => (
        <Text style={{ color: record.color || "inherit" }}>
          {value.toLocaleString("vi-VN")}
        </Text>
      ),
    },
  ];

  return (
    <Collapse defaultActiveKey={["1"]} className="result-section">
      <Collapse.Panel header="Kết quả" key="1">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
          size="small"
        />
      </Collapse.Panel>
    </Collapse>
  );
}
