import { CaretLeft, CaretRight } from 'phosphor-react';
import { HeaderProps } from '../../types';

export const CalendarHeader = ({ value, nextItem, lastItem }: HeaderProps) =>
    <div className="bg-slate-500/80 dark:bg-gray-900/60 w-full justify-between items-center flex-row flex">
        <CaretLeft color='#ddd' onClick={() => lastItem()} className="cursor-pointer" />
        <h3 className='text-slate-200'>{value}</h3>
        <CaretRight color='#ddd' onClick={() => nextItem()} className="cursor-pointer" />
    </div>