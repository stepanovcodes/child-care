import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import "./MunicipalDetailsDialog.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailsDialog({
  childCareDetails,
  handleCloseModel,
  setOpenSwipeableDrawer,
  setUuidShowOnMap,
  openMunicipalDetailsDialog,
  setOpenMunicipalDetailsDialog,
}) {
  //   const [openMunicipalDetailsDialog, setOpenMunicipalDetailsDialog] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpenMunicipalDetailsDialog(true);
  //   };

  const handleClose = () => {
    setOpenMunicipalDetailsDialog(false);
    handleCloseModel();
  };

  const handleShowOnMapClick = () => {
    setUuidShowOnMap(childCareDetails.uuid);
    // const xButton = document.getElementById("xButtonOnDetails");
    // if (xButton) {
    //   xButton.click();
    // }
    setOpenMunicipalDetailsDialog(false);
    setOpenSwipeableDrawer(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={openMunicipalDetailsDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ backgroundColor: "#009CE1" }}
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Child Care Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <div className="card-details-container">
          <div className="mx-8 my-4">
            <h3 className="font-bold text-lg">{childCareDetails?.name}</h3>
            <p className="text-gray-500 text-xs">
              {`${childCareDetails?.address}, ${childCareDetails?.city}, ${childCareDetails?.province}`}
            </p>
            <p className="flex text-xs">
              <HomeIcon className="w-4 h-3.5" />
              {childCareDetails?.type}
            </p>
            <p className="flex text-sm">
              <UserIcon className=" w-4 h-4" />
              {childCareDetails?.capacity}
            </p>
            <p className="flex text-sm">
              NOTE: For the safety of the provider, City of Calgary shows
              municipally licenced home-based child care providers only by
              community without specific addresses
            </p>

            <div className="flex">
              <div className="">
                <div
                  onClick={handleShowOnMapClick}
                  className="pl-4 bg-blue-500 text-white px-4 py-2 rounded-md text-sm mt-4 inline-block transition duration-300 hover:bg-blue-600 hover:text-gray-100 hover:cursor-pointer"
                >
                  SHOW ON MAP
                </div>
              </div>
            </div>
            </div>
        </div>
      </Dialog>
    </div>
  );
}

function shortenURL(originalURL) {
  // Remove "http://", "https://", and "www." from the beginning of the URL
  let cleanedURL = originalURL.replace(/^(https?:\/\/)?(www\.)?/, "");

  // Find the index of the first slash ('/') to determine the domain
  const slashIndex = cleanedURL.indexOf("/");
  if (slashIndex !== -1) {
    // Remove everything after the first slash to keep only the domain
    cleanedURL = cleanedURL.substring(0, slashIndex);
  }

  return truncatedURL(cleanedURL, 30);
}

function truncatedURL(originalURL, maxLength) {
  if (originalURL.length <= maxLength) {
    return originalURL;
  } else {
    const truncatedURL = originalURL.substring(0, maxLength);
    return truncatedURL + "...";
  }
}

function convertTime(timestamp) {
  // Convert timestamp to date
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Define the month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get various date components
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()]; // Get the month abbreviation
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format the date as a string
  const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes}`;

  return formattedDate;
}
