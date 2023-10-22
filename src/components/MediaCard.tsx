import * as React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ heading, text }: { heading: string; text: string }) {
  return (
    <Card>
      <Image
        alt="Item"
        src="https://pic.pimg.tw/archerplus/1657717817-1259189726-g.png"
        width={640}
        height={480}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">加入購物車</Button>
        <Button size="small">更多資訊</Button>
      </CardActions>
    </Card>
  );
}
