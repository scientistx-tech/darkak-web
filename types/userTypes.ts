export interface Address {
  id: number;
  division: string;
  district: string;
  sub_district: string;
  area: string;
  userId: number;
}

export interface ModeratorAccess {
  id: number;
  moderatorId: number;
  access: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  password: string;
  dob: string | null;
  gender: string | null;
  isAdmin: boolean;
  image: string | null;
  socketId: string | null;
  pushToken: string | null;
  provider: string;
  token: string | null;
  isModerator: boolean;
  isSeller: boolean;
  seller?: {};
  updatePasswordAt: string;
  createdAt: string;
  marital_status: string | null;
  anniversary_date: string | null;
  address: Address | null;
}

export interface AuthResponse {
  user: User;
  token: string;
  moderator_access?: ModeratorAccess[];
}
