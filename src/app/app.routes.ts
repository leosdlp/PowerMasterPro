import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { FournisseurListComponent } from './fournisseur/fournisseur-list/fournisseur-list.component'
import { ProduitComponent } from './produit/produit.component';
import { ProduitListComponent } from './produit/produit-list/produit-list.component'
import { FournisseurModifierComponent } from './fournisseur/fournisseur-list/fournisseur-modifier/fournisseur-modifier.component';
import { ProduitModifierComponent } from './produit/produit-list/produit-modifier/produit-modifier.component';
import { ProduitCommanderComponent } from './produit/produit-commander/produit-commander.component';
import { ProduitCommanderListComponent } from './produit/produit-commander/produit-commander-list/produit-commander-list.component';
import { PanierComponent } from './panier/panier.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { ProfilComponent } from './profil/profil.component';
import { PanierFacturePdfComponent } from './panier/panier-facture-pdf/panier-facture-pdf.component';
import { CommandeComponent } from './panier/commande/commande.component';
import { AvisComponent } from './avis/avis.component';
import { AvisListComponent } from './avis/avis-list/avis-list.component';


export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: '', component: AccueilComponent },
  { path: 'fournisseur', component: FournisseurComponent, canActivate: [AdminGuard]},
  { path: 'fournisseur-list', component: FournisseurListComponent, canActivate: [AdminGuard] },
  { path: 'fournisseur-modifier/:id', component: FournisseurModifierComponent, canActivate: [AdminGuard] },
  { path: 'produit', component: ProduitComponent, canActivate: [AdminGuard] },
  { path: 'produit-list', component: ProduitListComponent, canActivate: [AdminGuard] },
  { path: 'produit-commander', component: ProduitCommanderComponent },
  { path: 'produit-commander-list/:id', component: ProduitCommanderListComponent },
  { path: 'produit-modifier/:id', component: ProduitModifierComponent, canActivate: [AdminGuard] },
  { path: 'panier', component: PanierComponent },
  { path: 'commandes', component: CommandeComponent, canActivate: [AdminGuard]},
  { path: 'connexion', component: AdminComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'facture', component: PanierFacturePdfComponent },
  { path: 'avis', component: AvisComponent },
  { path: 'avis-list', component: AvisListComponent, canActivate: [AdminGuard] },
];
