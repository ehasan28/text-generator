export function SiteFooter() {
  return (
    <footer className="py-6 text-center text-xs text-foreground-muted">
      Built by{" "}
      <a
        href="https://onylogy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-accent underline underline-offset-2 transition-colors"
      >
        Onylogy
      </a>{" "}
      · Fully client-side
    </footer>
  );
}
