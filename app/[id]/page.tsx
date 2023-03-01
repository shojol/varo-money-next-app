"use client";
import Image from "next/image";
import noImg from "./../../public/no-img.jpg";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { fetchData, IProductData, useGlobalContext } from "../context/store";
import { usePathname } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CreateUpdateProduct from "../components/CreateUpdateProduct";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;
const SingleItem = styled.div`
  display: flex;
  gap: 10px;
`;

export default function Product() {
  const { data, setData } = useGlobalContext();
  const [product, setProduct] = useState<IProductData>();
  const [popup, setPopup] = useState({ show: false, id: "" });
  const pathname = usePathname();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditDialog = () => {
    setEditDialogOpen((pre) => !pre);
  };
  const router = useRouter();

  useEffect(() => {
    const clickedProduct = data.filter((p) => `/${p.id}` === pathname);
    console.log(clickedProduct[0]);
    setProduct(clickedProduct[0]);
  }, [data, pathname]);

  const handleDel = (id?: string) => id && setPopup({ show: true, id });
  const handleClose = () => setPopup({ show: false, id: "" });

  const deleteProduct = async () => {
    try {
      await fetch(
        `http://127.0.0.1:8090/api/collections/varo_app/records/${popup.id}`,
        {
          method: "DELETE",
        }
      );
      router.push("/");
    } catch {
      alert("Something is wrong. please try again.");
    }
    await fetchData().then((d) => setData(d as any[]));
  };

  return (
    <ProductContainer>
      <Image
        src={
          product?.documents
            ? `http://127.0.0.1:8090/api/files/varo_app/${product?.id}/${product?.documents}`
            : noImg
        }
        alt={product?.productName || "product img"}
        width={150}
        height={150}
      />
      <div>
        <SingleItem>
          <Typography variant="overline" display="block" gutterBottom>
            Id:
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {product?.productId}
          </Typography>
        </SingleItem>
        <SingleItem>
          <Typography variant="overline" display="block" gutterBottom>
            Name:
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {product?.productName}
          </Typography>
        </SingleItem>
        <SingleItem>
          <Typography variant="overline" display="block" gutterBottom>
            Category:
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {product?.productCategory}
          </Typography>
        </SingleItem>
        <SingleItem>
          <Typography variant="overline" display="block" gutterBottom>
            Email:
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {product?.email}
          </Typography>
        </SingleItem>
      </div>
      <div>
        <Button
          variant="outlined"
          onClick={() => handleDel(product?.id)}
          startIcon={<DeleteIcon />}
          style={{ marginRight: 10 }}
        >
          Delete
        </Button>
        <Button variant="outlined" onClick={() => setEditDialogOpen(true)}>
          Edit
        </Button>
      </div>
      <Dialog
        open={popup.show}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this item?"}
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={deleteProduct}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleEditDialog}>
        <CreateUpdateProduct
          product={product}
          handleDialog={handleEditDialog}
        />
      </Dialog>
    </ProductContainer>
  );
}
