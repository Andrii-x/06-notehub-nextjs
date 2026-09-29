import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { noteKeys } from "@/lib/queryKeys";
import NoteDetailsClient from "./NoteDetails.client";

export const dynamic = "force-dynamic";

type NoteDetailsPageProps = { params: Promise<{ id: string }> };
export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
