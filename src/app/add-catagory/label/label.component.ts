import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.css',
})
export class LabelComponent {
  @Input()
  label!: string;
  @Input()
  category!: string;
}
