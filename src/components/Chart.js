"use client";
// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Label,
//   ResponsiveContainer,
// } from "recharts";
import Title from "./Title";

// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

// const data = [
//   createData("12/04", 1000),
//   createData("12/05", 300),
//   createData("12/06", 2600),
//   createData("12/07", 800),
//   createData("12/08", 1500),
//   createData("12/09", 200),
// ];

// export default function Chart() {
//   const theme = useTheme();

//   return (
// <Paper
//   sx={{
//     p: 2,
//     display: "flex",
//     flexDirection: "column",
//     height: 240,
//   }}
// >
//       <React.Fragment>
//         <Title>本週收入</Title>
//         <ResponsiveContainer>
//           <LineChart
//             data={data}
//             margin={{
//               top: 16,
//               right: 16,
//               bottom: 0,
//               left: 24,
//             }}
//           >
//             <XAxis
//               dataKey="time"
//               stroke={theme.palette.text.secondary}
//               style={theme.typography.body2}
//             />
//             <YAxis
//               stroke={theme.palette.text.secondary}
//               style={theme.typography.body2}
//             >
//               <Label
//                 angle={270}
//                 position="left"
//                 style={{
//                   textAnchor: "middle",
//                   fill: theme.palette.text.primary,
//                   ...theme.typography.body1,
//                 }}
//               >
//                 收入($)
//               </Label>
//             </YAxis>
//             <Line
//               isAnimationActive={false}
//               type="monotone"
//               dataKey="amount"
//               stroke={theme.palette.primary.main}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </React.Fragment>
//     </Paper>
//   );
// }

// import React, { PureComponent } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// export default function Example() {
//   return (
// <Paper
//   sx={{
//     p: 2,
//     display: "flex",
//     flexDirection: "column",
//     height: 240,
//   }}
// >
//   <React.Fragment>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             width={500}
//             height={300}
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {/* <Line
//                 type="monotone"
//                 dataKey="pv"
//                 stroke="#8884d8"
//                 activeDot={{ r: 8 }}
//               /> */}
//             <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//       </React.Fragment>
//     </Paper>
//   );
// }

import React from "react";
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

const data = [
  {
    name: "12/04",
    uv: 4000,
    收入: 240,
    amt: 2400,
  },
  {
    name: "12/05",
    uv: 3000,
    收入: 139,
    amt: 2210,
  },
  {
    name: "12/06",
    uv: 2000,
    收入: 980,
    amt: 2290,
  },
  {
    name: "12/07",
    uv: 2780,
    收入: 398,
    amt: 2000,
  },
  {
    name: "12/08",
    uv: 1890,
    收入: 480,
    amt: 2181,
  },
  {
    name: "12/09",
    uv: 2390,
    收入: 380,
    amt: 2500,
  },
  {
    name: "12/10",
    uv: 3490,
    收入: 430,
    amt: 2100,
  },
];

export default function Chart() {
  return (
    // <Paper
    //   sx={{
    //     p: 2,
    //     display: "flex",
    //     flexDirection: "column",
    //     height: 350,
    //   }}
    // >
    <React.Fragment>
        <Title><strong>本週收入</strong></Title>
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
            <Tooltip />
            <Legend />
            <Bar
              dataKey="收入"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            {/* <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            /> */}
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    /* </Paper> */ 
  );
}