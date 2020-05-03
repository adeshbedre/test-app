import { NgModule } from '@angular/core';
import { SeatAllocationService } from './services/seatAllocationService';
import { SeatDeallocationService } from './services/seatDeallocationService';

@NgModule({
  bootstrap: [],
  declarations: [],
  imports: [],
  providers: [
    SeatAllocationService,SeatDeallocationService
  ],
  exports:
    [
    ]
})

export class AppServiceModule {
}
