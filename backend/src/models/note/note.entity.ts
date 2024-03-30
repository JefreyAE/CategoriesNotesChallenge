import { generateUUID } from 'src/utils/uuid.utils';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';

@Entity('notes')
export class NoteEntity {
  @PrimaryColumn({ unique: true, default: generateUUID() })
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  content: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  user: UserEntity;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  @ManyToOne(() => CategoryEntity, { nullable: true })
  category: CategoryEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at: Date;
  @BeforeInsert()
  generateId() {
    this.id = generateUUID();
  }
}
