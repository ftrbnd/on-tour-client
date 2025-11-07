import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuePage } from './venue-page';

describe('VenuePage', () => {
  let component: VenuePage;
  let fixture: ComponentFixture<VenuePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenuePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
