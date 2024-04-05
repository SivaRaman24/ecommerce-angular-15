import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdToastGlobal } from './toast-global.component';
import { ToastsComponent } from './toast.component';
import { CommonModule } from '@angular/common';


@NgModule({
	imports: [CommonModule, NgbModule, ToastsComponent, NgbdToastGlobal],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgbdToastGlobalModule {}
