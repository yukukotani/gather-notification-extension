declare global {
  interface Window {
    // Inject by gather app
    game: {
      subscribeToEvent: (
        eventName: "playerChats",
        listener: (event: ChatEvent, game: unknown) => void
      ) => void;
    };
  }
}

type ChatEvent = {
  playerChats: {
    contents: string;
    recipient: "GLOBAL_CHAT" | "LOCAL_CHAT" | "DM";
    senderId: string;
    senderName: string;
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

    window.game.subscribeToEvent(
      "playerChats",
      async (event: ChatEvent, game) => {
        if (permission === "granted") {
          if (!hasFocus) {
            new Notification(`[Gather] ${event.playerChats.senderName}: `, {
              body: event.playerChats.contents,
            });
          }
        }
        console.log("eventchat", event, game);
      }
    );
  }
}, 500);

export {};
