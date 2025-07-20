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

interface IProductsTableProps {
  data: IProduct[];
  isLoading: boolean;
  isSuperAdmin: boolean;
  stripeDetailsSubmitted: boolean;
  meta: IMeta | undefined;
}

export const ProductsTable = ({
  data,
  isLoading,
  isSuperAdmin,
  stripeDetailsSubmitted,
  meta,
}: IProductsTableProps) => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<{
      id: string;
      name: string;
      description: string;
      price: string;
      refundPolicy: string;
      createDate: string;
      category: { name: string };
    }>();

    return [
      columnHelper.accessor((row) => row.id, {
        id: 'id',
        header: 'Product ID',
        cell: (info) => (
          <TableCellWrapper>
            <TruncateText text={info.getValue()} />
            <CopyToClipboard text={info.getValue()} />
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
    ];
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
