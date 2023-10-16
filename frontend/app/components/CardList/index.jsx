import React, { useRef, useEffect } from "react";
import Card from "@/app/components/Card";
import "./CardList.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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
  includeWoReviews
}) => {

  const getFilteredChildCares = (arr) => {
    const filteredChildCares = arr.filter((item) => {
      return (
        item.capacity >= capacityValue[0] &&
        item.capacity <= capacityValue[1] &&
        ((item.rating >= ratingValue[0] && item.rating !== null) ||
          (includeWoReviews && item.rating === null)) &&
        item.rating <= ratingValue[1] &&
        ((selectedChips[0] &&
          item.type === "DAY CARE (FACILITY-BASED PROGRAM)") ||
          (selectedChips[1] && item.type === "FAMILY DAY HOME") ||
          (selectedChips[2] &&
            item.type === "GROUP FAMILY CHILD CARE PROGRAM") ||
          (selectedChips[3] &&
            item.type === "PRE-SCHOOL (FACILITY-BASED PROGRAM)") ||
          (selectedChips[4] &&
            item.type === "OUT OF SCHOOL CARE (FACILITY-BASED PROGRAM)") ||
          (!selectedChips[0] &&
            !selectedChips[1] &&
            !selectedChips[2] &&
            !selectedChips[3] &&
            !selectedChips[4]))
      );
    });
    return filteredChildCares;
  };

  const filteredChildCares = getFilteredChildCares(childCares);

  const clickedChildCareFirstIndex = filteredChildCares.findIndex((childCare) => {
    return uuidsClicked.some((uuid) => uuid === childCare.uuid);
  });

  // Create a ref for the FixedSizeList component
  const listRef = useRef(null);

  useEffect(() => {
    scrollToTop();
  }, [uuidsClicked]);

  // Function to scroll to the top of the list
  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo(clickedChildCareFirstIndex*208);
    }
  };

  

  return (
    <>
      <div className="px-5 py-1 flex justify-between">
        <div>Results ({filteredChildCares.length})</div>
        <div className="flex">
          {/* <div className="px-1">111</div>
          <div className="px-1">222</div>
          <div className="px-1">333</div> */}
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
