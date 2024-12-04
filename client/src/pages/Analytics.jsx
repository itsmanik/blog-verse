import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const data = [
    {
      name: "Blog A",
      views: 4000,
      likes: 2400,
    },
    {
      name: "Blog B",
      views: 3000,
      likes: 1398,
    },
    {
      name: "Blog C",
      views: 2000,
      likes: 9800,
    },
    {
      name: "Blog D",
      views: 2780,
      likes: 3908,
    },
    {
      name: "Blog E",
      views: 1890,
      likes: 4800,
    },
    {
      name: "Blog F",
      views: 2390,
      likes: 3800,
    },
    {
      name: "Blog G",
      views: 3490,
      likes: 4300,
    },
  ];
  return (
    <div className="h-[20rem] mt-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderRadius: "8px",
              border: "1px solid #888", 
              color: "#fff",
            }}
            cursor={{ fill: "rgba(200, 200, 200, 0.3)" }}
          />
          <Legend />
          <Bar
            dataKey="views"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="likes"
            fill="#82ca9d"
            activeBar={<Rectangle fill="skyblue" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Analytics;
