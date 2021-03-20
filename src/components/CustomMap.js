import React from 'react'
import { useEffect, useState } from 'react'
import styles from './CustomMap.module.scss'
import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen' //por9dok importov imeet zna4enie
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css' 

const CustomMap = props => {

    const [geoJSON, setGeoJSON] = useState(null)
    
    const fetchJSON = () => {
        fetch(
            "https://raw.githubusercontent.com/inmagik/world-countries/master/countries/GBR.geojson"
        )
        .then(resp=>resp.json())
        .then(data=>setGeoJSON(data))
    }

    useEffect(()=>{
        fetchJSON()
    },[])

    const setStyle = (feature) => {
        return{
            fillColor: "yellow",
            fillOpacity: 0.1,
            color: "red"
        }
    }

    return(
        <div className={styles.mapBox} id="mapid">
            <MapContainer 
                center={[51.505, -0.09]}
                zoom={5}
                scrollWheelZoom={true}
                style={{width:"100%", height:"100%"}}
                fullscreenControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                
                <Marker position={[51.505, -0.09]}/>

                {geoJSON && <GeoJSON style={setStyle} data={geoJSON}/>}

            </MapContainer>
        </div>
    )
}

export default CustomMap