
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
 * Model ServiceProduct
 * 
 */
export type ServiceProduct = $Result.DefaultSelection<Prisma.$ServiceProductPayload>
/**
 * Model ProductPricingRule
 * 
 */
export type ProductPricingRule = $Result.DefaultSelection<Prisma.$ProductPricingRulePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model PointLedger
 * 
 */
export type PointLedger = $Result.DefaultSelection<Prisma.$PointLedgerPayload>
/**
 * Model CorporateCoupon
 * 
 */
export type CorporateCoupon = $Result.DefaultSelection<Prisma.$CorporateCouponPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ServiceProducts
 * const serviceProducts = await prisma.serviceProduct.findMany()
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
   * // Fetch zero or more ServiceProducts
   * const serviceProducts = await prisma.serviceProduct.findMany()
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.serviceProduct`: Exposes CRUD operations for the **ServiceProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceProducts
    * const serviceProducts = await prisma.serviceProduct.findMany()
    * ```
    */
  get serviceProduct(): Prisma.ServiceProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productPricingRule`: Exposes CRUD operations for the **ProductPricingRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductPricingRules
    * const productPricingRules = await prisma.productPricingRule.findMany()
    * ```
    */
  get productPricingRule(): Prisma.ProductPricingRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pointLedger`: Exposes CRUD operations for the **PointLedger** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PointLedgers
    * const pointLedgers = await prisma.pointLedger.findMany()
    * ```
    */
  get pointLedger(): Prisma.PointLedgerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.corporateCoupon`: Exposes CRUD operations for the **CorporateCoupon** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CorporateCoupons
    * const corporateCoupons = await prisma.corporateCoupon.findMany()
    * ```
    */
  get corporateCoupon(): Prisma.CorporateCouponDelegate<ExtArgs, ClientOptions>;
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
    ServiceProduct: 'ServiceProduct',
    ProductPricingRule: 'ProductPricingRule',
    Order: 'Order',
    OrderItem: 'OrderItem',
    PointLedger: 'PointLedger',
    CorporateCoupon: 'CorporateCoupon'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "serviceProduct" | "productPricingRule" | "order" | "orderItem" | "pointLedger" | "corporateCoupon"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ServiceProduct: {
        payload: Prisma.$ServiceProductPayload<ExtArgs>
        fields: Prisma.ServiceProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>
          }
          findFirst: {
            args: Prisma.ServiceProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>
          }
          findMany: {
            args: Prisma.ServiceProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>[]
          }
          create: {
            args: Prisma.ServiceProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>
          }
          createMany: {
            args: Prisma.ServiceProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>[]
          }
          delete: {
            args: Prisma.ServiceProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>
          }
          update: {
            args: Prisma.ServiceProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>
          }
          deleteMany: {
            args: Prisma.ServiceProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>[]
          }
          upsert: {
            args: Prisma.ServiceProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceProductPayload>
          }
          aggregate: {
            args: Prisma.ServiceProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceProduct>
          }
          groupBy: {
            args: Prisma.ServiceProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceProductCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceProductCountAggregateOutputType> | number
          }
        }
      }
      ProductPricingRule: {
        payload: Prisma.$ProductPricingRulePayload<ExtArgs>
        fields: Prisma.ProductPricingRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductPricingRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductPricingRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>
          }
          findFirst: {
            args: Prisma.ProductPricingRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductPricingRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>
          }
          findMany: {
            args: Prisma.ProductPricingRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>[]
          }
          create: {
            args: Prisma.ProductPricingRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>
          }
          createMany: {
            args: Prisma.ProductPricingRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductPricingRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>[]
          }
          delete: {
            args: Prisma.ProductPricingRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>
          }
          update: {
            args: Prisma.ProductPricingRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>
          }
          deleteMany: {
            args: Prisma.ProductPricingRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductPricingRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductPricingRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>[]
          }
          upsert: {
            args: Prisma.ProductPricingRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPricingRulePayload>
          }
          aggregate: {
            args: Prisma.ProductPricingRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductPricingRule>
          }
          groupBy: {
            args: Prisma.ProductPricingRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductPricingRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductPricingRuleCountArgs<ExtArgs>
            result: $Utils.Optional<ProductPricingRuleCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      PointLedger: {
        payload: Prisma.$PointLedgerPayload<ExtArgs>
        fields: Prisma.PointLedgerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointLedgerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointLedgerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>
          }
          findFirst: {
            args: Prisma.PointLedgerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointLedgerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>
          }
          findMany: {
            args: Prisma.PointLedgerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>[]
          }
          create: {
            args: Prisma.PointLedgerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>
          }
          createMany: {
            args: Prisma.PointLedgerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointLedgerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>[]
          }
          delete: {
            args: Prisma.PointLedgerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>
          }
          update: {
            args: Prisma.PointLedgerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>
          }
          deleteMany: {
            args: Prisma.PointLedgerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointLedgerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PointLedgerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>[]
          }
          upsert: {
            args: Prisma.PointLedgerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointLedgerPayload>
          }
          aggregate: {
            args: Prisma.PointLedgerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointLedger>
          }
          groupBy: {
            args: Prisma.PointLedgerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointLedgerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointLedgerCountArgs<ExtArgs>
            result: $Utils.Optional<PointLedgerCountAggregateOutputType> | number
          }
        }
      }
      CorporateCoupon: {
        payload: Prisma.$CorporateCouponPayload<ExtArgs>
        fields: Prisma.CorporateCouponFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CorporateCouponFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CorporateCouponFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>
          }
          findFirst: {
            args: Prisma.CorporateCouponFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CorporateCouponFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>
          }
          findMany: {
            args: Prisma.CorporateCouponFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>[]
          }
          create: {
            args: Prisma.CorporateCouponCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>
          }
          createMany: {
            args: Prisma.CorporateCouponCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CorporateCouponCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>[]
          }
          delete: {
            args: Prisma.CorporateCouponDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>
          }
          update: {
            args: Prisma.CorporateCouponUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>
          }
          deleteMany: {
            args: Prisma.CorporateCouponDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CorporateCouponUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CorporateCouponUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>[]
          }
          upsert: {
            args: Prisma.CorporateCouponUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateCouponPayload>
          }
          aggregate: {
            args: Prisma.CorporateCouponAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCorporateCoupon>
          }
          groupBy: {
            args: Prisma.CorporateCouponGroupByArgs<ExtArgs>
            result: $Utils.Optional<CorporateCouponGroupByOutputType>[]
          }
          count: {
            args: Prisma.CorporateCouponCountArgs<ExtArgs>
            result: $Utils.Optional<CorporateCouponCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
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
      isolationLevel?: Prisma.TransactionIsolationLevel
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
    serviceProduct?: ServiceProductOmit
    productPricingRule?: ProductPricingRuleOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    pointLedger?: PointLedgerOmit
    corporateCoupon?: CorporateCouponOmit
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
   * Count Type ServiceProductCountOutputType
   */

  export type ServiceProductCountOutputType = {
    pricingRules: number
  }

  export type ServiceProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pricingRules?: boolean | ServiceProductCountOutputTypeCountPricingRulesArgs
  }

  // Custom InputTypes
  /**
   * ServiceProductCountOutputType without action
   */
  export type ServiceProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProductCountOutputType
     */
    select?: ServiceProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceProductCountOutputType without action
   */
  export type ServiceProductCountOutputTypeCountPricingRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductPricingRuleWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ServiceProduct
   */

  export type AggregateServiceProduct = {
    _count: ServiceProductCountAggregateOutputType | null
    _avg: ServiceProductAvgAggregateOutputType | null
    _sum: ServiceProductSumAggregateOutputType | null
    _min: ServiceProductMinAggregateOutputType | null
    _max: ServiceProductMaxAggregateOutputType | null
  }

  export type ServiceProductAvgAggregateOutputType = {
    productId: number | null
  }

  export type ServiceProductSumAggregateOutputType = {
    productId: number | null
  }

  export type ServiceProductMinAggregateOutputType = {
    productId: number | null
    productCode: string | null
    productName: string | null
    productCategory: string | null
    isActive: boolean | null
  }

  export type ServiceProductMaxAggregateOutputType = {
    productId: number | null
    productCode: string | null
    productName: string | null
    productCategory: string | null
    isActive: boolean | null
  }

  export type ServiceProductCountAggregateOutputType = {
    productId: number
    productCode: number
    productName: number
    productCategory: number
    isActive: number
    _all: number
  }


  export type ServiceProductAvgAggregateInputType = {
    productId?: true
  }

  export type ServiceProductSumAggregateInputType = {
    productId?: true
  }

  export type ServiceProductMinAggregateInputType = {
    productId?: true
    productCode?: true
    productName?: true
    productCategory?: true
    isActive?: true
  }

  export type ServiceProductMaxAggregateInputType = {
    productId?: true
    productCode?: true
    productName?: true
    productCategory?: true
    isActive?: true
  }

  export type ServiceProductCountAggregateInputType = {
    productId?: true
    productCode?: true
    productName?: true
    productCategory?: true
    isActive?: true
    _all?: true
  }

  export type ServiceProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceProduct to aggregate.
     */
    where?: ServiceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceProducts to fetch.
     */
    orderBy?: ServiceProductOrderByWithRelationInput | ServiceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceProducts
    **/
    _count?: true | ServiceProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceProductMaxAggregateInputType
  }

  export type GetServiceProductAggregateType<T extends ServiceProductAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceProduct[P]>
      : GetScalarType<T[P], AggregateServiceProduct[P]>
  }




  export type ServiceProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceProductWhereInput
    orderBy?: ServiceProductOrderByWithAggregationInput | ServiceProductOrderByWithAggregationInput[]
    by: ServiceProductScalarFieldEnum[] | ServiceProductScalarFieldEnum
    having?: ServiceProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceProductCountAggregateInputType | true
    _avg?: ServiceProductAvgAggregateInputType
    _sum?: ServiceProductSumAggregateInputType
    _min?: ServiceProductMinAggregateInputType
    _max?: ServiceProductMaxAggregateInputType
  }

  export type ServiceProductGroupByOutputType = {
    productId: number
    productCode: string
    productName: string
    productCategory: string
    isActive: boolean
    _count: ServiceProductCountAggregateOutputType | null
    _avg: ServiceProductAvgAggregateOutputType | null
    _sum: ServiceProductSumAggregateOutputType | null
    _min: ServiceProductMinAggregateOutputType | null
    _max: ServiceProductMaxAggregateOutputType | null
  }

  type GetServiceProductGroupByPayload<T extends ServiceProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceProductGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceProductGroupByOutputType[P]>
        }
      >
    >


  export type ServiceProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    productCode?: boolean
    productName?: boolean
    productCategory?: boolean
    isActive?: boolean
    pricingRules?: boolean | ServiceProduct$pricingRulesArgs<ExtArgs>
    _count?: boolean | ServiceProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceProduct"]>

  export type ServiceProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    productCode?: boolean
    productName?: boolean
    productCategory?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["serviceProduct"]>

  export type ServiceProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    productCode?: boolean
    productName?: boolean
    productCategory?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["serviceProduct"]>

  export type ServiceProductSelectScalar = {
    productId?: boolean
    productCode?: boolean
    productName?: boolean
    productCategory?: boolean
    isActive?: boolean
  }

  export type ServiceProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"productId" | "productCode" | "productName" | "productCategory" | "isActive", ExtArgs["result"]["serviceProduct"]>
  export type ServiceProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pricingRules?: boolean | ServiceProduct$pricingRulesArgs<ExtArgs>
    _count?: boolean | ServiceProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServiceProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceProduct"
    objects: {
      pricingRules: Prisma.$ProductPricingRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: number
      productCode: string
      productName: string
      productCategory: string
      isActive: boolean
    }, ExtArgs["result"]["serviceProduct"]>
    composites: {}
  }

  type ServiceProductGetPayload<S extends boolean | null | undefined | ServiceProductDefaultArgs> = $Result.GetResult<Prisma.$ServiceProductPayload, S>

  type ServiceProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceProductCountAggregateInputType | true
    }

  export interface ServiceProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceProduct'], meta: { name: 'ServiceProduct' } }
    /**
     * Find zero or one ServiceProduct that matches the filter.
     * @param {ServiceProductFindUniqueArgs} args - Arguments to find a ServiceProduct
     * @example
     * // Get one ServiceProduct
     * const serviceProduct = await prisma.serviceProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceProductFindUniqueArgs>(args: SelectSubset<T, ServiceProductFindUniqueArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceProductFindUniqueOrThrowArgs} args - Arguments to find a ServiceProduct
     * @example
     * // Get one ServiceProduct
     * const serviceProduct = await prisma.serviceProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProductFindFirstArgs} args - Arguments to find a ServiceProduct
     * @example
     * // Get one ServiceProduct
     * const serviceProduct = await prisma.serviceProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceProductFindFirstArgs>(args?: SelectSubset<T, ServiceProductFindFirstArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProductFindFirstOrThrowArgs} args - Arguments to find a ServiceProduct
     * @example
     * // Get one ServiceProduct
     * const serviceProduct = await prisma.serviceProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceProducts
     * const serviceProducts = await prisma.serviceProduct.findMany()
     * 
     * // Get first 10 ServiceProducts
     * const serviceProducts = await prisma.serviceProduct.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const serviceProductWithProductIdOnly = await prisma.serviceProduct.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ServiceProductFindManyArgs>(args?: SelectSubset<T, ServiceProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceProduct.
     * @param {ServiceProductCreateArgs} args - Arguments to create a ServiceProduct.
     * @example
     * // Create one ServiceProduct
     * const ServiceProduct = await prisma.serviceProduct.create({
     *   data: {
     *     // ... data to create a ServiceProduct
     *   }
     * })
     * 
     */
    create<T extends ServiceProductCreateArgs>(args: SelectSubset<T, ServiceProductCreateArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceProducts.
     * @param {ServiceProductCreateManyArgs} args - Arguments to create many ServiceProducts.
     * @example
     * // Create many ServiceProducts
     * const serviceProduct = await prisma.serviceProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceProductCreateManyArgs>(args?: SelectSubset<T, ServiceProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceProducts and returns the data saved in the database.
     * @param {ServiceProductCreateManyAndReturnArgs} args - Arguments to create many ServiceProducts.
     * @example
     * // Create many ServiceProducts
     * const serviceProduct = await prisma.serviceProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceProducts and only return the `productId`
     * const serviceProductWithProductIdOnly = await prisma.serviceProduct.createManyAndReturn({
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceProduct.
     * @param {ServiceProductDeleteArgs} args - Arguments to delete one ServiceProduct.
     * @example
     * // Delete one ServiceProduct
     * const ServiceProduct = await prisma.serviceProduct.delete({
     *   where: {
     *     // ... filter to delete one ServiceProduct
     *   }
     * })
     * 
     */
    delete<T extends ServiceProductDeleteArgs>(args: SelectSubset<T, ServiceProductDeleteArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceProduct.
     * @param {ServiceProductUpdateArgs} args - Arguments to update one ServiceProduct.
     * @example
     * // Update one ServiceProduct
     * const serviceProduct = await prisma.serviceProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceProductUpdateArgs>(args: SelectSubset<T, ServiceProductUpdateArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceProducts.
     * @param {ServiceProductDeleteManyArgs} args - Arguments to filter ServiceProducts to delete.
     * @example
     * // Delete a few ServiceProducts
     * const { count } = await prisma.serviceProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceProductDeleteManyArgs>(args?: SelectSubset<T, ServiceProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceProducts
     * const serviceProduct = await prisma.serviceProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceProductUpdateManyArgs>(args: SelectSubset<T, ServiceProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceProducts and returns the data updated in the database.
     * @param {ServiceProductUpdateManyAndReturnArgs} args - Arguments to update many ServiceProducts.
     * @example
     * // Update many ServiceProducts
     * const serviceProduct = await prisma.serviceProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceProducts and only return the `productId`
     * const serviceProductWithProductIdOnly = await prisma.serviceProduct.updateManyAndReturn({
     *   select: { productId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceProduct.
     * @param {ServiceProductUpsertArgs} args - Arguments to update or create a ServiceProduct.
     * @example
     * // Update or create a ServiceProduct
     * const serviceProduct = await prisma.serviceProduct.upsert({
     *   create: {
     *     // ... data to create a ServiceProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceProduct we want to update
     *   }
     * })
     */
    upsert<T extends ServiceProductUpsertArgs>(args: SelectSubset<T, ServiceProductUpsertArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProductCountArgs} args - Arguments to filter ServiceProducts to count.
     * @example
     * // Count the number of ServiceProducts
     * const count = await prisma.serviceProduct.count({
     *   where: {
     *     // ... the filter for the ServiceProducts we want to count
     *   }
     * })
    **/
    count<T extends ServiceProductCountArgs>(
      args?: Subset<T, ServiceProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceProductAggregateArgs>(args: Subset<T, ServiceProductAggregateArgs>): Prisma.PrismaPromise<GetServiceProductAggregateType<T>>

    /**
     * Group by ServiceProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceProductGroupByArgs} args - Group by arguments.
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
      T extends ServiceProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceProductGroupByArgs['orderBy'] }
        : { orderBy?: ServiceProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceProduct model
   */
  readonly fields: ServiceProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pricingRules<T extends ServiceProduct$pricingRulesArgs<ExtArgs> = {}>(args?: Subset<T, ServiceProduct$pricingRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ServiceProduct model
   */
  interface ServiceProductFieldRefs {
    readonly productId: FieldRef<"ServiceProduct", 'Int'>
    readonly productCode: FieldRef<"ServiceProduct", 'String'>
    readonly productName: FieldRef<"ServiceProduct", 'String'>
    readonly productCategory: FieldRef<"ServiceProduct", 'String'>
    readonly isActive: FieldRef<"ServiceProduct", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ServiceProduct findUnique
   */
  export type ServiceProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProduct to fetch.
     */
    where: ServiceProductWhereUniqueInput
  }

  /**
   * ServiceProduct findUniqueOrThrow
   */
  export type ServiceProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProduct to fetch.
     */
    where: ServiceProductWhereUniqueInput
  }

  /**
   * ServiceProduct findFirst
   */
  export type ServiceProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProduct to fetch.
     */
    where?: ServiceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceProducts to fetch.
     */
    orderBy?: ServiceProductOrderByWithRelationInput | ServiceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceProducts.
     */
    cursor?: ServiceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceProducts.
     */
    distinct?: ServiceProductScalarFieldEnum | ServiceProductScalarFieldEnum[]
  }

  /**
   * ServiceProduct findFirstOrThrow
   */
  export type ServiceProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProduct to fetch.
     */
    where?: ServiceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceProducts to fetch.
     */
    orderBy?: ServiceProductOrderByWithRelationInput | ServiceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceProducts.
     */
    cursor?: ServiceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceProducts.
     */
    distinct?: ServiceProductScalarFieldEnum | ServiceProductScalarFieldEnum[]
  }

  /**
   * ServiceProduct findMany
   */
  export type ServiceProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * Filter, which ServiceProducts to fetch.
     */
    where?: ServiceProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceProducts to fetch.
     */
    orderBy?: ServiceProductOrderByWithRelationInput | ServiceProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceProducts.
     */
    cursor?: ServiceProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceProducts.
     */
    skip?: number
    distinct?: ServiceProductScalarFieldEnum | ServiceProductScalarFieldEnum[]
  }

  /**
   * ServiceProduct create
   */
  export type ServiceProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceProduct.
     */
    data: XOR<ServiceProductCreateInput, ServiceProductUncheckedCreateInput>
  }

  /**
   * ServiceProduct createMany
   */
  export type ServiceProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceProducts.
     */
    data: ServiceProductCreateManyInput | ServiceProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceProduct createManyAndReturn
   */
  export type ServiceProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceProducts.
     */
    data: ServiceProductCreateManyInput | ServiceProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceProduct update
   */
  export type ServiceProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceProduct.
     */
    data: XOR<ServiceProductUpdateInput, ServiceProductUncheckedUpdateInput>
    /**
     * Choose, which ServiceProduct to update.
     */
    where: ServiceProductWhereUniqueInput
  }

  /**
   * ServiceProduct updateMany
   */
  export type ServiceProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceProducts.
     */
    data: XOR<ServiceProductUpdateManyMutationInput, ServiceProductUncheckedUpdateManyInput>
    /**
     * Filter which ServiceProducts to update
     */
    where?: ServiceProductWhereInput
    /**
     * Limit how many ServiceProducts to update.
     */
    limit?: number
  }

  /**
   * ServiceProduct updateManyAndReturn
   */
  export type ServiceProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * The data used to update ServiceProducts.
     */
    data: XOR<ServiceProductUpdateManyMutationInput, ServiceProductUncheckedUpdateManyInput>
    /**
     * Filter which ServiceProducts to update
     */
    where?: ServiceProductWhereInput
    /**
     * Limit how many ServiceProducts to update.
     */
    limit?: number
  }

  /**
   * ServiceProduct upsert
   */
  export type ServiceProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceProduct to update in case it exists.
     */
    where: ServiceProductWhereUniqueInput
    /**
     * In case the ServiceProduct found by the `where` argument doesn't exist, create a new ServiceProduct with this data.
     */
    create: XOR<ServiceProductCreateInput, ServiceProductUncheckedCreateInput>
    /**
     * In case the ServiceProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceProductUpdateInput, ServiceProductUncheckedUpdateInput>
  }

  /**
   * ServiceProduct delete
   */
  export type ServiceProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
    /**
     * Filter which ServiceProduct to delete.
     */
    where: ServiceProductWhereUniqueInput
  }

  /**
   * ServiceProduct deleteMany
   */
  export type ServiceProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceProducts to delete
     */
    where?: ServiceProductWhereInput
    /**
     * Limit how many ServiceProducts to delete.
     */
    limit?: number
  }

  /**
   * ServiceProduct.pricingRules
   */
  export type ServiceProduct$pricingRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    where?: ProductPricingRuleWhereInput
    orderBy?: ProductPricingRuleOrderByWithRelationInput | ProductPricingRuleOrderByWithRelationInput[]
    cursor?: ProductPricingRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductPricingRuleScalarFieldEnum | ProductPricingRuleScalarFieldEnum[]
  }

  /**
   * ServiceProduct without action
   */
  export type ServiceProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceProduct
     */
    select?: ServiceProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceProduct
     */
    omit?: ServiceProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductPricingRule
   */

  export type AggregateProductPricingRule = {
    _count: ProductPricingRuleCountAggregateOutputType | null
    _avg: ProductPricingRuleAvgAggregateOutputType | null
    _sum: ProductPricingRuleSumAggregateOutputType | null
    _min: ProductPricingRuleMinAggregateOutputType | null
    _max: ProductPricingRuleMaxAggregateOutputType | null
  }

  export type ProductPricingRuleAvgAggregateOutputType = {
    ruleId: number | null
    productId: number | null
    originalPrice: Decimal | null
    salePrice: Decimal | null
  }

  export type ProductPricingRuleSumAggregateOutputType = {
    ruleId: bigint | null
    productId: number | null
    originalPrice: Decimal | null
    salePrice: Decimal | null
  }

  export type ProductPricingRuleMinAggregateOutputType = {
    ruleId: bigint | null
    productId: number | null
    originalPrice: Decimal | null
    salePrice: Decimal | null
    validFrom: Date | null
    validUntil: Date | null
  }

  export type ProductPricingRuleMaxAggregateOutputType = {
    ruleId: bigint | null
    productId: number | null
    originalPrice: Decimal | null
    salePrice: Decimal | null
    validFrom: Date | null
    validUntil: Date | null
  }

  export type ProductPricingRuleCountAggregateOutputType = {
    ruleId: number
    productId: number
    originalPrice: number
    salePrice: number
    validFrom: number
    validUntil: number
    _all: number
  }


  export type ProductPricingRuleAvgAggregateInputType = {
    ruleId?: true
    productId?: true
    originalPrice?: true
    salePrice?: true
  }

  export type ProductPricingRuleSumAggregateInputType = {
    ruleId?: true
    productId?: true
    originalPrice?: true
    salePrice?: true
  }

  export type ProductPricingRuleMinAggregateInputType = {
    ruleId?: true
    productId?: true
    originalPrice?: true
    salePrice?: true
    validFrom?: true
    validUntil?: true
  }

  export type ProductPricingRuleMaxAggregateInputType = {
    ruleId?: true
    productId?: true
    originalPrice?: true
    salePrice?: true
    validFrom?: true
    validUntil?: true
  }

  export type ProductPricingRuleCountAggregateInputType = {
    ruleId?: true
    productId?: true
    originalPrice?: true
    salePrice?: true
    validFrom?: true
    validUntil?: true
    _all?: true
  }

  export type ProductPricingRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductPricingRule to aggregate.
     */
    where?: ProductPricingRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPricingRules to fetch.
     */
    orderBy?: ProductPricingRuleOrderByWithRelationInput | ProductPricingRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductPricingRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPricingRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPricingRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductPricingRules
    **/
    _count?: true | ProductPricingRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductPricingRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductPricingRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductPricingRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductPricingRuleMaxAggregateInputType
  }

  export type GetProductPricingRuleAggregateType<T extends ProductPricingRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateProductPricingRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductPricingRule[P]>
      : GetScalarType<T[P], AggregateProductPricingRule[P]>
  }




  export type ProductPricingRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductPricingRuleWhereInput
    orderBy?: ProductPricingRuleOrderByWithAggregationInput | ProductPricingRuleOrderByWithAggregationInput[]
    by: ProductPricingRuleScalarFieldEnum[] | ProductPricingRuleScalarFieldEnum
    having?: ProductPricingRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductPricingRuleCountAggregateInputType | true
    _avg?: ProductPricingRuleAvgAggregateInputType
    _sum?: ProductPricingRuleSumAggregateInputType
    _min?: ProductPricingRuleMinAggregateInputType
    _max?: ProductPricingRuleMaxAggregateInputType
  }

  export type ProductPricingRuleGroupByOutputType = {
    ruleId: bigint
    productId: number
    originalPrice: Decimal
    salePrice: Decimal
    validFrom: Date
    validUntil: Date | null
    _count: ProductPricingRuleCountAggregateOutputType | null
    _avg: ProductPricingRuleAvgAggregateOutputType | null
    _sum: ProductPricingRuleSumAggregateOutputType | null
    _min: ProductPricingRuleMinAggregateOutputType | null
    _max: ProductPricingRuleMaxAggregateOutputType | null
  }

  type GetProductPricingRuleGroupByPayload<T extends ProductPricingRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductPricingRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductPricingRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductPricingRuleGroupByOutputType[P]>
            : GetScalarType<T[P], ProductPricingRuleGroupByOutputType[P]>
        }
      >
    >


  export type ProductPricingRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ruleId?: boolean
    productId?: boolean
    originalPrice?: boolean
    salePrice?: boolean
    validFrom?: boolean
    validUntil?: boolean
    product?: boolean | ServiceProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productPricingRule"]>

  export type ProductPricingRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ruleId?: boolean
    productId?: boolean
    originalPrice?: boolean
    salePrice?: boolean
    validFrom?: boolean
    validUntil?: boolean
    product?: boolean | ServiceProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productPricingRule"]>

  export type ProductPricingRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ruleId?: boolean
    productId?: boolean
    originalPrice?: boolean
    salePrice?: boolean
    validFrom?: boolean
    validUntil?: boolean
    product?: boolean | ServiceProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productPricingRule"]>

  export type ProductPricingRuleSelectScalar = {
    ruleId?: boolean
    productId?: boolean
    originalPrice?: boolean
    salePrice?: boolean
    validFrom?: boolean
    validUntil?: boolean
  }

  export type ProductPricingRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ruleId" | "productId" | "originalPrice" | "salePrice" | "validFrom" | "validUntil", ExtArgs["result"]["productPricingRule"]>
  export type ProductPricingRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ServiceProductDefaultArgs<ExtArgs>
  }
  export type ProductPricingRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ServiceProductDefaultArgs<ExtArgs>
  }
  export type ProductPricingRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ServiceProductDefaultArgs<ExtArgs>
  }

  export type $ProductPricingRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductPricingRule"
    objects: {
      product: Prisma.$ServiceProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ruleId: bigint
      productId: number
      originalPrice: Prisma.Decimal
      salePrice: Prisma.Decimal
      validFrom: Date
      validUntil: Date | null
    }, ExtArgs["result"]["productPricingRule"]>
    composites: {}
  }

  type ProductPricingRuleGetPayload<S extends boolean | null | undefined | ProductPricingRuleDefaultArgs> = $Result.GetResult<Prisma.$ProductPricingRulePayload, S>

  type ProductPricingRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductPricingRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductPricingRuleCountAggregateInputType | true
    }

  export interface ProductPricingRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductPricingRule'], meta: { name: 'ProductPricingRule' } }
    /**
     * Find zero or one ProductPricingRule that matches the filter.
     * @param {ProductPricingRuleFindUniqueArgs} args - Arguments to find a ProductPricingRule
     * @example
     * // Get one ProductPricingRule
     * const productPricingRule = await prisma.productPricingRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductPricingRuleFindUniqueArgs>(args: SelectSubset<T, ProductPricingRuleFindUniqueArgs<ExtArgs>>): Prisma__ProductPricingRuleClient<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductPricingRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductPricingRuleFindUniqueOrThrowArgs} args - Arguments to find a ProductPricingRule
     * @example
     * // Get one ProductPricingRule
     * const productPricingRule = await prisma.productPricingRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductPricingRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductPricingRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductPricingRuleClient<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductPricingRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPricingRuleFindFirstArgs} args - Arguments to find a ProductPricingRule
     * @example
     * // Get one ProductPricingRule
     * const productPricingRule = await prisma.productPricingRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductPricingRuleFindFirstArgs>(args?: SelectSubset<T, ProductPricingRuleFindFirstArgs<ExtArgs>>): Prisma__ProductPricingRuleClient<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductPricingRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPricingRuleFindFirstOrThrowArgs} args - Arguments to find a ProductPricingRule
     * @example
     * // Get one ProductPricingRule
     * const productPricingRule = await prisma.productPricingRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductPricingRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductPricingRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductPricingRuleClient<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductPricingRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPricingRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductPricingRules
     * const productPricingRules = await prisma.productPricingRule.findMany()
     * 
     * // Get first 10 ProductPricingRules
     * const productPricingRules = await prisma.productPricingRule.findMany({ take: 10 })
     * 
     * // Only select the `ruleId`
     * const productPricingRuleWithRuleIdOnly = await prisma.productPricingRule.findMany({ select: { ruleId: true } })
     * 
     */
    findMany<T extends ProductPricingRuleFindManyArgs>(args?: SelectSubset<T, ProductPricingRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductPricingRule.
     * @param {ProductPricingRuleCreateArgs} args - Arguments to create a ProductPricingRule.
     * @example
     * // Create one ProductPricingRule
     * const ProductPricingRule = await prisma.productPricingRule.create({
     *   data: {
     *     // ... data to create a ProductPricingRule
     *   }
     * })
     * 
     */
    create<T extends ProductPricingRuleCreateArgs>(args: SelectSubset<T, ProductPricingRuleCreateArgs<ExtArgs>>): Prisma__ProductPricingRuleClient<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductPricingRules.
     * @param {ProductPricingRuleCreateManyArgs} args - Arguments to create many ProductPricingRules.
     * @example
     * // Create many ProductPricingRules
     * const productPricingRule = await prisma.productPricingRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductPricingRuleCreateManyArgs>(args?: SelectSubset<T, ProductPricingRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductPricingRules and returns the data saved in the database.
     * @param {ProductPricingRuleCreateManyAndReturnArgs} args - Arguments to create many ProductPricingRules.
     * @example
     * // Create many ProductPricingRules
     * const productPricingRule = await prisma.productPricingRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductPricingRules and only return the `ruleId`
     * const productPricingRuleWithRuleIdOnly = await prisma.productPricingRule.createManyAndReturn({
     *   select: { ruleId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductPricingRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductPricingRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductPricingRule.
     * @param {ProductPricingRuleDeleteArgs} args - Arguments to delete one ProductPricingRule.
     * @example
     * // Delete one ProductPricingRule
     * const ProductPricingRule = await prisma.productPricingRule.delete({
     *   where: {
     *     // ... filter to delete one ProductPricingRule
     *   }
     * })
     * 
     */
    delete<T extends ProductPricingRuleDeleteArgs>(args: SelectSubset<T, ProductPricingRuleDeleteArgs<ExtArgs>>): Prisma__ProductPricingRuleClient<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductPricingRule.
     * @param {ProductPricingRuleUpdateArgs} args - Arguments to update one ProductPricingRule.
     * @example
     * // Update one ProductPricingRule
     * const productPricingRule = await prisma.productPricingRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductPricingRuleUpdateArgs>(args: SelectSubset<T, ProductPricingRuleUpdateArgs<ExtArgs>>): Prisma__ProductPricingRuleClient<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductPricingRules.
     * @param {ProductPricingRuleDeleteManyArgs} args - Arguments to filter ProductPricingRules to delete.
     * @example
     * // Delete a few ProductPricingRules
     * const { count } = await prisma.productPricingRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductPricingRuleDeleteManyArgs>(args?: SelectSubset<T, ProductPricingRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductPricingRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPricingRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductPricingRules
     * const productPricingRule = await prisma.productPricingRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductPricingRuleUpdateManyArgs>(args: SelectSubset<T, ProductPricingRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductPricingRules and returns the data updated in the database.
     * @param {ProductPricingRuleUpdateManyAndReturnArgs} args - Arguments to update many ProductPricingRules.
     * @example
     * // Update many ProductPricingRules
     * const productPricingRule = await prisma.productPricingRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductPricingRules and only return the `ruleId`
     * const productPricingRuleWithRuleIdOnly = await prisma.productPricingRule.updateManyAndReturn({
     *   select: { ruleId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductPricingRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductPricingRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductPricingRule.
     * @param {ProductPricingRuleUpsertArgs} args - Arguments to update or create a ProductPricingRule.
     * @example
     * // Update or create a ProductPricingRule
     * const productPricingRule = await prisma.productPricingRule.upsert({
     *   create: {
     *     // ... data to create a ProductPricingRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductPricingRule we want to update
     *   }
     * })
     */
    upsert<T extends ProductPricingRuleUpsertArgs>(args: SelectSubset<T, ProductPricingRuleUpsertArgs<ExtArgs>>): Prisma__ProductPricingRuleClient<$Result.GetResult<Prisma.$ProductPricingRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductPricingRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPricingRuleCountArgs} args - Arguments to filter ProductPricingRules to count.
     * @example
     * // Count the number of ProductPricingRules
     * const count = await prisma.productPricingRule.count({
     *   where: {
     *     // ... the filter for the ProductPricingRules we want to count
     *   }
     * })
    **/
    count<T extends ProductPricingRuleCountArgs>(
      args?: Subset<T, ProductPricingRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductPricingRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductPricingRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPricingRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductPricingRuleAggregateArgs>(args: Subset<T, ProductPricingRuleAggregateArgs>): Prisma.PrismaPromise<GetProductPricingRuleAggregateType<T>>

    /**
     * Group by ProductPricingRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPricingRuleGroupByArgs} args - Group by arguments.
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
      T extends ProductPricingRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductPricingRuleGroupByArgs['orderBy'] }
        : { orderBy?: ProductPricingRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductPricingRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductPricingRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductPricingRule model
   */
  readonly fields: ProductPricingRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductPricingRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductPricingRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ServiceProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceProductDefaultArgs<ExtArgs>>): Prisma__ServiceProductClient<$Result.GetResult<Prisma.$ServiceProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProductPricingRule model
   */
  interface ProductPricingRuleFieldRefs {
    readonly ruleId: FieldRef<"ProductPricingRule", 'BigInt'>
    readonly productId: FieldRef<"ProductPricingRule", 'Int'>
    readonly originalPrice: FieldRef<"ProductPricingRule", 'Decimal'>
    readonly salePrice: FieldRef<"ProductPricingRule", 'Decimal'>
    readonly validFrom: FieldRef<"ProductPricingRule", 'DateTime'>
    readonly validUntil: FieldRef<"ProductPricingRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductPricingRule findUnique
   */
  export type ProductPricingRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * Filter, which ProductPricingRule to fetch.
     */
    where: ProductPricingRuleWhereUniqueInput
  }

  /**
   * ProductPricingRule findUniqueOrThrow
   */
  export type ProductPricingRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * Filter, which ProductPricingRule to fetch.
     */
    where: ProductPricingRuleWhereUniqueInput
  }

  /**
   * ProductPricingRule findFirst
   */
  export type ProductPricingRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * Filter, which ProductPricingRule to fetch.
     */
    where?: ProductPricingRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPricingRules to fetch.
     */
    orderBy?: ProductPricingRuleOrderByWithRelationInput | ProductPricingRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductPricingRules.
     */
    cursor?: ProductPricingRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPricingRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPricingRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductPricingRules.
     */
    distinct?: ProductPricingRuleScalarFieldEnum | ProductPricingRuleScalarFieldEnum[]
  }

  /**
   * ProductPricingRule findFirstOrThrow
   */
  export type ProductPricingRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * Filter, which ProductPricingRule to fetch.
     */
    where?: ProductPricingRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPricingRules to fetch.
     */
    orderBy?: ProductPricingRuleOrderByWithRelationInput | ProductPricingRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductPricingRules.
     */
    cursor?: ProductPricingRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPricingRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPricingRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductPricingRules.
     */
    distinct?: ProductPricingRuleScalarFieldEnum | ProductPricingRuleScalarFieldEnum[]
  }

  /**
   * ProductPricingRule findMany
   */
  export type ProductPricingRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * Filter, which ProductPricingRules to fetch.
     */
    where?: ProductPricingRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPricingRules to fetch.
     */
    orderBy?: ProductPricingRuleOrderByWithRelationInput | ProductPricingRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductPricingRules.
     */
    cursor?: ProductPricingRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPricingRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPricingRules.
     */
    skip?: number
    distinct?: ProductPricingRuleScalarFieldEnum | ProductPricingRuleScalarFieldEnum[]
  }

  /**
   * ProductPricingRule create
   */
  export type ProductPricingRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductPricingRule.
     */
    data: XOR<ProductPricingRuleCreateInput, ProductPricingRuleUncheckedCreateInput>
  }

  /**
   * ProductPricingRule createMany
   */
  export type ProductPricingRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductPricingRules.
     */
    data: ProductPricingRuleCreateManyInput | ProductPricingRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductPricingRule createManyAndReturn
   */
  export type ProductPricingRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * The data used to create many ProductPricingRules.
     */
    data: ProductPricingRuleCreateManyInput | ProductPricingRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductPricingRule update
   */
  export type ProductPricingRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductPricingRule.
     */
    data: XOR<ProductPricingRuleUpdateInput, ProductPricingRuleUncheckedUpdateInput>
    /**
     * Choose, which ProductPricingRule to update.
     */
    where: ProductPricingRuleWhereUniqueInput
  }

  /**
   * ProductPricingRule updateMany
   */
  export type ProductPricingRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductPricingRules.
     */
    data: XOR<ProductPricingRuleUpdateManyMutationInput, ProductPricingRuleUncheckedUpdateManyInput>
    /**
     * Filter which ProductPricingRules to update
     */
    where?: ProductPricingRuleWhereInput
    /**
     * Limit how many ProductPricingRules to update.
     */
    limit?: number
  }

  /**
   * ProductPricingRule updateManyAndReturn
   */
  export type ProductPricingRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * The data used to update ProductPricingRules.
     */
    data: XOR<ProductPricingRuleUpdateManyMutationInput, ProductPricingRuleUncheckedUpdateManyInput>
    /**
     * Filter which ProductPricingRules to update
     */
    where?: ProductPricingRuleWhereInput
    /**
     * Limit how many ProductPricingRules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductPricingRule upsert
   */
  export type ProductPricingRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductPricingRule to update in case it exists.
     */
    where: ProductPricingRuleWhereUniqueInput
    /**
     * In case the ProductPricingRule found by the `where` argument doesn't exist, create a new ProductPricingRule with this data.
     */
    create: XOR<ProductPricingRuleCreateInput, ProductPricingRuleUncheckedCreateInput>
    /**
     * In case the ProductPricingRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductPricingRuleUpdateInput, ProductPricingRuleUncheckedUpdateInput>
  }

  /**
   * ProductPricingRule delete
   */
  export type ProductPricingRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
    /**
     * Filter which ProductPricingRule to delete.
     */
    where: ProductPricingRuleWhereUniqueInput
  }

  /**
   * ProductPricingRule deleteMany
   */
  export type ProductPricingRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductPricingRules to delete
     */
    where?: ProductPricingRuleWhereInput
    /**
     * Limit how many ProductPricingRules to delete.
     */
    limit?: number
  }

  /**
   * ProductPricingRule without action
   */
  export type ProductPricingRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPricingRule
     */
    select?: ProductPricingRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPricingRule
     */
    omit?: ProductPricingRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPricingRuleInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    orderId: number | null
    corporateId: number | null
    totalSaleAmount: Decimal | null
  }

  export type OrderSumAggregateOutputType = {
    orderId: bigint | null
    corporateId: bigint | null
    totalSaleAmount: Decimal | null
  }

  export type OrderMinAggregateOutputType = {
    orderId: bigint | null
    corporateId: bigint | null
    totalSaleAmount: Decimal | null
    status: string | null
    createdAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    orderId: bigint | null
    corporateId: bigint | null
    totalSaleAmount: Decimal | null
    status: string | null
    createdAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    orderId: number
    corporateId: number
    totalSaleAmount: number
    status: number
    createdAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    orderId?: true
    corporateId?: true
    totalSaleAmount?: true
  }

  export type OrderSumAggregateInputType = {
    orderId?: true
    corporateId?: true
    totalSaleAmount?: true
  }

  export type OrderMinAggregateInputType = {
    orderId?: true
    corporateId?: true
    totalSaleAmount?: true
    status?: true
    createdAt?: true
  }

  export type OrderMaxAggregateInputType = {
    orderId?: true
    corporateId?: true
    totalSaleAmount?: true
    status?: true
    createdAt?: true
  }

  export type OrderCountAggregateInputType = {
    orderId?: true
    corporateId?: true
    totalSaleAmount?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    orderId: bigint
    corporateId: bigint
    totalSaleAmount: Decimal
    status: string
    createdAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    orderId?: boolean
    corporateId?: boolean
    totalSaleAmount?: boolean
    status?: boolean
    createdAt?: boolean
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    orderId?: boolean
    corporateId?: boolean
    totalSaleAmount?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    orderId?: boolean
    corporateId?: boolean
    totalSaleAmount?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    orderId?: boolean
    corporateId?: boolean
    totalSaleAmount?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"orderId" | "corporateId" | "totalSaleAmount" | "status" | "createdAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      orderId: bigint
      corporateId: bigint
      totalSaleAmount: Prisma.Decimal
      status: string
      createdAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `orderId`
     * const orderWithOrderIdOnly = await prisma.order.findMany({ select: { orderId: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `orderId`
     * const orderWithOrderIdOnly = await prisma.order.createManyAndReturn({
     *   select: { orderId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `orderId`
     * const orderWithOrderIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { orderId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly orderId: FieldRef<"Order", 'BigInt'>
    readonly corporateId: FieldRef<"Order", 'BigInt'>
    readonly totalSaleAmount: FieldRef<"Order", 'Decimal'>
    readonly status: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    itemId: number | null
    orderId: number | null
    productId: number | null
    snapSalePrice: Decimal | null
  }

  export type OrderItemSumAggregateOutputType = {
    itemId: bigint | null
    orderId: bigint | null
    productId: number | null
    snapSalePrice: Decimal | null
  }

  export type OrderItemMinAggregateOutputType = {
    itemId: bigint | null
    orderId: bigint | null
    productId: number | null
    snapProductName: string | null
    snapSalePrice: Decimal | null
  }

  export type OrderItemMaxAggregateOutputType = {
    itemId: bigint | null
    orderId: bigint | null
    productId: number | null
    snapProductName: string | null
    snapSalePrice: Decimal | null
  }

  export type OrderItemCountAggregateOutputType = {
    itemId: number
    orderId: number
    productId: number
    snapProductName: number
    snapSalePrice: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    itemId?: true
    orderId?: true
    productId?: true
    snapSalePrice?: true
  }

  export type OrderItemSumAggregateInputType = {
    itemId?: true
    orderId?: true
    productId?: true
    snapSalePrice?: true
  }

  export type OrderItemMinAggregateInputType = {
    itemId?: true
    orderId?: true
    productId?: true
    snapProductName?: true
    snapSalePrice?: true
  }

  export type OrderItemMaxAggregateInputType = {
    itemId?: true
    orderId?: true
    productId?: true
    snapProductName?: true
    snapSalePrice?: true
  }

  export type OrderItemCountAggregateInputType = {
    itemId?: true
    orderId?: true
    productId?: true
    snapProductName?: true
    snapSalePrice?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    itemId: bigint
    orderId: bigint
    productId: number
    snapProductName: string
    snapSalePrice: Decimal
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    itemId?: boolean
    orderId?: boolean
    productId?: boolean
    snapProductName?: boolean
    snapSalePrice?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    itemId?: boolean
    orderId?: boolean
    productId?: boolean
    snapProductName?: boolean
    snapSalePrice?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    itemId?: boolean
    orderId?: boolean
    productId?: boolean
    snapProductName?: boolean
    snapSalePrice?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    itemId?: boolean
    orderId?: boolean
    productId?: boolean
    snapProductName?: boolean
    snapSalePrice?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"itemId" | "orderId" | "productId" | "snapProductName" | "snapSalePrice", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      itemId: bigint
      orderId: bigint
      productId: number
      snapProductName: string
      snapSalePrice: Prisma.Decimal
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `itemId`
     * const orderItemWithItemIdOnly = await prisma.orderItem.findMany({ select: { itemId: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `itemId`
     * const orderItemWithItemIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { itemId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `itemId`
     * const orderItemWithItemIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { itemId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
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
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly itemId: FieldRef<"OrderItem", 'BigInt'>
    readonly orderId: FieldRef<"OrderItem", 'BigInt'>
    readonly productId: FieldRef<"OrderItem", 'Int'>
    readonly snapProductName: FieldRef<"OrderItem", 'String'>
    readonly snapSalePrice: FieldRef<"OrderItem", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model PointLedger
   */

  export type AggregatePointLedger = {
    _count: PointLedgerCountAggregateOutputType | null
    _avg: PointLedgerAvgAggregateOutputType | null
    _sum: PointLedgerSumAggregateOutputType | null
    _min: PointLedgerMinAggregateOutputType | null
    _max: PointLedgerMaxAggregateOutputType | null
  }

  export type PointLedgerAvgAggregateOutputType = {
    ledgerId: number | null
    corporateId: number | null
    amount: number | null
    balanceSnapshot: number | null
  }

  export type PointLedgerSumAggregateOutputType = {
    ledgerId: bigint | null
    corporateId: bigint | null
    amount: number | null
    balanceSnapshot: number | null
  }

  export type PointLedgerMinAggregateOutputType = {
    ledgerId: bigint | null
    corporateId: bigint | null
    amount: number | null
    balanceSnapshot: number | null
    createdAt: Date | null
  }

  export type PointLedgerMaxAggregateOutputType = {
    ledgerId: bigint | null
    corporateId: bigint | null
    amount: number | null
    balanceSnapshot: number | null
    createdAt: Date | null
  }

  export type PointLedgerCountAggregateOutputType = {
    ledgerId: number
    corporateId: number
    amount: number
    balanceSnapshot: number
    createdAt: number
    _all: number
  }


  export type PointLedgerAvgAggregateInputType = {
    ledgerId?: true
    corporateId?: true
    amount?: true
    balanceSnapshot?: true
  }

  export type PointLedgerSumAggregateInputType = {
    ledgerId?: true
    corporateId?: true
    amount?: true
    balanceSnapshot?: true
  }

  export type PointLedgerMinAggregateInputType = {
    ledgerId?: true
    corporateId?: true
    amount?: true
    balanceSnapshot?: true
    createdAt?: true
  }

  export type PointLedgerMaxAggregateInputType = {
    ledgerId?: true
    corporateId?: true
    amount?: true
    balanceSnapshot?: true
    createdAt?: true
  }

  export type PointLedgerCountAggregateInputType = {
    ledgerId?: true
    corporateId?: true
    amount?: true
    balanceSnapshot?: true
    createdAt?: true
    _all?: true
  }

  export type PointLedgerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointLedger to aggregate.
     */
    where?: PointLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointLedgers to fetch.
     */
    orderBy?: PointLedgerOrderByWithRelationInput | PointLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PointLedgers
    **/
    _count?: true | PointLedgerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointLedgerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointLedgerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointLedgerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointLedgerMaxAggregateInputType
  }

  export type GetPointLedgerAggregateType<T extends PointLedgerAggregateArgs> = {
        [P in keyof T & keyof AggregatePointLedger]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointLedger[P]>
      : GetScalarType<T[P], AggregatePointLedger[P]>
  }




  export type PointLedgerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointLedgerWhereInput
    orderBy?: PointLedgerOrderByWithAggregationInput | PointLedgerOrderByWithAggregationInput[]
    by: PointLedgerScalarFieldEnum[] | PointLedgerScalarFieldEnum
    having?: PointLedgerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointLedgerCountAggregateInputType | true
    _avg?: PointLedgerAvgAggregateInputType
    _sum?: PointLedgerSumAggregateInputType
    _min?: PointLedgerMinAggregateInputType
    _max?: PointLedgerMaxAggregateInputType
  }

  export type PointLedgerGroupByOutputType = {
    ledgerId: bigint
    corporateId: bigint
    amount: number
    balanceSnapshot: number
    createdAt: Date
    _count: PointLedgerCountAggregateOutputType | null
    _avg: PointLedgerAvgAggregateOutputType | null
    _sum: PointLedgerSumAggregateOutputType | null
    _min: PointLedgerMinAggregateOutputType | null
    _max: PointLedgerMaxAggregateOutputType | null
  }

  type GetPointLedgerGroupByPayload<T extends PointLedgerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointLedgerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointLedgerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointLedgerGroupByOutputType[P]>
            : GetScalarType<T[P], PointLedgerGroupByOutputType[P]>
        }
      >
    >


  export type PointLedgerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ledgerId?: boolean
    corporateId?: boolean
    amount?: boolean
    balanceSnapshot?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pointLedger"]>

  export type PointLedgerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ledgerId?: boolean
    corporateId?: boolean
    amount?: boolean
    balanceSnapshot?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pointLedger"]>

  export type PointLedgerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ledgerId?: boolean
    corporateId?: boolean
    amount?: boolean
    balanceSnapshot?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pointLedger"]>

  export type PointLedgerSelectScalar = {
    ledgerId?: boolean
    corporateId?: boolean
    amount?: boolean
    balanceSnapshot?: boolean
    createdAt?: boolean
  }

  export type PointLedgerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ledgerId" | "corporateId" | "amount" | "balanceSnapshot" | "createdAt", ExtArgs["result"]["pointLedger"]>

  export type $PointLedgerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PointLedger"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      ledgerId: bigint
      corporateId: bigint
      amount: number
      balanceSnapshot: number
      createdAt: Date
    }, ExtArgs["result"]["pointLedger"]>
    composites: {}
  }

  type PointLedgerGetPayload<S extends boolean | null | undefined | PointLedgerDefaultArgs> = $Result.GetResult<Prisma.$PointLedgerPayload, S>

  type PointLedgerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PointLedgerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PointLedgerCountAggregateInputType | true
    }

  export interface PointLedgerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PointLedger'], meta: { name: 'PointLedger' } }
    /**
     * Find zero or one PointLedger that matches the filter.
     * @param {PointLedgerFindUniqueArgs} args - Arguments to find a PointLedger
     * @example
     * // Get one PointLedger
     * const pointLedger = await prisma.pointLedger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointLedgerFindUniqueArgs>(args: SelectSubset<T, PointLedgerFindUniqueArgs<ExtArgs>>): Prisma__PointLedgerClient<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PointLedger that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PointLedgerFindUniqueOrThrowArgs} args - Arguments to find a PointLedger
     * @example
     * // Get one PointLedger
     * const pointLedger = await prisma.pointLedger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointLedgerFindUniqueOrThrowArgs>(args: SelectSubset<T, PointLedgerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointLedgerClient<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PointLedger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointLedgerFindFirstArgs} args - Arguments to find a PointLedger
     * @example
     * // Get one PointLedger
     * const pointLedger = await prisma.pointLedger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointLedgerFindFirstArgs>(args?: SelectSubset<T, PointLedgerFindFirstArgs<ExtArgs>>): Prisma__PointLedgerClient<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PointLedger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointLedgerFindFirstOrThrowArgs} args - Arguments to find a PointLedger
     * @example
     * // Get one PointLedger
     * const pointLedger = await prisma.pointLedger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointLedgerFindFirstOrThrowArgs>(args?: SelectSubset<T, PointLedgerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointLedgerClient<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PointLedgers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointLedgerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointLedgers
     * const pointLedgers = await prisma.pointLedger.findMany()
     * 
     * // Get first 10 PointLedgers
     * const pointLedgers = await prisma.pointLedger.findMany({ take: 10 })
     * 
     * // Only select the `ledgerId`
     * const pointLedgerWithLedgerIdOnly = await prisma.pointLedger.findMany({ select: { ledgerId: true } })
     * 
     */
    findMany<T extends PointLedgerFindManyArgs>(args?: SelectSubset<T, PointLedgerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PointLedger.
     * @param {PointLedgerCreateArgs} args - Arguments to create a PointLedger.
     * @example
     * // Create one PointLedger
     * const PointLedger = await prisma.pointLedger.create({
     *   data: {
     *     // ... data to create a PointLedger
     *   }
     * })
     * 
     */
    create<T extends PointLedgerCreateArgs>(args: SelectSubset<T, PointLedgerCreateArgs<ExtArgs>>): Prisma__PointLedgerClient<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PointLedgers.
     * @param {PointLedgerCreateManyArgs} args - Arguments to create many PointLedgers.
     * @example
     * // Create many PointLedgers
     * const pointLedger = await prisma.pointLedger.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointLedgerCreateManyArgs>(args?: SelectSubset<T, PointLedgerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PointLedgers and returns the data saved in the database.
     * @param {PointLedgerCreateManyAndReturnArgs} args - Arguments to create many PointLedgers.
     * @example
     * // Create many PointLedgers
     * const pointLedger = await prisma.pointLedger.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PointLedgers and only return the `ledgerId`
     * const pointLedgerWithLedgerIdOnly = await prisma.pointLedger.createManyAndReturn({
     *   select: { ledgerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointLedgerCreateManyAndReturnArgs>(args?: SelectSubset<T, PointLedgerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PointLedger.
     * @param {PointLedgerDeleteArgs} args - Arguments to delete one PointLedger.
     * @example
     * // Delete one PointLedger
     * const PointLedger = await prisma.pointLedger.delete({
     *   where: {
     *     // ... filter to delete one PointLedger
     *   }
     * })
     * 
     */
    delete<T extends PointLedgerDeleteArgs>(args: SelectSubset<T, PointLedgerDeleteArgs<ExtArgs>>): Prisma__PointLedgerClient<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PointLedger.
     * @param {PointLedgerUpdateArgs} args - Arguments to update one PointLedger.
     * @example
     * // Update one PointLedger
     * const pointLedger = await prisma.pointLedger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointLedgerUpdateArgs>(args: SelectSubset<T, PointLedgerUpdateArgs<ExtArgs>>): Prisma__PointLedgerClient<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PointLedgers.
     * @param {PointLedgerDeleteManyArgs} args - Arguments to filter PointLedgers to delete.
     * @example
     * // Delete a few PointLedgers
     * const { count } = await prisma.pointLedger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointLedgerDeleteManyArgs>(args?: SelectSubset<T, PointLedgerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointLedgerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointLedgers
     * const pointLedger = await prisma.pointLedger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointLedgerUpdateManyArgs>(args: SelectSubset<T, PointLedgerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointLedgers and returns the data updated in the database.
     * @param {PointLedgerUpdateManyAndReturnArgs} args - Arguments to update many PointLedgers.
     * @example
     * // Update many PointLedgers
     * const pointLedger = await prisma.pointLedger.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PointLedgers and only return the `ledgerId`
     * const pointLedgerWithLedgerIdOnly = await prisma.pointLedger.updateManyAndReturn({
     *   select: { ledgerId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PointLedgerUpdateManyAndReturnArgs>(args: SelectSubset<T, PointLedgerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PointLedger.
     * @param {PointLedgerUpsertArgs} args - Arguments to update or create a PointLedger.
     * @example
     * // Update or create a PointLedger
     * const pointLedger = await prisma.pointLedger.upsert({
     *   create: {
     *     // ... data to create a PointLedger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointLedger we want to update
     *   }
     * })
     */
    upsert<T extends PointLedgerUpsertArgs>(args: SelectSubset<T, PointLedgerUpsertArgs<ExtArgs>>): Prisma__PointLedgerClient<$Result.GetResult<Prisma.$PointLedgerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PointLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointLedgerCountArgs} args - Arguments to filter PointLedgers to count.
     * @example
     * // Count the number of PointLedgers
     * const count = await prisma.pointLedger.count({
     *   where: {
     *     // ... the filter for the PointLedgers we want to count
     *   }
     * })
    **/
    count<T extends PointLedgerCountArgs>(
      args?: Subset<T, PointLedgerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointLedgerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PointLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointLedgerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointLedgerAggregateArgs>(args: Subset<T, PointLedgerAggregateArgs>): Prisma.PrismaPromise<GetPointLedgerAggregateType<T>>

    /**
     * Group by PointLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointLedgerGroupByArgs} args - Group by arguments.
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
      T extends PointLedgerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointLedgerGroupByArgs['orderBy'] }
        : { orderBy?: PointLedgerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PointLedgerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointLedgerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PointLedger model
   */
  readonly fields: PointLedgerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PointLedger.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointLedgerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PointLedger model
   */
  interface PointLedgerFieldRefs {
    readonly ledgerId: FieldRef<"PointLedger", 'BigInt'>
    readonly corporateId: FieldRef<"PointLedger", 'BigInt'>
    readonly amount: FieldRef<"PointLedger", 'Int'>
    readonly balanceSnapshot: FieldRef<"PointLedger", 'Int'>
    readonly createdAt: FieldRef<"PointLedger", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PointLedger findUnique
   */
  export type PointLedgerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * Filter, which PointLedger to fetch.
     */
    where: PointLedgerWhereUniqueInput
  }

  /**
   * PointLedger findUniqueOrThrow
   */
  export type PointLedgerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * Filter, which PointLedger to fetch.
     */
    where: PointLedgerWhereUniqueInput
  }

  /**
   * PointLedger findFirst
   */
  export type PointLedgerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * Filter, which PointLedger to fetch.
     */
    where?: PointLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointLedgers to fetch.
     */
    orderBy?: PointLedgerOrderByWithRelationInput | PointLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointLedgers.
     */
    cursor?: PointLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointLedgers.
     */
    distinct?: PointLedgerScalarFieldEnum | PointLedgerScalarFieldEnum[]
  }

  /**
   * PointLedger findFirstOrThrow
   */
  export type PointLedgerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * Filter, which PointLedger to fetch.
     */
    where?: PointLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointLedgers to fetch.
     */
    orderBy?: PointLedgerOrderByWithRelationInput | PointLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointLedgers.
     */
    cursor?: PointLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointLedgers.
     */
    distinct?: PointLedgerScalarFieldEnum | PointLedgerScalarFieldEnum[]
  }

  /**
   * PointLedger findMany
   */
  export type PointLedgerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * Filter, which PointLedgers to fetch.
     */
    where?: PointLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointLedgers to fetch.
     */
    orderBy?: PointLedgerOrderByWithRelationInput | PointLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PointLedgers.
     */
    cursor?: PointLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointLedgers.
     */
    skip?: number
    distinct?: PointLedgerScalarFieldEnum | PointLedgerScalarFieldEnum[]
  }

  /**
   * PointLedger create
   */
  export type PointLedgerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * The data needed to create a PointLedger.
     */
    data: XOR<PointLedgerCreateInput, PointLedgerUncheckedCreateInput>
  }

  /**
   * PointLedger createMany
   */
  export type PointLedgerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointLedgers.
     */
    data: PointLedgerCreateManyInput | PointLedgerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PointLedger createManyAndReturn
   */
  export type PointLedgerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * The data used to create many PointLedgers.
     */
    data: PointLedgerCreateManyInput | PointLedgerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PointLedger update
   */
  export type PointLedgerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * The data needed to update a PointLedger.
     */
    data: XOR<PointLedgerUpdateInput, PointLedgerUncheckedUpdateInput>
    /**
     * Choose, which PointLedger to update.
     */
    where: PointLedgerWhereUniqueInput
  }

  /**
   * PointLedger updateMany
   */
  export type PointLedgerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PointLedgers.
     */
    data: XOR<PointLedgerUpdateManyMutationInput, PointLedgerUncheckedUpdateManyInput>
    /**
     * Filter which PointLedgers to update
     */
    where?: PointLedgerWhereInput
    /**
     * Limit how many PointLedgers to update.
     */
    limit?: number
  }

  /**
   * PointLedger updateManyAndReturn
   */
  export type PointLedgerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * The data used to update PointLedgers.
     */
    data: XOR<PointLedgerUpdateManyMutationInput, PointLedgerUncheckedUpdateManyInput>
    /**
     * Filter which PointLedgers to update
     */
    where?: PointLedgerWhereInput
    /**
     * Limit how many PointLedgers to update.
     */
    limit?: number
  }

  /**
   * PointLedger upsert
   */
  export type PointLedgerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * The filter to search for the PointLedger to update in case it exists.
     */
    where: PointLedgerWhereUniqueInput
    /**
     * In case the PointLedger found by the `where` argument doesn't exist, create a new PointLedger with this data.
     */
    create: XOR<PointLedgerCreateInput, PointLedgerUncheckedCreateInput>
    /**
     * In case the PointLedger was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointLedgerUpdateInput, PointLedgerUncheckedUpdateInput>
  }

  /**
   * PointLedger delete
   */
  export type PointLedgerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
    /**
     * Filter which PointLedger to delete.
     */
    where: PointLedgerWhereUniqueInput
  }

  /**
   * PointLedger deleteMany
   */
  export type PointLedgerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointLedgers to delete
     */
    where?: PointLedgerWhereInput
    /**
     * Limit how many PointLedgers to delete.
     */
    limit?: number
  }

  /**
   * PointLedger without action
   */
  export type PointLedgerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointLedger
     */
    select?: PointLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PointLedger
     */
    omit?: PointLedgerOmit<ExtArgs> | null
  }


  /**
   * Model CorporateCoupon
   */

  export type AggregateCorporateCoupon = {
    _count: CorporateCouponCountAggregateOutputType | null
    _avg: CorporateCouponAvgAggregateOutputType | null
    _sum: CorporateCouponSumAggregateOutputType | null
    _min: CorporateCouponMinAggregateOutputType | null
    _max: CorporateCouponMaxAggregateOutputType | null
  }

  export type CorporateCouponAvgAggregateOutputType = {
    couponId: number | null
    corporateId: number | null
  }

  export type CorporateCouponSumAggregateOutputType = {
    couponId: bigint | null
    corporateId: bigint | null
  }

  export type CorporateCouponMinAggregateOutputType = {
    couponId: bigint | null
    corporateId: bigint | null
    couponType: string | null
    status: string | null
    expiresAt: Date | null
  }

  export type CorporateCouponMaxAggregateOutputType = {
    couponId: bigint | null
    corporateId: bigint | null
    couponType: string | null
    status: string | null
    expiresAt: Date | null
  }

  export type CorporateCouponCountAggregateOutputType = {
    couponId: number
    corporateId: number
    couponType: number
    status: number
    expiresAt: number
    _all: number
  }


  export type CorporateCouponAvgAggregateInputType = {
    couponId?: true
    corporateId?: true
  }

  export type CorporateCouponSumAggregateInputType = {
    couponId?: true
    corporateId?: true
  }

  export type CorporateCouponMinAggregateInputType = {
    couponId?: true
    corporateId?: true
    couponType?: true
    status?: true
    expiresAt?: true
  }

  export type CorporateCouponMaxAggregateInputType = {
    couponId?: true
    corporateId?: true
    couponType?: true
    status?: true
    expiresAt?: true
  }

  export type CorporateCouponCountAggregateInputType = {
    couponId?: true
    corporateId?: true
    couponType?: true
    status?: true
    expiresAt?: true
    _all?: true
  }

  export type CorporateCouponAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorporateCoupon to aggregate.
     */
    where?: CorporateCouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateCoupons to fetch.
     */
    orderBy?: CorporateCouponOrderByWithRelationInput | CorporateCouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CorporateCouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateCoupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateCoupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CorporateCoupons
    **/
    _count?: true | CorporateCouponCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CorporateCouponAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CorporateCouponSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CorporateCouponMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CorporateCouponMaxAggregateInputType
  }

  export type GetCorporateCouponAggregateType<T extends CorporateCouponAggregateArgs> = {
        [P in keyof T & keyof AggregateCorporateCoupon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCorporateCoupon[P]>
      : GetScalarType<T[P], AggregateCorporateCoupon[P]>
  }




  export type CorporateCouponGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorporateCouponWhereInput
    orderBy?: CorporateCouponOrderByWithAggregationInput | CorporateCouponOrderByWithAggregationInput[]
    by: CorporateCouponScalarFieldEnum[] | CorporateCouponScalarFieldEnum
    having?: CorporateCouponScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CorporateCouponCountAggregateInputType | true
    _avg?: CorporateCouponAvgAggregateInputType
    _sum?: CorporateCouponSumAggregateInputType
    _min?: CorporateCouponMinAggregateInputType
    _max?: CorporateCouponMaxAggregateInputType
  }

  export type CorporateCouponGroupByOutputType = {
    couponId: bigint
    corporateId: bigint
    couponType: string
    status: string
    expiresAt: Date
    _count: CorporateCouponCountAggregateOutputType | null
    _avg: CorporateCouponAvgAggregateOutputType | null
    _sum: CorporateCouponSumAggregateOutputType | null
    _min: CorporateCouponMinAggregateOutputType | null
    _max: CorporateCouponMaxAggregateOutputType | null
  }

  type GetCorporateCouponGroupByPayload<T extends CorporateCouponGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CorporateCouponGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CorporateCouponGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CorporateCouponGroupByOutputType[P]>
            : GetScalarType<T[P], CorporateCouponGroupByOutputType[P]>
        }
      >
    >


  export type CorporateCouponSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    couponId?: boolean
    corporateId?: boolean
    couponType?: boolean
    status?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["corporateCoupon"]>

  export type CorporateCouponSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    couponId?: boolean
    corporateId?: boolean
    couponType?: boolean
    status?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["corporateCoupon"]>

  export type CorporateCouponSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    couponId?: boolean
    corporateId?: boolean
    couponType?: boolean
    status?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["corporateCoupon"]>

  export type CorporateCouponSelectScalar = {
    couponId?: boolean
    corporateId?: boolean
    couponType?: boolean
    status?: boolean
    expiresAt?: boolean
  }

  export type CorporateCouponOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"couponId" | "corporateId" | "couponType" | "status" | "expiresAt", ExtArgs["result"]["corporateCoupon"]>

  export type $CorporateCouponPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CorporateCoupon"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      couponId: bigint
      corporateId: bigint
      couponType: string
      status: string
      expiresAt: Date
    }, ExtArgs["result"]["corporateCoupon"]>
    composites: {}
  }

  type CorporateCouponGetPayload<S extends boolean | null | undefined | CorporateCouponDefaultArgs> = $Result.GetResult<Prisma.$CorporateCouponPayload, S>

  type CorporateCouponCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CorporateCouponFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CorporateCouponCountAggregateInputType | true
    }

  export interface CorporateCouponDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CorporateCoupon'], meta: { name: 'CorporateCoupon' } }
    /**
     * Find zero or one CorporateCoupon that matches the filter.
     * @param {CorporateCouponFindUniqueArgs} args - Arguments to find a CorporateCoupon
     * @example
     * // Get one CorporateCoupon
     * const corporateCoupon = await prisma.corporateCoupon.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CorporateCouponFindUniqueArgs>(args: SelectSubset<T, CorporateCouponFindUniqueArgs<ExtArgs>>): Prisma__CorporateCouponClient<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CorporateCoupon that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CorporateCouponFindUniqueOrThrowArgs} args - Arguments to find a CorporateCoupon
     * @example
     * // Get one CorporateCoupon
     * const corporateCoupon = await prisma.corporateCoupon.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CorporateCouponFindUniqueOrThrowArgs>(args: SelectSubset<T, CorporateCouponFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CorporateCouponClient<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorporateCoupon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateCouponFindFirstArgs} args - Arguments to find a CorporateCoupon
     * @example
     * // Get one CorporateCoupon
     * const corporateCoupon = await prisma.corporateCoupon.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CorporateCouponFindFirstArgs>(args?: SelectSubset<T, CorporateCouponFindFirstArgs<ExtArgs>>): Prisma__CorporateCouponClient<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorporateCoupon that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateCouponFindFirstOrThrowArgs} args - Arguments to find a CorporateCoupon
     * @example
     * // Get one CorporateCoupon
     * const corporateCoupon = await prisma.corporateCoupon.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CorporateCouponFindFirstOrThrowArgs>(args?: SelectSubset<T, CorporateCouponFindFirstOrThrowArgs<ExtArgs>>): Prisma__CorporateCouponClient<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CorporateCoupons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateCouponFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CorporateCoupons
     * const corporateCoupons = await prisma.corporateCoupon.findMany()
     * 
     * // Get first 10 CorporateCoupons
     * const corporateCoupons = await prisma.corporateCoupon.findMany({ take: 10 })
     * 
     * // Only select the `couponId`
     * const corporateCouponWithCouponIdOnly = await prisma.corporateCoupon.findMany({ select: { couponId: true } })
     * 
     */
    findMany<T extends CorporateCouponFindManyArgs>(args?: SelectSubset<T, CorporateCouponFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CorporateCoupon.
     * @param {CorporateCouponCreateArgs} args - Arguments to create a CorporateCoupon.
     * @example
     * // Create one CorporateCoupon
     * const CorporateCoupon = await prisma.corporateCoupon.create({
     *   data: {
     *     // ... data to create a CorporateCoupon
     *   }
     * })
     * 
     */
    create<T extends CorporateCouponCreateArgs>(args: SelectSubset<T, CorporateCouponCreateArgs<ExtArgs>>): Prisma__CorporateCouponClient<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CorporateCoupons.
     * @param {CorporateCouponCreateManyArgs} args - Arguments to create many CorporateCoupons.
     * @example
     * // Create many CorporateCoupons
     * const corporateCoupon = await prisma.corporateCoupon.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CorporateCouponCreateManyArgs>(args?: SelectSubset<T, CorporateCouponCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CorporateCoupons and returns the data saved in the database.
     * @param {CorporateCouponCreateManyAndReturnArgs} args - Arguments to create many CorporateCoupons.
     * @example
     * // Create many CorporateCoupons
     * const corporateCoupon = await prisma.corporateCoupon.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CorporateCoupons and only return the `couponId`
     * const corporateCouponWithCouponIdOnly = await prisma.corporateCoupon.createManyAndReturn({
     *   select: { couponId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CorporateCouponCreateManyAndReturnArgs>(args?: SelectSubset<T, CorporateCouponCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CorporateCoupon.
     * @param {CorporateCouponDeleteArgs} args - Arguments to delete one CorporateCoupon.
     * @example
     * // Delete one CorporateCoupon
     * const CorporateCoupon = await prisma.corporateCoupon.delete({
     *   where: {
     *     // ... filter to delete one CorporateCoupon
     *   }
     * })
     * 
     */
    delete<T extends CorporateCouponDeleteArgs>(args: SelectSubset<T, CorporateCouponDeleteArgs<ExtArgs>>): Prisma__CorporateCouponClient<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CorporateCoupon.
     * @param {CorporateCouponUpdateArgs} args - Arguments to update one CorporateCoupon.
     * @example
     * // Update one CorporateCoupon
     * const corporateCoupon = await prisma.corporateCoupon.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CorporateCouponUpdateArgs>(args: SelectSubset<T, CorporateCouponUpdateArgs<ExtArgs>>): Prisma__CorporateCouponClient<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CorporateCoupons.
     * @param {CorporateCouponDeleteManyArgs} args - Arguments to filter CorporateCoupons to delete.
     * @example
     * // Delete a few CorporateCoupons
     * const { count } = await prisma.corporateCoupon.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CorporateCouponDeleteManyArgs>(args?: SelectSubset<T, CorporateCouponDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorporateCoupons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateCouponUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CorporateCoupons
     * const corporateCoupon = await prisma.corporateCoupon.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CorporateCouponUpdateManyArgs>(args: SelectSubset<T, CorporateCouponUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorporateCoupons and returns the data updated in the database.
     * @param {CorporateCouponUpdateManyAndReturnArgs} args - Arguments to update many CorporateCoupons.
     * @example
     * // Update many CorporateCoupons
     * const corporateCoupon = await prisma.corporateCoupon.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CorporateCoupons and only return the `couponId`
     * const corporateCouponWithCouponIdOnly = await prisma.corporateCoupon.updateManyAndReturn({
     *   select: { couponId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CorporateCouponUpdateManyAndReturnArgs>(args: SelectSubset<T, CorporateCouponUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CorporateCoupon.
     * @param {CorporateCouponUpsertArgs} args - Arguments to update or create a CorporateCoupon.
     * @example
     * // Update or create a CorporateCoupon
     * const corporateCoupon = await prisma.corporateCoupon.upsert({
     *   create: {
     *     // ... data to create a CorporateCoupon
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CorporateCoupon we want to update
     *   }
     * })
     */
    upsert<T extends CorporateCouponUpsertArgs>(args: SelectSubset<T, CorporateCouponUpsertArgs<ExtArgs>>): Prisma__CorporateCouponClient<$Result.GetResult<Prisma.$CorporateCouponPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CorporateCoupons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateCouponCountArgs} args - Arguments to filter CorporateCoupons to count.
     * @example
     * // Count the number of CorporateCoupons
     * const count = await prisma.corporateCoupon.count({
     *   where: {
     *     // ... the filter for the CorporateCoupons we want to count
     *   }
     * })
    **/
    count<T extends CorporateCouponCountArgs>(
      args?: Subset<T, CorporateCouponCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CorporateCouponCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CorporateCoupon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateCouponAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CorporateCouponAggregateArgs>(args: Subset<T, CorporateCouponAggregateArgs>): Prisma.PrismaPromise<GetCorporateCouponAggregateType<T>>

    /**
     * Group by CorporateCoupon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateCouponGroupByArgs} args - Group by arguments.
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
      T extends CorporateCouponGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CorporateCouponGroupByArgs['orderBy'] }
        : { orderBy?: CorporateCouponGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CorporateCouponGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorporateCouponGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CorporateCoupon model
   */
  readonly fields: CorporateCouponFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CorporateCoupon.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CorporateCouponClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CorporateCoupon model
   */
  interface CorporateCouponFieldRefs {
    readonly couponId: FieldRef<"CorporateCoupon", 'BigInt'>
    readonly corporateId: FieldRef<"CorporateCoupon", 'BigInt'>
    readonly couponType: FieldRef<"CorporateCoupon", 'String'>
    readonly status: FieldRef<"CorporateCoupon", 'String'>
    readonly expiresAt: FieldRef<"CorporateCoupon", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CorporateCoupon findUnique
   */
  export type CorporateCouponFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * Filter, which CorporateCoupon to fetch.
     */
    where: CorporateCouponWhereUniqueInput
  }

  /**
   * CorporateCoupon findUniqueOrThrow
   */
  export type CorporateCouponFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * Filter, which CorporateCoupon to fetch.
     */
    where: CorporateCouponWhereUniqueInput
  }

  /**
   * CorporateCoupon findFirst
   */
  export type CorporateCouponFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * Filter, which CorporateCoupon to fetch.
     */
    where?: CorporateCouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateCoupons to fetch.
     */
    orderBy?: CorporateCouponOrderByWithRelationInput | CorporateCouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorporateCoupons.
     */
    cursor?: CorporateCouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateCoupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateCoupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorporateCoupons.
     */
    distinct?: CorporateCouponScalarFieldEnum | CorporateCouponScalarFieldEnum[]
  }

  /**
   * CorporateCoupon findFirstOrThrow
   */
  export type CorporateCouponFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * Filter, which CorporateCoupon to fetch.
     */
    where?: CorporateCouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateCoupons to fetch.
     */
    orderBy?: CorporateCouponOrderByWithRelationInput | CorporateCouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorporateCoupons.
     */
    cursor?: CorporateCouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateCoupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateCoupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorporateCoupons.
     */
    distinct?: CorporateCouponScalarFieldEnum | CorporateCouponScalarFieldEnum[]
  }

  /**
   * CorporateCoupon findMany
   */
  export type CorporateCouponFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * Filter, which CorporateCoupons to fetch.
     */
    where?: CorporateCouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateCoupons to fetch.
     */
    orderBy?: CorporateCouponOrderByWithRelationInput | CorporateCouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CorporateCoupons.
     */
    cursor?: CorporateCouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateCoupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateCoupons.
     */
    skip?: number
    distinct?: CorporateCouponScalarFieldEnum | CorporateCouponScalarFieldEnum[]
  }

  /**
   * CorporateCoupon create
   */
  export type CorporateCouponCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * The data needed to create a CorporateCoupon.
     */
    data: XOR<CorporateCouponCreateInput, CorporateCouponUncheckedCreateInput>
  }

  /**
   * CorporateCoupon createMany
   */
  export type CorporateCouponCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CorporateCoupons.
     */
    data: CorporateCouponCreateManyInput | CorporateCouponCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorporateCoupon createManyAndReturn
   */
  export type CorporateCouponCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * The data used to create many CorporateCoupons.
     */
    data: CorporateCouponCreateManyInput | CorporateCouponCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorporateCoupon update
   */
  export type CorporateCouponUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * The data needed to update a CorporateCoupon.
     */
    data: XOR<CorporateCouponUpdateInput, CorporateCouponUncheckedUpdateInput>
    /**
     * Choose, which CorporateCoupon to update.
     */
    where: CorporateCouponWhereUniqueInput
  }

  /**
   * CorporateCoupon updateMany
   */
  export type CorporateCouponUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CorporateCoupons.
     */
    data: XOR<CorporateCouponUpdateManyMutationInput, CorporateCouponUncheckedUpdateManyInput>
    /**
     * Filter which CorporateCoupons to update
     */
    where?: CorporateCouponWhereInput
    /**
     * Limit how many CorporateCoupons to update.
     */
    limit?: number
  }

  /**
   * CorporateCoupon updateManyAndReturn
   */
  export type CorporateCouponUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * The data used to update CorporateCoupons.
     */
    data: XOR<CorporateCouponUpdateManyMutationInput, CorporateCouponUncheckedUpdateManyInput>
    /**
     * Filter which CorporateCoupons to update
     */
    where?: CorporateCouponWhereInput
    /**
     * Limit how many CorporateCoupons to update.
     */
    limit?: number
  }

  /**
   * CorporateCoupon upsert
   */
  export type CorporateCouponUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * The filter to search for the CorporateCoupon to update in case it exists.
     */
    where: CorporateCouponWhereUniqueInput
    /**
     * In case the CorporateCoupon found by the `where` argument doesn't exist, create a new CorporateCoupon with this data.
     */
    create: XOR<CorporateCouponCreateInput, CorporateCouponUncheckedCreateInput>
    /**
     * In case the CorporateCoupon was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CorporateCouponUpdateInput, CorporateCouponUncheckedUpdateInput>
  }

  /**
   * CorporateCoupon delete
   */
  export type CorporateCouponDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
    /**
     * Filter which CorporateCoupon to delete.
     */
    where: CorporateCouponWhereUniqueInput
  }

  /**
   * CorporateCoupon deleteMany
   */
  export type CorporateCouponDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorporateCoupons to delete
     */
    where?: CorporateCouponWhereInput
    /**
     * Limit how many CorporateCoupons to delete.
     */
    limit?: number
  }

  /**
   * CorporateCoupon without action
   */
  export type CorporateCouponDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateCoupon
     */
    select?: CorporateCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateCoupon
     */
    omit?: CorporateCouponOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ServiceProductScalarFieldEnum: {
    productId: 'productId',
    productCode: 'productCode',
    productName: 'productName',
    productCategory: 'productCategory',
    isActive: 'isActive'
  };

  export type ServiceProductScalarFieldEnum = (typeof ServiceProductScalarFieldEnum)[keyof typeof ServiceProductScalarFieldEnum]


  export const ProductPricingRuleScalarFieldEnum: {
    ruleId: 'ruleId',
    productId: 'productId',
    originalPrice: 'originalPrice',
    salePrice: 'salePrice',
    validFrom: 'validFrom',
    validUntil: 'validUntil'
  };

  export type ProductPricingRuleScalarFieldEnum = (typeof ProductPricingRuleScalarFieldEnum)[keyof typeof ProductPricingRuleScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    orderId: 'orderId',
    corporateId: 'corporateId',
    totalSaleAmount: 'totalSaleAmount',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    itemId: 'itemId',
    orderId: 'orderId',
    productId: 'productId',
    snapProductName: 'snapProductName',
    snapSalePrice: 'snapSalePrice'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const PointLedgerScalarFieldEnum: {
    ledgerId: 'ledgerId',
    corporateId: 'corporateId',
    amount: 'amount',
    balanceSnapshot: 'balanceSnapshot',
    createdAt: 'createdAt'
  };

  export type PointLedgerScalarFieldEnum = (typeof PointLedgerScalarFieldEnum)[keyof typeof PointLedgerScalarFieldEnum]


  export const CorporateCouponScalarFieldEnum: {
    couponId: 'couponId',
    corporateId: 'corporateId',
    couponType: 'couponType',
    status: 'status',
    expiresAt: 'expiresAt'
  };

  export type CorporateCouponScalarFieldEnum = (typeof CorporateCouponScalarFieldEnum)[keyof typeof CorporateCouponScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type ServiceProductWhereInput = {
    AND?: ServiceProductWhereInput | ServiceProductWhereInput[]
    OR?: ServiceProductWhereInput[]
    NOT?: ServiceProductWhereInput | ServiceProductWhereInput[]
    productId?: IntFilter<"ServiceProduct"> | number
    productCode?: StringFilter<"ServiceProduct"> | string
    productName?: StringFilter<"ServiceProduct"> | string
    productCategory?: StringFilter<"ServiceProduct"> | string
    isActive?: BoolFilter<"ServiceProduct"> | boolean
    pricingRules?: ProductPricingRuleListRelationFilter
  }

  export type ServiceProductOrderByWithRelationInput = {
    productId?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrder
    isActive?: SortOrder
    pricingRules?: ProductPricingRuleOrderByRelationAggregateInput
  }

  export type ServiceProductWhereUniqueInput = Prisma.AtLeast<{
    productId?: number
    productCode?: string
    AND?: ServiceProductWhereInput | ServiceProductWhereInput[]
    OR?: ServiceProductWhereInput[]
    NOT?: ServiceProductWhereInput | ServiceProductWhereInput[]
    productName?: StringFilter<"ServiceProduct"> | string
    productCategory?: StringFilter<"ServiceProduct"> | string
    isActive?: BoolFilter<"ServiceProduct"> | boolean
    pricingRules?: ProductPricingRuleListRelationFilter
  }, "productId" | "productCode">

  export type ServiceProductOrderByWithAggregationInput = {
    productId?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrder
    isActive?: SortOrder
    _count?: ServiceProductCountOrderByAggregateInput
    _avg?: ServiceProductAvgOrderByAggregateInput
    _max?: ServiceProductMaxOrderByAggregateInput
    _min?: ServiceProductMinOrderByAggregateInput
    _sum?: ServiceProductSumOrderByAggregateInput
  }

  export type ServiceProductScalarWhereWithAggregatesInput = {
    AND?: ServiceProductScalarWhereWithAggregatesInput | ServiceProductScalarWhereWithAggregatesInput[]
    OR?: ServiceProductScalarWhereWithAggregatesInput[]
    NOT?: ServiceProductScalarWhereWithAggregatesInput | ServiceProductScalarWhereWithAggregatesInput[]
    productId?: IntWithAggregatesFilter<"ServiceProduct"> | number
    productCode?: StringWithAggregatesFilter<"ServiceProduct"> | string
    productName?: StringWithAggregatesFilter<"ServiceProduct"> | string
    productCategory?: StringWithAggregatesFilter<"ServiceProduct"> | string
    isActive?: BoolWithAggregatesFilter<"ServiceProduct"> | boolean
  }

  export type ProductPricingRuleWhereInput = {
    AND?: ProductPricingRuleWhereInput | ProductPricingRuleWhereInput[]
    OR?: ProductPricingRuleWhereInput[]
    NOT?: ProductPricingRuleWhereInput | ProductPricingRuleWhereInput[]
    ruleId?: BigIntFilter<"ProductPricingRule"> | bigint | number
    productId?: IntFilter<"ProductPricingRule"> | number
    originalPrice?: DecimalFilter<"ProductPricingRule"> | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFilter<"ProductPricingRule"> | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFilter<"ProductPricingRule"> | Date | string
    validUntil?: DateTimeNullableFilter<"ProductPricingRule"> | Date | string | null
    product?: XOR<ServiceProductScalarRelationFilter, ServiceProductWhereInput>
  }

  export type ProductPricingRuleOrderByWithRelationInput = {
    ruleId?: SortOrder
    productId?: SortOrder
    originalPrice?: SortOrder
    salePrice?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrderInput | SortOrder
    product?: ServiceProductOrderByWithRelationInput
  }

  export type ProductPricingRuleWhereUniqueInput = Prisma.AtLeast<{
    ruleId?: bigint | number
    AND?: ProductPricingRuleWhereInput | ProductPricingRuleWhereInput[]
    OR?: ProductPricingRuleWhereInput[]
    NOT?: ProductPricingRuleWhereInput | ProductPricingRuleWhereInput[]
    productId?: IntFilter<"ProductPricingRule"> | number
    originalPrice?: DecimalFilter<"ProductPricingRule"> | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFilter<"ProductPricingRule"> | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFilter<"ProductPricingRule"> | Date | string
    validUntil?: DateTimeNullableFilter<"ProductPricingRule"> | Date | string | null
    product?: XOR<ServiceProductScalarRelationFilter, ServiceProductWhereInput>
  }, "ruleId">

  export type ProductPricingRuleOrderByWithAggregationInput = {
    ruleId?: SortOrder
    productId?: SortOrder
    originalPrice?: SortOrder
    salePrice?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrderInput | SortOrder
    _count?: ProductPricingRuleCountOrderByAggregateInput
    _avg?: ProductPricingRuleAvgOrderByAggregateInput
    _max?: ProductPricingRuleMaxOrderByAggregateInput
    _min?: ProductPricingRuleMinOrderByAggregateInput
    _sum?: ProductPricingRuleSumOrderByAggregateInput
  }

  export type ProductPricingRuleScalarWhereWithAggregatesInput = {
    AND?: ProductPricingRuleScalarWhereWithAggregatesInput | ProductPricingRuleScalarWhereWithAggregatesInput[]
    OR?: ProductPricingRuleScalarWhereWithAggregatesInput[]
    NOT?: ProductPricingRuleScalarWhereWithAggregatesInput | ProductPricingRuleScalarWhereWithAggregatesInput[]
    ruleId?: BigIntWithAggregatesFilter<"ProductPricingRule"> | bigint | number
    productId?: IntWithAggregatesFilter<"ProductPricingRule"> | number
    originalPrice?: DecimalWithAggregatesFilter<"ProductPricingRule"> | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalWithAggregatesFilter<"ProductPricingRule"> | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeWithAggregatesFilter<"ProductPricingRule"> | Date | string
    validUntil?: DateTimeNullableWithAggregatesFilter<"ProductPricingRule"> | Date | string | null
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    orderId?: BigIntFilter<"Order"> | bigint | number
    corporateId?: BigIntFilter<"Order"> | bigint | number
    totalSaleAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    orderId?: SortOrder
    corporateId?: SortOrder
    totalSaleAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    orderId?: bigint | number
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    corporateId?: BigIntFilter<"Order"> | bigint | number
    totalSaleAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
  }, "orderId">

  export type OrderOrderByWithAggregationInput = {
    orderId?: SortOrder
    corporateId?: SortOrder
    totalSaleAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    orderId?: BigIntWithAggregatesFilter<"Order"> | bigint | number
    corporateId?: BigIntWithAggregatesFilter<"Order"> | bigint | number
    totalSaleAmount?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    itemId?: BigIntFilter<"OrderItem"> | bigint | number
    orderId?: BigIntFilter<"OrderItem"> | bigint | number
    productId?: IntFilter<"OrderItem"> | number
    snapProductName?: StringFilter<"OrderItem"> | string
    snapSalePrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    itemId?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    snapProductName?: SortOrder
    snapSalePrice?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    itemId?: bigint | number
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: BigIntFilter<"OrderItem"> | bigint | number
    productId?: IntFilter<"OrderItem"> | number
    snapProductName?: StringFilter<"OrderItem"> | string
    snapSalePrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "itemId">

  export type OrderItemOrderByWithAggregationInput = {
    itemId?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    snapProductName?: SortOrder
    snapSalePrice?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    itemId?: BigIntWithAggregatesFilter<"OrderItem"> | bigint | number
    orderId?: BigIntWithAggregatesFilter<"OrderItem"> | bigint | number
    productId?: IntWithAggregatesFilter<"OrderItem"> | number
    snapProductName?: StringWithAggregatesFilter<"OrderItem"> | string
    snapSalePrice?: DecimalWithAggregatesFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
  }

  export type PointLedgerWhereInput = {
    AND?: PointLedgerWhereInput | PointLedgerWhereInput[]
    OR?: PointLedgerWhereInput[]
    NOT?: PointLedgerWhereInput | PointLedgerWhereInput[]
    ledgerId?: BigIntFilter<"PointLedger"> | bigint | number
    corporateId?: BigIntFilter<"PointLedger"> | bigint | number
    amount?: IntFilter<"PointLedger"> | number
    balanceSnapshot?: IntFilter<"PointLedger"> | number
    createdAt?: DateTimeFilter<"PointLedger"> | Date | string
  }

  export type PointLedgerOrderByWithRelationInput = {
    ledgerId?: SortOrder
    corporateId?: SortOrder
    amount?: SortOrder
    balanceSnapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type PointLedgerWhereUniqueInput = Prisma.AtLeast<{
    ledgerId?: bigint | number
    AND?: PointLedgerWhereInput | PointLedgerWhereInput[]
    OR?: PointLedgerWhereInput[]
    NOT?: PointLedgerWhereInput | PointLedgerWhereInput[]
    corporateId?: BigIntFilter<"PointLedger"> | bigint | number
    amount?: IntFilter<"PointLedger"> | number
    balanceSnapshot?: IntFilter<"PointLedger"> | number
    createdAt?: DateTimeFilter<"PointLedger"> | Date | string
  }, "ledgerId">

  export type PointLedgerOrderByWithAggregationInput = {
    ledgerId?: SortOrder
    corporateId?: SortOrder
    amount?: SortOrder
    balanceSnapshot?: SortOrder
    createdAt?: SortOrder
    _count?: PointLedgerCountOrderByAggregateInput
    _avg?: PointLedgerAvgOrderByAggregateInput
    _max?: PointLedgerMaxOrderByAggregateInput
    _min?: PointLedgerMinOrderByAggregateInput
    _sum?: PointLedgerSumOrderByAggregateInput
  }

  export type PointLedgerScalarWhereWithAggregatesInput = {
    AND?: PointLedgerScalarWhereWithAggregatesInput | PointLedgerScalarWhereWithAggregatesInput[]
    OR?: PointLedgerScalarWhereWithAggregatesInput[]
    NOT?: PointLedgerScalarWhereWithAggregatesInput | PointLedgerScalarWhereWithAggregatesInput[]
    ledgerId?: BigIntWithAggregatesFilter<"PointLedger"> | bigint | number
    corporateId?: BigIntWithAggregatesFilter<"PointLedger"> | bigint | number
    amount?: IntWithAggregatesFilter<"PointLedger"> | number
    balanceSnapshot?: IntWithAggregatesFilter<"PointLedger"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PointLedger"> | Date | string
  }

  export type CorporateCouponWhereInput = {
    AND?: CorporateCouponWhereInput | CorporateCouponWhereInput[]
    OR?: CorporateCouponWhereInput[]
    NOT?: CorporateCouponWhereInput | CorporateCouponWhereInput[]
    couponId?: BigIntFilter<"CorporateCoupon"> | bigint | number
    corporateId?: BigIntFilter<"CorporateCoupon"> | bigint | number
    couponType?: StringFilter<"CorporateCoupon"> | string
    status?: StringFilter<"CorporateCoupon"> | string
    expiresAt?: DateTimeFilter<"CorporateCoupon"> | Date | string
  }

  export type CorporateCouponOrderByWithRelationInput = {
    couponId?: SortOrder
    corporateId?: SortOrder
    couponType?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
  }

  export type CorporateCouponWhereUniqueInput = Prisma.AtLeast<{
    couponId?: bigint | number
    AND?: CorporateCouponWhereInput | CorporateCouponWhereInput[]
    OR?: CorporateCouponWhereInput[]
    NOT?: CorporateCouponWhereInput | CorporateCouponWhereInput[]
    corporateId?: BigIntFilter<"CorporateCoupon"> | bigint | number
    couponType?: StringFilter<"CorporateCoupon"> | string
    status?: StringFilter<"CorporateCoupon"> | string
    expiresAt?: DateTimeFilter<"CorporateCoupon"> | Date | string
  }, "couponId">

  export type CorporateCouponOrderByWithAggregationInput = {
    couponId?: SortOrder
    corporateId?: SortOrder
    couponType?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    _count?: CorporateCouponCountOrderByAggregateInput
    _avg?: CorporateCouponAvgOrderByAggregateInput
    _max?: CorporateCouponMaxOrderByAggregateInput
    _min?: CorporateCouponMinOrderByAggregateInput
    _sum?: CorporateCouponSumOrderByAggregateInput
  }

  export type CorporateCouponScalarWhereWithAggregatesInput = {
    AND?: CorporateCouponScalarWhereWithAggregatesInput | CorporateCouponScalarWhereWithAggregatesInput[]
    OR?: CorporateCouponScalarWhereWithAggregatesInput[]
    NOT?: CorporateCouponScalarWhereWithAggregatesInput | CorporateCouponScalarWhereWithAggregatesInput[]
    couponId?: BigIntWithAggregatesFilter<"CorporateCoupon"> | bigint | number
    corporateId?: BigIntWithAggregatesFilter<"CorporateCoupon"> | bigint | number
    couponType?: StringWithAggregatesFilter<"CorporateCoupon"> | string
    status?: StringWithAggregatesFilter<"CorporateCoupon"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"CorporateCoupon"> | Date | string
  }

  export type ServiceProductCreateInput = {
    productCode: string
    productName: string
    productCategory: string
    isActive?: boolean
    pricingRules?: ProductPricingRuleCreateNestedManyWithoutProductInput
  }

  export type ServiceProductUncheckedCreateInput = {
    productId?: number
    productCode: string
    productName: string
    productCategory: string
    isActive?: boolean
    pricingRules?: ProductPricingRuleUncheckedCreateNestedManyWithoutProductInput
  }

  export type ServiceProductUpdateInput = {
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pricingRules?: ProductPricingRuleUpdateManyWithoutProductNestedInput
  }

  export type ServiceProductUncheckedUpdateInput = {
    productId?: IntFieldUpdateOperationsInput | number
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pricingRules?: ProductPricingRuleUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ServiceProductCreateManyInput = {
    productId?: number
    productCode: string
    productName: string
    productCategory: string
    isActive?: boolean
  }

  export type ServiceProductUpdateManyMutationInput = {
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiceProductUncheckedUpdateManyInput = {
    productId?: IntFieldUpdateOperationsInput | number
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductPricingRuleCreateInput = {
    ruleId?: bigint | number
    originalPrice: Decimal | DecimalJsLike | number | string
    salePrice: Decimal | DecimalJsLike | number | string
    validFrom: Date | string
    validUntil?: Date | string | null
    product: ServiceProductCreateNestedOneWithoutPricingRulesInput
  }

  export type ProductPricingRuleUncheckedCreateInput = {
    ruleId?: bigint | number
    productId: number
    originalPrice: Decimal | DecimalJsLike | number | string
    salePrice: Decimal | DecimalJsLike | number | string
    validFrom: Date | string
    validUntil?: Date | string | null
  }

  export type ProductPricingRuleUpdateInput = {
    ruleId?: BigIntFieldUpdateOperationsInput | bigint | number
    originalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    product?: ServiceProductUpdateOneRequiredWithoutPricingRulesNestedInput
  }

  export type ProductPricingRuleUncheckedUpdateInput = {
    ruleId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    originalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductPricingRuleCreateManyInput = {
    ruleId?: bigint | number
    productId: number
    originalPrice: Decimal | DecimalJsLike | number | string
    salePrice: Decimal | DecimalJsLike | number | string
    validFrom: Date | string
    validUntil?: Date | string | null
  }

  export type ProductPricingRuleUpdateManyMutationInput = {
    ruleId?: BigIntFieldUpdateOperationsInput | bigint | number
    originalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductPricingRuleUncheckedUpdateManyInput = {
    ruleId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    originalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderCreateInput = {
    orderId?: bigint | number
    corporateId: bigint | number
    totalSaleAmount: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    orderId?: bigint | number
    corporateId: bigint | number
    totalSaleAmount: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    orderId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSaleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    orderId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSaleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    orderId?: bigint | number
    corporateId: bigint | number
    totalSaleAmount: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    orderId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSaleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    orderId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSaleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    itemId?: bigint | number
    productId: number
    snapProductName: string
    snapSalePrice: Decimal | DecimalJsLike | number | string
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    itemId?: bigint | number
    orderId: bigint | number
    productId: number
    snapProductName: string
    snapSalePrice: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUpdateInput = {
    itemId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    snapProductName?: StringFieldUpdateOperationsInput | string
    snapSalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    itemId?: BigIntFieldUpdateOperationsInput | bigint | number
    orderId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    snapProductName?: StringFieldUpdateOperationsInput | string
    snapSalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemCreateManyInput = {
    itemId?: bigint | number
    orderId: bigint | number
    productId: number
    snapProductName: string
    snapSalePrice: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUpdateManyMutationInput = {
    itemId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    snapProductName?: StringFieldUpdateOperationsInput | string
    snapSalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    itemId?: BigIntFieldUpdateOperationsInput | bigint | number
    orderId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    snapProductName?: StringFieldUpdateOperationsInput | string
    snapSalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type PointLedgerCreateInput = {
    ledgerId?: bigint | number
    corporateId: bigint | number
    amount: number
    balanceSnapshot: number
    createdAt?: Date | string
  }

  export type PointLedgerUncheckedCreateInput = {
    ledgerId?: bigint | number
    corporateId: bigint | number
    amount: number
    balanceSnapshot: number
    createdAt?: Date | string
  }

  export type PointLedgerUpdateInput = {
    ledgerId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    balanceSnapshot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointLedgerUncheckedUpdateInput = {
    ledgerId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    balanceSnapshot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointLedgerCreateManyInput = {
    ledgerId?: bigint | number
    corporateId: bigint | number
    amount: number
    balanceSnapshot: number
    createdAt?: Date | string
  }

  export type PointLedgerUpdateManyMutationInput = {
    ledgerId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    balanceSnapshot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointLedgerUncheckedUpdateManyInput = {
    ledgerId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    balanceSnapshot?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateCouponCreateInput = {
    couponId?: bigint | number
    corporateId: bigint | number
    couponType: string
    status?: string
    expiresAt: Date | string
  }

  export type CorporateCouponUncheckedCreateInput = {
    couponId?: bigint | number
    corporateId: bigint | number
    couponType: string
    status?: string
    expiresAt: Date | string
  }

  export type CorporateCouponUpdateInput = {
    couponId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    couponType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateCouponUncheckedUpdateInput = {
    couponId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    couponType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateCouponCreateManyInput = {
    couponId?: bigint | number
    corporateId: bigint | number
    couponType: string
    status?: string
    expiresAt: Date | string
  }

  export type CorporateCouponUpdateManyMutationInput = {
    couponId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    couponType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateCouponUncheckedUpdateManyInput = {
    couponId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    couponType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProductPricingRuleListRelationFilter = {
    every?: ProductPricingRuleWhereInput
    some?: ProductPricingRuleWhereInput
    none?: ProductPricingRuleWhereInput
  }

  export type ProductPricingRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceProductCountOrderByAggregateInput = {
    productId?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrder
    isActive?: SortOrder
  }

  export type ServiceProductAvgOrderByAggregateInput = {
    productId?: SortOrder
  }

  export type ServiceProductMaxOrderByAggregateInput = {
    productId?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrder
    isActive?: SortOrder
  }

  export type ServiceProductMinOrderByAggregateInput = {
    productId?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrder
    isActive?: SortOrder
  }

  export type ServiceProductSumOrderByAggregateInput = {
    productId?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ServiceProductScalarRelationFilter = {
    is?: ServiceProductWhereInput
    isNot?: ServiceProductWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductPricingRuleCountOrderByAggregateInput = {
    ruleId?: SortOrder
    productId?: SortOrder
    originalPrice?: SortOrder
    salePrice?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
  }

  export type ProductPricingRuleAvgOrderByAggregateInput = {
    ruleId?: SortOrder
    productId?: SortOrder
    originalPrice?: SortOrder
    salePrice?: SortOrder
  }

  export type ProductPricingRuleMaxOrderByAggregateInput = {
    ruleId?: SortOrder
    productId?: SortOrder
    originalPrice?: SortOrder
    salePrice?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
  }

  export type ProductPricingRuleMinOrderByAggregateInput = {
    ruleId?: SortOrder
    productId?: SortOrder
    originalPrice?: SortOrder
    salePrice?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
  }

  export type ProductPricingRuleSumOrderByAggregateInput = {
    ruleId?: SortOrder
    productId?: SortOrder
    originalPrice?: SortOrder
    salePrice?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    orderId?: SortOrder
    corporateId?: SortOrder
    totalSaleAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    orderId?: SortOrder
    corporateId?: SortOrder
    totalSaleAmount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    orderId?: SortOrder
    corporateId?: SortOrder
    totalSaleAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    orderId?: SortOrder
    corporateId?: SortOrder
    totalSaleAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    orderId?: SortOrder
    corporateId?: SortOrder
    totalSaleAmount?: SortOrder
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    itemId?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    snapProductName?: SortOrder
    snapSalePrice?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    itemId?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    snapSalePrice?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    itemId?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    snapProductName?: SortOrder
    snapSalePrice?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    itemId?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    snapProductName?: SortOrder
    snapSalePrice?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    itemId?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    snapSalePrice?: SortOrder
  }

  export type PointLedgerCountOrderByAggregateInput = {
    ledgerId?: SortOrder
    corporateId?: SortOrder
    amount?: SortOrder
    balanceSnapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type PointLedgerAvgOrderByAggregateInput = {
    ledgerId?: SortOrder
    corporateId?: SortOrder
    amount?: SortOrder
    balanceSnapshot?: SortOrder
  }

  export type PointLedgerMaxOrderByAggregateInput = {
    ledgerId?: SortOrder
    corporateId?: SortOrder
    amount?: SortOrder
    balanceSnapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type PointLedgerMinOrderByAggregateInput = {
    ledgerId?: SortOrder
    corporateId?: SortOrder
    amount?: SortOrder
    balanceSnapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type PointLedgerSumOrderByAggregateInput = {
    ledgerId?: SortOrder
    corporateId?: SortOrder
    amount?: SortOrder
    balanceSnapshot?: SortOrder
  }

  export type CorporateCouponCountOrderByAggregateInput = {
    couponId?: SortOrder
    corporateId?: SortOrder
    couponType?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
  }

  export type CorporateCouponAvgOrderByAggregateInput = {
    couponId?: SortOrder
    corporateId?: SortOrder
  }

  export type CorporateCouponMaxOrderByAggregateInput = {
    couponId?: SortOrder
    corporateId?: SortOrder
    couponType?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
  }

  export type CorporateCouponMinOrderByAggregateInput = {
    couponId?: SortOrder
    corporateId?: SortOrder
    couponType?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
  }

  export type CorporateCouponSumOrderByAggregateInput = {
    couponId?: SortOrder
    corporateId?: SortOrder
  }

  export type ProductPricingRuleCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductPricingRuleCreateWithoutProductInput, ProductPricingRuleUncheckedCreateWithoutProductInput> | ProductPricingRuleCreateWithoutProductInput[] | ProductPricingRuleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductPricingRuleCreateOrConnectWithoutProductInput | ProductPricingRuleCreateOrConnectWithoutProductInput[]
    createMany?: ProductPricingRuleCreateManyProductInputEnvelope
    connect?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
  }

  export type ProductPricingRuleUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductPricingRuleCreateWithoutProductInput, ProductPricingRuleUncheckedCreateWithoutProductInput> | ProductPricingRuleCreateWithoutProductInput[] | ProductPricingRuleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductPricingRuleCreateOrConnectWithoutProductInput | ProductPricingRuleCreateOrConnectWithoutProductInput[]
    createMany?: ProductPricingRuleCreateManyProductInputEnvelope
    connect?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProductPricingRuleUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductPricingRuleCreateWithoutProductInput, ProductPricingRuleUncheckedCreateWithoutProductInput> | ProductPricingRuleCreateWithoutProductInput[] | ProductPricingRuleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductPricingRuleCreateOrConnectWithoutProductInput | ProductPricingRuleCreateOrConnectWithoutProductInput[]
    upsert?: ProductPricingRuleUpsertWithWhereUniqueWithoutProductInput | ProductPricingRuleUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductPricingRuleCreateManyProductInputEnvelope
    set?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
    disconnect?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
    delete?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
    connect?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
    update?: ProductPricingRuleUpdateWithWhereUniqueWithoutProductInput | ProductPricingRuleUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductPricingRuleUpdateManyWithWhereWithoutProductInput | ProductPricingRuleUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductPricingRuleScalarWhereInput | ProductPricingRuleScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductPricingRuleUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductPricingRuleCreateWithoutProductInput, ProductPricingRuleUncheckedCreateWithoutProductInput> | ProductPricingRuleCreateWithoutProductInput[] | ProductPricingRuleUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductPricingRuleCreateOrConnectWithoutProductInput | ProductPricingRuleCreateOrConnectWithoutProductInput[]
    upsert?: ProductPricingRuleUpsertWithWhereUniqueWithoutProductInput | ProductPricingRuleUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductPricingRuleCreateManyProductInputEnvelope
    set?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
    disconnect?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
    delete?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
    connect?: ProductPricingRuleWhereUniqueInput | ProductPricingRuleWhereUniqueInput[]
    update?: ProductPricingRuleUpdateWithWhereUniqueWithoutProductInput | ProductPricingRuleUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductPricingRuleUpdateManyWithWhereWithoutProductInput | ProductPricingRuleUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductPricingRuleScalarWhereInput | ProductPricingRuleScalarWhereInput[]
  }

  export type ServiceProductCreateNestedOneWithoutPricingRulesInput = {
    create?: XOR<ServiceProductCreateWithoutPricingRulesInput, ServiceProductUncheckedCreateWithoutPricingRulesInput>
    connectOrCreate?: ServiceProductCreateOrConnectWithoutPricingRulesInput
    connect?: ServiceProductWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ServiceProductUpdateOneRequiredWithoutPricingRulesNestedInput = {
    create?: XOR<ServiceProductCreateWithoutPricingRulesInput, ServiceProductUncheckedCreateWithoutPricingRulesInput>
    connectOrCreate?: ServiceProductCreateOrConnectWithoutPricingRulesInput
    upsert?: ServiceProductUpsertWithoutPricingRulesInput
    connect?: ServiceProductWhereUniqueInput
    update?: XOR<XOR<ServiceProductUpdateToOneWithWhereWithoutPricingRulesInput, ServiceProductUpdateWithoutPricingRulesInput>, ServiceProductUncheckedUpdateWithoutPricingRulesInput>
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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
  }

  export type ProductPricingRuleCreateWithoutProductInput = {
    ruleId?: bigint | number
    originalPrice: Decimal | DecimalJsLike | number | string
    salePrice: Decimal | DecimalJsLike | number | string
    validFrom: Date | string
    validUntil?: Date | string | null
  }

  export type ProductPricingRuleUncheckedCreateWithoutProductInput = {
    ruleId?: bigint | number
    originalPrice: Decimal | DecimalJsLike | number | string
    salePrice: Decimal | DecimalJsLike | number | string
    validFrom: Date | string
    validUntil?: Date | string | null
  }

  export type ProductPricingRuleCreateOrConnectWithoutProductInput = {
    where: ProductPricingRuleWhereUniqueInput
    create: XOR<ProductPricingRuleCreateWithoutProductInput, ProductPricingRuleUncheckedCreateWithoutProductInput>
  }

  export type ProductPricingRuleCreateManyProductInputEnvelope = {
    data: ProductPricingRuleCreateManyProductInput | ProductPricingRuleCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductPricingRuleUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductPricingRuleWhereUniqueInput
    update: XOR<ProductPricingRuleUpdateWithoutProductInput, ProductPricingRuleUncheckedUpdateWithoutProductInput>
    create: XOR<ProductPricingRuleCreateWithoutProductInput, ProductPricingRuleUncheckedCreateWithoutProductInput>
  }

  export type ProductPricingRuleUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductPricingRuleWhereUniqueInput
    data: XOR<ProductPricingRuleUpdateWithoutProductInput, ProductPricingRuleUncheckedUpdateWithoutProductInput>
  }

  export type ProductPricingRuleUpdateManyWithWhereWithoutProductInput = {
    where: ProductPricingRuleScalarWhereInput
    data: XOR<ProductPricingRuleUpdateManyMutationInput, ProductPricingRuleUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductPricingRuleScalarWhereInput = {
    AND?: ProductPricingRuleScalarWhereInput | ProductPricingRuleScalarWhereInput[]
    OR?: ProductPricingRuleScalarWhereInput[]
    NOT?: ProductPricingRuleScalarWhereInput | ProductPricingRuleScalarWhereInput[]
    ruleId?: BigIntFilter<"ProductPricingRule"> | bigint | number
    productId?: IntFilter<"ProductPricingRule"> | number
    originalPrice?: DecimalFilter<"ProductPricingRule"> | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFilter<"ProductPricingRule"> | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFilter<"ProductPricingRule"> | Date | string
    validUntil?: DateTimeNullableFilter<"ProductPricingRule"> | Date | string | null
  }

  export type ServiceProductCreateWithoutPricingRulesInput = {
    productCode: string
    productName: string
    productCategory: string
    isActive?: boolean
  }

  export type ServiceProductUncheckedCreateWithoutPricingRulesInput = {
    productId?: number
    productCode: string
    productName: string
    productCategory: string
    isActive?: boolean
  }

  export type ServiceProductCreateOrConnectWithoutPricingRulesInput = {
    where: ServiceProductWhereUniqueInput
    create: XOR<ServiceProductCreateWithoutPricingRulesInput, ServiceProductUncheckedCreateWithoutPricingRulesInput>
  }

  export type ServiceProductUpsertWithoutPricingRulesInput = {
    update: XOR<ServiceProductUpdateWithoutPricingRulesInput, ServiceProductUncheckedUpdateWithoutPricingRulesInput>
    create: XOR<ServiceProductCreateWithoutPricingRulesInput, ServiceProductUncheckedCreateWithoutPricingRulesInput>
    where?: ServiceProductWhereInput
  }

  export type ServiceProductUpdateToOneWithWhereWithoutPricingRulesInput = {
    where?: ServiceProductWhereInput
    data: XOR<ServiceProductUpdateWithoutPricingRulesInput, ServiceProductUncheckedUpdateWithoutPricingRulesInput>
  }

  export type ServiceProductUpdateWithoutPricingRulesInput = {
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiceProductUncheckedUpdateWithoutPricingRulesInput = {
    productId?: IntFieldUpdateOperationsInput | number
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemCreateWithoutOrderInput = {
    itemId?: bigint | number
    productId: number
    snapProductName: string
    snapSalePrice: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    itemId?: bigint | number
    productId: number
    snapProductName: string
    snapSalePrice: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    itemId?: BigIntFilter<"OrderItem"> | bigint | number
    orderId?: BigIntFilter<"OrderItem"> | bigint | number
    productId?: IntFilter<"OrderItem"> | number
    snapProductName?: StringFilter<"OrderItem"> | string
    snapSalePrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
  }

  export type OrderCreateWithoutItemsInput = {
    orderId?: bigint | number
    corporateId: bigint | number
    totalSaleAmount: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    orderId?: bigint | number
    corporateId: bigint | number
    totalSaleAmount: Decimal | DecimalJsLike | number | string
    status?: string
    createdAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    orderId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSaleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    orderId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSaleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPricingRuleCreateManyProductInput = {
    ruleId?: bigint | number
    originalPrice: Decimal | DecimalJsLike | number | string
    salePrice: Decimal | DecimalJsLike | number | string
    validFrom: Date | string
    validUntil?: Date | string | null
  }

  export type ProductPricingRuleUpdateWithoutProductInput = {
    ruleId?: BigIntFieldUpdateOperationsInput | bigint | number
    originalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductPricingRuleUncheckedUpdateWithoutProductInput = {
    ruleId?: BigIntFieldUpdateOperationsInput | bigint | number
    originalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductPricingRuleUncheckedUpdateManyWithoutProductInput = {
    ruleId?: BigIntFieldUpdateOperationsInput | bigint | number
    originalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    salePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrderItemCreateManyOrderInput = {
    itemId?: bigint | number
    productId: number
    snapProductName: string
    snapSalePrice: Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    itemId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    snapProductName?: StringFieldUpdateOperationsInput | string
    snapSalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    itemId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    snapProductName?: StringFieldUpdateOperationsInput | string
    snapSalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    itemId?: BigIntFieldUpdateOperationsInput | bigint | number
    productId?: IntFieldUpdateOperationsInput | number
    snapProductName?: StringFieldUpdateOperationsInput | string
    snapSalePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
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