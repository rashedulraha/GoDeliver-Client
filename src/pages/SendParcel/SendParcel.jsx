import useAuth from "../../Hooks/useAuth";
import useFetchCounters from "../../Hooks/useFetchCounters";
import Container from "../Responsive/Container";
import { useForm, useWatch } from "react-hook-form";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SendParcel = () => {
  const { register, handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

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

    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    Swal.fire({
      title: "Do you agree with the cost?",
      text: `Please confirm if you accept this price. You will be charge 
        ${cost} BD`,

      icon: "warning",
      showCancelButton: true,
      background: "#0f172a",
      color: "white",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I agree",
    }).then((result) => {
      if (result.isConfirmed) {
        //?   save the info to the database

        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving data: ", res.data);

          Swal.fire({
            title: "Thank you!",
            background: "#0f172a",
            color: "white",
            text: "Your confirmation has been received.",
            icon: "success",
          });
        });
      }
    });

    console.log("cost :", cost);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className="rounded-md my-10 bg-base-200 text-base-content max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Send A Parcel</h1>
        <p className="text-lg font-medium mb-8">Enter your parcel details</p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Parcel Type */}
          <div>
            <label className="text-lg font-medium mb-4 block">
              Parcel Type
            </label>
            <div className="flex items-center gap-10">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  {...register("parcelType")}
                  value="document"
                  className="radio radio-sm text-accent"
                  defaultChecked
                />
                <span>Document</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("parcelType")}
                  className="radio radio-sm text-accent"
                />
                <span>Non-Document</span>
              </label>
            </div>
          </div>

          {/* Parcel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="parcelName"
                className="block text-sm font-medium mb-2">
                Parcel Name
              </label>
              <input
                id="parcelName"
                {...register("parcelName")}
                type="text"
                className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                placeholder="Enter parcel name"
              />
            </div>

            <div>
              <label
                htmlFor="parcelWeight"
                className="block text-sm font-medium mb-2">
                Parcel Weight (KG)
              </label>
              <input
                id="parcelWeight"
                {...register("parcelWeight")}
                type="number"
                className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                placeholder="Enter weight in KG"
              />
            </div>
          </div>

          {/* Sender + Receiver Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Sender */}
            <div className="space-y-5">
              <h2 className="font-semibold text-xl">Sender Details</h2>

              <div>
                <label
                  htmlFor="senderName"
                  className="block text-sm font-medium mb-2">
                  Sender Name
                </label>
                <input
                  id="senderName"
                  {...register("senderName")}
                  className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                  placeholder="Full name of sender"
                />
              </div>

              <div>
                <label
                  htmlFor="senderAddress"
                  className="block text-sm font-medium mb-2">
                  Sender Address
                </label>
                <input
                  id="senderAddress"
                  {...register("senderAddress")}
                  className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                  placeholder="Full address"
                />
              </div>

              <div>
                <label
                  htmlFor="senderEmail"
                  className="block text-sm font-medium mb-2">
                  Sender Email
                </label>
                <input
                  id="senderPhoneNumber"
                  {...register("senderEmail")}
                  className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                  placeholder="your@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="senderPhoneNumber"
                  className="block text-sm font-medium mb-2">
                  Sender Phone Number
                </label>
                <input
                  id="senderPhoneNumber"
                  {...register("senderPhoneNumber")}
                  className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                  placeholder="01xxxxxxxxx"
                />
              </div>

              {/* Sender Region */}
              <div>
                <label
                  htmlFor="senderRegion"
                  className="block text-sm font-medium mb-2">
                  Sender Region
                </label>
                <select
                  id="senderRegion"
                  {...register("senderRegion")}
                  defaultValue=""
                  className="select select-sm bg-base-200 text-base-content w-full outline-none shadow-none">
                  <option value="" disabled>
                    Pick a region
                  </option>
                  {removeDuplicate?.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sender District */}
              <div>
                <label
                  htmlFor="senderDistrict"
                  className="block text-sm font-medium mb-2">
                  Sender District
                </label>
                <select
                  id="senderDistrict"
                  {...register("senderDistrict")}
                  defaultValue=""
                  className="select select-sm bg-base-200 text-base-content w-full outline-none shadow-none"
                  disabled={!senderRegion}>
                  <option value="" disabled>
                    {senderRegion ? "Pick a district" : "First select region"}
                  </option>
                  {districtsByRegion(senderRegion)?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="pickupInstruction"
                  className="block text-sm font-medium mb-2">
                  Pickup Instruction (Optional)
                </label>
                <textarea
                  id="pickupInstruction"
                  {...register("pickupInstruction")}
                  className="w-full p-3 border rounded-md text-sm bg-base-200 text-base-content outline-none shadow-none resize-none"
                  placeholder="Any special instruction for pickup?"
                  rows="3"
                />
              </div>
            </div>

            {/* Receiver */}
            <div className="space-y-5">
              <h2 className="font-semibold text-xl">Receiver Details</h2>

              <div>
                <label
                  htmlFor="receiverName"
                  className="block text-sm font-medium mb-2">
                  Receiver Name
                </label>
                <input
                  id="receiverName"
                  {...register("receiverName")}
                  className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                  placeholder="Full name of receiver"
                />
              </div>

              <div>
                <label
                  htmlFor="receiverAddress"
                  className="block text-sm font-medium mb-2">
                  Receiver Address
                </label>
                <input
                  id="receiverAddress"
                  {...register("receiverAddress")}
                  className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                  placeholder="Full delivery address"
                />
              </div>

              <div>
                <label
                  htmlFor="receiverPhoneNumber"
                  className="block text-sm font-medium mb-2">
                  Receiver Phone Number
                </label>
                <input
                  id="receiverPhoneNumber"
                  {...register("receiverEmail")}
                  className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                  placeholder="receiver@examle.com"
                />
              </div>
              <div>
                <label
                  htmlFor="receiverPhoneNumber"
                  className="block text-sm font-medium mb-2">
                  Receiver Phone Number
                </label>
                <input
                  id="receiverPhoneNumber"
                  {...register("receiverPhoneNumber")}
                  className="w-full input input-sm rounded-sm border bg-base-200 outline-none shadow-none"
                  placeholder="01xxxxxxxxx"
                />
              </div>

              {/* Receiver Region */}
              <div>
                <label
                  htmlFor="receiverRegion"
                  className="block text-sm font-medium mb-2">
                  Receiver Region
                </label>
                <select
                  id="receiverRegion"
                  {...register("receiverRegion")}
                  defaultValue=""
                  className="select select-sm bg-base-200 text-base-content w-full outline-none shadow-none">
                  <option value="" disabled>
                    Pick a region
                  </option>
                  {removeDuplicate?.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Receiver District */}
              <div>
                <label
                  htmlFor="receiverDistrict"
                  className="block text-sm font-medium mb-2">
                  Receiver District
                </label>
                <select
                  id="receiverDistrict"
                  {...register("receiverDistrict")}
                  defaultValue=""
                  className="select select-sm bg-base-200 text-base-content w-full shadow-none border border-base-200"
                  disabled={!receiverRegion}>
                  <option value="" disabled>
                    {receiverRegion ? "Pick a district" : "First select region"}
                  </option>
                  {districtsByRegion(receiverRegion)?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="deliveryInstruction"
                  className="block text-sm font-medium mb-2">
                  Delivery Instruction (Optional)
                </label>
                <textarea
                  id="deliveryInstruction"
                  {...register("deliveryInstruction")}
                  className="w-full p-3 border rounded-md text-sm bg-base-200 text-base-content outline-none shadow-none resize-none"
                  placeholder="Any special instruction for delivery?"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="btn btn-md shadow-none bg-accent/90 text-base-content border-none font-medium rounded-md hover:bg-accent transition px-10">
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SendParcel;
