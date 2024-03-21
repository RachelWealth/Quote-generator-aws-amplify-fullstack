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
  QuoteGeneratorSubTitle,
  QuoteGeneratorTitle,
} from "@/components/quoteGenerator/QuoteGeneratorElements";
import Clouds1 from "@/assets/Clouds1.png";
import Clouds2 from "@/assets/cloudy-weather.png";
import { useEffect, useState } from "react";
import * as queries from "@/src/graphql/queries";

import { Amplify } from "aws-amplify";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import config from "../src/amplifyconfiguration.json";
import QuoteGeneratorModal from "@/components/quoteGenerator";
Amplify.configure(config);

//Amplify.Amplify.configure(awsconfig);
const client = generateClient();
// interface for DynamoDB object
interface UpdateQuoteInfoData {
  id: string;
  createdAt: string;
  quoteGenerated: number;
  queryName: string;
  updatedAt: string;
}
interface GenerateAQuoteData {
  generateAQuote: {
    statusCode: number;
    headers: { [key: string]: string };
    body: string;
  }
}

interface QuetoRequestResult{
  data:{
    generateAQuote:string
  }
}
// type guard for our fetch function
function isGraphQLResultForQuoteQueryName(
  response: any
): response is GraphQLResult<{
  quoteQueryName: {
    items: [UpdateQuoteInfoData];
  };
}> {
  return (
    response.data &&
    response.data.quoteQueryName &&
    response.data.quoteQueryName.items
  );
}

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);
  const [openGenerator, setOpenGenerator] = useState(false);

  const [processingQuote, setProcessingQuote] = useState(false);
  const [quoteReceived, setQuoteReceived] = useState<string | null>(null);

  const handleCloseGenerator = () => {
    setOpenGenerator(false);
    setProcessingQuote(false);
    setQuoteReceived(null);
  };
  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenGenerator(true);
    setProcessingQuote(true);
    try {
      // Lambda
      const runFunction = "runFunction"
      const runFunctionStringified=JSON.stringify(runFunction)
      const response = await client.graphql<GenerateAQuoteData>({
        query:queries.generateAQuote,
        authMode:"iam",
        variables:{
          input:runFunctionStringified,
        }
      })
      const responseReStringified = response.data.generateAQuote
      const bodyIndex = responseReStringified.indexOf("body=") + 5;
      const bodyAndBase64 = responseReStringified.substring(bodyIndex);
      const bodyArray = bodyAndBase64.split(",");
      const body = bodyArray[0];
      console.log(body);
      setQuoteReceived(body);
      setProcessingQuote(false);

      updateQuoteInfo();
      //setProcessingQuote(false);
    } catch (error) {
      console.log("error processing quote", error);
      setProcessingQuote(false);
    }
  };
  // function to fetch our DynamoDB
  const updateQuoteInfo = async () => {
    try {
      const response = await client.graphql({
        query: queries.quoteQueryName,
        authMode: "iam", // Specify the authentication mode
        variables: {
          queryName: "LIVE",
        },
      });
      console.log("response", response);
      //Create type guards
      if (!isGraphQLResultForQuoteQueryName(response)) {
        throw new Error("Response Data is undefined.");
      }
      
      const receiveNumberOfQuetos =
        response.data.quoteQueryName.items[0].quoteGenerated;
      setNumberOfQuotes(receiveNumberOfQuetos);
    } catch (error) {
      console.log("error getting quote data", error);
    }
  };


  return (
    <div>
      {/* Background */}
      <GradientBackgroudCon>
        {/**Quote generator popup */}
        <QuoteGeneratorModal
          open={openGenerator}
          close={handleCloseGenerator}
          processingQuote={processingQuote}
          setProcessingQupte={setProcessingQuote}
          quoteReceived={quoteReceived}
          setQuoteReceived={setQuoteReceived}
        ></QuoteGeneratorModal>
        {/**Quote generator Modal */}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Daily Inspiration Generator
            </QuoteGeneratorTitle>
            <QuoteGeneratorSubTitle>
              A woman, as a general rule, owes very little to what she is born
              with - a woman is what she makes of herself.
            </QuoteGeneratorSubTitle>
            <QuoteGeneratorButton onClick={handleOpenGenerator}>
              <QuoteGeneratorButtonText >
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
