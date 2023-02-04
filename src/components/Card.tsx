import clsx from "clsx";
import { ReactNode } from "react";

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={clsx("border-2 border-slate-900 rounded-lg", className)}>
    {children}
  </div>
);
