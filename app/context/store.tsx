"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

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
export async function fetchData() {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/varo_app/records?page=1&perPage=30`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}
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
