import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCommanderComponent } from './produit-commander.component';

describe('ProduitCommanderComponent', () => {
  let component: ProduitCommanderComponent;
  let fixture: ComponentFixture<ProduitCommanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitCommanderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitCommanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
