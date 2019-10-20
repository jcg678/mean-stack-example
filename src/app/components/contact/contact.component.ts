import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider: number;
  public anchuraToSlider: number;
  public captions: boolean;
  public autor: any;

  constructor() { 
  	this.captions = true;
  }

  ngOnInit() {
  	
  }


  cargarSlider(){
  	this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
  	this.anchuraToSlider = 0;
  }

  getAutor(event){
  	this.autor = event;
  }
}
