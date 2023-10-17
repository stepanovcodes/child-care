import React, { useEffect, useState } from "react";
import CardList from "@/app/components/CardList";
import SwipeableEdgeDrawer from "@/app/components/SwipeableEdgeDrawer";

function ResponsiveComponent({
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
  setSearchInput,
}) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Check if the code is running in the browser (client-side)
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }

    // Add an event listener to listen for window resize events
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth < 640 ? (
        <SwipeableEdgeDrawer
          childCares={childCares}
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
      ) : (
        <CardList
          childCares={childCares}
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
      )}
    </>
  );
}

export default ResponsiveComponent;
