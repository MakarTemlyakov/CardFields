import { CardItem } from "../CardItem/CardItem";
import { Link, } from "react-router-dom";
import { DataCard } from "../../reducers/appReducer";

export const CardItems = ({ cards }) => {
    return <ul className="flex flex-col gap-2 w-full overflow-y-auto absolute top-0 left-0 p-3 h-full">
        {cards.map((card: DataCard) => (
            <Link to={`/cards/${card.id}`} key={card.id}><CardItem card={card} /></Link>
        ))}
    </ul>
}


