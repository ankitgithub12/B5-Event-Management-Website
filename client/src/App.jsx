// ============================================================
//  ROOT: App.jsx
// ============================================================

import { BrowserRouter } from 'react-router-dom'
import { AppProvider }   from './context/AppContext'
import Navbar            from './components/common/Navbar'
import Footer            from './components/common/Footer'
import AppRoutes         from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  )
}
