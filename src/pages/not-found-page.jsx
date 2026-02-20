import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NotFoundPage = () => {
  const location = useLocation()

  useEffect(() => {
    document.title = '404 | Derek Huang'
  }, [])

  return (
    <main className="min-h-screen bg-linear-65 from-white to-[#DDE5ED] dark:from-[#1a2f2a] dark:to-[#1a2f2a] px-6 py-20 text-[#3e5d58] dark:text-[#e8f0ee]">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#92ACA0]/30 bg-white/80 dark:bg-[#243b35]/80 p-8 shadow-md backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#92ACA0]">404</p>
        <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-base text-[#3e5d58]/80 dark:text-[#a3c4bc]">
          No page exists at <code>{location.pathname}</code>.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-lg bg-[#92ACA0] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#6f8a84]"
          >
            Go Home
          </Link>
          <Link
            to="/blog"
            className="rounded-lg border border-[#92ACA0] px-4 py-2 font-semibold text-[#3e5d58] transition-colors hover:bg-[#92ACA0]/20 dark:text-[#e8f0ee]"
          >
            Visit Blog
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
