import { Component, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [IonAccordion, IonAccordionGroup, IonItem, IonLabel],
})
export class ArticlesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
