import { useCallback, useState } from "react";
import { useApiError } from "src/hooks/useApiError";
import loginApi from "../api";

export const useLoginData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { apiError, handleError } = useApiError();

  const postRegister = useCallback(async (firstName: string, lastName: string, email: string, password: string) => {
    setLoading(true);

    try {
      const response  = await loginApi.postRegister(firstName, lastName, email, password);

      console.log(response);

        return true;
    } catch (error) {
      handleError(error);
      console.log(error);

        return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, apiError, postRegister };
};