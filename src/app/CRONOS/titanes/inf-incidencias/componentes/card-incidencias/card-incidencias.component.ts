import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { RouterPreloader } from '@angular/router';
import { Location } from '@angular/common';
import { async } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { InformeLimpiezaCrudService } from 'src/app/Servicios/informe-limpieza-crud.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import jsPDF  from 'jspdf';
import { style } from '@angular/animations';

@Component({
  selector: 'app-card-incidencias',
  templateUrl: './card-incidencias.component.html',
  styleUrls: ['./card-incidencias.component.css']
})
export class CardIncidenciasComponent {

  fechahoy:Date=new Date()

  @ViewChild('content', {static:false}) el!:ElementRef;

  downloadPDF(){
    let pdf = new jsPDF('p','pt','a2');
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        //pdf.addImage("../../../../../assets/logo_sitmah.jpeg", "JPEG",50, 50, 50, 50);
        pdf.setFontSize(25);
        //pdf.text('ACCIDENTE AUTOMOVILISTICO',40,30);
        pdf.save('ACCIDENTE DEL DIA'+ (this.fechahoy) + '.pdf');
      }
    })
    
  }

  accidentes:any=[];
  

  constructor (private http:HttpClient, private location: Location, private sanitizer:DomSanitizer){
  };

  getAccidenteAHT(){
    this.http.get('https://prueba252.somee.com/api/Informe_de_Accidente_de_hoy').subscribe(response=>{
     this.accidentes=response
     console.log(this.accidentes)
     
    })
    }   
   ngOnInit(): void {
    setInterval(() => {
       this.getAccidenteAHT();
      },1000)
   }


}
