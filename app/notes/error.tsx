"use client";

export default function NotesError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main
      role="alert"
      style={{ margin: "64px auto", maxWidth: 760, padding: "0 24px" }}
    >
      <p>Could not fetch the list of notes. {error.message}</p>
    </main>
  );
}
