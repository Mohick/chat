
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'
import { nextPageAdmin } from './nextPageAdmin';
import { useNavigate } from 'react-router-dom';
import { veryfiCode } from './join chat';
import { socket } from './Router';



function App() {

  const [isAdmin, setIsAdmin] = useState(false)
  const [taoMa, setTaoMa] = useState("")
  const [code,setCode] = useState("")
  const navigation = useNavigate()
  useEffect(() => {
   
    axios.get(import.meta.env.VITE_PORT_SERVER.toString() + '/hasLogin', {
      withCredentials: true,
    }).then((res) => {
      const data = res.data as {
        success: boolean
      };
      setIsAdmin(data.success);
    });
    socket.emit("register",undefined)

  }, []);

  const taoMaa = useCallback(() => {


    axios.post(import.meta.env.VITE_PORT_SERVER.toString() + '/create-code', {}, {
      withCredentials: true,
    }).then((res) => {
      const data = res.data as {
        success: boolean,
        code: string
      };

      if (data.success) {
        alert('Tạo má giải ma thanh cong')
        setTaoMa(data.code)
      } else {
        alert('Tạo mã giải mã thất bại')
      }
    });
  }, [])
  return (
    <div className="p-4 border rounded-lg text-center">
      <h2 className="text-lg font-bold">Nhập mã voice</h2>
      {isAdmin && <div onClick={() =>!(taoMa) && taoMaa()} className="mt-4 p-2 bg-yellow-500 text-white rounded w-full cursor-pointer">
        {taoMa ? taoMa : "Tạo Mã"}
      </div>}
      <div className="mt-4">
        <input onChange={(e) => setCode(e.target.value)} className="p-2 border rounded w-full" type="text" placeholder="Nhập mã giải mã" />
        <button onClick={()=>veryfiCode(code,navigation)}  className="mt-2 p-2 bg-blue-500 text-white rounded w-full" type="submit">Truy Cập </button>
      </div>
      {!isAdmin && <div onClick={() => nextPageAdmin(navigation)} className="mt-4 p-2 bg-green-500 text-white rounded w-full" >
        Đăng Nhập Admin
      </div>}
    </div>

  );

}

export default App
