declare global {
  interface Window {
    // Inject by gather app
    game: {
      subscribeToEvent: <EventName extends keyof EventListeners>(
        eventName: EventName,
        listener: EventListeners[EventName]
      ) => void;
    };
  }
}

type EventListeners = {
  playerChats: (event: ChatEvent, game: unknown) => void;
  playerRequestsToLead: (
    event: RequestsToLeadEvent,
    player: EventPlayer
  ) => void;
};

type ChatEvent = {
  playerChats: {
    contents: string;
    recipient: "GLOBAL_CHAT" | "LOCAL_CHAT" | "DM";
    senderId: string;
    senderName: string;
  };
};
type RequestsToLeadEvent = {
  playerRequestsToLead: {
    encId: number;
    snapshot: string;
  };
};
type EventPlayer = {
  player: {
    name: string;
    busy: boolean;
    map: string;
    emojiStatus: string;
    textStatus: string;
  };
};

let hasFocus = true;

console.log("Runtime Loaded");

window.addEventListener("focus", () => {
  hasFocus = true;
});

window.addEventListener("blur", () => {
  hasFocus = false;
});

const job = setInterval(async () => {
  if (typeof window.game !== "undefined") {
    clearInterval(job);
    const permission = await Notification.requestPermission();

    console.log("[Notification Extension]", window.game);
    window.game.subscribeToEvent(
      "playerChats",
      async (event: ChatEvent, game) => {
        console.log("eventchat", event, game);
        if (permission === "granted") {
          if (!hasFocus) {
            const notification = new Notification(
              `[Gather] ${event.playerChats.senderName}: `,
              {
                body: event.playerChats.contents,
              }
            );

            notification.addEventListener("click", () => {
              window.focus();
            });
          }
        }
      }
    );

    window.game.subscribeToEvent(
      "playerRequestsToLead",
      async (event, player) => {
        console.log("playerRequestsToLead", event, player);
        if (permission === "granted") {
          if (!hasFocus) {
            const notification = new Notification(
              `[Gather] Request to follow`,
              {
                body: `${player.player.name} would like to lead you`,
              }
            );

            notification.addEventListener("click", () => {
              window.focus();
            });
          }
        }
      }
    );
  }
}, 500);

export {};
