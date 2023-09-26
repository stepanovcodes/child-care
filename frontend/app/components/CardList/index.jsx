import React from "react";
import Card from "@/app/components/Card";

const CardList = ({ childCares }) => {
  return (
    <>
      <div className="px-5 py-2 flex justify-between">
        <div>Results ({childCares.length})</div>
        <div className="flex">
          {/* <div className="px-1">111</div>
          <div className="px-1">222</div>
          <div className="px-1">333</div> */}
        </div>
      </div>
      <div style={{maxHeight: "calc(100vh - 104px)", overflowY: "auto"}}>
      {childCares.map((childCare) => (
        <Card key={childCare.uuid} childCare={childCare} />
      ))}
      </div>
    </>
  );
};

export default CardList;
