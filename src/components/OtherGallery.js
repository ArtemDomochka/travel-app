import React from 'react'
import styles from './OtherGallery.module.scss'
import Gallery from 'react-grid-gallery';

const OtherGallery = props => {

    const IMAGES = []
    props.sights.forEach((sight) => {
            IMAGES.push({
                src: sight.imgPath,
                thumbnail: sight.imgPath,
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                tags: [{value: sight.name}],
                caption: sight.name + ". " + sight.descrition
            })
    });

    
    return(
        <div className={styles.box}>
            <Gallery images={IMAGES}/>
        </div>
    )
}

export default OtherGallery