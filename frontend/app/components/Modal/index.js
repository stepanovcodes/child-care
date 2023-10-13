import React from "react";
import {
  UserIcon,
  HomeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import HeartRating from "@/app/components/HeartRating";

const Modal = ({childCareDetails, handleCloseModel}) => {

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">{childCareDetails?.name}</h3>
        <p className="text-gray-500 text-xs">
          {`${childCareDetails?.address}, ${childCareDetails?.city}, ${childCareDetails?.province} ${childCareDetails?.postalCode}`}
        </p>
        {childCareDetails?.rating !== null ? (
          <HeartRating
            value={childCareDetails ? childCareDetails.rating : 0}
            userRatingsTotal={childCareDetails?.userRatingsTotal}
          />
        ) : (
          ""
        )}
        <p className="flex text-xs">
          <HomeIcon className="w-4 h-3.5" />
          {childCareDetails?.type}
        </p>
        <p className="flex text-sm">
          <UserIcon className=" w-4 h-4" />
          {childCareDetails?.capacity}
        </p>

        <p className="flex text-sm">
          <PhoneIcon className="w-4 h-3.5" />
          {childCareDetails?.phoneNumber}
        </p>
        {childCareDetails?.website ? (
          <p className="flex text-sm">
            <GlobeAltIcon className="w-4 h-4" />
            <a
              className="text-blue-600 visited:text-purple-600 text-sm"
              href={childCareDetails?.website}
              target="_blank"
            >
              {shortenURL(childCareDetails?.website, 20)}
            </a>
          </p>
        ) : (
          ""
        )}
        {childCareDetails?.Reviews.map((review) => (
          <p key={review.uuid}>{review.text}</p>
        ))}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleCloseModel}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;

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
