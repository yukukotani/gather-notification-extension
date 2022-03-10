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

console.log("Runtime Loaded");
const job = setInterval(async () => {
  if (typeof window.game !== "undefined") {
    clearInterval(job);
    const permission = await Notification.requestPermission();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.game.subscribeToEvent("playerChats", (a: ChatEvent, b, c) => {
      if (permission === "granted") {
        new Notification(`[Gather] ${a.playerChats.senderName}: `, {
          body: a.playerChats.contents,
        });
      }
      console.log("eventchat", a, b, c, permission);
    });
  }
}, 500);

export {};
