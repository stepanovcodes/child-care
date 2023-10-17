import React, { useRef, useEffect, useState } from "react";
import Card from "@/app/components/Card";
import "./CardList.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import TextField from "@mui/material/TextField";

const programTypes = [
  "Day Care",
  "Family Day Home",
  "Group Family Child Care",
  "Preschool",
  "Out of School Care",
];

const CardList = ({
  childCares,
  uuidsClicked,
  uuidHovered,
  handleCardMouseEnter,
  handleCardMouseLeave,
  handleShowModel,
  ratingValue,
  capacityValue,
  selectedChips,
  includeWoReviews,
  searchInput,
  setSearchInput
}) => {

  const filterOn = !(
    ratingValue[0] === 0 &&
    ratingValue[1] === 5 &&
    capacityValue[0] === 0 &&
    capacityValue[1] === 1100 &&
    selectedChips.every((chip) => !chip) &&
    includeWoReviews === true
  );

  const getFilteredChildCares = (arr) => {
    const filteredChildCares = arr.filter((item) => {
      return (
        item.capacity >= capacityValue[0] &&
        item.capacity <= capacityValue[1] &&
        ((item.rating >= ratingValue[0] && item.rating !== null) ||
          (includeWoReviews && item.rating === null)) &&
        item.rating <= ratingValue[1] &&
        ((selectedChips[0] &&
          item.type === programTypes[0]) ||
          (selectedChips[1] && item.type === programTypes[1]) ||
          (selectedChips[2] &&
            item.type === programTypes[2]) ||
          (selectedChips[3] &&
            item.type === programTypes[3]) ||
          (selectedChips[4] &&
            item.type === programTypes[4]) ||
          (!selectedChips[0] &&
            !selectedChips[1] &&
            !selectedChips[2] &&
            !selectedChips[3] &&
            !selectedChips[4])) &&
        (item.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.type?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.address?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.city?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.postalCode?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.phoneNumber?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.website?.toLowerCase().includes(searchInput.toLowerCase()))
      );
    });
    return filteredChildCares;
  };

  const filteredChildCares = getFilteredChildCares(childCares);

  const clickedChildCareFirstIndex = filteredChildCares.findIndex(
    (childCare) => {
      return uuidsClicked.some((uuid) => uuid === childCare.uuid);
    }
  );

  // Create a ref for the FixedSizeList component
  const listRef = useRef(null);

  useEffect(() => {
    scrollToTop();
  }, [uuidsClicked]);

  // Function to scroll to the top of the list
  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo(clickedChildCareFirstIndex * 208);
    }
  };

  return (
    <>
      <div className="pl-5 pr-5 flex py-1 items-end justify-start">
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full"
        />
        <div className="flex  justify-between">
          <div className={filterOn ? "text-rose-600 pb-1" : "pb-1"}>({filteredChildCares.length})</div>
        </div>
      </div>

      <div className="card-container">
        {filteredChildCares ? (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={listRef}
                height={height}
                itemCount={filteredChildCares.length}
                itemSize={208}
                width={width}
                itemData={filteredChildCares}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <Card
                      key={index}
                      childCare={filteredChildCares[index]}
                      uuidHovered={uuidHovered}
                      uuidsClicked={uuidsClicked}
                      handleCardMouseEnter={handleCardMouseEnter}
                      handleCardMouseLeave={handleCardMouseLeave}
                      handleShowModel={handleShowModel}
                    />
                  </div>
                )}
              </List>
            )}
          </AutoSizer>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CardList;
