import { Route, Routes } from "react-router-dom"
import LoginAdmin from "./Login Admin"
import App from "./App"






import { io } from "socket.io-client";
import KhuTuTri from "./KhuTuTri";

// Kết nối đến server WebSocket
const socket = io(import.meta.env.VITE_PORT_SERVER, {
  transports: ["websocket"], // Sử dụng WebSocket thay vì polling
  reconnection: true, // Tự động kết nối lại nếu mất kết nối
});

const Routed = ()=>{
    socket.on("connect", () => {
        console.log("Connected to server");
    })
    return <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/:id" element={<KhuTuTri />} />
    </Routes>
}
export {
    socket
}

export default Routed;