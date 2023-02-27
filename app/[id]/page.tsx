"use client";
import Image from "next/image";
import noImg from "./../../public/no-img.jpg";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import { usePathname } from "next/navigation";
import { Button, Typography } from "@mui/material";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;
const DetailsWrap = styled.div`
  /* display: flex;
  flex-direction: column; */
`;
const SingleItem = styled.div`
  display: flex;
  gap: 10px;
`;
export default function Product() {
  const { data, setData } = useGlobalContext();
  const [product, setProduct] = useState<any>();
  const pathname = usePathname();

  useEffect(() => {
    const clickedProduct = data.filter(
      (product) => `/${product.id}` === pathname
    );
    setProduct(clickedProduct[0]);
  }, [data, pathname]);

  return (
    <ProductContainer>
      <Image
        src={
          product?.productImg
            ? `http://127.0.0.1:8090/api/files/nd7v4rzi7ilzdpw/${product[0].id}/${product[0].productImg}`
            : noImg
        }
        alt={product?.productName}
        width={150}
        height={150}
      />
      <DetailsWrap>
        <SingleItem>
          <Typography>Id:</Typography>
          <Typography>{product?.productId}</Typography>
        </SingleItem>
        <SingleItem>
          <Typography>Name:</Typography>
          <Typography>{product?.productName}</Typography>
        </SingleItem>
        <SingleItem>
          <Typography>Category:</Typography>
          <Typography>{product?.productCategory}</Typography>
        </SingleItem>
        <SingleItem>
          <Typography>Email:</Typography>
          <Typography>{product?.email}</Typography>
        </SingleItem>
      </DetailsWrap>
      <div>
        <Button>Delete</Button>
        <Button>Edit</Button>
      </div>
    </ProductContainer>
  );
}
