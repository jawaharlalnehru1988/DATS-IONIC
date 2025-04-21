import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  imports: [
    ReactiveFormsModule, IonicModule, NgFor, NgIf
  ]
})
export class AuthFormComponent implements OnInit {
  @Input() fields: { name: string, type: string, label: string }[] = [];
  @Input() buttonLabel: string = 'Submit';
  @Output() formSubmit = new EventEmitter<any>();

  authForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = ['', Validators.required];
    });
    this.authForm = this.fb.group(group);
  }

  submit() {
    if (this.authForm.valid) {
      this.formSubmit.emit(this.authForm.value);
    }
  }
}
