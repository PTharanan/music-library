import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUpload } from './music-upload';

describe('MusicUpload', () => {
  let component: MusicUpload;
  let fixture: ComponentFixture<MusicUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
