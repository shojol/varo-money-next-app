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

// interface IProps {
//   handleClick: (e: any) => void;
// }
// interface MyFormValues {
//   productId: string;
//   productName: string;
//   productCategory: string;
//   email: string;
//   image: any;
// }

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
  > :nth-child(1) {
    margin-bottom: 12px;
  }
`;

export default function CreateProduct({ handleDialog }: any) {
  const { setData } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const uniqueId = Date.now().toString(26);
  return (
    <FormContainer>
      <Formik
        initialValues={{
          productId: uniqueId,
          productName: "",
          productCategory: "",
          email: "",
          image: "",
        }}
        validationSchema={Yup.object({
          productId: Yup.string().required("Required"),
          productName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          productCategory: Yup.string().required("Required"),
          email: Yup.string().email().required(),
          //   file: Yup.mixed().required("Required"),
        })}
        onSubmit={async (values, actions) => {
          setLoading(true);
          try {
            await fetch(
              "http://127.0.0.1:8090/api/collections/varo_app/records",
              {
                method: "POST",
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
          actions.setSubmitting(false);
        }}
      >
        {({ handleChange, errors, touched, isSubmitting }) => {
          return (
            <FormWrap>
              <Typography>Add Product</Typography>

              <TextField
                label="Product Id"
                name="productId"
                size="small"
                value={uniqueId}
                // defaultValue={Date.now().toString(26)}
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
