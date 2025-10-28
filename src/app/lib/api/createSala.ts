interface Pregunta {
    texto: string;
    correcta: boolean;
}
export interface Sala {
    nombre: string;
    preguntas: Pregunta[];
}

export const createSala = async (data: Sala) => {
    // Aquí puedes realizar la lógica para crear la sala
    const response = await fetch("https://copiakahoo-production.up.railway.app/salas/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    // Aquí puedes manejar la respuesta del servidor
    const resData = await response.json();
    // Devuelve los datos de la sala
    return resData;
};