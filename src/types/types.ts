export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UsersState {
  data: User[];
  selectedUser: UserDetails | null;
  loading: boolean;
  error: string | null;  
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserDetails extends User {
  username: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

