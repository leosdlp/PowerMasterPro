import { Injectable } from '@angular/core';
import { Fournisseur } from './fournisseur.model';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  selectedFournisseurId: number = -1;
  private fournisseurs: Fournisseur[] = [];
  newFournisseur: any = [];
  fournisseursTemp: any = [];

  
  getFournisseurs(): Fournisseur[] {
    this.setApiFournisseurs();
    return this.fournisseurs;
  }

  getFournisseurById(id: number): Fournisseur | undefined {
    return this.fournisseurs.find(fournisseur => fournisseur.id === id);
  }

  setApiFournisseurs() {
    const newFournisseurs = [];
    for (const fournisseur of this.fournisseursTemp) {
      newFournisseurs.push({ id: fournisseur.id, nom: fournisseur.nom });
    }
    this.fournisseurs = newFournisseurs;
  }

  createFournisseur(nouveauFournisseur: Fournisseur) {
    this.fournisseurs.push(nouveauFournisseur);
  }

  updateFournisseur(id: number, fournisseurModifie: Fournisseur) {
    const index = this.fournisseurs.findIndex(fournisseur => fournisseur.id === id);
    if (index !== 0) {
      this.fournisseurs[index] = fournisseurModifie;
    }
  }

  deleteFournisseur(id: number) {
    const index = this.fournisseurs.findIndex(fournisseur => fournisseur.id === id);
    if (index !== -1) {
      this.fournisseurs.splice(index, 1);
    }
  }

  setSelectedFournisseurId(id: number) {
    this.selectedFournisseurId = id;
  }

  getSelectedFournisseurId() {
    return this.selectedFournisseurId;
  }
}
