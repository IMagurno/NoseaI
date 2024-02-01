"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPrediction } from "@/actions";
import { useFormState } from "react-dom";

export default function Home () {
  const [state, formAction] = useFormState(createPrediction, null);

  console.log(state);

  return (
    <section className='gap-3 grid w-[512px] m-auto'>
      <form action={formAction} className='gap-3 grid'>
        {state?.output && (
          <img alt='pre renderizado de la imagen' src={state.output[1]} />
        )}
        <Input
          defaultValue='https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png'
          name='image'
          placeholder='https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png'
          type='text'
          className='border border-black'
        />
        <Textarea
          placeholder='An industrial bedroom'
          name='prompt'
          className='border border-black'
        />
        <Button>Crear</Button>
      </form>
    </section>
  );
}
