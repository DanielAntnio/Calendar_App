import { CaretLeft, CaretRight } from 'phosphor-react';
import { HeaderProps } from '../../types';

export const CalendarHeader = ({ value, nextItem, lastItem, disableLast = false, disableNext = false }: HeaderProps) =>
    <div className="bg-slate-500/80 dark:bg-gray-900/60 w-full justify-between items-center flex-row flex">
        <button 
            title='item anterior' 
            type='button' 
            className={`h-8 w-8 ${disableLast ? "" : "cursor-pointer"}`}
            onClick={() => lastItem()}
            disabled={disableLast}
        >
            <CaretLeft color={disableLast ? "#aaa" : "#ddd"} />
        </button>
        <h3 className='text-slate-200'>{value}</h3>
        <button 
            title='proximo item' 
            type='button' 
            className={`h-8 w-8 ${disableNext ? "" : "cursor-pointer"}`}
            onClick={() => nextItem()}
            disabled={disableNext}
        >
            <CaretRight color={disableNext ? "#aaa" : "#ddd"} />
        </button>
    </div>