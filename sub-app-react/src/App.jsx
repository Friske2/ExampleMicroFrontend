import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="react-app">
      <div className="header">
        <h2>⚛️ React Sub App (Micro Frontend)</h2>
        <p className="subtitle">นี่คือ Micro Frontend ที่สร้างด้วย React</p>
      </div>

      <div className="content">
        <div className="card">
          <h3>⚛️ React Counter</h3>
          <div className="counter">
            <button onClick={() => setCount(count - 1)} className="counter-btn">
              -
            </button>
            <span className="count">{count}</span>
            <button onClick={() => setCount(count + 1)} className="counter-btn">
              +
            </button>
          </div>
          <p className="counter-note">React app ทำงานได้แล้ว!</p>
        </div>

        <div className="card">
          <h3>Features</h3>
          <ul className="features-list">
            <li>✅ React 18</li>
            <li>✅ Qiankun Integration</li>
            <li>✅ Vite Build</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
