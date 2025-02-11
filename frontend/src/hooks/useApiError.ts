import { useState } from "react";
import { AxiosError } from "axios";

export const useApiError = () => {
  const [apiError, setApiError] = useState<string>("");

  const handleError = (error) => {
    if (error instanceof AxiosError) {
      setApiError(error.response?.data.detail || "Sorry! An error occurred");
    } else {
      setApiError("Sorry! An error occurred");
    }
  };

  const clearError = () => {
    setApiError("");
  };

  return { apiError, handleError, clearError };
};