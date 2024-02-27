import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCommentComponent } from './add-edit-comment.component';

describe('DeleteEditCommentComponent', () => {
  let component: AddEditCommentComponent;
  let fixture: ComponentFixture<AddEditCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
