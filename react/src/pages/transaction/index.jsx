import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
import Transections from "@/components/transections/Transections";
const metadata = {
  title: "Transection || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};
export default function TransectionPage() {
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
            <Transections />
          </div>
        </div>
      </div>
    </>
  );
}
