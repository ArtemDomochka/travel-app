import React from 'react'
//import styles from '../components/CustomGallery.module.scss'
import image from '../media/america.jpeg'
import ImageGallery from 'react-image-gallery'
import './Gallery.scss'

const CustomGallery = props => {

    const images = [
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        },
        {
            original: image,
            thumbnail: image,
        }        
    ]

    return(
        <ImageGallery
            items={images}
            slideInterval={1000}
        />
    )
}

export default CustomGallery