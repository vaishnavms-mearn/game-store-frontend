import React from 'react'
import Banner from '../Components/Banner'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Discounts from '../Components/Discounts'
import Trending from '../Components/Trending'
import Free from '../Components/Free'
import HighRated from '../Components/HighRated'

function Home() {
  return (
    <div className='' style={{ backgroundColor: '#121212' }}>
      <Header/>
        <Banner />
        <Discounts/>
        <Free/>
        <Trending/>
        <HighRated/>
      <Footer/>
    </div>
  )
}

export default Home