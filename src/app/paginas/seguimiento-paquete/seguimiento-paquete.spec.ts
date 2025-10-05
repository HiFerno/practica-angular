import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPaquete } from './seguimiento-paquete';

describe('SeguimientoPaquete', () => {
  let component: SeguimientoPaquete;
  let fixture: ComponentFixture<SeguimientoPaquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoPaquete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoPaquete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
