"use client"
import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title><strong>最近的總收入</strong></Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        截止日期 2023/11/28
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          查看平均收入
        </Link>
      </div>
    </React.Fragment>
  );
}