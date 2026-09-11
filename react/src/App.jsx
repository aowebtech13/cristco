import LayoutWrapper from "@/components/common/LayoutWrapper";
import "../public/scss/main.scss";
import Offcanvas from "@/components/modals/Offcanvas";
import HomePage from "./pages";
import { Route, Routes } from "react-router-dom";
import DashboardPageBoxed from "./pages/dashboard/dashboard-boxed";
import DashboardPageIconHover from "./pages/dashboard/dashboard-icon-hover";
import DashboardPageIconDefault from "./pages/dashboard/dashboard-icon-default";
import MyWalletPage from "./pages/my-wallet";
import AccountPage from "./pages/account";
import TransectionPage from "./pages/transaction";
import CryptoPage from "./pages/crypto";
import ExchangePage from "./pages/exchange";
import SettingsPage from "./pages/settings";
import ComponentPage from "./pages/component";

function App() {
  return (
    <>
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
                  <Route index element={<HomePage />} />

                  <Route
                    path="dashboard-boxed"
                    element={<DashboardPageBoxed />}
                  />
                  <Route
                    path="dashboard-icon-hover"
                    element={<DashboardPageIconHover />}
                  />
                  <Route
                    path="dashboard-icon-default"
                    element={<DashboardPageIconDefault />}
                  />
                  <Route path="my-wallet" element={<MyWalletPage />} />
                  <Route path="account" element={<AccountPage />} />
                  <Route path="transaction" element={<TransectionPage />} />
                  <Route path="crypto" element={<CryptoPage />} />
                  <Route path="exchange" element={<ExchangePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="component" element={<ComponentPage />} />
                </Route>
              </Routes>
            </div>
          </div>
          <Offcanvas />
        </div>
      </LayoutWrapper>
    </>
  );
}

export default App;
