"use client";

import { useEffect, useState } from "react";
import { Navbar } from "../../components/page";
import { TransactionPage } from "./chart";
import Image from "next/image";
import Buttons from "@/assets/Buttons.png";

interface Transactions {
  id: number;
  date: Date;
  amount: number;
}
export default function Transaction() {
  const [data, setData] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DATA_URL}/transactions`);
        if (!res.ok) throw new Error("Failed to fetch");

        const jsonData = await res.json();
        console.log("Fetched data:", jsonData);
        setData(jsonData.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalAmountTransactions = data.reduce((total, item) => total + item.amount, 0);
  const totalMeanTransactions = totalAmountTransactions / data.length;

  const formattedTotalAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalAmountTransactions);

  const formattedMeanAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalMeanTransactions);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row">
      <Navbar />
      <div className="flex flex-col flex-grow pt-16 md:pt-24">
        <h1 className="text-black text-3xl md:mt-5 mt-16 px-10 font-semibold">Transaction</h1>
        <div className="flex flex-col md:flex-row">
          <div className="border rounded-lg p-5 md:w-64 w-11/12 flex flex-col mx-10 mt-10">
            <p className="text-black text-lg font-semibold">Total Transaction</p>
            <p className="text-black text-2xl pt-7 font-semibold flex items-center gap-2">
              <Image src={Buttons} alt="Button Icon" className="w-8 h-8" />
              {formattedTotalAmount}
            </p>
          </div>
          <div className="border rounded-lg p-5 md:w-64 w-11/12 flex flex-col mx-10 mt-10">
            <p className="text-black text-lg font-semibold">Mean Transaction</p>
            <p className="text-black text-2xl pt-7 font-semibold flex items-center gap-2">
              <Image src={Buttons} alt="Button Icon" className="w-8 h-8" />
              {formattedMeanAmount}
            </p>
          </div>
        </div>
        <div className="px-10 pt-5">
          <TransactionPage />
        </div>
      </div>
    </div>
  );
}
