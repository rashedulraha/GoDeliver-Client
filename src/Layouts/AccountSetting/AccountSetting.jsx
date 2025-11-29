import React from "react";
import Container from "../../pages/Responsive/Container";
import Navbar from "../../pages/Shared/Navigation/Navbar/Navbar";
import Footer from "../../pages/Shared/Navigation/Footer/Footer";
import AccountSideMenu from "../../pages/AccountSettings/AccountSideMenu/AccountSideMenu";

const AccountSetting = () => {
  return (
    <>
      <Navbar />
      <div className="my-10">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Account Settings</h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Manage your account information, delivery preferences, and payment
              methods
            </p>
          </div>

          {/* Main  layout and content */}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:grid-cols-1">
              <AccountSideMenu />
            </div>
            <div className="lg:grid-cols-3"></div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AccountSetting;
