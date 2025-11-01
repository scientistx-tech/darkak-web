export interface UserCount {
  orders: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  gender: string;
  isAdmin: boolean;
  image: string;
  socketId: string | null;
  pushToken: string | null;
  marital_status: string;
  anniversary_date: string | null;
  provider: string;
  token: string | null;
  isModerator: boolean;
  isSeller: boolean;
  updatePasswordAt: string;
  createdAt: string;
  isBlocked: boolean;
  _count: UserCount;
}

export interface UserResponse {
  totalPage: number;
  currentPage: number;
  totalItems: number;
  data: User[];
}
