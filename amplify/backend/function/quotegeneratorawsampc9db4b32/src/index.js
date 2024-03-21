/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// AWS packages
import("node-fetch")
  .then((module) => {
    const fetch = module.default;
    // Use fetch here
  })
  .catch((err) => {
    console.error("Failed to import node-fetch:", err);
  });
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");

const svg2png = require("svg2png");
const {
  DynamoDBClient,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({});
//const docClient = DynamoDBDocumentClient.from(client);

async function updateQuoteDDBObject() {
  const quoteTableName = "QuoteAppData-wln4ejbi2vef5pcmmsuf2smxam-dev"; //env.API_INSPIRATIONALQUOTES_QUOTEAPPDATATABLE_NAME;
  const quoteObjectID = "9d6234b4-7386-448b-9853-1ddcd47f6781";

  try {
    var quoteParams = {
      TableName: quoteTableName,
      Key: {
        "id": { "S": quoteObjectID },
      },
      UpdateExpression: "SET #quoteGenerated = #quoteGenerated + :inc",
      ExpressionAttributeValues: {
        ":inc": { "N": "1" }
      },
      ExpressionAttributeNames: {
        "#quoteGenerated": "quoteGenerated"
      },
      ReturnValues: "UPDATED_NEW"
    };
    const command = new UpdateItemCommand(quoteParams);
    const updateQuoteObject = await client.send(command);
    return updateQuoteObject;
  } catch (error) {
    console.log("error updating quote object in DynamoDB", error);
  }
}

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const imagePath = path.join("./tmp", "quote.png");
  const apiURL = "https://zenquotes.io/api/random";

  // Function: Generate quote image
  async function getRandomQuote(apiURLInput) {
    // Validate response to the api
    const response = await fetch(apiURLInput);
    var quoteData = await response.json();

    // quote elements
    let quoteText = quoteData[0].q;
    let quoteAuthor = quoteData[0].a;

    // Image construction
    const width = 750;
    const height = 483;
    const text = quoteText;
    const words = text.split(" ");
    const lineBreak = 4;
    let newText = "";

    // Define some tspanElements w/ 4 words each
    let tspanElements = "";
    for (let i = 0; i < words.length; i++) {
      newText += words[i] + " ";
      if ((i + 1) % lineBreak === 0) {
        tspanElements += `<tspan x="${
          width / 2
        }" dy="1.2em">${newText}</tspan>`;
        newText = "";
      }
    }
    if (newText !== "") {
      tspanElements += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
    }

    // Construct the SVG
    const svgImage = `
            <svg width="${width}" height="${height}">
                <style>
                   .title { 
                     fill: #ffffff; 
                    font-size: 20px; 
                       font-weight: bold;
                  }
                 .quoteAuthorStyles {
                       font-size: 35px;
                      font-weight: bold;
                     padding: 50px;
                }
                  .footerStyles {
                    font-size: 20px;
                       font-weight: bold;
                      fill: lightgrey;
                     text-anchor: middle;
                    font-family: Verdana;
                }
                </style>
                <circle cx="382" cy="76" r="44" fill="rgba(255, 255, 255, 0.155)"/>
                <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white">"</text>
                <g>
                    <rect x="0" y="0" width="${width}" height="auto"></rect>
                       <text id="lastLineOfQuote" x="375" y="120" font-family="Verdana" font-size="35" fill="white" text-anchor="middle">
                          ${tspanElements}
                      <tspan class="quoteAuthorStyles" x="375" dy="1.8em">- ${quoteAuthor}</tspan>
                 </text>
                  </g>
                <text x="${width / 2}" y="${
      height - 10
    }" class="footerStyles">Developed by @YL D | Quotes from ZenQuotes.io</text>
            </svg>
          `;

    //  Add background images for the svg creation
    const backgroundImages = [
      "./background/Quepal.jpg",
      "./background/Rastafari.jpg",
      "./background/GreenBlue.jpg",
      "./background/Snapchat.jpg",
    ];

    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedBackgroundImage = backgroundImages[randomIndex];
    // Composite this image together
    await Jimp.read(selectedBackgroundImage)
      .then(async (backgroundImage) => {
        backgroundImage.resize(width, height);
        // Convert SVG string to PNG buffer
        const pngBuffer = await svg2png(svgImage);
        const svgImageJimp = await Jimp.read(pngBuffer);
        // Composite the SVG image on top of the background image
        backgroundImage.composite(svgImageJimp, 0, 0);
        return await backgroundImage.writeAsync(imagePath,{ overwrite: true });
      })
      .then(() => {
        console.log("Composite image saved successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Function: Update DynamoDB object in table
    try {
      await updateQuoteDDBObject();
    } catch (error) {
      console.log("error updating quote object in DynamoDB", error);
    }
    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Content-Type": "image/png",
        "Access-Control-Allow-Origin": "*",
      },
      body: fs.readFileSync(imagePath).toString("base64"),
      isBase64Encoded: true,
    };
  }
  return await getRandomQuote(apiURL);
};
