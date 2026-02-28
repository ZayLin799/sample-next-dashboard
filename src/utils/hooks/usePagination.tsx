import { useQueryParam, StringParam, withDefault } from "use-query-params";

const usePaginationData = () => {
  const [page, setPage] = useQueryParam("page", withDefault(StringParam, "1"));
  const [rowsPerPage, setRowsPerPage] = useQueryParam(
    "pageSize",
    withDefault(StringParam, "10")
  );
  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  };
};

export default usePaginationData;
