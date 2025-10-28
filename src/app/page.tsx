"use client";
import { useEffect } from "react";
import { createSala } from "./lib/api/createSala";

export default function Home() {
  useEffect(() => {
    const run = async () => {
      const sala = await createSala({
        nombre: "prueba producion",
        preguntas: [
          { texto: "pregunta1", correcta: false },
          { texto: "pregunta2", correcta: false },
          { texto: "pregunta3", correcta: false },
          { texto: "pregunta4", correcta: false },
        ],
      });
      console.log("Sala creada:", sala);
    };

    run();
  }, []);

  return <div className=""></div>;
}
