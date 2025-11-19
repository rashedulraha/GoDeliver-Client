import React from "react";

const AppDownload = ({ to, value }) => {
  return (
    <>
      <a
        target="_blank"
        href={`${to}`}
        className="bg-base-100 text-primary btn shadow-none btn-sm text-sm font-semibold hover:bg-base-100/90 transition-colors">
        {value}
      </a>
    </>
  );
};

export default AppDownload;
