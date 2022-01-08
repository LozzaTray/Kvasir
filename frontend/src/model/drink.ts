export interface IPub {
    name: string;
    lat: number;
    lng: number;
}

export interface IDrink {
    name: string;
}

export interface IPubDrink {
    pub: IPub;
    drink: IDrink;
    pence: number;
}
