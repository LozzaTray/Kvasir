import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pub {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lat: number;

    @Column()
    lng: number;
}
