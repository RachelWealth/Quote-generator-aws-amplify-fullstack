import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
export const GradientBackgroudCon = styled.div`
  background: linear-gradient(to right, #f3052d, #e29595);
  background-size: 400% 400%;
  animation: gradient 6s ease infinite;
  height: 100vh;
  width: 100vw;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const BackgroundImage1 = styled(Image)`
  position: relative;
  z-index: 1;
  margin-left: -10px;
  margin-top: -10px;
`;

export const BackgroundImage2 = styled(Image)`
  position: fixed;
  z-index: 1;
  right: -120px;
  bottom: -10px;
`;

export const FootCon = styled.div`
  width: 100vw;
  height: 50px;
  text-align: center;
  font-size: 15px;
  font-family: "Souce Code Pre", monospace;
  position: absolute;
  color: white;
  z-index: 999999;
  bottom: 0;
`;

export const FooterLink = styled(Link)`
  color: white;
`;

export const QuoteGeneratorCon = styled.div`
  min-height: 350px;
  min-width: 350px;
  height: 70vh;
  width: 70vw;
  border: 2px solid #fffff2;
  border-radius:  15px;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  position: absolute;
  z-index: 2;


  background: rgba(27, 229, 18, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const QuoteGeneratorInnerCon = styled.div`
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  position: absolute;
  width: 100%;
`;
export const QuoteGeneratorTitle = styled.div`
  font-family: 'Permanent Marker', cursive;
  font-size:50px;
  text-align: center;
  color: white;
  padding: 0px 20px 0px 20px;
  position:relative;
  /**Media query for mobile */
  @media only screen and (max-width:600px){
    font-size: 30px;
  }
`;

export const QuoteGeneratorSuTitle = styled.div`
  font-family: 'Caveat', cursive;
  font-size:35px;
  text-align: center;
  color: white;
  padding: 0px 20px 0px 20px;
  position:relative;
  width: 100%;
  /**Media query for mobile */
  @media only screen and (max-width:600px){
    font-size: 25px;
  }
`;

export const QuoteGeneratorButton = styled.div`
  height: 100px;
    width: 300px;
    border: 2px solid darkgrey;
    border-radius: 20px;
    
    margin-top: 20px;
    position: relative;
    transition: 0.2s all ease-in-out;
    cursor: pointer;
    top: 20px;
    margin: auto;
    transform-origin: center;
    
    background: rgba( 0, 0, 70, 0.3 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 20px );
    -webkit-backdrop-filter: blur( 20px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    &:hover {
        filter: brightness(3);
        transition: 0.2s all ease-in-out;
        transform: scale(1.1);

        transform-origin: center;
    }
`;

export const QuoteGeneratorButtonText = styled.div`
   color: white;
    font-family: 'Caveat', cursive;
    font-size: 35px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    width: 100%;
    text-align: center;
`;