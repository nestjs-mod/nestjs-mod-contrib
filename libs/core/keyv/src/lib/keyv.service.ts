/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import Keyv, {
  CompressionAdapter,
  Deserialize,
  DeserializedData,
  KeyvStoreAdapter,
  Serialize,
  StoredDataNoRaw,
  StoredDataRaw,
} from 'keyv';

@Injectable()
export class KeyvService<GenericValue = any>
  implements Omit<Keyv<GenericValue>, 'opts' | 'hooks' | 'stats' | 'get' | '_eventListeners' | '_maxListeners'>
{
  get<Value = GenericValue>(
    key: unknown,
    options?: unknown
  ):
    | Promise<StoredDataNoRaw<Value>>
    | Promise<StoredDataRaw<Value>>
    | Promise<StoredDataNoRaw<Value>[]>
    | Promise<StoredDataRaw<Value>[]> {
    throw new Error('Method not implemented.');
  }
  iterator?: ((argument: any) => AsyncGenerator<any, void>) | undefined;
  get store(): any {
    throw new Error('Method not implemented.');
  }
  set store(store: any) {
    throw new Error('Method not implemented.');
  }
  get compression(): CompressionAdapter | undefined {
    throw new Error('Method not implemented.');
  }
  set compression(compress: CompressionAdapter | undefined) {
    throw new Error('Method not implemented.');
  }
  get namespace(): string | undefined {
    throw new Error('Method not implemented.');
  }
  set namespace(namespace: string | undefined) {
    throw new Error('Method not implemented.');
  }
  get ttl(): number | undefined {
    throw new Error('Method not implemented.');
  }
  set ttl(ttl: number | undefined) {
    throw new Error('Method not implemented.');
  }
  get serialize(): Serialize | undefined {
    throw new Error('Method not implemented.');
  }
  set serialize(serialize: Serialize | undefined) {
    throw new Error('Method not implemented.');
  }
  get deserialize(): Deserialize | undefined {
    throw new Error('Method not implemented.');
  }
  set deserialize(deserialize: Deserialize | undefined) {
    throw new Error('Method not implemented.');
  }
  get useKeyPrefix(): boolean {
    throw new Error('Method not implemented.');
  }
  set useKeyPrefix(value: boolean) {
    throw new Error('Method not implemented.');
  }
  generateIterator(
    iterator: (argument: any) => AsyncGenerator<any, void>
  ): (argument: any) => AsyncGenerator<any, void> {
    throw new Error('Method not implemented.');
  }
  _checkIterableAdapter(): boolean {
    throw new Error('Method not implemented.');
  }
  _getKeyPrefix(key: string): string {
    throw new Error('Method not implemented.');
  }
  _getKeyPrefixArray(keys: string[]): string[] {
    throw new Error('Method not implemented.');
  }
  _getKeyUnprefix(key: string): string {
    throw new Error('Method not implemented.');
  }
  _isValidStorageAdapter(store: KeyvStoreAdapter | any): boolean {
    throw new Error('Method not implemented.');
  }
  set<Value = GenericValue>(key: string, value: Value, ttl?: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(key: string | string[]): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  clear(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  has(key: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  disconnect(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  emit(event: string, ...arguments_: any[]): void {
    throw new Error('Method not implemented.');
  }
  serializeData<T>(data: DeserializedData<T>): Promise<string | DeserializedData<T>> {
    throw new Error('Method not implemented.');
  }
  deserializeData<T>(data: string | DeserializedData<T>): Promise<DeserializedData<T> | undefined> {
    throw new Error('Method not implemented.');
  }
  maxListeners(): number {
    throw new Error('Method not implemented.');
  }
  addListener(event: string, listener: (...arguments_: any[]) => void): void {
    throw new Error('Method not implemented.');
  }
  removeListener(event: string, listener: (...arguments_: any[]) => void): void {
    throw new Error('Method not implemented.');
  }
  off(event: string, listener: (...arguments_: any[]) => void): void {
    throw new Error('Method not implemented.');
  }
  once(event: string, listener: (...arguments_: any[]) => void): void {
    throw new Error('Method not implemented.');
  }
  listeners(event: string): ((...arguments_: any[]) => void)[] {
    throw new Error('Method not implemented.');
  }
  removeAllListeners(event?: string): void {
    throw new Error('Method not implemented.');
  }
  setMaxListeners(n: number): void {
    throw new Error('Method not implemented.');
  }
  on(event: string, listener: (...arguments_: any[]) => void): Keyv<GenericValue> {
    throw new Error('Method not implemented.');
  }
}
