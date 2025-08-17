// tithi.service.ts
// Accurate Panchang-style Tithi using apparent ecliptic longitudes.
// Library: Astronomy Engine (MIT). No location needed for tithi.

import { Injectable } from '@angular/core';
import {
  Body,
  PairLongitude,             // difference in longitudes between 2 bodies as seen from Earth
} from 'astronomy-engine';

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

@Injectable({
  providedIn: 'root'
})
export class TithiService {

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

    return {
      tithiNumber,
      tithiName: name,
      paksha,
      start,
      end,
      remainingMinutes,
      elapsedDegrees: intoDeg,
      remainingDegrees: DEG_PER_TITHI - intoDeg,
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
   * Get tithi info for a specific date with IST timezone handling
   */
  public getTithiForDate(date: Date): TithiInfo {
    // Convert to IST if needed
    const istDate = new Date(date.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    return this.getTithiInfo(istDate);
  }
}
