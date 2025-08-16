import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TutorialService } from '../tutorial/tutorial.service';
import { PoojaRulesModel } from '../tutorial/tutorial.model';
import { ReusableHeaderComponent } from '../components';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.page.html',
  styleUrls: ['./tutorial-details.page.scss'],
  standalone: true,
  imports: [ReusableHeaderComponent, FormsModule]
})
export class TutorialDetailsPage implements OnInit {
  isLoading = true;

  poojaRules: PoojaRulesModel[] = [];

  constructor(private sanitizer: DomSanitizer, private tutorialService: TutorialService) {}

  ngOnInit() {

    
  }


  sanitizeContent(item:string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(item);
  }

}
