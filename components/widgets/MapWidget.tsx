'use client';

import { MapPin, Navigation2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import Map, { Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import { useEffect, useMemo, useState } from 'react';

interface MapWidgetProps {
  isDark: boolean;
}

export function MapWidget({ isDark }: MapWidgetProps) {
  const homeCoords: [number, number] = [-121.8847, 37.3362];

  const places = [
    { id: "coffee", name: "Philz Coffee", coords: [-121.8885, 37.3371], icon: "☕" },
    { id: "study", name: "San Jose State University", coords: [-121.8819, 37.3352], icon: "📘" },
    { id: "friend", name: "The Grad", coords: [-121.882, 37.334], icon: "🏡" },
  ];

  // Memoize the route to prevent re-creation on every render
  const route = useMemo(() => {
    return [homeCoords, ...places.map((p) => p.coords), homeCoords];
  }, [homeCoords, places]);

  // State for animated route
  const [animatedRoute, setAnimatedRoute] = useState<GeoJSON.FeatureCollection<GeoJSON.Geometry>>({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    const fullLine = turf.lineString(route);
    const totalDistance = turf.length(fullLine, { units: 'kilometers' });
    const segmentCount = 500; // Number of segments for smooth animation
    const stepDistance = totalDistance / segmentCount;

    let currentDistance = 0;
    const animatedCoords: number[][] = [route[0]];

    const interval = setInterval(() => {
      currentDistance += stepDistance;
      if (currentDistance > totalDistance) {
        clearInterval(interval); // End animation
        return;
      }

      // Get the next point along the line
      const nextPoint = turf.along(fullLine, currentDistance, { units: 'kilometers' }).geometry
        .coordinates;

      animatedCoords.push(nextPoint);
      setAnimatedRoute({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: animatedCoords,
            },
            properties: null
          },
        ],
      });
    }, 50); // Adjust interval speed for smooth animation

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [route]);

  return (
    <Card
      className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-medium">Personal Atlas</span>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Navigation2 className="w-4 h-4 text-primary" />
          </motion.div>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Map
            initialViewState={{
              latitude: 37.3362,
              longitude: -121.8847,
              zoom: 14,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken="pk.eyJ1IjoiYXRpc2hheWphaW44MTkyMjYxIiwiYSI6ImNtNHZ2cnZnOTA4YjQyanM3M2J2djJyMGQifQ.IxnpVGde2QgtMig03b9Jnw"
          >
            {/* Home Marker */}
            <Marker longitude={homeCoords[0]} latitude={homeCoords[1]}>
              <div className="text-2xl">🏠</div>
            </Marker>

            {/* Place Markers */}
            {places.map((place) => (
              <Marker key={place.id} longitude={place.coords[0]} latitude={place.coords[1]}>
                <div className="text-2xl cursor-pointer">{place.icon}</div>
              </Marker>
            ))}

            {/* Animated Route */}
            <Source id="animated-route" type="geojson" data={animatedRoute}>
              <Layer
                id="animated-line"
                type="line"
                paint={{
                  "line-color": "#39ff14", // Glowing neon green
                  "line-width": 4,
                  "line-opacity": 0.8,
                }}
              />
            </Source>
          </Map>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <p className="text-sm">San Jose, CA</p>
        </div>
      </CardContent>
    </Card>
  );
}
