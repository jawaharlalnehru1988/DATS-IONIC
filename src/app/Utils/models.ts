export interface UserData {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

 interface UserWithRole extends UserData{
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
    title: string,
    _id?: string,
}

export interface AudioRange {
  name: string;
  start: number; // in minutes.seconds format (e.g., 3.36 = 3 minutes 36 seconds)
  end: number;   // in minutes.seconds format (e.g., 4.25 = 4 minutes 25 seconds)
}

export interface CardItem {
  img: string;
  title: string;
  category: string;
  desc: string;
  audioData: AudioItem;
  rating: string;
  action: string;
  _id: string;
}

export interface InputData {
  categoryName: string;
  cardItems: CardItem[];
}
