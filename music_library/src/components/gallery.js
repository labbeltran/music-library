// import { useContext } from 'react'
// import { DataContext } from '../context/DataContext'
import AlbumView from './AlbumView'
import ArtistView from './ArtistView'
import GalleryItem from './gallery-item'

function Gallery(props){

    const display = props.data.map((item, index) => {
        return (
            <GalleryItem item={item} key={index} />
        )
    })

    return (
        <div>
            {display}
        </div>
    )
}

export default Gallery