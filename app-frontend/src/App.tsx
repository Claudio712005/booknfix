import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRouter } from './appRouter'
import { LayoutWrapper } from "./layouts/LayoutWrapper";

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {appRouter.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<LayoutWrapper component={route.component} user={route.user} />}
            />
          ))}
        </Routes>
      </Router>
    </>
  )
}

export default App
