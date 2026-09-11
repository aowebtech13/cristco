import React from "react";
import DropdownSelect from "../common/DropdownSelect";

export default function BuyOrders() {
  return (
    <div className="wg-box gap16 bg-YellowGreen">
      <div>
        <div className="title mb-12">
          <div className="label-01">Buy Order</div>
          <div className="dropdown default">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="icon-more" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a href="#">This Week</a>
              </li>
              <li>
                <a href="#">This Day</a>
              </li>
            </ul>
          </div>
        </div>

        <DropdownSelect parentClass="image-select center w-100" />
      </div>
      <table className="tab-sell-order">
        <thead>
          <tr>
            <th className="f14-regular">Price</th>
            <th className="f14-regular">Amount</th>
            <th className="f14-regular">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="f14-regular">98.36</td>
            <td className="f14-regular">0.25</td>
            <td className="f14-regular">$147.00</td>
          </tr>
          <tr>
            <td className="f14-regular">98.36</td>
            <td className="f14-regular">0.25</td>
            <td className="f14-regular">$147.00</td>
          </tr>
          <tr>
            <td className="f14-regular">98.36</td>
            <td className="f14-regular">0.25</td>
            <td className="f14-regular">$147.00</td>
          </tr>
          <tr>
            <td className="f14-regular">98.36</td>
            <td className="f14-regular">0.25</td>
            <td className="f14-regular">$147.00</td>
          </tr>
          <tr>
            <td className="f14-regular">98.36</td>
            <td className="f14-regular">0.25</td>
            <td className="f14-regular">$147.00</td>
          </tr>
        </tbody>
      </table>
      <a href="#" className="tf-button style-1 f12-bold w-100">
        View All
        <i className="icon icon-send" />
      </a>
    </div>
  );
}
