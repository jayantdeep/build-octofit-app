import { useEffect, useState } from 'react'
import './App.css'

type ApiHealth = {
  status: string
  database: string
}

function App() {
  const [health, setHealth] = useState<ApiHealth | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    fetch('/api/health')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Backend responded with ${response.status}`)
        }
        return (await response.json()) as ApiHealth
      })
      .then((data) => {
        if (active) setHealth(data)
      })
      .catch((requestError: unknown) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to reach the backend.',
          )
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="OctoFit Tracker home">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span>octofit<span className="brand-light">tracker</span></span>
        </a>
        <span className="topbar-label">YOUR WELLNESS, IN MOTION</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">SMALL STEPS. STRONGER TOGETHER.</p>
        <h1 id="hero-title">Make every move <span>count.</span></h1>
        <p className="hero-copy">
          A fresh space for your fitness journey. Build healthy habits,
          celebrate progress, and keep moving forward.
        </p>
        <a className="start-link" href="#platform">Explore your tracker <span aria-hidden="true">↓</span></a>
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-dot" aria-hidden="true" />
      </section>

      <section className="platform" id="platform" aria-labelledby="platform-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BUILT FOR YOUR NEXT MILE</p>
            <h2 id="platform-title">Your fitness, one step at a time.</h2>
          </div>
          <p className="section-copy">A connected foundation for a healthier you.</p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-number">01</span>
            <h3>Move with purpose</h3>
            <p>Make room for daily movement and turn small wins into lasting momentum.</p>
          </article>
          <article className="feature-card">
            <span className="feature-number">02</span>
            <h3>Grow together</h3>
            <p>Bring your community along and make every milestone more meaningful.</p>
          </article>
          <article className="feature-card">
            <span className="feature-number">03</span>
            <h3>See your progress</h3>
            <p>Keep your goals in sight as you build a routine that works for you.</p>
          </article>
        </div>

        <aside className="system-status" aria-live="polite">
          <span className={`status-indicator ${health ? 'is-connected' : error ? 'has-error' : ''}`} />
          <span>
            {health
              ? `Backend ${health.status} · MongoDB ${health.database}`
              : error
                ? `Backend unavailable · ${error}`
                : 'Connecting to the OctoFit API…'}
          </span>
        </aside>
      </section>

      <footer className="footer">
        <span>OCTOFIT TRACKER</span>
        <span>Made for progress, not perfection.</span>
      </footer>
    </main>
  )
}

export default App
