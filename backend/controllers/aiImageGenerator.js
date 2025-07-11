import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";

// parameters include "prompt" send by user and "image_name"
const txtImgAI = async(userImgPrompt,imgName)=>{
  const ai = new GoogleGenAI({apiKey:process.env.GEN_API_KEY});

  const contents = userImgPrompt;

    // "Hi, can you create a 3d rendered image of a cow " +
    // "with wings and a top hat flying over a happy " +
    // "futuristic scifi city with lots of greenery?";

  // Set responseModalities to include "Image" so the model can generate  an image
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync(`pathName/${imgName}.png`, buffer);
      console.log(`Image saved as ${imgName}.png`);
    }
  }
}

export default txtImgAI;