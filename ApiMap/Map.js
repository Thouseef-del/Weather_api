import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import './App.css';

const API_KEY = "AIzaSyBOY_Z5DkjER404Rz5D-HS_X8uRN2SMYXA";
const mapCenter = { lat: 11.0168, lng: 76.9558 }; // Coimbatore, Tamil Nadu

const Map = () => {
  const [markers, setMarkers] = useState([]); // Stores marker data
  const [selectedMarker, setSelectedMarker] = useState(null); // Selected marker for InfoWindow

  // Fetch all markers (READ operation)
  const fetchMarkers = async () => {
    try {
      const response = await axios.get('/api/markers');
      setMarkers(response.data);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  // Add a new marker (CREATE operation)
  const addMarker = async (location) => {
    try {
      const response = await axios.post('/api/markers', { location });
      setMarkers([...markers, response.data]);
    } catch (error) {
      console.error('Error adding marker:', error);
    }
  };

  // Delete a marker (DELETE operation)
  const deleteMarker = async (id) => {
    try {
      await axios.delete(`/api/markers/${id}`);
      setMarkers(markers.filter((marker) => marker.id !== id));
    } catch (error) {
      console.error('Error deleting marker:', error);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  return (
    <div className="App">
      <h1>Google Maps CRUD Operations</h1>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerClassName="map-container"
          center={mapCenter}
          zoom={12}
          onClick={(event) =>
            addMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() })
          }
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.location}
              onClick={() => setSelectedMarker(marker)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.location}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h4>Marker Details</h4>
                <button onClick={() => deleteMarker(selectedMarker.id)}>Delete</button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;

