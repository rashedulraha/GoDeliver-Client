import React from "react";

const AccountNotification = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Notification Settings</h2>
        <p className="text-base-content/70">
          Choose how you want to be notified
        </p>
      </div>

      <div className="space-y-4">
        <div className="card bg-base-100/20 border border-base-100 rounded-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Email Notifications</h3>
                <p className="text-base-content/70">
                  Receive order updates and offers via email
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100/20 border border-base-100 rounded-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">SMS Notifications</h3>
                <p className="text-base-content/70">
                  Get SMS about delivery updates
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100/20 border border-base-100 rounded-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Delivery Updates</h3>
                <p className="text-base-content/70">
                  Get notifications about your order status
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100/20 border border-base-100 rounded-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Promotional Offers</h3>
                <p className="text-base-content/70">
                  Receive special offers and promotions
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100/20 border border-base-100 rounded-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Payment Reminders</h3>
                <p className="text-base-content/70">
                  Get reminders for pending payments
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountNotification;
