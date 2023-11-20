import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TpModal from '@/components/TpModal'
import styled from 'styled-components'
import './ScrollBar.css';

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  line-height:1000px; 
`
const ModalContent = styled.div`
  margin-bottom: 15px;
`

export default function MediaCard({ commodity }: { commodity:object }) {
  
  
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible)
  }
  
  return (
    <Card variant="outlined" sx={{ width:'400px', height:'400px' }}>
      <Image
        alt="Image"
        src={"data:image/jpeg;base64," + commodity.productImage}
        width={640}
        height={480}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <CardContent >
        <Typography gutterBottom variant="h6" component="div">
          {commodity.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {commodity.isFixedPrice ? "不二價："+commodity.price : "競標價："+commodity.currentPrice}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {commodity.productDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">加入購物車</Button>
        <Button size="small" onClick={handleToggleModalShowUp}>
          更多資訊
        </Button>
      </CardActions>

      <TpModal
        isVisible={isVisible}
        onClose={handleToggleModalShowUp}
      >

        <ModalContent>
          <div>
            <img
              alt="Image"
              src={"data:image/jpeg;base64," + commodity.productImage}
              width="50%"
              style={{float:"left", padding: "0px 20px 20px 0px"}}
            />
            <div style={{overflowY:"scroll", scrollbarWidth: "none"}}>
              <h2 style={{ fontWeight: 'bolder', flex: '1', textAlign: 'center'}}>
                {commodity.productName}
              </h2>
              {commodity.isFixedPrice ?
                (<p style={{ color: "black", fontWeight: 'bold'}}>價格：${commodity.price}</p>
                ) : 
                ( <div>
                    <p style={{ color: "black", fontWeight: 'bold'}}>起標價：${commodity.upsetPrice}</p>
                    <p style={{ color: "black", fontWeight: 'bold'}}>競標價：${commodity.currentPrice}</p>
                  </div>
                )
              }
              <p style={{ color: "black"}}>{commodity.productDescription} </p>
              <p style={{ color: "black"}}>賣家：<a>{commodity.seller}</a></p>
              <p style={{ color: "black"}}>分類：<a href={"/"+commodity.productType}>{commodity.productType}</a></p>
              <ModalFooter>
                <button style={{}} onClick={handleToggleModalShowUp}>{commodity.isFixedPrice ? "加入購物車" : "加注"}</button>
              </ModalFooter>
            </div>
          </div>
        </ModalContent>

      </TpModal>

    </Card>
  );
}