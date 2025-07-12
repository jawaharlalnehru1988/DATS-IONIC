import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, chevronForward, calendarOutline, searchOutline, settingsOutline, sunnyOutline, moonOutline, ellipsisHorizontal } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';

interface FestivalEvent {
  id: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  festivalName: string;
  importance: string;
}

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  festivals: FestivalEvent[];
  hasEkadasi: boolean;
  hasOtherFestival: boolean;
}

interface VaishnavData {
  gaurabda: number;
  masa: string;
  masaDateRange: string;
  tithi: string;
  brahmahmuhurta: string;
  sunrise: string;
  noon: string;
  sunset: string;
  daylight: string;
  paksa: string;
  moonrise: string;
  moonset: string;
  tithiNumber: number;
  tithiPercentageLeft: number;
  nakshatra: string;
  pada: number;
}

interface LocationData {
  latitude: number;
  longitude: number;
  timezone: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons]
})
export class CalendarPage implements OnInit {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  selectedDate: Date | null = null; // Track selected date
  calendarDays: CalendarDay[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dayNames = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  // Tithi names
  tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
  ];

  // Nakshatra names
  nakshatraNames = [
    'Aswani', 'Bharani', 'Kritika', 'Rohini', 'Mrigshira', 'Ardra',
    'Punarvasu', 'Pushya', 'Aslesha', 'Magha', 'Poorvaphalguni', 'Uttaraphalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakaha', 'Anuradha', 'Jyestha',
    'Moola', 'Poorvaashada', 'Uttaraashada', 'Sharavan', 'Dhanishta',
    'Shatbhisa', 'Poorvabhadrapada', 'Uttarbhadrapada', 'Revati'
  ];

  // Location data
  userLocation: LocationData | null = null;
  defaultLocation: LocationData = {
    latitude: 12.9716, // Bangalore
    longitude: 77.5946,
    timezone: 'Asia/Kolkata'
  };

  // Vaishnava calendar info - will be calculated dynamically
  vaishnavData: VaishnavData = {
    gaurabda: 0,
    masa: '',
    masaDateRange: '',
    tithi: '',
    brahmahmuhurta: '',
    sunrise: '',
    noon: '',
    sunset: '',
    daylight: '',
    paksa: '',
    moonrise: '',
    moonset: '',
    tithiNumber: 0,
    tithiPercentageLeft: 0,
    nakshatra: '',
    pada: 0
  };

  // Sample festival data
  festivals: FestivalEvent[] = [
    {
      id: '1',
      startDate: '2025-07-06',
      endDate: '2025-07-06',
      startTime: '05:00',
      endTime: '23:59',
      festivalName: 'Ekadasi',
      importance: 'ekadasi'
    },
    {
      id: '2',
      startDate: '2025-07-21',
      endDate: '2025-07-21',
      startTime: '05:00',
      endTime: '23:59',
      festivalName: 'Ekadasi',
      importance: 'ekadasi'
    },
    {
      id: '3',
      startDate: '2025-07-01',
      endDate: '2025-07-01',
      startTime: '06:00',
      endTime: '18:00',
      festivalName: 'Ratha Yatra',
      importance: 'festival'
    },
    {
      id: '4',
      startDate: '2025-07-05',
      endDate: '2025-07-05',
      startTime: '06:00',
      endTime: '18:00',
      festivalName: 'Gundica Marjana',
      importance: 'festival'
    },
    {
      id: '5',
      startDate: '2025-07-10',
      endDate: '2025-07-10',
      startTime: '06:00',
      endTime: '18:00',
      festivalName: 'Krishna Janmashtami',
      importance: 'festival'
    },
    {
      id: '6',
      startDate: '2025-07-15',
      endDate: '2025-07-15',
      startTime: '06:00',
      endTime: '18:00',
      festivalName: 'Radhashtami',
      importance: 'festival'
    },
    {
      id: '7',
      startDate: '2025-07-18',
      endDate: '2025-07-18',
      startTime: '06:00',
      endTime: '18:00',
      festivalName: 'Govardhana Puja',
      importance: 'festival'
    },
    {
      id: '8',
      startDate: '2025-07-19',
      endDate: '2025-07-19',
      startTime: '06:00',
      endTime: '18:00',
      festivalName: 'Govinda Dwadasi',
      importance: 'festival'
    },
    {
      id: '9',
      startDate: '2025-07-28',
      endDate: '2025-07-28',
      startTime: '06:00',
      endTime: '18:00',
      festivalName: 'Sharad Purnima',
      importance: 'festival'
    }
  ];

  constructor(private alertController: AlertController) { 
    addIcons({
      chevronBack,
      chevronForward,
      calendarOutline,
      searchOutline,
      settingsOutline,
      sunnyOutline,
      moonOutline,
      ellipsisHorizontal
    });
  }
  ngOnInit() {
    this.requestLocationPermission();
    this.generateCalendar();
  }

  async requestLocationPermission() {
    const alert = await this.alertController.create({
      header: 'Location Access',
      message: 'This app would like to access your location to provide accurate astronomical calculations. If you deny, we\'ll use default India location.',
      buttons: [
        {
          text: 'Deny',
          role: 'cancel',
          handler: () => {
            this.userLocation = this.defaultLocation;
            this.calculateVaishnavData();
          }
        },
        {
          text: 'Allow',
          handler: () => {
            this.getCurrentLocation();
          }
        }
      ]
    });

    await alert.present();
  }

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          };
          this.calculateVaishnavData();
        },
        (error) => {
          console.error('Error getting location:', error);
          this.userLocation = this.defaultLocation;
          this.calculateVaishnavData();
        }
      );
    } else {
      this.userLocation = this.defaultLocation;
      this.calculateVaishnavData();
    }
  }

  calculateVaishnavData(targetDate?: Date) {
    // Use the specified date, or current date if none provided
    const displayDate = targetDate || new Date(this.currentYear, this.currentMonth, new Date().getDate());
    const location = this.userLocation || this.defaultLocation;
    
    console.log('Calculating for date:', displayDate);
    console.log('Using location:', location);
    
    // Calculate Gaurabda (from Lord Caitanya's birth - February 18, 1486)
    const currentYear = displayDate.getFullYear();
    this.vaishnavData.gaurabda = currentYear - 1486;

    // Calculate astronomical positions
    this.calculateLunarData(displayDate, location);
    this.calculateSunMoonTimes(displayDate, location);
  }

  calculateLunarData(date: Date, location: LocationData) {
    // Get Julian day number
    const jd = this.getJulianDay(date);
    
    console.log('Calculating lunar data for:', date, 'Julian Day:', jd);
    
    // Calculate Sun and Moon positions (simplified calculation)
    const sunLongitude = this.getSunLongitude(jd);
    const moonLongitude = this.getMoonLongitude(jd);
    
    console.log('Sun longitude:', sunLongitude, 'Moon longitude:', moonLongitude);
    
    // Calculate Tithi
    const tithiData = this.calculateTithi(moonLongitude, sunLongitude);
    this.vaishnavData.tithiNumber = tithiData.number;
    this.vaishnavData.tithiPercentageLeft = tithiData.percentageLeft;
    
    // Determine Paksa and Tithi name
    if (tithiData.number <= 15) {
      this.vaishnavData.paksa = 'Shukla'; // Bright half
      this.vaishnavData.tithi = this.tithiNames[tithiData.number - 1];
    } else {
      this.vaishnavData.paksa = 'Krishna'; // Dark half
      const darkTithi = tithiData.number - 15;
      this.vaishnavData.tithi = this.tithiNames[darkTithi - 1];
    }
    
    console.log('Final tithi calculation:', {
      tithiNumber: tithiData.number,
      paksa: this.vaishnavData.paksa,
      tithiName: this.vaishnavData.tithi,
      percentageLeft: tithiData.percentageLeft
    });
    
    // Calculate Nakshatra
    const nakshatraData = this.calculateNakshatra(moonLongitude);
    this.vaishnavData.nakshatra = this.nakshatraNames[nakshatraData.number - 1];
    this.vaishnavData.pada = nakshatraData.pada;
    
    // Set masa (month) - based on lunar calendar
    const masaData = this.getVaishnavMasa(date);
    this.vaishnavData.masa = masaData.name;
    this.vaishnavData.masaDateRange = masaData.dateRange;
  }

  getJulianDay(date: Date): number {
    const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
    const y = date.getFullYear() + 4800 - a;
    const m = (date.getMonth() + 1) + 12 * a - 3;
    
    return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
           Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  getSunLongitude(jd: number): number {
    // Simplified sun longitude calculation
    const n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
    const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) % 360;
    return lambda;
  }

  getMoonLongitude(jd: number): number {
    // More accurate moon longitude calculation
    const n = jd - 2451545.0;
    const L = (218.316 + 13.176396 * n) % 360;
    const M = ((134.963 + 13.064993 * n) % 360) * Math.PI / 180;
    const F = ((93.272 + 13.229350 * n) % 360) * Math.PI / 180;
    const D = ((297.850 + 12.190749 * n) % 360) * Math.PI / 180;
    
    // Main lunar longitude with perturbations
    let lambda = L + 6.289 * Math.sin(M) 
                   + 1.274 * Math.sin(2 * D - M)
                   + 0.658 * Math.sin(2 * D)
                   + 0.214 * Math.sin(2 * M)
                   - 0.186 * Math.sin(((357.53 + 0.98560 * n) % 360) * Math.PI / 180)
                   - 0.059 * Math.sin((2 * D - 2 * M))
                   - 0.057 * Math.sin((2 * D - M - ((357.53 + 0.98560 * n) % 360) * Math.PI / 180))
                   + 0.053 * Math.sin((2 * D + M))
                   + 0.046 * Math.sin((2 * D - ((357.53 + 0.98560 * n) % 360) * Math.PI / 180))
                   + 0.041 * Math.sin((M - ((357.53 + 0.98560 * n) % 360) * Math.PI / 180));
    
    return lambda % 360;
  }

  calculateTithi(moonLongitude: number, sunLongitude: number): {number: number, percentageLeft: number} {
    // Calculate the moon-sun longitude difference
    let diff = moonLongitude - sunLongitude;
    
    // Normalize to 0-360 range
    if (diff < 0) {
      diff += 360;
    }
    
    // Each tithi spans 12 degrees
    const tithiValue = diff / 12;
    
    // Tithi number (1-30, where 30 is actually the next month's Pratipada)
    let tithiNumber = Math.floor(tithiValue) + 1;
    
    // Handle the case where we get tithi 31 (should be 1 of next cycle)
    if (tithiNumber > 30) {
      tithiNumber = 1;
    }
    
    // Calculate percentage left in current tithi
    const decimalPart = tithiValue - Math.floor(tithiValue);
    const percentageLeft = (1 - decimalPart) * 100;
    
    console.log('Tithi calculation debug:', {
      moonLongitude,
      sunLongitude,
      diff,
      tithiValue,
      tithiNumber,
      percentageLeft
    });
    
    return {
      number: tithiNumber,
      percentageLeft: Math.round(percentageLeft * 100) / 100
    };
  }

  calculateNakshatra(moonLongitude: number): {number: number, pada: number} {
    // Each nakshatra spans 13.333... degrees (360/27)
    const nakshatraSpan = 360 / 27;
    const nakshatraValue = moonLongitude / nakshatraSpan;
    const nakshatraNumber = Math.floor(nakshatraValue) + 1;
    
    // Calculate pada (1-4 for each nakshatra)
    const decimalPart = nakshatraValue - Math.floor(nakshatraValue);
    const pada = Math.floor(decimalPart * 4) + 1;
    
    console.log('Nakshatra calculation debug:', {
      moonLongitude,
      nakshatraSpan,
      nakshatraValue,
      nakshatraNumber,
      pada
    });
    
    return {
      number: nakshatraNumber > 27 ? 1 : nakshatraNumber,
      pada: pada > 4 ? 4 : pada
    };
  }

  getVaishnavMasa(date: Date): {name: string, dateRange: string} {
    // Vaishnava months based on lunar calculations
    const vaishnavMonths = [
      { name: 'Vishnu', englishRange: 'March-April' },
      { name: 'Madhusudana', englishRange: 'April-May' },
      { name: 'Trivikrama', englishRange: 'May-June' },
      { name: 'Vamana', englishRange: 'June-July' },
      { name: 'Sridhara', englishRange: 'July-August' },
      { name: 'Hrsikesa', englishRange: 'August-September' },
      { name: 'Padmanabha', englishRange: 'September-October' },
      { name: 'Damodara', englishRange: 'October-November' },
      { name: 'Kesava', englishRange: 'November-December' },
      { name: 'Narayana', englishRange: 'December-January' },
      { name: 'Madhava', englishRange: 'January-February' },
      { name: 'Govinda', englishRange: 'February-March' }
    ];

    // Calculate which Vaishnava month we're in based on the date
    // For now, using a simplified approach based on the information provided
    // Sridhara: July 11, 2025 - August 10, 2025
    // Hrsikesa: August 10, 2025 - September 9, 2025 (approximately)
    
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-based
    const day = date.getDate();
    
    // Define the approximate start dates for each Vaishnava month in 2025
    const monthStartDates = [
      { month: 2, day: 12 },  // Vishnu (March 12)
      { month: 3, day: 11 },  // Madhusudana (April 11)
      { month: 4, day: 10 },  // Trivikrama (May 10)
      { month: 5, day: 9 },   // Vamana (June 9)
      { month: 6, day: 11 },  // Sridhara (July 11)
      { month: 7, day: 10 },  // Hrsikesa (August 10)
      { month: 8, day: 9 },   // Padmanabha (September 9)
      { month: 9, day: 8 },   // Damodara (October 8)
      { month: 10, day: 7 },  // Kesava (November 7)
      { month: 11, day: 7 },  // Narayana (December 7)
      { month: 0, day: 6 },   // Madhava (January 6)
      { month: 1, day: 5 }    // Govinda (February 5)
    ];
    
    // Find current Vaishnava month
    let currentMonthIndex = 0;
    
    for (let i = 0; i < monthStartDates.length; i++) {
      const startDate = monthStartDates[i];
      const nextIndex = (i + 1) % 12;
      const nextStartDate = monthStartDates[nextIndex];
      
      // Create actual date objects for comparison
      let currentStart = new Date(year, startDate.month, startDate.day);
      let nextStart = new Date(year, nextStartDate.month, nextStartDate.day);
      
      // Handle year wrap-around
      if (nextStartDate.month < startDate.month) {
        nextStart = new Date(year + 1, nextStartDate.month, nextStartDate.day);
      }
      
      if (date >= currentStart && date < nextStart) {
        currentMonthIndex = i;
        break;
      }
    }
    
    // Special handling for edge cases around year boundaries
    if (month === 11 && day >= 7) {
      currentMonthIndex = 9; // Narayana
    } else if (month === 0 && day < 6) {
      currentMonthIndex = 9; // Narayana (continues into January)
    } else if (month === 0 && day >= 6) {
      currentMonthIndex = 10; // Madhava
    } else if (month === 1 && day < 5) {
      currentMonthIndex = 10; // Madhava (continues into February)
    } else if (month === 1 && day >= 5) {
      currentMonthIndex = 11; // Govinda
    } else if (month === 2 && day < 12) {
      currentMonthIndex = 11; // Govinda (continues into March)
    }
    
    const selectedMonth = vaishnavMonths[currentMonthIndex];
    
    return {
      name: selectedMonth.name,
      dateRange: selectedMonth.englishRange
    };
  }

  calculateSunMoonTimes(date: Date, location: LocationData) {
    console.log('Calculating sun/moon times for:', date, 'at location:', location);
    
    // Calculate sunrise and sunset with proper timezone handling
    const sunrise = this.calculateSunrise(date, location.latitude, location.longitude);
    const sunset = this.calculateSunset(date, location.latitude, location.longitude);
    
    console.log('Calculated sunrise:', sunrise);
    console.log('Calculated sunset:', sunset);
    
    // Calculate noon as midpoint
    const noon = new Date((sunrise.getTime() + sunset.getTime()) / 2);
    
    this.vaishnavData.sunrise = this.formatTime(sunrise);
    this.vaishnavData.sunset = this.formatTime(sunset);
    this.vaishnavData.noon = this.formatTime(noon);
    
    // Calculate brahma muhurta (1.5 hours before sunrise)
    const brahmaMuhurta = new Date(sunrise.getTime() - 90 * 60000); // 90 minutes before
    this.vaishnavData.brahmahmuhurta = this.formatTime(brahmaMuhurta);
    
    console.log('Brahma muhurta calculated:', brahmaMuhurta, 'formatted:', this.vaishnavData.brahmahmuhurta);
    
    // Calculate daylight duration
    const daylightMs = sunset.getTime() - sunrise.getTime();
    const hours = Math.floor(daylightMs / (1000 * 60 * 60));
    const minutes = Math.floor((daylightMs % (1000 * 60 * 60)) / (1000 * 60));
    this.vaishnavData.daylight = `${hours}h ${minutes}m`;
    
    // Calculate more accurate moon rise/set times
    const moonTimes = this.calculateMoonTimes(date, location.latitude, location.longitude);
    this.vaishnavData.moonrise = this.formatTime(moonTimes.rise);
    this.vaishnavData.moonset = this.formatTime(moonTimes.set);
  }

  calculateMoonTimes(date: Date, latitude: number, longitude: number): {rise: Date, set: Date} {
    const jd = this.getJulianDay(date);
    
    // Get moon's position
    const moonLongitude = this.getMoonLongitude(jd);
    const moonRA = moonLongitude; // Simplified: using longitude as right ascension
    
    // Calculate moon's declination (simplified)
    const moonDeclination = 23.45 * Math.sin((moonLongitude + 90) * Math.PI / 180);
    
    // Calculate hour angle for moonrise/set
    const latRad = latitude * Math.PI / 180;
    const decRad = moonDeclination * Math.PI / 180;
    
    const argument = -Math.tan(latRad) * Math.tan(decRad);
    
    if (argument < -1 || argument > 1) {
      // Moon never rises or sets
      const fallbackRise = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 25);
      const fallbackSet = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 14);
      return { rise: fallbackRise, set: fallbackSet };
    }
    
    const hourAngle = Math.acos(argument) * 180 / Math.PI;
    
    // Calculate moon rise and set times
    const moonRiseTime = 12 - hourAngle / 15 + (moonRA - longitude) / 15;
    const moonSetTime = 12 + hourAngle / 15 + (moonRA - longitude) / 15;
    
    // Apply timezone correction
    const timezoneOffset = -date.getTimezoneOffset() / 60;
    
    const riseHour = Math.floor((moonRiseTime + timezoneOffset) % 24);
    const riseMinute = Math.floor(((moonRiseTime + timezoneOffset) % 1) * 60);
    
    const setHour = Math.floor((moonSetTime + timezoneOffset) % 24);
    const setMinute = Math.floor(((moonSetTime + timezoneOffset) % 1) * 60);
    
    const moonrise = new Date(date.getFullYear(), date.getMonth(), date.getDate(), riseHour, riseMinute);
    const moonset = new Date(date.getFullYear(), date.getMonth(), date.getDate(), setHour, setMinute);
    
    // If moonset is before moonrise, it's the next day
    if (moonset.getTime() < moonrise.getTime()) {
      moonset.setDate(moonset.getDate() + 1);
    }
    
    return { rise: moonrise, set: moonset };
  }

  calculateSunrise(date: Date, latitude: number, longitude: number): Date {
    // Simplified but more accurate sunrise calculation
    const jd = this.getJulianDay(date);
    
    // Calculate solar declination
    const P = Math.asin(0.39795 * Math.cos(0.98563 * (jd - 173) * Math.PI / 180));
    const argument = -Math.tan(latitude * Math.PI / 180) * Math.tan(P);
    
    if (argument < -1 || argument > 1) {
      // Polar day or night
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0);
    }
    
    const HA = Math.acos(argument) * 180 / Math.PI;
    
    // Calculate sunrise time in hours (local solar time)
    const sunriseTime = 12 - HA / 15;
    
    // Apply longitude correction (4 minutes per degree)
    const timeCorrection = longitude / 15; // longitude correction in hours
    const correctedTime = sunriseTime - timeCorrection;
    
    // Get device timezone offset in hours
    const deviceTimezoneOffset = -date.getTimezoneOffset() / 60; // Convert minutes to hours and flip sign
    const localTime = correctedTime + deviceTimezoneOffset;
    
    const hours = Math.floor(localTime) % 24;
    const minutes = Math.floor((localTime - Math.floor(localTime)) * 60);
    
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
  }

  calculateSunset(date: Date, latitude: number, longitude: number): Date {
    // Simplified but more accurate sunset calculation
    const jd = this.getJulianDay(date);
    
    // Calculate solar declination
    const P = Math.asin(0.39795 * Math.cos(0.98563 * (jd - 173) * Math.PI / 180));
    const argument = -Math.tan(latitude * Math.PI / 180) * Math.tan(P);
    
    if (argument < -1 || argument > 1) {
      // Polar day or night
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0);
    }
    
    const HA = Math.acos(argument) * 180 / Math.PI;
    
    // Calculate sunset time in hours (local solar time)
    const sunsetTime = 12 + HA / 15;
    
    // Apply longitude correction (4 minutes per degree)
    const timeCorrection = longitude / 15; // longitude correction in hours
    const correctedTime = sunsetTime - timeCorrection;
    
    // Get device timezone offset in hours
    const deviceTimezoneOffset = -date.getTimezoneOffset() / 60; // Convert minutes to hours and flip sign
    const localTime = correctedTime + deviceTimezoneOffset;
    
    const hours = Math.floor(localTime) % 24;
    const minutes = Math.floor((localTime - Math.floor(localTime)) * 60);
    
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
  }

  formatTime(date: Date): string {
    // Use local timezone formatting
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayFestivals = this.getFestivalsForDate(date);
      const hasEkadasi = dayFestivals.some(f => f.importance === 'ekadasi');
      const hasOtherFestival = dayFestivals.some(f => f.importance === 'festival');

      this.calendarDays.push({
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isCurrentMonth: date.getMonth() === this.currentMonth,
        isToday: this.isToday(date),
        festivals: dayFestivals,
        hasEkadasi,
        hasOtherFestival
      });
    }
  }

  getFestivalsForDate(date: Date): FestivalEvent[] {
    const dateStr = date.toISOString().split('T')[0];
    return this.festivals.filter(festival => festival.startDate === dateStr);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    // Reset selected date when changing months
    this.selectedDate = null;
    this.generateCalendar();
    this.calculateVaishnavData(); // Recalculate for the new month
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    // Reset selected date when changing months
    this.selectedDate = null;
    this.generateCalendar();
    this.calculateVaishnavData(); // Recalculate for the new month
  }

  getCurrentMonthYear(): string {
    return `${this.currentDate.getDate()} ${this.monthNames[this.currentMonth]} ${this.currentYear}`;
  }

  onDateClick(day: CalendarDay) {
    // Create the clicked date object
    const clickedDate = new Date(day.year, day.month, day.date);
    
    // Update the selected date
    this.selectedDate = clickedDate;
    
    // Calculate Vaishnava data for the clicked date
    this.calculateVaishnavData(clickedDate);
    
    console.log('Date clicked:', clickedDate);
    console.log('Updated Vaishnava data for selected date');
    
    if (day.festivals.length > 0) {
      console.log('Festivals on this date:', day.festivals);
      // You can show a modal or navigate to festival details
    }
  }

  // Helper method to check if a day is selected
  isDateSelected(day: CalendarDay): boolean {
    if (!this.selectedDate) return false;
    
    return this.selectedDate.getDate() === day.date &&
           this.selectedDate.getMonth() === day.month &&
           this.selectedDate.getFullYear() === day.year;
  }

  // Helper method to format selected date for display
  getFormattedSelectedDate(): string {
    if (!this.selectedDate) return '';
    
    const day = this.selectedDate.getDate();
    const month = this.monthNames[this.selectedDate.getMonth()];
    const year = this.selectedDate.getFullYear();
    
    return `${day} ${month} ${year}`;
  }
}
