import DataLoader from 'dataloader'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

async function _findByIdsBatch(ids: string[]) {
  return Domain.findByIds(ids)
}

const _domainLoader = new DataLoader(_findByIdsBatch)

@InputType('DomainInput')
@ObjectType()
@Entity()
@Index('ix_domain_0', (domain: Domain) => [domain.name], { unique: true })
@Index('ix_domain_1', (domain: Domain) => [domain.subdomain])
@Index('ix_domain_2', (domain: Domain) => [domain.systemFlag])
export class Domain extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  timezone?: string

  @Field({ defaultValue: false })
  @Column({ default: false })
  systemFlag: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  subdomain?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  brandName?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  brandImage?: string

  @Column({ nullable: true })
  contentImage?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  theme?: string

  @Field(type => Date)
  @CreateDateColumn()
  createdAt: Date

  @Field(type => Date)
  @UpdateDateColumn()
  updatedAt: Date

  static async findByIdsBatch(id: string) {
    return await _domainLoader.load(id)
  }
}
