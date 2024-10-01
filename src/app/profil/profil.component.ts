import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from '../accueil/accueil.component'
import { FournisseurComponent } from '../fournisseur/fournisseur.component'
import { ProduitComponent } from '../produit/produit.component'
import { ProduitListComponent } from '../produit/produit-list/produit-list.component'
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AccueilComponent,FournisseurComponent, ProduitComponent, ProduitListComponent, CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  user = localStorage.getItem('currentUser');
  userJson = "";
  username:string = "";
  password:string = "";
  email:string = "";
  newUsername?: string;
  newPassword?: string;
  newConfirmPassword?: string;
  newEmail?: string;
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  usersTemp: any = [];
  userForm!: FormGroup;

  constructor(private router: Router, private authService: AdminAuthService, private http: HttpClient, private fb: FormBuilder){
    this.userForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.username = currentUser.username;
      this.password = currentUser.password;
      this.email = currentUser.email;
    }
  }

  updateUser() {
    if (this.newPassword == this.newConfirmPassword){
      const currentUsername = this.username;
      const updatedUsername = this.newUsername;
      const updatedPassword = this.newPassword;
      const updatedEmail = this.newEmail;

      if (!currentUsername) {
        alert("Current username is required");
        return;
      }

      const formData = new FormData();
      formData.append("username", currentUsername);
      if (updatedUsername) formData.append("newUsername", updatedUsername);
      if (updatedPassword) formData.append("newPassword", updatedPassword);
      if (updatedEmail) formData.append("newEmail", updatedEmail);

      this.http.post(this.APIUrl + 'UpdateUsers', formData).subscribe(
        data => {
          alert('User updated successfully');
          this.deconnect();
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    }
    else {
      alert("Les deux mots de passe ne correspondent pas")
    }
  }

  deconnect(): void{
    localStorage.removeItem('currentUser');
    this.router.navigate(['/connexion']);
  }

  deleteUser(){
    this.deleteUsers(this.username);
    this.authService.deleteUser(this.username, this.password);
    this.router.navigate(['/']);
  }

  deleteUsers(username:any){
    if (username !='admin'){
      this.http.delete(this.APIUrl+'DeleteUsers?username='+username).subscribe(data=>{
        alert(data);
      })
    }
    this.refreshUsers();
  }

  refreshUsers() {
    this.http.get(this.APIUrl + 'GetUsers').subscribe(data => {
      this.authService.usersTemp = data;
      this.usersTemp = data;
    });
    this.authService.setApiUsers();
  }

  isAdmin(): boolean {
    return !(this.authService.isAdmin());
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
