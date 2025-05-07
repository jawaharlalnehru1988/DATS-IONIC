export interface UserData {
  username: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

// export type UserWithRole = UserData & { role: string, isActive: boolean };

export interface UserWithRole extends UserData{
  role: string;
  isActive: string;
}

export interface ResponseUserData extends UserWithRole{
    _id: string
    __v: number
    
}


export interface Language {
  native: string;
  lang: string;
}