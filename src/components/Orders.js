"use client";
import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, "2023/11/27", "Elvis Presley", "Tupelo, MS", "400", 1),
  createData(1, "2023/11/20", "Paul McCartney", "London, UK", "300", 2),
  createData(2, "2023/11/29", "Tom Scholz", "Boston, MA", "500", 3),
  createData(3, "2023/11/22", "Michael Jackson", "Gary, IN", "150", 4),
  createData(4," 2023/10/26","Bruce Springsteen","Long Branch, NJ","2000",5),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>
        <strong>近期訂單</strong>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>日期</TableCell>
            <TableCell>姓名</TableCell>
            <TableCell>面交地點</TableCell>
            <TableCell>付款金額</TableCell>
            <TableCell align="right">購買數量</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{`$${row.paymentMethod}`}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="../order"  sx={{ mt: 3 }}>
        查看更多訂單
      </Link>
    </React.Fragment>
  );
}
