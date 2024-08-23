import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from '../services/Web Socket/web-socket-service.service';

@Component({
  selector: 'ngx-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.scss']
})
export class WebSocketComponent{
   /* constructor(private webSocketService: WebSocketService) {
    }

    sendMessage() {
        const message = {content: 'Hello, World!'};
        this.webSocketService.sendMessage('/app/some-endpoint', message);
    }*/
}
