import React from "react";
import Image from 'next/image';
import {
  UserIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
// import { getPhoto } from "@/app/utilities/photos-service";
import HeartRating from "@/app/components/HeartRating";

const Card = ({ childCare }) => {
  // const Card = async ({ childCare }) => {

  // const result = await getPhoto("59071e81-8cfd-4cfa-8eba-69c4e7d16657")
  // const arrayBuffer = result.image;
  // const base64Data = Buffer.from(arrayBuffer).toString('base64');
  // console.log(arrayBuffer)

  return (
    <div className="px-5 py-2">
      <p className="text-lg font-bold">{childCare.name}</p>
      <p className="flex text-gray-500 text-sm">
        <MapPinIcon className="w-4 h-4" />
        {`${childCare.address}, ${childCare.city}, ${childCare.province} ${childCare.postalCode}`}
      </p>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img src="https://i.imgur.com/6qF1Hn6.jpg" alt="Album"/>
          {/* <img src={`data:image/jpeg;base64,${base64Data}`} alt="Album" /> */}
        </figure>
        <div className="flex-col lg:w-1/2 p-1">
          {childCare.rating !== null ? (
            <HeartRating
              value={childCare.rating}
              userRatingsTotal={childCare.userRatingsTotal}
            />
          ) : (
            ""
          )}
          <p className="flex text-xs">
            <HomeIcon className="w-4 h-3.5" />
            {childCare.type}
          </p>
          <p className="flex text-sm">
            <UserIcon className=" w-4 h-4" />
            {childCare.capacity}
          </p>

          <p className="flex text-sm">
            <PhoneIcon className="w-4 h-3.5" />
            {childCare.phoneNumber}
          </p>
          {childCare.website ? (
            <p className="flex text-sm">
              <GlobeAltIcon className="w-4 h-4" />
              <a
                className="text-blue-600 visited:text-purple-600 text-sm"
                href={childCare.website}
                target="_blank"
              >
                {shortenURL(childCare.website, 20)}
              </a>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

function shortenURL(originalURL) {
  // Remove "http://", "https://", and "www." from the beginning of the URL
  let cleanedURL = originalURL.replace(/^(https?:\/\/)?(www\.)?/, "");

  // Find the index of the first slash ('/') to determine the domain
  const slashIndex = cleanedURL.indexOf("/");
  if (slashIndex !== -1) {
    // Remove everything after the first slash to keep only the domain
    cleanedURL = cleanedURL.substring(0, slashIndex);
  }

  return truncatedURL(cleanedURL, 30);
}

function truncatedURL(originalURL, maxLength) {
  if (originalURL.length <= maxLength) {
    return originalURL;
  } else {
    const truncatedURL = originalURL.substring(0, maxLength);
    return truncatedURL + "...";
  }
}
