import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitService } from '../produit.service';
import { Produit } from '../produit.model';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProduitListComponent } from './produit-list/produit-list.component'
import { Fournisseur } from '../fournisseur.model';
import { FournisseurService } from '../fournisseur.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
  standalone:true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule,FormsModule, ProduitListComponent, CommonModule, HttpClientModule],
})
export class ProduitComponent implements OnInit {
  produitForm!: FormGroup;
  fournisseurs: Fournisseur[] = [];
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  produitsTemp: any = [];

  constructor(private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService, private http: HttpClient) {}

  ngOnInit() {
    this.fournisseurs = this.fournisseurService.getFournisseurs();
    this.produitForm = this.fb.group({
      id: [, Validators.required],
      nom: ['', Validators.required],
      type: ['', Validators.required],
      genre: ['', Validators.required],
      taille: ['', Validators.required],
      prix: [, Validators.min(0)],
      etat: ['', Validators.required],
      fournisseur: ['', Validators.required],
      nombre: [, Validators.required],
    });
  }
  selectedItemFormControl = new FormControl();

  ajouterProduit() {
    this.addProduits();
    this.produitForm.reset();
  }

  addProduits() {
    const newProduitNom = this.produitForm.value.nom;
    const newProduitType = this.produitForm.value.type;
    const newProduitGenre = this.produitForm.value.genre;
    const newProduitTaille = this.produitForm.value.taille;
    const newProduitPrix = this.produitForm.value.prix;
    const newProduitEtat = this.produitForm.value.etat;
    const newProduitFournisseur = this.produitForm.value.fournisseur;
    const newProduitNombre = this.produitForm.value.nombre;

    if (!newProduitNom || !newProduitType || !newProduitGenre || !newProduitTaille || !newProduitPrix || !newProduitEtat || !newProduitFournisseur || !newProduitNombre) {
      alert("Nom, Type, Genre, Taille, Prix, Etat, Fournisseur and Nombre are required");
      return;
    }

    const formData = new FormData();
    formData.append("nom", newProduitNom);
    formData.append("type", newProduitType);
    formData.append("genre", newProduitGenre);
    formData.append("taille", newProduitTaille);
    formData.append("prix", newProduitPrix);
    formData.append("etat", newProduitEtat);
    formData.append("fournisseur", newProduitFournisseur);
    formData.append("nombre", newProduitNombre);

    this.http.post(this.APIUrl + 'AddProduits', formData).subscribe(data => {
      alert(data);
    }, error => {
      console.error('Error adding produit:', error);
      alert(`Error adding produit: ${error.message || error}`);
    });

    this.refreshProduits();
  }


  refreshProduits() {
    this.http.get(this.APIUrl + 'GetProduits').subscribe(data => {
      this.produitService.produitsTemp = data;
      this.produitsTemp = data;
    });
    this.produitService.setApiProduits();
    this.produitService.getProduits();
  }
}
