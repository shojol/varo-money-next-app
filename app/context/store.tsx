"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type IProductData = {
  collectionId: string;
  collectionName: string;
  created: string;
  documents: any;
  email: string;
  id: string;
  productCategory: "a" | "b" | "c" | "other";
  productId: string;
  productName: string;
  updated: string;
};

interface ContextProps {
  data: IProductData[];
  setData: Dispatch<SetStateAction<IProductData[]>>;
}

const GlobalContext = createContext<ContextProps>({
  data: [],
  setData: (): IProductData[] => [],
});
export async function fetchData() {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/varo_app/records?page=1&perPage=30`,
    { cache: "no-store" }
  );
  const data = await res.json();
  console.log(data);
  return data;
}
export const GlobalContextProvider = ({ children }: any) => {
  const [data, setData] = useState<IProductData[]>([]);

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
