"use client";
import Image from "next/image";
import { useGlobalContext } from "./context/store";
import noImg from "./../public/no-img.jpg";
import styled from "@emotion/styled";
import Link from "next/link";
import { Button, CircularProgress, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateUpdateProduct from "./components/CreateUpdateProduct";
// import SearchProduct from "./components/SearchProduct";

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
  margin-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
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
  gap: 5px;
  line-height: 0;
  height: 22px;
  overflow: auto;
`;

export default function Home() {
  const { data } = useGlobalContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDialog = () => {
    setDialogOpen((pre) => !pre);
  };
  // const handleSearchInput = (e: unknown) => {
  //   console.log(e.target.value);
  //   const typedLatter = e.target.value;
  // };
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  return (
    <ProductContainer>
      {/* <SearchProduct handleSearchInput={handleSearchInput} /> */}
      <ProductUl>
        {!loading ? (
          data.map(
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
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Id:
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {productId}
                      </Typography>
                    </InfoWrap>
                    <InfoWrap>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Name:
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {productName}
                      </Typography>
                    </InfoWrap>
                    <InfoWrap>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Category:
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {productCategory}
                      </Typography>
                    </InfoWrap>
                    <InfoWrap>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Email:
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {email}
                      </Typography>
                    </InfoWrap>
                  </InfoContainer>
                </ProductLi>
              </Link>
            )
          )
        ) : (
          <ProductLi
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </ProductLi>
        )}
        <ProductLi>
          <ProdButton onClick={handleDialog} variant="outlined">
            <div>+</div>
            <div>Add Product</div>
          </ProdButton>
        </ProductLi>
      </ProductUl>

      <Dialog open={dialogOpen} onClose={handleDialog}>
        <CreateUpdateProduct handleDialog={handleDialog} />
      </Dialog>
    </ProductContainer>
  );
}
