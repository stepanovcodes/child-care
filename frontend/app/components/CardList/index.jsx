import React from "react";
import Card from "@/app/components/Card";
import "./CardList.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const CardList = ({ childCares, clickedUuid, cardIndexHovered, handleCardMouseEnter, handleCardMouseLeave }) => {
  const clickedChildCareIndex = childCares.findIndex((childCare) => {
    return clickedUuid === childCare.uuid;
  });

  let allClickedChildCareIndexes = [];
  if (clickedChildCareIndex !== -1) {
    allClickedChildCareIndexes = childCares
      .map((childCare, index) => {
        return childCare.longitude ===
          childCares[clickedChildCareIndex].longitude &&
          childCare.latitude === childCares[clickedChildCareIndex].latitude
          ? index
          : -1;
      })
      .filter((index) => index !== -1);

    allClickedChildCareIndexes.forEach((clickedChildCareIndex) => {
      const movedElement = childCares.splice(clickedChildCareIndex, 1)[0];
      childCares.unshift(movedElement);
    });
  }

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
                height={height}
                itemCount={childCares.length}
                itemSize={208}
                width={width}
                itemData={childCares}
              >
                {({ index, style }) => (
                  <div style={style}>
                    {index < allClickedChildCareIndexes.length ? (
                      <Card
                        key={index}
                        index={index}
                        childCare={childCares[index]}
                        highlight={true}
                        cardIndexHovered={cardIndexHovered}
                        handleCardMouseEnter={handleCardMouseEnter}
                        handleCardMouseLeave={handleCardMouseLeave}
                      />
                    ) : (
                      <Card
                        key={index}
                        index={index}
                        childCare={childCares[index]}
                        highlight={false}
                        cardIndexHovered={cardIndexHovered}
                        handleCardMouseEnter={handleCardMouseEnter}
                        handleCardMouseLeave={handleCardMouseLeave}
                      />
                    )}
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
