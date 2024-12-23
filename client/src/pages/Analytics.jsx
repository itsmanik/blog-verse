import React, { PureComponent, useState } from "react";
import { useEffect } from "react";
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
import Engagements from "../components/Table/Engagements";
import api from "../utils/axios";

const Analytics = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const response = await api.get("blogs/my-blogs/");
      console.log(response.data);
      setBlogs(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const data = blogs.map((blog, index) => {
    const letter = "Blog " + String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
    return {
      name: letter, // Alphabetically numbered blog names (A, B, C, ...)
      views: blog.views,
      likes: blog.likes,
    };
  });
  
  

  return (
    <div className="mt-10 mb-14 w-full">
      <div className="h-[20rem]">
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
      <Engagements blogs={blogs} />
    </div>
  );
};
export default Analytics;
