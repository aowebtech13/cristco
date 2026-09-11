import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
import CardInfo from "@/components/my-wallet/CardInfo";
import Overview from "@/components/my-wallet/Overview";
const metadata = {
  title: "My Wallet || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};
export default function MyWalletPage() {
  return (
    <>
      {" "}
      <MetaComponent meta={metadata} />
      <LeftMenu />
      <div className="section-content-right">
        <Header1 />

        <div className="main-content">
          {/* main-content-wrap */}
          <div className="main-content-inner">
            <div className="main-content-wrap">
              <div className="tf-container">
                <CardInfo />
                <Overview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
