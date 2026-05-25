import { useEffect, useRef, useState } from "react";

const DEBOUNCE_MS = 400;

const useDashboardFiltersController = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [from, setFromRaw] = useState("");
  const [to, setToRaw] = useState("");
  const [page, setPage] = useState(1);

  const isFirstRun = useRef(true);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [search]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setPage(1);
  }, [debouncedSearch, from, to]);

  const setFrom = (value: string) => setFromRaw(value);
  const setTo = (value: string) => setToRaw(value);

  const reset = () => {
    setSearch("");
    setDebouncedSearch("");
    setFromRaw("");
    setToRaw("");
    setPage(1);
  };

  return {
    search,
    setSearch,
    debouncedSearch,
    from,
    setFrom,
    to,
    setTo,
    page,
    setPage,
    reset,
  };
};

export { useDashboardFiltersController };
