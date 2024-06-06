import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css',
})
export class FormErrorsComponent {
  @Input()
  msg!: string;
}
