import MetaComponent from "@/components/common/MetaComponent";
import Exchange from "@/components/exchange/Exchange";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
const metadata = {
  title: "Exchange || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};
export default function ExchangePage() {
  return (
    <>
      {" "}
      <MetaComponent meta={metadata} />
      <LeftMenu />
      <div className="section-content-right">
        <Header1 />

        <div className="main-content">
          <div className="main-content-inner">
            <Exchange />
          </div>
        </div>
      </div>
    </>
  );
}
