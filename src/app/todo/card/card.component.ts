import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Output() edit = new EventEmitter<void>();     ///$$ sending data from child to parent
  @Output() delete = new EventEmitter<void>();  ///$$ sending data from child to parent
  @Input() name: string;     
                    ///## getting data from parent to child
  faPen = faPen;
  constructor() { }

  ngOnInit(): void {
  }

  // Event emitter
  // emitEdit(someDataToEmit){
  //   this.edit.emit(someDataToEmit);
  // }

}
