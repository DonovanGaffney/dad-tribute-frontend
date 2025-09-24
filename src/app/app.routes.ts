import { Routes } from '@angular/router';
import {StoryPage} from './story-page/story-page';
import {MemoryPage} from './memory-page/memory-page';
import {StoriesPage} from './stories-page/stories-page';

export const routes: Routes = [
  {
    title: 'Bill\'s Memories',
    path: '',
    component: MemoryPage
  },
  {
    title: 'Bill\'s Memories',
    path: 'story',
    component: StoryPage
  },
  {
    title: 'Bill\'s Memories',
    path: 'stories',
    component: StoriesPage
  },
  {
    title: 'Bill\'s Memories',
    path: '**',
    component: MemoryPage
  },
];
