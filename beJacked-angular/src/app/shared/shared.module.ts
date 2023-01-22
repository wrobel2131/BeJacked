//shared.module.ts
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material/material.module';
import { ErrorMessageComponent } from './dialogs/error-message/error-message.component';
import { SuccessMessageComponent } from './dialogs/success-message/success-message.component';

@NgModule({
  declarations: [SuccessMessageComponent, ErrorMessageComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SuccessMessageComponent, ErrorMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
