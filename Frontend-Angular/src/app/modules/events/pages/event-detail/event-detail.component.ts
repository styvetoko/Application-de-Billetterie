import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  event = {
    name: 'Concert XYZ',
    date: '2025-02-28',
    description: 'A great concert with amazing artists.',
    image: 'https://placeimg.com/600/300/nature'
  };

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(TicketPurchaseDialog);
  }
}

@Component({
  selector: 'ticket-purchase-dialog',
  template: `
    <h1 mat-dialog-title>Purchase Ticket</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Quantity</mat-label>
        <input matInput type="number">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary">Buy</button>
    </div>
  `
})
export class TicketPurchaseDialog {}
