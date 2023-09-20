export const CardItem = ({ card }) => {
    return <li className="bg-[#ebebeb] p-8 w-full rounded-sm hover:bg-[#c5c5c5] transition-all cursor-pointer">
        <h2 className="text-sm ">{card.id}</h2>
    </li>
}