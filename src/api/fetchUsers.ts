import { requestUrl } from "./axios";
import { User } from "@/types/types";

export const getUsers = async (): Promise<User[]> => {
  const response = await requestUrl.get<User[]>('/users');
  return response.data;
};