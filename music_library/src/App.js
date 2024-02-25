import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Gallery from './components/gallery';
import Searchbar from './components/searchbar';
import {AlbumView} from './components/AlbumView'
import {ArtistView} from './components/ArtistView'
import {Fragment} from 'react';

function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music')
  let [data, setData] = useState([])
  

  const API_URL= 'https://itunes.apple.com/search?term='

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

  return (
    <div className="App">
    {message}
       <Router>
        <Routes>
          <Route path="/" element={
            <Fragment>
            <Searchbar handleSearch= {handleSearch}/>
            <Gallery data={data}/>
          </Fragment>
          }/>
          <Route path="/album/:id" element={<AlbumView/>}/>
          <Route path="/artist/:id" element={<ArtistView/>}/>
          
        </Routes>
       </Router>
    </div>
  );
}

export default App;

import {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/images/elm-new-logo.jpg'


//Components//
import Home from './components/Home.js';
import AboutUs from './components/AboutUs.js';
import Services from './components/Services.js';
import Referral from './components/Referral.js';
import ContactUs from './components/ContactUs.js';
import Ils from './components/Ils.js';
import Sls from './components/Sls.js';
import Social from './components/Social.js';

//Router DOM//
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'



function App() {

  const elmLogo = logo;

  let aboutUsPara= [
    `Experiencing Learning Moments (ELM) Services, LLC. provides the necessary support to enable individuals with intellectual and/or developmental disabilities (I/DD) to lead enriched lives by facilitating communal participation and social integration. ELM Services operates on a belief that no person should have to work in a setting which is segregated due to the nature or severity of their disability. ELM Services strives to accomplish this endeavor through the provision and implementation of an individualized, person-centered support that empowers our clients to integrate into their local communities and learn how to socialize with peers and other individuals within the community while forming and enjoying natural relationships with people other than paid providers of support services.`,  
    `The Independent Living Skills (ILS) program, Supported Living Services (SLS) program, and Community Integration Training Program (CITP) are designed as a activities of daily living (ADL's), Adaptive Skills Training (AST), Community Integration Skills Training Program (CITP) and social skills training program to recognize, develop, and build the necessary skillset while living at home with their circle of support, moving out and living independently, and participating in their community-all at the level at which the client chooses and/ or is outlined in their person-centered plan.`,
    `ELM Services generally starts the process by evaluating the client and their interests, evaluating what skills need to be built and developed to tailor services to their individual needs. Once done, ELM Services identify local community sites that are of interest to the individual and help facilitate the fostering of skills needed to facilitate community integration and socialization. Throughout the training program, ELM Services ensures that clients are able to participate at their own speed while meeting their person-centered outcomes and any personal goals they may have.` 
  ];

  return (
  
    <div style={{backgroundColor: '', display: 'block'}}>
      <div className="logo-img">
    <img style={{width: '10vw', align:'center' }} src={elmLogo} alt="ELM logo"/>
    </div>
    
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item"><Link to="/" className="nav-link active" aria-current="page">Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link active" aria-current="page">About Us</Link></li>
            <li className="nav-item dropdown"><Link to="/services" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-current="page">Services</Link></li>
              <ul className="dropdown-menu">
                <li><Link to="/services/ils" className="dropdown-item">ILS</Link></li>
                <li><Link to="/services/sls" className="dropdown-item">SLS</Link></li>
                <li><Link to="/services/social" className="dropdown-item">Socialization</Link></li>
              </ul>
            <li className="nav-item"><Link to="/referral" className="nav-link active" aria-current="page">Referral for Services</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link active" aria-current="page">Contact Us</Link></li>
          </ul>
          </div>
        </nav>

        <div className="route-dom">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs aboutUsPara={aboutUsPara} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/contact" element={<ContactUs />} />
            {/* <Route path="/services/ils" element={<Ils/>}/>
            <Route path="/services/sls" element={<Sls/>}/>
            <Route path="/services/social" element={<Social/>}/> */}
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
