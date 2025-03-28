import { socket } from "../Router";



const requireMicro = async (id:string) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        if (stream.active) {
            console.log("��� Micro đã hoạt đ��ng");
            listener(stream,id)
            return true;
        }
        console.log("Micro chưa hoạt đông");
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const Speaker = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.7;
    synth.speak(utterance);
}
const listener = (stream: MediaStream,id:string) => {
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];
    // Khi có dữ liệu ghi âm, lưu vào mảng
    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob([audioChunks[audioChunks.length - 1]], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);


        console.log("🎵 File ghi âm:", audioUrl);
        // Phát lại file âm thanh
        const audio = new Audio(audioUrl);
        audio.play()
        callServerIO(audio,id)
    };
    const audioContext = new AudioContext();
    const audioInput = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    audioInput.connect(analyser);

    analyser.fftSize = 256; // Kích thước phân tích tần số
    const bufferLength = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);

    let start = false;
    const checkStart = true;
    const detectVoice = () => {
        analyser.getByteFrequencyData(frequencyData);
        const volume = frequencyData.reduce((sum, val) => sum + val, 0) / bufferLength;
        if (volume >40) {
            // console.log("�� Bắt đầu ghi ��m...");
            if (start != checkStart) {
                start = checkStart;
                mediaRecorder.start();
            }
        } else {
            if (start) {
                console.log("�� Dừng ghi ��m...");
                start = false;
                mediaRecorder.stop();

            }
            console.log("🤐 Im lặng...");
        }

        requestAnimationFrame(detectVoice); // Tiếp tục lắng nghe
    };

    detectVoice();
};
const callServerIO = (audio:HTMLAudioElement,id:string)=>{
    console.log("send to server"); 
    socket.emit("send-voice",{item:audio.src,id})
}
export {
    requireMicro,
    Speaker
}