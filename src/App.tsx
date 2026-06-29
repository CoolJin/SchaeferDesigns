import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import TargetCursor from './components/TargetCursor'
import NoiseCanvas from './components/NoiseCanvas'
import Home from './pages/Home'
import Work from './pages/Work'
import Process from './pages/Process'
import Contact from './pages/Contact'
import About from './pages/About'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import AGB from './pages/AGB'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<AGB />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <TargetCursor />
        <NoiseCanvas />
        <Nav />
        <AnimatedRoutes />
      </div>
    </Router>
  )
}
