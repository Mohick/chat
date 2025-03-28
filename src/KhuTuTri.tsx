import { useCallback, useEffect, useState } from "react";
import { socket } from "./Router";
import { useParams } from "react-router-dom";
import {  Speaker } from "./assets/support voice";




const KhuTuTri = () => {
    const [isText, setIsText] = useState("");
    const { id } = useParams();
    useEffect(() => {
        socket.on("receive-voice", ((text: string) => {
            console.log(text);
            Speaker(text)
            
        }))
      
    }, [socket])
    const sendChat = useCallback((send: boolean) => {
        if (send && isText.trim().length > 0) {
            socket.emit("send", { text: isText, id });
            setIsText("")  // Nếu muốn reset tin nhắn sau khi gửi
        }
    }, [isText, id, socket]); 

    return (
        <div>
            <h2>Khu Tự Trị</h2>
            <div>
                <input onBlur={(e) => {
                    
                    setIsText(e.target.value)
                }}  type="text" placeholder="Nhập tin nhắn" className="p-2 border rounded w-full" />
                <button
                    onClick={() => sendChat(true)}
                    type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded w-full">Gửi</button>
            </div>
        </div>
    )
}

export default KhuTuTri;