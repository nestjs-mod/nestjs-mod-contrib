import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService extends Client {}
