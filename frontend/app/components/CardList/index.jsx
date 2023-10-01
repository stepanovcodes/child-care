import React, { Suspense } from "react";
const Card = React.lazy(() => import("@/app/components/Card"));
import "./CardList.css";

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
      <div className="card-container">
      <Suspense fallback={<div className="card-loader" ><span className="loading loading-bars loading-lg"></span>Getting cards ready...</div>
}>
      {childCares.map((childCare) => (
        <Card key={childCare.uuid} childCare={childCare} />
      ))}
      </Suspense>
      </div>
    </>
  );
};

export default CardList;
