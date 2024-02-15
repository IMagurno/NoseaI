"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPrediction, getPrediction } from "@/actions";
import { useDropzone } from "react-dropzone";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function HomePage() {
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState({
    isLoading: false,
    result: null as null | string,
  });
  const [fileDisplayed, setFileDisplayed] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      console.log(acceptedFiles);
      setFileDisplayed(true); // Marcar que hay un archivo para mostrar
      setState({ ...state, result: null }); // Restablecer el resultado para no mostrar la imagen anterior mientras se carga la nueva
    },
    [state]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
    });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (acceptedFiles.length === 0) {
      setError("Por favor, selecciona un archivo antes de enviar.");
      return;
    }

    setState({ isLoading: true, result: null });
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    formData.append("prompt", event.currentTarget.prompt.value);

    try {
      let prediction = await createPrediction(formData);

      if (!prediction) {
        setError(
          "No se pudo obtener una predicción. Por favor, inténtalo de nuevo."
        );
        setState((prevState) => ({ ...prevState, isLoading: false }));
        return;
      }

      while (["starting", "processing"].includes(prediction.status)) {
        await sleep(4000);
        prediction = await getPrediction(prediction.id);
      }

      setError(null);
      setState({ result: prediction.output[1], isLoading: false });
      setFileDisplayed(false);
    } catch (error) {
      console.error(error);
      setError("Se produjo un error al procesar tu solicitud.");
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col justify-center items-center gap-4 w-full px-4 py-12 sm:w-[512px] sm:px-0"
        onSubmit={handleSubmit}
      >
        {state.result && (
          <img
            alt="Previsualización del render"
            src={state.result}
            className="max-w-full h-auto"
          />
        )}

        {!state.isLoading && !state.result && (
          <div
            className={`w-full sm:w-[512px] h-[512px] border border-dashed flex items-center justify-center cursor-pointer text-center p-10 text-gray-500 ${
              fileDisplayed ? "hidden" : ""
            }`}
            {...getRootProps()}
          >
            <Input
              name="image"
              type="file"
              className="cursor-pointer"
              {...getInputProps()}
            />
            {isDragActive ? (
              <p>Suelta los archivos aquí ...</p>
            ) : (
              <p>
                Arrastra y suelta algunos archivos aquí, o haz clic para
                seleccionar archivos
              </p>
            )}
          </div>
        )}

        {fileDisplayed && acceptedFiles[0] && !state.result && (
          <img
            className={`max-w-full h-auto ${
              state.isLoading ? "animate-pulse" : ""
            }`}
            src={URL.createObjectURL(acceptedFiles[0])}
            alt="Vista previa del archivo seleccionado"
          />
        )}

        <Textarea
          className="w-full sm:w-[512px] p-2"
          name="prompt"
          placeholder="An industrial bedroom"
        />
        <Button
          className="border w-full sm:w-[160px] hover:bg-white hover:text-black mt-4"
          disabled={state.isLoading}
        >
          Crear
        </Button>
      </form>
    </section>
  );
}
