/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../amplify/src/API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateQuoteAppData = /* GraphQL */ `subscription OnCreateQuoteAppData(
  $filter: ModelSubscriptionQuoteAppDataFilterInput
) {
  onCreateQuoteAppData(filter: $filter) {
    id
    queryName
    queryGenerated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateQuoteAppDataSubscriptionVariables,
  APITypes.OnCreateQuoteAppDataSubscription
>;
export const onUpdateQuoteAppData = /* GraphQL */ `subscription OnUpdateQuoteAppData(
  $filter: ModelSubscriptionQuoteAppDataFilterInput
) {
  onUpdateQuoteAppData(filter: $filter) {
    id
    queryName
    queryGenerated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateQuoteAppDataSubscriptionVariables,
  APITypes.OnUpdateQuoteAppDataSubscription
>;
export const onDeleteQuoteAppData = /* GraphQL */ `subscription OnDeleteQuoteAppData(
  $filter: ModelSubscriptionQuoteAppDataFilterInput
) {
  onDeleteQuoteAppData(filter: $filter) {
    id
    queryName
    queryGenerated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteQuoteAppDataSubscriptionVariables,
  APITypes.OnDeleteQuoteAppDataSubscription
>;
