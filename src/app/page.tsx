"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Prediction } from "@/types";
import { createPrediction, getPrediction } from "@/actions";
import { useFormState, useFormStatus } from "react-dom";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? <Skeleton className="h-[480px] w-[512px]" /> : null}
      <Input
        defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        name="image"
        placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        type="file"
        className="border border-black"
      />
      <Textarea
        placeholder="An industrial bedroom"
        name="prompt"
        className="border border-black"
      />
      <Button disabled={pending}>Crear</Button>
    </>
  );
}

export default function HomePage() {
  const [state, formAction] = useFormState(handleSubmit, null);
  async function handleSubmit(_state: Prediction, formData: FormData) {
    let prediction = await createPrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id);

      await sleep(4000);
    }

    return prediction;
  }

  return (
    <section className="gap-3 grid w-[512px] m-auto">
      <form action={formAction} className="gap-3 grid">
        {state?.output && (
          <img alt="pre renderizado de la imagen" src={state.output[1]} />
        )}
        <FormContent />
      </form>
    </section>
  );
}
