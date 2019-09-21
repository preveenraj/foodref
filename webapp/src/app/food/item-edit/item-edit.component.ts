import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  editForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.editForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      'imageUrl': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      'category': new FormControl(null, Validators.required),
      'expiryDate': new FormControl(null),
      'inStock': new FormControl(null, Validators.required),
      'isDeliveryFree': new FormControl(null)
    });
  }

  onSubmitEditForm(){

  }

}
