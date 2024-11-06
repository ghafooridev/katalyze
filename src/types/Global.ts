export type ApiResponse<T> = {
    data: T;
}

export type Pagination = {
    page: number;
    pageSize: number;
    total: number;
};

export type ApiResponseWithPagination<T> = Pagination & ApiResponse<T>;

export type RequestOptions = {
    page: string;
    desc?: boolean;
    search?: string;
    orderBy?: string;
    pageSize: string;
};
