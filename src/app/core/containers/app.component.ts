import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

// import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-sidenav></app-sidenav> `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    // analytics: AngularFireAnalytics,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar
  ) {
    // analytics.logEvent('start_game', { level: '10', difficulty: 'expert' });
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const snack = this.snackbar.open('Update Available', 'Reload', {
          duration: 6000,
        });

        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }
}
