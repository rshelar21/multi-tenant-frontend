import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePagination } from '@/hooks/use-pagination';
import { IMeta } from '@/types/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface ReactTableProps<T> {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  isWarningMsg?: string;
  meta?: IMeta | undefined;
}

const TableSkeleton = ({ columnSpan }: { columnSpan: number }) => {
  return (
    <TableRow className="last:border-0">
      <TableCell colSpan={columnSpan}>
        <Skeleton className="h-6" />
      </TableCell>
    </TableRow>
  );
};

export const ReactTable = <T,>({
  columns,
  isLoading,
  data,
  isWarningMsg,
  meta,
}: ReactTableProps<T>) => {
  const [{ page }, setPaginationValues] = usePagination();

  const pageSizes = meta?.itemsPerPage ?? 10;
  const pageCount = meta?.totalPages ?? 1;

  const handleBack = () => {
    if (meta?.previoudPage) {
      setPaginationValues({
        page: meta?.previoudPage,
      });
    }
  };

  const handleNext = () => {
    if (meta?.hasNextPage) {
      setPaginationValues({
        page: meta?.nextPage,
      });
    }
  };

  const {
    getRowModel,
    getHeaderGroups,
    getCanPreviousPage,
    getCanNextPage,
    getState,
    getPageCount,
  } = useReactTable({
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    pageCount: pageCount,
    rowCount: pageCount,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: pageSizes,
      },
    },
    manualPagination: true,
  });

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-500">
        <Table>
          <TableHeader className="dark:bg-input/30 bg-gray-200">
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-12">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="rounded-lg">
            {isWarningMsg && (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex flex-col items-center gap-2 py-2">
                    <Button asChild size="sm">
                      <Link prefetch href="/admin">
                        Verify Account
                      </Link>
                    </Button>
                    <p className="text-base">{isWarningMsg}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {isLoading && <TableSkeleton columnSpan={columns.length} />}
            {getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-end gap-2">
          <Button
            className="rounded border bg-none p-1"
            onClick={() => setPaginationValues({ page: 1 })}
            disabled={!getCanPreviousPage()}
            size="icon"
            variant="elevated"
          >
            <ChevronsLeft />
          </Button>
          <Button
            className="rounded border p-1"
            onClick={() => handleBack()}
            disabled={!getCanPreviousPage()}
            size="icon"
            variant="elevated"
          >
            <ChevronLeft />
          </Button>
          <Button
            className="rounded border p-1"
            onClick={() => handleNext()}
            disabled={!getCanNextPage()}
            size="icon"
            variant="elevated"
          >
            <ChevronRight />
          </Button>
          <Button
            className="rounded border p-1"
            onClick={() => setPaginationValues({ page: meta?.totalPages })}
            disabled={!getCanNextPage()}
            size="icon"
            variant="elevated"
          >
            <ChevronsRight />
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {getState().pagination.pageIndex + 1} of {getPageCount()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
