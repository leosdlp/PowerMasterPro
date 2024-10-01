import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurModifierComponent } from './fournisseur-modifier.component';

describe('FournisseurModifierComponent', () => {
  let component: FournisseurModifierComponent;
  let fixture: ComponentFixture<FournisseurModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FournisseurModifierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FournisseurModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
