import { server as WebSocketServer, connection } from "websocket";
import http from "http";
import {
  IncomingMessage,
  SupportedMessage,
} from "./messages/incommingMessages";
import {
  OutgoingMessage,
  SupportedMessage as OutgoingSupportedMessages,
} from "./messages/outgoingMessages";
import { UserManager } from "./UserManager";
import { InMemoryStore } from "./store/InMemoryStore";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});

const userManager = new UserManager();
const store = new InMemoryStore();

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true,
});

function originIsAllowed(origin: any) {
  return true;
}

wsServer.on("request", function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  var connection = request.accept("echo-protocol", request.origin);
  console.log(new Date() + " Connection accepted.");
  connection.on("message", function (message) {
    console.log(message);
    if (message.type === "utf8") {
      try {
        messageHandler(connection, JSON.parse(message.utf8Data));
      } catch (error) {}
    } else if (message.type === "binary") {
      console.log(
        "Received Binary Message of " + message.binaryData.length + " bytes"
      );
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on("close", function (reasonCode, description) {
    console.log(
      new Date() + " Peer " + connection.remoteAddress + " disconnected."
    );
  });
});

function messageHandler(ws: connection, message: IncomingMessage) {
  if (message.type == SupportedMessage.JoinRoom) {
    const payload = message.payload;
    userManager.addUser(payload.name, payload.userId, payload.roomId, ws);
  }

  if (message.type === SupportedMessage.SendMessage) {
    const payload = message.payload;
    const user = userManager.getUser(payload.roomId, payload.userId);
    if (!user) {
      console.log("User not found!");
      return;
    }
    let chat = store.addChats(
      payload.userId,
      user.name,
      payload.roomId,
      payload.message
    );
    if (!chat) {
      return;
    }

    const outgoingPayload: OutgoingMessage = {
      type: OutgoingSupportedMessages.AddChat,
      payload: {
        chatId: chat.id,
        roomId: payload.roomId,
        message: payload.message,
        name: payload.message,
        upvotes: 0,
      },
    };
    userManager.broadcast(payload.roomId, payload.userId, outgoingPayload);
  }

  if (message.type === SupportedMessage.UpvoteMessage) {
    const payload = message.payload;
    const chat = store.upVote(payload.userId, payload.roomId, payload.chatId);
    console.log("Inside Upvote");
    if (!chat) {
      return;
    }
    console.log("inside uvote 2");

    const outgoingPayload: OutgoingMessage = {
      type: OutgoingSupportedMessages.UpdateChat,
      payload: {
        chatId: payload.chatId,
        roomId: payload.roomId,
        upvotes: chat.upvotes.length,
      },
    };

    console.log("inside upvote 3");
    userManager.broadcast(payload.roomId, payload.userId, outgoingPayload);
  }
}
