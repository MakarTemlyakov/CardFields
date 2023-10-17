import { AppContext } from "../../App";

import { useContext } from 'react';
import { CardItem } from "../CardItem/CardItem";
import { Link, } from "react-router-dom";
import { DataCard } from "../../reducers/appReducer";



const cardList = (cards: DataCard[]) => {
    return <ul className="flex flex-col gap-2 w-full overflow-y-auto absolute top-0 left-0 p-3 h-full">
        {cards.map((card: DataCard) => (
            <Link to={`/cards/${card.id}`} key={card.id}><CardItem card={card} /></Link>
        ))}
    </ul>
}

export const CardItems = () => {
    const { cards } = useContext(AppContext);
    return <div className="">
        {cards.length > 0 ? cardList(cards) : <div>Нет карточек</div>}
    </div>
}


