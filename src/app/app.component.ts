import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import jschardet from 'jschardet';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  encoding$ = new Subject();

  fileChange(event: any): void {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvResult = e.target.result.split(/\r|\n|\r\n/);
      const encoding = jschardet.detect(csvResult.toString()).encoding;

      this.encoding$.next(encoding);
    };
    reader.readAsBinaryString(file);
  }
}
