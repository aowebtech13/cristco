import Account from "@/components/account/Account";
import WalletActivity from "@/components/account/WalletActivity";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
const metadata = {
  title: "Account || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};
export default function AccountPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <LeftMenu />

      <div className="section-content-right">
        <Header1 />

        <div className="main-content">
          {/* main-content-wrap */}
          <div className="main-content-inner">
            <div className="main-content-wrap">
              <div className="tf-container">
                <Account />
                <WalletActivity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
