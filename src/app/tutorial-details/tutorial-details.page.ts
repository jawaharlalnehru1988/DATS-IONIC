import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAccordion, IonAccordionGroup, IonSpinner, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TutorialService } from '../tutorial/tutorial.service';
import { PoojaRulesModel } from '../tutorial/tutorial.model';
import { map } from 'rxjs';
import { ReusableHeaderComponent } from '../components';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.page.html',
  styleUrls: ['./tutorial-details.page.scss'],
  standalone: true,
  imports: [ IonContent, ReusableHeaderComponent,  IonSpinner, IonItem, IonLabel, IonAccordion, IonAccordionGroup, IonItem, IonLabel, CommonModule, FormsModule]
})
export class TutorialDetailsPage implements OnInit {
  isLoading = true;

  poojaRules: PoojaRulesModel[] = [];

  constructor(private sanitizer: DomSanitizer, private tutorialService: TutorialService) {}

  ngOnInit() {
 this.tutorialService.getTutorials().pipe(
     map(arr => arr.sort((a, b) => (a.orderNo) - (b.orderNo)))
   ).subscribe({
      next: (data) => {
        this.poojaRules = data;
       this.isLoading = false;
      },
      error: (error) => {
       this.isLoading = false;
        console.error('Error fetching tutorials:', error);
      }
    });
    
  }


  sanitizeContent(item:string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(item);
  }

}
