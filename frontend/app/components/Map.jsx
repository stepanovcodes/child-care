"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Supercluster from "supercluster";
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
      center: [-110.67701, 50.041409],
      zoom: 10,
    });
    map.on("load", () => {
      // Create a supercluster instance
      const supercluster = new Supercluster({
        radius: 40, // Adjust the cluster radius as needed
        maxZoom: 16, // Adjust the max zoom level as needed
      });

      // Filter out childCare objects without valid coordinates
      const validChildCares = childCares.filter(
        (childCare) =>
          typeof childCare.longitude === "number" &&
          typeof childCare.latitude === "number"
      );

      // Add childCare data to the supercluster
      supercluster.load(
        validChildCares.map((childCare) => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [childCare.longitude, childCare.latitude],
            },
            properties: { childCare }, // Store the childCare data
          };
        })
      );

      // Create a layer for the clustered markers
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: {
          type: "geojson",
          data: supercluster.getClusters([-180, -85, 180, 85], map.getZoom()), // Adjust the bounding box as needed
        },
        paint: {
          "circle-color": "orange", // Adjust the cluster color
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20, // Adjust the cluster radius
            100, // Adjust the cluster threshold
            30, // Adjust the cluster radius for larger clusters
          ],
        },
      });

      // Create a layer for the cluster labels
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "clusters",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 12,
        },
      });

      // Add childCare markers to the map
      map.addLayer({
        id: "childCares",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: childCares.map((childCare) => {
              if (childCare.longitude && childCare.latitude) {
                return {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [childCare.longitude, childCare.latitude],
                  },
                  properties: { childCare }, // Store the childCare data
                };
              }
            }),
          },
        },
        layout: {
          "icon-image": "marker-15", // Adjust the marker icon as needed
          "icon-size": 1.5, // Adjust the marker size as needed
        },
      });

      // // Create default markers
      // childCares.map((childCare) => {
      //   if (childCare.longitude && childCare.latitude) {
      //     return new mapboxgl.Marker()
      //       .setLngLat([childCare.longitude, childCare.latitude])
      //       .addTo(map);
      //   }
      // });

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      //Display cluster data when the map is loaded
      const clusters = supercluster.getClusters(
        [-180, -85, 180, 85],
        map.getZoom()
      );
      map.getSource("clusters").setData({
        type: "FeatureCollection",
        features: clusters,
      });

      // When the map zooms, update the cluster data
      map.on("zoom", () => {
        const clusters = supercluster.getClusters(
          [-180, -85, 180, 85],
          map.getZoom()
        );
        map.getSource("clusters").setData({
          type: "FeatureCollection",
          features: clusters,
        });
      });

      // Clean up on unmount
      return () => map.remove();
    });
  }, [childCares]);

  return (
    <>
      <div className="map-container" ref={mapContainerRef} />
    </>
  );
};
export default Map;
