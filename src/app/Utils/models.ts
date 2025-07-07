export interface UserData {
  username: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

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

export interface AudioItem {
    audioSrc: string,
    imageSrc: string,
    auther: string,
    title: string
  }

export interface CardItem {
  img: string;
  title: string;
  category: string;
  desc: string;
  audioData: AudioItem;
  rating: string;
  price: string;
}

export interface InputData {
  categoryName: string;
  cardItems: CardItem[];
}