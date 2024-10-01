import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../../produit.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../../../fournisseur.service';
import { Fournisseur } from '../../../fournisseur.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { PanierService } from '../../../panier.service';
import { AdminAuthService } from '../../../admin-auth.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-produit-commander-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './produit-commander-list.component.html',
  styleUrl: './produit-commander-list.component.css'
})
export class ProduitCommanderListComponent implements OnInit {
  produitId: number = 0;
  produits: Produit[] = [];
  fournisseurs : Fournisseur [] = [];
  produitForm: FormGroup;
  produit: Produit | undefined;
  panierList: { [key: string]: Produit } = {};


  constructor(private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private panierService: PanierService, private authService: AdminAuthService) {
    this.produitForm = this.fb.group({
      id:[],
      nom: [''],
      type: [''],
      genre: [''],
      taille: [''],
      prix: [],
      etat: [''],
      fournisseur: [''],
      nombre: [],
    });
  }

  ngOnInit(): void {
    this.fournisseurs = this.fournisseurService.getFournisseurs();
    this.produitId = this.produitService.getSelectedProduitId();
    this.produit = this.produitService.getProduitById(this.produitId);
  }

  ajouterPanier(): void {
    if(this.produit){
      this.panierService.ajouterAuPanier(this.produit);
      this.router.navigate(['/panier']);
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
