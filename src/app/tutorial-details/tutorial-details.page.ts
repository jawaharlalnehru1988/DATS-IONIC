import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TutorialService } from '../tutorial/tutorial.service';
import { PoojaRulesModel } from '../tutorial/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.page.html',
  styleUrls: ['./tutorial-details.page.scss'],
  standalone: true,
  imports: [ IonContent, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton]
})
export class TutorialDetailsPage implements OnInit {


  poojaRules: PoojaRulesModel[] = [];

  constructor(private sanitizer: DomSanitizer, private tutorialService: TutorialService) {}

  ngOnInit() {
 this.tutorialService.getTutorials().subscribe({
      next: (data) => {
        this.poojaRules = data;
      },
      error: (error) => {
        console.error('Error fetching tutorials:', error);
      }
    });
    
  }


  sanitizeContent(item:string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(item);
  }

}
