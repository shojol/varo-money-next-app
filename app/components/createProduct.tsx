"use client";

import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// interface IProps {
//   handleClick: (e: any) => void;
// }
interface MyFormValues {
  productId: string;
  productName: string;
  productCategory: string;
  email: string;
  image: any;
}
const productIdGenerator = Date.now().toString(36) + Math.random().toString(36);
const initialValues: MyFormValues = {
  productId: productIdGenerator,
  productName: "",
  productCategory: "",
  email: "",
  image: "",
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
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
export default function CreateProduct() {
  const router = useRouter();

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
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
            ).then((res) => {
              console.log(res);
              router.refresh();
              window.location.reload();
            });
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
                defaultValue={productIdGenerator}
                disabled
              />
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
                Submit
              </Button>
            </FormWrap>
          );
        }}
      </Formik>
    </FormContainer>
  );
}
