import React from 'react'
import Hero from './section/Hero'
import ShowcaseSection from './section/ShowcaseSection'
import NavBar from './components/NavBar'
import FeatureCards from './section/FeatureCards'
import Experience from './section/Experience'
import TechStack from './section/TechStack'
import Contact from './section/Contact'
import Footer from './section/Footer'

function App() {
  return (
    <>
      <NavBar/>
      <Hero/>
      <ShowcaseSection/>
      <FeatureCards/>
      <Experience/>
      <TechStack/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App