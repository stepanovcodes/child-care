"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
// import geoJson from "./chicago-parks.json";

/**
 * Child Care data type.
 * @typedef {Object} ChildCare
 * @property {string} uuid - Unique identifier.
 * @property {string} name - Name of the child care facility.
 * @property {string} type - Type of the child care facility.
 * @property {string} address - Address of the child care facility.
 * @property {string} city - City where the child care facility is located.
 * @property {string} province - Province where the child care facility is located.
 * @property {string} postalCode - Postal code of the child care facility.
 * @property {string} phoneNumber - Phone number of the child care facility.
 * @property {string} googleMapsLink - Google Maps link for the child care facility.
 * @property {number} capacity - Capacity of the child care facility.
 * @property {number} latitude - Latitude coordinate.
 * @property {number} longitude - Longitude coordinate.
 * @property {string} placeId - Place ID.
 * @property {string} createdAt - Creation date and time.
 * @property {string} updatedAt - Last update date and time.
 */

/**
 * Map component.
 * @param {Object} props - Component props.
 * @param {ChildCare[]} props.childCares - An array of child care data.
 */

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

const Map = ({ childCares }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-114.063124, 51.044297],
      zoom: 10,
    });

    // Create default markers
    childCares.map((childCare) =>
      new mapboxgl.Marker().setLngLat([childCare.longitude, childCare.latitude]).addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <>
      <div className="map-container" ref={mapContainerRef} />
    </>
  );
};
export default Map;
