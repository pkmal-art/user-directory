import { requestUrl } from "./axios";
import { User, UserDetails } from "@/types/types";

export const getUsers = async (): Promise<User[]> => {
  const response = await requestUrl.get<User[]>('/users');
  return response.data;
};

export const getUserById =  async (id: number): Promise<UserDetails> => {
  const response = await requestUrl.get<UserDetails>(`/users/${id}`);
  return response.data;
};