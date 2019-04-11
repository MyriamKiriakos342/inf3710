import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationAnimalComponent } from './modification-animal.component';

describe('ModificationAnimalComponent', () => {
  let component: ModificationAnimalComponent;
  let fixture: ComponentFixture<ModificationAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
