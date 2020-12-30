import { Item } from 'src/items/item.entity';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('varchar')
	name!: string;

	@OneToMany(
		_type => Item,
		item => item.user,
		{ eager: false },
	)
	items!: Item[];

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
