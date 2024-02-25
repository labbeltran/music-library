import {useRef, useState, useEffect, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Gallery from './components/gallery';
import Searchbar from './components/searchbar';
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './components/context/DataContext'
import { SearchContext } from './components/context/SearchContext'
import Spinner from './components/Spinner'


function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
  }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  return (
    <div className="App">
      <Searchbar handleSearch={handleSearch} />
      {message}
      <Gallery data={data} />
    </div>
  );
}

export default App;