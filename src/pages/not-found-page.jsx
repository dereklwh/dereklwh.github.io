import { Link, useLocation } from 'react-router-dom'
import useTitle from '../hooks/useTitle.js'

const NotFoundPage = () => {
  const location = useLocation()
  useTitle('404')

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <div className="card p-8">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-display text-5xl">Page not found</h1>
        <p className="mt-3 text-ink/70 dark:text-fog/70">
          No page exists at <code className="font-mono text-sm">{location.pathname}</code>.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <Link to="/blog" className="btn-ghost">
            Visit Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
