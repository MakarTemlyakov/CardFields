export const CardItem = ({ card }) => {
    return <li className="bg-[#ffffff] p-2 rounded-sm hover:bg-[#c5c5c5] transition-all cursor-pointer shadow-sm dark:bg-slate-700" >
        <h2 className="text-sm">{card.name}</h2>
    </li>
}