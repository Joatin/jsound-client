import { SocketService } from './socket.service';
import { Injectable } from '@angular/core';
import { Manager } from 'socket.io-client';
import { AuthService } from '../auth/auth.service';

/**
 * A socket service that dependes on the socket.io library.
 */
@Injectable()
export class IoSocketService implements SocketService {

  private manager = new Manager(process.env.SOCKET_URI, {
    autoConnect: false
  });

  private socket: any;

  constructor(
    private authService: AuthService
  ) {}

  public init(authToken: string): void {
    this.connect(authToken);
  }

  private connect(authToken: string): void {
    const self = this;
    this.manager.open((error) => {
      if (error) {
        console.log(error);
      } else {
        self.socket = self.manager.socket('/').open();
        self.socket.on('connect', self.handleConnect(authToken));
      }
    });
  };

  private handleConnect(authToken: string) {
    const self = this;
    return () => {
      self.socket
        .emit('authenticate', {token: authToken}) // send the jwt
        .on('authenticated', () => {
          // do other things
        })
        .on('unauthorized', (msg) => {
          self.authService.getRenewedToken().subscribe((token: string) => {
            self.handleConnect(token);
          });
          console.log('unauthorized: ' + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        });
    };
  }
}
