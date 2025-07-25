import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { appRouter } from './appRouter'
import { LayoutWrapper } from "./layouts/LayoutWrapper";

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
