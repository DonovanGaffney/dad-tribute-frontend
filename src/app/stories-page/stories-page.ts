import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from "../components/input/input.component";
import {MultiFileInputComponent} from "../components/multi-file-input/multi-file-input.component";
import {TextAreaComponent} from "../components/text-area/text-area.component";
import {StoryDto} from './stories.models';
import {StoryService} from '../services/story';
import { interval, Subscription } from 'rxjs';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-stories-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './stories-page.html',
  styleUrl: './stories-page.css'
})
export class StoriesPage implements OnInit, OnDestroy {
  stories: WritableSignal<StoryDto[]> = signal([]);
  private storiesSubscription?: Subscription;

  constructor(private storyService: StoryService) {
  }

  ngOnInit() {
    this.updateStories();

    this.storiesSubscription = interval(10000).subscribe(() => {
      this.updateStories();
    });

  }

  ngOnDestroy() {
    if (this.storiesSubscription) {
      this.storiesSubscription.unsubscribe();
    }
  }

  updateStories() {
    this.storyService.getStories().subscribe({
      next: (data: StoryDto[]) => {
        this.stories.set(data)
      },
      error: error => console.log(error),
    })
  }
}
