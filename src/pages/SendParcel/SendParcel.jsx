import useAuth from "../../Hooks/useAuth";
import useFetchCounters from "../../Hooks/useFetchCounters";
import Container from "../Responsive/Container";
import { useForm, useWatch } from "react-hook-form";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Package, User, MapPin, Phone, Mail, FileText } from "lucide-react";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  const { fetchData } = useFetchCounters("/ServiceCounters.json");

  const filteringRegion = fetchData?.map((region) => region.region);
  const removeDuplicate = [...new Set(filteringRegion)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = fetchData?.filter((data) => data.region === region);
    const districts = regionDistricts?.map((district) => district.district);
    return districts;
  };

  const handleFormSubmit = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight) || 0;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 1) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 1;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 50;
        cost = minCharge + extraCharge;
      }
    }

    // Set cost and status for all parcels
    data.cost = cost;
    data.paymentStatus = "unpaid";

    Swal.fire({
      title: "Confirm Booking Cost",
      html: `Please confirm if you accept this price. You will be charged <strong>${cost} BDT</strong>`,
      icon: "warning",
      showCancelButton: true,
      background: "#0f172a",
      color: "white",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm Booking",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          if (res.data.insertedId) {
            navigate("/dashboard/parcel-to-pay");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel created! Please proceed to payment.",
              showConfirmButton: false,
              timer: 2500,
            });
          }
          reset();
        });
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-base-100 to-accent/5">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-black text-base-content mb-6">
            Send a <span className="text-primary">Parcel</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-base-content/70">
            Enter the details below to book a fast and reliable delivery.
          </p>
        </div>

        {/* Form */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8 md:p-12">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-12">
            {/* Parcel Information */}
            <div>
              <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-3">
                <Package className="w-7 h-7 text-primary" />
                Parcel Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Parcel Type
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...register("parcelType", { required: true })}
                        value="document"
                        className="radio radio-primary"
                        defaultChecked
                      />
                      <FileText className="w-5 h-5" />
                      <span>Document</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...register("parcelType", { required: true })}
                        value="non-document"
                        className="radio radio-primary"
                      />
                      <Package className="w-5 h-5" />
                      <span>Non-Document</span>
                    </label>
                  </div>
                  {errors.parcelType && (
                    <p className="text-error text-xs mt-1">
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Parcel Name / Title
                  </label>
                  <input
                    {...register("parcelName", { required: true })}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g., Important Documents"
                  />
                  {errors.parcelName && (
                    <p className="text-error text-xs mt-1">
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Approx. Weight (KG)
                  </label>
                  <input
                    {...register("parcelWeight", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    type="number"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g., 1.5"
                  />
                  {errors.parcelWeight && (
                    <p className="text-error text-xs mt-1">
                      Valid weight is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sender & Receiver Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Sender Details */}
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-3">
                  <User className="w-7 h-7 text-accent" />
                  Sender Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Name
                    </label>
                    <input
                      {...register("senderName", { required: true })}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Full name"
                      defaultValue={user?.displayName}
                    />
                    {errors.senderName && (
                      <p className="text-error text-xs mt-1">
                        This field is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register("senderPhoneNumber", { required: true })}
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="01xxxxxxxxx"
                    />
                    {errors.senderPhoneNumber && (
                      <p className="text-error text-xs mt-1">
                        This field is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Email
                    </label>
                    <input
                      {...register("senderEmail", { required: true })}
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@example.com"
                      defaultValue={user?.email}
                    />
                    {errors.senderEmail && (
                      <p className="text-error text-xs mt-1">
                        Valid email is required
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-base-content mb-2">
                        Region
                      </label>
                      <select
                        {...register("senderRegion", { required: true })}
                        className="select select-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Select Region</option>
                        {removeDuplicate?.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                      {errors.senderRegion && (
                        <p className="text-error text-xs mt-1">
                          This field is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-2">
                        District
                      </label>
                      <select
                        {...register("senderDistrict", { required: true })}
                        className="select select-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={!senderRegion}>
                        <option value="">
                          {senderRegion
                            ? "Select District"
                            : "Select Region First"}
                        </option>
                        {districtsByRegion(senderRegion)?.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      {errors.senderDistrict && (
                        <p className="text-error text-xs mt-1">
                          This field is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Address
                    </label>
                    <textarea
                      {...register("senderAddress", { required: true })}
                      className="w-full p-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      placeholder="Full pickup address"
                      rows="2"
                    />
                    {errors.senderAddress && (
                      <p className="text-error text-xs mt-1">
                        This field is required
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Receiver Details */}
              <div>
                <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-primary" />
                  Receiver Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Name
                    </label>
                    <input
                      {...register("receiverName", { required: true })}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Full name"
                    />
                    {errors.receiverName && (
                      <p className="text-error text-xs mt-1">
                        This field is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register("receiverPhoneNumber", { required: true })}
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="01xxxxxxxxx"
                    />
                    {errors.receiverPhoneNumber && (
                      <p className="text-error text-xs mt-1">
                        This field is required
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Email
                    </label>
                    <input
                      {...register("senderEmail", { required: true })}
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@example.com"
                    />
                    {errors.senderEmail && (
                      <p className="text-error text-xs mt-1">
                        Valid email is required
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-base-content mb-2">
                        Region
                      </label>
                      <select
                        {...register("receiverRegion", { required: true })}
                        className="select select-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Select Region</option>
                        {removeDuplicate?.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                      {errors.receiverRegion && (
                        <p className="text-error text-xs mt-1">
                          This field is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-2">
                        District
                      </label>
                      <select
                        {...register("receiverDistrict", { required: true })}
                        className="select select-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={!receiverRegion}>
                        <option value="">
                          {receiverRegion
                            ? "Select District"
                            : "Select Region First"}
                        </option>
                        {districtsByRegion(receiverRegion)?.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      {errors.receiverDistrict && (
                        <p className="text-error text-xs mt-1">
                          This field is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Address
                    </label>
                    <textarea
                      {...register("receiverAddress", { required: true })}
                      className="w-full p-3 rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      placeholder="Full delivery address"
                      rows="2"
                    />
                    {errors.receiverAddress && (
                      <p className="text-error text-xs mt-1">
                        This field is required
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="btn btn-primary btn-lg rounded-full px-12 shadow-lg hover:shadow-xl transition-shadow">
                Proceed to Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SendParcel;
