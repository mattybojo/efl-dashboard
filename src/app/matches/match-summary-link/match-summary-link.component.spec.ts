import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSummaryLinkComponent } from './match-summary-link.component';

describe('MatchSummaryLinkComponent', () => {
  let component: MatchSummaryLinkComponent;
  let fixture: ComponentFixture<MatchSummaryLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSummaryLinkComponent ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSummaryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
