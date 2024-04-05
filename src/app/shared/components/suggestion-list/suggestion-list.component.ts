import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent {
  @Input() suggestions: any = [];
  @Input() displayKey!: string;

  @Output() onSelectEvent = new EventEmitter<any>();

  onSelectItem(selectedVal: any) {
    this.onSelectEvent.emit(selectedVal);
  }
}
