import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCommanderListComponent } from './produit-commander-list.component';

describe('ProduitCommanderListComponent', () => {
  let component: ProduitCommanderListComponent;
  let fixture: ComponentFixture<ProduitCommanderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitCommanderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitCommanderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
