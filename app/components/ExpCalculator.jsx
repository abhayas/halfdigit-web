import { Info } from 'lucide-react';

function ExpCalculatorClient({ years, months, days, todayFormatted }) {
  console.log(years)
  return (
    <span className="group relative inline-flex items-baseline gap-0.5 font-semibold text-slate-900 cursor-help border-b border-dashed border-slate-300">
      {years}+ years
      
      <sup className="relative -top-1">
        <Info size={10} className="text-blue-600" />
      </sup>

      {/* Tooltip Popup */}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col items-center gap-1 text-center leading-normal pointer-events-none">
        <span className="font-bold text-blue-200 uppercase tracking-wider text-[10px]">Total Experience</span>
        <span className="font-medium text-sm">
          {years} Years, {months} Months, {days} Days
        </span>
        <span className="text-slate-400 italic text-[10px] mt-1 pt-1 border-t border-slate-700 w-full">
          as of {todayFormatted}
        </span>
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></span>
      </span>
    </span>
  );
}

export default function ExpCalculator() {
  // Server-side only: Read & Parse Environment Variable
  const jobs = [{"start":"2007-08-22","end":"2008-04-10"},{"start":"2008-04-17","end":"2010-01-07"},{"start":"2010-06-23","end":"2011-06-30"},{"start":"2011-12-02","end":"2015-04-21"},{"start":"2015-04-24","end":"PRESENT"}]
  let totalMilliseconds = 0;

  jobs.forEach(job => {
    const startDate = new Date(job.start);
    let endDate;
    if (job.end === "PRESENT") {
      endDate = new Date();
    } else {
      endDate = new Date(job.end);
    }
    totalMilliseconds += endDate - startDate;
  });

  // Calculate Date Math
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor(totalMilliseconds / msPerDay);
  
  const years = Math.floor(totalDays / 365.25);
  const remainingDays = totalDays % 365.25;
  const months = Math.floor(remainingDays / 30.44);
  const days = Math.floor(remainingDays % 30.44);

  // Format Today's Date
  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return <ExpCalculatorClient years={years} months={months} days={days} todayFormatted={todayFormatted} />;
}