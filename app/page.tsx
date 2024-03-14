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
import { useState } from "react";
export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);
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
