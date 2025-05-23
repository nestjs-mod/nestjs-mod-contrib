export interface ValidationErrorMetadataConstraintInterface {
  name: string;
  description: string;
}

export interface ValidationErrorMetadataInterface {
  property: string;
  constraints: Array<ValidationErrorMetadataConstraintInterface>;
  children?: Array<ValidationErrorMetadataInterface>;
}

export interface ValidationErrorInterface {
  message: string;
  code: string;
  metadata?: Array<ValidationErrorMetadataInterface>;
}
