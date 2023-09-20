import { DataCard } from "../../reducers/cardsReducer"
import { CardItem } from "../CardItem/CardItem";


interface CardItemsProps {
    cards: DataCard[];
}

export const CardItems: React.FC<CardItemsProps> = ({ cards }) => {
    return <ul className="flex flex-col gap-2 w-full">
        {cards.length > 0 ?
            cards.map((card) => (
                // <Card onShowAddForm={() => { }} card={card} key={card.id} />
                <CardItem card={card} />
            )) : <div>Нет карточек</div>
        }
    </ul>

}


