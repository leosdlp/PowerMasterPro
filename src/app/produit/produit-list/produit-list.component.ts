import { Component, OnInit } from '@angular/core';
import { Produit } from '../../produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../produit.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../../fournisseur.service';
import { Fournisseur } from '../../fournisseur.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

@Component({
    selector: 'app-produit-list',
    standalone:true,
    templateUrl: './produit-list.component.html',
    styleUrls: ['./produit-list.component.css'],
    imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],

})
export class ProduitListComponent implements OnInit {
  constructor(private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private http: HttpClient) {
  }
  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];
  rechercheProduit = '';
  filtreGenre: string = '';
  filtreTaille: string = '';
  filtreEtat: string = '';
  filtreId!: number;
  filtreType: string = '';
  filtrePrix!: number;
  filtreFournisseur: string = '';
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  produitsTemp: any = [];



  ngOnInit(): void {
    this.refreshProduits();
    this.produits = this.produitService.getProduits();
    this.fournisseurs = this.fournisseurService.getFournisseurs();
  }

  refreshProduits() {
    this.http.get(this.APIUrl + 'GetProduits').subscribe(data => {
      this.produitService.produitsTemp = data;
      this.produitsTemp = data;
    });
    this.produitService.setApiProduits();
    this.produitService.getProduits();
  }

  filtrerProduits() {
    // Récupérez les produits
    const produits = this.produitService.getProduits();

    // Filtrer par recherche
    this.produits = produits.filter(produit =>
      produit.nom.toLowerCase().includes(this.rechercheProduit.toLowerCase())
    );

    if (this.filtreTaille !== '') {
      this.produits = this.produits.filter(produit => produit.taille === this.filtreTaille);
    }
    if (this.filtreGenre !== '') {
      this.produits = this.produits.filter(produit => produit.genre === this.filtreGenre);
    }
    if (this.filtreEtat !== '') {
      this.produits = this.produits.filter(produit => produit.etat === this.filtreEtat);
    }
    if (this.filtreFournisseur !== '') {
      this.produits = this.produits.filter(produit => produit.fournisseur === this.filtreFournisseur);
    }
    if (this.filtreId === null || this.filtreId === undefined || this.filtreId.toString().trim() === '') {
      this.filtreId = 0;
    }
    if (this.filtreId !== 0) {
      this.produits = this.produits.filter(produit => produit.id === this.filtreId);
    }
    if (this.filtreType !== '') {
      this.produits = this.produits.filter(produit => produit.type === this.filtreType);
    }
    if (this.filtrePrix === null || this.filtrePrix === undefined || this.filtrePrix.toString().trim() === '') {
      this.filtrePrix = 0;
    }
    if (this.filtrePrix !== 0) {
      this.produits = this.produits.filter(produit => produit.prix <= this.filtrePrix);
    }
  }

  modifierProduit(id: number) {
    this.produitService.setSelectedProduitId(id);
    this.router.navigate(['/produit-modifier', id]);
  }

  supprimerProduit(id: number) {
    this.produitService.deleteProduit(id);
    this.deleteProduits(id);
    this.refreshProduits();
    this.filtrerProduits();
  }

  deleteProduits(id:any){
    this.http.delete(this.APIUrl+'DeleteProduits?id='+id).subscribe(data=>{
      alert(data);
      this.refreshProduits();
    })
  }
}
