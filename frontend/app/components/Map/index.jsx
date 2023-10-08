import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox styles
import "./Map.css"; // Create a CSS file for styling if needed

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // Replace with your Mapbox access token

const Map = ({ childCares, setCardData, clickedUuid, setClickedUuid, uuidHovered }) => {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-114.06481456601747, 51.030150021237255],
      zoom: 10,
    });

    const map = mapRef.current;

    // Filter out childCares with non-null latitudes and longitudes
    const validChildCares = childCares.filter(
      (childCare) => childCare.latitude !== null && childCare.longitude !== null
    );

    map.on("load", () => {
      setIsLoading(false);
      map.addSource("childCares", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: validChildCares.map((validChildCare) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [validChildCare.longitude, validChildCare.latitude],
            },
            properties: {
              uuid: validChildCare.uuid,
              name: validChildCare.name,
              type: validChildCare.type,
              address: validChildCare.address,
              city: validChildCare.city,
              province: validChildCare.province,
              postalCode: validChildCare.postalCode,
              phoneNumber: validChildCare.phoneNumber,
              capacity: validChildCare.capacity,
              website: validChildCare.website,
              googleRating: validChildCare.googleRating,
            },
          })),
        },
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 30,
      });

      map.addSource("childCaresHover", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: validChildCares.map((validChildCare) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [validChildCare.longitude, validChildCare.latitude],
            },
            properties: {
              uuid: validChildCare.uuid,
              name: validChildCare.name,
              type: validChildCare.type,
              address: validChildCare.address,
              city: validChildCare.city,
              province: validChildCare.province,
              postalCode: validChildCare.postalCode,
              phoneNumber: validChildCare.phoneNumber,
              capacity: validChildCare.capacity,
              website: validChildCare.website,
              googleRating: validChildCare.googleRating,
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
          "circle-radius": 10,
          // "circle-stroke-width": 2,
          // "circle-stroke-color": "#FF0000",
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

      map.on("click", "unclustered-point", (e) => {
        // const coordinates = e.features[0].geometry.coordinates.slice();
        // const name = capitalizeEachWord(e.features[0].properties.name);
        // const type = e.features[0].properties.type.toLowerCase();
        const uuid = e.features[0].properties.uuid;

        const clickedChildCareUuid = childCares.find((childCare) => {
          return uuid === childCare.uuid;
        }).uuid;
        getCardData();
        setClickedUuid(clickedChildCareUuid);

        if (!map.getLayer(`unclustered-point-${uuid}`)) {
          map.addLayer({
            id: `unclustered-point-${uuid}`,
            type: "circle",
            source: "childCares",
            filter: ["==", "uuid", uuid],
            paint: {
              "circle-color": "#F8DB6F",
              "circle-radius": 12,
              "circle-stroke-width": 2,
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
              layer.id !== `unclustered-point-${uuid}`
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

      getCardData();
      map.on("zoom", getCardData);
      map.on("moveend", getCardData);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    const getCardData = () => {
      if (!map) return; // Ensure map is initialized
      const bounds = map.getBounds();
      const currentCenter = map.getCenter();

      // Use the zoom level and bounds to determine which data to display
      const cardData = childCares.filter((childCare) => {
        // Check if the childCare's coordinates are within the current bounds
        const coordinates = [childCare.longitude, childCare.latitude];
        return (
          coordinates[0] >= bounds.getWest() &&
          coordinates[0] <= bounds.getEast() &&
          coordinates[1] >= bounds.getSouth() &&
          coordinates[1] <= bounds.getNorth()
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

      setClickedUuid(null);
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

    return () => map.remove(); // Clean up when the component unmounts
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const map = mapRef.current;
      if (
        !map.getLayer(`unclustered-point-${uuidHovered}`) &&
        uuidHovered !== null
      ) {
        // console.log(uuidHovered);
        map.addLayer({
          id: `unclustered-point-${uuidHovered}`,
          type: "circle",
          source: "childCaresHover",
          filter: ["==", "uuid", uuidHovered],
          paint: {
            "circle-color": "#004161",
            "circle-radius": 12,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#009CE1",
          },
        });
      }
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
          layer.id !== `unclustered-point-${clickedUuid}`
        ) {
          map.removeLayer(layer.id);
        }
      });
    }
  }, [isLoading, uuidHovered]);

  // const capitalizeEachWord = (str) => {
  //   return str
  //     .split(" ") // Split the string into an array of words
  //     .map((word) => {
  //       // Capitalize the first letter and convert the rest to lowercase for each word
  //       return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  //     })
  //     .join(" "); // Join the words back into a single string with spaces
  // };

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

  const loaded = () => {
    return <div id="map" className="map-container"></div>;
  };

  const loading = () => <div id="map" className="map-container"></div>;
  return isLoading ? loading() : loaded();
};

export default Map;
