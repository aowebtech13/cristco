import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/headers/Header1";
import LeftMenu from "@/components/headers/LeftMenu";
import Settings from "@/components/settings/Settings";
const metadata = {
  title: "Settings || Critso - Crypto Dashboard Reactjs Template",
  description: "Critso - Crypto Dashboard Reactjs Template",
};
export default function SettingsPage() {
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
            <Settings />
          </div>
        </div>
      </div>
    </>
  );
}
