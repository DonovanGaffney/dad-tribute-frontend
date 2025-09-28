import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Get_STORY_URL, SAVE_STORY_URL} from './constants';
import {StoryDto} from '../stories-page/stories.models';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  constructor(private httpClient: HttpClient) {
  }

  uploadStory(story: FormData) {
    return this.httpClient.post(SAVE_STORY_URL, story);
  }

  getStories() {
    return this.httpClient.get<StoryDto[]>(Get_STORY_URL);
  }
}
