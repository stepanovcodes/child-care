"use client";
import React, { useState } from "react";
import Map from "@/app/components/Map";
import CardList from "@/app/components/CardList";
import { getChildCare } from "@/app/utilities/childcares-service";
import Modal from "@/app/components/Modal";
import Filter from "@/app/components/Filter";
import FilterSettings from "@/app/components/FilterSettings";

const ChildCaresWrapper = ({ childCares }) => {
  const [cardData, setCardData] = useState([]);
  const [uuidsClicked, setUuidsClicked] = useState([]);
  const [uuidHovered, setUuidHovered] = useState(null);
  const [childCareDetails, setChildCareDetails] = useState(null);
  const [ratingValue, setRatingValue] = useState([0, 5]);
  const [capacityValue, setCapacityValue] = useState([0, 1100]);
  const [selectedChips, setSelectedChips] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [includeWoReviews, setIncludeWoReviews] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleCardMouseEnter = (uuid) => {
    setUuidHovered(uuid);
    // console.log(`Pin ${uuid} Highlighted`);
  };

  const handleCardMouseLeave = () => {
    setUuidHovered(null);
    // console.log(`Pin ${index} NOT Highlighted`);
  };

  const handleShowModel = async (uuid) => {
    const details = await getChildCare(uuid);
    setChildCareDetails(details);
    // console.log(details)
    setTimeout(() => {
      document.getElementById("my_modal_2").showModal();
    }, 1); // Delay for 1 second (1000 milliseconds)
  };

  const handleCloseModel = () => {
    setChildCareDetails(null);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-1/2 md:w-2/3 xl:w-3/4 relative">
        <Map
          childCares={childCares}
          setCardData={setCardData}
          uuidsClicked={uuidsClicked}
          setUuidsClicked={setUuidsClicked}
          uuidHovered={uuidHovered}
          ratingValue={ratingValue}
          capacityValue={capacityValue}
          selectedChips={selectedChips}
          includeWoReviews={includeWoReviews}
          searchInput={searchInput}
        />
        <div
          onClick={() => document.getElementById("filter_settings").showModal()}
          className="absolute right-2 top-28"
        >
          <Filter
            ratingValue={ratingValue}
            capacityValue={capacityValue}
            selectedChips={selectedChips}
            includeWoReviews={includeWoReviews}
          />
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4">
        <CardList
          childCares={cardData}
          uuidsClicked={uuidsClicked}
          uuidHovered={uuidHovered}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
          handleShowModel={handleShowModel}
          ratingValue={ratingValue}
          capacityValue={capacityValue}
          selectedChips={selectedChips}
          includeWoReviews={includeWoReviews}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
      <Modal
        childCareDetails={childCareDetails}
        handleCloseModel={handleCloseModel}
      />

      <FilterSettings
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        capacityValue={capacityValue}
        setCapacityValue={setCapacityValue}
        selectedChips={selectedChips}
        setSelectedChips={setSelectedChips}
        includeWoReviews={includeWoReviews}
        setIncludeWoReviews={setIncludeWoReviews}
      />
    </div>
  );
};

export default ChildCaresWrapper;
