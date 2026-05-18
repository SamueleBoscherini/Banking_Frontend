import { Component } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: 'credit' | 'debit';
  category: string;
}

@Component({
  selector: 'app-home',
  imports: [
    DatePipe,
    DecimalPipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly balance = 12480.75;
  readonly accountNumber = 'IT60 X054 2811 1010 0000 0123 456';
  readonly iban = 'IT60X0542811101000000123456';

  readonly quickActions = [
    { icon: 'send_money', label: 'Bonifico' },
    { icon: 'payments', label: 'Pagamenti' },
    { icon: 'credit_card', label: 'Carte' },
    { icon: 'receipt_long', label: 'Estratto conto' },
  ];

  readonly transactions: Transaction[] = [
    { id: 1, description: 'Stipendio', amount: 2450.00, date: new Date('2026-05-01'), type: 'credit', category: 'Entrate' },
    { id: 2, description: 'Supermercato Esselunga', amount: 87.45, date: new Date('2026-05-03'), type: 'debit', category: 'Spese' },
    { id: 3, description: 'Netflix', amount: 15.99, date: new Date('2026-05-04'), type: 'debit', category: 'Abbonamenti' },
    { id: 4, description: 'Bolletta Enel', amount: 112.30, date: new Date('2026-05-05'), type: 'debit', category: 'Utenze' },
    { id: 5, description: 'Affitto', amount: 750.00, date: new Date('2026-05-02'), type: 'debit', category: 'Abitazione' },
    { id: 6, description: 'Rimborso assicurazione', amount: 320.00, date: new Date('2026-05-06'), type: 'credit', category: 'Entrate' },
  ];
}
