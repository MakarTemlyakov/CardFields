export const CardItem = ({ card }) => {
    return <li className="bg-[#ebebeb] p-2 rounded-sm hover:bg-[#c5c5c5] transition-all cursor-pointer ">
        <h2 className="text-sm">{card.name}</h2>
    </li>
}