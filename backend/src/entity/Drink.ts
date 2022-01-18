import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Drink {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
