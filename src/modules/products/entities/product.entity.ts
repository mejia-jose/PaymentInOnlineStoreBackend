import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";

@Entity('tbProducto')
export class ProductEntity extends BaseEntity
{

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    price :number;

    @Column()
    stock:number;

    @Column()
    image: string;
}