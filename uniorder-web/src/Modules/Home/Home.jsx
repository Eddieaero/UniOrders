import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import {useState, useEffect } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Card1 from "../../Components/Card/Card1";
import Card2 from "../../Components/Card/Card2";
import Card3 from "../../Components/Card/Card3";

const Home = () => {

  return (
    <div>
        <NavBar />
            <div>
                {/* Home */}
                <HeroSection/>
                <Card1/>
                <Card2/>
                <Card3/>
            </div>
        <Footer />
    </div>
  );
}

export default Home;