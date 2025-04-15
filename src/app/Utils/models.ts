export interface UserData {
  username: string
  phone: string
  email: string
  address: string
  password: string
}

export type UserWithRole = UserData & { role: string };

