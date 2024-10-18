import {Swiper, SwiperSlide} from 'swiper/react';
import { Button, Nav} from "react-bootstrap";
import { NavLink, Link } from 'react-router-dom';
import {CaretRight} from "phosphor-react";
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import heroBackground from "../../assets/hero_background.svg";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import SwiperCore from 'swiper/core';
import 'swiper/swiper-bundle.css';
import maroonSash from "../../assets/maroon sash0.svg";
import blueSash from "../../assets/blue sash0.svg";
import whiteSash from "../../assets/white sash0.svg";
import blackSash from "../../assets/black sash0.svg";
import goldenSash from "../../assets/gold sash0.svg";
import pinkSash from "../../assets/baby pink sash.svg";

const HeroSection = () => {
    return (
        <div className="backImage" style={{ backgroundImage: `url(${heroBackground})`}}>
            <div className="m-lg-3 heroContent" >
                <div className='col-lg-6 col-sm-10 p-lg-5 heroMainText' >
                    <div className="m-lg-5 m-sm-1" style={{ textAlign: 'left' }}>
                        <p className='heroText'> 
                            Let’s
                        </p>
                        <p style={{marginTop:"-10px"}}>Celebrate </p>
                        <span  className='tagLine'> We have come a long way </span>
                    </div>
                    <div className="flex ">
                        <div className='m-lg-3 m-sm-3' style={{display:"flex", textAlign: "center", justifyContent:"space-evenly"}}>
                            <Button bg="light" 
                                    data-bs-theme="light"
                                    className='cta2Button d-md-flex d-none'
                                    href="https://wa.me/255744873082"   
                                    style={{ backgroundColor:"white", color:"black" ,border:"2px solid black" }}>
                                    Contact Support team
                            </Button> 
                            <Button bg="dark" 
                                    data-bs-theme="dark"
                                    className='cta1Button'
                                    style={{ backgroundColor:"black",border:"none" }}>
                            <NavLink to="/order" style={{textDecoration:"none", color:"white"}}>Order Sash Now</NavLink>
                            <CaretRight size={32} weight="bold" />
                            </Button>
                        </div>
                    </div>                  
                </div>
                <div className="col-lg-6 col-sm-11 p-lg-5  sashContainer">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={ true }
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        pagination={{el: ".swiper-pagination",clickable:true}}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            clickable: true,
                        }}
                        modules={[Navigation, Pagination, EffectCoverflow]} 
                        className='swiper_container'
                        >
                        <SwiperSlide>
                            <img src={maroonSash}  style={{ width:"35%", height:"35%"}}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={whiteSash}  style={{ width:"35%", height:"35%"}}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={blackSash}  style={{ width:"35%", height:"35%"}}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={blueSash}  style={{ width:"35%", height:"35%"}}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={goldenSash}  style={{ width:"35%", height:"35%"}}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={pinkSash}  style={{ width:"35%", height:"35%"}}/>
                        </SwiperSlide>
                        <div className="m-lg-5 slider-controller">
                            <div className="swiper-button-prev slider-arrow">
                                <ion-icon name="arrow-back-outline" style={{color:"#AE8625"}}></ion-icon>
                            </div>
                            <div className="swiper-button-next slider-arrow">
                                <ion-icon name="arrow-forward-outline" style={{color:"#AE8625"}}></ion-icon>
                            </div>
                            <div className="swiper-pagination">  
                            </div>
                        </div>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
export default HeroSection