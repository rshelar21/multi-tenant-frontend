import { useMemo } from 'react';
import * as dateFns from 'date-fns';
import { createColumnHelper } from '@tanstack/react-table';
import {
  TruncateText,
  CopyToClipboard,
  ReactTable,
  TableCellWrapper,
} from '@/components/common';
import { ISubCategory } from '@/types/product';
import { IMeta } from '@/types/utils';

interface CategoryTableProps {
  data: ISubCategory[];
  isLoading: boolean;
  meta: IMeta | undefined;
}

export const AdminCategoryTable = ({
  data,
  isLoading,
  meta,
}: CategoryTableProps) => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<{
      id: string;
      name: string;
      slug: string;
      createDate: string;
      category: { name: string };
    }>();

    return [
      columnHelper.accessor((row) => row.id, {
        id: 'id',
        header: 'Category ID',
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
      columnHelper.accessor((row) => row.slug, {
        id: 'slug',
        header: 'Slug',
        cell: (info) => <TableCellWrapper>{info.getValue()}</TableCellWrapper>,
        size: 200,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.category.name, {
        id: 'category.name',
        header: 'Parent Category',
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
        meta={meta}
      />
    </div>
  );
};
