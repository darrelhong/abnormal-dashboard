import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Domains } from "./components/Domains";
import { StatCountCard } from "./components/StatCountCard";
import { Message } from "./types/message";
import { getHighSeverityCount, getSpamCount } from "./utils/message";

export const Stats = ({ customerId }: { customerId: string }) => {
  if (!customerId) return <></>;
  
  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["messages", customerId],
    queryFn: async () => {
      const { data } = await axios.get<Message[]>(
        `https://abnormalsecurity-public.s3.amazonaws.com/fe_dashboard/${customerId}/messages.json`
      );
      return data;
    },
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>An error occured</p>;

  return (
    <div className="grid gap-5 grid-cols-2">
      <StatCountCard
        count={getHighSeverityCount(messages)}
        countClassName="text-red-600"
        label="High Severity Threats"
      />

      <StatCountCard
        count={getSpamCount(messages)}
        countClassName="text-orange-600"
        label="Spam Messages"
      />

      <Domains messages={messages} className="col-span-2" />
    </div>
  );
};
