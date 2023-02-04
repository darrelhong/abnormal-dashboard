import clsx from "clsx";

import { Card } from "./Card";
import { Message } from "../types/message";
import { getTopDomains } from "../utils/message";
import { Fragment } from "react";

const TOP_N_COUNT = 5;

export const Domains = ({
  messages,
  className,
}: {
  messages: Message[];
  className?: string;
}) => {
  const topDomains = getTopDomains(messages);

  return (
    <Card className={clsx("p-3", className)}>
      <p className="text-lg font-bold">Top {TOP_N_COUNT} Malicious Domains:</p>
      <div className="grid grid-cols-[3fr_2fr_2fr] grid-flow-row">
        <p className="text-md font-bold">Domain</p>
        <p className="font-bold justify-self-end">% of threats</p>
        <p className="font-bold justify-self-end"># of threats</p>

        {topDomains
          ?.slice(0, TOP_N_COUNT)
          .map(({ domain, percentage, count }) => (
            <Fragment key={domain}>
              <p>{domain}</p>
              <p className="justify-self-end">{percentage}%</p>
              <p className="justify-self-end">{count}</p>
            </Fragment>
          ))}
      </div>
    </Card>
  );
};
