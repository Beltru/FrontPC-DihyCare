import CountUp from "react-countup";

export default function Pasos({ number, maxValue, name }) {
  const radius = 90; // radio del círculo
  const stroke = 12; // grosor del borde
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  // calcular porcentaje de llenado
  const progress = Math.min(number / maxValue, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center p-4 text-black">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2}>
          {/* Círculo de fondo */}
          <circle
            stroke="#555"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Círculo de progreso */}
          <circle
            stroke="#00ff00"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>

        {/* Número centrado */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="text-xl ">
            <CountUp end={number} duration={1.5} separator="," /> /{" "}
            <CountUp end={maxValue} duration={0} separator="," />
          </div>
          <span className="">{name}</span>
        </div>
      </div>
    </div>
  );
}
