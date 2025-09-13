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
import { usePagination } from '@/hooks/use-pagination';
import { IMeta } from '@/types/utils';
import {
  ChartColumnIncreasing,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { StripVerficationCard } from '@/containers/admin';

interface ReactTableProps<T> {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  isWarningMsg?: string;
  meta?: IMeta | undefined;
}

const TableSkeleton = () => {
  return (
    <>
      {[...new Array(4)].map((i, index) => (
        <TableRow className="last:border-0" key={`${i}-${index}`}>
          <TableCell colSpan={10}>
            <Skeleton className="h-8" />
          </TableCell>
        </TableRow>
      ))}
    </>
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
                  <TableHead key={header.id} className="h-12 px-5">
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
            {isWarningMsg ? (
              <TableRow>
                <TableCell colSpan={10}>
                  <StripVerficationCard />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {isLoading ? (
                  <TableSkeleton />
                ) : !isLoading && getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <div className="flex flex-col items-center gap-2 py-4">
                        <Button variant="outline" size="icon">
                          <ChartColumnIncreasing className="size-5" />
                        </Button>
                        <h5 className="text-2xl font-semibold">
                          No Data Found
                        </h5>
                        <p className="text-base font-normal">
                          There&apos;s nothing to display right now
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-5">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </>
            )}
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
