import MetaComponent from "@/components/common/MetaComponent";
import Component from "@/components/component/Component";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
const metadata = {
  title: "Component || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};
export default function ComponentPage() {
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
            <Component />
          </div>
        </div>
      </div>
    </>
  );
}
