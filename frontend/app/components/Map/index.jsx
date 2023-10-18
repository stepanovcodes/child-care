import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox styles
import "./Map.css"; // Create a CSS file for styling if needed

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // Replace with your Mapbox access token

const programTypes = [
  "Day Care",
  "Family Day Home",
  "Group Family Child Care",
  "Preschool",
  "Out of School Care",
];

const Map = ({
  childCares,
  setCardData,
  uuidsClicked,
  setUuidsClicked,
  uuidHovered,
  ratingValue,
  capacityValue,
  selectedChips,
  includeWoReviews,
  searchInput,
  uuidShowOnMap,
  setUuidShowOnMap,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  let filteredChildCares = [];

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-114.06481456601747, 51.030150021237255],
      zoom: 10,
    });

    const map = mapRef.current;

    filteredChildCares = getFilteredChildCares(childCares);

    map.on("load", () => {
      setIsLoading(false);
      map.addSource("childCares", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: filteredChildCares.map((filteredChildCare) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                filteredChildCare.longitude,
                filteredChildCare.latitude,
              ],
            },
            properties: {
              uuid: filteredChildCare.uuid,
              name: filteredChildCare.name,
              type: filteredChildCare.type,
              address: filteredChildCare.address,
              city: filteredChildCare.city,
              province: filteredChildCare.province,
              postalCode: filteredChildCare.postalCode,
              phoneNumber: filteredChildCare.phoneNumber,
              capacity: filteredChildCare.capacity,
              website: filteredChildCare.website,
              rating:
                filteredChildCare.rating !== null
                  ? filteredChildCare.rating.toFixed(1)
                  : null,
              userRatingsTotal: filteredChildCare.userRatingsTotal,
            },
          })),
        },
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 30,
      });

      map.addSource("childCaresInteraction", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: filteredChildCares.map((filteredChildCare) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                filteredChildCare.longitude,
                filteredChildCare.latitude,
              ],
            },
            properties: {
              uuid: filteredChildCare.uuid,
              name: filteredChildCare.name,
              type: filteredChildCare.type,
              address: filteredChildCare.address,
              city: filteredChildCare.city,
              province: filteredChildCare.province,
              postalCode: filteredChildCare.postalCode,
              phoneNumber: filteredChildCare.phoneNumber,
              capacity: filteredChildCare.capacity,
              website: filteredChildCare.website,
              rating: filteredChildCare.rating,
              userRatingsTotal: filteredChildCare.userRatingsTotal,
            },
          })),
        },
        cluster: false,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "childCares",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#b0ddf3",
            4,
            "#a4d4f4",
            10,
            "#98cbf5",
            20,
            "#8bc1f6",
            30,
            "#7fb8f7",
            40,
            "#73aff8",
            50,
            "#67a6f8",
            60,
            "#5b9df9",
            70,
            "#4f94fa",
            80,
            "#3681fc",
            90,
            "#428afb",
            100,
            "#2a78fd",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            10,
            10,
            11,
            20,
            12,
            30,
            14,
            40,
            17,
            50,
            19,
            60,
            21,
            70,
            23,
            80,
            26,
            90,
            28,
          ],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "childCares",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "childCares",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#004161",
          "circle-radius": 5,
          "circle-stroke-width": 5,
          "circle-stroke-color": "#b0ddf3",
        },
      });

      map.addLayer({
        id: "unclustered-label",
        type: "symbol",
        source: "childCares",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "text-field": [
            "case",
            ["has", "name"],
            [
              "concat",
              [
                "case",
                ["all", ["has", "rating"], ["!=", ["get", "rating"], null]],
                ["concat", "❤️", ["get", "rating"], " • "],
                "",
              ],
              ["get", "name"],
            ],
            "",
          ],
          "text-variable-anchor": ["left"],
          "text-radial-offset": 1.5,
          "text-justify": "auto",
          "text-size": 10,
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#000000", // Label text color
          "text-halo-color": "#FFF", // Transparent background color
          "text-halo-width": 1, // Halo width for better visibility
        },
      });

      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        map
          .getSource("childCares")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });

      map.on("click", "unclustered-label", (e) => {
        getUuidsClicked(e);
      });

      map.on("click", "unclustered-point", (e) => {
        getUuidsClicked(e);
      });

      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mouseenter", "unclustered-label", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "unclustered-label", () => {
        map.getCanvas().style.cursor = "";
      });

      getCardData();

      map.on("zoom", getCardData);
      map.on("moveend", getCardData);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove(); // Clean up when the component unmounts
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const map = mapRef.current;
      if (
        !map.getLayer(`unclustered-point-${uuidHovered}`) &&
        uuidHovered !== null &&
        !uuidsClicked.some((uuidClicked) => {
          uuidHovered === uuidClicked;
        })
      ) {
        // console.log(uuidHovered);
        map.addLayer({
          id: `unclustered-point-${uuidHovered}`,
          type: "circle",
          source: "childCaresInteraction",
          filter: ["==", "uuid", uuidHovered],
          paint: {
            "circle-color": "#004161",
            "circle-radius": 7,
            "circle-stroke-width": 7,
            "circle-stroke-color": "#009CE1",
          },
        });
        // Get the current map style
        const style = map.getStyle();
        // Retrieve the layers from the style
        const layers = style.layers;
        // Now you have an array of layers
        // console.log(layers);
        layers.forEach((layer) => {
          if (
            layer.id.startsWith("unclustered-point-") &&
            layer.id !== `unclustered-point-${uuidHovered}` &&
            !uuidsClicked.some((uuidClicked)=>{layer.id === `unclustered-point-${uuidClicked}`})
          ) {
            map.removeLayer(layer.id);
          }
        });
      }
    }
  }, [isLoading, uuidHovered]);

  useEffect(() => {
    if (!isLoading) {
      const map = mapRef.current;

      filteredChildCares = getFilteredChildCares(childCares);

      // Get the current map style
      const style = map.getStyle();
      // Retrieve the layers from the style
      const layers = style.layers;
      // Now you have an array of layers
      // console.log(layers);
      layers.forEach((layer) => {
        if (
          layer.id === `unclustered-point` ||
          layer.id === `clusters` ||
          layer.id === `cluster-count` ||
          layer.id === `unclustered-label`
        ) {
          map.removeLayer(layer.id);
        }
      });

      map.removeSource("childCares");

      map.addSource("childCares", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: filteredChildCares.map((filteredChildCare) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                filteredChildCare.longitude,
                filteredChildCare.latitude,
              ],
            },
            properties: {
              uuid: filteredChildCare.uuid,
              name: filteredChildCare.name,
              type: filteredChildCare.type,
              address: filteredChildCare.address,
              city: filteredChildCare.city,
              province: filteredChildCare.province,
              postalCode: filteredChildCare.postalCode,
              phoneNumber: filteredChildCare.phoneNumber,
              capacity: filteredChildCare.capacity,
              website: filteredChildCare.website,
              rating:
                filteredChildCare.rating !== null
                  ? filteredChildCare.rating.toFixed(1)
                  : null,
              userRatingsTotal: filteredChildCare.userRatingsTotal,
            },
          })),
        },
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 30,
      });
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "childCares",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#b0ddf3",
            4,
            "#a4d4f4",
            10,
            "#98cbf5",
            20,
            "#8bc1f6",
            30,
            "#7fb8f7",
            40,
            "#73aff8",
            50,
            "#67a6f8",
            60,
            "#5b9df9",
            70,
            "#4f94fa",
            80,
            "#3681fc",
            90,
            "#428afb",
            100,
            "#2a78fd",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            10,
            10,
            11,
            20,
            12,
            30,
            14,
            40,
            17,
            50,
            19,
            60,
            21,
            70,
            23,
            80,
            26,
            90,
            28,
          ],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "childCares",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "childCares",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#004161",
          "circle-radius": 5,
          "circle-stroke-width": 5,
          "circle-stroke-color": "#b0ddf3",
        },
      });

      map.addLayer({
        id: "unclustered-label",
        type: "symbol",
        source: "childCares",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "text-field": [
            "case",
            ["has", "name"],
            [
              "concat",
              [
                "case",
                ["all", ["has", "rating"], ["!=", ["get", "rating"], null]],
                ["concat", "❤️", ["get", "rating"], " • "],
                "",
              ],
              ["get", "name"],
            ],
            "",
          ],
          "text-variable-anchor": ["left"],
          "text-radial-offset": 1.5,
          "text-justify": "auto",
          "text-size": 9,
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#004161", // Label text color
          "text-halo-color": "#FFF", // Transparent background color
          "text-halo-width": 1, // Halo width for better visibility
        },
      });
      getCardData();
    }
  }, [
    ratingValue,
    capacityValue,
    selectedChips,
    includeWoReviews,
    searchInput,
  ]);

  useEffect(() => {
    if (!isLoading && uuidShowOnMap !== null) {
      const map = mapRef.current;
      const childCareShowOnMap = childCares.find(
        (item) => uuidShowOnMap === item.uuid
      );

      map.easeTo({
        center: [childCareShowOnMap.longitude, childCareShowOnMap.latitude],
        zoom: 16,
      });
    }
  }, [uuidShowOnMap]);

  // Function to calculate the Haversine distance between two points
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  }

  const getFilteredChildCares = (arr) => {
    const filteredChildCares = arr.filter((item) => {
      return (
        item.capacity >= capacityValue[0] &&
        item.capacity <= capacityValue[1] &&
        ((item.rating >= ratingValue[0] && item.rating !== null) ||
          (includeWoReviews && item.rating === null)) &&
        item.rating <= ratingValue[1] &&
        ((selectedChips[0] && item.type === programTypes[0]) ||
          (selectedChips[1] && item.type === programTypes[1]) ||
          (selectedChips[2] && item.type === programTypes[2]) ||
          (selectedChips[3] && item.type === programTypes[3]) ||
          (selectedChips[4] && item.type === programTypes[4]) ||
          (!selectedChips[0] &&
            !selectedChips[1] &&
            !selectedChips[2] &&
            !selectedChips[3] &&
            !selectedChips[4])) &&
        (item.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.type?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.address?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.city?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.postalCode?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.phoneNumber?.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.website?.toLowerCase().includes(searchInput.toLowerCase()))
      );
    });
    return filteredChildCares;
  };

  const getCardData = () => {
    const map = mapRef.current;
    if (!map) return; // Ensure map is initialized

    setUuidShowOnMap(null);
    setUuidsClicked([]);

    const bounds = map.getBounds();
    const currentCenter = map.getCenter();

    // Use the zoom level and bounds to determine which data to display

    const cardData = childCares.filter((item) => {
      return (
        item.longitude >= bounds.getWest() &&
        item.longitude <= bounds.getEast() &&
        item.latitude >= bounds.getSouth() &&
        item.latitude <= bounds.getNorth()
      );
    });

    // Sort cardData by distance to the center (ascending order)
    cardData.sort((a, b) => {
      const distanceA = calculateDistance(
        currentCenter.lat,
        currentCenter.lng,
        a.latitude,
        a.longitude
      );
      const distanceB = calculateDistance(
        currentCenter.lat,
        currentCenter.lng,
        b.latitude,
        b.longitude
      );

      return distanceA - distanceB;
    });

    // Get the current map style
    const style = map.getStyle();
    // Retrieve the layers from the style
    const layers = style.layers;
    // Now you have an array of layers
    // console.log(layers);
    layers.forEach((layer) => {
      if (layer.id.startsWith("unclustered-point-")) {
        map.removeLayer(layer.id);
      }
    });
    setCardData(cardData);
    return cardData;
  };

  const getUuidsClicked = (e) => {
    const map = mapRef.current;
    if (!map) return; // Ensure map is initialized

    const uuid = e.features[0].properties.uuid;

    const childCareClicked = childCares.find((item) => uuid === item.uuid);

    const clickedChildCareUuids = childCares
      .filter((item) => {
        return (
          childCareClicked.longitude === item.longitude &&
          childCareClicked.latitude === item.latitude
        );
      })
      .map((item) => item.uuid);

    setUuidsClicked(clickedChildCareUuids);

    if (!map.getLayer(`unclustered-point-${clickedChildCareUuids[0]}`)) {
      map.addLayer({
        id: `unclustered-point-${clickedChildCareUuids[0]}`,
        type: "circle",
        source: "childCaresInteraction",
        filter: ["==", "uuid", clickedChildCareUuids[0]],
        paint: {
          "circle-color": "#F8DB6F",
          "circle-radius": 7,
          "circle-stroke-width": 7,
          "circle-stroke-color": "#009CE1",
        },
      });

      // Get the current map style
      const style = map.getStyle();
      // Retrieve the layers from the style
      const layers = style.layers;
      // Now you have an array of layers
      // console.log(layers);
      layers.forEach((layer) => {
        if (
          layer.id.startsWith("unclustered-point-") &&
          layer.id !== `unclustered-point-${clickedChildCareUuids[0]}`
        ) {
          map.removeLayer(layer.id);
        }
      });
    }

    // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    // }

    // new mapboxgl.Popup()
    //   .setLngLat(coordinates)
    //   .setHTML(`Name: ${name}<br>Type: ${type}`)
    //   .addTo(map);
  };

  const loaded = () => <div id="map" className="map-container"></div>;

  const loading = () => <div id="map" className="map-container"></div>;
  return isLoading ? loading() : loaded();
};

export default Map;
