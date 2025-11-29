import React from "react";
import useAuth from "../../../Hooks/useAuth";

import AccountSideLink from "../Shared/AccountSideLink";
import { CgProfile } from "react-icons/cg";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

const AccountSideMenu = () => {
  const { user } = useAuth();
  const photoURL = user.photoURL;
  const displayName = user.displayName;
  return (
    <div className="bg-base-200 rounded-md p-4">
      <div className=" flex flex-col gap-2 items-center justify-center ">
        <img
          className="-full border hover:bg-base-200 hover:text-white transition-all w-12 md:w-14 h-12 md:h-14 cursor-pointer rounded-full object-cover"
          src={photoURL}
          alt="user Image"
        />
        <h1>{displayName}</h1>
      </div>

      {/*  side link and menu bar  */}

      <div className="flex flex-col items-center mt-5 gap-3">
        <AccountSideLink to={""} label={"profile"} Icon={CgProfile} />
        <AccountSideLink to={""} label={"address"} Icon={FaAddressBook} />
        <AccountSideLink to={""} label={"payment"} Icon={MdOutlinePayment} />
      </div>
    </div>
  );
};

export default AccountSideMenu;
