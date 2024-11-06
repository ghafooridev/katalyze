import * as React from 'react';
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { Column } from '@tanstack/react-table';

interface ColumnFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function ColumnFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: Readonly<ColumnFacetedFilterProps<TData, TValue>>) {
  const facets = column?.getFacetedUniqueValues();
  const filterValue = column?.getFilterValue();
  const selectedValues = new Set(
    Array.isArray(filterValue) ? (filterValue as string[]) : [],
  );

  const allSelected = options.every((option) => selectedValues.has(option.value));

  const handleSelectAll = () => {
    if (allSelected) {
      column?.setFilterValue(undefined);
    } else {
      const allValues = options.map((option) => option.value);
      column?.setFilterValue(allValues);
    }
  };

  const handleOptionClick = ({ option, isSelected }) => {
    if (isSelected) {
      selectedValues.delete(option.value);
    } else {
      selectedValues.add(option.value);
    }
    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='bordered' size='sm' className='border-0 justify-start'>
          {title}

          <Badge className='bg-purple-50 rounded-sm px-1 font-normal ml-auto'>
            {selectedValues.size}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=' p-0'>
        <div>
          <Input placeholder={`Search ${title}`} />
          <div className='mt-2'>
            <div
              role="button"
              key='all'
              onClick={handleSelectAll}
              className='flex items-center cursor-pointer mb-2'
            >
              <Checkbox isSelected={allSelected} className='mr-2'>
                All
              </Checkbox>
            </div>
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value);
              return (
                <div
                  role="button"
                  key={option.value}
                  onClick={() => handleOptionClick({ option, isSelected })}
                  className='flex items-center cursor-pointer mb-2'
                >
                  <Checkbox isSelected={isSelected} className='mr-2' />
                  {option.icon && (
                    <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                  )}
                  <span>{option.label}</span>
                  {facets?.get(option.value) && (
                    <span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
                      {facets.get(option.value)}
                    </span>
                  )}
                </div>
              );
            })}
            {selectedValues.size > 0 && (
              <div
                onClick={() => column?.setFilterValue(undefined)}
                className='flex items-center cursor-pointer text-red-700 mt-2 justify-center'
              >
                Clear filters
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
