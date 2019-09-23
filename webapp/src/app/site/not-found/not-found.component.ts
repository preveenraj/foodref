import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <div class="container-fluid">
  <div class="alert alert-secondary mt-4 col-md-6 mx-auto">Oops... Page Not Found.</div>  
  </div>
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
