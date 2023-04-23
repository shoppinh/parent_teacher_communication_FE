export interface ListWithPaginationQuery {
  token: string;
  skip?: number;
  limit?: number;
  search?: string;
}
