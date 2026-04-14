import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Settings({ setTime,
  pomodoro,
  short,
  long,
  selectedFont,
  selectedColor, }) {
  console.log(localStorage);
  
 const navigate = useNavigate();
const [font, setFont] = useState(() => {

  
  const saved = JSON.parse(localStorage.getItem("pomodoro"));
  return saved?.font || "kumbh";
});
const [color, setColor] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("pomodoro"));
  return saved?.color || "red";
});
console.log(color);

const fonts = [
  { id: "kumbh", class: "font-[Kumbh_Sans]" },
  { id: "roboto", class: "font-[Roboto_Slab]" },
  { id: "mono", class: "font-[Space_Mono]" },
];
const colors = [
  { id: "red", class: "bg-red-400" },
  { id: "cyan", class: "bg-cyan-300" },
  { id: "purple", class: "bg-purple" },
];

const [pomodoroValue, setPomodoroValue] = useState(pomodoro);
const [shortValue, setShortValue] = useState(short);
const [longValue, setLongValue] = useState(long);

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("pomodoro"));

  if (saved) {
    setPomodoroValue(saved.pomodoro / 60);
    setShortValue(saved.short / 60);
    setLongValue(saved.long / 60);
  }
}, []);


const handleApply = () => {
    const data = {
      pomodoro: pomodoroValue  * 60,
      short: shortValue  * 60,
      long: longValue  * 60,
      font: font,
      color: color,
    };
    localStorage.setItem("pomodoro", JSON.stringify(data));
   console.log(localStorage);
   
      navigate("/"); // переход на главную
  };

function Counter({ value, setValue }) {
  const MIN = 1;
  const MAX = 60;
const [inputValue, setInputValue] = useState(String(value));
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleUp = () => {
    if (value < MAX) setValue(value + 1);
  };

  const handleDown = () => {
    if (value > MIN) setValue(value - 1);
  };

  return (
    <div className="relative w-[140px]">
      {/* Input */}
 <input
        type="number"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value); // 👈 НЕ трогаем setValue
        }}
        onBlur={() => {
          let num = Number(inputValue);

          if (isNaN(num) || inputValue === "") num = MIN;
          if (num > MAX) num = MAX;
          if (num < MIN) num = MIN;

          setValue(num);            // 👈 обновляем только тут
          setInputValue(String(num)); // синхронизируем
        }}
        className="w-full bg-[#dfe3f4] rounded-lg px-4 py-[11.5px] pr-10"
      />

      {/* Стрелки */}
      <div className="absolute right-3 inset-y-0 flex flex-col justify-center gap-[9px]">
        <img
          src="./src/assets/image/icon-arrow-up.svg"
          alt="up"
          className=" w-3 cursor-pointer"
          onClick={handleUp}
        />
        <img
          src="./src/assets/image/icon-arrow-down.svg"
          alt="down"
          className=" w-3 cursor-pointer"
          onClick={handleDown}
        />
      </div>
    </div>
  );
}


  const fields = [
    { key: "pomodoro", label: "pomodoro", value: pomodoroValue, setValue: setPomodoroValue },
    { key: "short", label: "short break", value: shortValue, setValue: setShortValue },
    { key: "long", label: "long break", value: longValue, setValue: setLongValue },
];

return (
  <div className="bg-[#0f1226] flex items-center justify-center min-h-screen">
    
    <div className="bg-white relative w-[327px] rounded-[15px] pt-[18px] pb-[27px] px-[23px]
                    md:w-[540px] md:pt-[33px] md:px-9">

      {/* Header */}
        <div className="flex justify-between items-center mb-4 md:mb-8">
        <h2 className="text-[28px] text-blue-900">Settings</h2>

        <button onClick={() => navigate("/")}>
          <img src="./src/assets/image/icon-close.svg" alt="Close settings" />
        </button>  
        </div> 

      <hr className="mb-4 md:mb-8" />

      {/* TIME */}
      <p className="text-[11px] tracking-[4.23px] text-center !mb-4 text-blue-900
                    md:text-[13px] md:tracking-[5px]">
        TIME (MINUTES)
      </p>

      
      <ul className="flex flex-col gap-2 md:flex-row md:justify-between mb-6">
           {fields.map((field) => {
               console.log(field.value);
               return (
                   <li
      
                     key={field.key}
                     className="flex justify-between items-center md:flex-col"
                   >
                     <span className="text-xs opacity-40 md:mb-2">
                       {field.label}
                     </span>

                   <Counter
                       value={field.value}
                       setValue={field.setValue}
                     />
                   </li>
     );
 })}
      </ul>

      <hr className="my-6" />

      {/* FONT */}
      <div className="flex flex-col gap-4 items-center mb-6 md:flex-row md:justify-between">
        <p className="text-[11px] tracking-[4.23px] text-[var(--blue-900)]">
          FONT
        </p>

      <div className="flex gap-4">
        {fonts.map((f) => (
           <button
              key={f.id}
              onClick={() => setFont(f.id)}
              className={`w-10 h-10 rounded-full flex flex-row items-center justify-center
                ${f.class}
                ${
                  font === f.id
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black opacity-40"
                }
              `}
             >
               Aa
             </button>
    
         ))} 
      </div>
      </div>

      {/* COLOR */}
      <div className="flex flex-col gap-4 items-center mb-8 md:flex-row md:justify-between">
        <p className="text-[11px] tracking-[4.23px] text-[var(--blue-900)]">
          COLOR
        </p>

        <div className="flex gap-4">
            {colors.map((c) => (
             <button
              key={c.id}
              onClick={() => setColor(c.id)}
              className={`w-10 h-10 rounded-full flex flex-row items-center justify-center
                ${c.class}
                ${ color === c.id }
               `}
                >

                 {color === c.id && (
              <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"  >
               <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
             
             </button>
    
         ))}
          
        </div> 

      </div>

      {/* APPLY */}
      <button onClick={handleApply}
              className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2
                         w-[140px] h-[53px]
                        bg-[#f87070] text-white py-3 rounded-[26.5px] shadow-lg" >
        Apply
      </button>

    </div>
  </div>
);
}
export default Settings;