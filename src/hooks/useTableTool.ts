'use client';

import { useState } from 'react';

import { ApiResponse } from '@/types/RawMaterial';

export const useTableTool = <D>() => {
  const [data, setData] = useState<ApiResponse<D[]>>();
  const [search, setSearch] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [desc, setDesc] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  return {
    data,
    setData,
    search,
    setSearch,
    orderBy,
    setOrderBy,
    desc,
    setDesc,
    page,
    setPage,
    pageSize,
    setPageSize,
  };
};
