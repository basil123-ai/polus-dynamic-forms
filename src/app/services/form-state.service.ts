import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export type FormValues = Record<string, unknown>;

const STORAGE_KEY = 'polus-dynamic-form-tab-state';

@Injectable({ providedIn: 'root' })
export class FormStateService {
  /** In-memory form snapshots keyed by arbitrary form id (e.g. tab id). */
  private readonly state = signal<Record<string, FormValues>>(this.readStorage());

  /** Fired when {@link clearAll} runs so mounted forms can reset (only one route may be active). */
  private readonly clearedAllSubject = new Subject<void>();
  readonly clearedAll$ = this.clearedAllSubject.asObservable();

  getFormState(formId: string): FormValues | undefined {
    return this.state()[formId];
  }

  setFormState(formId: string, values: FormValues): void {
    this.state.update((current) => ({ ...current, [formId]: { ...values } }));
    this.persist();
  }

  clearForm(formId: string): void {
    this.state.update((current) => {
      const next = { ...current };
      delete next[formId];
      return next;
    });
    this.persist();
  }

  clearAll(): void {
    this.state.set({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore quota / private mode */
    }
    this.clearedAllSubject.next();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    } catch {
      /* ignore */
    }
  }

  private readStorage(): Record<string, FormValues> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {};
      }
      const parsed = JSON.parse(raw) as Record<string, FormValues>;
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }
}
