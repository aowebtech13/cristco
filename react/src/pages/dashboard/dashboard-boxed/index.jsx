import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
import Home from "@/components/home/Home";
const metadata = {
  title: "Dashboard Boxed || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};
export default function DashboardPageBoxed() {
  return (
    <>
      {" "}
      <MetaComponent meta={metadata} />
      <LeftMenu />
      <div className="section-content-right">
        <Header1 />

        <div className="main-content">
          <div className="main-content-inner">
            <Home />
          </div>
        </div>
      </div>
    </>
  );
}
