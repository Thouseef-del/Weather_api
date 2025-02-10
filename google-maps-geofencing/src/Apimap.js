import React, { useEffect, useRef, useState } from 'react';  

const API_KEY = "AIzaSyBOY_Z5DkjER404Rz5D-HS_X8uRN2SMYXA"; // Replace with your API key  

const Apimap = () => {  
    const mapRef = useRef(null);  
    const [map, setMap] = useState(null);  
    const [userMarker, setUserMarker] = useState(null);  
    const [geofence, setGeofence] = useState(null);  
    const [selectedPoints, setSelectedPoints] = useState([]);  

    useEffect(() => {  
        const initMap = () => {  
            const mapCenter = { lat: 11.0168, lng: 76.9558 }; // Coimbatore, Tamil Nadu  
            const googleMap = new window.google.maps.Map(mapRef.current, {  
                center: mapCenter,  
                zoom: 12,  
                styles: [  
                    { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },  
                    { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },  
                    { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },  
                ],  
            });  
            setMap(googleMap);  

            // Add click listener to the map for selecting points  
            googleMap.addListener('click', (event) => {  
                setSelectedPoints(prev => [...prev, event.latLng]);  
                if (selectedPoints.length >= 2) {  
                    drawGeofence(googleMap);  
                }  
            });  

            // Get user's location  
            navigator.geolocation.getCurrentPosition(position => {  
                const location = {  
                    lat: position.coords.latitude,  
                    lng: position.coords.longitude,  
                };  

                if (userMarker) userMarker.setMap(null);  

                const marker = new window.google.maps.Marker({  
                    position: location,  
                    map: googleMap,  
                    title: "Your Location",  
                    icon: {  
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",  
                    },  
                });  

                setUserMarker(marker);  
                googleMap.panTo(location);  
            }, () => {  
                alert("Unable to retrieve your location. Please enable location access.");  
            });  
        };  

        const loadMapScript = () => {  
            const script = document.createElement("script");  
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry`;  
            script.async = true;  
            script.onload = initMap;  
            document.head.appendChild(script);  
        };  

        loadMapScript();  
    }, [selectedPoints]);  

    const drawGeofence = (googleMap) => {  
        if (geofence) geofence.setMap(null);  

        if (selectedPoints.length >= 2) {  
            const newGeofence = new window.google.maps.Polygon({  
                paths: selectedPoints,  
                strokeColor: "#FF5722",  
                strokeOpacity: 0.8,  
                strokeWeight: 2,  
                fillColor: "#FF5722",  
                fillOpacity: 0.4,  
            });  

            newGeofence.setMap(googleMap);  
            setGeofence(newGeofence);  

            window.google.maps.event.addListener(newGeofence, "click", () => {  
                alert("Geofence clicked!");  
            });  

            checkUserInGeofence();  
        } else {  
            alert("Select at least 2 points to draw a geofence.");  
        }  
    };  

    const checkUserInGeofence = () => {  
        if (userMarker && geofence) {  
            const userPosition = userMarker.getPosition();  
            const isInside = window.google.maps.geometry.poly.containsLocation(userPosition, geofence);  

            if (isInside) {  
                alert("You are inside the geofence!");  
            } else {  
                alert("You are outside the geofence!");  
            }  
        }  
    };  

    return (  
        <div>  
            <h1 style={{ textAlign: 'center', color: '#00C853' }}>Google Maps Geofencing</h1>  
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>  
                <button onClick={() => setUserMarker(null)} style={buttonStyle}>Set My Location</button>  
                <button onClick={() => drawGeofence(map)} style={buttonStyle}>Draw Geofence</button>  
            </div>  
            <div ref={mapRef} style={mapContainerStyle}></div>  
        </div>  
    );  
};  

const buttonStyle = {  
    margin: '0 10px',  
    padding: '10px 20px',  
    fontSize: '16px',  
    cursor: 'pointer',  
    border: 'none',  
    borderRadius: '5px',  
    backgroundColor: '#1E88E5',  
    color: 'white',  
    transition: 'background-color 0.3s',  
};  

const mapContainerStyle = {  
    height: '80vh',  
    width: '80%',  
    margin: '20px auto',  
    border: '2px solid #424242',  
    borderRadius: '10px',  
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',  
};  

export default Apimap;