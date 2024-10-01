import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../panier.service';
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
import { ProduitCommanderListComponent } from '../../produit/produit-commander/produit-commander-list/produit-commander-list.component';


@Component({
  selector: 'app-panier-facture-pdf',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './panier-facture-pdf.component.html',
  styleUrl: './panier-facture-pdf.component.css',
})
export class PanierFacturePdfComponent implements OnInit {
  panierList: { [key: string]: Produit } = {};
  constructor(private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private produitCommanderListComponent: ProduitCommanderListComponent, private panierService: PanierService){

  }

  ngOnInit(): void {
    // this.panierService.getPanier().subscribe(data => {
      // Stockez les données du panier dans panierList
      // this.panierList = data;
    // });
  }
}
