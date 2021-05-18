import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHabitacionComponent } from './agregar-habitacion.component';

describe('AgregarHabitacionComponent', () => {
  let component: AgregarHabitacionComponent;
  let fixture: ComponentFixture<AgregarHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHabitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
