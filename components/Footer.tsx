export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20">
      <div className="mx-auto max-w-3xl px-6 py-8 flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-gray-400">© 2026 karthikbi.dev</span>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/karthikpandy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/karthikpandy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
