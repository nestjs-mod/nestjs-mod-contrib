/**
 * 
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export const WebhookStatusInterface = {
    Pending: 'Pending',
    Process: 'Process',
    Success: 'Success',
    Error: 'Error',
    Timeout: 'Timeout'
} as const;
export type WebhookStatusInterface = typeof WebhookStatusInterface[keyof typeof WebhookStatusInterface];

