import { Injectable } from '@angular/core';
import { Produit } from './produit.model';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  commandeList:any = [];

  getCommande(){
    this.setApiCommandes();
    return this.commandeList;
  }

  setApiCommandes(){
    const newCommandes: any = [];
    for (const commande of this.commandeList) {
      newCommandes.push({ id: commande.id, products: commande.products, totalPrice: commande.totalPrice, username: commande.username });
    }
    this.commandeList = newCommandes;
  }
}
