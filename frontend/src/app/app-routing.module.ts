import {NgModule} from '@angular/core';
import { WeighingPageComponent } from './weighing-page/weighing-page.component';
import { SettingPageComponent } from './setting-page/setting-page.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{ path: 'weighing', component: WeighingPageComponent },
{ path: 'setting', component: SettingPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [WeighingPageComponent, SettingPageComponent];

