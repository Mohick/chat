import axios from "axios";







const veryfiCode = (code:string,navigation:(key: string) => void)=>{
    if(code.trim().length == 6){
        axios.post(import.meta.env.VITE_PORT_SERVER.toString() + '/veryfi-code',{
            id:code
        },{
            withCredentials: true
        }).then((res) => {
            const data = res.data as {
                success: boolean
            };
            if (data.success) {
                navigation(code)
            }
            
    
        });
    }
}

export {
    veryfiCode
}