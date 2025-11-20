import useAuth from "../../Hooks/useAuth";
import useFetchCounters from "../../Hooks/useFetchCounters";
import Container from "../Responsive/Container";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    // formState: { error },
  } = useForm();
  const { loading } = useAuth();

  const { fetchData } = useFetchCounters("/ServiceCounters.json");

  const filteringRegion = fetchData?.map((region) => region.region);
  const removeDuplicate = [...new Set(filteringRegion)];

  const senderRegion = watch("senderRegion");

  const districtsByRegion = (region) => {
    const regionDistricts = fetchData?.filter((data) => data.region === region);
    const districts = regionDistricts?.map((district) => district.district);
    return districts;
  };

  districtsByRegion("dhaka");

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  //! Page loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className="rounded-md  my-10 bg-primary text-base-100 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Send A Parcel</h1>
        <p className="text-lg font-medium mb-4">Enter your parcel details</p>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Parcel Type */}
          <div className="flex items-center gap-6 mb-6">
            <label className="label">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="radio radio-sm text-accent"
                defaultChecked
              />
              Document
            </label>

            <label className="label">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType")}
                className="radio radio-sm text-accent"
              />
              Non-Document
            </label>
          </div>

          {/* Parcel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="text-sm font-medium">Parcel Name</label>
              <input
                {...register("parcelName")}
                type="text"
                className="w-full mt-2 input input-sm rounded-sm border  bg-primary shadow-none border-base-200"
                placeholder="Parcel Name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Parcel Weight (KG)</label>
              <input
                {...register("parcelWeight")}
                type="number"
                className="w-full mt-2 input input-sm rounded-sm border  bg-primary shadow-none border-base-200"
                placeholder="Parcel Weight (KG)"
              />
            </div>
          </div>

          {/* Sender + Receiver Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Sender */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Sender Details</h2>

              <div className="flex flex-col gap-4">
                <input
                  {...register("senderName")}
                  className="w-full mt-2 input input-sm rounded-sm border  bg-primary shadow-none border-base-200"
                  placeholder="Sender Name"
                />
                <input
                  className="w-full mt-2 input input-sm rounded-sm border  bg-primary shadow-none border-base-200"
                  placeholder="Address"
                />
                <input
                  {...register("senderPhoneNumber")}
                  className="w-full mt-2 input input-sm rounded-sm border  bg-primary shadow-none border-base-200"
                  placeholder="Sender Phone No"
                />
                <label>Your Region</label>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a region"
                  className="select select-sm bg-primary text-base-100 w-full shadow-none border border-base-200  ">
                  <option disabled={true}>Pick a region</option>

                  {removeDuplicate?.map((region) => (
                    <option
                      key={region}
                      value={region}
                      className="hover:bg-accent/10 rounded-none">
                      {region}
                    </option>
                  ))}
                </select>
                <label>Your District</label>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a Districts"
                  className="select select-sm bg-primary text-base-100 w-full shadow-none border border-base-200 ">
                  <option disabled={true}>Pick a District</option>

                  {districtsByRegion(senderRegion)?.map((region) => (
                    <option
                      key={region}
                      value={region}
                      className="hover:bg-accent/10 rounded-none">
                      {region}
                    </option>
                  ))}
                </select>

                <textarea
                  className="p-2 border rounded-md text-sm"
                  placeholder="Pickup Instruction"
                  rows="3"
                />
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Receiver Details</h2>

              <div className="flex flex-col gap-4">
                <input
                  {...register("receiverName")}
                  className="w-full mt-2 input input-sm rounded-sm border  bg-primary shadow-none border-base-200"
                  placeholder="Receiver Name"
                />
                <input
                  className="w-full mt-2 input input-sm rounded-sm border  bg-primary shadow-none border-base-200"
                  placeholder="Receiver Address"
                />
                <input
                  {...register("receiverPhoneNumber")}
                  className="w-full mt-2 input input-sm rounded-sm border  bg-primary shadow-none border-base-200"
                  placeholder="Receiver Contact No"
                />

                <label>Receiver District</label>
                <select
                  defaultValue="Small"
                  className="select select-sm bg-primary text-base-100 w-full shadow-none border border-base-200 ">
                  <option disabled={true}>Small</option>
                  <option className="hover:bg-accent/10 rounded-none">
                    Small Apple
                  </option>
                  <option className="hover:bg-accent/10 rounded-none">
                    Small Orange
                  </option>
                  <option className="hover:bg-accent/10 rounded-none">
                    Small Tomato
                  </option>
                </select>

                <textarea
                  className="p-2 text-sm border rounded-md"
                  placeholder="Delivery Instruction"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <button className="mt-6 btn btn-md shadow-none  bg-accent/90 text-base-100 border-none font-medium rounded-md hover:bg-accent transition">
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </Container>
  );
};

export default SendParcel;
