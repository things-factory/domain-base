import { Field, InputType } from 'type-graphql'
import { Domain } from '../../../entities'

@InputType()
export class CreateDomainInput implements Partial<Domain> {
  @Field()
  subdomain: string
}
