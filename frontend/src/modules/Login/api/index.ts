import api from "src/api/axios";

const loginApi = {
  postRegister: async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const response = await api.post("register", {
        first_name: firstName,
        second_name: lastName,
        email,
        password,
      });

      return response.data as { status: string };
    } catch (error) {
      throw error;
    }
  },
};

export default loginApi;