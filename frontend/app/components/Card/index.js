import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const Card = ({ childCare }) => {
  const capitalizeEachWord = (str) => {
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => {
        // Capitalize the first letter and convert the rest to lowercase for each word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" "); // Join the words back into a single string with spaces
  };
  return (
    <div className="px-5 py-2">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img src="https://i.imgur.com/6qF1Hn6.jpg" alt="Album" />
        </figure>
        <div className="card-body lg:w-1/2 gap-0 p-1">
          <p className="text-lg font-bold">
            {capitalizeEachWord(childCare.name.toLowerCase())}
          </p>
          <p className="text-xs flex items-center">
            {childCare.type[0] +
              childCare.type.toLowerCase().slice(1)}
          </p>
          <p className="flex items-center text-sm">
            <UserIcon className="w-4 h-4" />
            {childCare.capacity}
          </p>
          <p className="text-sm">
            {capitalizeEachWord(childCare.address.toLowerCase())}
          </p>
          <p className="text-sm">{`${capitalizeEachWord(
            childCare.city.toLowerCase()
          )}, ${childCare.province}`}</p>
          <p className="text-sm">{childCare.phoneNumber}</p>
          {!childCare.website ? (
            // <p className="text-sm">
              <a
                className="text-blue-600 visited:text-purple-600 text-sm"
                href="https://example.com"
                target="_blank"
              >
                example.com
              </a>
            // </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
