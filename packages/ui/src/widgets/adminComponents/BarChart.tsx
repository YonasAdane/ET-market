/** @format */
"use client";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar
} from "recharts";

type Props = {};

const data = [
  {
    name: "Jan",
    total: Math.floor(0.6 * 5000) + 1000
  },
  {
    name: "Feb",
    total: Math.floor(0.3 * 5000) + 1000
  },
  {
    name: "Mar",
    total: Math.floor(0.1 * 5000) + 1000
  },
  {
    name: "Apr",
    total: Math.floor(0.9 * 5000) + 1000
  },
  {
    name: "May",
    total: Math.floor(0.3 * 5000) + 1000
  },
  {
    name: "Jun",
    total: Math.floor(0.5 * 5000) + 1000
  },
  {
    name: "Jul",
    total: Math.floor(0.8 * 5000) + 1000
  },
  {
    name: "Aug",
    total: Math.floor(0.4 * 5000) + 1000
  },
  {
    name: "Sep",
    total: Math.floor(0.49 * 5000) + 1000
  },
  {
    name: "Oct",
    total: Math.floor(0.2 * 5000) + 1000
  },
  {
    name: "Nov",
    total: Math.floor(0.6 * 5000) + 1000
  },
  {
    name: "Dec",
    total: Math.floor(0.7 * 5000) + 1000
  }
];

export default function BarChart({}: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
