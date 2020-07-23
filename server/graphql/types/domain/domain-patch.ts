import { Partial } from '@things-factory/graphql-utils'
import { ArgsType, Field, InputType } from 'type-graphql'
import { Domain } from '../../../entities'

@InputType()
export class DomainPatch extends Partial(Domain) {}

@ArgsType()
export class UpdateDomainInput {
  @Field()
  name: string
  @Field(type => DomainPatch)
  patch: DomainPatch
}
