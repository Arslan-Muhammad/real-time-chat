export type UserId = string;

export interface Chat {
  id: string;
  userId: UserId;
  name: string;
  message: string;
  upvotes: UserId[];
}
export abstract class Store {
  constructor() {}
  initRoom(roomId: string) {}
  getChats(room: string, limit: number, offset: number) {}
  addChats(userId: string, name: string, room: string, message: string) {}
  upVote(userId: string, room: string, chatId: string) {}
}
