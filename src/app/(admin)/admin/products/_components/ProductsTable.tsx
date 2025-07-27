import { useMemo } from 'react';
import * as dateFns from 'date-fns';
import { createColumnHelper } from '@tanstack/react-table';
import {
  TruncateText,
  CopyToClipboard,
  ReactTable,
  TableCellWrapper,
} from '@/components/common';
import { IProduct } from '@/types/product';
import { IMeta } from '@/types/utils';
import { LoaderIcon, PackagePlus, Pen, Trash } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button';

interface IProductsTableProps {
  data: IProduct[];
  isLoading: boolean;
  isSuperAdmin: boolean;
  stripeDetailsSubmitted: boolean;
  meta: IMeta | undefined;
  setIsAddContentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSetProductData: (x: Partial<IProduct>) => void;
  onDeleteProduct: (id: string) => void;
  isPending: boolean;
}

type ProductTableRow = IProduct & { actions: React.ReactNode };

export const ProductsTable = ({
  data,
  isLoading,
  isSuperAdmin,
  stripeDetailsSubmitted,
  meta,
  setIsAddContentOpen,
  onSetProductData,
  onDeleteProduct,
  setIsOpenModal,
  isPending,
}: IProductsTableProps) => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ProductTableRow>();

    return [
      columnHelper.accessor((row) => row.id, {
        id: 'id',
        header: 'Product ID',
        cell: (info) => (
          <TableCellWrapper>
            <div className="flex gap-2">
              <TruncateText text={info.getValue()} />
              <CopyToClipboard text={info.getValue()} />
            </div>
          </TableCellWrapper>
        ),
        size: 100,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        header: 'Name',
        cell: (info) => <TableCellWrapper>{info.getValue()}</TableCellWrapper>,
        size: 200,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.description, {
        id: 'description',
        header: 'Description',
        cell: (info) => <TableCellWrapper>{info.getValue()}</TableCellWrapper>,
        size: 200,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.price, {
        id: 'price',
        header: 'Price',
        cell: (info) => <TableCellWrapper>{info.getValue()}</TableCellWrapper>,
        size: 200,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.refundPolicy, {
        id: 'refundPolicy',
        header: 'Refund Policy',
        cell: (info) => <TableCellWrapper>{info.getValue()}</TableCellWrapper>,
        size: 200,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.category.name, {
        id: 'category',
        header: 'Category',
        cell: (info) => <TableCellWrapper>{info.getValue()}</TableCellWrapper>,
        size: 200,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.createDate, {
        id: 'createDate',
        header: 'Created At',
        cell: (info) => (
          <TableCellWrapper>
            {dateFns.format(info.getValue(), 'MM/dd/yyyy')}
          </TableCellWrapper>
        ),
        size: 200,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.actions, {
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <TableCellWrapper>
            <div className="flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="m-0 border-0 bg-transparent p-0 outline-0 dark:bg-transparent"
                    disabled={isPending}
                    onClick={() => {
                      onSetProductData(info.row.original);
                      setIsAddContentOpen(true);
                    }}
                  >
                    <PackagePlus className="size-5 cursor-pointer text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-input/30 rounded-full px-2 py-1">
                  <p>Add Content</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="m-0 border-0 bg-transparent p-0 outline-0 dark:bg-transparent"
                    disabled={isPending}
                    onClick={() => onDeleteProduct(info.row.original.id)}
                  >
                    {isPending ? (
                      <LoaderIcon className="size-5 animate-spin cursor-pointer text-gray-600" />
                    ) : (
                      <Trash className="size-5 cursor-pointer text-gray-600" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-input/30 rounded-full px-2 py-1">
                  <p>Delete Product</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="m-0 border-0 bg-transparent p-0 outline-0 dark:bg-transparent"
                    disabled={isPending}
                    onClick={() => {
                      onSetProductData(info.row.original);
                      setIsOpenModal(true);
                    }}
                  >
                    <Pen className="size-5 cursor-pointer text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-input/30 rounded-full px-2 py-1">
                  <p>Edit Product</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TableCellWrapper>
        ),
        size: 200,
        // footer: (props) => props.column.,
      }),
    ];
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ReactTable
        data={data}
        isLoading={isLoading}
        columns={columns}
        isWarningMsg={
          !isSuperAdmin && !stripeDetailsSubmitted
            ? 'To create your products, first verify your account'
            : ''
        }
        meta={meta}
      />
    </div>
  );
};
