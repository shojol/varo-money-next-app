"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import PocketBase from "pocketbase";

export type IProductData = {
  collectionId?: string;
  collectionName?: string;
  created?: string;
  documents: any;
  email: string;
  id: string;
  productCategory: "a" | "b" | "c" | "";
  productId: string;
  productName: string;
  updated?: string;
};

interface ContextProps {
  data: IProductData[];
  setData: Dispatch<SetStateAction<IProductData[]>>;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  data: [],
  setData: (): IProductData[] => [],
});
export async function fetchData() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const records = await pb.collection("varo_app").getFullList({
    sort: "-created",
  });
  console.log(records);
  return records;
}
export const GlobalContextProvider = ({ children }: any) => {
  const [data, setData] = useState<IProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then((d) => setData(d as any[]))
      .then(() => setLoading(false));
  }, []);

  return (
    <GlobalContext.Provider value={{ data, setData, loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
