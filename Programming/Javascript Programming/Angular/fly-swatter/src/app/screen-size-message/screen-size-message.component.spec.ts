import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSizeMessageComponent } from './screen-size-message.component';

describe('ScreenSizeMessageComponent', () => {
  let component: ScreenSizeMessageComponent;
  let fixture: ComponentFixture<ScreenSizeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenSizeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSizeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
