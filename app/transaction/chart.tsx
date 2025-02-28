"use client";

import { TrendingUp } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";

export const description = "A bar chart";

interface Transactions {
  id: number;
  date: Date;
  amount: number;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TransactionPage() {
  const [data, setData] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DATA_URL}/transactions`);
        if (!res.ok) throw new Error("Failed to fetch");

        const jsonData = await res.json();
        console.log("Fetched data:", jsonData);

        // Transform the data to extract month from date
        const transformedData = jsonData.data.map((item: { date: string | number | Date }) => {
          const date = new Date(item.date);
          const month = date.toLocaleString("default", { month: "long" });
          return {
            ...item,
            date: month, // Mengganti date dengan bulan
          };
        });

        setData(transformedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Card className="w-full max-h-[350px]">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} domain={[100000, 190000]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="amount" type="linear" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
