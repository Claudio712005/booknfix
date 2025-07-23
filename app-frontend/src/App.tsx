import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { appRouter } from './appRouter'
import { withLayout } from "./layouts/resolveLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {appRouter.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={withLayout(route.component, route.user)}
            />
          ))}
        </Routes>
      </Router>
    </>
  )
}

export default App
