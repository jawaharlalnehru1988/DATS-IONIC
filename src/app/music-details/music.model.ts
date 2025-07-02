export interface DetailModel {
  _id: string
  slokaNo: string
  orderNo: number
  slokaText: string
  SlokaVoice: string
  slokaMeaning: string
  __v: number
}

export interface ISlokaChapters {
  _id: string
  slokaAudio: string
  languageType: string
  slokaText: string
  chapterName: string
  chapterNo: string
  qaSection: QaSection[]
  __v: number
}

export interface QaSection {
  question: string
  answer: string
  _id: string
}
