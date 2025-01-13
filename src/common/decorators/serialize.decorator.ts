import { SerializerInterceptor } from '@/interceptors/serializer.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export function Serialize<T>(
  modelObject: ClassConstructor<T>,
): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializerInterceptor(modelObject));
}
