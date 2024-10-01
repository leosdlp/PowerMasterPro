import { Injectable } from '@angular/core';
import { Produit } from './produit.model'; // Importez le modèle

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  selectedProduitId: number = -1;
  newProduit: any = [];
  produitsTemp: any = [];
  private produits: Produit[] = [];

  getProduits(): Produit[] {
    this.setApiProduits();
    return this.produits;
  }

  getProduitById(id: number): Produit | undefined {
    return this.produits.find(produit => produit.id === id);
  }

  createProduit(nouveauProduit: Produit) {
    this.produits.push(nouveauProduit);
  }

  updateProduit(id: number, produitModifie: Produit) {
    const index = this.produits.findIndex(produit => produit.id === id);
    if (index !== -1) {
      this.produits[index] = produitModifie;
    }
  }

  deleteProduit(id: number) {
    const index = this.produits.findIndex(produits => produits.id === id);
    if (index !== -1) {
      this.produits.splice(index, 1);
    }
  }

  setSelectedProduitId(id: number) {
    this.selectedProduitId = id;
  }

  getSelectedProduitId() {
    return this.selectedProduitId;
  }

  setApiProduits() {
    const newProduits = [];
    for (const produit of this.produitsTemp) {
      newProduits.push({ id: produit.id, nom: produit.nom, type: produit.type, genre: produit.genre, taille:produit.taille, prix: produit.prix, etat: produit.etat, fournisseur: produit.fournisseur, nombre: produit.nombre });
    }
    this.produits = newProduits;
  }
}
