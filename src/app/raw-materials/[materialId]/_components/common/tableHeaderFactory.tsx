import { TableColumn, TableHeader } from '@nextui-org/react';
import { flexRender, HeaderGroup } from '@tanstack/react-table';

export const tableHeaderFactory = <TData, >(headerGroups: HeaderGroup<TData>[]) => (
  <TableHeader className='bg-grey-50 '>
    {headerGroups[0].headers.map((header) => (
      <TableColumn key={header.id} className='simpleHeader'>
        {header.isPlaceholder
          ? null
          : flexRender(
            header.column.columnDef.header,
            header.getContext(),
          )}
      </TableColumn>
    ))}
  </TableHeader>
);
