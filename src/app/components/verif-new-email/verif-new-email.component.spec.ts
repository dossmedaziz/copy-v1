import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifNewEmailComponent } from './verif-new-email.component';

describe('VerifNewEmailComponent', () => {
  let component: VerifNewEmailComponent;
  let fixture: ComponentFixture<VerifNewEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifNewEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifNewEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
