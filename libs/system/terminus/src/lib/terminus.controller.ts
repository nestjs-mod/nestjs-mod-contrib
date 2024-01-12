import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { TerminusHealthCheckService } from './terminus.service';

export function getTerminusHealthCheckController(endpoint: string) {
  @Controller(endpoint)
  class TerminusHealthCheckController {
    constructor(readonly terminusHealthCheckService: TerminusHealthCheckService) {}

    @Get()
    @HealthCheck()
    check() {
      return this.terminusHealthCheckService.check();
    }
  }

  return TerminusHealthCheckController;
}
