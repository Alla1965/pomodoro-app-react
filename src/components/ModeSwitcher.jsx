import React from "react";

function ModeSwitcher({ mode, setMode, settings  }) {
    const modes = [
    { id: "pomodoro", label: "pomodoro" },
    { id: "short", label: "short break" },
    { id: "long", label: "long break" },
  ];

    const colorMap = {
    red: "bg-red-400",
    cyan: "bg-cyan-300",
    purple: "bg-purple-400",
  };

  const fontMap = {
    kumbh: "font-[Kumbh_Sans]",
    roboto: "font-[Roboto_Slab]",
    mono: "font-[Space_Mono]",
  };

  return (
    <div className={`flex flex-col justify-center gap-10 mb-6 text-blue-100
                  md:gap-12 2xl:gap-[14px]
                  ${fontMap[settings.font] || ""}`}>

          <p className="text-[24px] text-center text-blue-100 
                        md:text-[32px] ">pomodoro</p>
        
    <ul className="flex w-[330px] justify-between md:w-[360px]">
       {modes.map((m) => {
         console.log("m.id:", m.id);

          return (
            <li key={m.id}>
            <button
               onClick={() => setMode(m.id)}
               className={`px-[19.5px] py-[16.5px] rounded-[26.5px]
                 text-xs w-[120px]
                 md:text-sm md:leading-[1.2] md:px-[21.5px]
                 ${mode === m.id 
                 ? `${colorMap[settings.color] || "bg-red-400"} text-white`
                    : "opacity-40"
                }
               `}
             >
              {m.label}
                            
            </button>
            </li>
          );
           })}
    </ul>
     

    </div>
  );
}

export default ModeSwitcher;