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
}) => {
  const clickedChildCareFirstIndex = childCares.findIndex((childCare) => {
    return uuidsClicked[0] === childCare.uuid;
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
        <div>Results ({childCares.length})</div>
        <div className="flex">
          {/* <div className="px-1">111</div>
          <div className="px-1">222</div>
          <div className="px-1">333</div> */}
        </div>
      </div>
      <div className="card-container">
        {childCares ? (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={listRef}
                height={height}
                itemCount={childCares.length}
                itemSize={208}
                width={width}
                itemData={childCares}
              >
                {({ index, style }) => (
                  <div style={style}>
                      <Card
                        key={index}
                        childCare={childCares[index]}
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
