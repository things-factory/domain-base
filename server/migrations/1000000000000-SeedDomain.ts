import { getRepository, MigrationInterface, QueryRunner, Repository } from 'typeorm'
import { Domain } from '../entities'

const SEED_DOMAINS: Partial<Domain>[] = [
  {
    name: 'SYSTEM',
    subdomain: 'system',
    systemFlag: true
  }
]

export class SeedDomain1000000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Domain)

    try {
      SEED_DOMAINS.forEach(async (domain: Domain) => {
        const domainEntity = repository.create({
          ...domain
        })
        await repository.save(domainEntity)
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<Domain[]> {
    const repository: Repository<Domain> = getRepository(Domain)
    const removed: Domain[] = []

    SEED_DOMAINS.reverse().forEach(async (domain: Domain) => {
      const recode = await repository.findOne({ name: domain.name })
      removed.push(await repository.remove(recode))
    })

    return removed
  }
}
