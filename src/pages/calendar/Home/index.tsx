import { CalendarBlank } from "phosphor-react";

export const Home = () => 
    <div className="flex items-center justify-center flex-col opacity-70">
        <CalendarBlank size={200} className="text-gray-900" />
        <p className="font-medium">Selecione um formato de calendário</p>
    </div>