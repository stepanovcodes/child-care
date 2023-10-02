import React from "react";
import Card from "@/app/components/Card";
import "./CardList.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const CardList = ({ childCares }) => {
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
                    <Card key={index} childCare={childCares[index]} />
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
