import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inici', url: '/home', icon: 'home' },
    { title: 'Configuració', url: '/settings', icon: 'settings' },
    //{ title: 'Tester', url: '/tester', icon: 'heart' },
    //{ title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    //{ title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    //{ title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
