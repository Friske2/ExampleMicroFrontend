import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

let root = null;

function render(container) {
  const mountElement = container || document.getElementById("sub-app-react");

  if (!mountElement) {
    console.error("React Sub App: Mount element not found!");
    return;
  }

  root = ReactDOM.createRoot(mountElement);
  root.render(<App />);
}

// Qiankun lifecycle functions
export async function bootstrap() {
  console.log("React Sub App bootstrapped");
}

export async function mount(props) {
  console.log("React Sub App mount", props);
  const { container } = props;
  render(container ? container.querySelector("#sub-app-react") : null);
}

export async function unmount() {
  console.log("React Sub App unmount");
  if (root) {
    root.unmount();
    root = null;
  }
}

// Standalone mode - รันเมื่อไม่ได้อยู่ใน Qiankun
if (!window.__POWERED_BY_QIANKUN__) {
  render(null);
}

// Export function เพื่อให้ App component ใช้งาน props
export function getQiankunProps() {
  return qiankunProps;
}
