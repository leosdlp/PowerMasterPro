import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AdminAuthService } from '../../admin-auth.service';
import { AvisService } from '../../avis.service';
import { Avis } from '../../avis.models';

@Component({
  selector: 'app-avis-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './avis-list.component.html',
  styleUrl: './avis-list.component.css'
})
export class AvisListComponent implements OnInit{
  avisList:Avis[] = [];
  avisTemp:any = [];
  filtreId = '';
  rechercheAvis = '';
  filtreEtoile = '';
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AdminAuthService, private router: Router, private avisService : AvisService){

  }

  ngOnInit(): void {
    this.avisList = this.avisService.getAvis();
    this.refreshAvis();
  }

  refreshAvis() {
    this.http.get(this.APIUrl + 'GetAvis').subscribe(data => {
      this.avisService.avisTemp = data;
      this.avisTemp = data;
    });
    this.avisService.setApiAvis();
    this.avisService.getAvis();
  }

  deleteAvis(id:any){
    this.http.delete(this.APIUrl+'DeleteAvis?id='+id).subscribe(data=>{
      alert(data);
    })
    this.refreshAvis();
  }

  filtrerAvis() {
    const avisList = this.avisService.getAvis();

    this.avisList = avisList.filter((avis: { username: string; id: number }) =>
      avis.username.toLowerCase().includes(this.rechercheAvis.toLowerCase())
    );

    if (this.filtreId !== '') {
      this.avisList = this.avisList.filter(avis => avis.id.toString() === this.filtreId);
    }

    if (this.filtreEtoile !== '') {
      this.avisList = this.avisList.filter(avis => avis.etoile.toString() === this.filtreEtoile);
    }
  }
}
