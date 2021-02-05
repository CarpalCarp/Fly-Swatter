import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'screen-size-message',
  templateUrl: './screen-size-message.component.html',
  styleUrls: ['./screen-size-message.component.css']
})
export class ScreenSizeMessageComponent {
  public screenWidth: number;
  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.screenWidth = event.target.innerWidth;
  }
}
