import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webapp';
  
  constructor(){
  console.log("%cDeveloped by Preveen Raj!", "color: #27ae60; font-size: x-large; text-shadow: 4px;");
  }
}
