import { Field, ObjectType } from 'type-graphql'
import { ManyToOne } from 'typeorm'
import { Domain } from '../entities'

export type Constructor<T = {}> = new (...args: any[]) => T

export function Domainly<TBase extends Constructor>(Base: TBase) {
  @ObjectType({ isAbstract: true })
  abstract class AbstractBase extends Base {
    @Field(type => Domain)
    @ManyToOne(type => Domain)
    domain: Domain
  }

  return AbstractBase
}
