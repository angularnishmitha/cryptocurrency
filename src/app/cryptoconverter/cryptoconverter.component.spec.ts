import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoconverterComponent } from './cryptoconverter.component';

describe('CryptoconverterComponent', () => {
  let component: CryptoconverterComponent;
  let fixture: ComponentFixture<CryptoconverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoconverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoconverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
