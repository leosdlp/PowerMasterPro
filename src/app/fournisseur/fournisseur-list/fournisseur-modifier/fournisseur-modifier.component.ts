import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { FournisseurService } from '../../../fournisseur.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FournisseurListComponent } from '../../fournisseur-list/fournisseur-list.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-fournisseur-modifier',
  templateUrl: './fournisseur-modifier.component.html',
  styleUrls: ['./fournisseur-modifier.component.css'],
  standalone:true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterModule, HttpClientModule]
})
export class FournisseurModifierComponent implements OnInit {
  fournisseurForm: FormGroup;
  fournisseurId: number = 0;
  fournisseurName:any = "";
  newName: string = "";
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';


  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private fournisseurService: FournisseurService, private fournisseurListComponent: FournisseurListComponent) {
    this.fournisseurForm = this.fb.group({
      id:[],
      nom: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fournisseurId = this.fournisseurService.getSelectedFournisseurId();
    const fournisseur = this.fournisseurService.getFournisseurById(this.fournisseurId);
    this.fournisseurName = fournisseur?.nom;
  }

  modifierFournisseur() {
    const fournisseurModifie = this.fournisseurForm.value;
    this.fournisseurService.updateFournisseur(this.fournisseurId, fournisseurModifie);
  }

  updateFournisseur() {
    const idFournisseur = this.fournisseurId;
    const updatedName = this.newName;

    if (!updatedName) {
      alert("Current username is required");
      return;
    }

    const formData = new FormData();
    formData.append("id", idFournisseur.toString());
    if (updatedName) formData.append("newName", updatedName);

    this.http.post(this.APIUrl + 'UpdateFournisseurs', formData).subscribe(
      data => {
        alert('User updated successfully');
        this.router.navigate(['/fournisseur-list']);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }
}
