import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}
  createList(title: string): any {
    return this.webReqService.post('lists', { title });
  }
  createTasks(title: string, listId: string): any {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }
  getLists(): any {
    return this.webReqService.get('lists');
  }
  getTasks(listId: string): any {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
  complete(task: any): any {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed,
    });
  }
}
