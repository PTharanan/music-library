import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicList } from './music-list';

describe('MusicList', () => {
  let component: MusicList;
  let fixture: ComponentFixture<MusicList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
