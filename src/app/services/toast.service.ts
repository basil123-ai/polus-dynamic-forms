import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messageSubject = new BehaviorSubject<string | null>(null);

  /** Emits the current toast text or null when hidden (RxJS pattern for templates with async pipe). */
  readonly message$ = this.messageSubject.asObservable();

  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  show(text: string, durationMs = 3500): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
    this.messageSubject.next(text);
    this.hideTimer = setTimeout(() => {
      this.messageSubject.next(null);
      this.hideTimer = null;
    }, durationMs);
  }
}
