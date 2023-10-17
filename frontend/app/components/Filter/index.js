import React from "react";

const Filter = ({
  ratingValue,
  capacityValue,
  selectedChips,
  includeWoReviews,}) => {
  
    const filterOn = !(
      ratingValue[0] === 0 &&
      ratingValue[1] === 5 &&
      capacityValue[0] === 0 &&
      capacityValue[1] === 1100 &&
      selectedChips.every((chip) => !chip) &&
      includeWoReviews === true
    );

  return (
    <div className={`w-8 h-8 p-1 rounded-md border-2 ${filterOn? "border-rose-300 bg-rose-100 hover:border-rose-400" : "border-gray-300  bg-white hover:bg-gray-100" } group cursor-pointer transition duration-300 ease-in-out`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>
    </div>
  );
};

export default Filter;
