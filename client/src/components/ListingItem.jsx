import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className=" bg-black shadow-md shadow-black hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[310px] min-h-[400px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt=" listing cover"
          className=" h-[220px] sm:h-[160px] w-full object-cover hover:scale-105 transition-scale duration-300"
        ></img>
        <div className=" p-3 flex flex-col gap-2 w-full">
          <p className=" truncate text-lg font-semibold text-slate-300 pt-3">
            {listing.name}
          </p>
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt className=" h-4 w-4 text-[#A6FF96]" />
            <p className=" text-sm text-gray-400 truncate">{listing.address}</p>
          </div>
          <p className=" text-sm text-gray-500 line-clamp-2">
            {listing.description}
          </p>
          <p className=" mt-2 font-semibold text-slate-300">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex gap-4 font-bold text-sm text-slate-500">
            <div>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms}Bed`}
            </div>
            <div>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bath`
                : `${listing.bathrooms}Bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
