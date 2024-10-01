import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ProduitComponent } from './produit/produit.component';
import { ProduitListComponent } from './produit/produit-list/produit-list.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FournisseurService } from './fournisseur.service';
import { ProduitService } from './produit.service';
import { CommandeService } from './commande.service';
import { AvisService } from './avis.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    AccueilComponent,
    FournisseurComponent,
    ProduitComponent,
    ProduitListComponent,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'situation_1';
  appRoutes = routes;
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  notes: any = [];
  usersTemp: any = [];
  fournisseursTemp: any = [];
  produitsTemp: any = [];
  productsTemp: any = [];
  avisTemp: any = [];

  constructor(private router: Router, private commandeService : CommandeService,  private authService: AdminAuthService, private produitService: ProduitService,private http: HttpClient, private fournisseurService: FournisseurService, private avisService: AvisService) { }

  ngOnInit(): void {
    this.refreshUsers();
    this.refreshFournisseurs();
    this.refreshProduits();
    this.refreshCommandes();
  }

  refreshUsers() {
    this.http.get(this.APIUrl + 'GetUsers').subscribe(data => {
      this.authService.usersTemp = data;
      this.usersTemp = data;
    });
    this.authService.setApiUsers();
  }

  refreshFournisseurs() {
    this.http.get(this.APIUrl + 'GetFournisseurs').subscribe(data => {
      this.fournisseurService.fournisseursTemp = data;
      this.fournisseursTemp = data;
    });
    this.fournisseurService.setApiFournisseurs();
  }

  refreshProduits() {
    this.http.get(this.APIUrl + 'GetProduits').subscribe(data => {
      this.produitService.produitsTemp = data;
      this.produitsTemp = data;
    });
    this.produitService.setApiProduits();
    this.produitService.getProduits();
  }

  refreshCommandes() {
    this.http.get(this.APIUrl + 'GetCommandes').subscribe(data => {
      this.commandeService.commandeList = data;
      this.productsTemp = data;
    });
    this.commandeService.setApiCommandes();
    this.commandeService.getCommande();
  }

  refreshAvis() {
    this.http.get(this.APIUrl + 'GetAvis').subscribe(data => {
      this.avisService.avisTemp = data;
      this.avisTemp = data;
    });
    this.avisService.setApiAvis();
    this.avisService.getAvis();
  }

  deleteUsers(username:any){
    if (username !='admin'){
      this.http.delete(this.APIUrl+'DeleteUsers?username='+username).subscribe(data=>{
        alert(data);
        this.refreshUsers();
      })
    }
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
