import { dateToString, stringToDate } from '@nestjs-mod/common';
import { GraphQLScalarType, Kind } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { GraphqlError } from './graphql.errors';

function convertStringToDate(dateString: string) {
  try {
    return stringToDate(dateString);
  } catch {
    throw new GraphqlError('Provided date string is invalid and cannot be parsed');
  }
}

export const GraphQLISODateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'The javascript `Date` as string. Type represents date and time as the ISO Date string.',
  serialize(value: unknown) {
    if (!value) {
      return value;
    }

    if (!(value instanceof Date)) {
      throw new GraphqlError(`Unable to serialize value '${JSON.stringify(value)}' as it's not an instance of 'Date'`);
    }

    return dateToString(value);
  },
  parseValue(value: unknown) {
    if (typeof value !== 'string') {
      throw new GraphqlError(
        `Unable to parse value '${JSON.stringify(value)}' as GraphQLISODateTime scalar supports only string values`
      );
    }

    return convertStringToDate(value);
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphqlError(
        `Unable to parse literal value of kind '${ast.kind}' as GraphQLISODateTime scalar supports only '${Kind.STRING}' ones`
      );
    }

    return convertStringToDate(ast.value);
  },
});

export const GRAPHQL_TYPES = { JSON: GraphQLJSON, DateTime: GraphQLISODateTime };
