"use client";
import React, { useState } from "react";
import Map from "@/app/components/Map";
import CardList from "@/app/components/CardList";

const ChildCaresWrapper = ({ childCares }) => {
  const [cardData, setCardData] = useState([]);
  const [clickedUuid, setClickedUuid] = useState(null);
  const [cardIndexHovered, setCardIndexHovered] = useState(null);

  const handleCardMouseEnter = (index) => {
    setCardIndexHovered(index);
    // console.log(`Pin ${index} Highlighted`);
  }

  const handleCardMouseLeave = () => {
    setCardIndexHovered(null);
    // console.log(`Pin ${index} NOT Highlighted`);
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-1/2 md:w-2/3 xl:w-3/4">
        <Map
          childCares={childCares}
          setCardData={setCardData}
          setClickedUuid={setClickedUuid}
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4">
        <CardList childCares={cardData} clickedUuid={clickedUuid} cardIndexHovered={cardIndexHovered} handleCardMouseEnter={handleCardMouseEnter} handleCardMouseLeave={handleCardMouseLeave} />
      </div>
    </div>
  );
};

export default ChildCaresWrapper;
