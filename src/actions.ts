"use server";
import { unstable_noStore as noStore } from "next/cache";

import { Prediction } from "@/types";
import { addSyntheticLeadingComment } from "typescript";


export async function createPrediction (
  formData: FormData
): Promise<Prediction | null> {
  noStore();

  const imageUrl = await fetch(
      `https://api.cloudinary.com/v1_1/dztpbeymi/image/upload?upload_preset=NoseAI-Replicate`,
      {
        method: "PUT",
        body: formData.get('image') as File,
      },
    )
      .then((res) => res.json() as Promise<{secure_url: string}>)
      .then(({secure_url}) => secure_url)


  const prediction = await fetch("https://replicate.com/api/predictions", {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.5",
      "content-type": "application/json",
      "sec-ch-ua": '"Not A Brand";v="99", "Brave";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "x-csrftoken": "mNoaXSDH8DiUbgJY2JCTrOMPDQZmcls8",
    },
    referrer: "https://replicate.com/jagilley/controlnet-hough",
    referrerPolicy: "same-origin",
    body: JSON.stringify({
      input: {
        eta: 0,
        image: imageUrl,
        scale: 9,
        prompt: formData.get("prompt") as string,
        a_prompt: "best quality, extremely detailed",
        n_prompt:
          "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        ddim_steps: 20,
        num_samples: "1",
        value_threshold: 0.1,
        image_resolution: "512",
        detect_resolution: 512,
        distance_threshold: 0.1,
      },
      is_training: false,
      create_model: "0",
      stream: false,
      version:
        "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
    }),
    method: "POST",
    mode: "cors",
    credentials: "include",
  }).then(res => res.json() as Promise<Prediction>);

  return prediction;

}


export async function getPrediction(id:string) {
  noStore();

  return fetch(
      "https://replicate.com/api/predictions/" + id,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.6",
          "sec-ch-ua":
            '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
        },
        referrer: "https://replicate.com/jagilley/controlnet-hough",
        referrerPolicy: "same-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
      
    ).then(res => res.json() as Promise<Prediction>)
  
}