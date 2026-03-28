import { Routes } from '@angular/router';

import { FormAComponent } from './components/form-a/form-a.component';
import { FormBComponent } from './components/form-b/form-b.component';
import { FormTabsComponent } from './components/form-tabs/form-tabs.component';

export const routes: Routes = [
  {
    path: '',
    component: FormTabsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'form-a' },
      { path: 'form-a', component: FormAComponent },
      { path: 'form-b', component: FormBComponent },
    ],
  },
];
