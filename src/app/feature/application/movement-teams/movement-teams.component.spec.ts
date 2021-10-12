import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementTeamsComponent } from './movement-teams.component';

describe('MovementTeamsComponent', () => {
  let component: MovementTeamsComponent;
  let fixture: ComponentFixture<MovementTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
