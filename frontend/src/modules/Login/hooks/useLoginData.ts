import { useCallback, useState } from "react";
import { useApiError } from "src/hooks/useApiError";
import loginApi from "../api";
import { useUserStore } from "../store/useUserStore";

export const useLoginData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { apiError, handleError } = useApiError();
  const { setUser, setPassword } = useUserStore();

  const postRegister = useCallback(async (firstName: string, lastName: string, email: string, password: string) => {
    setLoading(true);

    try {
      const response  = await loginApi.postRegister(firstName, lastName, email, password);

      setUser(response);
      setPassword(password);

        return true;
    } catch (error) {
      handleError(error);
        return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const postLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);

    try {
      const response  = await loginApi.postLogin(email, password);

      setUser(response);
      setPassword(password);

        return true;
    } catch (error) {
      handleError(error);

        return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, apiError, postRegister, postLogin };
};