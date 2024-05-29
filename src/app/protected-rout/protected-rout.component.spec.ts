import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedRoutComponent } from './protected-rout.component';

describe('ProtectedRoutComponent', () => {
  let component: ProtectedRoutComponent;
  let fixture: ComponentFixture<ProtectedRoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedRoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProtectedRoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
