import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../fournisseur.model';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css'],
  standalone:true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule,FormsModule, FournisseurListComponent, HttpClientModule],
})
export class FournisseurComponent implements OnInit {
  fournisseurForm!: FormGroup;
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  fournisseursTemp: any = [];

  constructor(private fb: FormBuilder, private fournisseurService: FournisseurService, private http: HttpClient) {}

  ngOnInit() {
    this.fournisseurForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
    });
    this.refreshFournisseurs();
  }
  selectedItemFormControl = new FormControl();

  ajouterFournisseur() {
    this.addFournisseurs();
    this.fournisseurForm.reset();
  }

  addFournisseurs() {
    const newFournisseurNom = this.fournisseurForm.value.nom;

    if (!newFournisseurNom) {
      alert("Name are required");
      return;
    }
    const formData = new FormData();
    formData.append("nom", newFournisseurNom);

    this.http.post(this.APIUrl + 'AddFournisseurs', formData).subscribe(data => {
      alert(data);
    }, error => {
      alert('Error adding fournisseur');
    });
    this.refreshFournisseurs();
  }

  refreshFournisseurs() {
    this.http.get(this.APIUrl + 'GetFournisseurs').subscribe(data => {
      this.fournisseurService.fournisseursTemp = data;
      this.fournisseursTemp = data;
    });
    this.fournisseurService.setApiFournisseurs();
    this.fournisseurService.getFournisseurs();
  }

  deleteUsers(id:any){
    this.http.delete(this.APIUrl+'DeleteUsers?id='+id).subscribe(data=>{
      alert(data);
      this.refreshFournisseurs();
    })
  }
}
