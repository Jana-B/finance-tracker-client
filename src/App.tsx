import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { dark } from "@clerk/themes";
import { SignedIn, UserButton } from "@clerk/clerk-react";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/">Dashboard</Link>
          <SignedIn>
            <UserButton showName appearance={{ baseTheme: dark }} />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
