import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../fournisseur.model';
import { CommonModule } from '@angular/common';
import { FournisseurService } from '../../fournisseur.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-fournisseur-list',
  standalone: true,
  templateUrl: './fournisseur-list.component.html',
  styleUrl: './fournisseur-list.component.css',
  imports: [CommonModule,RouterOutlet,RouterModule, FormsModule, HttpClientModule],
})

export class FournisseurListComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  rechercheFournisseur = '';
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  fournisseursTemp: any = [];

  constructor(private fournisseurService: FournisseurService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.refreshFournisseurs();
    this.fournisseurs = this.fournisseurService.getFournisseurs();
  }

  filtrerFournisseurs() {
    if (this.rechercheFournisseur === '') {
      this.fournisseurs = this.fournisseurService.getFournisseurs();
    } else {
      this.fournisseurs = this.fournisseurService.getFournisseurs().filter(fournisseur =>
        fournisseur.nom.toLowerCase().includes(this.rechercheFournisseur.toLowerCase())
      );
    }
  }

  modifierFournisseur(id: number) {
    this.fournisseurService.setSelectedFournisseurId(id);
    this.router.navigate(['/fournisseur-modifier', id]);
  }

  supprimerFournisseur(id: number) {
    this.fournisseurService.deleteFournisseur(id);
    this.deleteUsers(id);
    this.refreshFournisseurs();
    this.filtrerFournisseurs();
  }

  refreshFournisseurs() {
    this.http.get(this.APIUrl + 'GetFournisseurs').subscribe(data => {
      this.fournisseurService.fournisseursTemp = data;
      this.fournisseursTemp = data;
    });
    this.fournisseurService.setApiFournisseurs();
    this.fournisseurService.getFournisseurs();
  }

  deleteUsers(id:any){
    this.http.delete(this.APIUrl+'DeleteFournisseurs?id='+id).subscribe(data=>{
      alert(data);
      })
    this.refreshFournisseurs();
  }
}
