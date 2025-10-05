import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarOrden } from './actualizar-orden';

describe('ActualizarOrden', () => {
  let component: ActualizarOrden;
  let fixture: ComponentFixture<ActualizarOrden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarOrden]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarOrden);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
