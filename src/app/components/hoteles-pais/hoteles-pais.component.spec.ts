import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesPaisComponent } from './hoteles-pais.component';

describe('HotelesPaisComponent', () => {
  let component: HotelesPaisComponent;
  let fixture: ComponentFixture<HotelesPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelesPaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelesPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
