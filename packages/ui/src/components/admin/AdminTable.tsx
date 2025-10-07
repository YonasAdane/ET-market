"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface AdminTableProps<T> {
  data: T[];
  columns: AdminColumnDef<T>[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  emptyMessage?: string;
  className?: string;
  cardTitle?: string;
  cardDescription?: string;
}

interface AdminColumnDef<T> {
  key: keyof T | string;
  header: string;
  cell?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

function AdminTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error,
  onRetry,
  emptyMessage = "No data available",
  className,
  cardTitle,
  cardDescription
}: AdminTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Convert AdminColumnDef to TanStack ColumnDef
  const tanstackColumns = React.useMemo((): ColumnDef<T>[] => {
    return columns.map((column) => ({
      id: column.key as string,
      header: ({ column: tanstackColumn }) => {
        if (column.sortable) {
          return (
            <Button
              variant="ghost"
              onClick={() => tanstackColumn.toggleSorting()}
              className="p-0 hover:bg-transparent font-medium"
            >
              {column.header}
              {tanstackColumn.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : tanstackColumn.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        }
        return <span className="font-medium">{column.header}</span>;
      },
      cell: ({ row }) => {
        const value = row.original[column.key as keyof T];
        // Use the custom cell function if provided, otherwise use the default
        return column.cell 
          ? column.cell(value, row.original) 
          : String(value || '');
      },
    }));
  }, [columns]);

  const table = useReactTable({
    data,
    columns: tanstackColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        {cardTitle && (
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight">
              {cardTitle}
            </CardTitle>
            {cardDescription && (
              <p className="text-sm text-muted-foreground">
                {cardDescription}
              </p>
            )}
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-4">
                {Array.from({ length: columns.length }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-[100px]" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("w-full", className)}>
        {cardTitle && (
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight">
              {cardTitle}
            </CardTitle>
            {cardDescription && (
              <p className="text-sm text-muted-foreground">
                {cardDescription}
              </p>
            )}
          </CardHeader>
        )}
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              {onRetry && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRetry}
                  className="ml-4"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        {cardTitle && (
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight">
              {cardTitle}
            </CardTitle>
            {cardDescription && (
              <p className="text-sm text-muted-foreground">
                {cardDescription}
              </p>
            )}
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      {cardTitle && (
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">
            {cardTitle}
          </CardTitle>
          {cardDescription && (
            <p className="text-sm text-muted-foreground">
              {cardDescription}
            </p>
          )}
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      className={cn(
                        "font-medium",
                        columns.find(col => col.key === header.column.id)?.className
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow 
                  key={row.id}
                  className="transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id}
                      className={cn(
                        "py-3",
                        columns.find(col => col.key === cell.column.id)?.className
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminTable;
export type { AdminTableProps, AdminColumnDef };