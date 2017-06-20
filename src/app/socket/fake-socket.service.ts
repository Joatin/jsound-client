import { SocketService } from './socket.service';

export class FakeSocketService implements SocketService {
  public init(authToken: string): void {
    console.log('fake init');
  }

}
