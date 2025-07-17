export interface AudioData {
  audioSrc: string;
  imageSrc: string;
  auther: string;
  title: string;
}

export interface CardItem {
  img: string;
  title: string;
  category: string;
  desc: string;
  audioData: AudioData;
  rating: string;
  action: string;
}

export interface CategoryCard {
  categoryName: string;
  cardItems: CardItem[];
}


export interface AudioDataInput {
    audioSrc: string;
    imageSrc: string;
    auther: string;
    title: string;
}

export interface CardItemInput {
    img: string;
    title: string;
    category: string;
    desc: string;
    audioData: AudioDataInput;
    rating: number;
    action: string;
}

export interface CategoryCardInput {
    categoryName: string;
    cardItems: CardItemInput[];
}