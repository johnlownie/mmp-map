import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FearComponent } from './fear.component';

describe('FearComponent', () => {
  let component: FearComponent;
  let fixture: ComponentFixture<FearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
