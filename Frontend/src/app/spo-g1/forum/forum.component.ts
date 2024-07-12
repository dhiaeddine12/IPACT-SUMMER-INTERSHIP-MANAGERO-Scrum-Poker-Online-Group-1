import { Component, OnInit } from '@angular/core';
import {Forum, ForumService} from "../Services/forum/forum.service";

@Component({
  selector: 'ngx-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  currentUser: string = 'You'; // Replace this with actual user logic
  editingMessage: any | null = null;

  senderId: string; // Current user's ID
  receiverId: string; // ID of the user whose messages are being viewed
  newMessageContent: string;
  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.forumService.getForum().subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: Forum = { user: this.currentUser, content: this.newMessage.trim(), date: new Date().toISOString() };
      this.forumService.createForum(message).subscribe(() => {
        this.loadMessages();
        this.newMessage = '';
      });
    }
  }

  onKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  startEditing(message: Forum): void {
    this.editingMessage = { ...message };
  }
  saveEdit(): void {
    if (this.editingMessage) {
      this.forumService.updateForum(this.editingMessage).subscribe(() => {
        this.loadMessages();
        this.editingMessage = null;
      });
    }
  }

  cancelEdit(): void {
    this.editingMessage = null;
  }

  deleteMessage(id: number): void {
    this.forumService.deleteForum(id).subscribe(() => {
      this.loadMessages();
    });
  }
 /* confirmDelete(message: Forum): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this message from ${message.user}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMessage(message.id);
      }
    });
  }*/
}
