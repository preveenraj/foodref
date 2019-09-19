import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
  <div class="banner-image jumbotron">
    <app-search></app-search>
  </div>
  `,
  styles: []
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
