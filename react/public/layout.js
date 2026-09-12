import LayoutWrapper from "@/components/common/LayoutWrapper";
import "../public/scss/main.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="counter-scroll">
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
                {children}
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </body>
    </html>
  );
}
