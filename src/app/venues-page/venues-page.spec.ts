import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesPage } from './venues-page';

describe('VenuesPage', () => {
  let component: VenuesPage;
  let fixture: ComponentFixture<VenuesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenuesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
