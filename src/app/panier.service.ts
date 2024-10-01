import { Injectable } from '@angular/core';
import { Produit } from './produit.model';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  panierList: { [key: string]: Produit } = {};

  getPanier(){
    return this.panierList;
  }

  ajouterAuPanier(produit: Produit): void {
    if (produit.nom in this.panierList) {
      this.panierList[produit.nom].nombre++;
    } else {
      this.panierList[produit.nom] = { ...produit, nombre: 1 };
    }
  }

  supprimerPanier(produit: Produit): void {
    if (produit) {
      if (produit.nom in this.panierList) {
        if (this.panierList[produit.nom].nombre > 1) {
          this.panierList[produit.nom].nombre--;
        } else {
          delete this.panierList[produit.nom];
        }
      }
    }
  }
}
