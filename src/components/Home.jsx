import ModeSwitcher from "../components/ModeSwitcher";
import Timer from "../components/Timer";

import { useState, useEffect } from "react";

function Home() {

   //начальное значение settings (из localStorage)
    const [settings, setSettings] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("pomodoro"));

    return (
      saved || {
        pomodoro: 25 * 60,
        short: 5 * 60,
        long: 15 * 60,
        font: "kumbh",
        color: "red",
      }
    );
  });
//начальное значение режима mode ("pomodoro")
 const [mode, setMode] = useState("pomodoro");

  // обновление после возврата из Settings
 // когда компонент получает фокус, читает localStorage → обновляет settings
  useEffect(() => {
    const handleFocus = () => {
      const saved = JSON.parse(localStorage.getItem("pomodoro"));
      if (saved) setSettings(saved);
    };

    window.addEventListener("focus", handleFocus);

    //выполняется, когда компонент уходит с экрана
    //если не удалить, браузер будет хранить все старые обработчики,приложение начинает тормозить
    //всё, что создаёшь в useEffect → нужно очищать
    
    return () => window.removeEventListener("focus", handleFocus);
  }, []); 
console.log(mode);


  return (
   <div className="h-screen flex items-center justify-center">
   <div className="flex flex-col bg-[var(--gradient-primary)] w-[375px] items-center justify-center
                   pt-8 pb-[47px] px-[22px]
                   md:pt-20 md:pb-[103px] md:px-[179px] md:w-[768px]
                   xxl:pt-12 xxl:pb-[55px] xxl:px-[515px] xxl:w-[1440px]">

      {/* переключатель */}
            
        <ModeSwitcher mode={mode} setMode={setMode} settings={settings} />

      {/* таймер */}
       <Timer settings={settings} mode={mode} />

    </div>
    </div>
  );
}

export default Home;