
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CorporateProfile
 * 
 */
export type CorporateProfile = $Result.DefaultSelection<Prisma.$CorporateProfilePayload>
/**
 * Model IndividualProfile
 * 
 */
export type IndividualProfile = $Result.DefaultSelection<Prisma.$IndividualProfilePayload>
/**
 * Model TalentAccessLog
 * 
 */
export type TalentAccessLog = $Result.DefaultSelection<Prisma.$TalentAccessLogPayload>
/**
 * Model SocialAuth
 * 
 */
export type SocialAuth = $Result.DefaultSelection<Prisma.$SocialAuthPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  CORPORATE: 'CORPORATE',
  INDIVIDUAL: 'INDIVIDUAL'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const VerificationStatus: {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus]


export const SocialProvider: {
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
  KAKAO: 'KAKAO',
  APPLE: 'APPLE'
};

export type SocialProvider = (typeof SocialProvider)[keyof typeof SocialProvider]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type SocialProvider = $Enums.SocialProvider

export const SocialProvider: typeof $Enums.SocialProvider

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.corporateProfile`: Exposes CRUD operations for the **CorporateProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CorporateProfiles
    * const corporateProfiles = await prisma.corporateProfile.findMany()
    * ```
    */
  get corporateProfile(): Prisma.CorporateProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.individualProfile`: Exposes CRUD operations for the **IndividualProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IndividualProfiles
    * const individualProfiles = await prisma.individualProfile.findMany()
    * ```
    */
  get individualProfile(): Prisma.IndividualProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.talentAccessLog`: Exposes CRUD operations for the **TalentAccessLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TalentAccessLogs
    * const talentAccessLogs = await prisma.talentAccessLog.findMany()
    * ```
    */
  get talentAccessLog(): Prisma.TalentAccessLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.socialAuth`: Exposes CRUD operations for the **SocialAuth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SocialAuths
    * const socialAuths = await prisma.socialAuth.findMany()
    * ```
    */
  get socialAuth(): Prisma.SocialAuthDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    CorporateProfile: 'CorporateProfile',
    IndividualProfile: 'IndividualProfile',
    TalentAccessLog: 'TalentAccessLog',
    SocialAuth: 'SocialAuth'
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
      modelProps: "user" | "corporateProfile" | "individualProfile" | "talentAccessLog" | "socialAuth"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CorporateProfile: {
        payload: Prisma.$CorporateProfilePayload<ExtArgs>
        fields: Prisma.CorporateProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CorporateProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CorporateProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>
          }
          findFirst: {
            args: Prisma.CorporateProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CorporateProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>
          }
          findMany: {
            args: Prisma.CorporateProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>[]
          }
          create: {
            args: Prisma.CorporateProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>
          }
          createMany: {
            args: Prisma.CorporateProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CorporateProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>[]
          }
          delete: {
            args: Prisma.CorporateProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>
          }
          update: {
            args: Prisma.CorporateProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>
          }
          deleteMany: {
            args: Prisma.CorporateProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CorporateProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CorporateProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>[]
          }
          upsert: {
            args: Prisma.CorporateProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateProfilePayload>
          }
          aggregate: {
            args: Prisma.CorporateProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCorporateProfile>
          }
          groupBy: {
            args: Prisma.CorporateProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<CorporateProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.CorporateProfileCountArgs<ExtArgs>
            result: $Utils.Optional<CorporateProfileCountAggregateOutputType> | number
          }
        }
      }
      IndividualProfile: {
        payload: Prisma.$IndividualProfilePayload<ExtArgs>
        fields: Prisma.IndividualProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IndividualProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IndividualProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>
          }
          findFirst: {
            args: Prisma.IndividualProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IndividualProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>
          }
          findMany: {
            args: Prisma.IndividualProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>[]
          }
          create: {
            args: Prisma.IndividualProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>
          }
          createMany: {
            args: Prisma.IndividualProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IndividualProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>[]
          }
          delete: {
            args: Prisma.IndividualProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>
          }
          update: {
            args: Prisma.IndividualProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>
          }
          deleteMany: {
            args: Prisma.IndividualProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IndividualProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IndividualProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>[]
          }
          upsert: {
            args: Prisma.IndividualProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndividualProfilePayload>
          }
          aggregate: {
            args: Prisma.IndividualProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIndividualProfile>
          }
          groupBy: {
            args: Prisma.IndividualProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<IndividualProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.IndividualProfileCountArgs<ExtArgs>
            result: $Utils.Optional<IndividualProfileCountAggregateOutputType> | number
          }
        }
      }
      TalentAccessLog: {
        payload: Prisma.$TalentAccessLogPayload<ExtArgs>
        fields: Prisma.TalentAccessLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TalentAccessLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TalentAccessLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>
          }
          findFirst: {
            args: Prisma.TalentAccessLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TalentAccessLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>
          }
          findMany: {
            args: Prisma.TalentAccessLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>[]
          }
          create: {
            args: Prisma.TalentAccessLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>
          }
          createMany: {
            args: Prisma.TalentAccessLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TalentAccessLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>[]
          }
          delete: {
            args: Prisma.TalentAccessLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>
          }
          update: {
            args: Prisma.TalentAccessLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>
          }
          deleteMany: {
            args: Prisma.TalentAccessLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TalentAccessLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TalentAccessLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>[]
          }
          upsert: {
            args: Prisma.TalentAccessLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TalentAccessLogPayload>
          }
          aggregate: {
            args: Prisma.TalentAccessLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTalentAccessLog>
          }
          groupBy: {
            args: Prisma.TalentAccessLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TalentAccessLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.TalentAccessLogCountArgs<ExtArgs>
            result: $Utils.Optional<TalentAccessLogCountAggregateOutputType> | number
          }
        }
      }
      SocialAuth: {
        payload: Prisma.$SocialAuthPayload<ExtArgs>
        fields: Prisma.SocialAuthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SocialAuthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SocialAuthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>
          }
          findFirst: {
            args: Prisma.SocialAuthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SocialAuthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>
          }
          findMany: {
            args: Prisma.SocialAuthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>[]
          }
          create: {
            args: Prisma.SocialAuthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>
          }
          createMany: {
            args: Prisma.SocialAuthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SocialAuthCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>[]
          }
          delete: {
            args: Prisma.SocialAuthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>
          }
          update: {
            args: Prisma.SocialAuthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>
          }
          deleteMany: {
            args: Prisma.SocialAuthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SocialAuthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SocialAuthUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>[]
          }
          upsert: {
            args: Prisma.SocialAuthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SocialAuthPayload>
          }
          aggregate: {
            args: Prisma.SocialAuthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSocialAuth>
          }
          groupBy: {
            args: Prisma.SocialAuthGroupByArgs<ExtArgs>
            result: $Utils.Optional<SocialAuthGroupByOutputType>[]
          }
          count: {
            args: Prisma.SocialAuthCountArgs<ExtArgs>
            result: $Utils.Optional<SocialAuthCountAggregateOutputType> | number
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
    user?: UserOmit
    corporateProfile?: CorporateProfileOmit
    individualProfile?: IndividualProfileOmit
    talentAccessLog?: TalentAccessLogOmit
    socialAuth?: SocialAuthOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    socialAuths: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialAuths?: boolean | UserCountOutputTypeCountSocialAuthsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSocialAuthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialAuthWhereInput
  }


  /**
   * Count Type CorporateProfileCountOutputType
   */

  export type CorporateProfileCountOutputType = {
    accessLogs: number
  }

  export type CorporateProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessLogs?: boolean | CorporateProfileCountOutputTypeCountAccessLogsArgs
  }

  // Custom InputTypes
  /**
   * CorporateProfileCountOutputType without action
   */
  export type CorporateProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfileCountOutputType
     */
    select?: CorporateProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CorporateProfileCountOutputType without action
   */
  export type CorporateProfileCountOutputTypeCountAccessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TalentAccessLogWhereInput
  }


  /**
   * Count Type IndividualProfileCountOutputType
   */

  export type IndividualProfileCountOutputType = {
    accessLogs: number
  }

  export type IndividualProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessLogs?: boolean | IndividualProfileCountOutputTypeCountAccessLogsArgs
  }

  // Custom InputTypes
  /**
   * IndividualProfileCountOutputType without action
   */
  export type IndividualProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfileCountOutputType
     */
    select?: IndividualProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IndividualProfileCountOutputType without action
   */
  export type IndividualProfileCountOutputTypeCountAccessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TalentAccessLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    fullName: string | null
    userType: $Enums.UserType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    fullName: string | null
    userType: $Enums.UserType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    fullName: number
    userType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    userType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    userType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    userType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    password: string | null
    fullName: string | null
    userType: $Enums.UserType
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    userType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    corporate?: boolean | User$corporateArgs<ExtArgs>
    individual?: boolean | User$individualArgs<ExtArgs>
    socialAuths?: boolean | User$socialAuthsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    userType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    userType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    userType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "fullName" | "userType" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    corporate?: boolean | User$corporateArgs<ExtArgs>
    individual?: boolean | User$individualArgs<ExtArgs>
    socialAuths?: boolean | User$socialAuthsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      corporate: Prisma.$CorporateProfilePayload<ExtArgs> | null
      individual: Prisma.$IndividualProfilePayload<ExtArgs> | null
      socialAuths: Prisma.$SocialAuthPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      password: string | null
      fullName: string | null
      userType: $Enums.UserType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    corporate<T extends User$corporateArgs<ExtArgs> = {}>(args?: Subset<T, User$corporateArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    individual<T extends User$individualArgs<ExtArgs> = {}>(args?: Subset<T, User$individualArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    socialAuths<T extends User$socialAuthsArgs<ExtArgs> = {}>(args?: Subset<T, User$socialAuthsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly userType: FieldRef<"User", 'UserType'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.corporate
   */
  export type User$corporateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    where?: CorporateProfileWhereInput
  }

  /**
   * User.individual
   */
  export type User$individualArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    where?: IndividualProfileWhereInput
  }

  /**
   * User.socialAuths
   */
  export type User$socialAuthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    where?: SocialAuthWhereInput
    orderBy?: SocialAuthOrderByWithRelationInput | SocialAuthOrderByWithRelationInput[]
    cursor?: SocialAuthWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SocialAuthScalarFieldEnum | SocialAuthScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CorporateProfile
   */

  export type AggregateCorporateProfile = {
    _count: CorporateProfileCountAggregateOutputType | null
    _avg: CorporateProfileAvgAggregateOutputType | null
    _sum: CorporateProfileSumAggregateOutputType | null
    _min: CorporateProfileMinAggregateOutputType | null
    _max: CorporateProfileMaxAggregateOutputType | null
  }

  export type CorporateProfileAvgAggregateOutputType = {
    companyId: number | null
  }

  export type CorporateProfileSumAggregateOutputType = {
    companyId: bigint | null
  }

  export type CorporateProfileMinAggregateOutputType = {
    companyId: bigint | null
    userId: string | null
    companyName: string | null
    industryCode: string | null
    businessRegNo: string | null
  }

  export type CorporateProfileMaxAggregateOutputType = {
    companyId: bigint | null
    userId: string | null
    companyName: string | null
    industryCode: string | null
    businessRegNo: string | null
  }

  export type CorporateProfileCountAggregateOutputType = {
    companyId: number
    userId: number
    companyName: number
    industryCode: number
    businessRegNo: number
    _all: number
  }


  export type CorporateProfileAvgAggregateInputType = {
    companyId?: true
  }

  export type CorporateProfileSumAggregateInputType = {
    companyId?: true
  }

  export type CorporateProfileMinAggregateInputType = {
    companyId?: true
    userId?: true
    companyName?: true
    industryCode?: true
    businessRegNo?: true
  }

  export type CorporateProfileMaxAggregateInputType = {
    companyId?: true
    userId?: true
    companyName?: true
    industryCode?: true
    businessRegNo?: true
  }

  export type CorporateProfileCountAggregateInputType = {
    companyId?: true
    userId?: true
    companyName?: true
    industryCode?: true
    businessRegNo?: true
    _all?: true
  }

  export type CorporateProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorporateProfile to aggregate.
     */
    where?: CorporateProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateProfiles to fetch.
     */
    orderBy?: CorporateProfileOrderByWithRelationInput | CorporateProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CorporateProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CorporateProfiles
    **/
    _count?: true | CorporateProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CorporateProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CorporateProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CorporateProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CorporateProfileMaxAggregateInputType
  }

  export type GetCorporateProfileAggregateType<T extends CorporateProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateCorporateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCorporateProfile[P]>
      : GetScalarType<T[P], AggregateCorporateProfile[P]>
  }




  export type CorporateProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorporateProfileWhereInput
    orderBy?: CorporateProfileOrderByWithAggregationInput | CorporateProfileOrderByWithAggregationInput[]
    by: CorporateProfileScalarFieldEnum[] | CorporateProfileScalarFieldEnum
    having?: CorporateProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CorporateProfileCountAggregateInputType | true
    _avg?: CorporateProfileAvgAggregateInputType
    _sum?: CorporateProfileSumAggregateInputType
    _min?: CorporateProfileMinAggregateInputType
    _max?: CorporateProfileMaxAggregateInputType
  }

  export type CorporateProfileGroupByOutputType = {
    companyId: bigint
    userId: string
    companyName: string
    industryCode: string
    businessRegNo: string
    _count: CorporateProfileCountAggregateOutputType | null
    _avg: CorporateProfileAvgAggregateOutputType | null
    _sum: CorporateProfileSumAggregateOutputType | null
    _min: CorporateProfileMinAggregateOutputType | null
    _max: CorporateProfileMaxAggregateOutputType | null
  }

  type GetCorporateProfileGroupByPayload<T extends CorporateProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CorporateProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CorporateProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CorporateProfileGroupByOutputType[P]>
            : GetScalarType<T[P], CorporateProfileGroupByOutputType[P]>
        }
      >
    >


  export type CorporateProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    companyId?: boolean
    userId?: boolean
    companyName?: boolean
    industryCode?: boolean
    businessRegNo?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    accessLogs?: boolean | CorporateProfile$accessLogsArgs<ExtArgs>
    _count?: boolean | CorporateProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corporateProfile"]>

  export type CorporateProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    companyId?: boolean
    userId?: boolean
    companyName?: boolean
    industryCode?: boolean
    businessRegNo?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corporateProfile"]>

  export type CorporateProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    companyId?: boolean
    userId?: boolean
    companyName?: boolean
    industryCode?: boolean
    businessRegNo?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corporateProfile"]>

  export type CorporateProfileSelectScalar = {
    companyId?: boolean
    userId?: boolean
    companyName?: boolean
    industryCode?: boolean
    businessRegNo?: boolean
  }

  export type CorporateProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"companyId" | "userId" | "companyName" | "industryCode" | "businessRegNo", ExtArgs["result"]["corporateProfile"]>
  export type CorporateProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    accessLogs?: boolean | CorporateProfile$accessLogsArgs<ExtArgs>
    _count?: boolean | CorporateProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CorporateProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CorporateProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CorporateProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CorporateProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      accessLogs: Prisma.$TalentAccessLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      companyId: bigint
      userId: string
      companyName: string
      industryCode: string
      businessRegNo: string
    }, ExtArgs["result"]["corporateProfile"]>
    composites: {}
  }

  type CorporateProfileGetPayload<S extends boolean | null | undefined | CorporateProfileDefaultArgs> = $Result.GetResult<Prisma.$CorporateProfilePayload, S>

  type CorporateProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CorporateProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CorporateProfileCountAggregateInputType | true
    }

  export interface CorporateProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CorporateProfile'], meta: { name: 'CorporateProfile' } }
    /**
     * Find zero or one CorporateProfile that matches the filter.
     * @param {CorporateProfileFindUniqueArgs} args - Arguments to find a CorporateProfile
     * @example
     * // Get one CorporateProfile
     * const corporateProfile = await prisma.corporateProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CorporateProfileFindUniqueArgs>(args: SelectSubset<T, CorporateProfileFindUniqueArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CorporateProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CorporateProfileFindUniqueOrThrowArgs} args - Arguments to find a CorporateProfile
     * @example
     * // Get one CorporateProfile
     * const corporateProfile = await prisma.corporateProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CorporateProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, CorporateProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorporateProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateProfileFindFirstArgs} args - Arguments to find a CorporateProfile
     * @example
     * // Get one CorporateProfile
     * const corporateProfile = await prisma.corporateProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CorporateProfileFindFirstArgs>(args?: SelectSubset<T, CorporateProfileFindFirstArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorporateProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateProfileFindFirstOrThrowArgs} args - Arguments to find a CorporateProfile
     * @example
     * // Get one CorporateProfile
     * const corporateProfile = await prisma.corporateProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CorporateProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, CorporateProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CorporateProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CorporateProfiles
     * const corporateProfiles = await prisma.corporateProfile.findMany()
     * 
     * // Get first 10 CorporateProfiles
     * const corporateProfiles = await prisma.corporateProfile.findMany({ take: 10 })
     * 
     * // Only select the `companyId`
     * const corporateProfileWithCompanyIdOnly = await prisma.corporateProfile.findMany({ select: { companyId: true } })
     * 
     */
    findMany<T extends CorporateProfileFindManyArgs>(args?: SelectSubset<T, CorporateProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CorporateProfile.
     * @param {CorporateProfileCreateArgs} args - Arguments to create a CorporateProfile.
     * @example
     * // Create one CorporateProfile
     * const CorporateProfile = await prisma.corporateProfile.create({
     *   data: {
     *     // ... data to create a CorporateProfile
     *   }
     * })
     * 
     */
    create<T extends CorporateProfileCreateArgs>(args: SelectSubset<T, CorporateProfileCreateArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CorporateProfiles.
     * @param {CorporateProfileCreateManyArgs} args - Arguments to create many CorporateProfiles.
     * @example
     * // Create many CorporateProfiles
     * const corporateProfile = await prisma.corporateProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CorporateProfileCreateManyArgs>(args?: SelectSubset<T, CorporateProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CorporateProfiles and returns the data saved in the database.
     * @param {CorporateProfileCreateManyAndReturnArgs} args - Arguments to create many CorporateProfiles.
     * @example
     * // Create many CorporateProfiles
     * const corporateProfile = await prisma.corporateProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CorporateProfiles and only return the `companyId`
     * const corporateProfileWithCompanyIdOnly = await prisma.corporateProfile.createManyAndReturn({
     *   select: { companyId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CorporateProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, CorporateProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CorporateProfile.
     * @param {CorporateProfileDeleteArgs} args - Arguments to delete one CorporateProfile.
     * @example
     * // Delete one CorporateProfile
     * const CorporateProfile = await prisma.corporateProfile.delete({
     *   where: {
     *     // ... filter to delete one CorporateProfile
     *   }
     * })
     * 
     */
    delete<T extends CorporateProfileDeleteArgs>(args: SelectSubset<T, CorporateProfileDeleteArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CorporateProfile.
     * @param {CorporateProfileUpdateArgs} args - Arguments to update one CorporateProfile.
     * @example
     * // Update one CorporateProfile
     * const corporateProfile = await prisma.corporateProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CorporateProfileUpdateArgs>(args: SelectSubset<T, CorporateProfileUpdateArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CorporateProfiles.
     * @param {CorporateProfileDeleteManyArgs} args - Arguments to filter CorporateProfiles to delete.
     * @example
     * // Delete a few CorporateProfiles
     * const { count } = await prisma.corporateProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CorporateProfileDeleteManyArgs>(args?: SelectSubset<T, CorporateProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorporateProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CorporateProfiles
     * const corporateProfile = await prisma.corporateProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CorporateProfileUpdateManyArgs>(args: SelectSubset<T, CorporateProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorporateProfiles and returns the data updated in the database.
     * @param {CorporateProfileUpdateManyAndReturnArgs} args - Arguments to update many CorporateProfiles.
     * @example
     * // Update many CorporateProfiles
     * const corporateProfile = await prisma.corporateProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CorporateProfiles and only return the `companyId`
     * const corporateProfileWithCompanyIdOnly = await prisma.corporateProfile.updateManyAndReturn({
     *   select: { companyId: true },
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
    updateManyAndReturn<T extends CorporateProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, CorporateProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CorporateProfile.
     * @param {CorporateProfileUpsertArgs} args - Arguments to update or create a CorporateProfile.
     * @example
     * // Update or create a CorporateProfile
     * const corporateProfile = await prisma.corporateProfile.upsert({
     *   create: {
     *     // ... data to create a CorporateProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CorporateProfile we want to update
     *   }
     * })
     */
    upsert<T extends CorporateProfileUpsertArgs>(args: SelectSubset<T, CorporateProfileUpsertArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CorporateProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateProfileCountArgs} args - Arguments to filter CorporateProfiles to count.
     * @example
     * // Count the number of CorporateProfiles
     * const count = await prisma.corporateProfile.count({
     *   where: {
     *     // ... the filter for the CorporateProfiles we want to count
     *   }
     * })
    **/
    count<T extends CorporateProfileCountArgs>(
      args?: Subset<T, CorporateProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CorporateProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CorporateProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CorporateProfileAggregateArgs>(args: Subset<T, CorporateProfileAggregateArgs>): Prisma.PrismaPromise<GetCorporateProfileAggregateType<T>>

    /**
     * Group by CorporateProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateProfileGroupByArgs} args - Group by arguments.
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
      T extends CorporateProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CorporateProfileGroupByArgs['orderBy'] }
        : { orderBy?: CorporateProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CorporateProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorporateProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CorporateProfile model
   */
  readonly fields: CorporateProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CorporateProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CorporateProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    accessLogs<T extends CorporateProfile$accessLogsArgs<ExtArgs> = {}>(args?: Subset<T, CorporateProfile$accessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CorporateProfile model
   */
  interface CorporateProfileFieldRefs {
    readonly companyId: FieldRef<"CorporateProfile", 'BigInt'>
    readonly userId: FieldRef<"CorporateProfile", 'String'>
    readonly companyName: FieldRef<"CorporateProfile", 'String'>
    readonly industryCode: FieldRef<"CorporateProfile", 'String'>
    readonly businessRegNo: FieldRef<"CorporateProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CorporateProfile findUnique
   */
  export type CorporateProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CorporateProfile to fetch.
     */
    where: CorporateProfileWhereUniqueInput
  }

  /**
   * CorporateProfile findUniqueOrThrow
   */
  export type CorporateProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CorporateProfile to fetch.
     */
    where: CorporateProfileWhereUniqueInput
  }

  /**
   * CorporateProfile findFirst
   */
  export type CorporateProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CorporateProfile to fetch.
     */
    where?: CorporateProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateProfiles to fetch.
     */
    orderBy?: CorporateProfileOrderByWithRelationInput | CorporateProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorporateProfiles.
     */
    cursor?: CorporateProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorporateProfiles.
     */
    distinct?: CorporateProfileScalarFieldEnum | CorporateProfileScalarFieldEnum[]
  }

  /**
   * CorporateProfile findFirstOrThrow
   */
  export type CorporateProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CorporateProfile to fetch.
     */
    where?: CorporateProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateProfiles to fetch.
     */
    orderBy?: CorporateProfileOrderByWithRelationInput | CorporateProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorporateProfiles.
     */
    cursor?: CorporateProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorporateProfiles.
     */
    distinct?: CorporateProfileScalarFieldEnum | CorporateProfileScalarFieldEnum[]
  }

  /**
   * CorporateProfile findMany
   */
  export type CorporateProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * Filter, which CorporateProfiles to fetch.
     */
    where?: CorporateProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateProfiles to fetch.
     */
    orderBy?: CorporateProfileOrderByWithRelationInput | CorporateProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CorporateProfiles.
     */
    cursor?: CorporateProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateProfiles.
     */
    skip?: number
    distinct?: CorporateProfileScalarFieldEnum | CorporateProfileScalarFieldEnum[]
  }

  /**
   * CorporateProfile create
   */
  export type CorporateProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a CorporateProfile.
     */
    data: XOR<CorporateProfileCreateInput, CorporateProfileUncheckedCreateInput>
  }

  /**
   * CorporateProfile createMany
   */
  export type CorporateProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CorporateProfiles.
     */
    data: CorporateProfileCreateManyInput | CorporateProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorporateProfile createManyAndReturn
   */
  export type CorporateProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * The data used to create many CorporateProfiles.
     */
    data: CorporateProfileCreateManyInput | CorporateProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorporateProfile update
   */
  export type CorporateProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a CorporateProfile.
     */
    data: XOR<CorporateProfileUpdateInput, CorporateProfileUncheckedUpdateInput>
    /**
     * Choose, which CorporateProfile to update.
     */
    where: CorporateProfileWhereUniqueInput
  }

  /**
   * CorporateProfile updateMany
   */
  export type CorporateProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CorporateProfiles.
     */
    data: XOR<CorporateProfileUpdateManyMutationInput, CorporateProfileUncheckedUpdateManyInput>
    /**
     * Filter which CorporateProfiles to update
     */
    where?: CorporateProfileWhereInput
    /**
     * Limit how many CorporateProfiles to update.
     */
    limit?: number
  }

  /**
   * CorporateProfile updateManyAndReturn
   */
  export type CorporateProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * The data used to update CorporateProfiles.
     */
    data: XOR<CorporateProfileUpdateManyMutationInput, CorporateProfileUncheckedUpdateManyInput>
    /**
     * Filter which CorporateProfiles to update
     */
    where?: CorporateProfileWhereInput
    /**
     * Limit how many CorporateProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorporateProfile upsert
   */
  export type CorporateProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the CorporateProfile to update in case it exists.
     */
    where: CorporateProfileWhereUniqueInput
    /**
     * In case the CorporateProfile found by the `where` argument doesn't exist, create a new CorporateProfile with this data.
     */
    create: XOR<CorporateProfileCreateInput, CorporateProfileUncheckedCreateInput>
    /**
     * In case the CorporateProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CorporateProfileUpdateInput, CorporateProfileUncheckedUpdateInput>
  }

  /**
   * CorporateProfile delete
   */
  export type CorporateProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
    /**
     * Filter which CorporateProfile to delete.
     */
    where: CorporateProfileWhereUniqueInput
  }

  /**
   * CorporateProfile deleteMany
   */
  export type CorporateProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorporateProfiles to delete
     */
    where?: CorporateProfileWhereInput
    /**
     * Limit how many CorporateProfiles to delete.
     */
    limit?: number
  }

  /**
   * CorporateProfile.accessLogs
   */
  export type CorporateProfile$accessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    where?: TalentAccessLogWhereInput
    orderBy?: TalentAccessLogOrderByWithRelationInput | TalentAccessLogOrderByWithRelationInput[]
    cursor?: TalentAccessLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TalentAccessLogScalarFieldEnum | TalentAccessLogScalarFieldEnum[]
  }

  /**
   * CorporateProfile without action
   */
  export type CorporateProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateProfile
     */
    select?: CorporateProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateProfile
     */
    omit?: CorporateProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateProfileInclude<ExtArgs> | null
  }


  /**
   * Model IndividualProfile
   */

  export type AggregateIndividualProfile = {
    _count: IndividualProfileCountAggregateOutputType | null
    _avg: IndividualProfileAvgAggregateOutputType | null
    _sum: IndividualProfileSumAggregateOutputType | null
    _min: IndividualProfileMinAggregateOutputType | null
    _max: IndividualProfileMaxAggregateOutputType | null
  }

  export type IndividualProfileAvgAggregateOutputType = {
    individualId: number | null
    koreanLevel: number | null
  }

  export type IndividualProfileSumAggregateOutputType = {
    individualId: bigint | null
    koreanLevel: number | null
  }

  export type IndividualProfileMinAggregateOutputType = {
    individualId: bigint | null
    userId: string | null
    fullName: string | null
    visaStatus: string | null
    isVisaVerified: boolean | null
    koreanLevel: number | null
  }

  export type IndividualProfileMaxAggregateOutputType = {
    individualId: bigint | null
    userId: string | null
    fullName: string | null
    visaStatus: string | null
    isVisaVerified: boolean | null
    koreanLevel: number | null
  }

  export type IndividualProfileCountAggregateOutputType = {
    individualId: number
    userId: number
    fullName: number
    visaStatus: number
    isVisaVerified: number
    koreanLevel: number
    _all: number
  }


  export type IndividualProfileAvgAggregateInputType = {
    individualId?: true
    koreanLevel?: true
  }

  export type IndividualProfileSumAggregateInputType = {
    individualId?: true
    koreanLevel?: true
  }

  export type IndividualProfileMinAggregateInputType = {
    individualId?: true
    userId?: true
    fullName?: true
    visaStatus?: true
    isVisaVerified?: true
    koreanLevel?: true
  }

  export type IndividualProfileMaxAggregateInputType = {
    individualId?: true
    userId?: true
    fullName?: true
    visaStatus?: true
    isVisaVerified?: true
    koreanLevel?: true
  }

  export type IndividualProfileCountAggregateInputType = {
    individualId?: true
    userId?: true
    fullName?: true
    visaStatus?: true
    isVisaVerified?: true
    koreanLevel?: true
    _all?: true
  }

  export type IndividualProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IndividualProfile to aggregate.
     */
    where?: IndividualProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndividualProfiles to fetch.
     */
    orderBy?: IndividualProfileOrderByWithRelationInput | IndividualProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IndividualProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndividualProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndividualProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IndividualProfiles
    **/
    _count?: true | IndividualProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IndividualProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IndividualProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IndividualProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IndividualProfileMaxAggregateInputType
  }

  export type GetIndividualProfileAggregateType<T extends IndividualProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateIndividualProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIndividualProfile[P]>
      : GetScalarType<T[P], AggregateIndividualProfile[P]>
  }




  export type IndividualProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IndividualProfileWhereInput
    orderBy?: IndividualProfileOrderByWithAggregationInput | IndividualProfileOrderByWithAggregationInput[]
    by: IndividualProfileScalarFieldEnum[] | IndividualProfileScalarFieldEnum
    having?: IndividualProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IndividualProfileCountAggregateInputType | true
    _avg?: IndividualProfileAvgAggregateInputType
    _sum?: IndividualProfileSumAggregateInputType
    _min?: IndividualProfileMinAggregateInputType
    _max?: IndividualProfileMaxAggregateInputType
  }

  export type IndividualProfileGroupByOutputType = {
    individualId: bigint
    userId: string
    fullName: string
    visaStatus: string
    isVisaVerified: boolean
    koreanLevel: number
    _count: IndividualProfileCountAggregateOutputType | null
    _avg: IndividualProfileAvgAggregateOutputType | null
    _sum: IndividualProfileSumAggregateOutputType | null
    _min: IndividualProfileMinAggregateOutputType | null
    _max: IndividualProfileMaxAggregateOutputType | null
  }

  type GetIndividualProfileGroupByPayload<T extends IndividualProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IndividualProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IndividualProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IndividualProfileGroupByOutputType[P]>
            : GetScalarType<T[P], IndividualProfileGroupByOutputType[P]>
        }
      >
    >


  export type IndividualProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    individualId?: boolean
    userId?: boolean
    fullName?: boolean
    visaStatus?: boolean
    isVisaVerified?: boolean
    koreanLevel?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    accessLogs?: boolean | IndividualProfile$accessLogsArgs<ExtArgs>
    _count?: boolean | IndividualProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["individualProfile"]>

  export type IndividualProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    individualId?: boolean
    userId?: boolean
    fullName?: boolean
    visaStatus?: boolean
    isVisaVerified?: boolean
    koreanLevel?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["individualProfile"]>

  export type IndividualProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    individualId?: boolean
    userId?: boolean
    fullName?: boolean
    visaStatus?: boolean
    isVisaVerified?: boolean
    koreanLevel?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["individualProfile"]>

  export type IndividualProfileSelectScalar = {
    individualId?: boolean
    userId?: boolean
    fullName?: boolean
    visaStatus?: boolean
    isVisaVerified?: boolean
    koreanLevel?: boolean
  }

  export type IndividualProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"individualId" | "userId" | "fullName" | "visaStatus" | "isVisaVerified" | "koreanLevel", ExtArgs["result"]["individualProfile"]>
  export type IndividualProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    accessLogs?: boolean | IndividualProfile$accessLogsArgs<ExtArgs>
    _count?: boolean | IndividualProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IndividualProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type IndividualProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $IndividualProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IndividualProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      accessLogs: Prisma.$TalentAccessLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      individualId: bigint
      userId: string
      fullName: string
      visaStatus: string
      isVisaVerified: boolean
      koreanLevel: number
    }, ExtArgs["result"]["individualProfile"]>
    composites: {}
  }

  type IndividualProfileGetPayload<S extends boolean | null | undefined | IndividualProfileDefaultArgs> = $Result.GetResult<Prisma.$IndividualProfilePayload, S>

  type IndividualProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IndividualProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IndividualProfileCountAggregateInputType | true
    }

  export interface IndividualProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IndividualProfile'], meta: { name: 'IndividualProfile' } }
    /**
     * Find zero or one IndividualProfile that matches the filter.
     * @param {IndividualProfileFindUniqueArgs} args - Arguments to find a IndividualProfile
     * @example
     * // Get one IndividualProfile
     * const individualProfile = await prisma.individualProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IndividualProfileFindUniqueArgs>(args: SelectSubset<T, IndividualProfileFindUniqueArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IndividualProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IndividualProfileFindUniqueOrThrowArgs} args - Arguments to find a IndividualProfile
     * @example
     * // Get one IndividualProfile
     * const individualProfile = await prisma.individualProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IndividualProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, IndividualProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IndividualProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndividualProfileFindFirstArgs} args - Arguments to find a IndividualProfile
     * @example
     * // Get one IndividualProfile
     * const individualProfile = await prisma.individualProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IndividualProfileFindFirstArgs>(args?: SelectSubset<T, IndividualProfileFindFirstArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IndividualProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndividualProfileFindFirstOrThrowArgs} args - Arguments to find a IndividualProfile
     * @example
     * // Get one IndividualProfile
     * const individualProfile = await prisma.individualProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IndividualProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, IndividualProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IndividualProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndividualProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IndividualProfiles
     * const individualProfiles = await prisma.individualProfile.findMany()
     * 
     * // Get first 10 IndividualProfiles
     * const individualProfiles = await prisma.individualProfile.findMany({ take: 10 })
     * 
     * // Only select the `individualId`
     * const individualProfileWithIndividualIdOnly = await prisma.individualProfile.findMany({ select: { individualId: true } })
     * 
     */
    findMany<T extends IndividualProfileFindManyArgs>(args?: SelectSubset<T, IndividualProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IndividualProfile.
     * @param {IndividualProfileCreateArgs} args - Arguments to create a IndividualProfile.
     * @example
     * // Create one IndividualProfile
     * const IndividualProfile = await prisma.individualProfile.create({
     *   data: {
     *     // ... data to create a IndividualProfile
     *   }
     * })
     * 
     */
    create<T extends IndividualProfileCreateArgs>(args: SelectSubset<T, IndividualProfileCreateArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IndividualProfiles.
     * @param {IndividualProfileCreateManyArgs} args - Arguments to create many IndividualProfiles.
     * @example
     * // Create many IndividualProfiles
     * const individualProfile = await prisma.individualProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IndividualProfileCreateManyArgs>(args?: SelectSubset<T, IndividualProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IndividualProfiles and returns the data saved in the database.
     * @param {IndividualProfileCreateManyAndReturnArgs} args - Arguments to create many IndividualProfiles.
     * @example
     * // Create many IndividualProfiles
     * const individualProfile = await prisma.individualProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IndividualProfiles and only return the `individualId`
     * const individualProfileWithIndividualIdOnly = await prisma.individualProfile.createManyAndReturn({
     *   select: { individualId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IndividualProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, IndividualProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IndividualProfile.
     * @param {IndividualProfileDeleteArgs} args - Arguments to delete one IndividualProfile.
     * @example
     * // Delete one IndividualProfile
     * const IndividualProfile = await prisma.individualProfile.delete({
     *   where: {
     *     // ... filter to delete one IndividualProfile
     *   }
     * })
     * 
     */
    delete<T extends IndividualProfileDeleteArgs>(args: SelectSubset<T, IndividualProfileDeleteArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IndividualProfile.
     * @param {IndividualProfileUpdateArgs} args - Arguments to update one IndividualProfile.
     * @example
     * // Update one IndividualProfile
     * const individualProfile = await prisma.individualProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IndividualProfileUpdateArgs>(args: SelectSubset<T, IndividualProfileUpdateArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IndividualProfiles.
     * @param {IndividualProfileDeleteManyArgs} args - Arguments to filter IndividualProfiles to delete.
     * @example
     * // Delete a few IndividualProfiles
     * const { count } = await prisma.individualProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IndividualProfileDeleteManyArgs>(args?: SelectSubset<T, IndividualProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IndividualProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndividualProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IndividualProfiles
     * const individualProfile = await prisma.individualProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IndividualProfileUpdateManyArgs>(args: SelectSubset<T, IndividualProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IndividualProfiles and returns the data updated in the database.
     * @param {IndividualProfileUpdateManyAndReturnArgs} args - Arguments to update many IndividualProfiles.
     * @example
     * // Update many IndividualProfiles
     * const individualProfile = await prisma.individualProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IndividualProfiles and only return the `individualId`
     * const individualProfileWithIndividualIdOnly = await prisma.individualProfile.updateManyAndReturn({
     *   select: { individualId: true },
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
    updateManyAndReturn<T extends IndividualProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, IndividualProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IndividualProfile.
     * @param {IndividualProfileUpsertArgs} args - Arguments to update or create a IndividualProfile.
     * @example
     * // Update or create a IndividualProfile
     * const individualProfile = await prisma.individualProfile.upsert({
     *   create: {
     *     // ... data to create a IndividualProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IndividualProfile we want to update
     *   }
     * })
     */
    upsert<T extends IndividualProfileUpsertArgs>(args: SelectSubset<T, IndividualProfileUpsertArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IndividualProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndividualProfileCountArgs} args - Arguments to filter IndividualProfiles to count.
     * @example
     * // Count the number of IndividualProfiles
     * const count = await prisma.individualProfile.count({
     *   where: {
     *     // ... the filter for the IndividualProfiles we want to count
     *   }
     * })
    **/
    count<T extends IndividualProfileCountArgs>(
      args?: Subset<T, IndividualProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IndividualProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IndividualProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndividualProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IndividualProfileAggregateArgs>(args: Subset<T, IndividualProfileAggregateArgs>): Prisma.PrismaPromise<GetIndividualProfileAggregateType<T>>

    /**
     * Group by IndividualProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndividualProfileGroupByArgs} args - Group by arguments.
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
      T extends IndividualProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IndividualProfileGroupByArgs['orderBy'] }
        : { orderBy?: IndividualProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IndividualProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndividualProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IndividualProfile model
   */
  readonly fields: IndividualProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IndividualProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IndividualProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    accessLogs<T extends IndividualProfile$accessLogsArgs<ExtArgs> = {}>(args?: Subset<T, IndividualProfile$accessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the IndividualProfile model
   */
  interface IndividualProfileFieldRefs {
    readonly individualId: FieldRef<"IndividualProfile", 'BigInt'>
    readonly userId: FieldRef<"IndividualProfile", 'String'>
    readonly fullName: FieldRef<"IndividualProfile", 'String'>
    readonly visaStatus: FieldRef<"IndividualProfile", 'String'>
    readonly isVisaVerified: FieldRef<"IndividualProfile", 'Boolean'>
    readonly koreanLevel: FieldRef<"IndividualProfile", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * IndividualProfile findUnique
   */
  export type IndividualProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * Filter, which IndividualProfile to fetch.
     */
    where: IndividualProfileWhereUniqueInput
  }

  /**
   * IndividualProfile findUniqueOrThrow
   */
  export type IndividualProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * Filter, which IndividualProfile to fetch.
     */
    where: IndividualProfileWhereUniqueInput
  }

  /**
   * IndividualProfile findFirst
   */
  export type IndividualProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * Filter, which IndividualProfile to fetch.
     */
    where?: IndividualProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndividualProfiles to fetch.
     */
    orderBy?: IndividualProfileOrderByWithRelationInput | IndividualProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IndividualProfiles.
     */
    cursor?: IndividualProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndividualProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndividualProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IndividualProfiles.
     */
    distinct?: IndividualProfileScalarFieldEnum | IndividualProfileScalarFieldEnum[]
  }

  /**
   * IndividualProfile findFirstOrThrow
   */
  export type IndividualProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * Filter, which IndividualProfile to fetch.
     */
    where?: IndividualProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndividualProfiles to fetch.
     */
    orderBy?: IndividualProfileOrderByWithRelationInput | IndividualProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IndividualProfiles.
     */
    cursor?: IndividualProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndividualProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndividualProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IndividualProfiles.
     */
    distinct?: IndividualProfileScalarFieldEnum | IndividualProfileScalarFieldEnum[]
  }

  /**
   * IndividualProfile findMany
   */
  export type IndividualProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * Filter, which IndividualProfiles to fetch.
     */
    where?: IndividualProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndividualProfiles to fetch.
     */
    orderBy?: IndividualProfileOrderByWithRelationInput | IndividualProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IndividualProfiles.
     */
    cursor?: IndividualProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndividualProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndividualProfiles.
     */
    skip?: number
    distinct?: IndividualProfileScalarFieldEnum | IndividualProfileScalarFieldEnum[]
  }

  /**
   * IndividualProfile create
   */
  export type IndividualProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a IndividualProfile.
     */
    data: XOR<IndividualProfileCreateInput, IndividualProfileUncheckedCreateInput>
  }

  /**
   * IndividualProfile createMany
   */
  export type IndividualProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IndividualProfiles.
     */
    data: IndividualProfileCreateManyInput | IndividualProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IndividualProfile createManyAndReturn
   */
  export type IndividualProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * The data used to create many IndividualProfiles.
     */
    data: IndividualProfileCreateManyInput | IndividualProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IndividualProfile update
   */
  export type IndividualProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a IndividualProfile.
     */
    data: XOR<IndividualProfileUpdateInput, IndividualProfileUncheckedUpdateInput>
    /**
     * Choose, which IndividualProfile to update.
     */
    where: IndividualProfileWhereUniqueInput
  }

  /**
   * IndividualProfile updateMany
   */
  export type IndividualProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IndividualProfiles.
     */
    data: XOR<IndividualProfileUpdateManyMutationInput, IndividualProfileUncheckedUpdateManyInput>
    /**
     * Filter which IndividualProfiles to update
     */
    where?: IndividualProfileWhereInput
    /**
     * Limit how many IndividualProfiles to update.
     */
    limit?: number
  }

  /**
   * IndividualProfile updateManyAndReturn
   */
  export type IndividualProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * The data used to update IndividualProfiles.
     */
    data: XOR<IndividualProfileUpdateManyMutationInput, IndividualProfileUncheckedUpdateManyInput>
    /**
     * Filter which IndividualProfiles to update
     */
    where?: IndividualProfileWhereInput
    /**
     * Limit how many IndividualProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * IndividualProfile upsert
   */
  export type IndividualProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the IndividualProfile to update in case it exists.
     */
    where: IndividualProfileWhereUniqueInput
    /**
     * In case the IndividualProfile found by the `where` argument doesn't exist, create a new IndividualProfile with this data.
     */
    create: XOR<IndividualProfileCreateInput, IndividualProfileUncheckedCreateInput>
    /**
     * In case the IndividualProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IndividualProfileUpdateInput, IndividualProfileUncheckedUpdateInput>
  }

  /**
   * IndividualProfile delete
   */
  export type IndividualProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
    /**
     * Filter which IndividualProfile to delete.
     */
    where: IndividualProfileWhereUniqueInput
  }

  /**
   * IndividualProfile deleteMany
   */
  export type IndividualProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IndividualProfiles to delete
     */
    where?: IndividualProfileWhereInput
    /**
     * Limit how many IndividualProfiles to delete.
     */
    limit?: number
  }

  /**
   * IndividualProfile.accessLogs
   */
  export type IndividualProfile$accessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    where?: TalentAccessLogWhereInput
    orderBy?: TalentAccessLogOrderByWithRelationInput | TalentAccessLogOrderByWithRelationInput[]
    cursor?: TalentAccessLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TalentAccessLogScalarFieldEnum | TalentAccessLogScalarFieldEnum[]
  }

  /**
   * IndividualProfile without action
   */
  export type IndividualProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndividualProfile
     */
    select?: IndividualProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndividualProfile
     */
    omit?: IndividualProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndividualProfileInclude<ExtArgs> | null
  }


  /**
   * Model TalentAccessLog
   */

  export type AggregateTalentAccessLog = {
    _count: TalentAccessLogCountAggregateOutputType | null
    _avg: TalentAccessLogAvgAggregateOutputType | null
    _sum: TalentAccessLogSumAggregateOutputType | null
    _min: TalentAccessLogMinAggregateOutputType | null
    _max: TalentAccessLogMaxAggregateOutputType | null
  }

  export type TalentAccessLogAvgAggregateOutputType = {
    accessId: number | null
    corporateId: number | null
    individualId: number | null
  }

  export type TalentAccessLogSumAggregateOutputType = {
    accessId: bigint | null
    corporateId: bigint | null
    individualId: bigint | null
  }

  export type TalentAccessLogMinAggregateOutputType = {
    accessId: bigint | null
    corporateId: bigint | null
    individualId: bigint | null
    accessedAt: Date | null
  }

  export type TalentAccessLogMaxAggregateOutputType = {
    accessId: bigint | null
    corporateId: bigint | null
    individualId: bigint | null
    accessedAt: Date | null
  }

  export type TalentAccessLogCountAggregateOutputType = {
    accessId: number
    corporateId: number
    individualId: number
    accessedAt: number
    _all: number
  }


  export type TalentAccessLogAvgAggregateInputType = {
    accessId?: true
    corporateId?: true
    individualId?: true
  }

  export type TalentAccessLogSumAggregateInputType = {
    accessId?: true
    corporateId?: true
    individualId?: true
  }

  export type TalentAccessLogMinAggregateInputType = {
    accessId?: true
    corporateId?: true
    individualId?: true
    accessedAt?: true
  }

  export type TalentAccessLogMaxAggregateInputType = {
    accessId?: true
    corporateId?: true
    individualId?: true
    accessedAt?: true
  }

  export type TalentAccessLogCountAggregateInputType = {
    accessId?: true
    corporateId?: true
    individualId?: true
    accessedAt?: true
    _all?: true
  }

  export type TalentAccessLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TalentAccessLog to aggregate.
     */
    where?: TalentAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TalentAccessLogs to fetch.
     */
    orderBy?: TalentAccessLogOrderByWithRelationInput | TalentAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TalentAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TalentAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TalentAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TalentAccessLogs
    **/
    _count?: true | TalentAccessLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TalentAccessLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TalentAccessLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TalentAccessLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TalentAccessLogMaxAggregateInputType
  }

  export type GetTalentAccessLogAggregateType<T extends TalentAccessLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTalentAccessLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTalentAccessLog[P]>
      : GetScalarType<T[P], AggregateTalentAccessLog[P]>
  }




  export type TalentAccessLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TalentAccessLogWhereInput
    orderBy?: TalentAccessLogOrderByWithAggregationInput | TalentAccessLogOrderByWithAggregationInput[]
    by: TalentAccessLogScalarFieldEnum[] | TalentAccessLogScalarFieldEnum
    having?: TalentAccessLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TalentAccessLogCountAggregateInputType | true
    _avg?: TalentAccessLogAvgAggregateInputType
    _sum?: TalentAccessLogSumAggregateInputType
    _min?: TalentAccessLogMinAggregateInputType
    _max?: TalentAccessLogMaxAggregateInputType
  }

  export type TalentAccessLogGroupByOutputType = {
    accessId: bigint
    corporateId: bigint
    individualId: bigint
    accessedAt: Date
    _count: TalentAccessLogCountAggregateOutputType | null
    _avg: TalentAccessLogAvgAggregateOutputType | null
    _sum: TalentAccessLogSumAggregateOutputType | null
    _min: TalentAccessLogMinAggregateOutputType | null
    _max: TalentAccessLogMaxAggregateOutputType | null
  }

  type GetTalentAccessLogGroupByPayload<T extends TalentAccessLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TalentAccessLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TalentAccessLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TalentAccessLogGroupByOutputType[P]>
            : GetScalarType<T[P], TalentAccessLogGroupByOutputType[P]>
        }
      >
    >


  export type TalentAccessLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessId?: boolean
    corporateId?: boolean
    individualId?: boolean
    accessedAt?: boolean
    corporate?: boolean | CorporateProfileDefaultArgs<ExtArgs>
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["talentAccessLog"]>

  export type TalentAccessLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessId?: boolean
    corporateId?: boolean
    individualId?: boolean
    accessedAt?: boolean
    corporate?: boolean | CorporateProfileDefaultArgs<ExtArgs>
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["talentAccessLog"]>

  export type TalentAccessLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessId?: boolean
    corporateId?: boolean
    individualId?: boolean
    accessedAt?: boolean
    corporate?: boolean | CorporateProfileDefaultArgs<ExtArgs>
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["talentAccessLog"]>

  export type TalentAccessLogSelectScalar = {
    accessId?: boolean
    corporateId?: boolean
    individualId?: boolean
    accessedAt?: boolean
  }

  export type TalentAccessLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"accessId" | "corporateId" | "individualId" | "accessedAt", ExtArgs["result"]["talentAccessLog"]>
  export type TalentAccessLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    corporate?: boolean | CorporateProfileDefaultArgs<ExtArgs>
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }
  export type TalentAccessLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    corporate?: boolean | CorporateProfileDefaultArgs<ExtArgs>
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }
  export type TalentAccessLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    corporate?: boolean | CorporateProfileDefaultArgs<ExtArgs>
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }

  export type $TalentAccessLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TalentAccessLog"
    objects: {
      corporate: Prisma.$CorporateProfilePayload<ExtArgs>
      individual: Prisma.$IndividualProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      accessId: bigint
      corporateId: bigint
      individualId: bigint
      accessedAt: Date
    }, ExtArgs["result"]["talentAccessLog"]>
    composites: {}
  }

  type TalentAccessLogGetPayload<S extends boolean | null | undefined | TalentAccessLogDefaultArgs> = $Result.GetResult<Prisma.$TalentAccessLogPayload, S>

  type TalentAccessLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TalentAccessLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TalentAccessLogCountAggregateInputType | true
    }

  export interface TalentAccessLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TalentAccessLog'], meta: { name: 'TalentAccessLog' } }
    /**
     * Find zero or one TalentAccessLog that matches the filter.
     * @param {TalentAccessLogFindUniqueArgs} args - Arguments to find a TalentAccessLog
     * @example
     * // Get one TalentAccessLog
     * const talentAccessLog = await prisma.talentAccessLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TalentAccessLogFindUniqueArgs>(args: SelectSubset<T, TalentAccessLogFindUniqueArgs<ExtArgs>>): Prisma__TalentAccessLogClient<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TalentAccessLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TalentAccessLogFindUniqueOrThrowArgs} args - Arguments to find a TalentAccessLog
     * @example
     * // Get one TalentAccessLog
     * const talentAccessLog = await prisma.talentAccessLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TalentAccessLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TalentAccessLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TalentAccessLogClient<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TalentAccessLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentAccessLogFindFirstArgs} args - Arguments to find a TalentAccessLog
     * @example
     * // Get one TalentAccessLog
     * const talentAccessLog = await prisma.talentAccessLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TalentAccessLogFindFirstArgs>(args?: SelectSubset<T, TalentAccessLogFindFirstArgs<ExtArgs>>): Prisma__TalentAccessLogClient<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TalentAccessLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentAccessLogFindFirstOrThrowArgs} args - Arguments to find a TalentAccessLog
     * @example
     * // Get one TalentAccessLog
     * const talentAccessLog = await prisma.talentAccessLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TalentAccessLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TalentAccessLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TalentAccessLogClient<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TalentAccessLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentAccessLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TalentAccessLogs
     * const talentAccessLogs = await prisma.talentAccessLog.findMany()
     * 
     * // Get first 10 TalentAccessLogs
     * const talentAccessLogs = await prisma.talentAccessLog.findMany({ take: 10 })
     * 
     * // Only select the `accessId`
     * const talentAccessLogWithAccessIdOnly = await prisma.talentAccessLog.findMany({ select: { accessId: true } })
     * 
     */
    findMany<T extends TalentAccessLogFindManyArgs>(args?: SelectSubset<T, TalentAccessLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TalentAccessLog.
     * @param {TalentAccessLogCreateArgs} args - Arguments to create a TalentAccessLog.
     * @example
     * // Create one TalentAccessLog
     * const TalentAccessLog = await prisma.talentAccessLog.create({
     *   data: {
     *     // ... data to create a TalentAccessLog
     *   }
     * })
     * 
     */
    create<T extends TalentAccessLogCreateArgs>(args: SelectSubset<T, TalentAccessLogCreateArgs<ExtArgs>>): Prisma__TalentAccessLogClient<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TalentAccessLogs.
     * @param {TalentAccessLogCreateManyArgs} args - Arguments to create many TalentAccessLogs.
     * @example
     * // Create many TalentAccessLogs
     * const talentAccessLog = await prisma.talentAccessLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TalentAccessLogCreateManyArgs>(args?: SelectSubset<T, TalentAccessLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TalentAccessLogs and returns the data saved in the database.
     * @param {TalentAccessLogCreateManyAndReturnArgs} args - Arguments to create many TalentAccessLogs.
     * @example
     * // Create many TalentAccessLogs
     * const talentAccessLog = await prisma.talentAccessLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TalentAccessLogs and only return the `accessId`
     * const talentAccessLogWithAccessIdOnly = await prisma.talentAccessLog.createManyAndReturn({
     *   select: { accessId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TalentAccessLogCreateManyAndReturnArgs>(args?: SelectSubset<T, TalentAccessLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TalentAccessLog.
     * @param {TalentAccessLogDeleteArgs} args - Arguments to delete one TalentAccessLog.
     * @example
     * // Delete one TalentAccessLog
     * const TalentAccessLog = await prisma.talentAccessLog.delete({
     *   where: {
     *     // ... filter to delete one TalentAccessLog
     *   }
     * })
     * 
     */
    delete<T extends TalentAccessLogDeleteArgs>(args: SelectSubset<T, TalentAccessLogDeleteArgs<ExtArgs>>): Prisma__TalentAccessLogClient<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TalentAccessLog.
     * @param {TalentAccessLogUpdateArgs} args - Arguments to update one TalentAccessLog.
     * @example
     * // Update one TalentAccessLog
     * const talentAccessLog = await prisma.talentAccessLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TalentAccessLogUpdateArgs>(args: SelectSubset<T, TalentAccessLogUpdateArgs<ExtArgs>>): Prisma__TalentAccessLogClient<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TalentAccessLogs.
     * @param {TalentAccessLogDeleteManyArgs} args - Arguments to filter TalentAccessLogs to delete.
     * @example
     * // Delete a few TalentAccessLogs
     * const { count } = await prisma.talentAccessLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TalentAccessLogDeleteManyArgs>(args?: SelectSubset<T, TalentAccessLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TalentAccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentAccessLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TalentAccessLogs
     * const talentAccessLog = await prisma.talentAccessLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TalentAccessLogUpdateManyArgs>(args: SelectSubset<T, TalentAccessLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TalentAccessLogs and returns the data updated in the database.
     * @param {TalentAccessLogUpdateManyAndReturnArgs} args - Arguments to update many TalentAccessLogs.
     * @example
     * // Update many TalentAccessLogs
     * const talentAccessLog = await prisma.talentAccessLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TalentAccessLogs and only return the `accessId`
     * const talentAccessLogWithAccessIdOnly = await prisma.talentAccessLog.updateManyAndReturn({
     *   select: { accessId: true },
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
    updateManyAndReturn<T extends TalentAccessLogUpdateManyAndReturnArgs>(args: SelectSubset<T, TalentAccessLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TalentAccessLog.
     * @param {TalentAccessLogUpsertArgs} args - Arguments to update or create a TalentAccessLog.
     * @example
     * // Update or create a TalentAccessLog
     * const talentAccessLog = await prisma.talentAccessLog.upsert({
     *   create: {
     *     // ... data to create a TalentAccessLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TalentAccessLog we want to update
     *   }
     * })
     */
    upsert<T extends TalentAccessLogUpsertArgs>(args: SelectSubset<T, TalentAccessLogUpsertArgs<ExtArgs>>): Prisma__TalentAccessLogClient<$Result.GetResult<Prisma.$TalentAccessLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TalentAccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentAccessLogCountArgs} args - Arguments to filter TalentAccessLogs to count.
     * @example
     * // Count the number of TalentAccessLogs
     * const count = await prisma.talentAccessLog.count({
     *   where: {
     *     // ... the filter for the TalentAccessLogs we want to count
     *   }
     * })
    **/
    count<T extends TalentAccessLogCountArgs>(
      args?: Subset<T, TalentAccessLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TalentAccessLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TalentAccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentAccessLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TalentAccessLogAggregateArgs>(args: Subset<T, TalentAccessLogAggregateArgs>): Prisma.PrismaPromise<GetTalentAccessLogAggregateType<T>>

    /**
     * Group by TalentAccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TalentAccessLogGroupByArgs} args - Group by arguments.
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
      T extends TalentAccessLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TalentAccessLogGroupByArgs['orderBy'] }
        : { orderBy?: TalentAccessLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TalentAccessLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTalentAccessLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TalentAccessLog model
   */
  readonly fields: TalentAccessLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TalentAccessLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TalentAccessLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    corporate<T extends CorporateProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CorporateProfileDefaultArgs<ExtArgs>>): Prisma__CorporateProfileClient<$Result.GetResult<Prisma.$CorporateProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    individual<T extends IndividualProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IndividualProfileDefaultArgs<ExtArgs>>): Prisma__IndividualProfileClient<$Result.GetResult<Prisma.$IndividualProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TalentAccessLog model
   */
  interface TalentAccessLogFieldRefs {
    readonly accessId: FieldRef<"TalentAccessLog", 'BigInt'>
    readonly corporateId: FieldRef<"TalentAccessLog", 'BigInt'>
    readonly individualId: FieldRef<"TalentAccessLog", 'BigInt'>
    readonly accessedAt: FieldRef<"TalentAccessLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TalentAccessLog findUnique
   */
  export type TalentAccessLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which TalentAccessLog to fetch.
     */
    where: TalentAccessLogWhereUniqueInput
  }

  /**
   * TalentAccessLog findUniqueOrThrow
   */
  export type TalentAccessLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which TalentAccessLog to fetch.
     */
    where: TalentAccessLogWhereUniqueInput
  }

  /**
   * TalentAccessLog findFirst
   */
  export type TalentAccessLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which TalentAccessLog to fetch.
     */
    where?: TalentAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TalentAccessLogs to fetch.
     */
    orderBy?: TalentAccessLogOrderByWithRelationInput | TalentAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TalentAccessLogs.
     */
    cursor?: TalentAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TalentAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TalentAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TalentAccessLogs.
     */
    distinct?: TalentAccessLogScalarFieldEnum | TalentAccessLogScalarFieldEnum[]
  }

  /**
   * TalentAccessLog findFirstOrThrow
   */
  export type TalentAccessLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which TalentAccessLog to fetch.
     */
    where?: TalentAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TalentAccessLogs to fetch.
     */
    orderBy?: TalentAccessLogOrderByWithRelationInput | TalentAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TalentAccessLogs.
     */
    cursor?: TalentAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TalentAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TalentAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TalentAccessLogs.
     */
    distinct?: TalentAccessLogScalarFieldEnum | TalentAccessLogScalarFieldEnum[]
  }

  /**
   * TalentAccessLog findMany
   */
  export type TalentAccessLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which TalentAccessLogs to fetch.
     */
    where?: TalentAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TalentAccessLogs to fetch.
     */
    orderBy?: TalentAccessLogOrderByWithRelationInput | TalentAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TalentAccessLogs.
     */
    cursor?: TalentAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TalentAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TalentAccessLogs.
     */
    skip?: number
    distinct?: TalentAccessLogScalarFieldEnum | TalentAccessLogScalarFieldEnum[]
  }

  /**
   * TalentAccessLog create
   */
  export type TalentAccessLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * The data needed to create a TalentAccessLog.
     */
    data: XOR<TalentAccessLogCreateInput, TalentAccessLogUncheckedCreateInput>
  }

  /**
   * TalentAccessLog createMany
   */
  export type TalentAccessLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TalentAccessLogs.
     */
    data: TalentAccessLogCreateManyInput | TalentAccessLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TalentAccessLog createManyAndReturn
   */
  export type TalentAccessLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * The data used to create many TalentAccessLogs.
     */
    data: TalentAccessLogCreateManyInput | TalentAccessLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TalentAccessLog update
   */
  export type TalentAccessLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * The data needed to update a TalentAccessLog.
     */
    data: XOR<TalentAccessLogUpdateInput, TalentAccessLogUncheckedUpdateInput>
    /**
     * Choose, which TalentAccessLog to update.
     */
    where: TalentAccessLogWhereUniqueInput
  }

  /**
   * TalentAccessLog updateMany
   */
  export type TalentAccessLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TalentAccessLogs.
     */
    data: XOR<TalentAccessLogUpdateManyMutationInput, TalentAccessLogUncheckedUpdateManyInput>
    /**
     * Filter which TalentAccessLogs to update
     */
    where?: TalentAccessLogWhereInput
    /**
     * Limit how many TalentAccessLogs to update.
     */
    limit?: number
  }

  /**
   * TalentAccessLog updateManyAndReturn
   */
  export type TalentAccessLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * The data used to update TalentAccessLogs.
     */
    data: XOR<TalentAccessLogUpdateManyMutationInput, TalentAccessLogUncheckedUpdateManyInput>
    /**
     * Filter which TalentAccessLogs to update
     */
    where?: TalentAccessLogWhereInput
    /**
     * Limit how many TalentAccessLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TalentAccessLog upsert
   */
  export type TalentAccessLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * The filter to search for the TalentAccessLog to update in case it exists.
     */
    where: TalentAccessLogWhereUniqueInput
    /**
     * In case the TalentAccessLog found by the `where` argument doesn't exist, create a new TalentAccessLog with this data.
     */
    create: XOR<TalentAccessLogCreateInput, TalentAccessLogUncheckedCreateInput>
    /**
     * In case the TalentAccessLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TalentAccessLogUpdateInput, TalentAccessLogUncheckedUpdateInput>
  }

  /**
   * TalentAccessLog delete
   */
  export type TalentAccessLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
    /**
     * Filter which TalentAccessLog to delete.
     */
    where: TalentAccessLogWhereUniqueInput
  }

  /**
   * TalentAccessLog deleteMany
   */
  export type TalentAccessLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TalentAccessLogs to delete
     */
    where?: TalentAccessLogWhereInput
    /**
     * Limit how many TalentAccessLogs to delete.
     */
    limit?: number
  }

  /**
   * TalentAccessLog without action
   */
  export type TalentAccessLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TalentAccessLog
     */
    select?: TalentAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TalentAccessLog
     */
    omit?: TalentAccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TalentAccessLogInclude<ExtArgs> | null
  }


  /**
   * Model SocialAuth
   */

  export type AggregateSocialAuth = {
    _count: SocialAuthCountAggregateOutputType | null
    _min: SocialAuthMinAggregateOutputType | null
    _max: SocialAuthMaxAggregateOutputType | null
  }

  export type SocialAuthMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: $Enums.SocialProvider | null
    providerId: string | null
  }

  export type SocialAuthMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: $Enums.SocialProvider | null
    providerId: string | null
  }

  export type SocialAuthCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerId: number
    _all: number
  }


  export type SocialAuthMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
  }

  export type SocialAuthMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
  }

  export type SocialAuthCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    _all?: true
  }

  export type SocialAuthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SocialAuth to aggregate.
     */
    where?: SocialAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialAuths to fetch.
     */
    orderBy?: SocialAuthOrderByWithRelationInput | SocialAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SocialAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SocialAuths
    **/
    _count?: true | SocialAuthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SocialAuthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SocialAuthMaxAggregateInputType
  }

  export type GetSocialAuthAggregateType<T extends SocialAuthAggregateArgs> = {
        [P in keyof T & keyof AggregateSocialAuth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSocialAuth[P]>
      : GetScalarType<T[P], AggregateSocialAuth[P]>
  }




  export type SocialAuthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SocialAuthWhereInput
    orderBy?: SocialAuthOrderByWithAggregationInput | SocialAuthOrderByWithAggregationInput[]
    by: SocialAuthScalarFieldEnum[] | SocialAuthScalarFieldEnum
    having?: SocialAuthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SocialAuthCountAggregateInputType | true
    _min?: SocialAuthMinAggregateInputType
    _max?: SocialAuthMaxAggregateInputType
  }

  export type SocialAuthGroupByOutputType = {
    id: string
    userId: string
    provider: $Enums.SocialProvider
    providerId: string
    _count: SocialAuthCountAggregateOutputType | null
    _min: SocialAuthMinAggregateOutputType | null
    _max: SocialAuthMaxAggregateOutputType | null
  }

  type GetSocialAuthGroupByPayload<T extends SocialAuthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SocialAuthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SocialAuthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SocialAuthGroupByOutputType[P]>
            : GetScalarType<T[P], SocialAuthGroupByOutputType[P]>
        }
      >
    >


  export type SocialAuthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialAuth"]>

  export type SocialAuthSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialAuth"]>

  export type SocialAuthSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["socialAuth"]>

  export type SocialAuthSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
  }

  export type SocialAuthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerId", ExtArgs["result"]["socialAuth"]>
  export type SocialAuthInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SocialAuthIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SocialAuthIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SocialAuthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SocialAuth"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: $Enums.SocialProvider
      providerId: string
    }, ExtArgs["result"]["socialAuth"]>
    composites: {}
  }

  type SocialAuthGetPayload<S extends boolean | null | undefined | SocialAuthDefaultArgs> = $Result.GetResult<Prisma.$SocialAuthPayload, S>

  type SocialAuthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SocialAuthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SocialAuthCountAggregateInputType | true
    }

  export interface SocialAuthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SocialAuth'], meta: { name: 'SocialAuth' } }
    /**
     * Find zero or one SocialAuth that matches the filter.
     * @param {SocialAuthFindUniqueArgs} args - Arguments to find a SocialAuth
     * @example
     * // Get one SocialAuth
     * const socialAuth = await prisma.socialAuth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocialAuthFindUniqueArgs>(args: SelectSubset<T, SocialAuthFindUniqueArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SocialAuth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SocialAuthFindUniqueOrThrowArgs} args - Arguments to find a SocialAuth
     * @example
     * // Get one SocialAuth
     * const socialAuth = await prisma.socialAuth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocialAuthFindUniqueOrThrowArgs>(args: SelectSubset<T, SocialAuthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SocialAuth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAuthFindFirstArgs} args - Arguments to find a SocialAuth
     * @example
     * // Get one SocialAuth
     * const socialAuth = await prisma.socialAuth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocialAuthFindFirstArgs>(args?: SelectSubset<T, SocialAuthFindFirstArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SocialAuth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAuthFindFirstOrThrowArgs} args - Arguments to find a SocialAuth
     * @example
     * // Get one SocialAuth
     * const socialAuth = await prisma.socialAuth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocialAuthFindFirstOrThrowArgs>(args?: SelectSubset<T, SocialAuthFindFirstOrThrowArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SocialAuths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAuthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SocialAuths
     * const socialAuths = await prisma.socialAuth.findMany()
     * 
     * // Get first 10 SocialAuths
     * const socialAuths = await prisma.socialAuth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const socialAuthWithIdOnly = await prisma.socialAuth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SocialAuthFindManyArgs>(args?: SelectSubset<T, SocialAuthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SocialAuth.
     * @param {SocialAuthCreateArgs} args - Arguments to create a SocialAuth.
     * @example
     * // Create one SocialAuth
     * const SocialAuth = await prisma.socialAuth.create({
     *   data: {
     *     // ... data to create a SocialAuth
     *   }
     * })
     * 
     */
    create<T extends SocialAuthCreateArgs>(args: SelectSubset<T, SocialAuthCreateArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SocialAuths.
     * @param {SocialAuthCreateManyArgs} args - Arguments to create many SocialAuths.
     * @example
     * // Create many SocialAuths
     * const socialAuth = await prisma.socialAuth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SocialAuthCreateManyArgs>(args?: SelectSubset<T, SocialAuthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SocialAuths and returns the data saved in the database.
     * @param {SocialAuthCreateManyAndReturnArgs} args - Arguments to create many SocialAuths.
     * @example
     * // Create many SocialAuths
     * const socialAuth = await prisma.socialAuth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SocialAuths and only return the `id`
     * const socialAuthWithIdOnly = await prisma.socialAuth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SocialAuthCreateManyAndReturnArgs>(args?: SelectSubset<T, SocialAuthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SocialAuth.
     * @param {SocialAuthDeleteArgs} args - Arguments to delete one SocialAuth.
     * @example
     * // Delete one SocialAuth
     * const SocialAuth = await prisma.socialAuth.delete({
     *   where: {
     *     // ... filter to delete one SocialAuth
     *   }
     * })
     * 
     */
    delete<T extends SocialAuthDeleteArgs>(args: SelectSubset<T, SocialAuthDeleteArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SocialAuth.
     * @param {SocialAuthUpdateArgs} args - Arguments to update one SocialAuth.
     * @example
     * // Update one SocialAuth
     * const socialAuth = await prisma.socialAuth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SocialAuthUpdateArgs>(args: SelectSubset<T, SocialAuthUpdateArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SocialAuths.
     * @param {SocialAuthDeleteManyArgs} args - Arguments to filter SocialAuths to delete.
     * @example
     * // Delete a few SocialAuths
     * const { count } = await prisma.socialAuth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SocialAuthDeleteManyArgs>(args?: SelectSubset<T, SocialAuthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SocialAuths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAuthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SocialAuths
     * const socialAuth = await prisma.socialAuth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SocialAuthUpdateManyArgs>(args: SelectSubset<T, SocialAuthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SocialAuths and returns the data updated in the database.
     * @param {SocialAuthUpdateManyAndReturnArgs} args - Arguments to update many SocialAuths.
     * @example
     * // Update many SocialAuths
     * const socialAuth = await prisma.socialAuth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SocialAuths and only return the `id`
     * const socialAuthWithIdOnly = await prisma.socialAuth.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends SocialAuthUpdateManyAndReturnArgs>(args: SelectSubset<T, SocialAuthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SocialAuth.
     * @param {SocialAuthUpsertArgs} args - Arguments to update or create a SocialAuth.
     * @example
     * // Update or create a SocialAuth
     * const socialAuth = await prisma.socialAuth.upsert({
     *   create: {
     *     // ... data to create a SocialAuth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SocialAuth we want to update
     *   }
     * })
     */
    upsert<T extends SocialAuthUpsertArgs>(args: SelectSubset<T, SocialAuthUpsertArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SocialAuths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAuthCountArgs} args - Arguments to filter SocialAuths to count.
     * @example
     * // Count the number of SocialAuths
     * const count = await prisma.socialAuth.count({
     *   where: {
     *     // ... the filter for the SocialAuths we want to count
     *   }
     * })
    **/
    count<T extends SocialAuthCountArgs>(
      args?: Subset<T, SocialAuthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SocialAuthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SocialAuth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAuthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SocialAuthAggregateArgs>(args: Subset<T, SocialAuthAggregateArgs>): Prisma.PrismaPromise<GetSocialAuthAggregateType<T>>

    /**
     * Group by SocialAuth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialAuthGroupByArgs} args - Group by arguments.
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
      T extends SocialAuthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SocialAuthGroupByArgs['orderBy'] }
        : { orderBy?: SocialAuthGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SocialAuthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialAuthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SocialAuth model
   */
  readonly fields: SocialAuthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SocialAuth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SocialAuthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SocialAuth model
   */
  interface SocialAuthFieldRefs {
    readonly id: FieldRef<"SocialAuth", 'String'>
    readonly userId: FieldRef<"SocialAuth", 'String'>
    readonly provider: FieldRef<"SocialAuth", 'SocialProvider'>
    readonly providerId: FieldRef<"SocialAuth", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SocialAuth findUnique
   */
  export type SocialAuthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * Filter, which SocialAuth to fetch.
     */
    where: SocialAuthWhereUniqueInput
  }

  /**
   * SocialAuth findUniqueOrThrow
   */
  export type SocialAuthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * Filter, which SocialAuth to fetch.
     */
    where: SocialAuthWhereUniqueInput
  }

  /**
   * SocialAuth findFirst
   */
  export type SocialAuthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * Filter, which SocialAuth to fetch.
     */
    where?: SocialAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialAuths to fetch.
     */
    orderBy?: SocialAuthOrderByWithRelationInput | SocialAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SocialAuths.
     */
    cursor?: SocialAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SocialAuths.
     */
    distinct?: SocialAuthScalarFieldEnum | SocialAuthScalarFieldEnum[]
  }

  /**
   * SocialAuth findFirstOrThrow
   */
  export type SocialAuthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * Filter, which SocialAuth to fetch.
     */
    where?: SocialAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialAuths to fetch.
     */
    orderBy?: SocialAuthOrderByWithRelationInput | SocialAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SocialAuths.
     */
    cursor?: SocialAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SocialAuths.
     */
    distinct?: SocialAuthScalarFieldEnum | SocialAuthScalarFieldEnum[]
  }

  /**
   * SocialAuth findMany
   */
  export type SocialAuthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * Filter, which SocialAuths to fetch.
     */
    where?: SocialAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SocialAuths to fetch.
     */
    orderBy?: SocialAuthOrderByWithRelationInput | SocialAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SocialAuths.
     */
    cursor?: SocialAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SocialAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SocialAuths.
     */
    skip?: number
    distinct?: SocialAuthScalarFieldEnum | SocialAuthScalarFieldEnum[]
  }

  /**
   * SocialAuth create
   */
  export type SocialAuthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * The data needed to create a SocialAuth.
     */
    data: XOR<SocialAuthCreateInput, SocialAuthUncheckedCreateInput>
  }

  /**
   * SocialAuth createMany
   */
  export type SocialAuthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SocialAuths.
     */
    data: SocialAuthCreateManyInput | SocialAuthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SocialAuth createManyAndReturn
   */
  export type SocialAuthCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * The data used to create many SocialAuths.
     */
    data: SocialAuthCreateManyInput | SocialAuthCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SocialAuth update
   */
  export type SocialAuthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * The data needed to update a SocialAuth.
     */
    data: XOR<SocialAuthUpdateInput, SocialAuthUncheckedUpdateInput>
    /**
     * Choose, which SocialAuth to update.
     */
    where: SocialAuthWhereUniqueInput
  }

  /**
   * SocialAuth updateMany
   */
  export type SocialAuthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SocialAuths.
     */
    data: XOR<SocialAuthUpdateManyMutationInput, SocialAuthUncheckedUpdateManyInput>
    /**
     * Filter which SocialAuths to update
     */
    where?: SocialAuthWhereInput
    /**
     * Limit how many SocialAuths to update.
     */
    limit?: number
  }

  /**
   * SocialAuth updateManyAndReturn
   */
  export type SocialAuthUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * The data used to update SocialAuths.
     */
    data: XOR<SocialAuthUpdateManyMutationInput, SocialAuthUncheckedUpdateManyInput>
    /**
     * Filter which SocialAuths to update
     */
    where?: SocialAuthWhereInput
    /**
     * Limit how many SocialAuths to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SocialAuth upsert
   */
  export type SocialAuthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * The filter to search for the SocialAuth to update in case it exists.
     */
    where: SocialAuthWhereUniqueInput
    /**
     * In case the SocialAuth found by the `where` argument doesn't exist, create a new SocialAuth with this data.
     */
    create: XOR<SocialAuthCreateInput, SocialAuthUncheckedCreateInput>
    /**
     * In case the SocialAuth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SocialAuthUpdateInput, SocialAuthUncheckedUpdateInput>
  }

  /**
   * SocialAuth delete
   */
  export type SocialAuthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
    /**
     * Filter which SocialAuth to delete.
     */
    where: SocialAuthWhereUniqueInput
  }

  /**
   * SocialAuth deleteMany
   */
  export type SocialAuthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SocialAuths to delete
     */
    where?: SocialAuthWhereInput
    /**
     * Limit how many SocialAuths to delete.
     */
    limit?: number
  }

  /**
   * SocialAuth without action
   */
  export type SocialAuthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialAuth
     */
    select?: SocialAuthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SocialAuth
     */
    omit?: SocialAuthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SocialAuthInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    fullName: 'fullName',
    userType: 'userType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CorporateProfileScalarFieldEnum: {
    companyId: 'companyId',
    userId: 'userId',
    companyName: 'companyName',
    industryCode: 'industryCode',
    businessRegNo: 'businessRegNo'
  };

  export type CorporateProfileScalarFieldEnum = (typeof CorporateProfileScalarFieldEnum)[keyof typeof CorporateProfileScalarFieldEnum]


  export const IndividualProfileScalarFieldEnum: {
    individualId: 'individualId',
    userId: 'userId',
    fullName: 'fullName',
    visaStatus: 'visaStatus',
    isVisaVerified: 'isVisaVerified',
    koreanLevel: 'koreanLevel'
  };

  export type IndividualProfileScalarFieldEnum = (typeof IndividualProfileScalarFieldEnum)[keyof typeof IndividualProfileScalarFieldEnum]


  export const TalentAccessLogScalarFieldEnum: {
    accessId: 'accessId',
    corporateId: 'corporateId',
    individualId: 'individualId',
    accessedAt: 'accessedAt'
  };

  export type TalentAccessLogScalarFieldEnum = (typeof TalentAccessLogScalarFieldEnum)[keyof typeof TalentAccessLogScalarFieldEnum]


  export const SocialAuthScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerId: 'providerId'
  };

  export type SocialAuthScalarFieldEnum = (typeof SocialAuthScalarFieldEnum)[keyof typeof SocialAuthScalarFieldEnum]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SocialProvider'
   */
  export type EnumSocialProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SocialProvider'>
    


  /**
   * Reference to a field of type 'SocialProvider[]'
   */
  export type ListEnumSocialProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SocialProvider[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    fullName?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    corporate?: XOR<CorporateProfileNullableScalarRelationFilter, CorporateProfileWhereInput> | null
    individual?: XOR<IndividualProfileNullableScalarRelationFilter, IndividualProfileWhereInput> | null
    socialAuths?: SocialAuthListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    corporate?: CorporateProfileOrderByWithRelationInput
    individual?: IndividualProfileOrderByWithRelationInput
    socialAuths?: SocialAuthOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    fullName?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    corporate?: XOR<CorporateProfileNullableScalarRelationFilter, CorporateProfileWhereInput> | null
    individual?: XOR<IndividualProfileNullableScalarRelationFilter, IndividualProfileWhereInput> | null
    socialAuths?: SocialAuthListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    fullName?: StringNullableWithAggregatesFilter<"User"> | string | null
    userType?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CorporateProfileWhereInput = {
    AND?: CorporateProfileWhereInput | CorporateProfileWhereInput[]
    OR?: CorporateProfileWhereInput[]
    NOT?: CorporateProfileWhereInput | CorporateProfileWhereInput[]
    companyId?: BigIntFilter<"CorporateProfile"> | bigint | number
    userId?: StringFilter<"CorporateProfile"> | string
    companyName?: StringFilter<"CorporateProfile"> | string
    industryCode?: StringFilter<"CorporateProfile"> | string
    businessRegNo?: StringFilter<"CorporateProfile"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    accessLogs?: TalentAccessLogListRelationFilter
  }

  export type CorporateProfileOrderByWithRelationInput = {
    companyId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    industryCode?: SortOrder
    businessRegNo?: SortOrder
    user?: UserOrderByWithRelationInput
    accessLogs?: TalentAccessLogOrderByRelationAggregateInput
  }

  export type CorporateProfileWhereUniqueInput = Prisma.AtLeast<{
    companyId?: bigint | number
    userId?: string
    AND?: CorporateProfileWhereInput | CorporateProfileWhereInput[]
    OR?: CorporateProfileWhereInput[]
    NOT?: CorporateProfileWhereInput | CorporateProfileWhereInput[]
    companyName?: StringFilter<"CorporateProfile"> | string
    industryCode?: StringFilter<"CorporateProfile"> | string
    businessRegNo?: StringFilter<"CorporateProfile"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    accessLogs?: TalentAccessLogListRelationFilter
  }, "companyId" | "userId">

  export type CorporateProfileOrderByWithAggregationInput = {
    companyId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    industryCode?: SortOrder
    businessRegNo?: SortOrder
    _count?: CorporateProfileCountOrderByAggregateInput
    _avg?: CorporateProfileAvgOrderByAggregateInput
    _max?: CorporateProfileMaxOrderByAggregateInput
    _min?: CorporateProfileMinOrderByAggregateInput
    _sum?: CorporateProfileSumOrderByAggregateInput
  }

  export type CorporateProfileScalarWhereWithAggregatesInput = {
    AND?: CorporateProfileScalarWhereWithAggregatesInput | CorporateProfileScalarWhereWithAggregatesInput[]
    OR?: CorporateProfileScalarWhereWithAggregatesInput[]
    NOT?: CorporateProfileScalarWhereWithAggregatesInput | CorporateProfileScalarWhereWithAggregatesInput[]
    companyId?: BigIntWithAggregatesFilter<"CorporateProfile"> | bigint | number
    userId?: StringWithAggregatesFilter<"CorporateProfile"> | string
    companyName?: StringWithAggregatesFilter<"CorporateProfile"> | string
    industryCode?: StringWithAggregatesFilter<"CorporateProfile"> | string
    businessRegNo?: StringWithAggregatesFilter<"CorporateProfile"> | string
  }

  export type IndividualProfileWhereInput = {
    AND?: IndividualProfileWhereInput | IndividualProfileWhereInput[]
    OR?: IndividualProfileWhereInput[]
    NOT?: IndividualProfileWhereInput | IndividualProfileWhereInput[]
    individualId?: BigIntFilter<"IndividualProfile"> | bigint | number
    userId?: StringFilter<"IndividualProfile"> | string
    fullName?: StringFilter<"IndividualProfile"> | string
    visaStatus?: StringFilter<"IndividualProfile"> | string
    isVisaVerified?: BoolFilter<"IndividualProfile"> | boolean
    koreanLevel?: IntFilter<"IndividualProfile"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    accessLogs?: TalentAccessLogListRelationFilter
  }

  export type IndividualProfileOrderByWithRelationInput = {
    individualId?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    visaStatus?: SortOrder
    isVisaVerified?: SortOrder
    koreanLevel?: SortOrder
    user?: UserOrderByWithRelationInput
    accessLogs?: TalentAccessLogOrderByRelationAggregateInput
  }

  export type IndividualProfileWhereUniqueInput = Prisma.AtLeast<{
    individualId?: bigint | number
    userId?: string
    AND?: IndividualProfileWhereInput | IndividualProfileWhereInput[]
    OR?: IndividualProfileWhereInput[]
    NOT?: IndividualProfileWhereInput | IndividualProfileWhereInput[]
    fullName?: StringFilter<"IndividualProfile"> | string
    visaStatus?: StringFilter<"IndividualProfile"> | string
    isVisaVerified?: BoolFilter<"IndividualProfile"> | boolean
    koreanLevel?: IntFilter<"IndividualProfile"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    accessLogs?: TalentAccessLogListRelationFilter
  }, "individualId" | "userId">

  export type IndividualProfileOrderByWithAggregationInput = {
    individualId?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    visaStatus?: SortOrder
    isVisaVerified?: SortOrder
    koreanLevel?: SortOrder
    _count?: IndividualProfileCountOrderByAggregateInput
    _avg?: IndividualProfileAvgOrderByAggregateInput
    _max?: IndividualProfileMaxOrderByAggregateInput
    _min?: IndividualProfileMinOrderByAggregateInput
    _sum?: IndividualProfileSumOrderByAggregateInput
  }

  export type IndividualProfileScalarWhereWithAggregatesInput = {
    AND?: IndividualProfileScalarWhereWithAggregatesInput | IndividualProfileScalarWhereWithAggregatesInput[]
    OR?: IndividualProfileScalarWhereWithAggregatesInput[]
    NOT?: IndividualProfileScalarWhereWithAggregatesInput | IndividualProfileScalarWhereWithAggregatesInput[]
    individualId?: BigIntWithAggregatesFilter<"IndividualProfile"> | bigint | number
    userId?: StringWithAggregatesFilter<"IndividualProfile"> | string
    fullName?: StringWithAggregatesFilter<"IndividualProfile"> | string
    visaStatus?: StringWithAggregatesFilter<"IndividualProfile"> | string
    isVisaVerified?: BoolWithAggregatesFilter<"IndividualProfile"> | boolean
    koreanLevel?: IntWithAggregatesFilter<"IndividualProfile"> | number
  }

  export type TalentAccessLogWhereInput = {
    AND?: TalentAccessLogWhereInput | TalentAccessLogWhereInput[]
    OR?: TalentAccessLogWhereInput[]
    NOT?: TalentAccessLogWhereInput | TalentAccessLogWhereInput[]
    accessId?: BigIntFilter<"TalentAccessLog"> | bigint | number
    corporateId?: BigIntFilter<"TalentAccessLog"> | bigint | number
    individualId?: BigIntFilter<"TalentAccessLog"> | bigint | number
    accessedAt?: DateTimeFilter<"TalentAccessLog"> | Date | string
    corporate?: XOR<CorporateProfileScalarRelationFilter, CorporateProfileWhereInput>
    individual?: XOR<IndividualProfileScalarRelationFilter, IndividualProfileWhereInput>
  }

  export type TalentAccessLogOrderByWithRelationInput = {
    accessId?: SortOrder
    corporateId?: SortOrder
    individualId?: SortOrder
    accessedAt?: SortOrder
    corporate?: CorporateProfileOrderByWithRelationInput
    individual?: IndividualProfileOrderByWithRelationInput
  }

  export type TalentAccessLogWhereUniqueInput = Prisma.AtLeast<{
    accessId?: bigint | number
    corporateId_individualId?: TalentAccessLogCorporateIdIndividualIdCompoundUniqueInput
    AND?: TalentAccessLogWhereInput | TalentAccessLogWhereInput[]
    OR?: TalentAccessLogWhereInput[]
    NOT?: TalentAccessLogWhereInput | TalentAccessLogWhereInput[]
    corporateId?: BigIntFilter<"TalentAccessLog"> | bigint | number
    individualId?: BigIntFilter<"TalentAccessLog"> | bigint | number
    accessedAt?: DateTimeFilter<"TalentAccessLog"> | Date | string
    corporate?: XOR<CorporateProfileScalarRelationFilter, CorporateProfileWhereInput>
    individual?: XOR<IndividualProfileScalarRelationFilter, IndividualProfileWhereInput>
  }, "accessId" | "corporateId_individualId">

  export type TalentAccessLogOrderByWithAggregationInput = {
    accessId?: SortOrder
    corporateId?: SortOrder
    individualId?: SortOrder
    accessedAt?: SortOrder
    _count?: TalentAccessLogCountOrderByAggregateInput
    _avg?: TalentAccessLogAvgOrderByAggregateInput
    _max?: TalentAccessLogMaxOrderByAggregateInput
    _min?: TalentAccessLogMinOrderByAggregateInput
    _sum?: TalentAccessLogSumOrderByAggregateInput
  }

  export type TalentAccessLogScalarWhereWithAggregatesInput = {
    AND?: TalentAccessLogScalarWhereWithAggregatesInput | TalentAccessLogScalarWhereWithAggregatesInput[]
    OR?: TalentAccessLogScalarWhereWithAggregatesInput[]
    NOT?: TalentAccessLogScalarWhereWithAggregatesInput | TalentAccessLogScalarWhereWithAggregatesInput[]
    accessId?: BigIntWithAggregatesFilter<"TalentAccessLog"> | bigint | number
    corporateId?: BigIntWithAggregatesFilter<"TalentAccessLog"> | bigint | number
    individualId?: BigIntWithAggregatesFilter<"TalentAccessLog"> | bigint | number
    accessedAt?: DateTimeWithAggregatesFilter<"TalentAccessLog"> | Date | string
  }

  export type SocialAuthWhereInput = {
    AND?: SocialAuthWhereInput | SocialAuthWhereInput[]
    OR?: SocialAuthWhereInput[]
    NOT?: SocialAuthWhereInput | SocialAuthWhereInput[]
    id?: StringFilter<"SocialAuth"> | string
    userId?: StringFilter<"SocialAuth"> | string
    provider?: EnumSocialProviderFilter<"SocialAuth"> | $Enums.SocialProvider
    providerId?: StringFilter<"SocialAuth"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SocialAuthOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SocialAuthWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerId?: SocialAuthProviderProviderIdCompoundUniqueInput
    AND?: SocialAuthWhereInput | SocialAuthWhereInput[]
    OR?: SocialAuthWhereInput[]
    NOT?: SocialAuthWhereInput | SocialAuthWhereInput[]
    userId?: StringFilter<"SocialAuth"> | string
    provider?: EnumSocialProviderFilter<"SocialAuth"> | $Enums.SocialProvider
    providerId?: StringFilter<"SocialAuth"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerId">

  export type SocialAuthOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    _count?: SocialAuthCountOrderByAggregateInput
    _max?: SocialAuthMaxOrderByAggregateInput
    _min?: SocialAuthMinOrderByAggregateInput
  }

  export type SocialAuthScalarWhereWithAggregatesInput = {
    AND?: SocialAuthScalarWhereWithAggregatesInput | SocialAuthScalarWhereWithAggregatesInput[]
    OR?: SocialAuthScalarWhereWithAggregatesInput[]
    NOT?: SocialAuthScalarWhereWithAggregatesInput | SocialAuthScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SocialAuth"> | string
    userId?: StringWithAggregatesFilter<"SocialAuth"> | string
    provider?: EnumSocialProviderWithAggregatesFilter<"SocialAuth"> | $Enums.SocialProvider
    providerId?: StringWithAggregatesFilter<"SocialAuth"> | string
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    corporate?: CorporateProfileCreateNestedOneWithoutUserInput
    individual?: IndividualProfileCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    corporate?: CorporateProfileUncheckedCreateNestedOneWithoutUserInput
    individual?: IndividualProfileUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporate?: CorporateProfileUpdateOneWithoutUserNestedInput
    individual?: IndividualProfileUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporate?: CorporateProfileUncheckedUpdateOneWithoutUserNestedInput
    individual?: IndividualProfileUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateProfileCreateInput = {
    companyId?: bigint | number
    companyName: string
    industryCode: string
    businessRegNo: string
    user: UserCreateNestedOneWithoutCorporateInput
    accessLogs?: TalentAccessLogCreateNestedManyWithoutCorporateInput
  }

  export type CorporateProfileUncheckedCreateInput = {
    companyId?: bigint | number
    userId: string
    companyName: string
    industryCode: string
    businessRegNo: string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutCorporateInput
  }

  export type CorporateProfileUpdateInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    industryCode?: StringFieldUpdateOperationsInput | string
    businessRegNo?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCorporateNestedInput
    accessLogs?: TalentAccessLogUpdateManyWithoutCorporateNestedInput
  }

  export type CorporateProfileUncheckedUpdateInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    industryCode?: StringFieldUpdateOperationsInput | string
    businessRegNo?: StringFieldUpdateOperationsInput | string
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutCorporateNestedInput
  }

  export type CorporateProfileCreateManyInput = {
    companyId?: bigint | number
    userId: string
    companyName: string
    industryCode: string
    businessRegNo: string
  }

  export type CorporateProfileUpdateManyMutationInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    industryCode?: StringFieldUpdateOperationsInput | string
    businessRegNo?: StringFieldUpdateOperationsInput | string
  }

  export type CorporateProfileUncheckedUpdateManyInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    industryCode?: StringFieldUpdateOperationsInput | string
    businessRegNo?: StringFieldUpdateOperationsInput | string
  }

  export type IndividualProfileCreateInput = {
    individualId?: bigint | number
    fullName: string
    visaStatus: string
    isVisaVerified?: boolean
    koreanLevel?: number
    user: UserCreateNestedOneWithoutIndividualInput
    accessLogs?: TalentAccessLogCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateInput = {
    individualId?: bigint | number
    userId: string
    fullName: string
    visaStatus: string
    isVisaVerified?: boolean
    koreanLevel?: number
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUpdateInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    visaStatus?: StringFieldUpdateOperationsInput | string
    isVisaVerified?: BoolFieldUpdateOperationsInput | boolean
    koreanLevel?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutIndividualNestedInput
    accessLogs?: TalentAccessLogUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    visaStatus?: StringFieldUpdateOperationsInput | string
    isVisaVerified?: BoolFieldUpdateOperationsInput | boolean
    koreanLevel?: IntFieldUpdateOperationsInput | number
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileCreateManyInput = {
    individualId?: bigint | number
    userId: string
    fullName: string
    visaStatus: string
    isVisaVerified?: boolean
    koreanLevel?: number
  }

  export type IndividualProfileUpdateManyMutationInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    visaStatus?: StringFieldUpdateOperationsInput | string
    isVisaVerified?: BoolFieldUpdateOperationsInput | boolean
    koreanLevel?: IntFieldUpdateOperationsInput | number
  }

  export type IndividualProfileUncheckedUpdateManyInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    visaStatus?: StringFieldUpdateOperationsInput | string
    isVisaVerified?: BoolFieldUpdateOperationsInput | boolean
    koreanLevel?: IntFieldUpdateOperationsInput | number
  }

  export type TalentAccessLogCreateInput = {
    accessId?: bigint | number
    accessedAt?: Date | string
    corporate: CorporateProfileCreateNestedOneWithoutAccessLogsInput
    individual: IndividualProfileCreateNestedOneWithoutAccessLogsInput
  }

  export type TalentAccessLogUncheckedCreateInput = {
    accessId?: bigint | number
    corporateId: bigint | number
    individualId: bigint | number
    accessedAt?: Date | string
  }

  export type TalentAccessLogUpdateInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporate?: CorporateProfileUpdateOneRequiredWithoutAccessLogsNestedInput
    individual?: IndividualProfileUpdateOneRequiredWithoutAccessLogsNestedInput
  }

  export type TalentAccessLogUncheckedUpdateInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentAccessLogCreateManyInput = {
    accessId?: bigint | number
    corporateId: bigint | number
    individualId: bigint | number
    accessedAt?: Date | string
  }

  export type TalentAccessLogUpdateManyMutationInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentAccessLogUncheckedUpdateManyInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialAuthCreateInput = {
    id?: string
    provider: $Enums.SocialProvider
    providerId: string
    user: UserCreateNestedOneWithoutSocialAuthsInput
  }

  export type SocialAuthUncheckedCreateInput = {
    id?: string
    userId: string
    provider: $Enums.SocialProvider
    providerId: string
  }

  export type SocialAuthUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    providerId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSocialAuthsNestedInput
  }

  export type SocialAuthUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    providerId?: StringFieldUpdateOperationsInput | string
  }

  export type SocialAuthCreateManyInput = {
    id?: string
    userId: string
    provider: $Enums.SocialProvider
    providerId: string
  }

  export type SocialAuthUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    providerId?: StringFieldUpdateOperationsInput | string
  }

  export type SocialAuthUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    providerId?: StringFieldUpdateOperationsInput | string
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
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
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

  export type CorporateProfileNullableScalarRelationFilter = {
    is?: CorporateProfileWhereInput | null
    isNot?: CorporateProfileWhereInput | null
  }

  export type IndividualProfileNullableScalarRelationFilter = {
    is?: IndividualProfileWhereInput | null
    isNot?: IndividualProfileWhereInput | null
  }

  export type SocialAuthListRelationFilter = {
    every?: SocialAuthWhereInput
    some?: SocialAuthWhereInput
    none?: SocialAuthWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SocialAuthOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
  }

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TalentAccessLogListRelationFilter = {
    every?: TalentAccessLogWhereInput
    some?: TalentAccessLogWhereInput
    none?: TalentAccessLogWhereInput
  }

  export type TalentAccessLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CorporateProfileCountOrderByAggregateInput = {
    companyId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    industryCode?: SortOrder
    businessRegNo?: SortOrder
  }

  export type CorporateProfileAvgOrderByAggregateInput = {
    companyId?: SortOrder
  }

  export type CorporateProfileMaxOrderByAggregateInput = {
    companyId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    industryCode?: SortOrder
    businessRegNo?: SortOrder
  }

  export type CorporateProfileMinOrderByAggregateInput = {
    companyId?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    industryCode?: SortOrder
    businessRegNo?: SortOrder
  }

  export type CorporateProfileSumOrderByAggregateInput = {
    companyId?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type IndividualProfileCountOrderByAggregateInput = {
    individualId?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    visaStatus?: SortOrder
    isVisaVerified?: SortOrder
    koreanLevel?: SortOrder
  }

  export type IndividualProfileAvgOrderByAggregateInput = {
    individualId?: SortOrder
    koreanLevel?: SortOrder
  }

  export type IndividualProfileMaxOrderByAggregateInput = {
    individualId?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    visaStatus?: SortOrder
    isVisaVerified?: SortOrder
    koreanLevel?: SortOrder
  }

  export type IndividualProfileMinOrderByAggregateInput = {
    individualId?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    visaStatus?: SortOrder
    isVisaVerified?: SortOrder
    koreanLevel?: SortOrder
  }

  export type IndividualProfileSumOrderByAggregateInput = {
    individualId?: SortOrder
    koreanLevel?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type CorporateProfileScalarRelationFilter = {
    is?: CorporateProfileWhereInput
    isNot?: CorporateProfileWhereInput
  }

  export type IndividualProfileScalarRelationFilter = {
    is?: IndividualProfileWhereInput
    isNot?: IndividualProfileWhereInput
  }

  export type TalentAccessLogCorporateIdIndividualIdCompoundUniqueInput = {
    corporateId: bigint | number
    individualId: bigint | number
  }

  export type TalentAccessLogCountOrderByAggregateInput = {
    accessId?: SortOrder
    corporateId?: SortOrder
    individualId?: SortOrder
    accessedAt?: SortOrder
  }

  export type TalentAccessLogAvgOrderByAggregateInput = {
    accessId?: SortOrder
    corporateId?: SortOrder
    individualId?: SortOrder
  }

  export type TalentAccessLogMaxOrderByAggregateInput = {
    accessId?: SortOrder
    corporateId?: SortOrder
    individualId?: SortOrder
    accessedAt?: SortOrder
  }

  export type TalentAccessLogMinOrderByAggregateInput = {
    accessId?: SortOrder
    corporateId?: SortOrder
    individualId?: SortOrder
    accessedAt?: SortOrder
  }

  export type TalentAccessLogSumOrderByAggregateInput = {
    accessId?: SortOrder
    corporateId?: SortOrder
    individualId?: SortOrder
  }

  export type EnumSocialProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderFilter<$PrismaModel> | $Enums.SocialProvider
  }

  export type SocialAuthProviderProviderIdCompoundUniqueInput = {
    provider: $Enums.SocialProvider
    providerId: string
  }

  export type SocialAuthCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
  }

  export type SocialAuthMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
  }

  export type SocialAuthMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
  }

  export type EnumSocialProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderWithAggregatesFilter<$PrismaModel> | $Enums.SocialProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSocialProviderFilter<$PrismaModel>
    _max?: NestedEnumSocialProviderFilter<$PrismaModel>
  }

  export type CorporateProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<CorporateProfileCreateWithoutUserInput, CorporateProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CorporateProfileCreateOrConnectWithoutUserInput
    connect?: CorporateProfileWhereUniqueInput
  }

  export type IndividualProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<IndividualProfileCreateWithoutUserInput, IndividualProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutUserInput
    connect?: IndividualProfileWhereUniqueInput
  }

  export type SocialAuthCreateNestedManyWithoutUserInput = {
    create?: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput> | SocialAuthCreateWithoutUserInput[] | SocialAuthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialAuthCreateOrConnectWithoutUserInput | SocialAuthCreateOrConnectWithoutUserInput[]
    createMany?: SocialAuthCreateManyUserInputEnvelope
    connect?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
  }

  export type CorporateProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CorporateProfileCreateWithoutUserInput, CorporateProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CorporateProfileCreateOrConnectWithoutUserInput
    connect?: CorporateProfileWhereUniqueInput
  }

  export type IndividualProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<IndividualProfileCreateWithoutUserInput, IndividualProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutUserInput
    connect?: IndividualProfileWhereUniqueInput
  }

  export type SocialAuthUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput> | SocialAuthCreateWithoutUserInput[] | SocialAuthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialAuthCreateOrConnectWithoutUserInput | SocialAuthCreateOrConnectWithoutUserInput[]
    createMany?: SocialAuthCreateManyUserInputEnvelope
    connect?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CorporateProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<CorporateProfileCreateWithoutUserInput, CorporateProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CorporateProfileCreateOrConnectWithoutUserInput
    upsert?: CorporateProfileUpsertWithoutUserInput
    disconnect?: CorporateProfileWhereInput | boolean
    delete?: CorporateProfileWhereInput | boolean
    connect?: CorporateProfileWhereUniqueInput
    update?: XOR<XOR<CorporateProfileUpdateToOneWithWhereWithoutUserInput, CorporateProfileUpdateWithoutUserInput>, CorporateProfileUncheckedUpdateWithoutUserInput>
  }

  export type IndividualProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<IndividualProfileCreateWithoutUserInput, IndividualProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutUserInput
    upsert?: IndividualProfileUpsertWithoutUserInput
    disconnect?: IndividualProfileWhereInput | boolean
    delete?: IndividualProfileWhereInput | boolean
    connect?: IndividualProfileWhereUniqueInput
    update?: XOR<XOR<IndividualProfileUpdateToOneWithWhereWithoutUserInput, IndividualProfileUpdateWithoutUserInput>, IndividualProfileUncheckedUpdateWithoutUserInput>
  }

  export type SocialAuthUpdateManyWithoutUserNestedInput = {
    create?: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput> | SocialAuthCreateWithoutUserInput[] | SocialAuthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialAuthCreateOrConnectWithoutUserInput | SocialAuthCreateOrConnectWithoutUserInput[]
    upsert?: SocialAuthUpsertWithWhereUniqueWithoutUserInput | SocialAuthUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SocialAuthCreateManyUserInputEnvelope
    set?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
    disconnect?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
    delete?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
    connect?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
    update?: SocialAuthUpdateWithWhereUniqueWithoutUserInput | SocialAuthUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SocialAuthUpdateManyWithWhereWithoutUserInput | SocialAuthUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SocialAuthScalarWhereInput | SocialAuthScalarWhereInput[]
  }

  export type CorporateProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CorporateProfileCreateWithoutUserInput, CorporateProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CorporateProfileCreateOrConnectWithoutUserInput
    upsert?: CorporateProfileUpsertWithoutUserInput
    disconnect?: CorporateProfileWhereInput | boolean
    delete?: CorporateProfileWhereInput | boolean
    connect?: CorporateProfileWhereUniqueInput
    update?: XOR<XOR<CorporateProfileUpdateToOneWithWhereWithoutUserInput, CorporateProfileUpdateWithoutUserInput>, CorporateProfileUncheckedUpdateWithoutUserInput>
  }

  export type IndividualProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<IndividualProfileCreateWithoutUserInput, IndividualProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutUserInput
    upsert?: IndividualProfileUpsertWithoutUserInput
    disconnect?: IndividualProfileWhereInput | boolean
    delete?: IndividualProfileWhereInput | boolean
    connect?: IndividualProfileWhereUniqueInput
    update?: XOR<XOR<IndividualProfileUpdateToOneWithWhereWithoutUserInput, IndividualProfileUpdateWithoutUserInput>, IndividualProfileUncheckedUpdateWithoutUserInput>
  }

  export type SocialAuthUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput> | SocialAuthCreateWithoutUserInput[] | SocialAuthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SocialAuthCreateOrConnectWithoutUserInput | SocialAuthCreateOrConnectWithoutUserInput[]
    upsert?: SocialAuthUpsertWithWhereUniqueWithoutUserInput | SocialAuthUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SocialAuthCreateManyUserInputEnvelope
    set?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
    disconnect?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
    delete?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
    connect?: SocialAuthWhereUniqueInput | SocialAuthWhereUniqueInput[]
    update?: SocialAuthUpdateWithWhereUniqueWithoutUserInput | SocialAuthUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SocialAuthUpdateManyWithWhereWithoutUserInput | SocialAuthUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SocialAuthScalarWhereInput | SocialAuthScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCorporateInput = {
    create?: XOR<UserCreateWithoutCorporateInput, UserUncheckedCreateWithoutCorporateInput>
    connectOrCreate?: UserCreateOrConnectWithoutCorporateInput
    connect?: UserWhereUniqueInput
  }

  export type TalentAccessLogCreateNestedManyWithoutCorporateInput = {
    create?: XOR<TalentAccessLogCreateWithoutCorporateInput, TalentAccessLogUncheckedCreateWithoutCorporateInput> | TalentAccessLogCreateWithoutCorporateInput[] | TalentAccessLogUncheckedCreateWithoutCorporateInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutCorporateInput | TalentAccessLogCreateOrConnectWithoutCorporateInput[]
    createMany?: TalentAccessLogCreateManyCorporateInputEnvelope
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
  }

  export type TalentAccessLogUncheckedCreateNestedManyWithoutCorporateInput = {
    create?: XOR<TalentAccessLogCreateWithoutCorporateInput, TalentAccessLogUncheckedCreateWithoutCorporateInput> | TalentAccessLogCreateWithoutCorporateInput[] | TalentAccessLogUncheckedCreateWithoutCorporateInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutCorporateInput | TalentAccessLogCreateOrConnectWithoutCorporateInput[]
    createMany?: TalentAccessLogCreateManyCorporateInputEnvelope
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type UserUpdateOneRequiredWithoutCorporateNestedInput = {
    create?: XOR<UserCreateWithoutCorporateInput, UserUncheckedCreateWithoutCorporateInput>
    connectOrCreate?: UserCreateOrConnectWithoutCorporateInput
    upsert?: UserUpsertWithoutCorporateInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCorporateInput, UserUpdateWithoutCorporateInput>, UserUncheckedUpdateWithoutCorporateInput>
  }

  export type TalentAccessLogUpdateManyWithoutCorporateNestedInput = {
    create?: XOR<TalentAccessLogCreateWithoutCorporateInput, TalentAccessLogUncheckedCreateWithoutCorporateInput> | TalentAccessLogCreateWithoutCorporateInput[] | TalentAccessLogUncheckedCreateWithoutCorporateInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutCorporateInput | TalentAccessLogCreateOrConnectWithoutCorporateInput[]
    upsert?: TalentAccessLogUpsertWithWhereUniqueWithoutCorporateInput | TalentAccessLogUpsertWithWhereUniqueWithoutCorporateInput[]
    createMany?: TalentAccessLogCreateManyCorporateInputEnvelope
    set?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    disconnect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    delete?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    update?: TalentAccessLogUpdateWithWhereUniqueWithoutCorporateInput | TalentAccessLogUpdateWithWhereUniqueWithoutCorporateInput[]
    updateMany?: TalentAccessLogUpdateManyWithWhereWithoutCorporateInput | TalentAccessLogUpdateManyWithWhereWithoutCorporateInput[]
    deleteMany?: TalentAccessLogScalarWhereInput | TalentAccessLogScalarWhereInput[]
  }

  export type TalentAccessLogUncheckedUpdateManyWithoutCorporateNestedInput = {
    create?: XOR<TalentAccessLogCreateWithoutCorporateInput, TalentAccessLogUncheckedCreateWithoutCorporateInput> | TalentAccessLogCreateWithoutCorporateInput[] | TalentAccessLogUncheckedCreateWithoutCorporateInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutCorporateInput | TalentAccessLogCreateOrConnectWithoutCorporateInput[]
    upsert?: TalentAccessLogUpsertWithWhereUniqueWithoutCorporateInput | TalentAccessLogUpsertWithWhereUniqueWithoutCorporateInput[]
    createMany?: TalentAccessLogCreateManyCorporateInputEnvelope
    set?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    disconnect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    delete?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    update?: TalentAccessLogUpdateWithWhereUniqueWithoutCorporateInput | TalentAccessLogUpdateWithWhereUniqueWithoutCorporateInput[]
    updateMany?: TalentAccessLogUpdateManyWithWhereWithoutCorporateInput | TalentAccessLogUpdateManyWithWhereWithoutCorporateInput[]
    deleteMany?: TalentAccessLogScalarWhereInput | TalentAccessLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutIndividualInput = {
    create?: XOR<UserCreateWithoutIndividualInput, UserUncheckedCreateWithoutIndividualInput>
    connectOrCreate?: UserCreateOrConnectWithoutIndividualInput
    connect?: UserWhereUniqueInput
  }

  export type TalentAccessLogCreateNestedManyWithoutIndividualInput = {
    create?: XOR<TalentAccessLogCreateWithoutIndividualInput, TalentAccessLogUncheckedCreateWithoutIndividualInput> | TalentAccessLogCreateWithoutIndividualInput[] | TalentAccessLogUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutIndividualInput | TalentAccessLogCreateOrConnectWithoutIndividualInput[]
    createMany?: TalentAccessLogCreateManyIndividualInputEnvelope
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
  }

  export type TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput = {
    create?: XOR<TalentAccessLogCreateWithoutIndividualInput, TalentAccessLogUncheckedCreateWithoutIndividualInput> | TalentAccessLogCreateWithoutIndividualInput[] | TalentAccessLogUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutIndividualInput | TalentAccessLogCreateOrConnectWithoutIndividualInput[]
    createMany?: TalentAccessLogCreateManyIndividualInputEnvelope
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutIndividualNestedInput = {
    create?: XOR<UserCreateWithoutIndividualInput, UserUncheckedCreateWithoutIndividualInput>
    connectOrCreate?: UserCreateOrConnectWithoutIndividualInput
    upsert?: UserUpsertWithoutIndividualInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutIndividualInput, UserUpdateWithoutIndividualInput>, UserUncheckedUpdateWithoutIndividualInput>
  }

  export type TalentAccessLogUpdateManyWithoutIndividualNestedInput = {
    create?: XOR<TalentAccessLogCreateWithoutIndividualInput, TalentAccessLogUncheckedCreateWithoutIndividualInput> | TalentAccessLogCreateWithoutIndividualInput[] | TalentAccessLogUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutIndividualInput | TalentAccessLogCreateOrConnectWithoutIndividualInput[]
    upsert?: TalentAccessLogUpsertWithWhereUniqueWithoutIndividualInput | TalentAccessLogUpsertWithWhereUniqueWithoutIndividualInput[]
    createMany?: TalentAccessLogCreateManyIndividualInputEnvelope
    set?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    disconnect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    delete?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    update?: TalentAccessLogUpdateWithWhereUniqueWithoutIndividualInput | TalentAccessLogUpdateWithWhereUniqueWithoutIndividualInput[]
    updateMany?: TalentAccessLogUpdateManyWithWhereWithoutIndividualInput | TalentAccessLogUpdateManyWithWhereWithoutIndividualInput[]
    deleteMany?: TalentAccessLogScalarWhereInput | TalentAccessLogScalarWhereInput[]
  }

  export type TalentAccessLogUncheckedUpdateManyWithoutIndividualNestedInput = {
    create?: XOR<TalentAccessLogCreateWithoutIndividualInput, TalentAccessLogUncheckedCreateWithoutIndividualInput> | TalentAccessLogCreateWithoutIndividualInput[] | TalentAccessLogUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutIndividualInput | TalentAccessLogCreateOrConnectWithoutIndividualInput[]
    upsert?: TalentAccessLogUpsertWithWhereUniqueWithoutIndividualInput | TalentAccessLogUpsertWithWhereUniqueWithoutIndividualInput[]
    createMany?: TalentAccessLogCreateManyIndividualInputEnvelope
    set?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    disconnect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    delete?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
    update?: TalentAccessLogUpdateWithWhereUniqueWithoutIndividualInput | TalentAccessLogUpdateWithWhereUniqueWithoutIndividualInput[]
    updateMany?: TalentAccessLogUpdateManyWithWhereWithoutIndividualInput | TalentAccessLogUpdateManyWithWhereWithoutIndividualInput[]
    deleteMany?: TalentAccessLogScalarWhereInput | TalentAccessLogScalarWhereInput[]
  }

  export type CorporateProfileCreateNestedOneWithoutAccessLogsInput = {
    create?: XOR<CorporateProfileCreateWithoutAccessLogsInput, CorporateProfileUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: CorporateProfileCreateOrConnectWithoutAccessLogsInput
    connect?: CorporateProfileWhereUniqueInput
  }

  export type IndividualProfileCreateNestedOneWithoutAccessLogsInput = {
    create?: XOR<IndividualProfileCreateWithoutAccessLogsInput, IndividualProfileUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutAccessLogsInput
    connect?: IndividualProfileWhereUniqueInput
  }

  export type CorporateProfileUpdateOneRequiredWithoutAccessLogsNestedInput = {
    create?: XOR<CorporateProfileCreateWithoutAccessLogsInput, CorporateProfileUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: CorporateProfileCreateOrConnectWithoutAccessLogsInput
    upsert?: CorporateProfileUpsertWithoutAccessLogsInput
    connect?: CorporateProfileWhereUniqueInput
    update?: XOR<XOR<CorporateProfileUpdateToOneWithWhereWithoutAccessLogsInput, CorporateProfileUpdateWithoutAccessLogsInput>, CorporateProfileUncheckedUpdateWithoutAccessLogsInput>
  }

  export type IndividualProfileUpdateOneRequiredWithoutAccessLogsNestedInput = {
    create?: XOR<IndividualProfileCreateWithoutAccessLogsInput, IndividualProfileUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutAccessLogsInput
    upsert?: IndividualProfileUpsertWithoutAccessLogsInput
    connect?: IndividualProfileWhereUniqueInput
    update?: XOR<XOR<IndividualProfileUpdateToOneWithWhereWithoutAccessLogsInput, IndividualProfileUpdateWithoutAccessLogsInput>, IndividualProfileUncheckedUpdateWithoutAccessLogsInput>
  }

  export type UserCreateNestedOneWithoutSocialAuthsInput = {
    create?: XOR<UserCreateWithoutSocialAuthsInput, UserUncheckedCreateWithoutSocialAuthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocialAuthsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumSocialProviderFieldUpdateOperationsInput = {
    set?: $Enums.SocialProvider
  }

  export type UserUpdateOneRequiredWithoutSocialAuthsNestedInput = {
    create?: XOR<UserCreateWithoutSocialAuthsInput, UserUncheckedCreateWithoutSocialAuthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocialAuthsInput
    upsert?: UserUpsertWithoutSocialAuthsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSocialAuthsInput, UserUpdateWithoutSocialAuthsInput>, UserUncheckedUpdateWithoutSocialAuthsInput>
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
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
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

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
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

  export type NestedEnumSocialProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderFilter<$PrismaModel> | $Enums.SocialProvider
  }

  export type NestedEnumSocialProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderWithAggregatesFilter<$PrismaModel> | $Enums.SocialProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSocialProviderFilter<$PrismaModel>
    _max?: NestedEnumSocialProviderFilter<$PrismaModel>
  }

  export type CorporateProfileCreateWithoutUserInput = {
    companyId?: bigint | number
    companyName: string
    industryCode: string
    businessRegNo: string
    accessLogs?: TalentAccessLogCreateNestedManyWithoutCorporateInput
  }

  export type CorporateProfileUncheckedCreateWithoutUserInput = {
    companyId?: bigint | number
    companyName: string
    industryCode: string
    businessRegNo: string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutCorporateInput
  }

  export type CorporateProfileCreateOrConnectWithoutUserInput = {
    where: CorporateProfileWhereUniqueInput
    create: XOR<CorporateProfileCreateWithoutUserInput, CorporateProfileUncheckedCreateWithoutUserInput>
  }

  export type IndividualProfileCreateWithoutUserInput = {
    individualId?: bigint | number
    fullName: string
    visaStatus: string
    isVisaVerified?: boolean
    koreanLevel?: number
    accessLogs?: TalentAccessLogCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateWithoutUserInput = {
    individualId?: bigint | number
    fullName: string
    visaStatus: string
    isVisaVerified?: boolean
    koreanLevel?: number
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileCreateOrConnectWithoutUserInput = {
    where: IndividualProfileWhereUniqueInput
    create: XOR<IndividualProfileCreateWithoutUserInput, IndividualProfileUncheckedCreateWithoutUserInput>
  }

  export type SocialAuthCreateWithoutUserInput = {
    id?: string
    provider: $Enums.SocialProvider
    providerId: string
  }

  export type SocialAuthUncheckedCreateWithoutUserInput = {
    id?: string
    provider: $Enums.SocialProvider
    providerId: string
  }

  export type SocialAuthCreateOrConnectWithoutUserInput = {
    where: SocialAuthWhereUniqueInput
    create: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput>
  }

  export type SocialAuthCreateManyUserInputEnvelope = {
    data: SocialAuthCreateManyUserInput | SocialAuthCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CorporateProfileUpsertWithoutUserInput = {
    update: XOR<CorporateProfileUpdateWithoutUserInput, CorporateProfileUncheckedUpdateWithoutUserInput>
    create: XOR<CorporateProfileCreateWithoutUserInput, CorporateProfileUncheckedCreateWithoutUserInput>
    where?: CorporateProfileWhereInput
  }

  export type CorporateProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: CorporateProfileWhereInput
    data: XOR<CorporateProfileUpdateWithoutUserInput, CorporateProfileUncheckedUpdateWithoutUserInput>
  }

  export type CorporateProfileUpdateWithoutUserInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    industryCode?: StringFieldUpdateOperationsInput | string
    businessRegNo?: StringFieldUpdateOperationsInput | string
    accessLogs?: TalentAccessLogUpdateManyWithoutCorporateNestedInput
  }

  export type CorporateProfileUncheckedUpdateWithoutUserInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    industryCode?: StringFieldUpdateOperationsInput | string
    businessRegNo?: StringFieldUpdateOperationsInput | string
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutCorporateNestedInput
  }

  export type IndividualProfileUpsertWithoutUserInput = {
    update: XOR<IndividualProfileUpdateWithoutUserInput, IndividualProfileUncheckedUpdateWithoutUserInput>
    create: XOR<IndividualProfileCreateWithoutUserInput, IndividualProfileUncheckedCreateWithoutUserInput>
    where?: IndividualProfileWhereInput
  }

  export type IndividualProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: IndividualProfileWhereInput
    data: XOR<IndividualProfileUpdateWithoutUserInput, IndividualProfileUncheckedUpdateWithoutUserInput>
  }

  export type IndividualProfileUpdateWithoutUserInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    visaStatus?: StringFieldUpdateOperationsInput | string
    isVisaVerified?: BoolFieldUpdateOperationsInput | boolean
    koreanLevel?: IntFieldUpdateOperationsInput | number
    accessLogs?: TalentAccessLogUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateWithoutUserInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    visaStatus?: StringFieldUpdateOperationsInput | string
    isVisaVerified?: BoolFieldUpdateOperationsInput | boolean
    koreanLevel?: IntFieldUpdateOperationsInput | number
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutIndividualNestedInput
  }

  export type SocialAuthUpsertWithWhereUniqueWithoutUserInput = {
    where: SocialAuthWhereUniqueInput
    update: XOR<SocialAuthUpdateWithoutUserInput, SocialAuthUncheckedUpdateWithoutUserInput>
    create: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput>
  }

  export type SocialAuthUpdateWithWhereUniqueWithoutUserInput = {
    where: SocialAuthWhereUniqueInput
    data: XOR<SocialAuthUpdateWithoutUserInput, SocialAuthUncheckedUpdateWithoutUserInput>
  }

  export type SocialAuthUpdateManyWithWhereWithoutUserInput = {
    where: SocialAuthScalarWhereInput
    data: XOR<SocialAuthUpdateManyMutationInput, SocialAuthUncheckedUpdateManyWithoutUserInput>
  }

  export type SocialAuthScalarWhereInput = {
    AND?: SocialAuthScalarWhereInput | SocialAuthScalarWhereInput[]
    OR?: SocialAuthScalarWhereInput[]
    NOT?: SocialAuthScalarWhereInput | SocialAuthScalarWhereInput[]
    id?: StringFilter<"SocialAuth"> | string
    userId?: StringFilter<"SocialAuth"> | string
    provider?: EnumSocialProviderFilter<"SocialAuth"> | $Enums.SocialProvider
    providerId?: StringFilter<"SocialAuth"> | string
  }

  export type UserCreateWithoutCorporateInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    individual?: IndividualProfileCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCorporateInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    individual?: IndividualProfileUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCorporateInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCorporateInput, UserUncheckedCreateWithoutCorporateInput>
  }

  export type TalentAccessLogCreateWithoutCorporateInput = {
    accessId?: bigint | number
    accessedAt?: Date | string
    individual: IndividualProfileCreateNestedOneWithoutAccessLogsInput
  }

  export type TalentAccessLogUncheckedCreateWithoutCorporateInput = {
    accessId?: bigint | number
    individualId: bigint | number
    accessedAt?: Date | string
  }

  export type TalentAccessLogCreateOrConnectWithoutCorporateInput = {
    where: TalentAccessLogWhereUniqueInput
    create: XOR<TalentAccessLogCreateWithoutCorporateInput, TalentAccessLogUncheckedCreateWithoutCorporateInput>
  }

  export type TalentAccessLogCreateManyCorporateInputEnvelope = {
    data: TalentAccessLogCreateManyCorporateInput | TalentAccessLogCreateManyCorporateInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCorporateInput = {
    update: XOR<UserUpdateWithoutCorporateInput, UserUncheckedUpdateWithoutCorporateInput>
    create: XOR<UserCreateWithoutCorporateInput, UserUncheckedCreateWithoutCorporateInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCorporateInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCorporateInput, UserUncheckedUpdateWithoutCorporateInput>
  }

  export type UserUpdateWithoutCorporateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    individual?: IndividualProfileUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCorporateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    individual?: IndividualProfileUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TalentAccessLogUpsertWithWhereUniqueWithoutCorporateInput = {
    where: TalentAccessLogWhereUniqueInput
    update: XOR<TalentAccessLogUpdateWithoutCorporateInput, TalentAccessLogUncheckedUpdateWithoutCorporateInput>
    create: XOR<TalentAccessLogCreateWithoutCorporateInput, TalentAccessLogUncheckedCreateWithoutCorporateInput>
  }

  export type TalentAccessLogUpdateWithWhereUniqueWithoutCorporateInput = {
    where: TalentAccessLogWhereUniqueInput
    data: XOR<TalentAccessLogUpdateWithoutCorporateInput, TalentAccessLogUncheckedUpdateWithoutCorporateInput>
  }

  export type TalentAccessLogUpdateManyWithWhereWithoutCorporateInput = {
    where: TalentAccessLogScalarWhereInput
    data: XOR<TalentAccessLogUpdateManyMutationInput, TalentAccessLogUncheckedUpdateManyWithoutCorporateInput>
  }

  export type TalentAccessLogScalarWhereInput = {
    AND?: TalentAccessLogScalarWhereInput | TalentAccessLogScalarWhereInput[]
    OR?: TalentAccessLogScalarWhereInput[]
    NOT?: TalentAccessLogScalarWhereInput | TalentAccessLogScalarWhereInput[]
    accessId?: BigIntFilter<"TalentAccessLog"> | bigint | number
    corporateId?: BigIntFilter<"TalentAccessLog"> | bigint | number
    individualId?: BigIntFilter<"TalentAccessLog"> | bigint | number
    accessedAt?: DateTimeFilter<"TalentAccessLog"> | Date | string
  }

  export type UserCreateWithoutIndividualInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    corporate?: CorporateProfileCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutIndividualInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    corporate?: CorporateProfileUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutIndividualInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutIndividualInput, UserUncheckedCreateWithoutIndividualInput>
  }

  export type TalentAccessLogCreateWithoutIndividualInput = {
    accessId?: bigint | number
    accessedAt?: Date | string
    corporate: CorporateProfileCreateNestedOneWithoutAccessLogsInput
  }

  export type TalentAccessLogUncheckedCreateWithoutIndividualInput = {
    accessId?: bigint | number
    corporateId: bigint | number
    accessedAt?: Date | string
  }

  export type TalentAccessLogCreateOrConnectWithoutIndividualInput = {
    where: TalentAccessLogWhereUniqueInput
    create: XOR<TalentAccessLogCreateWithoutIndividualInput, TalentAccessLogUncheckedCreateWithoutIndividualInput>
  }

  export type TalentAccessLogCreateManyIndividualInputEnvelope = {
    data: TalentAccessLogCreateManyIndividualInput | TalentAccessLogCreateManyIndividualInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutIndividualInput = {
    update: XOR<UserUpdateWithoutIndividualInput, UserUncheckedUpdateWithoutIndividualInput>
    create: XOR<UserCreateWithoutIndividualInput, UserUncheckedCreateWithoutIndividualInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutIndividualInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutIndividualInput, UserUncheckedUpdateWithoutIndividualInput>
  }

  export type UserUpdateWithoutIndividualInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporate?: CorporateProfileUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutIndividualInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporate?: CorporateProfileUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TalentAccessLogUpsertWithWhereUniqueWithoutIndividualInput = {
    where: TalentAccessLogWhereUniqueInput
    update: XOR<TalentAccessLogUpdateWithoutIndividualInput, TalentAccessLogUncheckedUpdateWithoutIndividualInput>
    create: XOR<TalentAccessLogCreateWithoutIndividualInput, TalentAccessLogUncheckedCreateWithoutIndividualInput>
  }

  export type TalentAccessLogUpdateWithWhereUniqueWithoutIndividualInput = {
    where: TalentAccessLogWhereUniqueInput
    data: XOR<TalentAccessLogUpdateWithoutIndividualInput, TalentAccessLogUncheckedUpdateWithoutIndividualInput>
  }

  export type TalentAccessLogUpdateManyWithWhereWithoutIndividualInput = {
    where: TalentAccessLogScalarWhereInput
    data: XOR<TalentAccessLogUpdateManyMutationInput, TalentAccessLogUncheckedUpdateManyWithoutIndividualInput>
  }

  export type CorporateProfileCreateWithoutAccessLogsInput = {
    companyId?: bigint | number
    companyName: string
    industryCode: string
    businessRegNo: string
    user: UserCreateNestedOneWithoutCorporateInput
  }

  export type CorporateProfileUncheckedCreateWithoutAccessLogsInput = {
    companyId?: bigint | number
    userId: string
    companyName: string
    industryCode: string
    businessRegNo: string
  }

  export type CorporateProfileCreateOrConnectWithoutAccessLogsInput = {
    where: CorporateProfileWhereUniqueInput
    create: XOR<CorporateProfileCreateWithoutAccessLogsInput, CorporateProfileUncheckedCreateWithoutAccessLogsInput>
  }

  export type IndividualProfileCreateWithoutAccessLogsInput = {
    individualId?: bigint | number
    fullName: string
    visaStatus: string
    isVisaVerified?: boolean
    koreanLevel?: number
    user: UserCreateNestedOneWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateWithoutAccessLogsInput = {
    individualId?: bigint | number
    userId: string
    fullName: string
    visaStatus: string
    isVisaVerified?: boolean
    koreanLevel?: number
  }

  export type IndividualProfileCreateOrConnectWithoutAccessLogsInput = {
    where: IndividualProfileWhereUniqueInput
    create: XOR<IndividualProfileCreateWithoutAccessLogsInput, IndividualProfileUncheckedCreateWithoutAccessLogsInput>
  }

  export type CorporateProfileUpsertWithoutAccessLogsInput = {
    update: XOR<CorporateProfileUpdateWithoutAccessLogsInput, CorporateProfileUncheckedUpdateWithoutAccessLogsInput>
    create: XOR<CorporateProfileCreateWithoutAccessLogsInput, CorporateProfileUncheckedCreateWithoutAccessLogsInput>
    where?: CorporateProfileWhereInput
  }

  export type CorporateProfileUpdateToOneWithWhereWithoutAccessLogsInput = {
    where?: CorporateProfileWhereInput
    data: XOR<CorporateProfileUpdateWithoutAccessLogsInput, CorporateProfileUncheckedUpdateWithoutAccessLogsInput>
  }

  export type CorporateProfileUpdateWithoutAccessLogsInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    industryCode?: StringFieldUpdateOperationsInput | string
    businessRegNo?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCorporateNestedInput
  }

  export type CorporateProfileUncheckedUpdateWithoutAccessLogsInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    industryCode?: StringFieldUpdateOperationsInput | string
    businessRegNo?: StringFieldUpdateOperationsInput | string
  }

  export type IndividualProfileUpsertWithoutAccessLogsInput = {
    update: XOR<IndividualProfileUpdateWithoutAccessLogsInput, IndividualProfileUncheckedUpdateWithoutAccessLogsInput>
    create: XOR<IndividualProfileCreateWithoutAccessLogsInput, IndividualProfileUncheckedCreateWithoutAccessLogsInput>
    where?: IndividualProfileWhereInput
  }

  export type IndividualProfileUpdateToOneWithWhereWithoutAccessLogsInput = {
    where?: IndividualProfileWhereInput
    data: XOR<IndividualProfileUpdateWithoutAccessLogsInput, IndividualProfileUncheckedUpdateWithoutAccessLogsInput>
  }

  export type IndividualProfileUpdateWithoutAccessLogsInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    fullName?: StringFieldUpdateOperationsInput | string
    visaStatus?: StringFieldUpdateOperationsInput | string
    isVisaVerified?: BoolFieldUpdateOperationsInput | boolean
    koreanLevel?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateWithoutAccessLogsInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    visaStatus?: StringFieldUpdateOperationsInput | string
    isVisaVerified?: BoolFieldUpdateOperationsInput | boolean
    koreanLevel?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateWithoutSocialAuthsInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    corporate?: CorporateProfileCreateNestedOneWithoutUserInput
    individual?: IndividualProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSocialAuthsInput = {
    id?: string
    email?: string | null
    password?: string | null
    fullName?: string | null
    userType?: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    corporate?: CorporateProfileUncheckedCreateNestedOneWithoutUserInput
    individual?: IndividualProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSocialAuthsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSocialAuthsInput, UserUncheckedCreateWithoutSocialAuthsInput>
  }

  export type UserUpsertWithoutSocialAuthsInput = {
    update: XOR<UserUpdateWithoutSocialAuthsInput, UserUncheckedUpdateWithoutSocialAuthsInput>
    create: XOR<UserCreateWithoutSocialAuthsInput, UserUncheckedCreateWithoutSocialAuthsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSocialAuthsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSocialAuthsInput, UserUncheckedUpdateWithoutSocialAuthsInput>
  }

  export type UserUpdateWithoutSocialAuthsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporate?: CorporateProfileUpdateOneWithoutUserNestedInput
    individual?: IndividualProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSocialAuthsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporate?: CorporateProfileUncheckedUpdateOneWithoutUserNestedInput
    individual?: IndividualProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type SocialAuthCreateManyUserInput = {
    id?: string
    provider: $Enums.SocialProvider
    providerId: string
  }

  export type SocialAuthUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    providerId?: StringFieldUpdateOperationsInput | string
  }

  export type SocialAuthUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    providerId?: StringFieldUpdateOperationsInput | string
  }

  export type SocialAuthUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    providerId?: StringFieldUpdateOperationsInput | string
  }

  export type TalentAccessLogCreateManyCorporateInput = {
    accessId?: bigint | number
    individualId: bigint | number
    accessedAt?: Date | string
  }

  export type TalentAccessLogUpdateWithoutCorporateInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    individual?: IndividualProfileUpdateOneRequiredWithoutAccessLogsNestedInput
  }

  export type TalentAccessLogUncheckedUpdateWithoutCorporateInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentAccessLogUncheckedUpdateManyWithoutCorporateInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentAccessLogCreateManyIndividualInput = {
    accessId?: bigint | number
    corporateId: bigint | number
    accessedAt?: Date | string
  }

  export type TalentAccessLogUpdateWithoutIndividualInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporate?: CorporateProfileUpdateOneRequiredWithoutAccessLogsNestedInput
  }

  export type TalentAccessLogUncheckedUpdateWithoutIndividualInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TalentAccessLogUncheckedUpdateManyWithoutIndividualInput = {
    accessId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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