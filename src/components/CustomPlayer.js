import React from 'react'
import styles from './CustomPlayer.module.scss'
import ReactPlayer from 'react-player/youtube'

const CustomPlayer = props => {

    return(
        <div className={styles.playerBox}>
            <ReactPlayer
                url={props.videoPath}
                controls={true}
                width='100%'
                height='100%'
            />
        </div>
    )
}

export default CustomPlayer