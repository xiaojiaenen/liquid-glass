import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './demo/App'
import { PackageDemo } from './demo/PackageDemo'
import './demo/index.css'

function Root() {
  // hash 路由:#pkg 显示 npm 包页,否则显示自研实现
  const [hash, setHash] = useState(window.location.hash)
  React.useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const isPkg = hash === '#pkg'

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          display: 'flex',
          gap: 6,
          padding: 5,
          borderRadius: 20,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <a href="#" style={tab(!isPkg)}>自研实现</a>
        <a href="#pkg" style={tab(isPkg)}>npm 包</a>
      </nav>
      {isPkg ? <PackageDemo /> : <App />}
    </>
  )
}

function tab(active: boolean): React.CSSProperties {
  return {
    textDecoration: 'none',
    color: '#fff',
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    padding: '6px 16px',
    borderRadius: 16,
    background: active ? 'rgba(255,255,255,0.25)' : 'transparent',
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
