import {useRef, useState, useEffect, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Gallery from './components/gallery';
import Searchbar from './components/searchbar';
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { DataContext } from './components/context/DataContext'
import { SearchContext } from './components/context/SearchContext'
import Spinner from './components/Spinner'


const App = () => {
  let searchInput = useRef('')
  let [search, setSearch] = useState('')
  let [data, setData] = useState(null)
  let [message, setMessage] = useState('Search for Music!')
  const API_URL = 'https://itunes.apple.com/search?term='

    useEffect(() => {
        if(search) {
            const fetchData = async () => {
                document.title = `${search} Music`
                const response = await fetch(API_URL + search)
                const resData = await response.json()
                if (resData.results.length > 0) {
                    return setData(resData.results)
                } else {
                    return setMessage('Not Found')
                }
            }
            fetchData()
        }
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
  }

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
        <Route exact path={'/'}>
          <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
            <Searchbar />
          </SearchContext.Provider>
            <DataContext.Provider value={data}>
              {renderGallery()}
            </DataContext.Provider>
        </Route>
        <Route path="/album/:id">
          <AlbumView />
        </Route>
        <Route path="/artist/:id">
          <ArtistView />
        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

