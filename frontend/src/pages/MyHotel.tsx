import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-clients";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotel = () => {
  const { data: HotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!HotelData) {
    return <span>No Hotels Found!</span>;
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {HotelData?.map((Hotel) => (
          <div className="flex flex-col justify-between border border-salute-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{Hotel.name}</h2>
            <div className="whitespace-pre-line">{Hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-salute-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {Hotel.city}, {Hotel.country}
              </div>
              <div className="border border-salute-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {Hotel.type}
              </div>
              <div className="border border-salute-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />${Hotel.pricePerNight} Per Night
              </div>
              <div className="border border-salute-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {Hotel.adultCount} Adults, {Hotel.childCount} Children
              </div>
              <div className="border border-salute-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {Hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${Hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
