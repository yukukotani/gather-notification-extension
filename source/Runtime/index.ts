declare global {
  interface Window {
    // Inject by gather app
    game: {
      subscribeToEvent: () => void;
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.game.subscribeToEvent("playerChats", async (a: ChatEvent, b, c) => {
      if (permission === "granted") {
        if (!hasFocus) {
          new Notification(`[Gather] ${a.playerChats.senderName}: `, {
            body: a.playerChats.contents,
          });
        }
      }
      console.log("eventchat", a, b, c, permission);
    });
  }
}, 500);

export {};
