import React from 'react'
import { useEffect, useState } from 'react'
import styles from './CustomMap.module.scss'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen' //por9dok importov imeet zna4enie
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css' 

const CustomMap = props => {

    const [geoJSON, setGeoJSON] = useState(null)
    
    useEffect(()=>{
        const fetchJSON = () => {
            fetch(
                `https://raw.githubusercontent.com/inmagik/world-countries/master/countries/${props.atr}.geojson`
            )
            .then(resp=>resp.json())
            .then(data=>setGeoJSON(data))
        }
    
        fetchJSON()
    },[props.atr])

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
                // center={[51.505, -0.09]}
                center={[props.coords[0], props.coords[1]]}
                zoom={6}
                //scrollWheelZoom={true}
                style={{width:"100%", height:"100%"}}
                fullscreenControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                
                <Marker
                    position={[props.coords[0], props.coords[1]]}
                >
                    <Popup>
                        {props.capital}
                    </Popup>
                </Marker>

                {geoJSON && <GeoJSON style={setStyle} data={geoJSON}/>}

            </MapContainer>
        </div>
    )
}

export default CustomMap