import { buildQuery, ListParam, PaginatedResponse } from '@things-factory/graphql-utils'
import { Context } from 'koa'
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { FindConditions } from 'typeorm'
import { Domain } from '../../entities'
import { NewDomainInput } from '../types/domain/new-domain-input'

const PaginatedDomainResponse = PaginatedResponse(Domain)
type PaginatedDomainResponse = InstanceType<typeof PaginatedDomainResponse>

@Service()
@Resolver(of => Domain)
export class DomainResolver {
  @Query(returns => Domain)
  async domain(@Arg('name') name: string) {
    return Domain.findOne({ name })
  }

  @Query(returns => PaginatedDomainResponse)
  async domains(@Args() params: ListParam, @Ctx() context: Context & Record<string, any>) {
    const queryBuilder = Domain.createQueryBuilder()
    buildQuery(queryBuilder, params, context, false)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }

  @Mutation(returns => Domain)
  async createDomain(@Arg('domain') domain: NewDomainInput) {
    const newDomain = new Domain()
    Object.assign(newDomain, domain)
    return newDomain.save()
  }

  @Mutation(returns => [Domain])
  async deleteDomain(@Arg('name') name: string) {
    const findConds: FindConditions<Domain> = { name }
    const willDelete = await Domain.find(findConds)
    await Promise.resolve(willDelete.map(d => d.remove()))
    return willDelete
  }

  @Mutation(returns => Domain)
  async updateDomain(@Arg('name') name: string, @Arg('patch') patch: Domain) {
    const domain = await Domain.findOne({ name })
    Object.assign(domain, patch)

    return await domain.save()
  }

  // @Mutation(returns => Domain)
  // @Authorized()
  // addDomain(@Arg('newDomainData') newDomainData: NewDomainInput, @Ctx('user') user: User): Domain {
  //   return this.DomainService.addNew({ data: newDomainData, user })
  // }

  // @Mutation(returns => Boolean)
  // @Authorized(Roles.Admin)
  // async removeDomain(@Arg('id') id: string) {
  //   try {
  //     await this.DomainService.removeById(id)
  //     return true
  //   } catch {
  //     return false
  //   }
  // }
}
