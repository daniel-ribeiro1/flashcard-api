import { RequestContext } from '@/types/request-context.type';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
/**
 * @description O serviço RequestContextService é utilizado para armazenar o contexto
 * da requisição realizada pelo usuário.
 */
export class RequestContextService {
  private readonly _context = new Map<string, any>();

  set<T extends keyof RequestContext>(key: T, value: RequestContext[T]) {
    this._context.set(key, value);
  }

  get<T extends keyof RequestContext>(key: T): RequestContext[T] {
    return this._context.get(key);
  }
}
