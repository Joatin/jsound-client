import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';
import { Manager } from 'socket.io-client'

/**
 * A socket service that dependes on the socket.io library.
 */
@Injectable()
export class IoSocketService implements SocketService {

  private manager = new Manager(process.env.SOCKET_URI || 'http://localhost:3100', {
    autoConnect: false
  });

  private socket: any;

  constructor() {}

  public init(authToken: string): void {
    this.connect(authToken);
  }

  private connect(authToken: string): void {
    const self = this;
    this.manager.open((error)=>{
      if(error){
        console.log(error);
      } else {
        self.socket = self.manager.socket('/').open();
        self.socket.on('connect', self.handleConnect(authToken));
      }
    })
  };

  private handleConnect(authToken: string) {
    const self = this;
    return ()=>{
      console.log('token');
      console.log(authToken);
      self.socket
        .emit('authenticate', {token: authToken}) //send the jwt
        .on('authenticated', () => {
          //do other things
          console.log('socket authenticated');
        })
        .on('unauthorized', (msg) => {
          console.log("unauthorized: " + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        })
    }
  }

}
