import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConcertForm } from './new-concert-form';

describe('NewConcertForm', () => {
  let component: NewConcertForm;
  let fixture: ComponentFixture<NewConcertForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewConcertForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConcertForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
