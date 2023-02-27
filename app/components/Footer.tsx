"use client";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const FooterContainer = styled(Typography)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  text-align: center;
  border-top: 1px solid #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function Footer() {
  return <FooterContainer>Footer</FooterContainer>;
}
