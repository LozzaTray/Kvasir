import { IDrink } from "../model/drink";

const drinks = [
    {
        venue: "St John's College Bar",
        lat: 52.20805855420469,
        lng: 0.11630382846607584,
        beverage: "Tetley's",
        pence: 215
    },
    {
        venue: "The Mitre",
        lat: 52.20888571694211,
        lng: 0.11814968298960132,
        beverage: "Nicholson's Pale Ale",
        pence: 420
    },
    {
        venue: "The Pickerel",
        lat: 52.20996368667585, 
        lng: 0.11618023558240591,
        beverage: "Foster's",
        pence: 370
    }
]

const getDrinks = (): IDrink[] => {
    // TODO: Hook up with api once built
    return drinks;
}

export { getDrinks }