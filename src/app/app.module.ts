import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { LogComponent } from './log/log.component';
import { LoginComponent } from './login/login.component';
import { LogLinesComponent } from './log/log-lines/log-lines.component';
import { CellComponent } from './board/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    LogComponent,
    LogLinesComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
