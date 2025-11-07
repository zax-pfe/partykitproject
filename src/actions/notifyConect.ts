import type * as Party from "partykit/server";

export default class WebSocketServer implements Party.Server {
  constructor(readonly room: Party.Room) {}
  // when a client sends a message
  onMessage(message: string, sender: Party.Connection) {
    // send it to everyone else
    this.room.broadcast(message, [sender.id]);
  }
  // when a new client connects
  onConnect(connection: Party.Connection) {
    // welcome the new joiner
    connection.send(`Welcome, ${connection.id}`);
    // let everyone else know that a new connection joined
    this.room.broadcast(`Heads up! ${connection.id} joined the party!`, [
      connection.id,
    ]);
  }
  // when a client disconnects
  onClose(connection: Party.Connection) {
    this.room.broadcast(`So sad! ${connection.id} left the party!`);
  }
}
