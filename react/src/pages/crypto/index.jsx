import MetaComponent from "@/components/common/MetaComponent";
import Crypto from "@/components/crypto/Crypto";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
const metadata = {
  title: "Crypto || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};
export default function CryptoPage() {
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
            <Crypto />
          </div>
        </div>
      </div>
    </>
  );
}
