import React from "react";
import {
  UserIcon,
  HomeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import HeartRating from "@/app/components/HeartRating";
import Paper from "@mui/material/Paper";

const Card = ({
  childCare,
  highlight,
  uuidHovered,
  handleCardMouseEnter,
  handleCardMouseLeave,
}) => {
  const handleMouseEnter = () => {
    handleCardMouseEnter(childCare.uuid);
  };

  const handleMouseLeave = () => {
    handleCardMouseLeave();
  };

  return (
    <div
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Paper
        className="h-48 mx-5"
        variant="elevation"
        style={{
          border:
            highlight || uuidHovered === childCare.uuid
              ? "2px solid #009CE1"
              : "none",
          cursor: uuidHovered === childCare.uuid ? "pointer" : "",
          backgroundColor: highlight ? "#F8DB6F" : "white",
        }}
      >
        <div className="p-2">
          <p className="text-md font-bold">{childCare.name}</p>
          <p className="text-gray-500 text-xs">
            {`${childCare.address}, ${childCare.city}, ${childCare.province} ${childCare.postalCode}`}
          </p>
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
      </Paper>
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
