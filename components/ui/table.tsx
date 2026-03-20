import * as React from "react";
import { cn } from "@/app/lib/utils";

export const Table = ({ className, ...props }: React.ComponentProps<"table">) => <table className={cn("w-full caption-bottom text-sm", className)} {...props} />;
export const TableHeader = (props: React.ComponentProps<"thead">) => <thead className="[&_tr]:border-b" {...props} />;
export const TableBody = (props: React.ComponentProps<"tbody">) => <tbody className="[&_tr:last-child]:border-0" {...props} />;
export const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => <tr className={cn("border-b transition-colors hover:bg-muted/40", className)} {...props} />;
export const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => <th className={cn("h-11 px-4 text-left align-middle font-medium text-muted-foreground", className)} {...props} />;
export const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => <td className={cn("p-4 align-middle", className)} {...props} />;
