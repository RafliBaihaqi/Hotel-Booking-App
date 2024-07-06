import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-grey-700 text-sm font-bold">
          Adult Count
          <input
            type="number"
            min={1}
            className="border rounded w-full py-2 px-3 font-normal"
            {...register("adultCount", { required: "This Field Is Required" })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm fold-bold">{errors.adultCount.message} </span>
          )}
        </label>
        <label className="text-grey-700 w-full text-sm font-bold">
          Children Count
          <input
            type="number"
            min={1}
            className="border rounded w-full py-2 px-3 font-normal"
            {...register("childCount", { required: "This Field Is Required" })}
          ></input>
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm fold-bold">{errors.childCount.message} </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
