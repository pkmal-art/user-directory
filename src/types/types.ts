export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;  
}