export default function Footer() {
  return (
    <footer className="border-t bg-background px-3 py-4 text-center text-xs text-muted-foreground md:px-6">
      © {new Date().getFullYear()} — All rights reserved.
    </footer>
  );
}
