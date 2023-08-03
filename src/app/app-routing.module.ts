import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
/**
 *  Buttons Page for Design Framework
 */
@Component({
  selector: 'cgi-buttons-style',
  templateUrl: './buttons-style.component.html',
  styleUrls: ['./buttons-style.component.scss'],
})
export class ButtonsStyleComponent implements OnInit {
  /**
   * HostBinding ( Decorator allows you to set the properties of the host element from the directive class.)
   */
  @HostBinding('class.cgi-buttons-style')
  isClassContainer: boolean;
  /**
   * Constructor
   */
  constructor() {
    this.isClassContainer = true;
  }
  /**
   * Life cycle hook for when the component is first initiated.
   */
  ngOnInit() {}
}

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
