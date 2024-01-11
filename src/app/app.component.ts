import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('slideInFromTop', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition('void => *', [
        animate('500ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
  }
  title = 'landing-page';
}
