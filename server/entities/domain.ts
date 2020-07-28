import { BaseEntity, TimeStamp } from '@things-factory/graphql-utils'
import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, Index } from 'typeorm'

@ObjectType()
@Entity()
@Index('ix_domain_0', (domain: Domain) => [domain.name], { unique: true })
@Index('ix_domain_1', (domain: Domain) => [domain.subdomain])
@Index('ix_domain_2', (domain: Domain) => [domain.systemFlag])
export class Domain extends TimeStamp(BaseEntity) {
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
}
