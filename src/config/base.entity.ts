import { Column, CreateDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type:'timestamp',
        name:'created_at'
    })
    created_at: Timestamp;

    @UpdateDateColumn({
        type:'timestamp',
        name:'updated_at'
    })
    updated_at: Timestamp;

    @Column()
    state: number;
}