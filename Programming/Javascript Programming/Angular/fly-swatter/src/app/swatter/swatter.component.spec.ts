import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwatterComponent } from './swatter.component';

describe('SwatterComponent', () => {
  let component: SwatterComponent;
  let fixture: ComponentFixture<SwatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
