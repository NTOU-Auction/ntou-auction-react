import * as React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ productName, isFixedPrice, productImage, productDescription, price, currentPrice }: { productName: string; isFixedPrice: boolean; productImage: string; productDescription:string; price:number; currentPrice:number }) {
  return (
    <Card variant="outlined">
      <Image
        alt="Image"
        src={productImage}
        width={640}
        height={480}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isFixedPrice ? "不二價："+price : "競標價："+currentPrice}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {productDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">加入購物車</Button>
        <Button size="small">更多資訊</Button>
      </CardActions>
    </Card>
  );
}
