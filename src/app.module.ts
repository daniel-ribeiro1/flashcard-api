import { Module } from '@nestjs/common';
import ApplicationModules from '@/modules';

@Module({
  imports: [...ApplicationModules],
})
export class AppModule {}
