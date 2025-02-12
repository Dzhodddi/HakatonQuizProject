import api from "src/api/axios";

const profileApi = {
  getLogo: async (userId: number) => {
    try {
      const response = await api.get(`get_logo/${userId}`);

      return response.data as { path: string };
    } catch (error) {
      throw error;
    }
  },
  deleteAccount: async (userId: number, password: string) => {
    try {
      const response = await api.delete(`delete_user/${userId}`, {
        data: {
          password,
        },
      });

      return response.data as { success: boolean };
    } catch (error) {
      throw error;
    }
  },
  postLogo: async (userId: number, file: File) => {
    const formData = new FormData();
    formData.append("new_file", file);

    try {
      const response = await api.patch(`upload_logo/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data as { path: string };
    } catch (error) {
      throw error;
    }
  },
  getUserQuizHistory: async (userId: number) => {
    try {
      const response = await api.get(`users/${userId}`);

      return response.data as { quiz_history: string[]};
    } catch (error) {
      throw error;
    }
  },
};

export default profileApi;