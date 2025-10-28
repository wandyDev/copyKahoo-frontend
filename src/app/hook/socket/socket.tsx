import { useState, useEffect } from "react";
import { Newsocket } from "@/app/lib/api/socket";

interface JoinRoomData {
  room: string;
  nombreJugador: string;
}

interface Jugador {
  nombreJugador: string;
  nombreSala: string;
}

interface Pregunta {
  id: number;
  texto: string;
}

interface Respuesta {
  respuesta: boolean;
  idPregunta: number;
}

interface ResultadoRespuesta {
  correcta: boolean;
}

export const useGameSocket = () => {
  const socket = Newsocket;
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [resultados, setResultados] = useState<ResultadoRespuesta[]>([]);
  const [errores, setErrores] = useState<string | null>(null);

  // Escuchar eventos
  useEffect(() => {
    // Escuchar el evento "jugador_unido"
    socket.on("jugador_unido", (jugador: Jugador) => {
      setJugadores((prev) => [...prev, jugador]);
      console.log("jugador unido:", jugador);
    });

    // Escuchar el evento "preguntas"
    socket.on("preguntas", (pregs: Pregunta[]) => {
      setPreguntas(pregs);
      console.log("preguntas:", pregs);
    });

    // Escuchar el evento "la respuesta a la pregunta era"
    socket.on("la respuesta a la pregunta era", (res: ResultadoRespuesta) => {
      setResultados((prev) => [...prev, res]);
      console.log("la respuesta a la pregunta era:", res);
    });

    // Escuchar el evento "error"
    socket.on("error", (err: string | { code: string; message: string }) => {
      if (typeof err === "string") setErrores(err);
      else setErrores(err.message);
      console.log("error:", err);
    });

    // Limpieza
    return () => {
      socket.off("jugador_unido");
      socket.off("preguntas");
      socket.off("la respuesta a la pregunta era");
      socket.off("error");
    };
  }, []);

  // Emitir eventos
  // unierse a la sala
  const joinRoom = (data: JoinRoomData) => {
    socket.emit("joinRoom", data);
  };

  // Iniciar el juego
  const startGame = () => {
    socket.emit("start_Game");
  };

  // Responder la pregunta
  const responderPregunta = (data: Respuesta) => {
    socket.emit("responder", data);
  };

  // Retornar
  return {
    socket,
    joinRoom,
    startGame,
    responderPregunta,
    jugadores,
    preguntas,
    resultados,
    errores,
  };
};
