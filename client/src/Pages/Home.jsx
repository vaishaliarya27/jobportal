import React from 'react';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Joblisting from '../components/Joblisting.jsx';

import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Joblisting />
      <AppDownload/>
      <Footer />
    </div>
  );
};

export default Home;
