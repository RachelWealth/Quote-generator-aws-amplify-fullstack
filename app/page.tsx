"use client";

import {
  BackgroundImage1,
  BackgroundImage2,
  FootCon,
  FooterLink,
  GradientBackgroudCon,
  QuoteGeneratorButton,
  QuoteGeneratorButtonText,
  QuoteGeneratorCon,
  QuoteGeneratorInnerCon,
  QuoteGeneratorSuTitle,
  QuoteGeneratorTitle,
} from "@/components/quoteGenerator/QuoteFeneratorElements";
import Clouds1 from "@/assets/Clouds1.png";
import Clouds2 from "@/assets/cloudy-weather.png";
import { useEffect, useState } from "react";
import * as queries from '@/src/graphql/queries';
 import { Amplify } from 'aws-amplify';
import { GraphQLResult, generateClient } from 'aws-amplify/api';
import config from '../src/amplifyconfiguration.json';
Amplify.configure(config);


 //Amplify.Amplify.configure(awsconfig);
const client = generateClient();
// interface for DynamoDB object
interface UpdateQuoteInfoData{
  id:string
  queryName: string
  queryGenerated:number
  createdAt:string
  updatedAt:string
}

// type guard for our fetch function
function isGraphQLResultForQuoteQueryName(response:any):response is GraphQLResult<{
  quotesQueryName:{
    items:[UpdateQuoteInfoData]
  };
}>{
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;

}




export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);
 // function to fetch our DynamoDB
 const updateQuoteInfo = async()=>{
  try {

    const response = await client.graphql({ 
      query: queries.quoteQueryName,
      authMode:'iam', // Specify the authentication mode
      variables:{
        queryName:"LIVE",
      },
    });
    //Create type guards
    if(!isGraphQLResultForQuoteQueryName(response)){
      throw new Error("Response Data is undefined.")
    }
    const receiveNumberOfQuetos = response.data.quoteQueryName.items[0].queryGenerated
    setNumberOfQuotes(receiveNumberOfQuetos);
  } catch (error) {
    console.log("error getting quote data",error)
  }
 }
 useEffect(()=>{
  updateQuoteInfo()
 })
 
  return (
    <div>
      {/* Background */}
      <GradientBackgroudCon>
        {/**Quote generator Modal */}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Daily Inspiration Generator
            </QuoteGeneratorTitle>
            <QuoteGeneratorSuTitle>
              A woman, as a general rule, owes very little to what she is born
              with - a woman is what she makes of herself.
            </QuoteGeneratorSuTitle>
            <QuoteGeneratorButton>
              <QuoteGeneratorButtonText onClick={null}>
                Make a Quote
              </QuoteGeneratorButtonText>
            </QuoteGeneratorButton>
          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>

        {/**Background Images */}
        <BackgroundImage1 src={Clouds1} height="300" alt="cloudbackground1" />
        <BackgroundImage2 src={Clouds2} height="300" alt="cloudbackground1" />

        {/*Foters */}
        <FootCon>
          <>
            Quote Generated: {numberOfQuotes}
            <br />
            Developed with YL D by{" "}
            <FooterLink
              href="https://github.com/RachelWealth"
              target="_blank"
              rel="nooper noreferer"
            >
              @YL D
            </FooterLink>
          </>
        </FootCon>
      </GradientBackgroudCon>
    </div>
  );
}
