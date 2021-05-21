import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pdf-form',
  templateUrl: './pdf-form.component.html',
  styleUrls: ['./pdf-form.component.css']
})
export class PdfFormComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.info);
    
  }

}
