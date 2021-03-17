import React from 'react'
import styles from './CountryPage.module.scss'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ReactPlayer from 'react-player/youtube'
import './Gallery.scss'
//import image from '../media/america.jpeg'
//import ImageGallery from 'react-image-gallery'
//import { MapContainer, TileLayer, Marker } from 'react-leaflet'

const CountryPage = ({match}) => {
    //const countryName = match.params.country
    
    // const images = [
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     },
    //     {
    //         original: image,
    //         thumbnail: image,
    //     }        
    // ]

    return(
        <div className="container-xxl d-flex flex-column h-100">
            <Header displaySearch={false}/>

            <main className="flex-shrink-0" style={{marginTop:"85px"}}>
                <div className="container-fluid">
                    <div className={styles.playerBox}>
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=zKaH1dCooQg"
                            controls={true}
                            width='100%'
                            height='100%'
                        />
                    </div>

                   
                    {/* <ImageGallery
                        items={images}
                        slideInterval={1000}
                        
                    />
                    
                    <div className={styles.mapBox} id="mapid">
                    <MapContainer 
                        center={[51.505, -0.09]}
                        zoom={5}
                        scrollWheelZoom={true}
                        style={{width:"100%", height:"100%"}}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                        />
                        
                        <Marker position={[51.505, -0.09]}/>
                            
                        



                        </MapContainer>
                    </div> */}




                </div>
            </main>

            <Footer/>
        </div>
    )
}

export default CountryPage
