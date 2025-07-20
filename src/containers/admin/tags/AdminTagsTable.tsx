import { useMemo } from 'react';
import * as dateFns from 'date-fns';
import { createColumnHelper } from '@tanstack/react-table';
import {
  CopyToClipboard,
  ReactTable,
  TableCellWrapper,
} from '@/components/common';
import { IProductTag } from '@/types/product';
import { IMeta } from '@/types/utils';

interface CategoryTableProps {
  data: IProductTag[];
  isLoading: boolean;
  meta: IMeta | undefined;
}

export const AdminTagsTable = ({
  data,
  isLoading,
  meta,
}: CategoryTableProps) => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<{
      id: string;
      name: string;
      createDate: string;
    }>();

    return [
      columnHelper.accessor((row) => row.id, {
        id: 'id',
        header: 'Tag ID',
        cell: (info) => (
          <TableCellWrapper>
            {info.getValue()}
            <CopyToClipboard text={info.getValue()} />
          </TableCellWrapper>
        ),
        // size: 10,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        header: 'Name',
        cell: (info) => <TableCellWrapper>{info.getValue()}</TableCellWrapper>,
        // size: 400,
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
        // size: 500,
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
        meta={meta || undefined}
      />
    </div>
  );
};
