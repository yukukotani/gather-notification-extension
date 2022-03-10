import * as React from "react";
import { browser, Tabs } from "webextension-polyfill-ts";

import "./styles.scss";

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({ url });
}

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <h2>gather-notification-extension</h2>
      <button
        onClick={() =>
          openWebPage("https://github.com/Monchi/gather-notification-extension")
        }
      >
        GitHub
      </button>
    </section>
  );
};

export default Popup;
