import { CardsContext } from "../../App";

import { useContext } from 'react';
import { CardItem } from "../CardItem/CardItem";
import { Link, } from "react-router-dom";


export const CardItems = () => {
    const { cards } = useContext(CardsContext);
    console.log({ cards });
    return <ul className="flex flex-col gap-2 w-full h-[60%] overflow-y-scroll ">
        {cards.length > 0 ?
            cards.map((card) => (
                <Link to={`/cards/${card.id}`} key={card.id}><CardItem card={card} /></Link>
            )) : <div>Нет карточек</div>
        }
    </ul>


}


