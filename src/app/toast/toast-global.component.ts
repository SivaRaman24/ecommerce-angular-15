import { Component, OnDestroy } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from './toast.service';
import { ToastsComponent } from './toast.component';

@Component({
  selector: 'app-toast-global',
  standalone: true,
  imports: [NgbTooltipModule, ToastsComponent],
  templateUrl: './toast-global.component.html',
})
export class ToastGlobalComponent implements OnDestroy {
  constructor(public toastService: ToastService) {}

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  showDanger(dangerTpl: any) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
