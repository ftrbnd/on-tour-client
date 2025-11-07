import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConcertPage } from './create-concert-page';

describe('CreateConcertPage', () => {
  let component: CreateConcertPage;
  let fixture: ComponentFixture<CreateConcertPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConcertPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConcertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
