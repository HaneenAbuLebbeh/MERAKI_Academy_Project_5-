import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ coordinates }) => {
    const mapContainerStyle = {
        height: "400px",
        width: "100%"
    };

    const [center, setCenter] = useState({
        lat: coordinates.latitude || 0, 
        lng: coordinates.longitude || 0
    });

    // Update map center when coordinates change 
    useEffect(() => {
        if (coordinates.latitude && coordinates.longitude) {
            setCenter({
                lat: coordinates.latitude,
                lng: coordinates.longitude
            });
        }
    }, [coordinates]); // Depends on the change of coordinates

    return (
        <LoadScript googleMapsApiKey="AIzaSyAqnXfvATE_hd81TEWVhJ2DlwNgtzyWJgA"> 
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
            >
                {coordinates.latitude && coordinates.longitude && (
                    <Marker position={center} />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
