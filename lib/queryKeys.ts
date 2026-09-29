export const noteKeys = {
  all: ["notes"] as const,
  list: (search: string, page: number) =>
    ["notes", "list", search, page] as const,
  detail: (id: string) => ["notes", "detail", id] as const,
};
