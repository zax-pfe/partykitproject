import "./styles.css";

import PartySocket from "partysocket";
import type * as Party from "partykit/server";

declare const PARTYKIT_HOST: string;

// Let's append all the messages we get into this DOM element
const output = document.getElementById("app") as HTMLDivElement;

// Helper function to add a new line to the DOM
function add(text: string) {
  output.appendChild(document.createTextNode(text));
  output.appendChild(document.createElement("br"));
}

const conn = new PartySocket({
  host: PARTYKIT_HOST,
  room: "my-room",
});

const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", () => {
    conn.send("Message to all connected users");
  });
}

conn.addEventListener("message", (e) => {
  console.log(e.data);
});
