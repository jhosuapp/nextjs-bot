import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getContactsAction } from "../actions/get-contacts";
import type { ContactsResponse } from "../validations/contacts-query.validation";

type Args = {
  page: number;
  pageSize: number;
  search: string;
  from: string;
  to: string;
  initialData?: ContactsResponse;
};

const DEFAULT_PAGE_SIZE = 30;

const useDashboardContactsQuery = ({
  page,
  pageSize,
  search,
  from,
  to,
  initialData,
}: Args) => {
  const isInitialState =
    page === 1 &&
    pageSize === DEFAULT_PAGE_SIZE &&
    search === "" &&
    from === "" &&
    to === "";

  return useQuery({
    queryKey: ["admin-contacts", { page, pageSize, search, from, to }],
    queryFn: () =>
      getContactsAction({
        page,
        pageSize,
        search: search || undefined,
        from: from || undefined,
        to: to || undefined,
      }),
    placeholderData: keepPreviousData,
    initialData: isInitialState ? initialData : undefined,
  });
};

export { useDashboardContactsQuery, DEFAULT_PAGE_SIZE };
