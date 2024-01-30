import "./globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Prediction } from "@/types";
import { resolve } from "path";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  async function createPrediction(formData: FormData) {
    "use server";

    let prediction = await fetch("https://replicate.com/api/predictions/", {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A Brand";v="99", "Brave";v="121", "Chromium";v="121"',
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
          image: formData.get("image") as string,
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
    }).then((res) => res.json() as Promise<Prediction>);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await fetch(
        "https://replicate.com/api/predictions" + prediction.id,
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
      ).then((res) => res.json() as Promise<Prediction>);

      await sleep(4000);
    }
    console.log(prediction);
  }

  return (
    <div className="container">
      <form action={createPrediction} className="gap-3 grid w-[512px] m-auto">
        <Input
          defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
          name="image"
          placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
          type="text"
          className="border border-black"
        />
        <Textarea
          placeholder="An industrial bedroom"
          name="prompt"
          className="border border-black"
        />
        <Button>Crear</Button>
      </form>
    </div>
  );
}
