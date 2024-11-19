import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ latitude, longitude }) => {
    const mapContainerStyle = {
        height: "400px",
        width: "100%"
    };

    const [center, setCenter] = useState({
        lat: latitude || 0, 
        lng: longitude || 0
    });

    // Update map center when coordinates change 
    useEffect(() => {
        if (latitude && longitude) {
            setCenter({
                lat: latitude,
                lng: longitude
            });
        }
    }, [latitude, longitude]); // Depends on the change of coordinates

    return (
        <LoadScript googleMapsApiKey="AIzaSyAqnXfvATE_hd81TEWVhJ2DlwNgtzyWJgA"> 
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
            >
                {latitude && longitude && (
                    <Marker position={center} />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
