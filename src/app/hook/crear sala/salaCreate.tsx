import { createSala } from "@/app/lib/api/createSala";
import { useState } from "react";
import { Sala } from "@/app/lib/api/createSala";
export const useCreateSala = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateSala = async (data: Sala) => {
    setLoading(true);
    setError(null);

    try {
      const sala = await createSala(data);
      console.log("Sala creada:", sala);
      return sala;
    } catch (error) {
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleCreateSala,
  };
};
