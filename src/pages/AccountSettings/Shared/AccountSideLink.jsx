import { Link, useLocation } from "react-router-dom";

const AccountSideLink = ({ to, label, Icon }) => {
  const { pathname } = useLocation();

  const isActive = `${pathname}` === `/account-setting/${to}`;

  const activeTrue =
    "btn w-full btn-sm border outline outline-primary shadow-none capitalize rounded-sm bg-primary ";
  const activeFalse =
    "btn w-full btn-sm border outline outline-primary shadow-none capitalize rounded-sm ";

  return (
    <Link to={to} className={isActive ? activeTrue : activeFalse}>
      {Icon && <Icon className="text-base-content size-4" />}
      {label}
    </Link>
  );
};

export default AccountSideLink;
