import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import {ModuleRoutesModule} from './module-routes/module-routes.module';
import { WeighingPageComponent } from './weighing-page/weighing-page.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent }, 
    { path: 'contact', component: ContactComponent },
    { path: 'weighing', component: WeighingPageComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        WeighingPageComponent

    ],
    imports: [
        BrowserModule,
        MatToolbarModule,
        MatButtonModule,
        ModuleRoutesModule,
        RouterModule.forRoot(routes),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}


