import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Uncomment and create these pages when ready */}
          {/* <Route path="/transactions" element={<TransactionsPage />} /> */}
          {/* <Route path="/accounts" element={<AccountsPage />} /> */}
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
