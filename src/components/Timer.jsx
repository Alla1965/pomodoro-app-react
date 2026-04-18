
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Timer({ settings, mode }) {

  const navigate = useNavigate();
  const [time, setTime] = useState(settings.pomodoro);
  const [isRunning, setIsRunning] = useState(false);

const fontMap = {
  kumbh: "font-sans",
  roboto: "font-serif",
  mono: "font-mono",
};
  
const colorMap = {
  red: "#F87070",
  cyan: "#70F3F8",
  purple: "#D881F8",
};

  // Формат времени
  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // 🔵 Круг
    const radius = 120;
    const circumference = 2 * Math.PI * radius; //Длина окружности
    const duration = settings[mode] || 1;
    const progress = time / duration;
    const offset = circumference  * (1 - progress);

 function handleFocus() {
  const saved = JSON.parse(localStorage.getItem("pomodoro"));
  if (saved) {
    // setSettings(saved);
    setTime(saved.pomodoro); 
  }
} 

useEffect(() => {
  setTime(settings[mode]);
  setIsRunning(false);
}, [mode, settings]);


useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setTime((prev) => {
      if (prev <= 0) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning]);

// 🔄 Обновление после возврата со Settings
  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

    return (
    <div className="flex flex-col items-center justify-center">

      {/* circle */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsRunning(!isRunning)}
      >
        <svg width="300" height="300">
          {/* Фон */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke="#1E2140"
            strokeWidth="12"
            fill="none"
          />

          {/* Прогресс */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke={colorMap[settings.color]}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 150 150)"
          />
        </svg>

        {/* Центр */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1  className={`text-5xl text-blue-100 font-bold ${fontMap[settings.font] || "font-sans"}`}>        
            {formatTime()}
          </h1>

                 <p className={`tracking-[6px] text-blue-100 text-sm mt-2 ${fontMap[settings.font] || "font-sans"}`}>
                      {isRunning ? "PAUSE" : "START"}
                  </p>
        </div>
      </div>

{/* SETTINGS */}
    <button  onClick={() => navigate("/settings")}
              className="mt-12 opacity-50 hover:opacity-100 transition">
      <img
        className="w-[28px]"
        src="/icon-settings.svg"
        alt="Settings"
      />
    </button>

    </div>
    
    

  );
}

export default Timer;