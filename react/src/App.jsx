import LayoutWrapper from "@/components/common/LayoutWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import "../public/scss/main.scss";
import HomePage from "./pages";
import { Route, Routes } from "react-router-dom";
import DashboardPageBoxed from "./pages/dashboard/dashboard-boxed";
import DashboardPageIconHover from "./pages/dashboard/dashboard-icon-hover";
import DashboardPageIconDefault from "./pages/dashboard/dashboard-icon-default";
import MyWalletPage from "./pages/my-wallet";
import AccountPage from "./pages/account";
import EditProfilePage from "./pages/account/EditProfile";
import TransectionPage from "./pages/transaction";
import WithdrawPage from "./pages/withdraw";
import CryptoPage from "./pages/crypto";
import ExchangePage from "./pages/exchange";
import SettingsPage from "./pages/settings";
import ComponentPage from "./pages/component";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import VerifyEmailPage from "./pages/auth/VerifyEmail";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <LayoutWrapper>
        <div id="wrapper">
          {/* #page */}
          <div id="page" className="">
            <div className="layout-wrap">
              <div id="preload" className="preload-container">
                <div className="preloading">
                  <span></span>
                </div>
              </div>

              <Routes>
                <Route path="/">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="dashboard-boxed"
                    element={
                      <ProtectedRoute>
                        <DashboardPageBoxed />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard-icon-hover"
                    element={
                      <ProtectedRoute>
                        <DashboardPageIconHover />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard-icon-default"
                    element={
                      <ProtectedRoute>
                        <DashboardPageIconDefault />
                      </ProtectedRoute>
                    }
                  />
                
                  <Route
                    path="account"
                    element={
                      <ProtectedRoute>
                        <AccountPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="account/edit"
                    element={
                      <ProtectedRoute>
                        <EditProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="transaction"
                    element={
                      <ProtectedRoute>
                        <TransectionPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="withdraw"
                    element={
                      <ProtectedRoute>
                        <WithdrawPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="crypto"
                    element={
                      <ProtectedRoute>
                        <CryptoPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="exchange"
                    element={
                      <ProtectedRoute>
                        <ExchangePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="component"
                    element={
                      <ProtectedRoute>
                        <ComponentPage />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Auth Routes - No Layout */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthProvider>
  );
}

export default App;
