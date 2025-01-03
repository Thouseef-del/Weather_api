// src/GoogleMap.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const GoogleMapComponent = () => {
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    // Auto-generate API key (replace with your actual key)
    const apiKey = 'YOUR_AUTO_GENERATED_API_KEY_HERE';

    // Function to center map on current location
    const centerMapOnCurrentLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          mapRef?.panTo({ lat: latitude, lng: longitude });
        });
      }
    };

    return () => {
      // Clean up geolocation listener when component unmounts
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch(navigator.geolocation.watchID);
      }
    };
  }, [mapRef]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        onLoad={(map) => setMapRef(map)}
      />
    </LoadScript>
  );
};

export default GoogleMapComponent;
