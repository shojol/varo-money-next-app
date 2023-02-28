"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { fetchData, useGlobalContext } from "../context/store";

export interface IFormValues {
  id: string;
  productId: string;
  productName: string;
  productCategory: string;
  email: string;
  image: any;
}
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;
const FormWrap = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  width: 100%;
`;

export default function CreateUpdateProduct({
  handleDialog,
  product,
}: {
  handleDialog: any;
  product?: IFormValues;
}) {
  const { setData } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const uniqueId = Date.now().toString(26);

  const initialValues: IFormValues = {
    id: product ? product.id : "",
    productId: product ? product.productId : uniqueId,
    productName: product ? product.productName : "",
    productCategory: product ? product.productCategory : "",
    email: product ? product.email : "",
    image: "",
  };
  const validationSchema = Yup.object({
    productId: Yup.string().required("Required"),
    productName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    productCategory: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email").required(),
    //   file: Yup.mixed().required("Required"),
  });
  const onSubmit = async (values: IFormValues, actions: any) => {
    if (!product) {
      setLoading(true);
      try {
        await fetch("http://127.0.0.1:8090/api/collections/varo_app/records", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        setLoading(false);
        setDone(true);
        handleDialog();
        fetchData().then((d) => setData(d?.items as any[]));
      } catch {
        alert("Something wrong. please try again.");
      }
      actions.setSubmitting(false);
    } else {
      try {
        await fetch(
          `http://127.0.0.1:8090/api/collections/varo_app/records/${product.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        setLoading(false);
        setDone(true);
        handleDialog();
        fetchData().then((d) => setData(d?.items as any[]));
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
        }) => {
          if (!!product && !values.email) {
            setValues({
              id: product.id,
              productId: product.productId,
              productName: product.productName,
              productCategory: product.productCategory,
              email: product.email,
              image: product.image,
            });
          }
          return (
            <FormWrap>
              <Typography>
                {!!product ? "Add Product" : "Update Product"}
              </Typography>

              <TextField
                label="Product Id"
                name="productId"
                size="small"
                value={product ? product.productId : uniqueId}
                disabled
              />
              {touched.productId && errors.productId && (
                <div>{errors.productId}</div>
              )}
              <TextField
                label="Product Name"
                name="productName"
                size="small"
                onChange={handleChange}
                value={values.productName}
                required
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
              />
              {touched.email && errors.email && <div>{errors.email}</div>}

              <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
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

              {/* <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e: any) => setFieldValue("image", e.target.files[0])}
              />
              {values.image && (
                <Image
                  width={100}
                  height={100}
                  src={URL.createObjectURL(values.image)}
                  alt="Thumb"
                />
              )} */}
              <Button type="submit" disabled={isSubmitting}>
                {loading ? (
                  <CircularProgress />
                ) : done ? (
                  <CheckIcon />
                ) : (
                  "Submit"
                )}
              </Button>
            </FormWrap>
          );
        }}
      </Formik>
    </FormContainer>
  );
}
