import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { InputData } from '../Utils/models';
import { Observable, of, catchError, timeout, retry } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class KrishnaServiceService {

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getKrishnaData(): Observable<InputData[]> {
    console.log('🔍 KrishnaService - Attempting to fetch data from:', environment.apiNestBaseUrl + '/ram-bhajan');
    
    return this.http.get<InputData[]>(environment.apiNestBaseUrl + '/ram-bhajan')
      .pipe(
        timeout(10000), // 10 second timeout
        retry(2), // Retry up to 2 times
        catchError((error: HttpErrorResponse) => {
          console.error('❌ KrishnaService - API Error:', error.status, error.message);
          console.warn('⚠️ KrishnaService - Backend unavailable, using fallback data');
          
          // Show user-friendly error message
          this.toastService.showBackendError();
          
          // Return fallback data when API fails
          return of(this.defaultInputData);
        })
      );
  }

  getAllStries(){
    return this.http.get<any[]>(environment.apiSpringBaseUrl + "/api/stories")
  }

  defaultInputData: InputData[] = [
    {
        "categoryName": "Morning Arati Kirtans",
        "cardItems": [
            {
                "img": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751499858/radhakrishnaHD_zdbfrk.jpg",
                "title": "Mangala Arati - Guru Astakam",
                "category": "Morning Arati",
                "desc": "The one who sings the song daily in the morning, srila prabhupada will take him/her back to Goloka Vrindavan",
                "audioData": {
                    "audioSrc": "https://jawaharlalnehru1988.github.io/bgsloka/assets/aratisongs/samsaraDavanala.mp3",
                    "imageSrc": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751499812/Krishnarm_na7qr1.png",
                    "auther": "Lochana Dasa Thakura",
                    "title": "Samsara Davanalida loka...",
                    "_id": "686c7b75f854b410cac86d62"
                },
                "rating": "4.0",
                "_id": "686c7b75f854b410cac86d61",
                "action": "Play"
            },
            {
                "img": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751941178/astasaki_drhwrf.jpg",
                "title": "Dharshana Arati",
                "category": "Arati",
                "desc": "The one who sings the song daily in the morning, Lord Sri Sri Radha Krishna will give all kinds of protection",
                "audioData": {
                    "audioSrc": "https://jawaharlalnehru1988.github.io/bgsloka/assets/aratisongs/govindamAdiPurusham.mp3",
                    "imageSrc": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751941178/astasaki_drhwrf.jpg",
                    "auther": "Lord Brahma",
                    "title": "Govindam Adi Purusham Tam aham Bajami...",
                    "_id": "686c80eef854b410cac86d6e"
                },
                "rating": "4.6",
                "_id": "686c80eef854b410cac86d6d",
                "action": "Play"
            },
            {
                "img": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751945325/8761009fc82487aec3b4145403b99b79_eeppak.jpg",
                "title": "Sri Krishna caitanya prabhu",
                "category": "Arati",
                "desc": "The one who sings the song daily in the morning, Lord Sri Chaitanya Mahaprabhu will give all kinds of protection",
                "audioData": {
                    "audioSrc": "https://jawaharlalnehru1988.github.io/bgsloka/assets/aratisongs/SriKrsnaCaitanyaPrabhuDoyaKoroMore.mp3",
                    "imageSrc": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751945325/8761009fc82487aec3b4145403b99b79_eeppak.jpg",
                    "auther": "Srila Narottama Dasa Takur",
                    "title": "Sri Krishna Caitanya Prabhu doya koro more...",
                    "_id": "686c91daf854b410cac86d72"
                },
                "rating": "4.2",
                "_id": "686c91daf854b410cac86d71",
                "action": "Play"
            },
            {
                "img": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751699515/singing_pp_bkhcz1.jpg",
                "title": "Guru pooja",
                "category": "Morning Arati",
                "desc": "Offer this prayers to Srila Prabhupada alone.",
                "audioData": {
                    "audioSrc": "https://jawaharlalnehru1988.github.io/bgsloka/assets/aratisongs/guruPooja.mp3",
                    "imageSrc": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751699515/singing_pp_bkhcz1.jpg",
                    "auther": "Srila Bhakti Vinoda Takura",
                    "title": "Sri Guru Charana Padma kevala bhakati sadma",
                    "_id": "686ea0dd51996faaeb851cea"
                },
                "rating": "4.6",
                "action": "Play",
                "_id": "686ea0dd51996faaeb851ce9"
            },
            {
                "img": "https://res.cloudinary.com/dbmkctsda/image/upload/v1752822763/6b8424fbb8791051f034f780785dc759_jewzmw.jpg",
                "title": "Vibhavari sesha Aloka pravesha",
                "category": "6",
                "desc": "LYRICS:\n\n(1)\nvibhāvarī śeṣa, āloka-praveśa,\nnidrā chāri' uṭho jīva\nbolo hari hari, mukunda murāri,\nrāma kṛṣṇa hayagrīva\n\n \n\n(2)\nnṛsiṁha vāmana, śrī-madhusūdana,\nbrajendra-nandana śyāma\npūtanā-ghātana, kaiṭabha-śātana,\njaya dāśarathi-rāma\n\n \n\n(3)\nyaśodā dulāla, govinda-gopāla,\nvṛndāvana purandara\ngopī-priya-jana, rādhikā-ramaṇa,\nbhuvana -sundara-bara\n\n \n\n(4)\nrāvāṇāntakara, mākhana-taskara,\ngopī-jana-vastra-hārī\nbrajera rākhāla, gopa-vṛnda-pāla,\ncitta-hārī baṁśī-dhārī\n\n \n\n(5)\nyogīndra-bandana, śrī-nanda-nandana,\nbraja-jana-bhaya-hārī\nnavīna nīrada, rūpa manohara,\nmohana-baṁśī-bihārī\n\n \n\n(6)\nyaśodā-nandana, kaṁsa-nisūdana,\nnikuñja-rāsa-vilāsī\nkadamba-kānana, rāsa-parāyaṇa,\nbṛnda-vipina-nivāsī\n\n \n\n(7)\nānanda-vardhana, prema-niketana,\nphula-śara-jojaka kāma\ngopāṅganā-gaṇa, citta-vinodana,\nsamasta-guṇa-gaṇa-dhāma\n\n \n\n(8)\njāmuna-jīvana, keli-parāyaṇa,\nmānasa-candra-cakora\nnāma-sudhā-rasa, gāo kṛṣṇa-jaśa\nrākho vacana mana mora\n\n \n\nWORD FOR WORD TRANSLATION: Vibhavari Sesa\n\n \n\nTRANSLATION        http://kksongs.org/images/span.png\n\n1) The night has come to an end and the light of dawn is entering. O jiva soul, arise and give up your sleep. Chant the holy names of Lord Hari, who is the giver of liberation; the enemy of the Mura demon; the supreme enjoyer; the all-attractive one; and the horse-headed incarnation, Hayagriva.\n\n \n\n2) Lord Hari [Krsna] incarnated as the half-man, half-lion, Nrsimha. He appeared as a dwarf-brahmana named Upendra and is the killer of the Madhu demon. He is the beloved son of the King of Vraja, Nanda Maharaja, and is blackish in complexion. He is the slayer of the Putana witch and the destroyer of the demon Kaitabha. All glories to Lord Hari, who appeared as Lord Rama, the son of King Dasaratha.\n\n \n\n3) He is the darling of mother Yasoda; the giver of pleasure to the cows, land, and spiritual senses; and the protector of the cows. He is the Lord of the Vrndavana forest; the gopis' beloved; the lover of Radhika; and the most beautiful personality in all the worlds.\n\n \n\n4) As Ramacandra He brought about the end of the demoniac King Ravana; as Krsna He stole the older gopis' butter; He stole the younger gopis' clothes while they were bathing in the Yamuna. He is a cowherd boy of Vraja and the protector of the cowherd boys. He steals the hearts of all and always holds a flute.\n\n \n\n5) Lord Krsna is worshiped by the best of yogis and is the son of Nanda. He removes all the fears of the inhabitants of Vraja. He is the color of a fresh rain cloud, and His form is enchanting. When He wanders about, playing His flute, He looks very charming.\n\n \n\n6) He is the son of Yasoda and the killer of King Kamsa, and He sports in the rasa dance among the groves of Vraja. Krsna engages in this rasa dance underneath the kadamba trees, and He resides in the forest of Vrndavana.\n\n \n\n7) He increases the ecstasy of His devotees. He is the reservoir of all love and is the transcendental Cupid who uses His flowered arrows to increase the loving desires of the gopis. He is the pleasure of the gopis' hearts and the abode of all wonderful qualities.\n\n \n\n8) Lord Krsna is the life of the River Yamuna. He is always absorbed in amorous pastimes, and He is the moon of the gopis' minds, which are like the cakora birds that subsist only upon moonlight. O mind, obey these words of mine and sing the glories of Sri Krsna in the form of these holy names, which are full of nectarean mellows.\n\n ",
                "audioData": {
                    "audioSrc": "https://jawaharlalnehru1988.github.io/bgsloka/assets/aratisongs/vibhavariseshaAlokaPravesha.mp3",
                    "imageSrc": "https://res.cloudinary.com/dbmkctsda/image/upload/v1752822763/6b8424fbb8791051f034f780785dc759_jewzmw.jpg",
                    "auther": "Bhaktivinoda Thakura",
                    "title": "Vibhavari sesha Aloka pravesha",
                    "_id": "6879f465f1c49dc08b7118d8"
                },
                "rating": "4",
                "action": "Play",
                "_id": "6879f465f1c49dc08b7118d7"
            }
        ]
    },
    
]

}
