import type {ColumnType} from 'kysely'
import {expectType} from 'tsd'
import type {IsEqual} from 'type-fest'
import type {KyselifyDatabase} from '..'
import type {Database as SupabaseDatabase} from '../../../schema.gen'

function testSingleSchemaDatabase() {
  type Actual = KyselifyDatabase<SupabaseDatabase>
  type Expected = {
    person: {
      id: ColumnType<number, number | undefined, number | undefined>
      first_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      middle_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      last_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      gender: ColumnType<string, string, string | undefined>
      marital_status: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      children: ColumnType<number, number | undefined, number | undefined>
    }
    pet: {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      species: ColumnType<string, string, string | undefined>
      owner_id: ColumnType<number, number, number | undefined>
    }
    toy: {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      pet_id: ColumnType<number, number, number | undefined>
    }
  } & {
    person_owners: {
      id: ColumnType<
        number | null,
        number | null | undefined,
        number | null | undefined
      >
      first_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      middle_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      last_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      gender: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      marital_status: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      children: ColumnType<
        number | null,
        number | null | undefined,
        number | null | undefined
      >
    }
    person_owners_and_num_of_pets: {
      id: ColumnType<number | null, never, never>
      first_name: ColumnType<string | null, never, never>
      middle_name: ColumnType<string | null, never, never>
      last_name: ColumnType<string | null, never, never>
      gender: ColumnType<string | null, never, never>
      marital_status: ColumnType<string | null, never, never>
      children: ColumnType<number | null, never, never>
      num_of_pets: ColumnType<number | null, never, never>
    }
  }

  expectType<IsEqual<Actual['person'], Expected['person']>>(true)
  expectType<IsEqual<Actual['pet'], Expected['pet']>>(true)
  expectType<IsEqual<Actual['toy'], Expected['toy']>>(true)
  expectType<IsEqual<Actual['person_owners'], Expected['person_owners']>>(true)
  expectType<
    IsEqual<
      Actual['person_owners_and_num_of_pets'],
      Expected['person_owners_and_num_of_pets']
    >
  >(true)
  expectType<IsEqual<Actual, Expected>>(true)
}

function testMultiSchemaDatabase() {
  type Actual = KyselifyDatabase<
    SupabaseDatabase & {
      my_schema: {
        Tables: {
          toy: SupabaseDatabase['public']['Tables']['toy']
        }
        Views: {
          [_ in never]: never
        }
      }
      another_schema: {
        Tables: {
          pet: SupabaseDatabase['public']['Tables']['pet']
          toy: SupabaseDatabase['public']['Tables']['toy']
        }
        Views: {
          pets_with_toys: SupabaseDatabase['public']['Tables']['pet']
        }
      }
    }
  >
  type Expected = {
    person: {
      id: ColumnType<number, number | undefined, number | undefined>
      first_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      middle_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      last_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      gender: ColumnType<string, string, string | undefined>
      marital_status: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      children: ColumnType<number, number | undefined, number | undefined>
    }
    pet: {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      species: ColumnType<string, string, string | undefined>
      owner_id: ColumnType<number, number, number | undefined>
    }
    toy: {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      pet_id: ColumnType<number, number, number | undefined>
    }
  } & {
    person_owners: {
      id: ColumnType<
        number | null,
        number | null | undefined,
        number | null | undefined
      >
      first_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      middle_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      last_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      gender: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      marital_status: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      children: ColumnType<
        number | null,
        number | null | undefined,
        number | null | undefined
      >
    }
    person_owners_and_num_of_pets: {
      id: ColumnType<number | null, never, never>
      first_name: ColumnType<string | null, never, never>
      middle_name: ColumnType<string | null, never, never>
      last_name: ColumnType<string | null, never, never>
      gender: ColumnType<string | null, never, never>
      marital_status: ColumnType<string | null, never, never>
      children: ColumnType<number | null, never, never>
      num_of_pets: ColumnType<number | null, never, never>
    }
  } & {
    'public.person': {
      id: ColumnType<number, number | undefined, number | undefined>
      first_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      middle_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      last_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      gender: ColumnType<string, string, string | undefined>
      marital_status: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      children: ColumnType<number, number | undefined, number | undefined>
    }
    'public.pet': {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      species: ColumnType<string, string, string | undefined>
      owner_id: ColumnType<number, number, number | undefined>
    }
    'public.toy': {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      pet_id: ColumnType<number, number, number | undefined>
    }
    'public.person_owners': {
      id: ColumnType<
        number | null,
        number | null | undefined,
        number | null | undefined
      >
      first_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      middle_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      last_name: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      gender: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      marital_status: ColumnType<
        string | null,
        string | null | undefined,
        string | null | undefined
      >
      children: ColumnType<
        number | null,
        number | null | undefined,
        number | null | undefined
      >
    }
    'public.person_owners_and_num_of_pets': {
      id: ColumnType<number | null, never, never>
      first_name: ColumnType<string | null, never, never>
      middle_name: ColumnType<string | null, never, never>
      last_name: ColumnType<string | null, never, never>
      gender: ColumnType<string | null, never, never>
      marital_status: ColumnType<string | null, never, never>
      children: ColumnType<number | null, never, never>
      num_of_pets: ColumnType<number | null, never, never>
    }
    'my_schema.toy': {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      pet_id: ColumnType<number, number, number | undefined>
    }
    'another_schema.pet': {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      species: ColumnType<string, string, string | undefined>
      owner_id: ColumnType<number, number, number | undefined>
    }
    'another_schema.toy': {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      pet_id: ColumnType<number, number, number | undefined>
    }
    'another_schema.pets_with_toys': {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      species: ColumnType<string, string, string | undefined>
      owner_id: ColumnType<number, number, number | undefined>
    }
  }

  expectType<IsEqual<Actual['person'], Expected['person']>>(true)
  expectType<IsEqual<Actual['pet'], Expected['pet']>>(true)
  expectType<IsEqual<Actual['toy'], Expected['toy']>>(true)
  expectType<IsEqual<Actual['person_owners'], Expected['person_owners']>>(true)
  expectType<
    IsEqual<
      Actual['person_owners_and_num_of_pets'],
      Expected['person_owners_and_num_of_pets']
    >
  >(true)
  expectType<IsEqual<Actual['public.person'], Expected['public.person']>>(true)
  expectType<IsEqual<Actual['public.pet'], Expected['public.pet']>>(true)
  expectType<IsEqual<Actual['public.toy'], Expected['public.toy']>>(true)
  expectType<
    IsEqual<Actual['public.person_owners'], Expected['public.person_owners']>
  >(true)
  expectType<
    IsEqual<
      Actual['public.person_owners_and_num_of_pets'],
      Expected['public.person_owners_and_num_of_pets']
    >
  >(true)
  expectType<IsEqual<Actual['my_schema.toy'], Expected['my_schema.toy']>>
  expectType<
    IsEqual<Actual['another_schema.pet'], Expected['another_schema.pet']>
  >(true)
  expectType<
    IsEqual<Actual['another_schema.toy'], Expected['another_schema.toy']>
  >(true)
  expectType<
    IsEqual<
      Actual['another_schema.pets_with_toys'],
      Expected['another_schema.pets_with_toys']
    >
  >(true)
  expectType<IsEqual<Actual, Expected>>(true)
}
