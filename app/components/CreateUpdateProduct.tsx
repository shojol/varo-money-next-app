"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { fetchData, IProductData, useGlobalContext } from "../context/store";
import PocketBase from "pocketbase";
import Image from "next/image";
import noImg from "./../../public/no-img.jpg";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;
const FormWrap = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 700px;
  width: 300px;
  align-items: center;
`;
const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
`;

export default function CreateUpdateProduct({
  handleDialog,
  product,
}: {
  handleDialog: any;
  product?: IProductData;
}) {
  const { setData } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [newImg, setNewImg] = useState<any>("");
  const uniqueId = Date.now().toString(26);

  const initialValues: IProductData = {
    productId: product ? product.productId : uniqueId,
    productName: product ? product.productName : "",
    productCategory: product ? product.productCategory : "",
    email: product ? product.email : "",
    documents: product ? product.email : "",
    collectionId: product ? product.collectionId : "",
    collectionName: product ? product.collectionName : "",
    created: product ? product.created : "",
    id: product ? product.id : "",
    updated: product ? product.updated : "",
  };
  const validationSchema = Yup.object().shape({
    productId: Yup.string().required("Required"),
    productName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    productCategory: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email").required(),
    documents: Yup.mixed().required("Required"),
  });
  const onSubmit = async (values: IProductData, actions: any) => {
    // console.log(values);
    const pb = new PocketBase("http://127.0.0.1:8090");
    const formData = new FormData();
    formData.append("documents", values.documents);
    formData.append("productName", values.productName);
    formData.append("productId", values.productId);
    formData.append("productCategory", values.productCategory);
    formData.append("email", values.email);

    if (!product && values) {
      setLoading(true);
      try {
        await pb.collection("varo_app").create(formData);
        setLoading(false);
        setDone(true);
        handleDialog();
        fetchData().then((d) => setData(d as any[]));
      } catch {
        handleDialog();
        alert("Something wrong. please try again.");
      }
      actions.setSubmitting(false);
    } else {
      try {
        await pb.collection(values.collectionId).update(values.id, formData);
        setLoading(false);
        setDone(true);
        handleDialog();
        fetchData().then((d) => setData(d as any[]));
      } catch {
        alert("Something wrong. please try again.");
      }
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          errors,
          touched,
          isSubmitting,
          setValues,
          values,
          setFieldValue,
        }) => {
          if (!!product && !values.email) {
            setValues(product);
          }
          if (errors) {
            console.log(errors);
          }
          return (
            <FormWrap>
              <Typography>
                {!product ? "Add Product" : "Update Product"}
              </Typography>
              <TextField
                label="Product Id"
                name="productId"
                size="small"
                value={product ? product.productId : uniqueId}
                disabled
                fullWidth
              />
              <TextField
                label="Product Name"
                name="productName"
                size="small"
                onChange={handleChange}
                value={values.productName}
                required
                fullWidth
              />
              {touched.productName && errors.productName && (
                <div>{errors.productName}</div>
              )}
              <TextField
                label="Seller Email"
                name="email"
                size="small"
                onChange={handleChange}
                value={values.email}
                required
                fullWidth
              />
              {touched.email && errors.email && <div>{errors.email}</div>}

              <FormControl
                sx={{ m: 1, minWidth: 120, margin: 0, width: "100%" }}
                size="small"
              >
                <InputLabel id="demo-select-small">
                  Product Category*
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Product Category"
                  onChange={handleChange}
                  value={values.productCategory}
                  name="productCategory"
                  required
                >
                  <MenuItem value={"a"}>Category A</MenuItem>
                  <MenuItem value={"b"}>Category B</MenuItem>
                  <MenuItem value={"c"}>Category C</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  id="documents"
                  name="documents"
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    setNewImg(URL.createObjectURL(e.target.files[0]));
                    setFieldValue("documents", e.target.files[0]);
                  }}
                />
              </Button>
              {touched.documents && errors.documents && (
                <div>*{errors.documents as any}</div>
              )}
              {(product || newImg) && (
                <Image
                  src={
                    newImg
                      ? newImg
                      : product?.documents
                      ? `http://127.0.0.1:8090/api/files/varo_app/${product?.id}/${product?.documents}`
                      : noImg
                  }
                  alt={product?.productName || "product img"}
                  width={150}
                  height={150}
                />
              )}
              <Divider />

              <ButtonWrap>
                <Button variant="outlined" onClick={handleDialog}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : done ? (
                    <CheckIcon />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </ButtonWrap>
            </FormWrap>
          );
        }}
      </Formik>
    </FormContainer>
  );
}
