import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { HomePage } from './pages/home/home.page';
import { Tab2Page } from './tab2/tab2.page';
import { SubjectDetailsComponent } from './pages/subject-details/subject-details.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'timetable',
        component: TimetableComponent,
      },
      {
        path: 'tab2',
        component: Tab2Page
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: ':semester/:subject',
    component: SubjectDetailsComponent
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
