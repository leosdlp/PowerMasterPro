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
import { ProduitCommanderListComponent } from '../../produit/produit-commander/produit-commander-list/produit-commander-list.component'
import { PanierService } from '../../panier.service';
import { CommandeService } from '../../commande.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit{
  commandeList: any = [];
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  productsTemp:any = {};
  filtreId = '';
  rechercheCommande = '';


  constructor(private fb: FormBuilder, private produitService: ProduitService, private http: HttpClient, private fournisseurService: FournisseurService, private router: Router, private produitCommanderListComponent: ProduitCommanderListComponent, private panierService: PanierService, private commandeService: CommandeService){
  }

  ngOnInit(): void {
    this.refreshCommandes();
    this.commandeList = this.commandeService.getCommande();
    }

    refreshCommandes() {
      this.http.get(this.APIUrl + 'GetCommandes').subscribe(data => {
        this.commandeService.commandeList = data;
        this.productsTemp = data;
      });
      this.commandeService.setApiCommandes();
      this.commandeService.getCommande();
    }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isJsonString(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  parseJson(jsonString: string): any {
    return JSON.parse(jsonString);
  }

  deleteCommandes(id:any){
      this.http.delete(this.APIUrl+'DeleteCommandes?id='+id).subscribe(data=>{
        alert(data);
      })
    this.refreshCommandes();
  }

  filtrerCommandes() {
    const commandesList = this.commandeService.getCommande();

    this.productsTemp = commandesList.filter((commande: { username: string; id: number }) =>
      commande.username.toLowerCase().includes(this.rechercheCommande.toLowerCase())
    );

    if (this.filtreId !== '') {
      this.productsTemp = this.productsTemp.filter((commande: { username: string; id: number }) => commande.id.toString() == this.filtreId);
    }
  }
}
