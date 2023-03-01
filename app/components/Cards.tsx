"use client";
import Image from "next/image";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button, CircularProgress, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IProductData } from "../context/store";
import noImg from "./../../public/no-img.jpg";

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
  margin-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;

const InfoWrap = styled.div`
  display: flex;
  gap: 5px;
  line-height: 0;
  height: 22px;
  overflow: auto;
`;
interface IProp {
  products: IProductData[];
}
export default function Cards({ products }: IProp) {
  return (
    <>
      {products.map(
        ({
          id,
          email,
          productCategory,
          productId,
          documents,
          productName,
          collectionName,
        }) => (
          <Link key={productId} href={`./${id}`}>
            <ProductLi>
              <Image
                src={
                  documents
                    ? `http://127.0.0.1:8090/api/files/varo_app/${id}/${documents}`
                    : noImg
                }
                alt={productName}
                width={150}
                height={150}
              />
              <InfoContainer>
                <InfoWrap>
                  <Typography variant="caption" display="block" gutterBottom>
                    Id:
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {productId}
                  </Typography>
                </InfoWrap>
                <InfoWrap>
                  <Typography variant="caption" display="block" gutterBottom>
                    Name:
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {productName}
                  </Typography>
                </InfoWrap>
                <InfoWrap>
                  <Typography variant="caption" display="block" gutterBottom>
                    Category:
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {productCategory}
                  </Typography>
                </InfoWrap>
                <InfoWrap>
                  <Typography variant="caption" display="block" gutterBottom>
                    Email:
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {email}
                  </Typography>
                </InfoWrap>
              </InfoContainer>
            </ProductLi>
          </Link>
        )
      )}
    </>
  );
}
