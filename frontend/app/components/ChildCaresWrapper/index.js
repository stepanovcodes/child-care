"use client";
import React, { useEffect, useState } from "react";
import Map from "@/app/components/Map";
import CardList from "@/app/components/CardList";

const ChildCaresWrapper = ({ childCares }) => {
  const [cardData, setCardData] = useState(childCares);
  
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-2/3">
        <Map childCares={childCares} setCardData={setCardData} />
      </div>
      <div className="w-full sm:w-1/3">
        <CardList childCares={cardData} />
      </div>
    </div>
  );
};

export default ChildCaresWrapper;
