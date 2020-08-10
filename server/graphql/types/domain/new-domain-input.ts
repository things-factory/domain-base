import { Field, InputType } from 'type-graphql'
import { Domain } from '../../../entities'
import { Partial } from '@things-factory/graphql-utils'

@InputType()
export class NewDomainInput extends Partial(Domain) {
  @Field()
  subdomain: string
}
