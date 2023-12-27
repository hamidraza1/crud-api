import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Report } from './report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Exclude() - so that the password should be excluded from network response
  // instanceToPlain function is used to in service to refine the response accordingly
  // the other way to mutate the response is using interceptor e.g SerializeInterceptor
  @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt?: Date;

  // ... add other columns and decorators as needed

  //Hooks => these are used for logging/debugging purpose
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id:', this.id);
  }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
