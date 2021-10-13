import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementTeamComponent } from './movement-team.component';

describe('MovementTeamComponent', () => {
  let component: MovementTeamComponent;
  let fixture: ComponentFixture<MovementTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
