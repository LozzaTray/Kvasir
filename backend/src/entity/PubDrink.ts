import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Pub } from "./Pub";
import { Drink } from "./Drink";

@Entity()
export class PubDrink {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Pub)
    @JoinColumn({ name: "pubId" })
    pub: Pub;

    @ManyToOne((type) => Drink)
    @JoinColumn({ name: "drinkId" })
    drink: Drink;

    @Column()
    pence: number;
}
