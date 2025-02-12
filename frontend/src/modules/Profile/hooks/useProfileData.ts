import { useCallback, useState } from "react";
import { useApiError } from "src/hooks/useApiError";
import profileApi from "../api";
import { useUserStore } from "src/modules/Login/store/useUserStore";

export const useProfileData = () => {
  const { apiError, handleError } = useApiError();
  const [loading, setLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>("");
  const { password } = useUserStore();

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
      await profileApi.deleteAccount(userId, password);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }, []);

  const postLogo = useCallback(async (userId: number, file: File) => {
    try {
      await profileApi.postLogo(userId, file);
      setPhoto(URL.createObjectURL(file));
    } catch (error) {
      handleError(error);
    }
  }, []);

  return { photo, apiError, loading, getLogo, postLogo, deleteAccount };
};