import React from "react";
import { Link } from "react-router-dom";

const SidebarLink = ({ to, dataTip, Icon, span }) => {
  return (
    <li>
      <Link
        to={`${to}`}
        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
        data-tip={dataTip}>
        {<Icon size={20} />}
        <span className="is-drawer-close:hidden">{span}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
