import {useEffect} from 'react'
import {useLeafletContext} from '@react-leaflet/core'
import L from 'leaflet'
import 'leaflet-pegman'



const PegmanControl = () => {
    const context = useLeafletContext()
    const pegmanControl = new L.Control.Pegman({
        position: 'topright', // position of control inside the map
        theme: "leaflet-pegman-v3-small", // or "leaflet-pegman-v3-default"
      });

      useEffect(()=>{
        const container = context.layerContainer || context.map
        container.addControl(pegmanControl)

        return ()=>{
            container.removeControl(pegmanControl)
        }
      })

      return null
}

export default PegmanControl
