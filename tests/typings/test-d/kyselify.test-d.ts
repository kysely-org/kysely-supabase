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
  }

  expectType<IsEqual<Actual, Expected>>(true)
}

function testMultiSchemaDatabase() {
  type Actual = KyselifyDatabase<
    SupabaseDatabase & {
      my_schema: {
        Tables: {
          toy: SupabaseDatabase['public']['Tables']['toy']
        }
      }
    }
  >
  type Expected = {
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
    'my_schema.toy': {
      id: ColumnType<number, number | undefined, number | undefined>
      name: ColumnType<string, string, string | undefined>
      pet_id: ColumnType<number, number, number | undefined>
    }
  }

  expectType<IsEqual<Actual, Expected>>(true)
}
