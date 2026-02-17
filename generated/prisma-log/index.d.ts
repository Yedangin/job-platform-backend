
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SystemLog
 * 
 */
export type SystemLog = $Result.DefaultSelection<Prisma.$SystemLogPayload>
/**
 * Model RequestLog
 * 
 */
export type RequestLog = $Result.DefaultSelection<Prisma.$RequestLogPayload>
/**
 * Model MatchingLog
 * 
 */
export type MatchingLog = $Result.DefaultSelection<Prisma.$MatchingLogPayload>
/**
 * Model ErrorLog
 * 
 */
export type ErrorLog = $Result.DefaultSelection<Prisma.$ErrorLogPayload>
/**
 * Model ChangeLog
 * 
 */
export type ChangeLog = $Result.DefaultSelection<Prisma.$ChangeLogPayload>
/**
 * Model LawAmendment
 * 
 */
export type LawAmendment = $Result.DefaultSelection<Prisma.$LawAmendmentPayload>
/**
 * Model LawAmendmentItem
 * 
 */
export type LawAmendmentItem = $Result.DefaultSelection<Prisma.$LawAmendmentItemPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SystemLogs
 * const systemLogs = await prisma.systemLog.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more SystemLogs
   * const systemLogs = await prisma.systemLog.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.systemLog`: Exposes CRUD operations for the **SystemLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemLogs
    * const systemLogs = await prisma.systemLog.findMany()
    * ```
    */
  get systemLog(): Prisma.SystemLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestLog`: Exposes CRUD operations for the **RequestLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestLogs
    * const requestLogs = await prisma.requestLog.findMany()
    * ```
    */
  get requestLog(): Prisma.RequestLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchingLog`: Exposes CRUD operations for the **MatchingLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchingLogs
    * const matchingLogs = await prisma.matchingLog.findMany()
    * ```
    */
  get matchingLog(): Prisma.MatchingLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.errorLog`: Exposes CRUD operations for the **ErrorLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ErrorLogs
    * const errorLogs = await prisma.errorLog.findMany()
    * ```
    */
  get errorLog(): Prisma.ErrorLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.changeLog`: Exposes CRUD operations for the **ChangeLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChangeLogs
    * const changeLogs = await prisma.changeLog.findMany()
    * ```
    */
  get changeLog(): Prisma.ChangeLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lawAmendment`: Exposes CRUD operations for the **LawAmendment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LawAmendments
    * const lawAmendments = await prisma.lawAmendment.findMany()
    * ```
    */
  get lawAmendment(): Prisma.LawAmendmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lawAmendmentItem`: Exposes CRUD operations for the **LawAmendmentItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LawAmendmentItems
    * const lawAmendmentItems = await prisma.lawAmendmentItem.findMany()
    * ```
    */
  get lawAmendmentItem(): Prisma.LawAmendmentItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.0
   * Query Engine version: aee10d5a411e4360c6d3445ce4810ca65adbf3e8
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    SystemLog: 'SystemLog',
    RequestLog: 'RequestLog',
    MatchingLog: 'MatchingLog',
    ErrorLog: 'ErrorLog',
    ChangeLog: 'ChangeLog',
    LawAmendment: 'LawAmendment',
    LawAmendmentItem: 'LawAmendmentItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    logDB?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "systemLog" | "requestLog" | "matchingLog" | "errorLog" | "changeLog" | "lawAmendment" | "lawAmendmentItem"
      txIsolationLevel: never
    }
    model: {
      SystemLog: {
        payload: Prisma.$SystemLogPayload<ExtArgs>
        fields: Prisma.SystemLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          findFirst: {
            args: Prisma.SystemLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          findMany: {
            args: Prisma.SystemLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>[]
          }
          create: {
            args: Prisma.SystemLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          createMany: {
            args: Prisma.SystemLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SystemLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          update: {
            args: Prisma.SystemLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          deleteMany: {
            args: Prisma.SystemLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          aggregate: {
            args: Prisma.SystemLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemLog>
          }
          groupBy: {
            args: Prisma.SystemLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SystemLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SystemLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SystemLogCountArgs<ExtArgs>
            result: $Utils.Optional<SystemLogCountAggregateOutputType> | number
          }
        }
      }
      RequestLog: {
        payload: Prisma.$RequestLogPayload<ExtArgs>
        fields: Prisma.RequestLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          findFirst: {
            args: Prisma.RequestLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          findMany: {
            args: Prisma.RequestLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>[]
          }
          create: {
            args: Prisma.RequestLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          createMany: {
            args: Prisma.RequestLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RequestLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          update: {
            args: Prisma.RequestLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          deleteMany: {
            args: Prisma.RequestLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RequestLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          aggregate: {
            args: Prisma.RequestLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestLog>
          }
          groupBy: {
            args: Prisma.RequestLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.RequestLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.RequestLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.RequestLogCountArgs<ExtArgs>
            result: $Utils.Optional<RequestLogCountAggregateOutputType> | number
          }
        }
      }
      MatchingLog: {
        payload: Prisma.$MatchingLogPayload<ExtArgs>
        fields: Prisma.MatchingLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchingLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchingLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload>
          }
          findFirst: {
            args: Prisma.MatchingLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchingLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload>
          }
          findMany: {
            args: Prisma.MatchingLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload>[]
          }
          create: {
            args: Prisma.MatchingLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload>
          }
          createMany: {
            args: Prisma.MatchingLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MatchingLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload>
          }
          update: {
            args: Prisma.MatchingLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload>
          }
          deleteMany: {
            args: Prisma.MatchingLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchingLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MatchingLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchingLogPayload>
          }
          aggregate: {
            args: Prisma.MatchingLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchingLog>
          }
          groupBy: {
            args: Prisma.MatchingLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchingLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MatchingLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MatchingLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MatchingLogCountArgs<ExtArgs>
            result: $Utils.Optional<MatchingLogCountAggregateOutputType> | number
          }
        }
      }
      ErrorLog: {
        payload: Prisma.$ErrorLogPayload<ExtArgs>
        fields: Prisma.ErrorLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ErrorLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ErrorLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          findFirst: {
            args: Prisma.ErrorLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ErrorLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          findMany: {
            args: Prisma.ErrorLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>[]
          }
          create: {
            args: Prisma.ErrorLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          createMany: {
            args: Prisma.ErrorLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ErrorLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          update: {
            args: Prisma.ErrorLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          deleteMany: {
            args: Prisma.ErrorLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ErrorLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ErrorLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ErrorLogPayload>
          }
          aggregate: {
            args: Prisma.ErrorLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateErrorLog>
          }
          groupBy: {
            args: Prisma.ErrorLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ErrorLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ErrorLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ErrorLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ErrorLogCountArgs<ExtArgs>
            result: $Utils.Optional<ErrorLogCountAggregateOutputType> | number
          }
        }
      }
      ChangeLog: {
        payload: Prisma.$ChangeLogPayload<ExtArgs>
        fields: Prisma.ChangeLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChangeLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChangeLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload>
          }
          findFirst: {
            args: Prisma.ChangeLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChangeLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload>
          }
          findMany: {
            args: Prisma.ChangeLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload>[]
          }
          create: {
            args: Prisma.ChangeLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload>
          }
          createMany: {
            args: Prisma.ChangeLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ChangeLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload>
          }
          update: {
            args: Prisma.ChangeLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload>
          }
          deleteMany: {
            args: Prisma.ChangeLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChangeLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChangeLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeLogPayload>
          }
          aggregate: {
            args: Prisma.ChangeLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChangeLog>
          }
          groupBy: {
            args: Prisma.ChangeLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChangeLogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ChangeLogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ChangeLogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ChangeLogCountArgs<ExtArgs>
            result: $Utils.Optional<ChangeLogCountAggregateOutputType> | number
          }
        }
      }
      LawAmendment: {
        payload: Prisma.$LawAmendmentPayload<ExtArgs>
        fields: Prisma.LawAmendmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LawAmendmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LawAmendmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload>
          }
          findFirst: {
            args: Prisma.LawAmendmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LawAmendmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload>
          }
          findMany: {
            args: Prisma.LawAmendmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload>[]
          }
          create: {
            args: Prisma.LawAmendmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload>
          }
          createMany: {
            args: Prisma.LawAmendmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LawAmendmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload>
          }
          update: {
            args: Prisma.LawAmendmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload>
          }
          deleteMany: {
            args: Prisma.LawAmendmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LawAmendmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LawAmendmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentPayload>
          }
          aggregate: {
            args: Prisma.LawAmendmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLawAmendment>
          }
          groupBy: {
            args: Prisma.LawAmendmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<LawAmendmentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LawAmendmentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LawAmendmentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LawAmendmentCountArgs<ExtArgs>
            result: $Utils.Optional<LawAmendmentCountAggregateOutputType> | number
          }
        }
      }
      LawAmendmentItem: {
        payload: Prisma.$LawAmendmentItemPayload<ExtArgs>
        fields: Prisma.LawAmendmentItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LawAmendmentItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LawAmendmentItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload>
          }
          findFirst: {
            args: Prisma.LawAmendmentItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LawAmendmentItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload>
          }
          findMany: {
            args: Prisma.LawAmendmentItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload>[]
          }
          create: {
            args: Prisma.LawAmendmentItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload>
          }
          createMany: {
            args: Prisma.LawAmendmentItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LawAmendmentItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload>
          }
          update: {
            args: Prisma.LawAmendmentItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload>
          }
          deleteMany: {
            args: Prisma.LawAmendmentItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LawAmendmentItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LawAmendmentItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LawAmendmentItemPayload>
          }
          aggregate: {
            args: Prisma.LawAmendmentItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLawAmendmentItem>
          }
          groupBy: {
            args: Prisma.LawAmendmentItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<LawAmendmentItemGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.LawAmendmentItemFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.LawAmendmentItemAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.LawAmendmentItemCountArgs<ExtArgs>
            result: $Utils.Optional<LawAmendmentItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    systemLog?: SystemLogOmit
    requestLog?: RequestLogOmit
    matchingLog?: MatchingLogOmit
    errorLog?: ErrorLogOmit
    changeLog?: ChangeLogOmit
    lawAmendment?: LawAmendmentOmit
    lawAmendmentItem?: LawAmendmentItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LawAmendmentCountOutputType
   */

  export type LawAmendmentCountOutputType = {
    items: number
  }

  export type LawAmendmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | LawAmendmentCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * LawAmendmentCountOutputType without action
   */
  export type LawAmendmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentCountOutputType
     */
    select?: LawAmendmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LawAmendmentCountOutputType without action
   */
  export type LawAmendmentCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LawAmendmentItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model SystemLog
   */

  export type AggregateSystemLog = {
    _count: SystemLogCountAggregateOutputType | null
    _min: SystemLogMinAggregateOutputType | null
    _max: SystemLogMaxAggregateOutputType | null
  }

  export type SystemLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    actionType: string | null
    description: string | null
    createdAt: Date | null
  }

  export type SystemLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    actionType: string | null
    description: string | null
    createdAt: Date | null
  }

  export type SystemLogCountAggregateOutputType = {
    id: number
    userId: number
    actionType: number
    description: number
    createdAt: number
    _all: number
  }


  export type SystemLogMinAggregateInputType = {
    id?: true
    userId?: true
    actionType?: true
    description?: true
    createdAt?: true
  }

  export type SystemLogMaxAggregateInputType = {
    id?: true
    userId?: true
    actionType?: true
    description?: true
    createdAt?: true
  }

  export type SystemLogCountAggregateInputType = {
    id?: true
    userId?: true
    actionType?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type SystemLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemLog to aggregate.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemLogs
    **/
    _count?: true | SystemLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemLogMaxAggregateInputType
  }

  export type GetSystemLogAggregateType<T extends SystemLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemLog[P]>
      : GetScalarType<T[P], AggregateSystemLog[P]>
  }




  export type SystemLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemLogWhereInput
    orderBy?: SystemLogOrderByWithAggregationInput | SystemLogOrderByWithAggregationInput[]
    by: SystemLogScalarFieldEnum[] | SystemLogScalarFieldEnum
    having?: SystemLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemLogCountAggregateInputType | true
    _min?: SystemLogMinAggregateInputType
    _max?: SystemLogMaxAggregateInputType
  }

  export type SystemLogGroupByOutputType = {
    id: string
    userId: string | null
    actionType: string | null
    description: string | null
    createdAt: Date
    _count: SystemLogCountAggregateOutputType | null
    _min: SystemLogMinAggregateOutputType | null
    _max: SystemLogMaxAggregateOutputType | null
  }

  type GetSystemLogGroupByPayload<T extends SystemLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemLogGroupByOutputType[P]>
            : GetScalarType<T[P], SystemLogGroupByOutputType[P]>
        }
      >
    >


  export type SystemLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    actionType?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemLog"]>



  export type SystemLogSelectScalar = {
    id?: boolean
    userId?: boolean
    actionType?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type SystemLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "actionType" | "description" | "createdAt", ExtArgs["result"]["systemLog"]>

  export type $SystemLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      actionType: string | null
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["systemLog"]>
    composites: {}
  }

  type SystemLogGetPayload<S extends boolean | null | undefined | SystemLogDefaultArgs> = $Result.GetResult<Prisma.$SystemLogPayload, S>

  type SystemLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemLogCountAggregateInputType | true
    }

  export interface SystemLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemLog'], meta: { name: 'SystemLog' } }
    /**
     * Find zero or one SystemLog that matches the filter.
     * @param {SystemLogFindUniqueArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemLogFindUniqueArgs>(args: SelectSubset<T, SystemLogFindUniqueArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemLogFindUniqueOrThrowArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindFirstArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemLogFindFirstArgs>(args?: SelectSubset<T, SystemLogFindFirstArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindFirstOrThrowArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemLogs
     * const systemLogs = await prisma.systemLog.findMany()
     * 
     * // Get first 10 SystemLogs
     * const systemLogs = await prisma.systemLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemLogWithIdOnly = await prisma.systemLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemLogFindManyArgs>(args?: SelectSubset<T, SystemLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemLog.
     * @param {SystemLogCreateArgs} args - Arguments to create a SystemLog.
     * @example
     * // Create one SystemLog
     * const SystemLog = await prisma.systemLog.create({
     *   data: {
     *     // ... data to create a SystemLog
     *   }
     * })
     * 
     */
    create<T extends SystemLogCreateArgs>(args: SelectSubset<T, SystemLogCreateArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemLogs.
     * @param {SystemLogCreateManyArgs} args - Arguments to create many SystemLogs.
     * @example
     * // Create many SystemLogs
     * const systemLog = await prisma.systemLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemLogCreateManyArgs>(args?: SelectSubset<T, SystemLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SystemLog.
     * @param {SystemLogDeleteArgs} args - Arguments to delete one SystemLog.
     * @example
     * // Delete one SystemLog
     * const SystemLog = await prisma.systemLog.delete({
     *   where: {
     *     // ... filter to delete one SystemLog
     *   }
     * })
     * 
     */
    delete<T extends SystemLogDeleteArgs>(args: SelectSubset<T, SystemLogDeleteArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemLog.
     * @param {SystemLogUpdateArgs} args - Arguments to update one SystemLog.
     * @example
     * // Update one SystemLog
     * const systemLog = await prisma.systemLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemLogUpdateArgs>(args: SelectSubset<T, SystemLogUpdateArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemLogs.
     * @param {SystemLogDeleteManyArgs} args - Arguments to filter SystemLogs to delete.
     * @example
     * // Delete a few SystemLogs
     * const { count } = await prisma.systemLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemLogDeleteManyArgs>(args?: SelectSubset<T, SystemLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemLogs
     * const systemLog = await prisma.systemLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemLogUpdateManyArgs>(args: SelectSubset<T, SystemLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemLog.
     * @param {SystemLogUpsertArgs} args - Arguments to update or create a SystemLog.
     * @example
     * // Update or create a SystemLog
     * const systemLog = await prisma.systemLog.upsert({
     *   create: {
     *     // ... data to create a SystemLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemLog we want to update
     *   }
     * })
     */
    upsert<T extends SystemLogUpsertArgs>(args: SelectSubset<T, SystemLogUpsertArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemLogs that matches the filter.
     * @param {SystemLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const systemLog = await prisma.systemLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SystemLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SystemLog.
     * @param {SystemLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const systemLog = await prisma.systemLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SystemLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SystemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogCountArgs} args - Arguments to filter SystemLogs to count.
     * @example
     * // Count the number of SystemLogs
     * const count = await prisma.systemLog.count({
     *   where: {
     *     // ... the filter for the SystemLogs we want to count
     *   }
     * })
    **/
    count<T extends SystemLogCountArgs>(
      args?: Subset<T, SystemLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemLogAggregateArgs>(args: Subset<T, SystemLogAggregateArgs>): Prisma.PrismaPromise<GetSystemLogAggregateType<T>>

    /**
     * Group by SystemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemLogGroupByArgs['orderBy'] }
        : { orderBy?: SystemLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemLog model
   */
  readonly fields: SystemLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemLog model
   */
  interface SystemLogFieldRefs {
    readonly id: FieldRef<"SystemLog", 'String'>
    readonly userId: FieldRef<"SystemLog", 'String'>
    readonly actionType: FieldRef<"SystemLog", 'String'>
    readonly description: FieldRef<"SystemLog", 'String'>
    readonly createdAt: FieldRef<"SystemLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemLog findUnique
   */
  export type SystemLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog findUniqueOrThrow
   */
  export type SystemLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog findFirst
   */
  export type SystemLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemLogs.
     */
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog findFirstOrThrow
   */
  export type SystemLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemLogs.
     */
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog findMany
   */
  export type SystemLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter, which SystemLogs to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog create
   */
  export type SystemLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemLog.
     */
    data?: XOR<SystemLogCreateInput, SystemLogUncheckedCreateInput>
  }

  /**
   * SystemLog createMany
   */
  export type SystemLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemLogs.
     */
    data: SystemLogCreateManyInput | SystemLogCreateManyInput[]
  }

  /**
   * SystemLog update
   */
  export type SystemLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemLog.
     */
    data: XOR<SystemLogUpdateInput, SystemLogUncheckedUpdateInput>
    /**
     * Choose, which SystemLog to update.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog updateMany
   */
  export type SystemLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemLogs.
     */
    data: XOR<SystemLogUpdateManyMutationInput, SystemLogUncheckedUpdateManyInput>
    /**
     * Filter which SystemLogs to update
     */
    where?: SystemLogWhereInput
    /**
     * Limit how many SystemLogs to update.
     */
    limit?: number
  }

  /**
   * SystemLog upsert
   */
  export type SystemLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemLog to update in case it exists.
     */
    where: SystemLogWhereUniqueInput
    /**
     * In case the SystemLog found by the `where` argument doesn't exist, create a new SystemLog with this data.
     */
    create: XOR<SystemLogCreateInput, SystemLogUncheckedCreateInput>
    /**
     * In case the SystemLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemLogUpdateInput, SystemLogUncheckedUpdateInput>
  }

  /**
   * SystemLog delete
   */
  export type SystemLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
    /**
     * Filter which SystemLog to delete.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog deleteMany
   */
  export type SystemLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemLogs to delete
     */
    where?: SystemLogWhereInput
    /**
     * Limit how many SystemLogs to delete.
     */
    limit?: number
  }

  /**
   * SystemLog findRaw
   */
  export type SystemLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SystemLog aggregateRaw
   */
  export type SystemLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SystemLog without action
   */
  export type SystemLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemLog
     */
    omit?: SystemLogOmit<ExtArgs> | null
  }


  /**
   * Model RequestLog
   */

  export type AggregateRequestLog = {
    _count: RequestLogCountAggregateOutputType | null
    _avg: RequestLogAvgAggregateOutputType | null
    _sum: RequestLogSumAggregateOutputType | null
    _min: RequestLogMinAggregateOutputType | null
    _max: RequestLogMaxAggregateOutputType | null
  }

  export type RequestLogAvgAggregateOutputType = {
    statusCode: number | null
    responseTime: number | null
  }

  export type RequestLogSumAggregateOutputType = {
    statusCode: number | null
    responseTime: number | null
  }

  export type RequestLogMinAggregateOutputType = {
    id: string | null
    method: string | null
    path: string | null
    statusCode: number | null
    userId: string | null
    responseTime: number | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type RequestLogMaxAggregateOutputType = {
    id: string | null
    method: string | null
    path: string | null
    statusCode: number | null
    userId: string | null
    responseTime: number | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type RequestLogCountAggregateOutputType = {
    id: number
    method: number
    path: number
    statusCode: number
    userId: number
    responseTime: number
    ip: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type RequestLogAvgAggregateInputType = {
    statusCode?: true
    responseTime?: true
  }

  export type RequestLogSumAggregateInputType = {
    statusCode?: true
    responseTime?: true
  }

  export type RequestLogMinAggregateInputType = {
    id?: true
    method?: true
    path?: true
    statusCode?: true
    userId?: true
    responseTime?: true
    ip?: true
    userAgent?: true
    createdAt?: true
  }

  export type RequestLogMaxAggregateInputType = {
    id?: true
    method?: true
    path?: true
    statusCode?: true
    userId?: true
    responseTime?: true
    ip?: true
    userAgent?: true
    createdAt?: true
  }

  export type RequestLogCountAggregateInputType = {
    id?: true
    method?: true
    path?: true
    statusCode?: true
    userId?: true
    responseTime?: true
    ip?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type RequestLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLog to aggregate.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestLogs
    **/
    _count?: true | RequestLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestLogMaxAggregateInputType
  }

  export type GetRequestLogAggregateType<T extends RequestLogAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestLog[P]>
      : GetScalarType<T[P], AggregateRequestLog[P]>
  }




  export type RequestLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestLogWhereInput
    orderBy?: RequestLogOrderByWithAggregationInput | RequestLogOrderByWithAggregationInput[]
    by: RequestLogScalarFieldEnum[] | RequestLogScalarFieldEnum
    having?: RequestLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestLogCountAggregateInputType | true
    _avg?: RequestLogAvgAggregateInputType
    _sum?: RequestLogSumAggregateInputType
    _min?: RequestLogMinAggregateInputType
    _max?: RequestLogMaxAggregateInputType
  }

  export type RequestLogGroupByOutputType = {
    id: string
    method: string
    path: string
    statusCode: number
    userId: string | null
    responseTime: number
    ip: string | null
    userAgent: string | null
    createdAt: Date
    _count: RequestLogCountAggregateOutputType | null
    _avg: RequestLogAvgAggregateOutputType | null
    _sum: RequestLogSumAggregateOutputType | null
    _min: RequestLogMinAggregateOutputType | null
    _max: RequestLogMaxAggregateOutputType | null
  }

  type GetRequestLogGroupByPayload<T extends RequestLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestLogGroupByOutputType[P]>
            : GetScalarType<T[P], RequestLogGroupByOutputType[P]>
        }
      >
    >


  export type RequestLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    method?: boolean
    path?: boolean
    statusCode?: boolean
    userId?: boolean
    responseTime?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestLog"]>



  export type RequestLogSelectScalar = {
    id?: boolean
    method?: boolean
    path?: boolean
    statusCode?: boolean
    userId?: boolean
    responseTime?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type RequestLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "method" | "path" | "statusCode" | "userId" | "responseTime" | "ip" | "userAgent" | "createdAt", ExtArgs["result"]["requestLog"]>

  export type $RequestLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      method: string
      path: string
      statusCode: number
      userId: string | null
      responseTime: number
      ip: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["requestLog"]>
    composites: {}
  }

  type RequestLogGetPayload<S extends boolean | null | undefined | RequestLogDefaultArgs> = $Result.GetResult<Prisma.$RequestLogPayload, S>

  type RequestLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestLogCountAggregateInputType | true
    }

  export interface RequestLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestLog'], meta: { name: 'RequestLog' } }
    /**
     * Find zero or one RequestLog that matches the filter.
     * @param {RequestLogFindUniqueArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestLogFindUniqueArgs>(args: SelectSubset<T, RequestLogFindUniqueArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestLogFindUniqueOrThrowArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestLogFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindFirstArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestLogFindFirstArgs>(args?: SelectSubset<T, RequestLogFindFirstArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindFirstOrThrowArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestLogFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestLogs
     * const requestLogs = await prisma.requestLog.findMany()
     * 
     * // Get first 10 RequestLogs
     * const requestLogs = await prisma.requestLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestLogWithIdOnly = await prisma.requestLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestLogFindManyArgs>(args?: SelectSubset<T, RequestLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestLog.
     * @param {RequestLogCreateArgs} args - Arguments to create a RequestLog.
     * @example
     * // Create one RequestLog
     * const RequestLog = await prisma.requestLog.create({
     *   data: {
     *     // ... data to create a RequestLog
     *   }
     * })
     * 
     */
    create<T extends RequestLogCreateArgs>(args: SelectSubset<T, RequestLogCreateArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestLogs.
     * @param {RequestLogCreateManyArgs} args - Arguments to create many RequestLogs.
     * @example
     * // Create many RequestLogs
     * const requestLog = await prisma.requestLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestLogCreateManyArgs>(args?: SelectSubset<T, RequestLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RequestLog.
     * @param {RequestLogDeleteArgs} args - Arguments to delete one RequestLog.
     * @example
     * // Delete one RequestLog
     * const RequestLog = await prisma.requestLog.delete({
     *   where: {
     *     // ... filter to delete one RequestLog
     *   }
     * })
     * 
     */
    delete<T extends RequestLogDeleteArgs>(args: SelectSubset<T, RequestLogDeleteArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestLog.
     * @param {RequestLogUpdateArgs} args - Arguments to update one RequestLog.
     * @example
     * // Update one RequestLog
     * const requestLog = await prisma.requestLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestLogUpdateArgs>(args: SelectSubset<T, RequestLogUpdateArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestLogs.
     * @param {RequestLogDeleteManyArgs} args - Arguments to filter RequestLogs to delete.
     * @example
     * // Delete a few RequestLogs
     * const { count } = await prisma.requestLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestLogDeleteManyArgs>(args?: SelectSubset<T, RequestLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestLogs
     * const requestLog = await prisma.requestLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestLogUpdateManyArgs>(args: SelectSubset<T, RequestLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RequestLog.
     * @param {RequestLogUpsertArgs} args - Arguments to update or create a RequestLog.
     * @example
     * // Update or create a RequestLog
     * const requestLog = await prisma.requestLog.upsert({
     *   create: {
     *     // ... data to create a RequestLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestLog we want to update
     *   }
     * })
     */
    upsert<T extends RequestLogUpsertArgs>(args: SelectSubset<T, RequestLogUpsertArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestLogs that matches the filter.
     * @param {RequestLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const requestLog = await prisma.requestLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: RequestLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a RequestLog.
     * @param {RequestLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const requestLog = await prisma.requestLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: RequestLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of RequestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogCountArgs} args - Arguments to filter RequestLogs to count.
     * @example
     * // Count the number of RequestLogs
     * const count = await prisma.requestLog.count({
     *   where: {
     *     // ... the filter for the RequestLogs we want to count
     *   }
     * })
    **/
    count<T extends RequestLogCountArgs>(
      args?: Subset<T, RequestLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestLogAggregateArgs>(args: Subset<T, RequestLogAggregateArgs>): Prisma.PrismaPromise<GetRequestLogAggregateType<T>>

    /**
     * Group by RequestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestLogGroupByArgs['orderBy'] }
        : { orderBy?: RequestLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestLog model
   */
  readonly fields: RequestLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestLog model
   */
  interface RequestLogFieldRefs {
    readonly id: FieldRef<"RequestLog", 'String'>
    readonly method: FieldRef<"RequestLog", 'String'>
    readonly path: FieldRef<"RequestLog", 'String'>
    readonly statusCode: FieldRef<"RequestLog", 'Int'>
    readonly userId: FieldRef<"RequestLog", 'String'>
    readonly responseTime: FieldRef<"RequestLog", 'Int'>
    readonly ip: FieldRef<"RequestLog", 'String'>
    readonly userAgent: FieldRef<"RequestLog", 'String'>
    readonly createdAt: FieldRef<"RequestLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestLog findUnique
   */
  export type RequestLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog findUniqueOrThrow
   */
  export type RequestLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog findFirst
   */
  export type RequestLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogs.
     */
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog findFirstOrThrow
   */
  export type RequestLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogs.
     */
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog findMany
   */
  export type RequestLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Filter, which RequestLogs to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog create
   */
  export type RequestLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * The data needed to create a RequestLog.
     */
    data: XOR<RequestLogCreateInput, RequestLogUncheckedCreateInput>
  }

  /**
   * RequestLog createMany
   */
  export type RequestLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestLogs.
     */
    data: RequestLogCreateManyInput | RequestLogCreateManyInput[]
  }

  /**
   * RequestLog update
   */
  export type RequestLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * The data needed to update a RequestLog.
     */
    data: XOR<RequestLogUpdateInput, RequestLogUncheckedUpdateInput>
    /**
     * Choose, which RequestLog to update.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog updateMany
   */
  export type RequestLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestLogs.
     */
    data: XOR<RequestLogUpdateManyMutationInput, RequestLogUncheckedUpdateManyInput>
    /**
     * Filter which RequestLogs to update
     */
    where?: RequestLogWhereInput
    /**
     * Limit how many RequestLogs to update.
     */
    limit?: number
  }

  /**
   * RequestLog upsert
   */
  export type RequestLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * The filter to search for the RequestLog to update in case it exists.
     */
    where: RequestLogWhereUniqueInput
    /**
     * In case the RequestLog found by the `where` argument doesn't exist, create a new RequestLog with this data.
     */
    create: XOR<RequestLogCreateInput, RequestLogUncheckedCreateInput>
    /**
     * In case the RequestLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestLogUpdateInput, RequestLogUncheckedUpdateInput>
  }

  /**
   * RequestLog delete
   */
  export type RequestLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Filter which RequestLog to delete.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog deleteMany
   */
  export type RequestLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLogs to delete
     */
    where?: RequestLogWhereInput
    /**
     * Limit how many RequestLogs to delete.
     */
    limit?: number
  }

  /**
   * RequestLog findRaw
   */
  export type RequestLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * RequestLog aggregateRaw
   */
  export type RequestLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * RequestLog without action
   */
  export type RequestLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
  }


  /**
   * Model MatchingLog
   */

  export type AggregateMatchingLog = {
    _count: MatchingLogCountAggregateOutputType | null
    _avg: MatchingLogAvgAggregateOutputType | null
    _sum: MatchingLogSumAggregateOutputType | null
    _min: MatchingLogMinAggregateOutputType | null
    _max: MatchingLogMaxAggregateOutputType | null
  }

  export type MatchingLogAvgAggregateOutputType = {
    eligibleCount: number | null
    blockedCount: number | null
    durationMs: number | null
  }

  export type MatchingLogSumAggregateOutputType = {
    eligibleCount: number | null
    blockedCount: number | null
    durationMs: number | null
  }

  export type MatchingLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    inputData: string | null
    eligibleCount: number | null
    eligibleVisas: string | null
    blockedCount: number | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type MatchingLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    inputData: string | null
    eligibleCount: number | null
    eligibleVisas: string | null
    blockedCount: number | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type MatchingLogCountAggregateOutputType = {
    id: number
    userId: number
    inputData: number
    eligibleCount: number
    eligibleVisas: number
    blockedCount: number
    durationMs: number
    createdAt: number
    _all: number
  }


  export type MatchingLogAvgAggregateInputType = {
    eligibleCount?: true
    blockedCount?: true
    durationMs?: true
  }

  export type MatchingLogSumAggregateInputType = {
    eligibleCount?: true
    blockedCount?: true
    durationMs?: true
  }

  export type MatchingLogMinAggregateInputType = {
    id?: true
    userId?: true
    inputData?: true
    eligibleCount?: true
    eligibleVisas?: true
    blockedCount?: true
    durationMs?: true
    createdAt?: true
  }

  export type MatchingLogMaxAggregateInputType = {
    id?: true
    userId?: true
    inputData?: true
    eligibleCount?: true
    eligibleVisas?: true
    blockedCount?: true
    durationMs?: true
    createdAt?: true
  }

  export type MatchingLogCountAggregateInputType = {
    id?: true
    userId?: true
    inputData?: true
    eligibleCount?: true
    eligibleVisas?: true
    blockedCount?: true
    durationMs?: true
    createdAt?: true
    _all?: true
  }

  export type MatchingLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchingLog to aggregate.
     */
    where?: MatchingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchingLogs to fetch.
     */
    orderBy?: MatchingLogOrderByWithRelationInput | MatchingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchingLogs
    **/
    _count?: true | MatchingLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchingLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchingLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchingLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchingLogMaxAggregateInputType
  }

  export type GetMatchingLogAggregateType<T extends MatchingLogAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchingLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchingLog[P]>
      : GetScalarType<T[P], AggregateMatchingLog[P]>
  }




  export type MatchingLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchingLogWhereInput
    orderBy?: MatchingLogOrderByWithAggregationInput | MatchingLogOrderByWithAggregationInput[]
    by: MatchingLogScalarFieldEnum[] | MatchingLogScalarFieldEnum
    having?: MatchingLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchingLogCountAggregateInputType | true
    _avg?: MatchingLogAvgAggregateInputType
    _sum?: MatchingLogSumAggregateInputType
    _min?: MatchingLogMinAggregateInputType
    _max?: MatchingLogMaxAggregateInputType
  }

  export type MatchingLogGroupByOutputType = {
    id: string
    userId: string | null
    inputData: string
    eligibleCount: number
    eligibleVisas: string | null
    blockedCount: number
    durationMs: number
    createdAt: Date
    _count: MatchingLogCountAggregateOutputType | null
    _avg: MatchingLogAvgAggregateOutputType | null
    _sum: MatchingLogSumAggregateOutputType | null
    _min: MatchingLogMinAggregateOutputType | null
    _max: MatchingLogMaxAggregateOutputType | null
  }

  type GetMatchingLogGroupByPayload<T extends MatchingLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchingLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchingLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchingLogGroupByOutputType[P]>
            : GetScalarType<T[P], MatchingLogGroupByOutputType[P]>
        }
      >
    >


  export type MatchingLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    inputData?: boolean
    eligibleCount?: boolean
    eligibleVisas?: boolean
    blockedCount?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["matchingLog"]>



  export type MatchingLogSelectScalar = {
    id?: boolean
    userId?: boolean
    inputData?: boolean
    eligibleCount?: boolean
    eligibleVisas?: boolean
    blockedCount?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }

  export type MatchingLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "inputData" | "eligibleCount" | "eligibleVisas" | "blockedCount" | "durationMs" | "createdAt", ExtArgs["result"]["matchingLog"]>

  export type $MatchingLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchingLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      inputData: string
      eligibleCount: number
      eligibleVisas: string | null
      blockedCount: number
      durationMs: number
      createdAt: Date
    }, ExtArgs["result"]["matchingLog"]>
    composites: {}
  }

  type MatchingLogGetPayload<S extends boolean | null | undefined | MatchingLogDefaultArgs> = $Result.GetResult<Prisma.$MatchingLogPayload, S>

  type MatchingLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchingLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchingLogCountAggregateInputType | true
    }

  export interface MatchingLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchingLog'], meta: { name: 'MatchingLog' } }
    /**
     * Find zero or one MatchingLog that matches the filter.
     * @param {MatchingLogFindUniqueArgs} args - Arguments to find a MatchingLog
     * @example
     * // Get one MatchingLog
     * const matchingLog = await prisma.matchingLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchingLogFindUniqueArgs>(args: SelectSubset<T, MatchingLogFindUniqueArgs<ExtArgs>>): Prisma__MatchingLogClient<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchingLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchingLogFindUniqueOrThrowArgs} args - Arguments to find a MatchingLog
     * @example
     * // Get one MatchingLog
     * const matchingLog = await prisma.matchingLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchingLogFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchingLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchingLogClient<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchingLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchingLogFindFirstArgs} args - Arguments to find a MatchingLog
     * @example
     * // Get one MatchingLog
     * const matchingLog = await prisma.matchingLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchingLogFindFirstArgs>(args?: SelectSubset<T, MatchingLogFindFirstArgs<ExtArgs>>): Prisma__MatchingLogClient<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchingLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchingLogFindFirstOrThrowArgs} args - Arguments to find a MatchingLog
     * @example
     * // Get one MatchingLog
     * const matchingLog = await prisma.matchingLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchingLogFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchingLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchingLogClient<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchingLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchingLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchingLogs
     * const matchingLogs = await prisma.matchingLog.findMany()
     * 
     * // Get first 10 MatchingLogs
     * const matchingLogs = await prisma.matchingLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchingLogWithIdOnly = await prisma.matchingLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchingLogFindManyArgs>(args?: SelectSubset<T, MatchingLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchingLog.
     * @param {MatchingLogCreateArgs} args - Arguments to create a MatchingLog.
     * @example
     * // Create one MatchingLog
     * const MatchingLog = await prisma.matchingLog.create({
     *   data: {
     *     // ... data to create a MatchingLog
     *   }
     * })
     * 
     */
    create<T extends MatchingLogCreateArgs>(args: SelectSubset<T, MatchingLogCreateArgs<ExtArgs>>): Prisma__MatchingLogClient<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchingLogs.
     * @param {MatchingLogCreateManyArgs} args - Arguments to create many MatchingLogs.
     * @example
     * // Create many MatchingLogs
     * const matchingLog = await prisma.matchingLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchingLogCreateManyArgs>(args?: SelectSubset<T, MatchingLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MatchingLog.
     * @param {MatchingLogDeleteArgs} args - Arguments to delete one MatchingLog.
     * @example
     * // Delete one MatchingLog
     * const MatchingLog = await prisma.matchingLog.delete({
     *   where: {
     *     // ... filter to delete one MatchingLog
     *   }
     * })
     * 
     */
    delete<T extends MatchingLogDeleteArgs>(args: SelectSubset<T, MatchingLogDeleteArgs<ExtArgs>>): Prisma__MatchingLogClient<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchingLog.
     * @param {MatchingLogUpdateArgs} args - Arguments to update one MatchingLog.
     * @example
     * // Update one MatchingLog
     * const matchingLog = await prisma.matchingLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchingLogUpdateArgs>(args: SelectSubset<T, MatchingLogUpdateArgs<ExtArgs>>): Prisma__MatchingLogClient<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchingLogs.
     * @param {MatchingLogDeleteManyArgs} args - Arguments to filter MatchingLogs to delete.
     * @example
     * // Delete a few MatchingLogs
     * const { count } = await prisma.matchingLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchingLogDeleteManyArgs>(args?: SelectSubset<T, MatchingLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchingLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchingLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchingLogs
     * const matchingLog = await prisma.matchingLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchingLogUpdateManyArgs>(args: SelectSubset<T, MatchingLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MatchingLog.
     * @param {MatchingLogUpsertArgs} args - Arguments to update or create a MatchingLog.
     * @example
     * // Update or create a MatchingLog
     * const matchingLog = await prisma.matchingLog.upsert({
     *   create: {
     *     // ... data to create a MatchingLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchingLog we want to update
     *   }
     * })
     */
    upsert<T extends MatchingLogUpsertArgs>(args: SelectSubset<T, MatchingLogUpsertArgs<ExtArgs>>): Prisma__MatchingLogClient<$Result.GetResult<Prisma.$MatchingLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchingLogs that matches the filter.
     * @param {MatchingLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const matchingLog = await prisma.matchingLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MatchingLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MatchingLog.
     * @param {MatchingLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const matchingLog = await prisma.matchingLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MatchingLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MatchingLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchingLogCountArgs} args - Arguments to filter MatchingLogs to count.
     * @example
     * // Count the number of MatchingLogs
     * const count = await prisma.matchingLog.count({
     *   where: {
     *     // ... the filter for the MatchingLogs we want to count
     *   }
     * })
    **/
    count<T extends MatchingLogCountArgs>(
      args?: Subset<T, MatchingLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchingLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchingLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchingLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchingLogAggregateArgs>(args: Subset<T, MatchingLogAggregateArgs>): Prisma.PrismaPromise<GetMatchingLogAggregateType<T>>

    /**
     * Group by MatchingLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchingLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchingLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchingLogGroupByArgs['orderBy'] }
        : { orderBy?: MatchingLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchingLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchingLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchingLog model
   */
  readonly fields: MatchingLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchingLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchingLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchingLog model
   */
  interface MatchingLogFieldRefs {
    readonly id: FieldRef<"MatchingLog", 'String'>
    readonly userId: FieldRef<"MatchingLog", 'String'>
    readonly inputData: FieldRef<"MatchingLog", 'String'>
    readonly eligibleCount: FieldRef<"MatchingLog", 'Int'>
    readonly eligibleVisas: FieldRef<"MatchingLog", 'String'>
    readonly blockedCount: FieldRef<"MatchingLog", 'Int'>
    readonly durationMs: FieldRef<"MatchingLog", 'Int'>
    readonly createdAt: FieldRef<"MatchingLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchingLog findUnique
   */
  export type MatchingLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * Filter, which MatchingLog to fetch.
     */
    where: MatchingLogWhereUniqueInput
  }

  /**
   * MatchingLog findUniqueOrThrow
   */
  export type MatchingLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * Filter, which MatchingLog to fetch.
     */
    where: MatchingLogWhereUniqueInput
  }

  /**
   * MatchingLog findFirst
   */
  export type MatchingLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * Filter, which MatchingLog to fetch.
     */
    where?: MatchingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchingLogs to fetch.
     */
    orderBy?: MatchingLogOrderByWithRelationInput | MatchingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchingLogs.
     */
    cursor?: MatchingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchingLogs.
     */
    distinct?: MatchingLogScalarFieldEnum | MatchingLogScalarFieldEnum[]
  }

  /**
   * MatchingLog findFirstOrThrow
   */
  export type MatchingLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * Filter, which MatchingLog to fetch.
     */
    where?: MatchingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchingLogs to fetch.
     */
    orderBy?: MatchingLogOrderByWithRelationInput | MatchingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchingLogs.
     */
    cursor?: MatchingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchingLogs.
     */
    distinct?: MatchingLogScalarFieldEnum | MatchingLogScalarFieldEnum[]
  }

  /**
   * MatchingLog findMany
   */
  export type MatchingLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * Filter, which MatchingLogs to fetch.
     */
    where?: MatchingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchingLogs to fetch.
     */
    orderBy?: MatchingLogOrderByWithRelationInput | MatchingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchingLogs.
     */
    cursor?: MatchingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchingLogs.
     */
    skip?: number
    distinct?: MatchingLogScalarFieldEnum | MatchingLogScalarFieldEnum[]
  }

  /**
   * MatchingLog create
   */
  export type MatchingLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * The data needed to create a MatchingLog.
     */
    data: XOR<MatchingLogCreateInput, MatchingLogUncheckedCreateInput>
  }

  /**
   * MatchingLog createMany
   */
  export type MatchingLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchingLogs.
     */
    data: MatchingLogCreateManyInput | MatchingLogCreateManyInput[]
  }

  /**
   * MatchingLog update
   */
  export type MatchingLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * The data needed to update a MatchingLog.
     */
    data: XOR<MatchingLogUpdateInput, MatchingLogUncheckedUpdateInput>
    /**
     * Choose, which MatchingLog to update.
     */
    where: MatchingLogWhereUniqueInput
  }

  /**
   * MatchingLog updateMany
   */
  export type MatchingLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchingLogs.
     */
    data: XOR<MatchingLogUpdateManyMutationInput, MatchingLogUncheckedUpdateManyInput>
    /**
     * Filter which MatchingLogs to update
     */
    where?: MatchingLogWhereInput
    /**
     * Limit how many MatchingLogs to update.
     */
    limit?: number
  }

  /**
   * MatchingLog upsert
   */
  export type MatchingLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * The filter to search for the MatchingLog to update in case it exists.
     */
    where: MatchingLogWhereUniqueInput
    /**
     * In case the MatchingLog found by the `where` argument doesn't exist, create a new MatchingLog with this data.
     */
    create: XOR<MatchingLogCreateInput, MatchingLogUncheckedCreateInput>
    /**
     * In case the MatchingLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchingLogUpdateInput, MatchingLogUncheckedUpdateInput>
  }

  /**
   * MatchingLog delete
   */
  export type MatchingLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
    /**
     * Filter which MatchingLog to delete.
     */
    where: MatchingLogWhereUniqueInput
  }

  /**
   * MatchingLog deleteMany
   */
  export type MatchingLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchingLogs to delete
     */
    where?: MatchingLogWhereInput
    /**
     * Limit how many MatchingLogs to delete.
     */
    limit?: number
  }

  /**
   * MatchingLog findRaw
   */
  export type MatchingLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MatchingLog aggregateRaw
   */
  export type MatchingLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MatchingLog without action
   */
  export type MatchingLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchingLog
     */
    select?: MatchingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchingLog
     */
    omit?: MatchingLogOmit<ExtArgs> | null
  }


  /**
   * Model ErrorLog
   */

  export type AggregateErrorLog = {
    _count: ErrorLogCountAggregateOutputType | null
    _avg: ErrorLogAvgAggregateOutputType | null
    _sum: ErrorLogSumAggregateOutputType | null
    _min: ErrorLogMinAggregateOutputType | null
    _max: ErrorLogMaxAggregateOutputType | null
  }

  export type ErrorLogAvgAggregateOutputType = {
    statusCode: number | null
  }

  export type ErrorLogSumAggregateOutputType = {
    statusCode: number | null
  }

  export type ErrorLogMinAggregateOutputType = {
    id: string | null
    errorType: string | null
    message: string | null
    stack: string | null
    userId: string | null
    path: string | null
    method: string | null
    statusCode: number | null
    is500: boolean | null
    createdAt: Date | null
  }

  export type ErrorLogMaxAggregateOutputType = {
    id: string | null
    errorType: string | null
    message: string | null
    stack: string | null
    userId: string | null
    path: string | null
    method: string | null
    statusCode: number | null
    is500: boolean | null
    createdAt: Date | null
  }

  export type ErrorLogCountAggregateOutputType = {
    id: number
    errorType: number
    message: number
    stack: number
    userId: number
    path: number
    method: number
    statusCode: number
    is500: number
    createdAt: number
    _all: number
  }


  export type ErrorLogAvgAggregateInputType = {
    statusCode?: true
  }

  export type ErrorLogSumAggregateInputType = {
    statusCode?: true
  }

  export type ErrorLogMinAggregateInputType = {
    id?: true
    errorType?: true
    message?: true
    stack?: true
    userId?: true
    path?: true
    method?: true
    statusCode?: true
    is500?: true
    createdAt?: true
  }

  export type ErrorLogMaxAggregateInputType = {
    id?: true
    errorType?: true
    message?: true
    stack?: true
    userId?: true
    path?: true
    method?: true
    statusCode?: true
    is500?: true
    createdAt?: true
  }

  export type ErrorLogCountAggregateInputType = {
    id?: true
    errorType?: true
    message?: true
    stack?: true
    userId?: true
    path?: true
    method?: true
    statusCode?: true
    is500?: true
    createdAt?: true
    _all?: true
  }

  export type ErrorLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ErrorLog to aggregate.
     */
    where?: ErrorLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ErrorLogs to fetch.
     */
    orderBy?: ErrorLogOrderByWithRelationInput | ErrorLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ErrorLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ErrorLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ErrorLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ErrorLogs
    **/
    _count?: true | ErrorLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ErrorLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ErrorLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ErrorLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ErrorLogMaxAggregateInputType
  }

  export type GetErrorLogAggregateType<T extends ErrorLogAggregateArgs> = {
        [P in keyof T & keyof AggregateErrorLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateErrorLog[P]>
      : GetScalarType<T[P], AggregateErrorLog[P]>
  }




  export type ErrorLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ErrorLogWhereInput
    orderBy?: ErrorLogOrderByWithAggregationInput | ErrorLogOrderByWithAggregationInput[]
    by: ErrorLogScalarFieldEnum[] | ErrorLogScalarFieldEnum
    having?: ErrorLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ErrorLogCountAggregateInputType | true
    _avg?: ErrorLogAvgAggregateInputType
    _sum?: ErrorLogSumAggregateInputType
    _min?: ErrorLogMinAggregateInputType
    _max?: ErrorLogMaxAggregateInputType
  }

  export type ErrorLogGroupByOutputType = {
    id: string
    errorType: string
    message: string
    stack: string | null
    userId: string | null
    path: string | null
    method: string | null
    statusCode: number
    is500: boolean
    createdAt: Date
    _count: ErrorLogCountAggregateOutputType | null
    _avg: ErrorLogAvgAggregateOutputType | null
    _sum: ErrorLogSumAggregateOutputType | null
    _min: ErrorLogMinAggregateOutputType | null
    _max: ErrorLogMaxAggregateOutputType | null
  }

  type GetErrorLogGroupByPayload<T extends ErrorLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ErrorLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ErrorLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ErrorLogGroupByOutputType[P]>
            : GetScalarType<T[P], ErrorLogGroupByOutputType[P]>
        }
      >
    >


  export type ErrorLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    errorType?: boolean
    message?: boolean
    stack?: boolean
    userId?: boolean
    path?: boolean
    method?: boolean
    statusCode?: boolean
    is500?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["errorLog"]>



  export type ErrorLogSelectScalar = {
    id?: boolean
    errorType?: boolean
    message?: boolean
    stack?: boolean
    userId?: boolean
    path?: boolean
    method?: boolean
    statusCode?: boolean
    is500?: boolean
    createdAt?: boolean
  }

  export type ErrorLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "errorType" | "message" | "stack" | "userId" | "path" | "method" | "statusCode" | "is500" | "createdAt", ExtArgs["result"]["errorLog"]>

  export type $ErrorLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ErrorLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      errorType: string
      message: string
      stack: string | null
      userId: string | null
      path: string | null
      method: string | null
      statusCode: number
      is500: boolean
      createdAt: Date
    }, ExtArgs["result"]["errorLog"]>
    composites: {}
  }

  type ErrorLogGetPayload<S extends boolean | null | undefined | ErrorLogDefaultArgs> = $Result.GetResult<Prisma.$ErrorLogPayload, S>

  type ErrorLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ErrorLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ErrorLogCountAggregateInputType | true
    }

  export interface ErrorLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ErrorLog'], meta: { name: 'ErrorLog' } }
    /**
     * Find zero or one ErrorLog that matches the filter.
     * @param {ErrorLogFindUniqueArgs} args - Arguments to find a ErrorLog
     * @example
     * // Get one ErrorLog
     * const errorLog = await prisma.errorLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ErrorLogFindUniqueArgs>(args: SelectSubset<T, ErrorLogFindUniqueArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ErrorLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ErrorLogFindUniqueOrThrowArgs} args - Arguments to find a ErrorLog
     * @example
     * // Get one ErrorLog
     * const errorLog = await prisma.errorLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ErrorLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ErrorLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ErrorLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogFindFirstArgs} args - Arguments to find a ErrorLog
     * @example
     * // Get one ErrorLog
     * const errorLog = await prisma.errorLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ErrorLogFindFirstArgs>(args?: SelectSubset<T, ErrorLogFindFirstArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ErrorLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogFindFirstOrThrowArgs} args - Arguments to find a ErrorLog
     * @example
     * // Get one ErrorLog
     * const errorLog = await prisma.errorLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ErrorLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ErrorLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ErrorLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ErrorLogs
     * const errorLogs = await prisma.errorLog.findMany()
     * 
     * // Get first 10 ErrorLogs
     * const errorLogs = await prisma.errorLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const errorLogWithIdOnly = await prisma.errorLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ErrorLogFindManyArgs>(args?: SelectSubset<T, ErrorLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ErrorLog.
     * @param {ErrorLogCreateArgs} args - Arguments to create a ErrorLog.
     * @example
     * // Create one ErrorLog
     * const ErrorLog = await prisma.errorLog.create({
     *   data: {
     *     // ... data to create a ErrorLog
     *   }
     * })
     * 
     */
    create<T extends ErrorLogCreateArgs>(args: SelectSubset<T, ErrorLogCreateArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ErrorLogs.
     * @param {ErrorLogCreateManyArgs} args - Arguments to create many ErrorLogs.
     * @example
     * // Create many ErrorLogs
     * const errorLog = await prisma.errorLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ErrorLogCreateManyArgs>(args?: SelectSubset<T, ErrorLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ErrorLog.
     * @param {ErrorLogDeleteArgs} args - Arguments to delete one ErrorLog.
     * @example
     * // Delete one ErrorLog
     * const ErrorLog = await prisma.errorLog.delete({
     *   where: {
     *     // ... filter to delete one ErrorLog
     *   }
     * })
     * 
     */
    delete<T extends ErrorLogDeleteArgs>(args: SelectSubset<T, ErrorLogDeleteArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ErrorLog.
     * @param {ErrorLogUpdateArgs} args - Arguments to update one ErrorLog.
     * @example
     * // Update one ErrorLog
     * const errorLog = await prisma.errorLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ErrorLogUpdateArgs>(args: SelectSubset<T, ErrorLogUpdateArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ErrorLogs.
     * @param {ErrorLogDeleteManyArgs} args - Arguments to filter ErrorLogs to delete.
     * @example
     * // Delete a few ErrorLogs
     * const { count } = await prisma.errorLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ErrorLogDeleteManyArgs>(args?: SelectSubset<T, ErrorLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ErrorLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ErrorLogs
     * const errorLog = await prisma.errorLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ErrorLogUpdateManyArgs>(args: SelectSubset<T, ErrorLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ErrorLog.
     * @param {ErrorLogUpsertArgs} args - Arguments to update or create a ErrorLog.
     * @example
     * // Update or create a ErrorLog
     * const errorLog = await prisma.errorLog.upsert({
     *   create: {
     *     // ... data to create a ErrorLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ErrorLog we want to update
     *   }
     * })
     */
    upsert<T extends ErrorLogUpsertArgs>(args: SelectSubset<T, ErrorLogUpsertArgs<ExtArgs>>): Prisma__ErrorLogClient<$Result.GetResult<Prisma.$ErrorLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ErrorLogs that matches the filter.
     * @param {ErrorLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const errorLog = await prisma.errorLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ErrorLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ErrorLog.
     * @param {ErrorLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const errorLog = await prisma.errorLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ErrorLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ErrorLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogCountArgs} args - Arguments to filter ErrorLogs to count.
     * @example
     * // Count the number of ErrorLogs
     * const count = await prisma.errorLog.count({
     *   where: {
     *     // ... the filter for the ErrorLogs we want to count
     *   }
     * })
    **/
    count<T extends ErrorLogCountArgs>(
      args?: Subset<T, ErrorLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ErrorLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ErrorLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ErrorLogAggregateArgs>(args: Subset<T, ErrorLogAggregateArgs>): Prisma.PrismaPromise<GetErrorLogAggregateType<T>>

    /**
     * Group by ErrorLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ErrorLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ErrorLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ErrorLogGroupByArgs['orderBy'] }
        : { orderBy?: ErrorLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ErrorLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetErrorLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ErrorLog model
   */
  readonly fields: ErrorLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ErrorLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ErrorLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ErrorLog model
   */
  interface ErrorLogFieldRefs {
    readonly id: FieldRef<"ErrorLog", 'String'>
    readonly errorType: FieldRef<"ErrorLog", 'String'>
    readonly message: FieldRef<"ErrorLog", 'String'>
    readonly stack: FieldRef<"ErrorLog", 'String'>
    readonly userId: FieldRef<"ErrorLog", 'String'>
    readonly path: FieldRef<"ErrorLog", 'String'>
    readonly method: FieldRef<"ErrorLog", 'String'>
    readonly statusCode: FieldRef<"ErrorLog", 'Int'>
    readonly is500: FieldRef<"ErrorLog", 'Boolean'>
    readonly createdAt: FieldRef<"ErrorLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ErrorLog findUnique
   */
  export type ErrorLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLog to fetch.
     */
    where: ErrorLogWhereUniqueInput
  }

  /**
   * ErrorLog findUniqueOrThrow
   */
  export type ErrorLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLog to fetch.
     */
    where: ErrorLogWhereUniqueInput
  }

  /**
   * ErrorLog findFirst
   */
  export type ErrorLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLog to fetch.
     */
    where?: ErrorLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ErrorLogs to fetch.
     */
    orderBy?: ErrorLogOrderByWithRelationInput | ErrorLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ErrorLogs.
     */
    cursor?: ErrorLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ErrorLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ErrorLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ErrorLogs.
     */
    distinct?: ErrorLogScalarFieldEnum | ErrorLogScalarFieldEnum[]
  }

  /**
   * ErrorLog findFirstOrThrow
   */
  export type ErrorLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLog to fetch.
     */
    where?: ErrorLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ErrorLogs to fetch.
     */
    orderBy?: ErrorLogOrderByWithRelationInput | ErrorLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ErrorLogs.
     */
    cursor?: ErrorLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ErrorLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ErrorLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ErrorLogs.
     */
    distinct?: ErrorLogScalarFieldEnum | ErrorLogScalarFieldEnum[]
  }

  /**
   * ErrorLog findMany
   */
  export type ErrorLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter, which ErrorLogs to fetch.
     */
    where?: ErrorLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ErrorLogs to fetch.
     */
    orderBy?: ErrorLogOrderByWithRelationInput | ErrorLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ErrorLogs.
     */
    cursor?: ErrorLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ErrorLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ErrorLogs.
     */
    skip?: number
    distinct?: ErrorLogScalarFieldEnum | ErrorLogScalarFieldEnum[]
  }

  /**
   * ErrorLog create
   */
  export type ErrorLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ErrorLog.
     */
    data: XOR<ErrorLogCreateInput, ErrorLogUncheckedCreateInput>
  }

  /**
   * ErrorLog createMany
   */
  export type ErrorLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ErrorLogs.
     */
    data: ErrorLogCreateManyInput | ErrorLogCreateManyInput[]
  }

  /**
   * ErrorLog update
   */
  export type ErrorLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ErrorLog.
     */
    data: XOR<ErrorLogUpdateInput, ErrorLogUncheckedUpdateInput>
    /**
     * Choose, which ErrorLog to update.
     */
    where: ErrorLogWhereUniqueInput
  }

  /**
   * ErrorLog updateMany
   */
  export type ErrorLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ErrorLogs.
     */
    data: XOR<ErrorLogUpdateManyMutationInput, ErrorLogUncheckedUpdateManyInput>
    /**
     * Filter which ErrorLogs to update
     */
    where?: ErrorLogWhereInput
    /**
     * Limit how many ErrorLogs to update.
     */
    limit?: number
  }

  /**
   * ErrorLog upsert
   */
  export type ErrorLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ErrorLog to update in case it exists.
     */
    where: ErrorLogWhereUniqueInput
    /**
     * In case the ErrorLog found by the `where` argument doesn't exist, create a new ErrorLog with this data.
     */
    create: XOR<ErrorLogCreateInput, ErrorLogUncheckedCreateInput>
    /**
     * In case the ErrorLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ErrorLogUpdateInput, ErrorLogUncheckedUpdateInput>
  }

  /**
   * ErrorLog delete
   */
  export type ErrorLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
    /**
     * Filter which ErrorLog to delete.
     */
    where: ErrorLogWhereUniqueInput
  }

  /**
   * ErrorLog deleteMany
   */
  export type ErrorLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ErrorLogs to delete
     */
    where?: ErrorLogWhereInput
    /**
     * Limit how many ErrorLogs to delete.
     */
    limit?: number
  }

  /**
   * ErrorLog findRaw
   */
  export type ErrorLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ErrorLog aggregateRaw
   */
  export type ErrorLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ErrorLog without action
   */
  export type ErrorLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ErrorLog
     */
    select?: ErrorLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ErrorLog
     */
    omit?: ErrorLogOmit<ExtArgs> | null
  }


  /**
   * Model ChangeLog
   */

  export type AggregateChangeLog = {
    _count: ChangeLogCountAggregateOutputType | null
    _min: ChangeLogMinAggregateOutputType | null
    _max: ChangeLogMaxAggregateOutputType | null
  }

  export type ChangeLogMinAggregateOutputType = {
    id: string | null
    adminId: string | null
    tableName: string | null
    recordId: string | null
    action: string | null
    before: string | null
    after: string | null
    createdAt: Date | null
  }

  export type ChangeLogMaxAggregateOutputType = {
    id: string | null
    adminId: string | null
    tableName: string | null
    recordId: string | null
    action: string | null
    before: string | null
    after: string | null
    createdAt: Date | null
  }

  export type ChangeLogCountAggregateOutputType = {
    id: number
    adminId: number
    tableName: number
    recordId: number
    action: number
    before: number
    after: number
    createdAt: number
    _all: number
  }


  export type ChangeLogMinAggregateInputType = {
    id?: true
    adminId?: true
    tableName?: true
    recordId?: true
    action?: true
    before?: true
    after?: true
    createdAt?: true
  }

  export type ChangeLogMaxAggregateInputType = {
    id?: true
    adminId?: true
    tableName?: true
    recordId?: true
    action?: true
    before?: true
    after?: true
    createdAt?: true
  }

  export type ChangeLogCountAggregateInputType = {
    id?: true
    adminId?: true
    tableName?: true
    recordId?: true
    action?: true
    before?: true
    after?: true
    createdAt?: true
    _all?: true
  }

  export type ChangeLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChangeLog to aggregate.
     */
    where?: ChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeLogs to fetch.
     */
    orderBy?: ChangeLogOrderByWithRelationInput | ChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChangeLogs
    **/
    _count?: true | ChangeLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChangeLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChangeLogMaxAggregateInputType
  }

  export type GetChangeLogAggregateType<T extends ChangeLogAggregateArgs> = {
        [P in keyof T & keyof AggregateChangeLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChangeLog[P]>
      : GetScalarType<T[P], AggregateChangeLog[P]>
  }




  export type ChangeLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChangeLogWhereInput
    orderBy?: ChangeLogOrderByWithAggregationInput | ChangeLogOrderByWithAggregationInput[]
    by: ChangeLogScalarFieldEnum[] | ChangeLogScalarFieldEnum
    having?: ChangeLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChangeLogCountAggregateInputType | true
    _min?: ChangeLogMinAggregateInputType
    _max?: ChangeLogMaxAggregateInputType
  }

  export type ChangeLogGroupByOutputType = {
    id: string
    adminId: string
    tableName: string
    recordId: string
    action: string
    before: string | null
    after: string | null
    createdAt: Date
    _count: ChangeLogCountAggregateOutputType | null
    _min: ChangeLogMinAggregateOutputType | null
    _max: ChangeLogMaxAggregateOutputType | null
  }

  type GetChangeLogGroupByPayload<T extends ChangeLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChangeLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChangeLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChangeLogGroupByOutputType[P]>
            : GetScalarType<T[P], ChangeLogGroupByOutputType[P]>
        }
      >
    >


  export type ChangeLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    tableName?: boolean
    recordId?: boolean
    action?: boolean
    before?: boolean
    after?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["changeLog"]>



  export type ChangeLogSelectScalar = {
    id?: boolean
    adminId?: boolean
    tableName?: boolean
    recordId?: boolean
    action?: boolean
    before?: boolean
    after?: boolean
    createdAt?: boolean
  }

  export type ChangeLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminId" | "tableName" | "recordId" | "action" | "before" | "after" | "createdAt", ExtArgs["result"]["changeLog"]>

  export type $ChangeLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChangeLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminId: string
      tableName: string
      recordId: string
      action: string
      before: string | null
      after: string | null
      createdAt: Date
    }, ExtArgs["result"]["changeLog"]>
    composites: {}
  }

  type ChangeLogGetPayload<S extends boolean | null | undefined | ChangeLogDefaultArgs> = $Result.GetResult<Prisma.$ChangeLogPayload, S>

  type ChangeLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChangeLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChangeLogCountAggregateInputType | true
    }

  export interface ChangeLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChangeLog'], meta: { name: 'ChangeLog' } }
    /**
     * Find zero or one ChangeLog that matches the filter.
     * @param {ChangeLogFindUniqueArgs} args - Arguments to find a ChangeLog
     * @example
     * // Get one ChangeLog
     * const changeLog = await prisma.changeLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChangeLogFindUniqueArgs>(args: SelectSubset<T, ChangeLogFindUniqueArgs<ExtArgs>>): Prisma__ChangeLogClient<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChangeLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChangeLogFindUniqueOrThrowArgs} args - Arguments to find a ChangeLog
     * @example
     * // Get one ChangeLog
     * const changeLog = await prisma.changeLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChangeLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ChangeLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChangeLogClient<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChangeLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeLogFindFirstArgs} args - Arguments to find a ChangeLog
     * @example
     * // Get one ChangeLog
     * const changeLog = await prisma.changeLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChangeLogFindFirstArgs>(args?: SelectSubset<T, ChangeLogFindFirstArgs<ExtArgs>>): Prisma__ChangeLogClient<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChangeLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeLogFindFirstOrThrowArgs} args - Arguments to find a ChangeLog
     * @example
     * // Get one ChangeLog
     * const changeLog = await prisma.changeLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChangeLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ChangeLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChangeLogClient<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChangeLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChangeLogs
     * const changeLogs = await prisma.changeLog.findMany()
     * 
     * // Get first 10 ChangeLogs
     * const changeLogs = await prisma.changeLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const changeLogWithIdOnly = await prisma.changeLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChangeLogFindManyArgs>(args?: SelectSubset<T, ChangeLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChangeLog.
     * @param {ChangeLogCreateArgs} args - Arguments to create a ChangeLog.
     * @example
     * // Create one ChangeLog
     * const ChangeLog = await prisma.changeLog.create({
     *   data: {
     *     // ... data to create a ChangeLog
     *   }
     * })
     * 
     */
    create<T extends ChangeLogCreateArgs>(args: SelectSubset<T, ChangeLogCreateArgs<ExtArgs>>): Prisma__ChangeLogClient<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChangeLogs.
     * @param {ChangeLogCreateManyArgs} args - Arguments to create many ChangeLogs.
     * @example
     * // Create many ChangeLogs
     * const changeLog = await prisma.changeLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChangeLogCreateManyArgs>(args?: SelectSubset<T, ChangeLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChangeLog.
     * @param {ChangeLogDeleteArgs} args - Arguments to delete one ChangeLog.
     * @example
     * // Delete one ChangeLog
     * const ChangeLog = await prisma.changeLog.delete({
     *   where: {
     *     // ... filter to delete one ChangeLog
     *   }
     * })
     * 
     */
    delete<T extends ChangeLogDeleteArgs>(args: SelectSubset<T, ChangeLogDeleteArgs<ExtArgs>>): Prisma__ChangeLogClient<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChangeLog.
     * @param {ChangeLogUpdateArgs} args - Arguments to update one ChangeLog.
     * @example
     * // Update one ChangeLog
     * const changeLog = await prisma.changeLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChangeLogUpdateArgs>(args: SelectSubset<T, ChangeLogUpdateArgs<ExtArgs>>): Prisma__ChangeLogClient<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChangeLogs.
     * @param {ChangeLogDeleteManyArgs} args - Arguments to filter ChangeLogs to delete.
     * @example
     * // Delete a few ChangeLogs
     * const { count } = await prisma.changeLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChangeLogDeleteManyArgs>(args?: SelectSubset<T, ChangeLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChangeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChangeLogs
     * const changeLog = await prisma.changeLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChangeLogUpdateManyArgs>(args: SelectSubset<T, ChangeLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChangeLog.
     * @param {ChangeLogUpsertArgs} args - Arguments to update or create a ChangeLog.
     * @example
     * // Update or create a ChangeLog
     * const changeLog = await prisma.changeLog.upsert({
     *   create: {
     *     // ... data to create a ChangeLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChangeLog we want to update
     *   }
     * })
     */
    upsert<T extends ChangeLogUpsertArgs>(args: SelectSubset<T, ChangeLogUpsertArgs<ExtArgs>>): Prisma__ChangeLogClient<$Result.GetResult<Prisma.$ChangeLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChangeLogs that matches the filter.
     * @param {ChangeLogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const changeLog = await prisma.changeLog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ChangeLogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ChangeLog.
     * @param {ChangeLogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const changeLog = await prisma.changeLog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ChangeLogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ChangeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeLogCountArgs} args - Arguments to filter ChangeLogs to count.
     * @example
     * // Count the number of ChangeLogs
     * const count = await prisma.changeLog.count({
     *   where: {
     *     // ... the filter for the ChangeLogs we want to count
     *   }
     * })
    **/
    count<T extends ChangeLogCountArgs>(
      args?: Subset<T, ChangeLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChangeLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChangeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChangeLogAggregateArgs>(args: Subset<T, ChangeLogAggregateArgs>): Prisma.PrismaPromise<GetChangeLogAggregateType<T>>

    /**
     * Group by ChangeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChangeLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChangeLogGroupByArgs['orderBy'] }
        : { orderBy?: ChangeLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChangeLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChangeLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChangeLog model
   */
  readonly fields: ChangeLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChangeLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChangeLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChangeLog model
   */
  interface ChangeLogFieldRefs {
    readonly id: FieldRef<"ChangeLog", 'String'>
    readonly adminId: FieldRef<"ChangeLog", 'String'>
    readonly tableName: FieldRef<"ChangeLog", 'String'>
    readonly recordId: FieldRef<"ChangeLog", 'String'>
    readonly action: FieldRef<"ChangeLog", 'String'>
    readonly before: FieldRef<"ChangeLog", 'String'>
    readonly after: FieldRef<"ChangeLog", 'String'>
    readonly createdAt: FieldRef<"ChangeLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChangeLog findUnique
   */
  export type ChangeLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * Filter, which ChangeLog to fetch.
     */
    where: ChangeLogWhereUniqueInput
  }

  /**
   * ChangeLog findUniqueOrThrow
   */
  export type ChangeLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * Filter, which ChangeLog to fetch.
     */
    where: ChangeLogWhereUniqueInput
  }

  /**
   * ChangeLog findFirst
   */
  export type ChangeLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * Filter, which ChangeLog to fetch.
     */
    where?: ChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeLogs to fetch.
     */
    orderBy?: ChangeLogOrderByWithRelationInput | ChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChangeLogs.
     */
    cursor?: ChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChangeLogs.
     */
    distinct?: ChangeLogScalarFieldEnum | ChangeLogScalarFieldEnum[]
  }

  /**
   * ChangeLog findFirstOrThrow
   */
  export type ChangeLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * Filter, which ChangeLog to fetch.
     */
    where?: ChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeLogs to fetch.
     */
    orderBy?: ChangeLogOrderByWithRelationInput | ChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChangeLogs.
     */
    cursor?: ChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChangeLogs.
     */
    distinct?: ChangeLogScalarFieldEnum | ChangeLogScalarFieldEnum[]
  }

  /**
   * ChangeLog findMany
   */
  export type ChangeLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * Filter, which ChangeLogs to fetch.
     */
    where?: ChangeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeLogs to fetch.
     */
    orderBy?: ChangeLogOrderByWithRelationInput | ChangeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChangeLogs.
     */
    cursor?: ChangeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeLogs.
     */
    skip?: number
    distinct?: ChangeLogScalarFieldEnum | ChangeLogScalarFieldEnum[]
  }

  /**
   * ChangeLog create
   */
  export type ChangeLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ChangeLog.
     */
    data: XOR<ChangeLogCreateInput, ChangeLogUncheckedCreateInput>
  }

  /**
   * ChangeLog createMany
   */
  export type ChangeLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChangeLogs.
     */
    data: ChangeLogCreateManyInput | ChangeLogCreateManyInput[]
  }

  /**
   * ChangeLog update
   */
  export type ChangeLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ChangeLog.
     */
    data: XOR<ChangeLogUpdateInput, ChangeLogUncheckedUpdateInput>
    /**
     * Choose, which ChangeLog to update.
     */
    where: ChangeLogWhereUniqueInput
  }

  /**
   * ChangeLog updateMany
   */
  export type ChangeLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChangeLogs.
     */
    data: XOR<ChangeLogUpdateManyMutationInput, ChangeLogUncheckedUpdateManyInput>
    /**
     * Filter which ChangeLogs to update
     */
    where?: ChangeLogWhereInput
    /**
     * Limit how many ChangeLogs to update.
     */
    limit?: number
  }

  /**
   * ChangeLog upsert
   */
  export type ChangeLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ChangeLog to update in case it exists.
     */
    where: ChangeLogWhereUniqueInput
    /**
     * In case the ChangeLog found by the `where` argument doesn't exist, create a new ChangeLog with this data.
     */
    create: XOR<ChangeLogCreateInput, ChangeLogUncheckedCreateInput>
    /**
     * In case the ChangeLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChangeLogUpdateInput, ChangeLogUncheckedUpdateInput>
  }

  /**
   * ChangeLog delete
   */
  export type ChangeLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
    /**
     * Filter which ChangeLog to delete.
     */
    where: ChangeLogWhereUniqueInput
  }

  /**
   * ChangeLog deleteMany
   */
  export type ChangeLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChangeLogs to delete
     */
    where?: ChangeLogWhereInput
    /**
     * Limit how many ChangeLogs to delete.
     */
    limit?: number
  }

  /**
   * ChangeLog findRaw
   */
  export type ChangeLogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChangeLog aggregateRaw
   */
  export type ChangeLogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ChangeLog without action
   */
  export type ChangeLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeLog
     */
    select?: ChangeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeLog
     */
    omit?: ChangeLogOmit<ExtArgs> | null
  }


  /**
   * Model LawAmendment
   */

  export type AggregateLawAmendment = {
    _count: LawAmendmentCountAggregateOutputType | null
    _min: LawAmendmentMinAggregateOutputType | null
    _max: LawAmendmentMaxAggregateOutputType | null
  }

  export type LawAmendmentMinAggregateOutputType = {
    id: string | null
    title: string | null
    source: string | null
    sourceUrl: string | null
    detectedAt: Date | null
    effectiveDate: Date | null
    status: string | null
    changeSummary: string | null
    changeDetails: string | null
    impactAnalysis: string | null
    reviewedBy: string | null
    reviewedAt: Date | null
    appliedAt: Date | null
    rejectedAt: Date | null
    rejectionReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LawAmendmentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    source: string | null
    sourceUrl: string | null
    detectedAt: Date | null
    effectiveDate: Date | null
    status: string | null
    changeSummary: string | null
    changeDetails: string | null
    impactAnalysis: string | null
    reviewedBy: string | null
    reviewedAt: Date | null
    appliedAt: Date | null
    rejectedAt: Date | null
    rejectionReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LawAmendmentCountAggregateOutputType = {
    id: number
    title: number
    source: number
    sourceUrl: number
    detectedAt: number
    effectiveDate: number
    status: number
    affectedVisaCodes: number
    changeSummary: number
    changeDetails: number
    impactAnalysis: number
    reviewedBy: number
    reviewedAt: number
    appliedAt: number
    rejectedAt: number
    rejectionReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LawAmendmentMinAggregateInputType = {
    id?: true
    title?: true
    source?: true
    sourceUrl?: true
    detectedAt?: true
    effectiveDate?: true
    status?: true
    changeSummary?: true
    changeDetails?: true
    impactAnalysis?: true
    reviewedBy?: true
    reviewedAt?: true
    appliedAt?: true
    rejectedAt?: true
    rejectionReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LawAmendmentMaxAggregateInputType = {
    id?: true
    title?: true
    source?: true
    sourceUrl?: true
    detectedAt?: true
    effectiveDate?: true
    status?: true
    changeSummary?: true
    changeDetails?: true
    impactAnalysis?: true
    reviewedBy?: true
    reviewedAt?: true
    appliedAt?: true
    rejectedAt?: true
    rejectionReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LawAmendmentCountAggregateInputType = {
    id?: true
    title?: true
    source?: true
    sourceUrl?: true
    detectedAt?: true
    effectiveDate?: true
    status?: true
    affectedVisaCodes?: true
    changeSummary?: true
    changeDetails?: true
    impactAnalysis?: true
    reviewedBy?: true
    reviewedAt?: true
    appliedAt?: true
    rejectedAt?: true
    rejectionReason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LawAmendmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LawAmendment to aggregate.
     */
    where?: LawAmendmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawAmendments to fetch.
     */
    orderBy?: LawAmendmentOrderByWithRelationInput | LawAmendmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LawAmendmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawAmendments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawAmendments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LawAmendments
    **/
    _count?: true | LawAmendmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LawAmendmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LawAmendmentMaxAggregateInputType
  }

  export type GetLawAmendmentAggregateType<T extends LawAmendmentAggregateArgs> = {
        [P in keyof T & keyof AggregateLawAmendment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLawAmendment[P]>
      : GetScalarType<T[P], AggregateLawAmendment[P]>
  }




  export type LawAmendmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LawAmendmentWhereInput
    orderBy?: LawAmendmentOrderByWithAggregationInput | LawAmendmentOrderByWithAggregationInput[]
    by: LawAmendmentScalarFieldEnum[] | LawAmendmentScalarFieldEnum
    having?: LawAmendmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LawAmendmentCountAggregateInputType | true
    _min?: LawAmendmentMinAggregateInputType
    _max?: LawAmendmentMaxAggregateInputType
  }

  export type LawAmendmentGroupByOutputType = {
    id: string
    title: string
    source: string
    sourceUrl: string | null
    detectedAt: Date
    effectiveDate: Date
    status: string
    affectedVisaCodes: string[]
    changeSummary: string
    changeDetails: string
    impactAnalysis: string | null
    reviewedBy: string | null
    reviewedAt: Date | null
    appliedAt: Date | null
    rejectedAt: Date | null
    rejectionReason: string | null
    createdAt: Date
    updatedAt: Date
    _count: LawAmendmentCountAggregateOutputType | null
    _min: LawAmendmentMinAggregateOutputType | null
    _max: LawAmendmentMaxAggregateOutputType | null
  }

  type GetLawAmendmentGroupByPayload<T extends LawAmendmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LawAmendmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LawAmendmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LawAmendmentGroupByOutputType[P]>
            : GetScalarType<T[P], LawAmendmentGroupByOutputType[P]>
        }
      >
    >


  export type LawAmendmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    source?: boolean
    sourceUrl?: boolean
    detectedAt?: boolean
    effectiveDate?: boolean
    status?: boolean
    affectedVisaCodes?: boolean
    changeSummary?: boolean
    changeDetails?: boolean
    impactAnalysis?: boolean
    reviewedBy?: boolean
    reviewedAt?: boolean
    appliedAt?: boolean
    rejectedAt?: boolean
    rejectionReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | LawAmendment$itemsArgs<ExtArgs>
    _count?: boolean | LawAmendmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lawAmendment"]>



  export type LawAmendmentSelectScalar = {
    id?: boolean
    title?: boolean
    source?: boolean
    sourceUrl?: boolean
    detectedAt?: boolean
    effectiveDate?: boolean
    status?: boolean
    affectedVisaCodes?: boolean
    changeSummary?: boolean
    changeDetails?: boolean
    impactAnalysis?: boolean
    reviewedBy?: boolean
    reviewedAt?: boolean
    appliedAt?: boolean
    rejectedAt?: boolean
    rejectionReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LawAmendmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "source" | "sourceUrl" | "detectedAt" | "effectiveDate" | "status" | "affectedVisaCodes" | "changeSummary" | "changeDetails" | "impactAnalysis" | "reviewedBy" | "reviewedAt" | "appliedAt" | "rejectedAt" | "rejectionReason" | "createdAt" | "updatedAt", ExtArgs["result"]["lawAmendment"]>
  export type LawAmendmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | LawAmendment$itemsArgs<ExtArgs>
    _count?: boolean | LawAmendmentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LawAmendmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LawAmendment"
    objects: {
      items: Prisma.$LawAmendmentItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      source: string
      sourceUrl: string | null
      detectedAt: Date
      effectiveDate: Date
      status: string
      affectedVisaCodes: string[]
      changeSummary: string
      changeDetails: string
      impactAnalysis: string | null
      reviewedBy: string | null
      reviewedAt: Date | null
      appliedAt: Date | null
      rejectedAt: Date | null
      rejectionReason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lawAmendment"]>
    composites: {}
  }

  type LawAmendmentGetPayload<S extends boolean | null | undefined | LawAmendmentDefaultArgs> = $Result.GetResult<Prisma.$LawAmendmentPayload, S>

  type LawAmendmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LawAmendmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LawAmendmentCountAggregateInputType | true
    }

  export interface LawAmendmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LawAmendment'], meta: { name: 'LawAmendment' } }
    /**
     * Find zero or one LawAmendment that matches the filter.
     * @param {LawAmendmentFindUniqueArgs} args - Arguments to find a LawAmendment
     * @example
     * // Get one LawAmendment
     * const lawAmendment = await prisma.lawAmendment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LawAmendmentFindUniqueArgs>(args: SelectSubset<T, LawAmendmentFindUniqueArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LawAmendment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LawAmendmentFindUniqueOrThrowArgs} args - Arguments to find a LawAmendment
     * @example
     * // Get one LawAmendment
     * const lawAmendment = await prisma.lawAmendment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LawAmendmentFindUniqueOrThrowArgs>(args: SelectSubset<T, LawAmendmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LawAmendment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentFindFirstArgs} args - Arguments to find a LawAmendment
     * @example
     * // Get one LawAmendment
     * const lawAmendment = await prisma.lawAmendment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LawAmendmentFindFirstArgs>(args?: SelectSubset<T, LawAmendmentFindFirstArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LawAmendment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentFindFirstOrThrowArgs} args - Arguments to find a LawAmendment
     * @example
     * // Get one LawAmendment
     * const lawAmendment = await prisma.lawAmendment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LawAmendmentFindFirstOrThrowArgs>(args?: SelectSubset<T, LawAmendmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LawAmendments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LawAmendments
     * const lawAmendments = await prisma.lawAmendment.findMany()
     * 
     * // Get first 10 LawAmendments
     * const lawAmendments = await prisma.lawAmendment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lawAmendmentWithIdOnly = await prisma.lawAmendment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LawAmendmentFindManyArgs>(args?: SelectSubset<T, LawAmendmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LawAmendment.
     * @param {LawAmendmentCreateArgs} args - Arguments to create a LawAmendment.
     * @example
     * // Create one LawAmendment
     * const LawAmendment = await prisma.lawAmendment.create({
     *   data: {
     *     // ... data to create a LawAmendment
     *   }
     * })
     * 
     */
    create<T extends LawAmendmentCreateArgs>(args: SelectSubset<T, LawAmendmentCreateArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LawAmendments.
     * @param {LawAmendmentCreateManyArgs} args - Arguments to create many LawAmendments.
     * @example
     * // Create many LawAmendments
     * const lawAmendment = await prisma.lawAmendment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LawAmendmentCreateManyArgs>(args?: SelectSubset<T, LawAmendmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LawAmendment.
     * @param {LawAmendmentDeleteArgs} args - Arguments to delete one LawAmendment.
     * @example
     * // Delete one LawAmendment
     * const LawAmendment = await prisma.lawAmendment.delete({
     *   where: {
     *     // ... filter to delete one LawAmendment
     *   }
     * })
     * 
     */
    delete<T extends LawAmendmentDeleteArgs>(args: SelectSubset<T, LawAmendmentDeleteArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LawAmendment.
     * @param {LawAmendmentUpdateArgs} args - Arguments to update one LawAmendment.
     * @example
     * // Update one LawAmendment
     * const lawAmendment = await prisma.lawAmendment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LawAmendmentUpdateArgs>(args: SelectSubset<T, LawAmendmentUpdateArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LawAmendments.
     * @param {LawAmendmentDeleteManyArgs} args - Arguments to filter LawAmendments to delete.
     * @example
     * // Delete a few LawAmendments
     * const { count } = await prisma.lawAmendment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LawAmendmentDeleteManyArgs>(args?: SelectSubset<T, LawAmendmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LawAmendments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LawAmendments
     * const lawAmendment = await prisma.lawAmendment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LawAmendmentUpdateManyArgs>(args: SelectSubset<T, LawAmendmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LawAmendment.
     * @param {LawAmendmentUpsertArgs} args - Arguments to update or create a LawAmendment.
     * @example
     * // Update or create a LawAmendment
     * const lawAmendment = await prisma.lawAmendment.upsert({
     *   create: {
     *     // ... data to create a LawAmendment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LawAmendment we want to update
     *   }
     * })
     */
    upsert<T extends LawAmendmentUpsertArgs>(args: SelectSubset<T, LawAmendmentUpsertArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LawAmendments that matches the filter.
     * @param {LawAmendmentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lawAmendment = await prisma.lawAmendment.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: LawAmendmentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a LawAmendment.
     * @param {LawAmendmentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lawAmendment = await prisma.lawAmendment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LawAmendmentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of LawAmendments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentCountArgs} args - Arguments to filter LawAmendments to count.
     * @example
     * // Count the number of LawAmendments
     * const count = await prisma.lawAmendment.count({
     *   where: {
     *     // ... the filter for the LawAmendments we want to count
     *   }
     * })
    **/
    count<T extends LawAmendmentCountArgs>(
      args?: Subset<T, LawAmendmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LawAmendmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LawAmendment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LawAmendmentAggregateArgs>(args: Subset<T, LawAmendmentAggregateArgs>): Prisma.PrismaPromise<GetLawAmendmentAggregateType<T>>

    /**
     * Group by LawAmendment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LawAmendmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LawAmendmentGroupByArgs['orderBy'] }
        : { orderBy?: LawAmendmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LawAmendmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLawAmendmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LawAmendment model
   */
  readonly fields: LawAmendmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LawAmendment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LawAmendmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends LawAmendment$itemsArgs<ExtArgs> = {}>(args?: Subset<T, LawAmendment$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LawAmendment model
   */
  interface LawAmendmentFieldRefs {
    readonly id: FieldRef<"LawAmendment", 'String'>
    readonly title: FieldRef<"LawAmendment", 'String'>
    readonly source: FieldRef<"LawAmendment", 'String'>
    readonly sourceUrl: FieldRef<"LawAmendment", 'String'>
    readonly detectedAt: FieldRef<"LawAmendment", 'DateTime'>
    readonly effectiveDate: FieldRef<"LawAmendment", 'DateTime'>
    readonly status: FieldRef<"LawAmendment", 'String'>
    readonly affectedVisaCodes: FieldRef<"LawAmendment", 'String[]'>
    readonly changeSummary: FieldRef<"LawAmendment", 'String'>
    readonly changeDetails: FieldRef<"LawAmendment", 'String'>
    readonly impactAnalysis: FieldRef<"LawAmendment", 'String'>
    readonly reviewedBy: FieldRef<"LawAmendment", 'String'>
    readonly reviewedAt: FieldRef<"LawAmendment", 'DateTime'>
    readonly appliedAt: FieldRef<"LawAmendment", 'DateTime'>
    readonly rejectedAt: FieldRef<"LawAmendment", 'DateTime'>
    readonly rejectionReason: FieldRef<"LawAmendment", 'String'>
    readonly createdAt: FieldRef<"LawAmendment", 'DateTime'>
    readonly updatedAt: FieldRef<"LawAmendment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LawAmendment findUnique
   */
  export type LawAmendmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendment to fetch.
     */
    where: LawAmendmentWhereUniqueInput
  }

  /**
   * LawAmendment findUniqueOrThrow
   */
  export type LawAmendmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendment to fetch.
     */
    where: LawAmendmentWhereUniqueInput
  }

  /**
   * LawAmendment findFirst
   */
  export type LawAmendmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendment to fetch.
     */
    where?: LawAmendmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawAmendments to fetch.
     */
    orderBy?: LawAmendmentOrderByWithRelationInput | LawAmendmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LawAmendments.
     */
    cursor?: LawAmendmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawAmendments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawAmendments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LawAmendments.
     */
    distinct?: LawAmendmentScalarFieldEnum | LawAmendmentScalarFieldEnum[]
  }

  /**
   * LawAmendment findFirstOrThrow
   */
  export type LawAmendmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendment to fetch.
     */
    where?: LawAmendmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawAmendments to fetch.
     */
    orderBy?: LawAmendmentOrderByWithRelationInput | LawAmendmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LawAmendments.
     */
    cursor?: LawAmendmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawAmendments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawAmendments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LawAmendments.
     */
    distinct?: LawAmendmentScalarFieldEnum | LawAmendmentScalarFieldEnum[]
  }

  /**
   * LawAmendment findMany
   */
  export type LawAmendmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendments to fetch.
     */
    where?: LawAmendmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawAmendments to fetch.
     */
    orderBy?: LawAmendmentOrderByWithRelationInput | LawAmendmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LawAmendments.
     */
    cursor?: LawAmendmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawAmendments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawAmendments.
     */
    skip?: number
    distinct?: LawAmendmentScalarFieldEnum | LawAmendmentScalarFieldEnum[]
  }

  /**
   * LawAmendment create
   */
  export type LawAmendmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * The data needed to create a LawAmendment.
     */
    data: XOR<LawAmendmentCreateInput, LawAmendmentUncheckedCreateInput>
  }

  /**
   * LawAmendment createMany
   */
  export type LawAmendmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LawAmendments.
     */
    data: LawAmendmentCreateManyInput | LawAmendmentCreateManyInput[]
  }

  /**
   * LawAmendment update
   */
  export type LawAmendmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * The data needed to update a LawAmendment.
     */
    data: XOR<LawAmendmentUpdateInput, LawAmendmentUncheckedUpdateInput>
    /**
     * Choose, which LawAmendment to update.
     */
    where: LawAmendmentWhereUniqueInput
  }

  /**
   * LawAmendment updateMany
   */
  export type LawAmendmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LawAmendments.
     */
    data: XOR<LawAmendmentUpdateManyMutationInput, LawAmendmentUncheckedUpdateManyInput>
    /**
     * Filter which LawAmendments to update
     */
    where?: LawAmendmentWhereInput
    /**
     * Limit how many LawAmendments to update.
     */
    limit?: number
  }

  /**
   * LawAmendment upsert
   */
  export type LawAmendmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * The filter to search for the LawAmendment to update in case it exists.
     */
    where: LawAmendmentWhereUniqueInput
    /**
     * In case the LawAmendment found by the `where` argument doesn't exist, create a new LawAmendment with this data.
     */
    create: XOR<LawAmendmentCreateInput, LawAmendmentUncheckedCreateInput>
    /**
     * In case the LawAmendment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LawAmendmentUpdateInput, LawAmendmentUncheckedUpdateInput>
  }

  /**
   * LawAmendment delete
   */
  export type LawAmendmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
    /**
     * Filter which LawAmendment to delete.
     */
    where: LawAmendmentWhereUniqueInput
  }

  /**
   * LawAmendment deleteMany
   */
  export type LawAmendmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LawAmendments to delete
     */
    where?: LawAmendmentWhereInput
    /**
     * Limit how many LawAmendments to delete.
     */
    limit?: number
  }

  /**
   * LawAmendment findRaw
   */
  export type LawAmendmentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LawAmendment aggregateRaw
   */
  export type LawAmendmentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LawAmendment.items
   */
  export type LawAmendment$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    where?: LawAmendmentItemWhereInput
    orderBy?: LawAmendmentItemOrderByWithRelationInput | LawAmendmentItemOrderByWithRelationInput[]
    cursor?: LawAmendmentItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LawAmendmentItemScalarFieldEnum | LawAmendmentItemScalarFieldEnum[]
  }

  /**
   * LawAmendment without action
   */
  export type LawAmendmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendment
     */
    select?: LawAmendmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendment
     */
    omit?: LawAmendmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentInclude<ExtArgs> | null
  }


  /**
   * Model LawAmendmentItem
   */

  export type AggregateLawAmendmentItem = {
    _count: LawAmendmentItemCountAggregateOutputType | null
    _min: LawAmendmentItemMinAggregateOutputType | null
    _max: LawAmendmentItemMaxAggregateOutputType | null
  }

  export type LawAmendmentItemMinAggregateOutputType = {
    id: string | null
    amendmentId: string | null
    targetTable: string | null
    targetId: string | null
    action: string | null
    beforeData: string | null
    afterData: string | null
    isApplied: boolean | null
    appliedAt: Date | null
    createdAt: Date | null
  }

  export type LawAmendmentItemMaxAggregateOutputType = {
    id: string | null
    amendmentId: string | null
    targetTable: string | null
    targetId: string | null
    action: string | null
    beforeData: string | null
    afterData: string | null
    isApplied: boolean | null
    appliedAt: Date | null
    createdAt: Date | null
  }

  export type LawAmendmentItemCountAggregateOutputType = {
    id: number
    amendmentId: number
    targetTable: number
    targetId: number
    action: number
    beforeData: number
    afterData: number
    isApplied: number
    appliedAt: number
    createdAt: number
    _all: number
  }


  export type LawAmendmentItemMinAggregateInputType = {
    id?: true
    amendmentId?: true
    targetTable?: true
    targetId?: true
    action?: true
    beforeData?: true
    afterData?: true
    isApplied?: true
    appliedAt?: true
    createdAt?: true
  }

  export type LawAmendmentItemMaxAggregateInputType = {
    id?: true
    amendmentId?: true
    targetTable?: true
    targetId?: true
    action?: true
    beforeData?: true
    afterData?: true
    isApplied?: true
    appliedAt?: true
    createdAt?: true
  }

  export type LawAmendmentItemCountAggregateInputType = {
    id?: true
    amendmentId?: true
    targetTable?: true
    targetId?: true
    action?: true
    beforeData?: true
    afterData?: true
    isApplied?: true
    appliedAt?: true
    createdAt?: true
    _all?: true
  }

  export type LawAmendmentItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LawAmendmentItem to aggregate.
     */
    where?: LawAmendmentItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawAmendmentItems to fetch.
     */
    orderBy?: LawAmendmentItemOrderByWithRelationInput | LawAmendmentItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LawAmendmentItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawAmendmentItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawAmendmentItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LawAmendmentItems
    **/
    _count?: true | LawAmendmentItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LawAmendmentItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LawAmendmentItemMaxAggregateInputType
  }

  export type GetLawAmendmentItemAggregateType<T extends LawAmendmentItemAggregateArgs> = {
        [P in keyof T & keyof AggregateLawAmendmentItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLawAmendmentItem[P]>
      : GetScalarType<T[P], AggregateLawAmendmentItem[P]>
  }




  export type LawAmendmentItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LawAmendmentItemWhereInput
    orderBy?: LawAmendmentItemOrderByWithAggregationInput | LawAmendmentItemOrderByWithAggregationInput[]
    by: LawAmendmentItemScalarFieldEnum[] | LawAmendmentItemScalarFieldEnum
    having?: LawAmendmentItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LawAmendmentItemCountAggregateInputType | true
    _min?: LawAmendmentItemMinAggregateInputType
    _max?: LawAmendmentItemMaxAggregateInputType
  }

  export type LawAmendmentItemGroupByOutputType = {
    id: string
    amendmentId: string
    targetTable: string
    targetId: string | null
    action: string
    beforeData: string | null
    afterData: string
    isApplied: boolean
    appliedAt: Date | null
    createdAt: Date
    _count: LawAmendmentItemCountAggregateOutputType | null
    _min: LawAmendmentItemMinAggregateOutputType | null
    _max: LawAmendmentItemMaxAggregateOutputType | null
  }

  type GetLawAmendmentItemGroupByPayload<T extends LawAmendmentItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LawAmendmentItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LawAmendmentItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LawAmendmentItemGroupByOutputType[P]>
            : GetScalarType<T[P], LawAmendmentItemGroupByOutputType[P]>
        }
      >
    >


  export type LawAmendmentItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amendmentId?: boolean
    targetTable?: boolean
    targetId?: boolean
    action?: boolean
    beforeData?: boolean
    afterData?: boolean
    isApplied?: boolean
    appliedAt?: boolean
    createdAt?: boolean
    amendment?: boolean | LawAmendmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lawAmendmentItem"]>



  export type LawAmendmentItemSelectScalar = {
    id?: boolean
    amendmentId?: boolean
    targetTable?: boolean
    targetId?: boolean
    action?: boolean
    beforeData?: boolean
    afterData?: boolean
    isApplied?: boolean
    appliedAt?: boolean
    createdAt?: boolean
  }

  export type LawAmendmentItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amendmentId" | "targetTable" | "targetId" | "action" | "beforeData" | "afterData" | "isApplied" | "appliedAt" | "createdAt", ExtArgs["result"]["lawAmendmentItem"]>
  export type LawAmendmentItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    amendment?: boolean | LawAmendmentDefaultArgs<ExtArgs>
  }

  export type $LawAmendmentItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LawAmendmentItem"
    objects: {
      amendment: Prisma.$LawAmendmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amendmentId: string
      targetTable: string
      targetId: string | null
      action: string
      beforeData: string | null
      afterData: string
      isApplied: boolean
      appliedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["lawAmendmentItem"]>
    composites: {}
  }

  type LawAmendmentItemGetPayload<S extends boolean | null | undefined | LawAmendmentItemDefaultArgs> = $Result.GetResult<Prisma.$LawAmendmentItemPayload, S>

  type LawAmendmentItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LawAmendmentItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LawAmendmentItemCountAggregateInputType | true
    }

  export interface LawAmendmentItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LawAmendmentItem'], meta: { name: 'LawAmendmentItem' } }
    /**
     * Find zero or one LawAmendmentItem that matches the filter.
     * @param {LawAmendmentItemFindUniqueArgs} args - Arguments to find a LawAmendmentItem
     * @example
     * // Get one LawAmendmentItem
     * const lawAmendmentItem = await prisma.lawAmendmentItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LawAmendmentItemFindUniqueArgs>(args: SelectSubset<T, LawAmendmentItemFindUniqueArgs<ExtArgs>>): Prisma__LawAmendmentItemClient<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LawAmendmentItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LawAmendmentItemFindUniqueOrThrowArgs} args - Arguments to find a LawAmendmentItem
     * @example
     * // Get one LawAmendmentItem
     * const lawAmendmentItem = await prisma.lawAmendmentItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LawAmendmentItemFindUniqueOrThrowArgs>(args: SelectSubset<T, LawAmendmentItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LawAmendmentItemClient<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LawAmendmentItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentItemFindFirstArgs} args - Arguments to find a LawAmendmentItem
     * @example
     * // Get one LawAmendmentItem
     * const lawAmendmentItem = await prisma.lawAmendmentItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LawAmendmentItemFindFirstArgs>(args?: SelectSubset<T, LawAmendmentItemFindFirstArgs<ExtArgs>>): Prisma__LawAmendmentItemClient<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LawAmendmentItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentItemFindFirstOrThrowArgs} args - Arguments to find a LawAmendmentItem
     * @example
     * // Get one LawAmendmentItem
     * const lawAmendmentItem = await prisma.lawAmendmentItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LawAmendmentItemFindFirstOrThrowArgs>(args?: SelectSubset<T, LawAmendmentItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__LawAmendmentItemClient<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LawAmendmentItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LawAmendmentItems
     * const lawAmendmentItems = await prisma.lawAmendmentItem.findMany()
     * 
     * // Get first 10 LawAmendmentItems
     * const lawAmendmentItems = await prisma.lawAmendmentItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lawAmendmentItemWithIdOnly = await prisma.lawAmendmentItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LawAmendmentItemFindManyArgs>(args?: SelectSubset<T, LawAmendmentItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LawAmendmentItem.
     * @param {LawAmendmentItemCreateArgs} args - Arguments to create a LawAmendmentItem.
     * @example
     * // Create one LawAmendmentItem
     * const LawAmendmentItem = await prisma.lawAmendmentItem.create({
     *   data: {
     *     // ... data to create a LawAmendmentItem
     *   }
     * })
     * 
     */
    create<T extends LawAmendmentItemCreateArgs>(args: SelectSubset<T, LawAmendmentItemCreateArgs<ExtArgs>>): Prisma__LawAmendmentItemClient<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LawAmendmentItems.
     * @param {LawAmendmentItemCreateManyArgs} args - Arguments to create many LawAmendmentItems.
     * @example
     * // Create many LawAmendmentItems
     * const lawAmendmentItem = await prisma.lawAmendmentItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LawAmendmentItemCreateManyArgs>(args?: SelectSubset<T, LawAmendmentItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LawAmendmentItem.
     * @param {LawAmendmentItemDeleteArgs} args - Arguments to delete one LawAmendmentItem.
     * @example
     * // Delete one LawAmendmentItem
     * const LawAmendmentItem = await prisma.lawAmendmentItem.delete({
     *   where: {
     *     // ... filter to delete one LawAmendmentItem
     *   }
     * })
     * 
     */
    delete<T extends LawAmendmentItemDeleteArgs>(args: SelectSubset<T, LawAmendmentItemDeleteArgs<ExtArgs>>): Prisma__LawAmendmentItemClient<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LawAmendmentItem.
     * @param {LawAmendmentItemUpdateArgs} args - Arguments to update one LawAmendmentItem.
     * @example
     * // Update one LawAmendmentItem
     * const lawAmendmentItem = await prisma.lawAmendmentItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LawAmendmentItemUpdateArgs>(args: SelectSubset<T, LawAmendmentItemUpdateArgs<ExtArgs>>): Prisma__LawAmendmentItemClient<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LawAmendmentItems.
     * @param {LawAmendmentItemDeleteManyArgs} args - Arguments to filter LawAmendmentItems to delete.
     * @example
     * // Delete a few LawAmendmentItems
     * const { count } = await prisma.lawAmendmentItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LawAmendmentItemDeleteManyArgs>(args?: SelectSubset<T, LawAmendmentItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LawAmendmentItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LawAmendmentItems
     * const lawAmendmentItem = await prisma.lawAmendmentItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LawAmendmentItemUpdateManyArgs>(args: SelectSubset<T, LawAmendmentItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LawAmendmentItem.
     * @param {LawAmendmentItemUpsertArgs} args - Arguments to update or create a LawAmendmentItem.
     * @example
     * // Update or create a LawAmendmentItem
     * const lawAmendmentItem = await prisma.lawAmendmentItem.upsert({
     *   create: {
     *     // ... data to create a LawAmendmentItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LawAmendmentItem we want to update
     *   }
     * })
     */
    upsert<T extends LawAmendmentItemUpsertArgs>(args: SelectSubset<T, LawAmendmentItemUpsertArgs<ExtArgs>>): Prisma__LawAmendmentItemClient<$Result.GetResult<Prisma.$LawAmendmentItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LawAmendmentItems that matches the filter.
     * @param {LawAmendmentItemFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const lawAmendmentItem = await prisma.lawAmendmentItem.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: LawAmendmentItemFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a LawAmendmentItem.
     * @param {LawAmendmentItemAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const lawAmendmentItem = await prisma.lawAmendmentItem.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: LawAmendmentItemAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of LawAmendmentItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentItemCountArgs} args - Arguments to filter LawAmendmentItems to count.
     * @example
     * // Count the number of LawAmendmentItems
     * const count = await prisma.lawAmendmentItem.count({
     *   where: {
     *     // ... the filter for the LawAmendmentItems we want to count
     *   }
     * })
    **/
    count<T extends LawAmendmentItemCountArgs>(
      args?: Subset<T, LawAmendmentItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LawAmendmentItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LawAmendmentItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LawAmendmentItemAggregateArgs>(args: Subset<T, LawAmendmentItemAggregateArgs>): Prisma.PrismaPromise<GetLawAmendmentItemAggregateType<T>>

    /**
     * Group by LawAmendmentItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawAmendmentItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LawAmendmentItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LawAmendmentItemGroupByArgs['orderBy'] }
        : { orderBy?: LawAmendmentItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LawAmendmentItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLawAmendmentItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LawAmendmentItem model
   */
  readonly fields: LawAmendmentItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LawAmendmentItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LawAmendmentItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    amendment<T extends LawAmendmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LawAmendmentDefaultArgs<ExtArgs>>): Prisma__LawAmendmentClient<$Result.GetResult<Prisma.$LawAmendmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LawAmendmentItem model
   */
  interface LawAmendmentItemFieldRefs {
    readonly id: FieldRef<"LawAmendmentItem", 'String'>
    readonly amendmentId: FieldRef<"LawAmendmentItem", 'String'>
    readonly targetTable: FieldRef<"LawAmendmentItem", 'String'>
    readonly targetId: FieldRef<"LawAmendmentItem", 'String'>
    readonly action: FieldRef<"LawAmendmentItem", 'String'>
    readonly beforeData: FieldRef<"LawAmendmentItem", 'String'>
    readonly afterData: FieldRef<"LawAmendmentItem", 'String'>
    readonly isApplied: FieldRef<"LawAmendmentItem", 'Boolean'>
    readonly appliedAt: FieldRef<"LawAmendmentItem", 'DateTime'>
    readonly createdAt: FieldRef<"LawAmendmentItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LawAmendmentItem findUnique
   */
  export type LawAmendmentItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendmentItem to fetch.
     */
    where: LawAmendmentItemWhereUniqueInput
  }

  /**
   * LawAmendmentItem findUniqueOrThrow
   */
  export type LawAmendmentItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendmentItem to fetch.
     */
    where: LawAmendmentItemWhereUniqueInput
  }

  /**
   * LawAmendmentItem findFirst
   */
  export type LawAmendmentItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendmentItem to fetch.
     */
    where?: LawAmendmentItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawAmendmentItems to fetch.
     */
    orderBy?: LawAmendmentItemOrderByWithRelationInput | LawAmendmentItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LawAmendmentItems.
     */
    cursor?: LawAmendmentItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawAmendmentItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawAmendmentItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LawAmendmentItems.
     */
    distinct?: LawAmendmentItemScalarFieldEnum | LawAmendmentItemScalarFieldEnum[]
  }

  /**
   * LawAmendmentItem findFirstOrThrow
   */
  export type LawAmendmentItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendmentItem to fetch.
     */
    where?: LawAmendmentItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawAmendmentItems to fetch.
     */
    orderBy?: LawAmendmentItemOrderByWithRelationInput | LawAmendmentItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LawAmendmentItems.
     */
    cursor?: LawAmendmentItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawAmendmentItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawAmendmentItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LawAmendmentItems.
     */
    distinct?: LawAmendmentItemScalarFieldEnum | LawAmendmentItemScalarFieldEnum[]
  }

  /**
   * LawAmendmentItem findMany
   */
  export type LawAmendmentItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * Filter, which LawAmendmentItems to fetch.
     */
    where?: LawAmendmentItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawAmendmentItems to fetch.
     */
    orderBy?: LawAmendmentItemOrderByWithRelationInput | LawAmendmentItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LawAmendmentItems.
     */
    cursor?: LawAmendmentItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawAmendmentItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawAmendmentItems.
     */
    skip?: number
    distinct?: LawAmendmentItemScalarFieldEnum | LawAmendmentItemScalarFieldEnum[]
  }

  /**
   * LawAmendmentItem create
   */
  export type LawAmendmentItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * The data needed to create a LawAmendmentItem.
     */
    data: XOR<LawAmendmentItemCreateInput, LawAmendmentItemUncheckedCreateInput>
  }

  /**
   * LawAmendmentItem createMany
   */
  export type LawAmendmentItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LawAmendmentItems.
     */
    data: LawAmendmentItemCreateManyInput | LawAmendmentItemCreateManyInput[]
  }

  /**
   * LawAmendmentItem update
   */
  export type LawAmendmentItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * The data needed to update a LawAmendmentItem.
     */
    data: XOR<LawAmendmentItemUpdateInput, LawAmendmentItemUncheckedUpdateInput>
    /**
     * Choose, which LawAmendmentItem to update.
     */
    where: LawAmendmentItemWhereUniqueInput
  }

  /**
   * LawAmendmentItem updateMany
   */
  export type LawAmendmentItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LawAmendmentItems.
     */
    data: XOR<LawAmendmentItemUpdateManyMutationInput, LawAmendmentItemUncheckedUpdateManyInput>
    /**
     * Filter which LawAmendmentItems to update
     */
    where?: LawAmendmentItemWhereInput
    /**
     * Limit how many LawAmendmentItems to update.
     */
    limit?: number
  }

  /**
   * LawAmendmentItem upsert
   */
  export type LawAmendmentItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * The filter to search for the LawAmendmentItem to update in case it exists.
     */
    where: LawAmendmentItemWhereUniqueInput
    /**
     * In case the LawAmendmentItem found by the `where` argument doesn't exist, create a new LawAmendmentItem with this data.
     */
    create: XOR<LawAmendmentItemCreateInput, LawAmendmentItemUncheckedCreateInput>
    /**
     * In case the LawAmendmentItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LawAmendmentItemUpdateInput, LawAmendmentItemUncheckedUpdateInput>
  }

  /**
   * LawAmendmentItem delete
   */
  export type LawAmendmentItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
    /**
     * Filter which LawAmendmentItem to delete.
     */
    where: LawAmendmentItemWhereUniqueInput
  }

  /**
   * LawAmendmentItem deleteMany
   */
  export type LawAmendmentItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LawAmendmentItems to delete
     */
    where?: LawAmendmentItemWhereInput
    /**
     * Limit how many LawAmendmentItems to delete.
     */
    limit?: number
  }

  /**
   * LawAmendmentItem findRaw
   */
  export type LawAmendmentItemFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LawAmendmentItem aggregateRaw
   */
  export type LawAmendmentItemAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * LawAmendmentItem without action
   */
  export type LawAmendmentItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LawAmendmentItem
     */
    select?: LawAmendmentItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LawAmendmentItem
     */
    omit?: LawAmendmentItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LawAmendmentItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const SystemLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    actionType: 'actionType',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type SystemLogScalarFieldEnum = (typeof SystemLogScalarFieldEnum)[keyof typeof SystemLogScalarFieldEnum]


  export const RequestLogScalarFieldEnum: {
    id: 'id',
    method: 'method',
    path: 'path',
    statusCode: 'statusCode',
    userId: 'userId',
    responseTime: 'responseTime',
    ip: 'ip',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type RequestLogScalarFieldEnum = (typeof RequestLogScalarFieldEnum)[keyof typeof RequestLogScalarFieldEnum]


  export const MatchingLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    inputData: 'inputData',
    eligibleCount: 'eligibleCount',
    eligibleVisas: 'eligibleVisas',
    blockedCount: 'blockedCount',
    durationMs: 'durationMs',
    createdAt: 'createdAt'
  };

  export type MatchingLogScalarFieldEnum = (typeof MatchingLogScalarFieldEnum)[keyof typeof MatchingLogScalarFieldEnum]


  export const ErrorLogScalarFieldEnum: {
    id: 'id',
    errorType: 'errorType',
    message: 'message',
    stack: 'stack',
    userId: 'userId',
    path: 'path',
    method: 'method',
    statusCode: 'statusCode',
    is500: 'is500',
    createdAt: 'createdAt'
  };

  export type ErrorLogScalarFieldEnum = (typeof ErrorLogScalarFieldEnum)[keyof typeof ErrorLogScalarFieldEnum]


  export const ChangeLogScalarFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    tableName: 'tableName',
    recordId: 'recordId',
    action: 'action',
    before: 'before',
    after: 'after',
    createdAt: 'createdAt'
  };

  export type ChangeLogScalarFieldEnum = (typeof ChangeLogScalarFieldEnum)[keyof typeof ChangeLogScalarFieldEnum]


  export const LawAmendmentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    source: 'source',
    sourceUrl: 'sourceUrl',
    detectedAt: 'detectedAt',
    effectiveDate: 'effectiveDate',
    status: 'status',
    affectedVisaCodes: 'affectedVisaCodes',
    changeSummary: 'changeSummary',
    changeDetails: 'changeDetails',
    impactAnalysis: 'impactAnalysis',
    reviewedBy: 'reviewedBy',
    reviewedAt: 'reviewedAt',
    appliedAt: 'appliedAt',
    rejectedAt: 'rejectedAt',
    rejectionReason: 'rejectionReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LawAmendmentScalarFieldEnum = (typeof LawAmendmentScalarFieldEnum)[keyof typeof LawAmendmentScalarFieldEnum]


  export const LawAmendmentItemScalarFieldEnum: {
    id: 'id',
    amendmentId: 'amendmentId',
    targetTable: 'targetTable',
    targetId: 'targetId',
    action: 'action',
    beforeData: 'beforeData',
    afterData: 'afterData',
    isApplied: 'isApplied',
    appliedAt: 'appliedAt',
    createdAt: 'createdAt'
  };

  export type LawAmendmentItemScalarFieldEnum = (typeof LawAmendmentItemScalarFieldEnum)[keyof typeof LawAmendmentItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SystemLogWhereInput = {
    AND?: SystemLogWhereInput | SystemLogWhereInput[]
    OR?: SystemLogWhereInput[]
    NOT?: SystemLogWhereInput | SystemLogWhereInput[]
    id?: StringFilter<"SystemLog"> | string
    userId?: StringNullableFilter<"SystemLog"> | string | null
    actionType?: StringNullableFilter<"SystemLog"> | string | null
    description?: StringNullableFilter<"SystemLog"> | string | null
    createdAt?: DateTimeFilter<"SystemLog"> | Date | string
  }

  export type SystemLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SystemLogWhereInput | SystemLogWhereInput[]
    OR?: SystemLogWhereInput[]
    NOT?: SystemLogWhereInput | SystemLogWhereInput[]
    userId?: StringNullableFilter<"SystemLog"> | string | null
    actionType?: StringNullableFilter<"SystemLog"> | string | null
    description?: StringNullableFilter<"SystemLog"> | string | null
    createdAt?: DateTimeFilter<"SystemLog"> | Date | string
  }, "id">

  export type SystemLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    _count?: SystemLogCountOrderByAggregateInput
    _max?: SystemLogMaxOrderByAggregateInput
    _min?: SystemLogMinOrderByAggregateInput
  }

  export type SystemLogScalarWhereWithAggregatesInput = {
    AND?: SystemLogScalarWhereWithAggregatesInput | SystemLogScalarWhereWithAggregatesInput[]
    OR?: SystemLogScalarWhereWithAggregatesInput[]
    NOT?: SystemLogScalarWhereWithAggregatesInput | SystemLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemLog"> | string
    userId?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    actionType?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    description?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SystemLog"> | Date | string
  }

  export type RequestLogWhereInput = {
    AND?: RequestLogWhereInput | RequestLogWhereInput[]
    OR?: RequestLogWhereInput[]
    NOT?: RequestLogWhereInput | RequestLogWhereInput[]
    id?: StringFilter<"RequestLog"> | string
    method?: StringFilter<"RequestLog"> | string
    path?: StringFilter<"RequestLog"> | string
    statusCode?: IntFilter<"RequestLog"> | number
    userId?: StringNullableFilter<"RequestLog"> | string | null
    responseTime?: IntFilter<"RequestLog"> | number
    ip?: StringNullableFilter<"RequestLog"> | string | null
    userAgent?: StringNullableFilter<"RequestLog"> | string | null
    createdAt?: DateTimeFilter<"RequestLog"> | Date | string
  }

  export type RequestLogOrderByWithRelationInput = {
    id?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrder
    userId?: SortOrder
    responseTime?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RequestLogWhereInput | RequestLogWhereInput[]
    OR?: RequestLogWhereInput[]
    NOT?: RequestLogWhereInput | RequestLogWhereInput[]
    method?: StringFilter<"RequestLog"> | string
    path?: StringFilter<"RequestLog"> | string
    statusCode?: IntFilter<"RequestLog"> | number
    userId?: StringNullableFilter<"RequestLog"> | string | null
    responseTime?: IntFilter<"RequestLog"> | number
    ip?: StringNullableFilter<"RequestLog"> | string | null
    userAgent?: StringNullableFilter<"RequestLog"> | string | null
    createdAt?: DateTimeFilter<"RequestLog"> | Date | string
  }, "id">

  export type RequestLogOrderByWithAggregationInput = {
    id?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrder
    userId?: SortOrder
    responseTime?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    _count?: RequestLogCountOrderByAggregateInput
    _avg?: RequestLogAvgOrderByAggregateInput
    _max?: RequestLogMaxOrderByAggregateInput
    _min?: RequestLogMinOrderByAggregateInput
    _sum?: RequestLogSumOrderByAggregateInput
  }

  export type RequestLogScalarWhereWithAggregatesInput = {
    AND?: RequestLogScalarWhereWithAggregatesInput | RequestLogScalarWhereWithAggregatesInput[]
    OR?: RequestLogScalarWhereWithAggregatesInput[]
    NOT?: RequestLogScalarWhereWithAggregatesInput | RequestLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestLog"> | string
    method?: StringWithAggregatesFilter<"RequestLog"> | string
    path?: StringWithAggregatesFilter<"RequestLog"> | string
    statusCode?: IntWithAggregatesFilter<"RequestLog"> | number
    userId?: StringNullableWithAggregatesFilter<"RequestLog"> | string | null
    responseTime?: IntWithAggregatesFilter<"RequestLog"> | number
    ip?: StringNullableWithAggregatesFilter<"RequestLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"RequestLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RequestLog"> | Date | string
  }

  export type MatchingLogWhereInput = {
    AND?: MatchingLogWhereInput | MatchingLogWhereInput[]
    OR?: MatchingLogWhereInput[]
    NOT?: MatchingLogWhereInput | MatchingLogWhereInput[]
    id?: StringFilter<"MatchingLog"> | string
    userId?: StringNullableFilter<"MatchingLog"> | string | null
    inputData?: StringFilter<"MatchingLog"> | string
    eligibleCount?: IntFilter<"MatchingLog"> | number
    eligibleVisas?: StringNullableFilter<"MatchingLog"> | string | null
    blockedCount?: IntFilter<"MatchingLog"> | number
    durationMs?: IntFilter<"MatchingLog"> | number
    createdAt?: DateTimeFilter<"MatchingLog"> | Date | string
  }

  export type MatchingLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    inputData?: SortOrder
    eligibleCount?: SortOrder
    eligibleVisas?: SortOrder
    blockedCount?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchingLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchingLogWhereInput | MatchingLogWhereInput[]
    OR?: MatchingLogWhereInput[]
    NOT?: MatchingLogWhereInput | MatchingLogWhereInput[]
    userId?: StringNullableFilter<"MatchingLog"> | string | null
    inputData?: StringFilter<"MatchingLog"> | string
    eligibleCount?: IntFilter<"MatchingLog"> | number
    eligibleVisas?: StringNullableFilter<"MatchingLog"> | string | null
    blockedCount?: IntFilter<"MatchingLog"> | number
    durationMs?: IntFilter<"MatchingLog"> | number
    createdAt?: DateTimeFilter<"MatchingLog"> | Date | string
  }, "id">

  export type MatchingLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    inputData?: SortOrder
    eligibleCount?: SortOrder
    eligibleVisas?: SortOrder
    blockedCount?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
    _count?: MatchingLogCountOrderByAggregateInput
    _avg?: MatchingLogAvgOrderByAggregateInput
    _max?: MatchingLogMaxOrderByAggregateInput
    _min?: MatchingLogMinOrderByAggregateInput
    _sum?: MatchingLogSumOrderByAggregateInput
  }

  export type MatchingLogScalarWhereWithAggregatesInput = {
    AND?: MatchingLogScalarWhereWithAggregatesInput | MatchingLogScalarWhereWithAggregatesInput[]
    OR?: MatchingLogScalarWhereWithAggregatesInput[]
    NOT?: MatchingLogScalarWhereWithAggregatesInput | MatchingLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchingLog"> | string
    userId?: StringNullableWithAggregatesFilter<"MatchingLog"> | string | null
    inputData?: StringWithAggregatesFilter<"MatchingLog"> | string
    eligibleCount?: IntWithAggregatesFilter<"MatchingLog"> | number
    eligibleVisas?: StringNullableWithAggregatesFilter<"MatchingLog"> | string | null
    blockedCount?: IntWithAggregatesFilter<"MatchingLog"> | number
    durationMs?: IntWithAggregatesFilter<"MatchingLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MatchingLog"> | Date | string
  }

  export type ErrorLogWhereInput = {
    AND?: ErrorLogWhereInput | ErrorLogWhereInput[]
    OR?: ErrorLogWhereInput[]
    NOT?: ErrorLogWhereInput | ErrorLogWhereInput[]
    id?: StringFilter<"ErrorLog"> | string
    errorType?: StringFilter<"ErrorLog"> | string
    message?: StringFilter<"ErrorLog"> | string
    stack?: StringNullableFilter<"ErrorLog"> | string | null
    userId?: StringNullableFilter<"ErrorLog"> | string | null
    path?: StringNullableFilter<"ErrorLog"> | string | null
    method?: StringNullableFilter<"ErrorLog"> | string | null
    statusCode?: IntFilter<"ErrorLog"> | number
    is500?: BoolFilter<"ErrorLog"> | boolean
    createdAt?: DateTimeFilter<"ErrorLog"> | Date | string
  }

  export type ErrorLogOrderByWithRelationInput = {
    id?: SortOrder
    errorType?: SortOrder
    message?: SortOrder
    stack?: SortOrder
    userId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    is500?: SortOrder
    createdAt?: SortOrder
  }

  export type ErrorLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ErrorLogWhereInput | ErrorLogWhereInput[]
    OR?: ErrorLogWhereInput[]
    NOT?: ErrorLogWhereInput | ErrorLogWhereInput[]
    errorType?: StringFilter<"ErrorLog"> | string
    message?: StringFilter<"ErrorLog"> | string
    stack?: StringNullableFilter<"ErrorLog"> | string | null
    userId?: StringNullableFilter<"ErrorLog"> | string | null
    path?: StringNullableFilter<"ErrorLog"> | string | null
    method?: StringNullableFilter<"ErrorLog"> | string | null
    statusCode?: IntFilter<"ErrorLog"> | number
    is500?: BoolFilter<"ErrorLog"> | boolean
    createdAt?: DateTimeFilter<"ErrorLog"> | Date | string
  }, "id">

  export type ErrorLogOrderByWithAggregationInput = {
    id?: SortOrder
    errorType?: SortOrder
    message?: SortOrder
    stack?: SortOrder
    userId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    is500?: SortOrder
    createdAt?: SortOrder
    _count?: ErrorLogCountOrderByAggregateInput
    _avg?: ErrorLogAvgOrderByAggregateInput
    _max?: ErrorLogMaxOrderByAggregateInput
    _min?: ErrorLogMinOrderByAggregateInput
    _sum?: ErrorLogSumOrderByAggregateInput
  }

  export type ErrorLogScalarWhereWithAggregatesInput = {
    AND?: ErrorLogScalarWhereWithAggregatesInput | ErrorLogScalarWhereWithAggregatesInput[]
    OR?: ErrorLogScalarWhereWithAggregatesInput[]
    NOT?: ErrorLogScalarWhereWithAggregatesInput | ErrorLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ErrorLog"> | string
    errorType?: StringWithAggregatesFilter<"ErrorLog"> | string
    message?: StringWithAggregatesFilter<"ErrorLog"> | string
    stack?: StringNullableWithAggregatesFilter<"ErrorLog"> | string | null
    userId?: StringNullableWithAggregatesFilter<"ErrorLog"> | string | null
    path?: StringNullableWithAggregatesFilter<"ErrorLog"> | string | null
    method?: StringNullableWithAggregatesFilter<"ErrorLog"> | string | null
    statusCode?: IntWithAggregatesFilter<"ErrorLog"> | number
    is500?: BoolWithAggregatesFilter<"ErrorLog"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ErrorLog"> | Date | string
  }

  export type ChangeLogWhereInput = {
    AND?: ChangeLogWhereInput | ChangeLogWhereInput[]
    OR?: ChangeLogWhereInput[]
    NOT?: ChangeLogWhereInput | ChangeLogWhereInput[]
    id?: StringFilter<"ChangeLog"> | string
    adminId?: StringFilter<"ChangeLog"> | string
    tableName?: StringFilter<"ChangeLog"> | string
    recordId?: StringFilter<"ChangeLog"> | string
    action?: StringFilter<"ChangeLog"> | string
    before?: StringNullableFilter<"ChangeLog"> | string | null
    after?: StringNullableFilter<"ChangeLog"> | string | null
    createdAt?: DateTimeFilter<"ChangeLog"> | Date | string
  }

  export type ChangeLogOrderByWithRelationInput = {
    id?: SortOrder
    adminId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    action?: SortOrder
    before?: SortOrder
    after?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChangeLogWhereInput | ChangeLogWhereInput[]
    OR?: ChangeLogWhereInput[]
    NOT?: ChangeLogWhereInput | ChangeLogWhereInput[]
    adminId?: StringFilter<"ChangeLog"> | string
    tableName?: StringFilter<"ChangeLog"> | string
    recordId?: StringFilter<"ChangeLog"> | string
    action?: StringFilter<"ChangeLog"> | string
    before?: StringNullableFilter<"ChangeLog"> | string | null
    after?: StringNullableFilter<"ChangeLog"> | string | null
    createdAt?: DateTimeFilter<"ChangeLog"> | Date | string
  }, "id">

  export type ChangeLogOrderByWithAggregationInput = {
    id?: SortOrder
    adminId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    action?: SortOrder
    before?: SortOrder
    after?: SortOrder
    createdAt?: SortOrder
    _count?: ChangeLogCountOrderByAggregateInput
    _max?: ChangeLogMaxOrderByAggregateInput
    _min?: ChangeLogMinOrderByAggregateInput
  }

  export type ChangeLogScalarWhereWithAggregatesInput = {
    AND?: ChangeLogScalarWhereWithAggregatesInput | ChangeLogScalarWhereWithAggregatesInput[]
    OR?: ChangeLogScalarWhereWithAggregatesInput[]
    NOT?: ChangeLogScalarWhereWithAggregatesInput | ChangeLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChangeLog"> | string
    adminId?: StringWithAggregatesFilter<"ChangeLog"> | string
    tableName?: StringWithAggregatesFilter<"ChangeLog"> | string
    recordId?: StringWithAggregatesFilter<"ChangeLog"> | string
    action?: StringWithAggregatesFilter<"ChangeLog"> | string
    before?: StringNullableWithAggregatesFilter<"ChangeLog"> | string | null
    after?: StringNullableWithAggregatesFilter<"ChangeLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ChangeLog"> | Date | string
  }

  export type LawAmendmentWhereInput = {
    AND?: LawAmendmentWhereInput | LawAmendmentWhereInput[]
    OR?: LawAmendmentWhereInput[]
    NOT?: LawAmendmentWhereInput | LawAmendmentWhereInput[]
    id?: StringFilter<"LawAmendment"> | string
    title?: StringFilter<"LawAmendment"> | string
    source?: StringFilter<"LawAmendment"> | string
    sourceUrl?: StringNullableFilter<"LawAmendment"> | string | null
    detectedAt?: DateTimeFilter<"LawAmendment"> | Date | string
    effectiveDate?: DateTimeFilter<"LawAmendment"> | Date | string
    status?: StringFilter<"LawAmendment"> | string
    affectedVisaCodes?: StringNullableListFilter<"LawAmendment">
    changeSummary?: StringFilter<"LawAmendment"> | string
    changeDetails?: StringFilter<"LawAmendment"> | string
    impactAnalysis?: StringNullableFilter<"LawAmendment"> | string | null
    reviewedBy?: StringNullableFilter<"LawAmendment"> | string | null
    reviewedAt?: DateTimeNullableFilter<"LawAmendment"> | Date | string | null
    appliedAt?: DateTimeNullableFilter<"LawAmendment"> | Date | string | null
    rejectedAt?: DateTimeNullableFilter<"LawAmendment"> | Date | string | null
    rejectionReason?: StringNullableFilter<"LawAmendment"> | string | null
    createdAt?: DateTimeFilter<"LawAmendment"> | Date | string
    updatedAt?: DateTimeFilter<"LawAmendment"> | Date | string
    items?: LawAmendmentItemListRelationFilter
  }

  export type LawAmendmentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    detectedAt?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    affectedVisaCodes?: SortOrder
    changeSummary?: SortOrder
    changeDetails?: SortOrder
    impactAnalysis?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    appliedAt?: SortOrder
    rejectedAt?: SortOrder
    rejectionReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: LawAmendmentItemOrderByRelationAggregateInput
  }

  export type LawAmendmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LawAmendmentWhereInput | LawAmendmentWhereInput[]
    OR?: LawAmendmentWhereInput[]
    NOT?: LawAmendmentWhereInput | LawAmendmentWhereInput[]
    title?: StringFilter<"LawAmendment"> | string
    source?: StringFilter<"LawAmendment"> | string
    sourceUrl?: StringNullableFilter<"LawAmendment"> | string | null
    detectedAt?: DateTimeFilter<"LawAmendment"> | Date | string
    effectiveDate?: DateTimeFilter<"LawAmendment"> | Date | string
    status?: StringFilter<"LawAmendment"> | string
    affectedVisaCodes?: StringNullableListFilter<"LawAmendment">
    changeSummary?: StringFilter<"LawAmendment"> | string
    changeDetails?: StringFilter<"LawAmendment"> | string
    impactAnalysis?: StringNullableFilter<"LawAmendment"> | string | null
    reviewedBy?: StringNullableFilter<"LawAmendment"> | string | null
    reviewedAt?: DateTimeNullableFilter<"LawAmendment"> | Date | string | null
    appliedAt?: DateTimeNullableFilter<"LawAmendment"> | Date | string | null
    rejectedAt?: DateTimeNullableFilter<"LawAmendment"> | Date | string | null
    rejectionReason?: StringNullableFilter<"LawAmendment"> | string | null
    createdAt?: DateTimeFilter<"LawAmendment"> | Date | string
    updatedAt?: DateTimeFilter<"LawAmendment"> | Date | string
    items?: LawAmendmentItemListRelationFilter
  }, "id">

  export type LawAmendmentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    detectedAt?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    affectedVisaCodes?: SortOrder
    changeSummary?: SortOrder
    changeDetails?: SortOrder
    impactAnalysis?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    appliedAt?: SortOrder
    rejectedAt?: SortOrder
    rejectionReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LawAmendmentCountOrderByAggregateInput
    _max?: LawAmendmentMaxOrderByAggregateInput
    _min?: LawAmendmentMinOrderByAggregateInput
  }

  export type LawAmendmentScalarWhereWithAggregatesInput = {
    AND?: LawAmendmentScalarWhereWithAggregatesInput | LawAmendmentScalarWhereWithAggregatesInput[]
    OR?: LawAmendmentScalarWhereWithAggregatesInput[]
    NOT?: LawAmendmentScalarWhereWithAggregatesInput | LawAmendmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LawAmendment"> | string
    title?: StringWithAggregatesFilter<"LawAmendment"> | string
    source?: StringWithAggregatesFilter<"LawAmendment"> | string
    sourceUrl?: StringNullableWithAggregatesFilter<"LawAmendment"> | string | null
    detectedAt?: DateTimeWithAggregatesFilter<"LawAmendment"> | Date | string
    effectiveDate?: DateTimeWithAggregatesFilter<"LawAmendment"> | Date | string
    status?: StringWithAggregatesFilter<"LawAmendment"> | string
    affectedVisaCodes?: StringNullableListFilter<"LawAmendment">
    changeSummary?: StringWithAggregatesFilter<"LawAmendment"> | string
    changeDetails?: StringWithAggregatesFilter<"LawAmendment"> | string
    impactAnalysis?: StringNullableWithAggregatesFilter<"LawAmendment"> | string | null
    reviewedBy?: StringNullableWithAggregatesFilter<"LawAmendment"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"LawAmendment"> | Date | string | null
    appliedAt?: DateTimeNullableWithAggregatesFilter<"LawAmendment"> | Date | string | null
    rejectedAt?: DateTimeNullableWithAggregatesFilter<"LawAmendment"> | Date | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"LawAmendment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LawAmendment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LawAmendment"> | Date | string
  }

  export type LawAmendmentItemWhereInput = {
    AND?: LawAmendmentItemWhereInput | LawAmendmentItemWhereInput[]
    OR?: LawAmendmentItemWhereInput[]
    NOT?: LawAmendmentItemWhereInput | LawAmendmentItemWhereInput[]
    id?: StringFilter<"LawAmendmentItem"> | string
    amendmentId?: StringFilter<"LawAmendmentItem"> | string
    targetTable?: StringFilter<"LawAmendmentItem"> | string
    targetId?: StringNullableFilter<"LawAmendmentItem"> | string | null
    action?: StringFilter<"LawAmendmentItem"> | string
    beforeData?: StringNullableFilter<"LawAmendmentItem"> | string | null
    afterData?: StringFilter<"LawAmendmentItem"> | string
    isApplied?: BoolFilter<"LawAmendmentItem"> | boolean
    appliedAt?: DateTimeNullableFilter<"LawAmendmentItem"> | Date | string | null
    createdAt?: DateTimeFilter<"LawAmendmentItem"> | Date | string
    amendment?: XOR<LawAmendmentScalarRelationFilter, LawAmendmentWhereInput>
  }

  export type LawAmendmentItemOrderByWithRelationInput = {
    id?: SortOrder
    amendmentId?: SortOrder
    targetTable?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    beforeData?: SortOrder
    afterData?: SortOrder
    isApplied?: SortOrder
    appliedAt?: SortOrder
    createdAt?: SortOrder
    amendment?: LawAmendmentOrderByWithRelationInput
  }

  export type LawAmendmentItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LawAmendmentItemWhereInput | LawAmendmentItemWhereInput[]
    OR?: LawAmendmentItemWhereInput[]
    NOT?: LawAmendmentItemWhereInput | LawAmendmentItemWhereInput[]
    amendmentId?: StringFilter<"LawAmendmentItem"> | string
    targetTable?: StringFilter<"LawAmendmentItem"> | string
    targetId?: StringNullableFilter<"LawAmendmentItem"> | string | null
    action?: StringFilter<"LawAmendmentItem"> | string
    beforeData?: StringNullableFilter<"LawAmendmentItem"> | string | null
    afterData?: StringFilter<"LawAmendmentItem"> | string
    isApplied?: BoolFilter<"LawAmendmentItem"> | boolean
    appliedAt?: DateTimeNullableFilter<"LawAmendmentItem"> | Date | string | null
    createdAt?: DateTimeFilter<"LawAmendmentItem"> | Date | string
    amendment?: XOR<LawAmendmentScalarRelationFilter, LawAmendmentWhereInput>
  }, "id">

  export type LawAmendmentItemOrderByWithAggregationInput = {
    id?: SortOrder
    amendmentId?: SortOrder
    targetTable?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    beforeData?: SortOrder
    afterData?: SortOrder
    isApplied?: SortOrder
    appliedAt?: SortOrder
    createdAt?: SortOrder
    _count?: LawAmendmentItemCountOrderByAggregateInput
    _max?: LawAmendmentItemMaxOrderByAggregateInput
    _min?: LawAmendmentItemMinOrderByAggregateInput
  }

  export type LawAmendmentItemScalarWhereWithAggregatesInput = {
    AND?: LawAmendmentItemScalarWhereWithAggregatesInput | LawAmendmentItemScalarWhereWithAggregatesInput[]
    OR?: LawAmendmentItemScalarWhereWithAggregatesInput[]
    NOT?: LawAmendmentItemScalarWhereWithAggregatesInput | LawAmendmentItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LawAmendmentItem"> | string
    amendmentId?: StringWithAggregatesFilter<"LawAmendmentItem"> | string
    targetTable?: StringWithAggregatesFilter<"LawAmendmentItem"> | string
    targetId?: StringNullableWithAggregatesFilter<"LawAmendmentItem"> | string | null
    action?: StringWithAggregatesFilter<"LawAmendmentItem"> | string
    beforeData?: StringNullableWithAggregatesFilter<"LawAmendmentItem"> | string | null
    afterData?: StringWithAggregatesFilter<"LawAmendmentItem"> | string
    isApplied?: BoolWithAggregatesFilter<"LawAmendmentItem"> | boolean
    appliedAt?: DateTimeNullableWithAggregatesFilter<"LawAmendmentItem"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LawAmendmentItem"> | Date | string
  }

  export type SystemLogCreateInput = {
    id?: string
    userId?: string | null
    actionType?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type SystemLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    actionType?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type SystemLogUpdateInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogUncheckedUpdateInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogCreateManyInput = {
    id?: string
    userId?: string | null
    actionType?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type SystemLogUpdateManyMutationInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemLogUncheckedUpdateManyInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogCreateInput = {
    id?: string
    method: string
    path: string
    statusCode: number
    userId?: string | null
    responseTime: number
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type RequestLogUncheckedCreateInput = {
    id?: string
    method: string
    path: string
    statusCode: number
    userId?: string | null
    responseTime: number
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type RequestLogUpdateInput = {
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogUncheckedUpdateInput = {
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogCreateManyInput = {
    id?: string
    method: string
    path: string
    statusCode: number
    userId?: string | null
    responseTime: number
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type RequestLogUpdateManyMutationInput = {
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogUncheckedUpdateManyInput = {
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: IntFieldUpdateOperationsInput | number
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchingLogCreateInput = {
    id?: string
    userId?: string | null
    inputData: string
    eligibleCount: number
    eligibleVisas?: string | null
    blockedCount: number
    durationMs: number
    createdAt?: Date | string
  }

  export type MatchingLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    inputData: string
    eligibleCount: number
    eligibleVisas?: string | null
    blockedCount: number
    durationMs: number
    createdAt?: Date | string
  }

  export type MatchingLogUpdateInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    inputData?: StringFieldUpdateOperationsInput | string
    eligibleCount?: IntFieldUpdateOperationsInput | number
    eligibleVisas?: NullableStringFieldUpdateOperationsInput | string | null
    blockedCount?: IntFieldUpdateOperationsInput | number
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchingLogUncheckedUpdateInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    inputData?: StringFieldUpdateOperationsInput | string
    eligibleCount?: IntFieldUpdateOperationsInput | number
    eligibleVisas?: NullableStringFieldUpdateOperationsInput | string | null
    blockedCount?: IntFieldUpdateOperationsInput | number
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchingLogCreateManyInput = {
    id?: string
    userId?: string | null
    inputData: string
    eligibleCount: number
    eligibleVisas?: string | null
    blockedCount: number
    durationMs: number
    createdAt?: Date | string
  }

  export type MatchingLogUpdateManyMutationInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    inputData?: StringFieldUpdateOperationsInput | string
    eligibleCount?: IntFieldUpdateOperationsInput | number
    eligibleVisas?: NullableStringFieldUpdateOperationsInput | string | null
    blockedCount?: IntFieldUpdateOperationsInput | number
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchingLogUncheckedUpdateManyInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    inputData?: StringFieldUpdateOperationsInput | string
    eligibleCount?: IntFieldUpdateOperationsInput | number
    eligibleVisas?: NullableStringFieldUpdateOperationsInput | string | null
    blockedCount?: IntFieldUpdateOperationsInput | number
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ErrorLogCreateInput = {
    id?: string
    errorType: string
    message: string
    stack?: string | null
    userId?: string | null
    path?: string | null
    method?: string | null
    statusCode?: number
    is500?: boolean
    createdAt?: Date | string
  }

  export type ErrorLogUncheckedCreateInput = {
    id?: string
    errorType: string
    message: string
    stack?: string | null
    userId?: string | null
    path?: string | null
    method?: string | null
    statusCode?: number
    is500?: boolean
    createdAt?: Date | string
  }

  export type ErrorLogUpdateInput = {
    errorType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    stack?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    method?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    is500?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ErrorLogUncheckedUpdateInput = {
    errorType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    stack?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    method?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    is500?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ErrorLogCreateManyInput = {
    id?: string
    errorType: string
    message: string
    stack?: string | null
    userId?: string | null
    path?: string | null
    method?: string | null
    statusCode?: number
    is500?: boolean
    createdAt?: Date | string
  }

  export type ErrorLogUpdateManyMutationInput = {
    errorType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    stack?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    method?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    is500?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ErrorLogUncheckedUpdateManyInput = {
    errorType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    stack?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    method?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    is500?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeLogCreateInput = {
    id?: string
    adminId: string
    tableName: string
    recordId: string
    action: string
    before?: string | null
    after?: string | null
    createdAt?: Date | string
  }

  export type ChangeLogUncheckedCreateInput = {
    id?: string
    adminId: string
    tableName: string
    recordId: string
    action: string
    before?: string | null
    after?: string | null
    createdAt?: Date | string
  }

  export type ChangeLogUpdateInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    before?: NullableStringFieldUpdateOperationsInput | string | null
    after?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeLogUncheckedUpdateInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    before?: NullableStringFieldUpdateOperationsInput | string | null
    after?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeLogCreateManyInput = {
    id?: string
    adminId: string
    tableName: string
    recordId: string
    action: string
    before?: string | null
    after?: string | null
    createdAt?: Date | string
  }

  export type ChangeLogUpdateManyMutationInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    before?: NullableStringFieldUpdateOperationsInput | string | null
    after?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeLogUncheckedUpdateManyInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    before?: NullableStringFieldUpdateOperationsInput | string | null
    after?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentCreateInput = {
    id?: string
    title: string
    source: string
    sourceUrl?: string | null
    detectedAt?: Date | string
    effectiveDate: Date | string
    status?: string
    affectedVisaCodes?: LawAmendmentCreateaffectedVisaCodesInput | string[]
    changeSummary: string
    changeDetails: string
    impactAnalysis?: string | null
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    appliedAt?: Date | string | null
    rejectedAt?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: LawAmendmentItemCreateNestedManyWithoutAmendmentInput
  }

  export type LawAmendmentUncheckedCreateInput = {
    id?: string
    title: string
    source: string
    sourceUrl?: string | null
    detectedAt?: Date | string
    effectiveDate: Date | string
    status?: string
    affectedVisaCodes?: LawAmendmentCreateaffectedVisaCodesInput | string[]
    changeSummary: string
    changeDetails: string
    impactAnalysis?: string | null
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    appliedAt?: Date | string | null
    rejectedAt?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: LawAmendmentItemUncheckedCreateNestedManyWithoutAmendmentInput
  }

  export type LawAmendmentUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    affectedVisaCodes?: LawAmendmentUpdateaffectedVisaCodesInput | string[]
    changeSummary?: StringFieldUpdateOperationsInput | string
    changeDetails?: StringFieldUpdateOperationsInput | string
    impactAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: LawAmendmentItemUpdateManyWithoutAmendmentNestedInput
  }

  export type LawAmendmentUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    affectedVisaCodes?: LawAmendmentUpdateaffectedVisaCodesInput | string[]
    changeSummary?: StringFieldUpdateOperationsInput | string
    changeDetails?: StringFieldUpdateOperationsInput | string
    impactAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: LawAmendmentItemUncheckedUpdateManyWithoutAmendmentNestedInput
  }

  export type LawAmendmentCreateManyInput = {
    id?: string
    title: string
    source: string
    sourceUrl?: string | null
    detectedAt?: Date | string
    effectiveDate: Date | string
    status?: string
    affectedVisaCodes?: LawAmendmentCreateaffectedVisaCodesInput | string[]
    changeSummary: string
    changeDetails: string
    impactAnalysis?: string | null
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    appliedAt?: Date | string | null
    rejectedAt?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LawAmendmentUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    affectedVisaCodes?: LawAmendmentUpdateaffectedVisaCodesInput | string[]
    changeSummary?: StringFieldUpdateOperationsInput | string
    changeDetails?: StringFieldUpdateOperationsInput | string
    impactAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    affectedVisaCodes?: LawAmendmentUpdateaffectedVisaCodesInput | string[]
    changeSummary?: StringFieldUpdateOperationsInput | string
    changeDetails?: StringFieldUpdateOperationsInput | string
    impactAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentItemCreateInput = {
    id?: string
    targetTable: string
    targetId?: string | null
    action: string
    beforeData?: string | null
    afterData: string
    isApplied?: boolean
    appliedAt?: Date | string | null
    createdAt?: Date | string
    amendment: LawAmendmentCreateNestedOneWithoutItemsInput
  }

  export type LawAmendmentItemUncheckedCreateInput = {
    id?: string
    amendmentId: string
    targetTable: string
    targetId?: string | null
    action: string
    beforeData?: string | null
    afterData: string
    isApplied?: boolean
    appliedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LawAmendmentItemUpdateInput = {
    targetTable?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    beforeData?: NullableStringFieldUpdateOperationsInput | string | null
    afterData?: StringFieldUpdateOperationsInput | string
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amendment?: LawAmendmentUpdateOneRequiredWithoutItemsNestedInput
  }

  export type LawAmendmentItemUncheckedUpdateInput = {
    amendmentId?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    beforeData?: NullableStringFieldUpdateOperationsInput | string | null
    afterData?: StringFieldUpdateOperationsInput | string
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentItemCreateManyInput = {
    id?: string
    amendmentId: string
    targetTable: string
    targetId?: string | null
    action: string
    beforeData?: string | null
    afterData: string
    isApplied?: boolean
    appliedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LawAmendmentItemUpdateManyMutationInput = {
    targetTable?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    beforeData?: NullableStringFieldUpdateOperationsInput | string | null
    afterData?: StringFieldUpdateOperationsInput | string
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentItemUncheckedUpdateManyInput = {
    amendmentId?: StringFieldUpdateOperationsInput | string
    targetTable?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    beforeData?: NullableStringFieldUpdateOperationsInput | string | null
    afterData?: StringFieldUpdateOperationsInput | string
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SystemLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RequestLogCountOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrder
    userId?: SortOrder
    responseTime?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogAvgOrderByAggregateInput = {
    statusCode?: SortOrder
    responseTime?: SortOrder
  }

  export type RequestLogMaxOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrder
    userId?: SortOrder
    responseTime?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogMinOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrder
    userId?: SortOrder
    responseTime?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogSumOrderByAggregateInput = {
    statusCode?: SortOrder
    responseTime?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type MatchingLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputData?: SortOrder
    eligibleCount?: SortOrder
    eligibleVisas?: SortOrder
    blockedCount?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchingLogAvgOrderByAggregateInput = {
    eligibleCount?: SortOrder
    blockedCount?: SortOrder
    durationMs?: SortOrder
  }

  export type MatchingLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputData?: SortOrder
    eligibleCount?: SortOrder
    eligibleVisas?: SortOrder
    blockedCount?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchingLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputData?: SortOrder
    eligibleCount?: SortOrder
    eligibleVisas?: SortOrder
    blockedCount?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchingLogSumOrderByAggregateInput = {
    eligibleCount?: SortOrder
    blockedCount?: SortOrder
    durationMs?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ErrorLogCountOrderByAggregateInput = {
    id?: SortOrder
    errorType?: SortOrder
    message?: SortOrder
    stack?: SortOrder
    userId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    is500?: SortOrder
    createdAt?: SortOrder
  }

  export type ErrorLogAvgOrderByAggregateInput = {
    statusCode?: SortOrder
  }

  export type ErrorLogMaxOrderByAggregateInput = {
    id?: SortOrder
    errorType?: SortOrder
    message?: SortOrder
    stack?: SortOrder
    userId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    is500?: SortOrder
    createdAt?: SortOrder
  }

  export type ErrorLogMinOrderByAggregateInput = {
    id?: SortOrder
    errorType?: SortOrder
    message?: SortOrder
    stack?: SortOrder
    userId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    is500?: SortOrder
    createdAt?: SortOrder
  }

  export type ErrorLogSumOrderByAggregateInput = {
    statusCode?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ChangeLogCountOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    action?: SortOrder
    before?: SortOrder
    after?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeLogMaxOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    action?: SortOrder
    before?: SortOrder
    after?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeLogMinOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    action?: SortOrder
    before?: SortOrder
    after?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type LawAmendmentItemListRelationFilter = {
    every?: LawAmendmentItemWhereInput
    some?: LawAmendmentItemWhereInput
    none?: LawAmendmentItemWhereInput
  }

  export type LawAmendmentItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LawAmendmentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    detectedAt?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    affectedVisaCodes?: SortOrder
    changeSummary?: SortOrder
    changeDetails?: SortOrder
    impactAnalysis?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    appliedAt?: SortOrder
    rejectedAt?: SortOrder
    rejectionReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LawAmendmentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    detectedAt?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    changeSummary?: SortOrder
    changeDetails?: SortOrder
    impactAnalysis?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    appliedAt?: SortOrder
    rejectedAt?: SortOrder
    rejectionReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LawAmendmentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    source?: SortOrder
    sourceUrl?: SortOrder
    detectedAt?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    changeSummary?: SortOrder
    changeDetails?: SortOrder
    impactAnalysis?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    appliedAt?: SortOrder
    rejectedAt?: SortOrder
    rejectionReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type LawAmendmentScalarRelationFilter = {
    is?: LawAmendmentWhereInput
    isNot?: LawAmendmentWhereInput
  }

  export type LawAmendmentItemCountOrderByAggregateInput = {
    id?: SortOrder
    amendmentId?: SortOrder
    targetTable?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    beforeData?: SortOrder
    afterData?: SortOrder
    isApplied?: SortOrder
    appliedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type LawAmendmentItemMaxOrderByAggregateInput = {
    id?: SortOrder
    amendmentId?: SortOrder
    targetTable?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    beforeData?: SortOrder
    afterData?: SortOrder
    isApplied?: SortOrder
    appliedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type LawAmendmentItemMinOrderByAggregateInput = {
    id?: SortOrder
    amendmentId?: SortOrder
    targetTable?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    beforeData?: SortOrder
    afterData?: SortOrder
    isApplied?: SortOrder
    appliedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LawAmendmentCreateaffectedVisaCodesInput = {
    set: string[]
  }

  export type LawAmendmentItemCreateNestedManyWithoutAmendmentInput = {
    create?: XOR<LawAmendmentItemCreateWithoutAmendmentInput, LawAmendmentItemUncheckedCreateWithoutAmendmentInput> | LawAmendmentItemCreateWithoutAmendmentInput[] | LawAmendmentItemUncheckedCreateWithoutAmendmentInput[]
    connectOrCreate?: LawAmendmentItemCreateOrConnectWithoutAmendmentInput | LawAmendmentItemCreateOrConnectWithoutAmendmentInput[]
    createMany?: LawAmendmentItemCreateManyAmendmentInputEnvelope
    connect?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
  }

  export type LawAmendmentItemUncheckedCreateNestedManyWithoutAmendmentInput = {
    create?: XOR<LawAmendmentItemCreateWithoutAmendmentInput, LawAmendmentItemUncheckedCreateWithoutAmendmentInput> | LawAmendmentItemCreateWithoutAmendmentInput[] | LawAmendmentItemUncheckedCreateWithoutAmendmentInput[]
    connectOrCreate?: LawAmendmentItemCreateOrConnectWithoutAmendmentInput | LawAmendmentItemCreateOrConnectWithoutAmendmentInput[]
    createMany?: LawAmendmentItemCreateManyAmendmentInputEnvelope
    connect?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
  }

  export type LawAmendmentUpdateaffectedVisaCodesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type LawAmendmentItemUpdateManyWithoutAmendmentNestedInput = {
    create?: XOR<LawAmendmentItemCreateWithoutAmendmentInput, LawAmendmentItemUncheckedCreateWithoutAmendmentInput> | LawAmendmentItemCreateWithoutAmendmentInput[] | LawAmendmentItemUncheckedCreateWithoutAmendmentInput[]
    connectOrCreate?: LawAmendmentItemCreateOrConnectWithoutAmendmentInput | LawAmendmentItemCreateOrConnectWithoutAmendmentInput[]
    upsert?: LawAmendmentItemUpsertWithWhereUniqueWithoutAmendmentInput | LawAmendmentItemUpsertWithWhereUniqueWithoutAmendmentInput[]
    createMany?: LawAmendmentItemCreateManyAmendmentInputEnvelope
    set?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
    disconnect?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
    delete?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
    connect?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
    update?: LawAmendmentItemUpdateWithWhereUniqueWithoutAmendmentInput | LawAmendmentItemUpdateWithWhereUniqueWithoutAmendmentInput[]
    updateMany?: LawAmendmentItemUpdateManyWithWhereWithoutAmendmentInput | LawAmendmentItemUpdateManyWithWhereWithoutAmendmentInput[]
    deleteMany?: LawAmendmentItemScalarWhereInput | LawAmendmentItemScalarWhereInput[]
  }

  export type LawAmendmentItemUncheckedUpdateManyWithoutAmendmentNestedInput = {
    create?: XOR<LawAmendmentItemCreateWithoutAmendmentInput, LawAmendmentItemUncheckedCreateWithoutAmendmentInput> | LawAmendmentItemCreateWithoutAmendmentInput[] | LawAmendmentItemUncheckedCreateWithoutAmendmentInput[]
    connectOrCreate?: LawAmendmentItemCreateOrConnectWithoutAmendmentInput | LawAmendmentItemCreateOrConnectWithoutAmendmentInput[]
    upsert?: LawAmendmentItemUpsertWithWhereUniqueWithoutAmendmentInput | LawAmendmentItemUpsertWithWhereUniqueWithoutAmendmentInput[]
    createMany?: LawAmendmentItemCreateManyAmendmentInputEnvelope
    set?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
    disconnect?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
    delete?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
    connect?: LawAmendmentItemWhereUniqueInput | LawAmendmentItemWhereUniqueInput[]
    update?: LawAmendmentItemUpdateWithWhereUniqueWithoutAmendmentInput | LawAmendmentItemUpdateWithWhereUniqueWithoutAmendmentInput[]
    updateMany?: LawAmendmentItemUpdateManyWithWhereWithoutAmendmentInput | LawAmendmentItemUpdateManyWithWhereWithoutAmendmentInput[]
    deleteMany?: LawAmendmentItemScalarWhereInput | LawAmendmentItemScalarWhereInput[]
  }

  export type LawAmendmentCreateNestedOneWithoutItemsInput = {
    create?: XOR<LawAmendmentCreateWithoutItemsInput, LawAmendmentUncheckedCreateWithoutItemsInput>
    connectOrCreate?: LawAmendmentCreateOrConnectWithoutItemsInput
    connect?: LawAmendmentWhereUniqueInput
  }

  export type LawAmendmentUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<LawAmendmentCreateWithoutItemsInput, LawAmendmentUncheckedCreateWithoutItemsInput>
    connectOrCreate?: LawAmendmentCreateOrConnectWithoutItemsInput
    upsert?: LawAmendmentUpsertWithoutItemsInput
    connect?: LawAmendmentWhereUniqueInput
    update?: XOR<XOR<LawAmendmentUpdateToOneWithWhereWithoutItemsInput, LawAmendmentUpdateWithoutItemsInput>, LawAmendmentUncheckedUpdateWithoutItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type LawAmendmentItemCreateWithoutAmendmentInput = {
    id?: string
    targetTable: string
    targetId?: string | null
    action: string
    beforeData?: string | null
    afterData: string
    isApplied?: boolean
    appliedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LawAmendmentItemUncheckedCreateWithoutAmendmentInput = {
    id?: string
    targetTable: string
    targetId?: string | null
    action: string
    beforeData?: string | null
    afterData: string
    isApplied?: boolean
    appliedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LawAmendmentItemCreateOrConnectWithoutAmendmentInput = {
    where: LawAmendmentItemWhereUniqueInput
    create: XOR<LawAmendmentItemCreateWithoutAmendmentInput, LawAmendmentItemUncheckedCreateWithoutAmendmentInput>
  }

  export type LawAmendmentItemCreateManyAmendmentInputEnvelope = {
    data: LawAmendmentItemCreateManyAmendmentInput | LawAmendmentItemCreateManyAmendmentInput[]
  }

  export type LawAmendmentItemUpsertWithWhereUniqueWithoutAmendmentInput = {
    where: LawAmendmentItemWhereUniqueInput
    update: XOR<LawAmendmentItemUpdateWithoutAmendmentInput, LawAmendmentItemUncheckedUpdateWithoutAmendmentInput>
    create: XOR<LawAmendmentItemCreateWithoutAmendmentInput, LawAmendmentItemUncheckedCreateWithoutAmendmentInput>
  }

  export type LawAmendmentItemUpdateWithWhereUniqueWithoutAmendmentInput = {
    where: LawAmendmentItemWhereUniqueInput
    data: XOR<LawAmendmentItemUpdateWithoutAmendmentInput, LawAmendmentItemUncheckedUpdateWithoutAmendmentInput>
  }

  export type LawAmendmentItemUpdateManyWithWhereWithoutAmendmentInput = {
    where: LawAmendmentItemScalarWhereInput
    data: XOR<LawAmendmentItemUpdateManyMutationInput, LawAmendmentItemUncheckedUpdateManyWithoutAmendmentInput>
  }

  export type LawAmendmentItemScalarWhereInput = {
    AND?: LawAmendmentItemScalarWhereInput | LawAmendmentItemScalarWhereInput[]
    OR?: LawAmendmentItemScalarWhereInput[]
    NOT?: LawAmendmentItemScalarWhereInput | LawAmendmentItemScalarWhereInput[]
    id?: StringFilter<"LawAmendmentItem"> | string
    amendmentId?: StringFilter<"LawAmendmentItem"> | string
    targetTable?: StringFilter<"LawAmendmentItem"> | string
    targetId?: StringNullableFilter<"LawAmendmentItem"> | string | null
    action?: StringFilter<"LawAmendmentItem"> | string
    beforeData?: StringNullableFilter<"LawAmendmentItem"> | string | null
    afterData?: StringFilter<"LawAmendmentItem"> | string
    isApplied?: BoolFilter<"LawAmendmentItem"> | boolean
    appliedAt?: DateTimeNullableFilter<"LawAmendmentItem"> | Date | string | null
    createdAt?: DateTimeFilter<"LawAmendmentItem"> | Date | string
  }

  export type LawAmendmentCreateWithoutItemsInput = {
    id?: string
    title: string
    source: string
    sourceUrl?: string | null
    detectedAt?: Date | string
    effectiveDate: Date | string
    status?: string
    affectedVisaCodes?: LawAmendmentCreateaffectedVisaCodesInput | string[]
    changeSummary: string
    changeDetails: string
    impactAnalysis?: string | null
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    appliedAt?: Date | string | null
    rejectedAt?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LawAmendmentUncheckedCreateWithoutItemsInput = {
    id?: string
    title: string
    source: string
    sourceUrl?: string | null
    detectedAt?: Date | string
    effectiveDate: Date | string
    status?: string
    affectedVisaCodes?: LawAmendmentCreateaffectedVisaCodesInput | string[]
    changeSummary: string
    changeDetails: string
    impactAnalysis?: string | null
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    appliedAt?: Date | string | null
    rejectedAt?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LawAmendmentCreateOrConnectWithoutItemsInput = {
    where: LawAmendmentWhereUniqueInput
    create: XOR<LawAmendmentCreateWithoutItemsInput, LawAmendmentUncheckedCreateWithoutItemsInput>
  }

  export type LawAmendmentUpsertWithoutItemsInput = {
    update: XOR<LawAmendmentUpdateWithoutItemsInput, LawAmendmentUncheckedUpdateWithoutItemsInput>
    create: XOR<LawAmendmentCreateWithoutItemsInput, LawAmendmentUncheckedCreateWithoutItemsInput>
    where?: LawAmendmentWhereInput
  }

  export type LawAmendmentUpdateToOneWithWhereWithoutItemsInput = {
    where?: LawAmendmentWhereInput
    data: XOR<LawAmendmentUpdateWithoutItemsInput, LawAmendmentUncheckedUpdateWithoutItemsInput>
  }

  export type LawAmendmentUpdateWithoutItemsInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    affectedVisaCodes?: LawAmendmentUpdateaffectedVisaCodesInput | string[]
    changeSummary?: StringFieldUpdateOperationsInput | string
    changeDetails?: StringFieldUpdateOperationsInput | string
    impactAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentUncheckedUpdateWithoutItemsInput = {
    title?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    affectedVisaCodes?: LawAmendmentUpdateaffectedVisaCodesInput | string[]
    changeSummary?: StringFieldUpdateOperationsInput | string
    changeDetails?: StringFieldUpdateOperationsInput | string
    impactAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentItemCreateManyAmendmentInput = {
    id?: string
    targetTable: string
    targetId?: string | null
    action: string
    beforeData?: string | null
    afterData: string
    isApplied?: boolean
    appliedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type LawAmendmentItemUpdateWithoutAmendmentInput = {
    targetTable?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    beforeData?: NullableStringFieldUpdateOperationsInput | string | null
    afterData?: StringFieldUpdateOperationsInput | string
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentItemUncheckedUpdateWithoutAmendmentInput = {
    targetTable?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    beforeData?: NullableStringFieldUpdateOperationsInput | string | null
    afterData?: StringFieldUpdateOperationsInput | string
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LawAmendmentItemUncheckedUpdateManyWithoutAmendmentInput = {
    targetTable?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    beforeData?: NullableStringFieldUpdateOperationsInput | string | null
    afterData?: StringFieldUpdateOperationsInput | string
    isApplied?: BoolFieldUpdateOperationsInput | boolean
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}