import { AdminAuthService } from '../admin-auth.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../produit.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../fournisseur.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProduitCommanderListComponent } from '../produit/produit-commander/produit-commander-list/produit-commander-list.component'
import { PanierService } from '../panier.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit{
  loginUsername:string = '';
  loginPassword:string = '';
  username:string = '';
  password:string = '';
  email:string = '';
  passwordVerif:string = '';
  connexion: boolean = true;
  inscription: boolean = false;
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  constructor(private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private produitCommanderListComponent: ProduitCommanderListComponent, private panierService: PanierService) {

  }

  ngOnInit(): void {
  }

  login(): void {
    const success = this.authService.login(this.loginUsername, this.loginPassword);
    if (success) {
      console.log('Connexion réussie !');
      this.router.navigate(['/']);
    } else {
      console.log('Identifiants incorrects.');
    }
  }

  addUsers() {
    if (!this.username || !this.password || !this.email) {
      alert("Username and password are required");
      return;
    }
    const formData = new FormData();
    formData.append("username", this.username);
    formData.append("password", this.password);
    formData.append("email", this.email);

    this.http.post(this.APIUrl + 'AddUsers', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error adding user');
    });
  }

  register(): void {
    const verifPassword = this.password == this.passwordVerif;
    const success = this.authService.register(this.username, this.password, this.passwordVerif, this.email);
    if (success) {
      if(verifPassword){
        this.addUsers();
        console.log('Inscription réussie !');
        this.connexionForm();
      }
      else{
        console.log('Les mots de passe ne sont pas similaires.');
      }
    } else {
      console.log('L\'utilisateur existe déjà.');
    }
  }

  connexionForm(){
    this.connexion = true;
    this.inscription = false;
  }

  InscriptionForm(){
    this.connexion = false;
    this.inscription = true;
  }
}
