import { useCallback, useState } from "react";
import { useApiError } from "src/hooks/useApiError";
import profileApi from "../api";

export const useProfileData = () => {
  const { apiError, handleError } = useApiError();
  const [loading, setLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>("");

  const getLogo = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      const response = await profileApi.getLogo(userId);

        setPhoto(response.path);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async (userId: number) => {
    try {
      await profileApi.deleteAccount(userId);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }, []);

  return { photo, apiError, loading, getLogo, deleteAccount };
};