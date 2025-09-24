import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-memory-page',
  imports: [
  ],
  templateUrl: './memory-page.html',
  styleUrl: './memory-page.css'
})
export class MemoryPage {

  constructor(private router: Router) {
  }

  goToStoryPage() {
    this.router.navigate(['/story']);
  }
}
