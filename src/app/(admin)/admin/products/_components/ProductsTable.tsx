import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TruncateText, CopyToClipboard } from '@/components/common';
import { IProduct } from '@/types/product';
import * as dateFns from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface IProductsTableProps {
  data: IProduct[];
  isLoading: boolean;
}

const ProductsTableSkeleton = () => {
  return [...new Array(5)].map((i, index) => (
    <TableRow className="last:border-0" key={index}>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
    </TableRow>
  ));
};

export const ProductsTable = ({ data, isLoading }: IProductsTableProps) => {
  return (
    <Table className="rounded-lg border border-gray-200">
      <TableHeader className="bg-gray-200">
        <TableRow>
          <TableHead>Product ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Refund Policy</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="rounded-lg">
        {isLoading && <ProductsTableSkeleton />}
        {!isLoading &&
          data?.map((product) => (
            <TableRow key={product?.id}>
              <TableCell>
                <TruncateText text={product?.id} />
                <CopyToClipboard text={product?.id} />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{product?.description}</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell>{product?.refundPolicy}</TableCell>
              <TableCell>{product?.category?.name}</TableCell>
              <TableCell>
                {dateFns.format(product?.createDate, 'MM/dd/yyyy')}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
