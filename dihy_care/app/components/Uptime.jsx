import CountUp from 'react-countup';

export default function Uptime({ number, unit, secondaryNumber, secondaryUnit, name }) {
  return (
    <div className="flex flex-col w-full p-4 rounded-lg bg-green-100 text-black shadow-md">
     
      {/* Valores principales */}
      <div className="flex items-baseline justify-center gap-5 w-full">
        {/* Valor principal */}
        <div className="flex items-baseline space-x-1">
          <CountUp 
            end={number} 
            duration={2} 
            separator="," 
            className="text-3xl font-bold" 
          />
          <span className="text-xl">{unit}</span>
        </div>

        {/* Valor secundario */}
        {secondaryNumber !== undefined && (
          <div className="flex items-baseline space-x-1">
            <CountUp 
              end={secondaryNumber} 
              duration={2} 
              separator="," 
              className="text-xl font-semibold" 
            />
            <span className="text-lg">{secondaryUnit}</span>
          </div>
        )}
      </div>
    </div>
  );
}
