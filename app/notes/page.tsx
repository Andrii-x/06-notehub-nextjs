import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { noteKeys } from "@/lib/queryKeys";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: noteKeys.list("", 1),
    queryFn: () => fetchNotes({ search: "", page: 1 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
