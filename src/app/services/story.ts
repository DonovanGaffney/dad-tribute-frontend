import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SAVE_STORY_URL} from './constants';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  constructor(private httpClient: HttpClient) {
  }

  uploadStory(story: FormData) {
    return this.httpClient.post(SAVE_STORY_URL, story);
  }
}
