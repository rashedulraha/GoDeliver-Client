import React from "react";

const AppDownload = ({ to, value }) => {
  return (
    <>
      <a
        target="_blank"
        href={`${to}`}
        className=" border border-primary text-base-content btn shadow-none btn-sm text-sm font-semibold hover:bg-base-100/90 transition duration-110">
        {value}
      </a>
    </>
  );
};

export default AppDownload;
