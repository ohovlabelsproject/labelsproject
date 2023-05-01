import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function BarChartComponent(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={props.data}
        height={1000}
        border="1px"
        margin={{
          bottom: 5,
          left: 20,
          right: 30,
          top: 5,
        }}
        width={500}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDecimals={false}
          angle={-70}
          dataKey="name"
          height={185}
          interval={0}
          textAnchor="end"
        />
        <YAxis allowDecimals={false} />
        {/* <Tooltip content={<CustomTooltip />} /> */}
        {/* <Legend /> */}
        <Bar dataKey="pv" barSize={10} fill="#999" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
