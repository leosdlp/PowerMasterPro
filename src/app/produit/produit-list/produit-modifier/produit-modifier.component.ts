import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../../produit.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProduitListComponent } from '../../produit-list/produit-list.component';
import { Router } from '@angular/router';
import { FournisseurService } from '../../../fournisseur.service';
import { Fournisseur } from '../../../fournisseur.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-produit-modifier',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterModule, CommonModule, HttpClientModule],
  templateUrl: './produit-modifier.component.html',
  styleUrl: './produit-modifier.component.css'
})
export class ProduitModifierComponent implements OnInit {
  produitForm: FormGroup;
  produitId: number = 0;
  fournisseurs: Fournisseur[] = [];
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private produitService: ProduitService, private produitListComponent: ProduitListComponent, private fournisseurService: FournisseurService) {
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
    const produit = this.produitService.getProduitById(this.produitId);

    if (produit) {
      this.produitForm.patchValue({
        id: produit.id,
        nom: produit.nom,
        type: produit.type,
        genre: produit.genre,
        taille: produit.taille,
        prix: produit.prix,
        etat: produit.etat,
        fournisseur: produit.fournisseur,
        nombre: produit.nombre
      });
    }
  }

  modifierProduit() {
    this.updateProduit();
    this.router.navigate(['/produit-list']);
  }

  updateProduit() {
    const id = this.produitId;
    const nom = this.produitForm.value.nom;
    const type = this.produitForm.value.type;
    const genre = this.produitForm.value.genre;
    const taille = this.produitForm.value.taille;
    const prix = this.produitForm.value.prix;
    const etat = this.produitForm.value.etat;
    const fournisseur = this.produitForm.value.fournisseur;
    const nombre = this.produitForm.value.nombre;

    if (!nom || !type || !genre || !taille || !prix || !etat || !fournisseur || !nombre) {
      alert("Current username is required");
      return;
    }

    const formData = new FormData();
    formData.append("id", id.toString());
    if (nom) formData.append("nom", nom);
    if (type) formData.append("type", type);
    if (genre) formData.append("genre", genre);
    if (taille) formData.append("taille", taille);
    if (prix) formData.append("prix", prix);
    if (etat) formData.append("etat", etat);
    if (fournisseur) formData.append("fournisseur", fournisseur);
    if (nombre) formData.append("nombre", nombre);

    this.http.post(this.APIUrl + 'UpdateProduits', formData).subscribe(
      data => {
        alert('User updated successfully');
        this.router.navigate(['/produit-list']);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }
}

