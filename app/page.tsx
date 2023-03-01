"use client";
import { IProductData, useGlobalContext } from "./context/store";
import styled from "@emotion/styled";
import { Button, CircularProgress, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateUpdateProduct from "./components/CreateUpdateProduct";
import SearchProduct from "./components/SearchProduct";
import Cards from "./components/Cards";

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
const ProdButton = styled(Button)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  height: 100%;
`;

export default function Home() {
  const { data } = useGlobalContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProductData[]>([]);

  const handleDialog = () => {
    setDialogOpen((pre) => !pre);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      console.log(e.target.value);
      const typedLatter = e.target.value;
      setProducts(
        data.filter((product) =>
          product.productName.toLowerCase().includes(typedLatter.toLowerCase())
        )
      );
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      setProducts(data);
      setLoading(false);
    }
  }, [data]);
  return (
    <ProductContainer>
      <SearchProduct handleSearchInput={handleSearchInput} />
      <ProductUl>
        {!loading ? (
          data.length === 0 ? (
            <ProductLi
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ textAlign: "center", margin: 1 }}>
                Sorry!! You have no product yet.
              </Typography>
            </ProductLi>
          ) : (
            <Cards products={products} />
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
