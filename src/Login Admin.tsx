import { useEffect, useState } from "react";
import { loginAdmin } from "./nextPageAdmin";
import { useNavigate } from "react-router-dom";


const LoginAdmin: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigation = useNavigate()

    useEffect(() => {

    }, [])

    return (
        <div className="p-4 border rounded-lg text-center">
            <h1 className="text-xl font-bold">Login Admin</h1>
            <div className="mt-4">
                <label className="block mb-2">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </label>
                <label className="block mb-2">
                    Mật khẩu:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </label>
                <button
                    onClick={() => loginAdmin(email, password, navigation)}
                    className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
                >
                    Nhập
                </button>
            </div>
        </div>
    );
};

export default LoginAdmin;
