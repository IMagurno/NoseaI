"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPrediction, getPrediction } from "@/actions";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function HomePage() {
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState({
    isLoading: false,
    result: null as null | string,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ isLoading: true, result: null });

    const formData = new FormData(event.currentTarget);

    let prediction = await createPrediction(formData);

    if (!prediction) {
      setError(
        "No se pudo obtener una predicción. Por favor, inténtalo de nuevo."
      );
      setState({ ...state, isLoading: false });
      return;
    }

    while (["starting", "processing"].includes(prediction.status)) {
      await sleep(4000);
      prediction = await getPrediction(prediction.id);
      console.log(prediction);
    }

    setError(null);
    setState({ result: prediction.output[1], isLoading: false });
  }

  return (
    <section className="flex justify-center items-center">
      <form
        className="flex flex-col justify-center items-center gap-4 w-[512px] py-[60px]"
        onSubmit={handleSubmit}
      >
        {state.isLoading ? (
          <p className="text-center text-lg">Cargando...</p>
        ) : state.result ? (
          <img alt="Previsualización del render" src={state.result} />
        ) : null}
        <Input name="image" type="file" className="cursor-pointer" />
        <Textarea name="prompt" placeholder="An industrial bedroom" />
        <Button
          className="border w-[160px] hover:bg-white hover:text-black"
          disabled={state.isLoading}
        >
          Crear
        </Button>
      </form>
    </section>
  );
}
