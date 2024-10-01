import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierFacturePdfComponent } from './panier-facture-pdf.component';

describe('PanierFacturePdfComponent', () => {
  let component: PanierFacturePdfComponent;
  let fixture: ComponentFixture<PanierFacturePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierFacturePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanierFacturePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
