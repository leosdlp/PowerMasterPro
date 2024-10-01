import { Injectable } from '@angular/core';
import { Produit } from './produit.model';

@Injectable({
  providedIn: 'root',
})
export class AvisService {
  avisList:any = [];
  avisTemp:any = [];

  getAvis(){
    this.setApiAvis();
    return this.avisList;
  }

  setApiAvis(){
    const newAvis: any = [];
    for (const avis of this.avisTemp) {
      newAvis.push({ id: avis.id, description: avis.description, etoile: avis.etoile, username: avis.username});
    }
    this.avisList = newAvis;
  }
}
