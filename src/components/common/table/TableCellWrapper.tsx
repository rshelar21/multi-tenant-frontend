import React from 'react';

interface TableCellWrapperProps {
  children: React.ReactNode;
}

export const TableCellWrapper = ({ children }: TableCellWrapperProps) => {
  return <div>{children}</div>;
};
