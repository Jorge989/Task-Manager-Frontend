import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}
  createList(title: string): any {
    console.log('rq', title);
    return this.webReqService.post('lists', { title });
  }
  createTasks(title: string, listId: string): any {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }
  getLists(): any {
    return this.webReqService.get('lists');
  }
  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
  complete(task: any): any {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed,
    });
  }
  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }
  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }
  updateList(id: string, title: string) {
    return this.webReqService.patch(`lists/${id}`, { title });
  }
  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, {
      title,
    });
  }
}
