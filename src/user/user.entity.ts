import { Item } from 'src/items/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToMany(
		_type => Item,
		item => item.user,
	)
	items: Item[];

	@Column({ default: new Date() })
	createdAt: Date;

	@Column({ default: new Date() })
	updatedAt: Date;
}
