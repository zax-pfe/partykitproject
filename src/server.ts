import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
    );

    // let's send a message to the connection
    conn.send("hello from server");
  }

  onMessage(message: any, sender: Party.Connection) {
    // Pour debug : voyons ce qu'on reçoit vraiment
    console.log("Raw message:", message);

    // Si c’est un MessageEvent, on récupère le .data
    const text = typeof message === "string" ? message : message.data;

    console.log(`connection ${sender.id} sent message: ${text}`);

    this.room.broadcast(`${sender.id}: ${text}`, [sender.id]);
  }
}

Server satisfies Party.Worker;
