import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Customer } from "./types/customer";
import { Stats } from "./Stats";

export const Dashboard = () => {
  const [customerId, setCustomerId] = useState("");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data } = await axios.get<Customer[]>(
        "https://abnormalsecurity-public.s3.amazonaws.com/fe_dashboard/customers.json"
      );
      return data;
    },
  });

  useEffect(() => {
    setCustomerId(data?.[0].id ?? "");
  }, [data]);

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>An error occured</p>;

  return (
    <div className="w-[500px]">
      <div className="mb-5">
        <label className="block" id="customer">
          Customer:
        </label>
        <select
          name="customer"
          id="customer"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border rounded border-slate-500 dark:bg-slate-800"
        >
          {data.map(({ name, id }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <Stats customerId={customerId} />
    </div>
  );
};
