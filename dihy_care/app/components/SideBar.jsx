import {ChevronFirst} from "lucide-react"

export default function Sidebar ({children}){
    return(
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-slate-800 border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={"/LogoClaro.png"} className="w-32" alt="" />
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-300">
                        <ChevronFirst />
                    </button>
                </div>
                <ul className="flex-1 px-3 ">{children}</ul>
                <div className="border-t flex p-3 ">

                </div>
                <div className={"flex justify-between items-center w-52 ml-3"}>
                    <div>
                        <h4 className="font-semibold"></h4>
                        <span className="text-xs text-gray-600"></span>
                        <MoreVertical size={20}/>
                    </div>

                </div>
            </nav>
        </aside>
    )
}
export function Sidebar ({icon, text, active, alert}){
    return(
        <li>
            {icon}
        </li>
    )
}