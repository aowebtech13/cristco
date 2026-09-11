import toggleLeftSidebar from "@/utlis/toggleLeftSidebar";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Notifications from "./Notifications";
import Messages from "./Messages";
export default function Header1() {
  return (
    <div className="header-dashboard">
      <div className="wrap">
        <div className="header-left">
          <div className="button-show-hide" onClick={toggleLeftSidebar}>
            <i className="icon-menu" />
          </div>
          <h6>Dashboard</h6>
          <form className="form-search flex-grow">
            <fieldset className="name">
              <input
                type="text"
                placeholder="Type to search …"
                className="show-search style-1"
                name="name"
                tabIndex={2}
                defaultValue=""
                aria-required="true"
                required
              />
            </fieldset>
            <div className="button-submit">
              <button className="" type="submit">
                <i className="icon-search-normal1" />
              </button>
            </div>
          </form>
        </div>
        <div className="header-grid">
          <div className="header-btn">
            <Messages />
            <Notifications />
          </div>
          <div className="line1" />
          <Profile />
          <div className="divider" />

          <div
            className="setting cursor-pointer"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
          >
            <i className="icon-setting1" />
          </div>
        </div>
      </div>
    </div>
  );
}
