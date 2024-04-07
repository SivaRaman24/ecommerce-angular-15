import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/product.interface';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss'],
})
export class SuggestionListComponent {
  @Input() suggestions: Product[] = [];
  @Input() displayKey!: string;

  @Output() selectedEvent = new EventEmitter<Product>();

  onSelectItem(selectedVal: Product) {
    this.selectedEvent.emit(selectedVal);
  }
}
