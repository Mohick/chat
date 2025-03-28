import axios from "axios";











const nextPageAdmin = (navigation: (key: string) => void) => {

    const signtureKey = prompt("NHập Mã Admin")
    if (signtureKey === "ngulaotinh") {
        navigation("/admin")
    } else {
        alert("Mã Admin không đúng!")
    }
}
const loginAdmin = (email: string, password: string, navigation: (key: string) => void) => {
    // Regex kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        console.error("❌ Email không hợp lệ!");
        return;
    }

    if (!password.trim()) {
        console.error("❌ Mật khẩu không được để trống!");
        return;
    }
    axios.post(import.meta.env.VITE_PORT_SERVER.toString() + '/login',{
        email: email,
        password: password
    },{
        withCredentials: true
    }).then((res) => {
        const data = res.data as {
            success: boolean
        };
        if (data.success) {
            navigation("/")
        }
        

    });
    console.log("✅ Đăng nhập thành công!");

    // Chuyển hướng đến trang 9 (ví dụ: /dashboard)
    // navigation("/");
};
export {
    nextPageAdmin, loginAdmin
}