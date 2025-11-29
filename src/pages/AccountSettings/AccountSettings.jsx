"use client";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const { user, updateUserEmail, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [emailLoading, setEmailLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    deliveryUpdates: true,
    promotional: false,
    paymentReminders: true,
  });
  const [addresses, setAddresses] = useState([
    { id: 1, type: "home", address: "", label: "Home", isDefault: true },
    { id: 2, type: "office", address: "", label: "Office", isDefault: false },
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "cash", name: "Cash on Delivery", isDefault: true },
    { id: 2, type: "card", name: "Credit/Debit Card", isDefault: false },
  ]);
  const [deliveryPreferences, setDeliveryPreferences] = useState({
    preferredTime: "anytime",
    instructions: "",
    leaveAtDoor: false,
    requireSignature: false,
  });

  // Update profile
  const handleProfileSave = async (data) => {
    setProfileLoading(true);
    try {
      await updateUserProfile({ displayName: data.name });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  // Update email
  const handleEmailSave = async (data) => {
    setEmailLoading(true);
    try {
      await updateUserEmail(data.email);
      toast.success("Email updated! Please check your inbox for verification.");
    } catch (error) {
      toast.error("Failed to update email");
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle notification changes
  const toggleNotification = (type) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle address changes
  const handleAddressChange = (id, field, value) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, [field]: value } : addr))
    );
  };

  // Add new address
  const addNewAddress = () => {
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "other",
        address: "",
        label: "Other",
        isDefault: false,
      },
    ]);
  };

  // Remove address
  const removeAddress = (id) => {
    if (addresses.length > 1) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  // Set default address
  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  // Set default payment method
  const setDefaultPayment = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  // Save addresses
  const saveAddresses = () => {
    toast.success("Addresses saved successfully!");
  };

  // Handle delivery preferences
  const handleDeliveryPreferenceChange = (field, value) => {
    setDeliveryPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Tabs configuration
  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "addresses", label: "Addresses", icon: "📍" },
    { id: "payments", label: "Payments", icon: "💳" },
    { id: "delivery", label: "Delivery", icon: "🚚" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "danger", label: "Danger Zone", icon: "⚠️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Account Settings</h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Manage your account information, delivery preferences, and payment
            methods
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-2xl shadow-lg p-6 sticky top-8">
              {/* User Profile Summary */}
              <div className="flex flex-col items-center mb-8">
                <div className="avatar placeholder mb-4">
                  <div className="bg-primary text-primary-content rounded-full w-20">
                    <span className="text-2xl">
                      {user?.displayName?.charAt(0) || "U"}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-lg">
                  {user?.displayName || "User"}
                </h3>
                <p className="text-sm text-base-content/70 truncate w-full text-center">
                  {user?.email}
                </p>
                <div className="mt-2 text-xs text-base-content/50">
                  Member since{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full p-4 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`}>
                    <span className="text-xl mr-3">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      Profile Information
                    </h2>
                    <p className="text-base-content/70">
                      Update your personal details
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(handleProfileSave)}
                    className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Full Name
                          </span>
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.displayName}
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className="input input-bordered"
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              {errors.name.message}
                            </span>
                          </label>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Email Address
                          </span>
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="input input-bordered"
                          disabled
                        />
                        <label className="label">
                          <span className="label-text-alt">
                            To change email, go to Security tab
                          </span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Phone Number
                          </span>
                        </label>
                        <input
                          type="tel"
                          className="input input-bordered"
                          placeholder="Your phone number"
                          defaultValue="01XXXXXXXXX"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            NID Number
                          </span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered"
                          placeholder="Your NID number"
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Profile Photo
                        </span>
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="avatar">
                          <div className="w-16 rounded-full bg-base-300">
                            <span className="text-xl">
                              {user?.displayName?.charAt(0) || "U"}
                            </span>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline">
                            Upload New
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={profileLoading}>
                        {profileLoading ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      Address Management
                    </h2>
                    <p className="text-base-content/70">
                      Manage your pickup and delivery addresses
                    </p>
                  </div>

                  <div className="space-y-6">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="card bg-base-200 shadow-sm">
                        <div className="card-body">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="card-title">{addr.label}</h3>
                              <div className="flex items-center mt-1">
                                {addr.isDefault && (
                                  <span className="badge badge-primary badge-sm mr-2">
                                    Default
                                  </span>
                                )}
                                <span className="text-sm text-base-content/70">
                                  {addr.type === "home"
                                    ? "Home Address"
                                    : addr.type === "office"
                                    ? "Office Address"
                                    : "Other Address"}
                                </span>
                              </div>
                            </div>
                            {addresses.length > 1 && (
                              <button
                                onClick={() => removeAddress(addr.id)}
                                className="btn btn-sm btn-ghost btn-circle">
                                ✕
                              </button>
                            )}
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Full Address</span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered w-full"
                              placeholder="Enter complete address"
                              rows={3}
                              value={addr.address}
                              onChange={(e) =>
                                handleAddressChange(
                                  addr.id,
                                  "address",
                                  e.target.value
                                )
                              }></textarea>
                          </div>

                          <div className="flex justify-end mt-4">
                            {!addr.isDefault && (
                              <button
                                onClick={() => setDefaultAddress(addr.id)}
                                className="btn btn-sm btn-outline mr-2">
                                Set as Default
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between items-center">
                      <button
                        onClick={addNewAddress}
                        className="btn btn-outline">
                        + Add New Address
                      </button>

                      <button
                        onClick={saveAddresses}
                        className="btn btn-primary">
                        Save All Addresses
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === "payments" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Payment Methods</h2>
                    <p className="text-base-content/70">
                      Manage your payment methods
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title">Payment Methods</h3>

                        <div className="space-y-4 mt-4">
                          {paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className="flex items-center justify-between p-3 bg-base-100 rounded-lg">
                              <div className="flex items-center">
                                <div className="mr-3 text-xl">
                                  {method.type === "cash"
                                    ? "💵"
                                    : method.type === "card"
                                    ? "💳"
                                    : "📱"}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {method.name}
                                  </div>
                                  {method.isDefault && (
                                    <div className="text-xs text-primary">
                                      Default Payment Method
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                {!method.isDefault && (
                                  <button
                                    onClick={() => setDefaultPayment(method.id)}
                                    className="btn btn-xs btn-outline">
                                    Set Default
                                  </button>
                                )}
                                <button className="btn btn-xs btn-ghost">
                                  Edit
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <button className="btn btn-outline">
                            + Add New Payment Method
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title">Billing Address</h3>

                        <div className="form-control mt-4">
                          <label className="label">
                            <span className="label-text">Billing Address</span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered"
                            placeholder="Enter your billing address"
                            rows={3}></textarea>
                        </div>

                        <div className="flex justify-end mt-4">
                          <button className="btn btn-primary">
                            Save Billing Address
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Tab */}
              {activeTab === "delivery" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      Delivery Preferences
                    </h2>
                    <p className="text-base-content/70">
                      Customize your delivery preferences
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title">Delivery Time</h3>

                        <div className="form-control mt-4">
                          <label className="label">
                            <span className="label-text">
                              Preferred Delivery Time
                            </span>
                          </label>
                          <select
                            className="select select-bordered"
                            value={deliveryPreferences.preferredTime}
                            onChange={(e) =>
                              handleDeliveryPreferenceChange(
                                "preferredTime",
                                e.target.value
                              )
                            }>
                            <option value="anytime">Anytime</option>
                            <option value="morning">
                              Morning (9AM - 12PM)
                            </option>
                            <option value="afternoon">
                              Afternoon (12PM - 3PM)
                            </option>
                            <option value="evening">Evening (3PM - 6PM)</option>
                            <option value="night">Night (6PM - 9PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title">Delivery Instructions</h3>

                        <div className="form-control mt-4">
                          <label className="label">
                            <span className="label-text">
                              Instructions for Delivery Person
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered"
                            placeholder="Enter any special instructions for delivery person"
                            rows={3}
                            value={deliveryPreferences.instructions}
                            onChange={(e) =>
                              handleDeliveryPreferenceChange(
                                "instructions",
                                e.target.value
                              )
                            }></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title">Delivery Options</h3>

                        <div className="form-control mt-4">
                          <label className="label cursor-pointer justify-start">
                            <input
                              type="checkbox"
                              className="toggle toggle-primary mr-4"
                              checked={deliveryPreferences.leaveAtDoor}
                              onChange={(e) =>
                                handleDeliveryPreferenceChange(
                                  "leaveAtDoor",
                                  e.target.checked
                                )
                              }
                            />
                            <div>
                              <span className="label-text font-medium">
                                Leave package at door
                              </span>
                              <p className="text-sm text-base-content/70">
                                Leave package at door if I'm not available
                              </p>
                            </div>
                          </label>
                        </div>

                        <div className="form-control mt-4">
                          <label className="label cursor-pointer justify-start">
                            <input
                              type="checkbox"
                              className="toggle toggle-primary mr-4"
                              checked={deliveryPreferences.requireSignature}
                              onChange={(e) =>
                                handleDeliveryPreferenceChange(
                                  "requireSignature",
                                  e.target.checked
                                )
                              }
                            />
                            <div>
                              <span className="label-text font-medium">
                                Require signature
                              </span>
                              <p className="text-sm text-base-content/70">
                                My signature will be required at delivery
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="btn btn-primary">
                        Save Delivery Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      Notification Settings
                    </h2>
                    <p className="text-base-content/70">
                      Choose how you want to be notified
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold">Email Notifications</h3>
                            <p className="text-base-content/70">
                              Receive order updates and offers via email
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notificationSettings.email}
                            onChange={() => toggleNotification("email")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold">SMS Notifications</h3>
                            <p className="text-base-content/70">
                              Get SMS about delivery updates
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notificationSettings.sms}
                            onChange={() => toggleNotification("sms")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold">Delivery Updates</h3>
                            <p className="text-base-content/70">
                              Get notifications about your order status
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notificationSettings.deliveryUpdates}
                            onChange={() =>
                              toggleNotification("deliveryUpdates")
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold">Promotional Offers</h3>
                            <p className="text-base-content/70">
                              Receive special offers and promotions
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notificationSettings.promotional}
                            onChange={() => toggleNotification("promotional")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold">Payment Reminders</h3>
                            <p className="text-base-content/70">
                              Get reminders for pending payments
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={notificationSettings.paymentReminders}
                            onChange={() =>
                              toggleNotification("paymentReminders")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      Security Settings
                    </h2>
                    <p className="text-base-content/70">
                      Manage your account security
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Email Change */}
                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title">Change Email Address</h3>
                        <p className="text-base-content/70">
                          We'll send a verification link to your new email
                          address
                        </p>

                        <form
                          onSubmit={handleSubmit(handleEmailSave)}
                          className="mt-4">
                          <div className="form-control">
                            <input
                              type="email"
                              defaultValue={user?.email}
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                              className="input input-bordered"
                              placeholder="New email address"
                            />
                            {errors.email && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.email.message}
                                </span>
                              </label>
                            )}
                          </div>

                          <div className="card-actions justify-end mt-4">
                            <button
                              type="submit"
                              className="btn btn-accent"
                              disabled={emailLoading}>
                              {emailLoading ? (
                                <span className="loading loading-spinner"></span>
                              ) : (
                                "Update Email"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Password Change */}
                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title">Change Password</h3>
                        <p className="text-base-content/70">
                          Create a strong password with letters, numbers, and
                          symbols
                        </p>

                        <form className="mt-4 space-y-4">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Current Password
                              </span>
                            </label>
                            <input
                              type="password"
                              className="input input-bordered"
                              placeholder="Enter current password"
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">New Password</span>
                            </label>
                            <input
                              type="password"
                              className="input input-bordered"
                              placeholder="Enter new password"
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Confirm New Password
                              </span>
                            </label>
                            <input
                              type="password"
                              className="input input-bordered"
                              placeholder="Confirm new password"
                            />
                          </div>

                          <div className="card-actions justify-end mt-4">
                            <button type="submit" className="btn btn-primary">
                              Update Password
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body">
                        <h3 className="card-title">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-base-content/70">
                          Add an extra layer of security to your account
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <div className="font-medium">Authenticator App</div>
                            <div className="text-sm text-base-content/70">
                              Use an app like Google Authenticator
                            </div>
                          </div>
                          <button className="btn btn-outline btn-sm">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Danger Zone Tab */}
              {activeTab === "danger" && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-error">
                      Danger Zone
                    </h2>
                    <p className="text-base-content/70">
                      Irreversible account actions
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="card bg-error/10 border border-error/30">
                      <div className="card-body">
                        <div className="flex items-start">
                          <div className="mr-4 text-3xl">⚠️</div>
                          <div className="flex-1">
                            <h3 className="card-title text-error">
                              Delete Account
                            </h3>
                            <p className="text-base-content/70 mb-4">
                              Permanently delete your account and all associated
                              data. This action cannot be undone.
                            </p>
                            <div className="card-actions justify-end">
                              <button
                                onClick={() => setShowDeleteModal(true)}
                                className="btn btn-error">
                                Delete Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-warning/10 border border-warning/30">
                      <div className="card-body">
                        <div className="flex items-start">
                          <div className="mr-4 text-3xl">🔒</div>
                          <div className="flex-1">
                            <h3 className="card-title text-warning">
                              Deactivate Account
                            </h3>
                            <p className="text-base-content/70 mb-4">
                              Temporarily deactivate your account. You can
                              reactivate it later.
                            </p>
                            <div className="card-actions justify-end">
                              <button className="btn btn-warning">
                                Deactivate Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card bg-info/10 border border-info/30">
                      <div className="card-body">
                        <div className="flex items-start">
                          <div className="mr-4 text-3xl">📥</div>
                          <div className="flex-1">
                            <h3 className="card-title text-info">
                              Download Data
                            </h3>
                            <p className="text-base-content/70 mb-4">
                              Download a copy of all your data.
                            </p>
                            <div className="card-actions justify-end">
                              <button className="btn btn-info">
                                Download Data
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold mb-2">Delete Account?</h3>
              <p className="text-base-content/70 mb-6">
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </p>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Type "DELETE" to confirm</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Type DELETE here"
                />
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.error(
                      "Account deletion requires additional confirmation"
                    );
                    setShowDeleteModal(false);
                  }}
                  className="btn btn-error">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
