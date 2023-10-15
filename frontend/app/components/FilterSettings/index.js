import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const programTypes = [
  "Day Cares",
  "Family Day Home",
  "Group Family Child Care",
  "Preschool",
  "Out of School Care",
];

const FilterSettings = ({
    ratingValue,
    setRatingValue,
    capacityValue,
    setCapacityValue,
    selectedChips,
    setSelectedChips,
    includeWoReviews,
    setIncludeWoReviews
}) =>
  {
    
    const minRatingDistance = 1;
    const minCapacityDistance = 5;

    const handleChangeRating = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (newValue[1] - newValue[0] < minRatingDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 5 - minRatingDistance);
          setRatingValue([clamped, clamped + minRatingDistance]);
        } else {
          const clamped = Math.max(newValue[1], minRatingDistance);
          setRatingValue([clamped - minRatingDistance, clamped]);
        }
      } else {
        setRatingValue(newValue);
      }
    };

    const handleChangeCapacity = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (newValue[1] - newValue[0] < minCapacityDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 200 - minCapacityDistance);
          setCapacityValue([clamped, clamped + minCapacityDistance]);
        } else {
          const clamped = Math.max(newValue[1], minCapacityDistance);
          setCapacityValue([clamped - minCapacityDistance, clamped]);
        }
      } else {
        setCapacityValue(newValue);
      }
    };

    const handleChipClick = (index) => {
      // Create a copy of the current background state array
      const updatedSelectedChips = [...selectedChips];

      // Toggle the background color for the clicked Chip
      updatedSelectedChips[index] = updatedSelectedChips[index] ? false : true;

      // Update the background state
      setSelectedChips(updatedSelectedChips);
    };

    const handleCheckBoxClicked = () => {
      if (includeWoReviews) {
        setIncludeWoReviews(false);
      } else {
        setIncludeWoReviews(true);
      }
    };

    const resetFilters = () => {
      setRatingValue([0, 5]);
      setCapacityValue([0, 200]);
      setSelectedChips([false, false, false, false, false]);
      setIncludeWoReviews(true);
    };

    return (
      <dialog id="filter_settings" className="modal">
        <div className="modal-box">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Filters</h3>
            <div
              className="text-lg font-medium text-blue-600 cursor-pointer"
              onClick={resetFilters}
            >
              Reset filters
            </div>
          </div>
          <h4 className="text-m pt-8 pb-2">Type of program :</h4>

          <Box sx={{ width: 200 }}>
            <Stack direction="column" spacing={1} className="flex flex-wrap">
              {programTypes.map((programType, programTypeIndex) => (
                <Chip
                key={programTypeIndex}
                label={programType}
                variant="outlined"
                onClick={() => {
                  handleChipClick(programTypeIndex);
                }}
                style={{
                  background: !selectedChips[programTypeIndex] ? "#F9F5F3" : "#7dd3fc",
                }}
              />
              ))}
            </Stack>
          </Box>

          <h4 className="text-m pt-4 pb-2">
            Capacity {`${capacityValue[0]} - ${capacityValue[1]} kids`}:
          </h4>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              min={0}
              max={200}
              value={capacityValue}
              onChange={handleChangeCapacity}
              valueLabelDisplay="auto"
              disableSwap
            />
          </Box>

          <h4 className="text-m pt-4 pb-2">
            Google rating {`${ratingValue[0]}.0 - ${ratingValue[1]}.0`}:
          </h4>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Minimum distance shift"}
              min={0}
              max={5}
              marks
              value={ratingValue}
              onChange={handleChangeRating}
              valueLabelDisplay="auto"
              disableSwap
            />
          </Box>
          <FormControlLabel
            onClick={handleCheckBoxClicked}
            control={<Checkbox checked={includeWoReviews} />}
            label="Include Child Cares without reviews"
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  };

export default FilterSettings;
