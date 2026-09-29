"use client";

export default function NoteDetailsError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main
      role="alert"
      style={{ margin: "64px auto", maxWidth: 760, padding: "0 24px" }}
    >
      <p>Could not fetch note details. {error.message}</p>
    </main>
  );
}
