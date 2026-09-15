import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
import Withdraw from "@/components/withdraw/Withdraw";

const metadata = {
  title: "Withdraw || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};

export default function WithdrawPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <LeftMenu />
      <div className="section-content-right">
        <Header1 />
        <div className="main-content">
          <div className="main-content-inner">
            <Withdraw />
          </div>
        </div>
      </div>
    </>
  );
}
