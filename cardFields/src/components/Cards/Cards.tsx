import { Button } from "@mui/material";
import { DataCard } from "../../reducers/cardsReducer"
import { Card } from "../Card/Card"

interface CardsProps {
    cards: DataCard[];
}

export const Cards: React.FC<CardsProps> = ({ cards }) => {
    return <div className="flex flex-col h-full items-start gap-5">
        <Button variant='contained' color='primary'>ADD Card</Button>
        <div className="flex flex-grow items-center m-auto">
            {cards.length > 0 ?
                cards.map((card) => (
                    <Card onShowAddForm={() => { }} card={card} key={card.id} />
                )) : <div>Нет карточек</div>
            }
        </div>
    </div>
} 
