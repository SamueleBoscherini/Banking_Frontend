import { Component, afterNextRender, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { Transactions } from '../../model/saldo/saldo-module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

Chart.register(...registerables);

@Component({
  selector: 'app-graphics',
  imports: [FormsModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './graphics.html',
  styleUrl: './graphics.scss',
})
export class Graphics {
  private chart: Chart | null = null;
  private allTransactions: Transactions[] = [];

  availableYears: number[] = [];
  selectedYear = signal<number>(new Date().getFullYear());
  isLoading = signal<boolean>(true);

  constructor(
    private BankingService: ServizioSaldo,
    private snackBar: MatSnackBar
  ) {
    afterNextRender(() => {
      const accountId = this.BankingService.getAccountId().toString();
      this.BankingService.getTransactions(accountId).subscribe({
        next: (response: any) => {
          this.allTransactions = response.transactions ?? response;
          this.availableYears = this.extractYears(this.allTransactions);
          this.isLoading.set(false);

          setTimeout(() => this.createChart(this.selectedYear()));
        },
        error: () => {
          this.snackBar.open('Errore nel caricamento delle transazioni', 'Chiudi', { duration: 4000 });
          this.isLoading.set(false);
        },
      });
    });
  }

  private extractYears(transactions: Transactions[]): number[] {
    const years = new Set(
      transactions.map(t => new Date(t.created_at).getFullYear())
    );
    return Array.from(years).sort((a, b) => b - a);
  }

  onYearChange(year: number): void {
    this.selectedYear.set(Number(year));
    this.createChart(this.selectedYear());
  }

  private isMobile(): boolean {
    return window.innerWidth < 600;
  }

  private createChart(year: number): void {
    const yearTransactions = this.allTransactions.filter(t => {
      const date = new Date(t.created_at);
      return date.getFullYear() === year;
    });

    const monthlyData: { [month: number]: { deposits: number; withdrawals: number } } = {};
    for (let m = 0; m < 12; m++) {
      monthlyData[m] = { deposits: 0, withdrawals: 0 };
    }

    yearTransactions.forEach(t => {
      const date = new Date(t.created_at);
      const month = date.getMonth();
      const amount = parseFloat(t.amount as unknown as string);
      if (isNaN(amount)) return;

      if (t.type === 'deposit') {
        monthlyData[month].deposits += amount;
      } else if (t.type === 'withdrawal') {
        monthlyData[month].withdrawals += amount;
      }
    });

    const mobile = this.isMobile();
    const monthsLong = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
    ];
    const monthsShort = [
      'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
      'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic',
    ];

    const labels = mobile ? monthsShort : monthsLong;
    const currency = this.BankingService.getAccount()?.currency ?? 'EUR';

    const canvas = document.getElementById('transactionChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas #transactionChart non trovato nel DOM');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Depositi',
            data: Object.values(monthlyData).map(m => m.deposits),
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: mobile ? 4 : 2,
            maxBarThickness: mobile ? 12 : undefined,
          },
          {
            label: 'Prelievi',
            data: Object.values(monthlyData).map(m => m.withdrawals),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            borderRadius: mobile ? 4 : 2,
            maxBarThickness: mobile ? 12 : undefined,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: !mobile,
        ...(mobile && { aspectRatio: 1.2 }),
        plugins: {
          title: {
            display: true,
            text: `Transazioni ${year}`,
            font: { size: mobile ? 14 : 18 },
          },
          legend: {
            position: mobile ? 'bottom' : 'top',
            labels: {
              boxWidth: mobile ? 12 : 20,
              boxHeight: mobile ? 12 : 20,
              font: { size: mobile ? 11 : 13 },
            },
          },
          tooltip: {
            titleFont: { size: mobile ? 12 : 14 },
            bodyFont: { size: mobile ? 11 : 13 },
            callbacks: {
              label: (context) => {
                const value = context.parsed.y ?? 0;
                return ` ${context.dataset.label}: ${value.toLocaleString('it-IT', {
                  style: 'currency',
                  currency,
                })}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { size: mobile ? 10 : 12 },
              callback: (value) =>
                Number(value).toLocaleString('it-IT', { style: 'currency', currency }),
            },
            title: {
              display: !mobile,
              text: `Importo (${currency})`,
            },
          },
          x: {
            ticks: {
              font: { size: mobile ? 10 : 12 },
              maxRotation: mobile ? 0 : 45,
              autoSkip: false,
            },
            title: {
              display: !mobile,
              text: 'Mese',
            },
          },
        },
      },
    });
  }
}