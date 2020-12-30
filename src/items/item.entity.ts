import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Item {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('varchar')
	name!: string;

	@Column('numeric')
	weight!: number;

	@Column()
	userId!: string;

	@ManyToOne(
		_type => User,
		user => user.items,
		{
			eager: false,
		},
	)
	user!: User;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
