'use client';

import { MapPin, Navigation2, MapPinHouse, House, Coffee, BookA } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import { useEffect, useMemo, useState } from 'react';

interface MapWidgetProps {
  isDark: boolean;
}

export function MapWidget({ isDark }: MapWidgetProps) {
  const homeCoords1: [number, number] = [-121.8847, 37.3362]; // Home1
  const coffeeCoords: [number, number] = [-121.8885, 37.3371]; // Coffee Place
  const collegeCoords: [number, number] = [-121.8819, 37.3352]; // College
  const homeCoords2: [number, number] = [-121.8867, 37.334]; // Home2

  const route = useMemo(() => {
    return [
      homeCoords1,
      coffeeCoords,
      collegeCoords,
      homeCoords2,
      homeCoords1, // Loop back to Home1
    ];
  }, [homeCoords1, coffeeCoords, collegeCoords, homeCoords2]);

  const [animatedPoint, setAnimatedPoint] = useState<[number, number]>(route[0]); // Current animated point

  useEffect(() => {
    const fullLine = turf.lineString(route);
    const totalDistance = turf.length(fullLine, { units: 'kilometers' });
    const animationSpeed = 0.01; // Adjust this for faster/slower motion
    let currentDistance = 0;

    const interval = setInterval(() => {
      currentDistance += animationSpeed;

      if (currentDistance > totalDistance) {
        currentDistance = 0; // Reset for looped animation
      }

      const nextPoint = turf.along(fullLine, currentDistance, { units: 'kilometers' }).geometry
        .coordinates as [number, number];

      setAnimatedPoint(nextPoint);
    }, 50); // Adjust interval speed for smooth animation

    return () => clearInterval(interval);
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
            {/* Home1 Marker */}
            <Marker longitude={homeCoords1[0]} latitude={homeCoords1[1]}>
              <MapPinHouse className="text-blue-500 w-6 h-6" />
            </Marker>

            {/* Coffee Place Marker */}
            <Marker longitude={coffeeCoords[0]} latitude={coffeeCoords[1]}>
              <Coffee className="text-blue-500 w-6 h-6" />
            </Marker>

            {/* College Marker */}
            <Marker longitude={collegeCoords[0]} latitude={collegeCoords[1]}>
              <BookA className="text-blue-500 w-6 h-6" />
            </Marker>

            {/* Home2 Marker */}
            <Marker longitude={homeCoords2[0]} latitude={homeCoords2[1]}>
              <House className="text-blue-500 w-6 h-6" />
            </Marker>

            {/* Animated Moving Icon */}
            <Marker longitude={animatedPoint[0]} latitude={animatedPoint[1]}>
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <MapPinHouse className="text-blue-500 w-6 h-6" />
              </motion.div>
            </Marker>
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
