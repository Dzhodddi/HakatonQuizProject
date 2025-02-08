import { useCallback, useState } from "react";
import { AxiosError } from "axios";

export const useApiError = () => {
  const [apiError, setApiError] = useState<string>("");

  const handleError = (error) => {
    if (error instanceof AxiosError) {
      setApiError(error.message);
    } else {
      setApiError("Sorry! An error occurred");
    }
  };

  const clearError = () => {
    setApiError("");
  };

  return { apiError, handleError, clearError };
};