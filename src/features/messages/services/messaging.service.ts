export interface MessagingTransport {
  send(threadId: string, authorId: string, body: string): Promise<void>;
}

export class MessagingService {
  constructor(private readonly transport: MessagingTransport) {}

  sendMessage(threadId: string, authorId: string, body: string) {
    return this.transport.send(threadId, authorId, body);
  }
}