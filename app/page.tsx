"use client";
import Image from "next/image";
import CreateProduct from "./components/createProduct";
import { useGlobalContext } from "./context/store";
import noImg from "./../public/no-img.jpg";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button, Dialog, Typography } from "@mui/material";
import { useState } from "react";

const ProductContainer = styled.div`
  margin: auto;
  max-width: 1080px;
  min-height: 100vh;
  position: relative;
  padding-bottom: 100px;
`;
const ProductUl = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1080px;
`;

const ProductLi = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  text-align: start;
  color: #2f4f4f;
  width: 150px;
  height: 250px;
  font-size: 12px;
  padding: 5px;
  letter-spacing: 0.2px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;
const InfoContainer = styled.div`
  margin-top: 4px;
  padding-left: 5px;
`;
const ProdButton = styled(Button)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  height: 100%;
`;
const InfoWrap = styled.div`
  display: flex;
  line-height: 0;
  > p {
    &:nth-child(1) {
      color: gray;
      margin-right: 5px;
      font-size: 12px;
    }
  }
`;
export default function Home() {
  const { data } = useGlobalContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialog = () => {
    setDialogOpen((pre) => !pre);
  };
  return (
    <ProductContainer>
      <ProductUl>
        {data.map(
          ({
            id,
            email,
            productCategory,
            productId,
            productImg,
            productName,
          }) => (
            <Link key={productId} href={`./${id}`}>
              <ProductLi>
                <Image
                  src={
                    productImg
                      ? `http://127.0.0.1:8090/api/files/nd7v4rzi7ilzdpw/${id}/${productImg}`
                      : noImg
                  }
                  alt={productName}
                  width={150}
                  height={150}
                />
                <InfoContainer>
                  <InfoWrap>
                    <p>Id:</p>
                    <p>{productId}</p>
                  </InfoWrap>
                  <InfoWrap>
                    <p>Name:</p>
                    <p>{productName}</p>
                  </InfoWrap>
                  <InfoWrap>
                    <p>Category:</p>
                    <p>{productCategory}</p>
                  </InfoWrap>
                  <InfoWrap>
                    <p>Email:</p>
                    <p>{email}</p>
                  </InfoWrap>
                </InfoContainer>
              </ProductLi>
            </Link>
          )
        )}
        <ProductLi>
          <ProdButton onClick={handleDialog} variant="outlined">
            <div>+</div>
            <div>Add Product</div>
          </ProdButton>
        </ProductLi>
      </ProductUl>

      <Dialog open={dialogOpen} onClose={handleDialog}>
        <CreateProduct handleDialog={handleDialog} />
      </Dialog>
    </ProductContainer>
  );
}
