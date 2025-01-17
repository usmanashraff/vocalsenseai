export function Footer() {
  return (
    <footer className="w-full border-t bg-background pl-4">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-1 items-center justify-center md:justify-start">
          <span className="text-sm text-muted-foreground">
            © 2025 VocalsenseAI. All Rights Reserved.
          </span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="/about" className="hover:text-foreground">
            About
          </a>
          <a href="/feedback" className="hover:text-foreground">
            Feedback
          </a>
          <a href="/transcribe" className="hover:text-foreground">
            Transcribe
          </a>
        </nav>
      </div>
    </footer>
  );
}