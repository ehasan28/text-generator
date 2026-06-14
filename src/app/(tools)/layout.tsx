export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
      <div className="my-auto w-full">{children}</div>
    </main>
  );
}
