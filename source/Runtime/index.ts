declare global {
  interface Window {
    // Inject by gather app
    game: {
      subscribeToEvent: () => void;
    };
  }
}

console.log("Runtime Loaded");
const job = setInterval(() => {
  if (typeof window.game !== "undefined") {
    clearInterval(job);
    // eslint-disable-next-line no-undef
    console.log("game", window.game);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.game.subscribeToEvent("playerChats", (a, b, c) =>
      console.log("eventchat", a, b, c)
    );
  }
}, 500);

export {};
