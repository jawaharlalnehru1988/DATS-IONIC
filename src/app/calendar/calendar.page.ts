import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  IonButton, 
  IonIcon, 
  IonContent, 
  IonModal, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, chevronForward, calendarOutline, searchOutline, settingsOutline, sunnyOutline, moonOutline, ellipsisHorizontal, closeOutline, arrowBackOutline, shareOutline, todayOutline, heart, heartOutline, addOutline, close } from 'ionicons/icons';
import { AlertController, ToastController } from '@ionic/angular';
import { ThemeService, ThemeType } from '../services/theme.service';
import { TithiService, TithiInfo, FestivalEvent } from '../services/tithi.service';
import { Subscription } from 'rxjs';
import { ReusableHeaderComponent } from '../components/reusable-header/reusable-header.component';
import { QuillModule } from 'ngx-quill';
import * as SunCalc from 'suncalc';
import { ShowForRolesDirective } from "../directives/show-for-roles.directive";


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
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    FormsModule,
    ReactiveFormsModule,
    ReusableHeaderComponent,
    QuillModule,
    ShowForRolesDirective
]
})
export class CalendarPage implements OnInit, OnDestroy {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  selectedDate: Date | null = null; // Track selected date
  selectedFestival: FestivalEvent | null = null; // Track selected festival object
  favoriteDates: string[] = []; // Track favorite dates
  calendarDays: CalendarDay[] = [];
  
  // Timeout reference for location permission request
  private locationTimeoutId: number | null = null;
  
  // Theme management
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();
  
  // Add Festival Modal
  isAddFestivalModalOpen = false;
  addFestivalForm: FormGroup;
  
  // HostBinding to apply theme class to the component's host element
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }
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

  // Important Vaishnava festival data including Ekadasi and other festivals - now managed by TithiService
  festivals: FestivalEvent[] = [];

  constructor(
    private alertController: AlertController, 
    private toastController: ToastController,
    private themeService: ThemeService,
    private tithiService: TithiService,
    private formBuilder: FormBuilder
  ) { 
    addIcons({chevronBack,chevronForward,closeOutline,ellipsisHorizontal,sunnyOutline,moonOutline,arrowBackOutline,shareOutline,addOutline,close,calendarOutline,searchOutline,settingsOutline,todayOutline,heart,heartOutline});
    
    // Initialize Add Festival Form
    this.addFestivalForm = this.formBuilder.group({
      festivalName: ['', [Validators.required]],
      otherName: [''],
      startDate: ['', [Validators.required]],
      importance: ['', [Validators.required]],
      breakfastDate: [''],
      breakfastUntil: [''],
      breakfastStartTime: [''],
      breakfastEndTime: [''],
      description: ['']
    });
  }
  ngOnInit() {
    this.loadFavorites();
    
    // Initialize festivals from service
    this.festivals = this.tithiService.getFestivals();
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(
      theme => this.currentTheme = theme
    );
    
    // Initialize with default location first
    this.userLocation = this.defaultLocation;
    this.calculateVaishnavData();
    
    // Delay location permission request by 20 seconds, but only if component is still active
    this.locationTimeoutId = window.setTimeout(() => {
      // Only show prompt if the component is still active (timeout wasn't cleared)
      if (this.locationTimeoutId !== null) {
        this.requestLocationPermission();
      }
    }, 20000);
    
    this.generateCalendar();
  }

  ngOnDestroy() {
    // Clear the location timeout to prevent prompt from showing after component is destroyed
    if (this.locationTimeoutId !== null) {
      clearTimeout(this.locationTimeoutId);
      this.locationTimeoutId = null;
    }
    
    // Unsubscribe from theme changes
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  async requestLocationPermission() {
    const alert = await this.alertController.create({
      header: 'Enhance Your Experience',
      message: 'Would you like to share your location for more accurate astronomical calculations and personalized Vaishnava calendar data? We\'re currently using Delhi, India as the default location.',
      buttons: [
        {
          text: 'Keep Default',
          role: 'cancel',
          handler: () => {
            // Keep using default location - no need to reassign
            console.log('User chose to keep default location');
          }
        },
        {
          text: 'Use My Location',
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

  calculateLunarData(date: Date, _location: LocationData) {
    // Get Julian day number
    const jd = this.getJulianDay(date);
    
    console.log('Calculating lunar data for:', date, 'Julian Day:', jd);
    
    // Use the new accurate Tithi calculation with Astronomy Engine
    const tithiInfo = this.tithiService.getTithiForDate(date);
    
    console.log('Accurate Tithi calculation:', tithiInfo);
    
    // Update vaishnav data with accurate tithi information
    this.vaishnavData.tithiNumber = tithiInfo.tithiNumber;
    this.vaishnavData.paksa = tithiInfo.paksha;
    this.vaishnavData.tithi = tithiInfo.tithiName;
    this.vaishnavData.tithiPercentageLeft = Math.round((tithiInfo.remainingDegrees / 12) * 100);
    
    // Calculate Nakshatra using moon longitude from tithi calculation
    // For now, use a simplified approach - we can enhance this later with Astronomy Engine
    const moonLong = (tithiInfo.elapsedDegrees + (tithiInfo.tithiNumber - 1) * 12) % 360;
    const nakshatraData = this.calculateNakshatra(moonLong);
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
      const currentStart = new Date(year, startDate.month, startDate.day);
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
    console.log('Calculating sun/moon times using SunCalc for:', date, 'at location:', location);
    
    // Use SunCalc library for accurate astronomical calculations
    const sunTimes = SunCalc.getTimes(date, location.latitude, location.longitude);
    const moonTimes = SunCalc.getMoonTimes(date, location.latitude, location.longitude);
    
    // Extract sunrise and sunset
    const sunrise = sunTimes.sunrise;
    const sunset = sunTimes.sunset;
    
    console.log('SunCalc sunrise:', sunrise);
    console.log('SunCalc sunset:', sunset);
    console.log('SunCalc moon times:', moonTimes);
    
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
    
    // Use SunCalc for moon rise/set times
    if (moonTimes.rise && moonTimes.set) {
      this.vaishnavData.moonrise = this.formatTime(moonTimes.rise);
      this.vaishnavData.moonset = this.formatTime(moonTimes.set);
      
      console.log('SunCalc Moon times:', {
        rise: moonTimes.rise.toLocaleString(),
        set: moonTimes.set.toLocaleString(),
        riseFormatted: this.vaishnavData.moonrise,
        setFormatted: this.vaishnavData.moonset
      });
    } else {
      // Handle cases where moon doesn't rise or set on this day
      if (moonTimes.rise) {
        this.vaishnavData.moonrise = this.formatTime(moonTimes.rise);
      } else {
        // Check previous day for moonrise
        const prevDay = new Date(date);
        prevDay.setDate(date.getDate() - 1);
        const prevMoonTimes = SunCalc.getMoonTimes(prevDay, location.latitude, location.longitude);
        if (prevMoonTimes.rise) {
          this.vaishnavData.moonrise = this.formatTime(prevMoonTimes.rise);
        } else {
          this.vaishnavData.moonrise = 'No rise';
        }
      }
      
      if (moonTimes.set) {
        this.vaishnavData.moonset = this.formatTime(moonTimes.set);
      } else {
        // Check next day for moonset
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        const nextMoonTimes = SunCalc.getMoonTimes(nextDay, location.latitude, location.longitude);
        if (nextMoonTimes.set) {
          this.vaishnavData.moonset = this.formatTime(nextMoonTimes.set);
        } else {
          this.vaishnavData.moonset = 'No set';
        }
      }
    }
  }

















  formatTime(date: Date): string {
    // Use Asia/Kolkata timezone formatting for consistent display
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const _lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayFestivals = this.getFestivalsForDate(date);
      // Use festivals array to determine Ekadashi instead of tithi calculation
      const isEkadasi = dayFestivals.some(f => f.importance === 'ekadashi');
      const hasMajorFestival = dayFestivals.some(f => f.importance === 'major-festival');
      const hasOtherFestival = dayFestivals.some(f => f.importance === 'festival');

      this.calendarDays.push({
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isCurrentMonth: date.getMonth() === this.currentMonth,
        isToday: this.isToday(date),
        festivals: dayFestivals,
        hasEkadasi: isEkadasi,
        hasOtherFestival: hasOtherFestival || hasMajorFestival
      });
    }
  }

  getFestivalsForDate(date: Date): FestivalEvent[] {
    return this.tithiService.getFestivalsForDate(date);
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
    
    // Check if it's a special day and show festival details
    this.checkAndShowFestivalDetails(day, clickedDate);
    
    console.log('Date clicked:', clickedDate);
    console.log('Updated Vaishnava data for selected date');
    
    if (day.festivals.length > 0) {
      console.log('Festivals on this date:', day.festivals);
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

  // Method to check if a date is Ekadasi based on festivals array
  isEkadasiDate(date: Date): boolean {
    // Format the date to match the festival array format (YYYY-MM-DD)
    // Use local date to avoid timezone issues
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    return this.festivals.some(festival => 
      festival.startDate === dateStr && festival.importance === 'ekadashi'
    );
  }

  // Helper methods for festival detection
  hasMajorFestival(day: CalendarDay): boolean {
    return day.festivals.some(f => f.importance === 'major-festival');
  }

  hasOtherFestival(day: CalendarDay): boolean {
    return day.festivals.some(f => f.importance === 'festival') && !this.hasMajorFestival(day) && !day.hasEkadasi;
  }

  // Method to check and show festival details for special days
  checkAndShowFestivalDetails(day: CalendarDay, date: Date) {
    // Check if it's Ekadasi from festivals array
    if (day.hasEkadasi) {
      const ekadasiFestival = day.festivals.find(f => f.importance === 'ekadashi');
      if (ekadasiFestival) {
        this.selectedFestival = ekadasiFestival;
        return;
      }
    }
    
    // Check if it has major festival
    if (this.hasMajorFestival(day)) {
      const majorFestival = day.festivals.find(f => f.importance === 'major-festival');
      if (majorFestival) {
        this.selectedFestival = majorFestival;
        return;
      }
    }
    
    // Check if it has other festival
    if (this.hasOtherFestival(day)) {
      const festival = day.festivals.find(f => f.importance === 'festival');
      if (festival) {
        this.selectedFestival = festival;
        return;
      }
    }
    
    // Clear festival info if no special day
    this.selectedFestival = null;
  }

  // Close festival details
  closeFestivalDetails() {
    this.selectedFestival = null;
  }

  // Format date for display
  formatDateString(date: Date): string {
    return `${date.getDate()} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  // Footer navigation methods
  goBack() {
    // Navigate back to previous page
    window.history.back();
  }

  isCurrentDateFavorited(): boolean {
    if (!this.selectedDate) return false;
    const dateKey = this.formatDateKey(this.selectedDate);
    return this.favoriteDates.includes(dateKey);
  }

  toggleFavorite() {
    if (!this.selectedDate) return;
    
    const dateKey = this.formatDateKey(this.selectedDate);
    const index = this.favoriteDates.indexOf(dateKey);
    
    if (index > -1) {
      // Remove from favorites
      this.favoriteDates.splice(index, 1);
      this.showToast('Date removed from favorites');
    } else {
      // Add to favorites
      this.favoriteDates.push(dateKey);
      this.showToast('Date added to favorites');
    }
    
    // Save to localStorage
    localStorage.setItem('calendar-favorites', JSON.stringify(this.favoriteDates));
  }

  async shareEvent() {
    if (!this.selectedDate) {
      this.showToast('Please select a date first');
      return;
    }

    const dateStr = this.formatDateString(this.selectedDate);
    let shareText = `📅 Vaishnava Calendar - ${dateStr}\n\n`;
    
    // Add Vaishnava info
    shareText += `🕉️ Gaurabda: ${this.vaishnavData.gaurabda}\n`;
    shareText += `📅 Masa: ${this.vaishnavData.masa}\n`;
    shareText += `🌙 Tithi: ${this.vaishnavData.tithi}\n`;
    shareText += `🌅 Sunrise: ${this.vaishnavData.sunrise}\n`;
    shareText += `🌇 Sunset: ${this.vaishnavData.sunset}\n`;
    
    // Add festival info if available
    if (this.selectedFestival) {
      shareText += `\n🎉 Festival: ${this.selectedFestival.festivalName}\n`;
      if (this.selectedFestival.description) {
        shareText += `✨ ${this.selectedFestival.description}\n`;
      }
    }

    shareText += `\n🙏 Hare Krishna!`;

    // Try native share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vaishnava Calendar',
          text: shareText
        });
      } catch {
        // Fall back to clipboard
        this.copyToClipboard(shareText);
      }
    } else {
      // Fall back to clipboard
      this.copyToClipboard(shareText);
    }
  }

  goToToday() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.selectedDate = new Date(this.currentDate);
    this.generateCalendar();
    this.calculateVaishnavData();
    this.showToast('Navigated to today');
  }

  // Helper methods
  private formatDateKey(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      cssClass: 'toast-alert'
    });
    await toast.present();
  }

  private async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Event details copied to clipboard');
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showToast('Event details copied to clipboard');
    }
  }

  // Add Festival Modal Methods
  openAddFestivalModal() {
    this.isAddFestivalModalOpen = true;
  }

  closeAddFestivalModal() {
    this.isAddFestivalModalOpen = false;
    this.addFestivalForm.reset();
  }

  onSubmitFestival(event?: Event) {
    // Prevent default form submission
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    
    // Mark all fields as touched to show validation errors
    this.addFestivalForm.markAllAsTouched();
    
    if (this.addFestivalForm.valid) {
      const formValue = this.addFestivalForm.value;
    
      this.tithiService.addFestival(formValue).subscribe({
        next: (response) => {
          console.log('Festival added successfully:', response);
          // Update local festivals array from service
          this.festivals = this.tithiService.getFestivals();
          this.showToast('Festival added successfully!', 'success');
        },
        error: (error) => {
          console.error('Error adding festival:', error);
        }
      });

      // Regenerate calendar to show new festival
      this.generateCalendar();
      
      // Close modal and show success message
      this.closeAddFestivalModal();
    } else {
      // Show validation errors
      this.showToast('Please fill all required fields correctly', 'danger');
      
      // Log specific field errors for debugging
      Object.keys(this.addFestivalForm.controls).forEach(key => {
        const control = this.addFestivalForm.get(key);
        if (control && control.errors) {
          console.log(`${key} errors:`, control.errors);
        }
      });
    }
  }

  // Load favorites from localStorage on init
  private loadFavorites() {
    const saved = localStorage.getItem('calendar-favorites');
    if (saved) {
      this.favoriteDates = JSON.parse(saved);
    }
  }
}
