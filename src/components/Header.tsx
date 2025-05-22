import { Link, useRouterState } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../logo.svg'

export default function Header() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const navLinks = [
    { to: '/' as const, label: 'Карта' },
    { to: '/dashboard' as const, label: 'Дашборт' },
    { to: '/reports' as const, label: 'Отчёты' },
    { to: '/investigations' as const, label: 'Расследования' },
  ]
  return (
    <header className="relative p-2 bg-white text-black shadow-md flex items-center justify-center min-h-[64px]">
      <div className="absolute left-0 flex items-center ml-8 select-none">
        <img src={logo} alt="logo" className="h-10 w-10 drop-shadow-md" />
        <span className="ml-3 text-2xl font-semibold tracking-wide font-sans text-gray-800">
          ECOLOGY
        </span>
      </div>
      <nav className="flex flex-row gap-6 relative">
        {navLinks.map((link) => {
          const isActive = pathname === link.to
          return (
            <motion.div
              key={link.to}
              className="relative"
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                to={link.to}
                className={
                  'relative z-10 px-4 py-1 font-medium rounded-full transition-colors duration-200 ' +
                  (isActive ? 'text-black' : 'hover:bg-gray-100 text-gray-700')
                }
                style={{ boxSizing: 'border-box' }}
              >
                <span className="relative z-20">{link.label}</span>
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="absolute inset-0 z-0 bg-blue-200 border-2 border-blue-500 rounded-full shadow-sm"
                    />
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </header>
  )
}
