import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	public readonly id: number;

	@Column({ type: 'varchar', length: 255 })
	public name: string;

	@Column({ type: 'varchar', length: 255, unique: true })
	public email: string;

	@Column({ type: 'varchar', length: 255 })
	public password: string;

	@Column({ type: 'boolean', default: false })
	public confirmed: boolean;
}
