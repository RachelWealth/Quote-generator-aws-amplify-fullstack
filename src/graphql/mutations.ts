/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createQuoteAppData = /* GraphQL */ `mutation CreateQuoteAppData(
  $input: CreateQuoteAppDataInput!
  $condition: ModelQuoteAppDataConditionInput
) {
  createQuoteAppData(input: $input, condition: $condition) {
    id
    queryName
    quoteGenerated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateQuoteAppDataMutationVariables,
  APITypes.CreateQuoteAppDataMutation
>;
export const updateQuoteAppData = /* GraphQL */ `mutation UpdateQuoteAppData(
  $input: UpdateQuoteAppDataInput!
  $condition: ModelQuoteAppDataConditionInput
) {
  updateQuoteAppData(input: $input, condition: $condition) {
    id
    queryName
    quoteGenerated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateQuoteAppDataMutationVariables,
  APITypes.UpdateQuoteAppDataMutation
>;
export const deleteQuoteAppData = /* GraphQL */ `mutation DeleteQuoteAppData(
  $input: DeleteQuoteAppDataInput!
  $condition: ModelQuoteAppDataConditionInput
) {
  deleteQuoteAppData(input: $input, condition: $condition) {
    id
    queryName
    quoteGenerated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteQuoteAppDataMutationVariables,
  APITypes.DeleteQuoteAppDataMutation
>;
