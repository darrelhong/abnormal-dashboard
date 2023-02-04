import clsx from "clsx";
import { Card } from "./Card";

export const StatCountCard = ({
  count,
  label,
  countClassName,
}: {
  count: number;
  label: string;
  countClassName?: string;
}) => {
  return (
    <Card className="min-w-[theme('spacing[60]')] grid place-content-center place-items-center px-4 py-5 gap-3">
      <p className={clsx("text-4xl font-bold", countClassName)}>{count}</p>
      <p className="text-md font-medium">{label}</p>
    </Card>
  );
};
