"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchData } from "../api/hello/route";

export type DataType = {
  id: string;
  productName: string;
  productId: string;
  productCategory: "category a" | "category b" | "category c";
  productImg: string;
  email: string;
};

interface ContextProps {
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  data: [],
  setData: (): DataType[] => [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData().then((d) => setData(d?.items as any[]));
  }, []);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
