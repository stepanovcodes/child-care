import React, { useState, useEffect } from "react";
import {
  UserIcon,
  HomeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Paper from "@mui/material/Paper";

const Card = ({
  childCare,
  uuidHovered,
  uuidsClicked,
  handleCardMouseEnter,
  handleCardMouseLeave,
  handleShowModel,
}) => {
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

  const handleMouseEnter = () => {
    handleCardMouseEnter(childCare.uuid);
  };

  const handleMouseLeave = () => {
    handleCardMouseLeave();
  };

  const handleModel = () => {
    handleShowModel(childCare.uuid);
  };

  return (
    <div
      {...(windowWidth < 640
        ? {}
        : {
            onMouseOver: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
          })}
      onClick={handleModel}
    >
      <Paper
        className="h-48 mx-5"
        variant="elevation"
        style={{
          border:
            uuidsClicked.includes(childCare.uuid) ||
            uuidHovered === childCare.uuid
              ? "2px solid #009CE1"
              : "none",
          cursor: uuidHovered === childCare.uuid ? "pointer" : "",
          backgroundColor: uuidsClicked.includes(childCare.uuid)
            ? "#F8DB6F"
            : "white",
        }}
      >
        <div className="p-2">
          <p className="text-md font-bold">{childCare.name}</p>
          <p className="text-gray-500 text-xs">
            {`${childCare.address}, ${childCare.city}, ${childCare.province}`}
          </p>
          <p className="flex text-xs">
            <HomeIcon className="w-4 h-3.5" />
            {childCare.type}
          </p>
          <p className="flex text-sm">
            <UserIcon className=" w-4 h-4" />
            {childCare.capacity}
          </p>
          <p className="flex text-sm">
            NOTE: For the safety of the provider, City of Calgary shows municipally licenced home-based child care providers only by community without specific addresses
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default Card;