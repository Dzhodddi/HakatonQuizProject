import api from "src/api/axios";
import { UserType } from "src/types/user";

const loginApi = {
  postRegister: async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const response = await api.post("register", {
        first_name: firstName,
        second_name: lastName,
        email,
        password,
      });

      return response.data as UserType;
    } catch (error) {
      throw error;
    }
  },
  postLogin: async (email: string, password: string) => {
    try {
      const response = await api.post("login", {
        email,
        password,
      });

      return response.data as UserType;
    } catch (error) {
      throw error;
    }
  },
};

export default loginApi;