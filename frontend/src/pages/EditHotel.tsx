import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query"; // Add this line
import * as apiClient from "../api-clients";
import ManageHotelForms from "../forms/ManageHotelForm/ManageHotelForms";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelsById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelsById, {
    onSuccess: () => {
      showToast({ message: "Hotel Updated Successfully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Updating Hotel", type: "ERROR" });
    },
  });

  const handleSave = (HotelFormData: FormData) => {
    mutate(HotelFormData);
  };
  return (
    <ManageHotelForms hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
