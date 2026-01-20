import ReactDOM from "react-dom/client";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import App from "./App";
import "./App.css";

let root = null;

function render(container) {
  const mountElement =
    container?.querySelector("#sub-app-react") ||
    document.getElementById("sub-app-react");

  if (!mountElement) {
    console.error("React Sub App: Mount element not found!");
    return;
  }

  root = ReactDOM.createRoot(mountElement);
  root.render(<App />);
}

renderWithQiankun({
  bootstrap() {
    console.log("React Sub App bootstrapped");
  },
  mount(props) {
    console.log("React Sub App mount", props);
    render(props.container);
  },
  unmount() {
    console.log("React Sub App unmount");
    if (root) {
      root.unmount();
      root = null;
    }
  },
  update(props) {
    console.log("React Sub App update", props);
  },
});

// Standalone mode - รันเมื่อไม่ได้อยู่ใน Qiankun
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render(null);
}
