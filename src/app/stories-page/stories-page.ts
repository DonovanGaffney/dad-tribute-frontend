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
import {Image} from '../image/image';

@Component({
  selector: 'app-stories-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    RouterLink,
    Image,
  ],
  templateUrl: './stories-page.html',
  styleUrl: './stories-page.css'
})
export class StoriesPage implements OnInit, OnDestroy {
  stories: WritableSignal<StoryDto[]> = signal([]);
  imageOpen: WritableSignal<boolean> = signal(false);
  private storiesSubscription?: Subscription;

  constructor(private storyService: StoryService) {
  }

  ngOnInit() {
    this.updateStories();

    let minutes = 5;
    this.storiesSubscription = interval(minutes * 60 * 1000).subscribe(() => {
      if(!this.imageOpen()) {
        this.updateStories();
      }
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
