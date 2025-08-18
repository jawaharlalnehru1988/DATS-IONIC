// tithi.service.ts
// Accurate Panchang-style Tithi using apparent ecliptic longitudes.
// Library: Astronomy Engine (MIT). No location needed for tithi.

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Body,
  PairLongitude,             // difference in longitudes between 2 bodies as seen from Earth
} from 'astronomy-engine';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// --- Types ---
export interface TithiInfo {
  tithiNumber: number;          // 1..30
  tithiName: string;            // e.g., "Shukla Pratipada"
  paksha: 'Shukla' | 'Krishna';
  start: Date;                  // IST if you pass IST date in; JS Date is UTC internally
  end: Date;
  remainingMinutes: number;
  elapsedDegrees: number;       // 0..12 within current tithi
  remainingDegrees: number;     // 12 - elapsed
  ekadasiName?: string;         // Special Ekadashi name if applicable
  masaName?: string;            // Current lunar month name
  isAdhikaMasa?: boolean;       // Whether this is an extra month
}

export interface FestivalEvent {
  festivalName: string;
  otherName?: string;
  startDate: string;
  importance: string;
  breakfastDate?: string;
  breakfastUntil?: string;  
  breakfastStartTime?: string;
  breakfastEndTime?: string;
  description?: string;
}

// --- Constants ---
const TITHI_NAMES_SHUKLA = [
  'Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami',
  'Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Purnima',
] as const;

const TITHI_NAMES_KRISHNA = [
  'Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami',
  'Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Amavasya',
] as const;

const DEG_PER_TITHI = 12;

// --- Ekadashi Names by Lunar Month and Paksha ---
const EKADASHI_NAMES = {
  'Chaitra': {
    'Krishna': 'Papamochani Ekādaśī',
    'Shukla': 'Kamada Ekādaśī'
  },
  'Vaisakha': {
    'Krishna': 'Varuthini Ekādaśī',
    'Shukla': 'Mohinī Ekādaśī'
  },
  'Jyeshtha': {
    'Krishna': 'Aparā Ekādaśī',
    'Shukla': 'Nirjalā Ekādaśī'
  },
  'Ashadha': {
    'Krishna': 'Yoginī Ekādaśī',
    'Shukla': 'Devshayani (Śayanī) Ekādaśī'
  },
  'Shravana': {
    'Krishna': 'Kāmikā Ekādaśī',
    'Shukla': 'Pavitropana (Putrada) Ekādaśī'
  },
  'Bhadrapada': {
    'Krishna': 'Aja Ekādaśī',
    'Shukla': 'Parivartini (Vāmana) Ekādaśī'
  },
  'Ashvina': {
    'Krishna': 'Indira Ekādaśī',
    'Shukla': 'Pāśāṅkuśā Ekādaśī'
  },
  'Kartika': {
    'Krishna': 'Rama Ekādaśī',
    'Shukla': 'Prabodhini (Devutthana) Ekādaśī'
  },
  'Margashirsha': {
    'Krishna': 'Utpannā Ekādaśī',
    'Shukla': 'Mokṣadā Ekādaśī'
  },
  'Pausha': {
    'Krishna': 'Saphalā Ekādaśī',
    'Shukla': 'Putradā Ekādaśī'
  },
  'Magha': {
    'Krishna': 'Ṣaṭtilā Ekādaśī',
    'Shukla': 'Jaya (Bhīṣma) Ekādaśī'
  },
  'Phalguna': {
    'Krishna': 'Vijayā Ekādaśī',
    'Shukla': 'Āmalakī Ekādaśī'
  },
  'Adhika': {
    'Krishna': 'Padma Ekādaśī',
    'Shukla': 'Padminī Ekādaśī'
  }
} as const;

// --- Adhika Masa Calendar (2020-2035) ---
const ADHIKA_MASA_CALENDAR = [
  { year: 2020, masa: 'Ashvina', startDate: '2020-09-18', endDate: '2020-10-16' },
  { year: 2023, masa: 'Shravana', startDate: '2023-07-18', endDate: '2023-08-16' },
  { year: 2026, masa: 'Jyeshtha', startDate: '2026-05-15', endDate: '2026-06-12' },
  { year: 2029, masa: 'Pausha', startDate: '2029-01-26', endDate: '2029-02-23' },
  { year: 2031, masa: 'Bhadrapada', startDate: '2031-09-14', endDate: '2031-10-13' },
  { year: 2034, masa: 'Ashadha', startDate: '2034-07-03', endDate: '2034-08-01' }
] as const;

// --- Lunar Months (ordered by solar year cycle) ---
const LUNAR_MONTHS = [
  'Chaitra', 'Vaisakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
  'Ashvina', 'Kartika', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
] as const;

@Injectable({
  providedIn: 'root'
})
export class TithiService {

  constructor(private http: HttpClient) { }

  // Important Vaishnava festival data including Ekadasi and other festivals
  festivals: FestivalEvent[] = [ ];

  // --- Helpers ---
  private norm360(x: number): number {
    let a = x % 360;
    return a < 0 ? a + 360 : a;
  }

  /** Difference λ_moon - λ_sun in [0, 360) at given Date. */
  private sunMoonDiffDeg(date: Date): number {
    // PairLongitude(Moon, Sun) gives apparent ecliptic longitude(Moon) - longitude(Sun) from Earth, in degrees.
    // Already what we need for Tithi.
    return this.norm360(PairLongitude(Body.Moon, Body.Sun, date));
  }

  /** Map angle difference -> tithi number (1..30) and intra-tithi progress */
  private angleToTithi(diffDeg: number): { tithiNumber: number; intoDeg: number } {
    const tithiNumber = Math.floor(diffDeg / DEG_PER_TITHI) + 1; // 1..30
    const intoDeg = diffDeg % DEG_PER_TITHI;                     // 0..12
    return { tithiNumber, intoDeg };
  }

  private nameForTithi(n: number): { name: string; paksha: 'Shukla' | 'Krishna' } {
    if (n <= 15) return { name: `Shukla ${TITHI_NAMES_SHUKLA[n - 1]}`, paksha: 'Shukla' };
    return { name: `Krishna ${TITHI_NAMES_KRISHNA[n - 16]}`, paksha: 'Krishna' };
  }

  /**
   * Find the exact time when diff crosses k*12° using bracket + bisection.
   * @param around reference date near the crossing
   * @param targetDeg multiple of 12 (0..360) we want diff == targetDeg (mod 360)
   * @returns Date of crossing
   */
  private findCrossing(around: Date, targetDeg: number): Date {
    // Step 1: Wide search to bracket the crossing (max ~48h window)
    const target = this.norm360(targetDeg);
    const hoursStep = 1; // coarse step
    let t1 = new Date(around.getTime() - 24 * 3600 * 1000);
    let d1 = this.norm360(this.sunMoonDiffDeg(t1) - target);
    let t2 = new Date(t1.getTime());
    let d2 = d1;

    // We want the wrapped difference to cross 0. We'll track signed shortest angle.
    const unwrap = (x: number) => {
      let a = ((x + 180) % 360 + 360) % 360 - 180; // map to (-180,180]
      return a;
    };

    for (let i = 0; i < 48; i++) {
      t2 = new Date(t1.getTime() + hoursStep * 3600 * 1000);
      d2 = unwrap(this.sunMoonDiffDeg(t2) - target);
      d1 = unwrap(this.sunMoonDiffDeg(t1) - target);
      if (d1 === 0) return t1;
      if (d1 * d2 < 0) break; // sign change => bracketed
      t1 = t2;
    }

    // Step 2: Bisection refine to ~1 second
    let a = t1.getTime();
    let b = t2.getTime();
    for (let iter = 0; iter < 60; iter++) {
      const m = (a + b) / 2;
      const dm = unwrap(this.sunMoonDiffDeg(new Date(m)) - target);
      const da = unwrap(this.sunMoonDiffDeg(new Date(a)) - target);
      if (Math.abs(dm) < 1e-6 || (b - a) < 1000) {
        return new Date(m);
      }
      if (da * dm <= 0) {
        b = m;
      } else {
        a = m;
      }
    }
    return new Date((a + b) / 2);
  }

  public getFestivalsForDate(date: Date): FestivalEvent[] {
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    return this.festivals.filter(festival => festival.startDate === dateString);
  }

  /**
   * Main API
   * @param when Date you care about (use local IST Date if you want IST in/out).
   */
  public getTithiInfo(when: Date): TithiInfo {
    const diff = this.sunMoonDiffDeg(when);
    const { tithiNumber, intoDeg } = this.angleToTithi(diff);
    const { name, paksha } = this.nameForTithi(tithiNumber);

    // Current tithi spans [k*12°, (k+1)*12°)
    const k = Math.floor(diff / DEG_PER_TITHI);
    const startAngle = k * DEG_PER_TITHI;
    const endAngle = ((k + 1) % 30) * DEG_PER_TITHI;

    // Find exact start and end times near 'when'
    const start = this.findCrossing(when, startAngle);
    const end = this.findCrossing(when, ((k + 1) * DEG_PER_TITHI) % 360);

    const remainingMs = end.getTime() - when.getTime();
    const remainingMinutes = Math.max(0, Math.round(remainingMs / 60000));

    // Get lunar month information
    const adhikaMasaInfo = this.isAdhikaMasaPeriod(when);
    const masaName = adhikaMasaInfo.isAdhika 
      ? adhikaMasaInfo.masaName || this.getCurrentLunarMonth(when)
      : this.getCurrentLunarMonth(when);

    // Get specific Ekadashi name if this is Ekadashi
    let ekadasiName: string | undefined;
    if (this.isEkadashi(tithiNumber)) {
      const searchMasa = adhikaMasaInfo.isAdhika ? 'Adhika' : masaName;
      ekadasiName = this.getEkadasiName(searchMasa, paksha);
    }

    return {
      tithiNumber,
      tithiName: name,
      paksha,
      start,
      end,
      remainingMinutes,
      elapsedDegrees: intoDeg,
      remainingDegrees: DEG_PER_TITHI - intoDeg,
      ekadasiName,
      masaName,
      isAdhikaMasa: adhikaMasaInfo.isAdhika,
    };
  }

  /**
   * Check if a given tithi number is Ekadashi (11th tithi)
   */
  public isEkadashi(tithiNumber: number): boolean {
    return tithiNumber === 11 || tithiNumber === 26; // Shukla Ekadashi (11) or Krishna Ekadashi (26)
  }

  /**
   * Check if a given tithi number is Ashtami (8th tithi)
   */
  public isAshtami(tithiNumber: number): boolean {
    return tithiNumber === 8 || tithiNumber === 23; // Shukla Ashtami (8) or Krishna Ashtami (23)
  }

  /**
   * Get the current lunar month name based on date
   * This is a simplified approach - for production use, you'd want more accurate solar calculations
   */
  private getCurrentLunarMonth(date: Date): string {
    const month = date.getMonth(); // 0-11
    // Approximate mapping - lunar months start roughly mid-solar month
    const lunarMonthIndex = (month + 11) % 12; // Shift to approximate lunar calendar start
    return LUNAR_MONTHS[lunarMonthIndex];
  }

  /**
   * Check if the given date falls in an Adhika Masa period
   */
  private isAdhikaMasaPeriod(date: Date): { isAdhika: boolean; masaName?: string } {
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    for (const adhika of ADHIKA_MASA_CALENDAR) {
      if (dateString >= adhika.startDate && dateString <= adhika.endDate) {
        return { isAdhika: true, masaName: adhika.masa };
      }
    }
    
    return { isAdhika: false };
  }

  /**
   * Get the specific Ekadashi name based on lunar month and paksha
   */
  private getEkadasiName(masaName: string, paksha: 'Shukla' | 'Krishna'): string | undefined {
    const masaNames = EKADASHI_NAMES[masaName as keyof typeof EKADASHI_NAMES];
    if (masaNames) {
      return masaNames[paksha];
    }
    return undefined;
  }

  /**
   * Get tithi info for a specific date with IST timezone handling
   */
  public getTithiForDate(date: Date): TithiInfo {
    // Convert to IST if needed
    const istDate = new Date(date.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    return this.getTithiInfo(istDate);
  }

  /**
   * Get all Ekadashi dates for a given year
   */
  public getEkadasiDatesForYear(year: number): Array<{date: Date, name: string, paksha: 'Shukla' | 'Krishna', masa: string}> {
    const ekadashis: Array<{date: Date, name: string, paksha: 'Shukla' | 'Krishna', masa: string}> = [];
    
    // Check each day of the year
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const tithiInfo = this.getTithiForDate(date);
        
        if (this.isEkadashi(tithiInfo.tithiNumber) && tithiInfo.ekadasiName) {
          ekadashis.push({
            date,
            name: tithiInfo.ekadasiName,
            paksha: tithiInfo.paksha,
            masa: tithiInfo.masaName || 'Unknown'
          });
        }
      }
    }
    
    return ekadashis;
  }

  /**
   * Check if a given year has Adhika Masa
   */
  public hasAdhikaMasa(year: number): boolean {
    return ADHIKA_MASA_CALENDAR.some(adhika => adhika.year === year);
  }

  /**
   * Get Adhika Masa information for a given year
   */
  public getAdhikaMasaInfo(year: number): { masa: string; startDate: string; endDate: string } | null {
    const adhika = ADHIKA_MASA_CALENDAR.find(adhika => adhika.year === year);
    return adhika || null;
  }

  /**
   * Get all festivals from the service
   */
  public getFestivals(): FestivalEvent[] {
    return this.festivals;
  }

  /**
   * Add a new festival to the festivals array
   */
  public addFestival(festival: FestivalEvent): Observable<FestivalEvent> {
     return this.http.post<FestivalEvent>(`${environment.apiNestBaseUrl}/festivals`, festival);
  }

  }
