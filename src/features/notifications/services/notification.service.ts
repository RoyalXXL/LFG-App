export interface NotificationChannel {
  send(userId: string, payload: { title: string; body: string }): Promise<void>;
}

export class NotificationService {
  constructor(private readonly channels: NotificationChannel[]) {}

  async dispatch(userId: string, title: string, body: string) {
    await Promise.all(this.channels.map((ch) => ch.send(userId, { title, body })));
  }
}