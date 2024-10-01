import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AdminAuthService } from '../admin-auth.service';
import { AvisService } from '../avis.service';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './avis.component.html',
  styleUrl: './avis.component.css'
})
export class AvisComponent implements OnInit{
  avisList:any = [];
  avisTemp:any = [];
  description:string = '';
  etoile:string = "";
  fournisseurForm!: FormGroup;
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AdminAuthService, private router: Router, private avisService : AvisService){

  }
  ngOnInit(): void {
    this.avisList = this.avisService.getAvis();
    this.refreshAvis();
  }

  addAvis() {
    const newdescription = this.description;
    const newUsername = this.authService.getUsername();
    const newEtoile = this.etoile;

    if (!newdescription || !newEtoile) {
      alert("description and etoile are required");
      return;
    }
    if (!newUsername) {
      alert("You must be logged in");
      return;
    }
    const formData = new FormData();
    formData.append("description", newdescription);
    formData.append("etoile", newEtoile);
    formData.append("username", newUsername);

    this.http.post(this.APIUrl + 'AddAvis', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error adding fournisseur');
    });
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
}
