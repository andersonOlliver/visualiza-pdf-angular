import { Component, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as printJS from 'print-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exibindo PDF no Angular';
  url = '/assets/demo.pdf';
  safeUrl: any;

  constructor(private sanitizer: DomSanitizer) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  imprimir() {
    // @ts-ignore
    printJS(this.url);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDownEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.key.toLowerCase() === 'p' && event.ctrlKey) {
      event.preventDefault();
      this.imprimir();
    }
  }
}
