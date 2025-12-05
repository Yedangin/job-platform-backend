
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
 * Model UserInformation
 * 
 */
export type UserInformation = $Result.DefaultSelection<Prisma.$UserInformationPayload>
/**
 * Model SocialAuth
 * 
 */
export type SocialAuth = $Result.DefaultSelection<Prisma.$SocialAuthPayload>
/**
 * Model MemberIdentityVerification
 * 
 */
export type MemberIdentityVerification = $Result.DefaultSelection<Prisma.$MemberIdentityVerificationPayload>
/**
 * Model CorporateRegistration
 * 
 */
export type CorporateRegistration = $Result.DefaultSelection<Prisma.$CorporateRegistrationPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Sanction
 * 
 */
export type Sanction = $Result.DefaultSelection<Prisma.$SanctionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  GUEST: 'GUEST',
  MEMBER: 'MEMBER',
  CORPORATE: 'CORPORATE',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const UserStatus: {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  REJECTED: 'REJECTED',
  INACTIVE: 'INACTIVE'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const SocialProvider: {
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
  KAKAO: 'KAKAO',
  APPLE: 'APPLE'
};

export type SocialProvider = (typeof SocialProvider)[keyof typeof SocialProvider]


export const VerificationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus]


export const SanctionType: {
  SUSPENSION: 'SUSPENSION',
  WARNING: 'WARNING',
  BANNED: 'BANNED'
};

export type SanctionType = (typeof SanctionType)[keyof typeof SanctionType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type SocialProvider = $Enums.SocialProvider

export const SocialProvider: typeof $Enums.SocialProvider

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type SanctionType = $Enums.SanctionType

export const SanctionType: typeof $Enums.SanctionType

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
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * `prisma.userInformation`: Exposes CRUD operations for the **UserInformation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserInformations
    * const userInformations = await prisma.userInformation.findMany()
    * ```
    */
  get userInformation(): Prisma.UserInformationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.socialAuth`: Exposes CRUD operations for the **SocialAuth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SocialAuths
    * const socialAuths = await prisma.socialAuth.findMany()
    * ```
    */
  get socialAuth(): Prisma.SocialAuthDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memberIdentityVerification`: Exposes CRUD operations for the **MemberIdentityVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemberIdentityVerifications
    * const memberIdentityVerifications = await prisma.memberIdentityVerification.findMany()
    * ```
    */
  get memberIdentityVerification(): Prisma.MemberIdentityVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.corporateRegistration`: Exposes CRUD operations for the **CorporateRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CorporateRegistrations
    * const corporateRegistrations = await prisma.corporateRegistration.findMany()
    * ```
    */
  get corporateRegistration(): Prisma.CorporateRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sanction`: Exposes CRUD operations for the **Sanction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sanctions
    * const sanctions = await prisma.sanction.findMany()
    * ```
    */
  get sanction(): Prisma.SanctionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    UserInformation: 'UserInformation',
    SocialAuth: 'SocialAuth',
    MemberIdentityVerification: 'MemberIdentityVerification',
    CorporateRegistration: 'CorporateRegistration',
    VerificationToken: 'VerificationToken',
    Sanction: 'Sanction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    userDB?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userInformation" | "socialAuth" | "memberIdentityVerification" | "corporateRegistration" | "verificationToken" | "sanction"
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
      UserInformation: {
        payload: Prisma.$UserInformationPayload<ExtArgs>
        fields: Prisma.UserInformationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserInformationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserInformationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>
          }
          findFirst: {
            args: Prisma.UserInformationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserInformationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>
          }
          findMany: {
            args: Prisma.UserInformationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>[]
          }
          create: {
            args: Prisma.UserInformationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>
          }
          createMany: {
            args: Prisma.UserInformationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserInformationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>[]
          }
          delete: {
            args: Prisma.UserInformationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>
          }
          update: {
            args: Prisma.UserInformationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>
          }
          deleteMany: {
            args: Prisma.UserInformationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserInformationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserInformationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>[]
          }
          upsert: {
            args: Prisma.UserInformationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInformationPayload>
          }
          aggregate: {
            args: Prisma.UserInformationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserInformation>
          }
          groupBy: {
            args: Prisma.UserInformationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserInformationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserInformationCountArgs<ExtArgs>
            result: $Utils.Optional<UserInformationCountAggregateOutputType> | number
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
      MemberIdentityVerification: {
        payload: Prisma.$MemberIdentityVerificationPayload<ExtArgs>
        fields: Prisma.MemberIdentityVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberIdentityVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberIdentityVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>
          }
          findFirst: {
            args: Prisma.MemberIdentityVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberIdentityVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>
          }
          findMany: {
            args: Prisma.MemberIdentityVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>[]
          }
          create: {
            args: Prisma.MemberIdentityVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>
          }
          createMany: {
            args: Prisma.MemberIdentityVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberIdentityVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>[]
          }
          delete: {
            args: Prisma.MemberIdentityVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>
          }
          update: {
            args: Prisma.MemberIdentityVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>
          }
          deleteMany: {
            args: Prisma.MemberIdentityVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberIdentityVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberIdentityVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>[]
          }
          upsert: {
            args: Prisma.MemberIdentityVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberIdentityVerificationPayload>
          }
          aggregate: {
            args: Prisma.MemberIdentityVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberIdentityVerification>
          }
          groupBy: {
            args: Prisma.MemberIdentityVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberIdentityVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberIdentityVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<MemberIdentityVerificationCountAggregateOutputType> | number
          }
        }
      }
      CorporateRegistration: {
        payload: Prisma.$CorporateRegistrationPayload<ExtArgs>
        fields: Prisma.CorporateRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CorporateRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CorporateRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>
          }
          findFirst: {
            args: Prisma.CorporateRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CorporateRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>
          }
          findMany: {
            args: Prisma.CorporateRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>[]
          }
          create: {
            args: Prisma.CorporateRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>
          }
          createMany: {
            args: Prisma.CorporateRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CorporateRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>[]
          }
          delete: {
            args: Prisma.CorporateRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>
          }
          update: {
            args: Prisma.CorporateRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.CorporateRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CorporateRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CorporateRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.CorporateRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorporateRegistrationPayload>
          }
          aggregate: {
            args: Prisma.CorporateRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCorporateRegistration>
          }
          groupBy: {
            args: Prisma.CorporateRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CorporateRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CorporateRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<CorporateRegistrationCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Sanction: {
        payload: Prisma.$SanctionPayload<ExtArgs>
        fields: Prisma.SanctionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SanctionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SanctionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>
          }
          findFirst: {
            args: Prisma.SanctionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SanctionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>
          }
          findMany: {
            args: Prisma.SanctionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>[]
          }
          create: {
            args: Prisma.SanctionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>
          }
          createMany: {
            args: Prisma.SanctionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SanctionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>[]
          }
          delete: {
            args: Prisma.SanctionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>
          }
          update: {
            args: Prisma.SanctionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>
          }
          deleteMany: {
            args: Prisma.SanctionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SanctionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SanctionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>[]
          }
          upsert: {
            args: Prisma.SanctionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SanctionPayload>
          }
          aggregate: {
            args: Prisma.SanctionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSanction>
          }
          groupBy: {
            args: Prisma.SanctionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SanctionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SanctionCountArgs<ExtArgs>
            result: $Utils.Optional<SanctionCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    userInformation?: UserInformationOmit
    socialAuth?: SocialAuthOmit
    memberIdentityVerification?: MemberIdentityVerificationOmit
    corporateRegistration?: CorporateRegistrationOmit
    verificationToken?: VerificationTokenOmit
    sanction?: SanctionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    verifiedMemberIdentities: number
    verifiedCorporateRegistrations: number
    sanctions: number
    verificationTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verifiedMemberIdentities?: boolean | UserCountOutputTypeCountVerifiedMemberIdentitiesArgs
    verifiedCorporateRegistrations?: boolean | UserCountOutputTypeCountVerifiedCorporateRegistrationsArgs
    sanctions?: boolean | UserCountOutputTypeCountSanctionsArgs
    verificationTokens?: boolean | UserCountOutputTypeCountVerificationTokensArgs
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
  export type UserCountOutputTypeCountVerifiedMemberIdentitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberIdentityVerificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVerifiedCorporateRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorporateRegistrationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSanctionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SanctionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVerificationTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
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
    role: $Enums.UserRole | null
    email: string | null
    password: string | null
    phone: string | null
    fullName: string | null
    status: $Enums.UserStatus | null
    isEmailedVerified: boolean | null
    isPhoneVerified: boolean | null
    walletId: string | null
    userInfoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    role: $Enums.UserRole | null
    email: string | null
    password: string | null
    phone: string | null
    fullName: string | null
    status: $Enums.UserStatus | null
    isEmailedVerified: boolean | null
    isPhoneVerified: boolean | null
    walletId: string | null
    userInfoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    role: number
    email: number
    password: number
    phone: number
    fullName: number
    status: number
    isEmailedVerified: number
    isPhoneVerified: number
    walletId: number
    userInfoId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    role?: true
    email?: true
    password?: true
    phone?: true
    fullName?: true
    status?: true
    isEmailedVerified?: true
    isPhoneVerified?: true
    walletId?: true
    userInfoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    role?: true
    email?: true
    password?: true
    phone?: true
    fullName?: true
    status?: true
    isEmailedVerified?: true
    isPhoneVerified?: true
    walletId?: true
    userInfoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    role?: true
    email?: true
    password?: true
    phone?: true
    fullName?: true
    status?: true
    isEmailedVerified?: true
    isPhoneVerified?: true
    walletId?: true
    userInfoId?: true
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
    role: $Enums.UserRole
    email: string | null
    password: string | null
    phone: string | null
    fullName: string | null
    status: $Enums.UserStatus
    isEmailedVerified: boolean
    isPhoneVerified: boolean
    walletId: string | null
    userInfoId: string | null
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
    role?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    fullName?: boolean
    status?: boolean
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: boolean
    userInfoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    memberIdentityVerification?: boolean | User$memberIdentityVerificationArgs<ExtArgs>
    corporateRegistration?: boolean | User$corporateRegistrationArgs<ExtArgs>
    verifiedMemberIdentities?: boolean | User$verifiedMemberIdentitiesArgs<ExtArgs>
    verifiedCorporateRegistrations?: boolean | User$verifiedCorporateRegistrationsArgs<ExtArgs>
    sanctions?: boolean | User$sanctionsArgs<ExtArgs>
    userInformation?: boolean | User$userInformationArgs<ExtArgs>
    socialAuths?: boolean | User$socialAuthsArgs<ExtArgs>
    verificationTokens?: boolean | User$verificationTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    fullName?: boolean
    status?: boolean
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: boolean
    userInfoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    fullName?: boolean
    status?: boolean
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: boolean
    userInfoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    role?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    fullName?: boolean
    status?: boolean
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: boolean
    userInfoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "email" | "password" | "phone" | "fullName" | "status" | "isEmailedVerified" | "isPhoneVerified" | "walletId" | "userInfoId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberIdentityVerification?: boolean | User$memberIdentityVerificationArgs<ExtArgs>
    corporateRegistration?: boolean | User$corporateRegistrationArgs<ExtArgs>
    verifiedMemberIdentities?: boolean | User$verifiedMemberIdentitiesArgs<ExtArgs>
    verifiedCorporateRegistrations?: boolean | User$verifiedCorporateRegistrationsArgs<ExtArgs>
    sanctions?: boolean | User$sanctionsArgs<ExtArgs>
    userInformation?: boolean | User$userInformationArgs<ExtArgs>
    socialAuths?: boolean | User$socialAuthsArgs<ExtArgs>
    verificationTokens?: boolean | User$verificationTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      memberIdentityVerification: Prisma.$MemberIdentityVerificationPayload<ExtArgs> | null
      corporateRegistration: Prisma.$CorporateRegistrationPayload<ExtArgs> | null
      verifiedMemberIdentities: Prisma.$MemberIdentityVerificationPayload<ExtArgs>[]
      verifiedCorporateRegistrations: Prisma.$CorporateRegistrationPayload<ExtArgs>[]
      sanctions: Prisma.$SanctionPayload<ExtArgs>[]
      userInformation: Prisma.$UserInformationPayload<ExtArgs> | null
      socialAuths: Prisma.$SocialAuthPayload<ExtArgs> | null
      verificationTokens: Prisma.$VerificationTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.UserRole
      email: string | null
      password: string | null
      phone: string | null
      fullName: string | null
      status: $Enums.UserStatus
      isEmailedVerified: boolean
      isPhoneVerified: boolean
      walletId: string | null
      userInfoId: string | null
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
    memberIdentityVerification<T extends User$memberIdentityVerificationArgs<ExtArgs> = {}>(args?: Subset<T, User$memberIdentityVerificationArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    corporateRegistration<T extends User$corporateRegistrationArgs<ExtArgs> = {}>(args?: Subset<T, User$corporateRegistrationArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    verifiedMemberIdentities<T extends User$verifiedMemberIdentitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$verifiedMemberIdentitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    verifiedCorporateRegistrations<T extends User$verifiedCorporateRegistrationsArgs<ExtArgs> = {}>(args?: Subset<T, User$verifiedCorporateRegistrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sanctions<T extends User$sanctionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sanctionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userInformation<T extends User$userInformationArgs<ExtArgs> = {}>(args?: Subset<T, User$userInformationArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    socialAuths<T extends User$socialAuthsArgs<ExtArgs> = {}>(args?: Subset<T, User$socialAuthsArgs<ExtArgs>>): Prisma__SocialAuthClient<$Result.GetResult<Prisma.$SocialAuthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    verificationTokens<T extends User$verificationTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$verificationTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly role: FieldRef<"User", 'UserRole'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly isEmailedVerified: FieldRef<"User", 'Boolean'>
    readonly isPhoneVerified: FieldRef<"User", 'Boolean'>
    readonly walletId: FieldRef<"User", 'String'>
    readonly userInfoId: FieldRef<"User", 'String'>
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
   * User.memberIdentityVerification
   */
  export type User$memberIdentityVerificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    where?: MemberIdentityVerificationWhereInput
  }

  /**
   * User.corporateRegistration
   */
  export type User$corporateRegistrationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    where?: CorporateRegistrationWhereInput
  }

  /**
   * User.verifiedMemberIdentities
   */
  export type User$verifiedMemberIdentitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    where?: MemberIdentityVerificationWhereInput
    orderBy?: MemberIdentityVerificationOrderByWithRelationInput | MemberIdentityVerificationOrderByWithRelationInput[]
    cursor?: MemberIdentityVerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberIdentityVerificationScalarFieldEnum | MemberIdentityVerificationScalarFieldEnum[]
  }

  /**
   * User.verifiedCorporateRegistrations
   */
  export type User$verifiedCorporateRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    where?: CorporateRegistrationWhereInput
    orderBy?: CorporateRegistrationOrderByWithRelationInput | CorporateRegistrationOrderByWithRelationInput[]
    cursor?: CorporateRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CorporateRegistrationScalarFieldEnum | CorporateRegistrationScalarFieldEnum[]
  }

  /**
   * User.sanctions
   */
  export type User$sanctionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    where?: SanctionWhereInput
    orderBy?: SanctionOrderByWithRelationInput | SanctionOrderByWithRelationInput[]
    cursor?: SanctionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SanctionScalarFieldEnum | SanctionScalarFieldEnum[]
  }

  /**
   * User.userInformation
   */
  export type User$userInformationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    where?: UserInformationWhereInput
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
  }

  /**
   * User.verificationTokens
   */
  export type User$verificationTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    cursor?: VerificationTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
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
   * Model UserInformation
   */

  export type AggregateUserInformation = {
    _count: UserInformationCountAggregateOutputType | null
    _min: UserInformationMinAggregateOutputType | null
    _max: UserInformationMaxAggregateOutputType | null
  }

  export type UserInformationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    profileImage: string | null
    gender: string | null
    address: string | null
    country: string | null
    city: string | null
    cvForm: string | null
    additionalInformation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserInformationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    profileImage: string | null
    gender: string | null
    address: string | null
    country: string | null
    city: string | null
    cvForm: string | null
    additionalInformation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserInformationCountAggregateOutputType = {
    id: number
    userId: number
    profileImage: number
    gender: number
    address: number
    country: number
    city: number
    cvForm: number
    additionalInformation: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserInformationMinAggregateInputType = {
    id?: true
    userId?: true
    profileImage?: true
    gender?: true
    address?: true
    country?: true
    city?: true
    cvForm?: true
    additionalInformation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserInformationMaxAggregateInputType = {
    id?: true
    userId?: true
    profileImage?: true
    gender?: true
    address?: true
    country?: true
    city?: true
    cvForm?: true
    additionalInformation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserInformationCountAggregateInputType = {
    id?: true
    userId?: true
    profileImage?: true
    gender?: true
    address?: true
    country?: true
    city?: true
    cvForm?: true
    additionalInformation?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserInformationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInformation to aggregate.
     */
    where?: UserInformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInformations to fetch.
     */
    orderBy?: UserInformationOrderByWithRelationInput | UserInformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserInformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserInformations
    **/
    _count?: true | UserInformationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserInformationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserInformationMaxAggregateInputType
  }

  export type GetUserInformationAggregateType<T extends UserInformationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserInformation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserInformation[P]>
      : GetScalarType<T[P], AggregateUserInformation[P]>
  }




  export type UserInformationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInformationWhereInput
    orderBy?: UserInformationOrderByWithAggregationInput | UserInformationOrderByWithAggregationInput[]
    by: UserInformationScalarFieldEnum[] | UserInformationScalarFieldEnum
    having?: UserInformationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserInformationCountAggregateInputType | true
    _min?: UserInformationMinAggregateInputType
    _max?: UserInformationMaxAggregateInputType
  }

  export type UserInformationGroupByOutputType = {
    id: string
    userId: string
    profileImage: string | null
    gender: string | null
    address: string | null
    country: string | null
    city: string | null
    cvForm: string | null
    additionalInformation: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserInformationCountAggregateOutputType | null
    _min: UserInformationMinAggregateOutputType | null
    _max: UserInformationMaxAggregateOutputType | null
  }

  type GetUserInformationGroupByPayload<T extends UserInformationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserInformationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserInformationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserInformationGroupByOutputType[P]>
            : GetScalarType<T[P], UserInformationGroupByOutputType[P]>
        }
      >
    >


  export type UserInformationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    profileImage?: boolean
    gender?: boolean
    address?: boolean
    country?: boolean
    city?: boolean
    cvForm?: boolean
    additionalInformation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInformation"]>

  export type UserInformationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    profileImage?: boolean
    gender?: boolean
    address?: boolean
    country?: boolean
    city?: boolean
    cvForm?: boolean
    additionalInformation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInformation"]>

  export type UserInformationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    profileImage?: boolean
    gender?: boolean
    address?: boolean
    country?: boolean
    city?: boolean
    cvForm?: boolean
    additionalInformation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInformation"]>

  export type UserInformationSelectScalar = {
    id?: boolean
    userId?: boolean
    profileImage?: boolean
    gender?: boolean
    address?: boolean
    country?: boolean
    city?: boolean
    cvForm?: boolean
    additionalInformation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInformationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "profileImage" | "gender" | "address" | "country" | "city" | "cvForm" | "additionalInformation" | "createdAt" | "updatedAt", ExtArgs["result"]["userInformation"]>
  export type UserInformationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserInformationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserInformationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserInformationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserInformation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      profileImage: string | null
      gender: string | null
      address: string | null
      country: string | null
      city: string | null
      cvForm: string | null
      additionalInformation: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userInformation"]>
    composites: {}
  }

  type UserInformationGetPayload<S extends boolean | null | undefined | UserInformationDefaultArgs> = $Result.GetResult<Prisma.$UserInformationPayload, S>

  type UserInformationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserInformationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserInformationCountAggregateInputType | true
    }

  export interface UserInformationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserInformation'], meta: { name: 'UserInformation' } }
    /**
     * Find zero or one UserInformation that matches the filter.
     * @param {UserInformationFindUniqueArgs} args - Arguments to find a UserInformation
     * @example
     * // Get one UserInformation
     * const userInformation = await prisma.userInformation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserInformationFindUniqueArgs>(args: SelectSubset<T, UserInformationFindUniqueArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserInformation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserInformationFindUniqueOrThrowArgs} args - Arguments to find a UserInformation
     * @example
     * // Get one UserInformation
     * const userInformation = await prisma.userInformation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserInformationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserInformationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInformation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInformationFindFirstArgs} args - Arguments to find a UserInformation
     * @example
     * // Get one UserInformation
     * const userInformation = await prisma.userInformation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserInformationFindFirstArgs>(args?: SelectSubset<T, UserInformationFindFirstArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInformation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInformationFindFirstOrThrowArgs} args - Arguments to find a UserInformation
     * @example
     * // Get one UserInformation
     * const userInformation = await prisma.userInformation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserInformationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserInformationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserInformations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInformationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInformations
     * const userInformations = await prisma.userInformation.findMany()
     * 
     * // Get first 10 UserInformations
     * const userInformations = await prisma.userInformation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userInformationWithIdOnly = await prisma.userInformation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserInformationFindManyArgs>(args?: SelectSubset<T, UserInformationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserInformation.
     * @param {UserInformationCreateArgs} args - Arguments to create a UserInformation.
     * @example
     * // Create one UserInformation
     * const UserInformation = await prisma.userInformation.create({
     *   data: {
     *     // ... data to create a UserInformation
     *   }
     * })
     * 
     */
    create<T extends UserInformationCreateArgs>(args: SelectSubset<T, UserInformationCreateArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserInformations.
     * @param {UserInformationCreateManyArgs} args - Arguments to create many UserInformations.
     * @example
     * // Create many UserInformations
     * const userInformation = await prisma.userInformation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserInformationCreateManyArgs>(args?: SelectSubset<T, UserInformationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserInformations and returns the data saved in the database.
     * @param {UserInformationCreateManyAndReturnArgs} args - Arguments to create many UserInformations.
     * @example
     * // Create many UserInformations
     * const userInformation = await prisma.userInformation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserInformations and only return the `id`
     * const userInformationWithIdOnly = await prisma.userInformation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserInformationCreateManyAndReturnArgs>(args?: SelectSubset<T, UserInformationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserInformation.
     * @param {UserInformationDeleteArgs} args - Arguments to delete one UserInformation.
     * @example
     * // Delete one UserInformation
     * const UserInformation = await prisma.userInformation.delete({
     *   where: {
     *     // ... filter to delete one UserInformation
     *   }
     * })
     * 
     */
    delete<T extends UserInformationDeleteArgs>(args: SelectSubset<T, UserInformationDeleteArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserInformation.
     * @param {UserInformationUpdateArgs} args - Arguments to update one UserInformation.
     * @example
     * // Update one UserInformation
     * const userInformation = await prisma.userInformation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserInformationUpdateArgs>(args: SelectSubset<T, UserInformationUpdateArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserInformations.
     * @param {UserInformationDeleteManyArgs} args - Arguments to filter UserInformations to delete.
     * @example
     * // Delete a few UserInformations
     * const { count } = await prisma.userInformation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserInformationDeleteManyArgs>(args?: SelectSubset<T, UserInformationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInformations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInformationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInformations
     * const userInformation = await prisma.userInformation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserInformationUpdateManyArgs>(args: SelectSubset<T, UserInformationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInformations and returns the data updated in the database.
     * @param {UserInformationUpdateManyAndReturnArgs} args - Arguments to update many UserInformations.
     * @example
     * // Update many UserInformations
     * const userInformation = await prisma.userInformation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserInformations and only return the `id`
     * const userInformationWithIdOnly = await prisma.userInformation.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserInformationUpdateManyAndReturnArgs>(args: SelectSubset<T, UserInformationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserInformation.
     * @param {UserInformationUpsertArgs} args - Arguments to update or create a UserInformation.
     * @example
     * // Update or create a UserInformation
     * const userInformation = await prisma.userInformation.upsert({
     *   create: {
     *     // ... data to create a UserInformation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInformation we want to update
     *   }
     * })
     */
    upsert<T extends UserInformationUpsertArgs>(args: SelectSubset<T, UserInformationUpsertArgs<ExtArgs>>): Prisma__UserInformationClient<$Result.GetResult<Prisma.$UserInformationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserInformations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInformationCountArgs} args - Arguments to filter UserInformations to count.
     * @example
     * // Count the number of UserInformations
     * const count = await prisma.userInformation.count({
     *   where: {
     *     // ... the filter for the UserInformations we want to count
     *   }
     * })
    **/
    count<T extends UserInformationCountArgs>(
      args?: Subset<T, UserInformationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserInformationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserInformation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInformationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserInformationAggregateArgs>(args: Subset<T, UserInformationAggregateArgs>): Prisma.PrismaPromise<GetUserInformationAggregateType<T>>

    /**
     * Group by UserInformation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInformationGroupByArgs} args - Group by arguments.
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
      T extends UserInformationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserInformationGroupByArgs['orderBy'] }
        : { orderBy?: UserInformationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserInformationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInformationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserInformation model
   */
  readonly fields: UserInformationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInformation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserInformationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the UserInformation model
   */
  interface UserInformationFieldRefs {
    readonly id: FieldRef<"UserInformation", 'String'>
    readonly userId: FieldRef<"UserInformation", 'String'>
    readonly profileImage: FieldRef<"UserInformation", 'String'>
    readonly gender: FieldRef<"UserInformation", 'String'>
    readonly address: FieldRef<"UserInformation", 'String'>
    readonly country: FieldRef<"UserInformation", 'String'>
    readonly city: FieldRef<"UserInformation", 'String'>
    readonly cvForm: FieldRef<"UserInformation", 'String'>
    readonly additionalInformation: FieldRef<"UserInformation", 'String'>
    readonly createdAt: FieldRef<"UserInformation", 'DateTime'>
    readonly updatedAt: FieldRef<"UserInformation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserInformation findUnique
   */
  export type UserInformationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * Filter, which UserInformation to fetch.
     */
    where: UserInformationWhereUniqueInput
  }

  /**
   * UserInformation findUniqueOrThrow
   */
  export type UserInformationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * Filter, which UserInformation to fetch.
     */
    where: UserInformationWhereUniqueInput
  }

  /**
   * UserInformation findFirst
   */
  export type UserInformationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * Filter, which UserInformation to fetch.
     */
    where?: UserInformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInformations to fetch.
     */
    orderBy?: UserInformationOrderByWithRelationInput | UserInformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInformations.
     */
    cursor?: UserInformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInformations.
     */
    distinct?: UserInformationScalarFieldEnum | UserInformationScalarFieldEnum[]
  }

  /**
   * UserInformation findFirstOrThrow
   */
  export type UserInformationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * Filter, which UserInformation to fetch.
     */
    where?: UserInformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInformations to fetch.
     */
    orderBy?: UserInformationOrderByWithRelationInput | UserInformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInformations.
     */
    cursor?: UserInformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInformations.
     */
    distinct?: UserInformationScalarFieldEnum | UserInformationScalarFieldEnum[]
  }

  /**
   * UserInformation findMany
   */
  export type UserInformationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * Filter, which UserInformations to fetch.
     */
    where?: UserInformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInformations to fetch.
     */
    orderBy?: UserInformationOrderByWithRelationInput | UserInformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserInformations.
     */
    cursor?: UserInformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInformations.
     */
    skip?: number
    distinct?: UserInformationScalarFieldEnum | UserInformationScalarFieldEnum[]
  }

  /**
   * UserInformation create
   */
  export type UserInformationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * The data needed to create a UserInformation.
     */
    data: XOR<UserInformationCreateInput, UserInformationUncheckedCreateInput>
  }

  /**
   * UserInformation createMany
   */
  export type UserInformationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserInformations.
     */
    data: UserInformationCreateManyInput | UserInformationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserInformation createManyAndReturn
   */
  export type UserInformationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * The data used to create many UserInformations.
     */
    data: UserInformationCreateManyInput | UserInformationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInformation update
   */
  export type UserInformationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * The data needed to update a UserInformation.
     */
    data: XOR<UserInformationUpdateInput, UserInformationUncheckedUpdateInput>
    /**
     * Choose, which UserInformation to update.
     */
    where: UserInformationWhereUniqueInput
  }

  /**
   * UserInformation updateMany
   */
  export type UserInformationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserInformations.
     */
    data: XOR<UserInformationUpdateManyMutationInput, UserInformationUncheckedUpdateManyInput>
    /**
     * Filter which UserInformations to update
     */
    where?: UserInformationWhereInput
    /**
     * Limit how many UserInformations to update.
     */
    limit?: number
  }

  /**
   * UserInformation updateManyAndReturn
   */
  export type UserInformationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * The data used to update UserInformations.
     */
    data: XOR<UserInformationUpdateManyMutationInput, UserInformationUncheckedUpdateManyInput>
    /**
     * Filter which UserInformations to update
     */
    where?: UserInformationWhereInput
    /**
     * Limit how many UserInformations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInformation upsert
   */
  export type UserInformationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * The filter to search for the UserInformation to update in case it exists.
     */
    where: UserInformationWhereUniqueInput
    /**
     * In case the UserInformation found by the `where` argument doesn't exist, create a new UserInformation with this data.
     */
    create: XOR<UserInformationCreateInput, UserInformationUncheckedCreateInput>
    /**
     * In case the UserInformation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserInformationUpdateInput, UserInformationUncheckedUpdateInput>
  }

  /**
   * UserInformation delete
   */
  export type UserInformationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
    /**
     * Filter which UserInformation to delete.
     */
    where: UserInformationWhereUniqueInput
  }

  /**
   * UserInformation deleteMany
   */
  export type UserInformationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInformations to delete
     */
    where?: UserInformationWhereInput
    /**
     * Limit how many UserInformations to delete.
     */
    limit?: number
  }

  /**
   * UserInformation without action
   */
  export type UserInformationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInformation
     */
    select?: UserInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInformation
     */
    omit?: UserInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInformationInclude<ExtArgs> | null
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
   * Model MemberIdentityVerification
   */

  export type AggregateMemberIdentityVerification = {
    _count: MemberIdentityVerificationCountAggregateOutputType | null
    _min: MemberIdentityVerificationMinAggregateOutputType | null
    _max: MemberIdentityVerificationMaxAggregateOutputType | null
  }

  export type MemberIdentityVerificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    passportPhoto: string | null
    selfiePhoto: string | null
    verificationStatus: $Enums.VerificationStatus | null
    isVerifiedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberIdentityVerificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    passportPhoto: string | null
    selfiePhoto: string | null
    verificationStatus: $Enums.VerificationStatus | null
    isVerifiedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberIdentityVerificationCountAggregateOutputType = {
    id: number
    userId: number
    passportPhoto: number
    selfiePhoto: number
    verificationStatus: number
    isVerifiedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberIdentityVerificationMinAggregateInputType = {
    id?: true
    userId?: true
    passportPhoto?: true
    selfiePhoto?: true
    verificationStatus?: true
    isVerifiedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberIdentityVerificationMaxAggregateInputType = {
    id?: true
    userId?: true
    passportPhoto?: true
    selfiePhoto?: true
    verificationStatus?: true
    isVerifiedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberIdentityVerificationCountAggregateInputType = {
    id?: true
    userId?: true
    passportPhoto?: true
    selfiePhoto?: true
    verificationStatus?: true
    isVerifiedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberIdentityVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberIdentityVerification to aggregate.
     */
    where?: MemberIdentityVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberIdentityVerifications to fetch.
     */
    orderBy?: MemberIdentityVerificationOrderByWithRelationInput | MemberIdentityVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberIdentityVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberIdentityVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberIdentityVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemberIdentityVerifications
    **/
    _count?: true | MemberIdentityVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberIdentityVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberIdentityVerificationMaxAggregateInputType
  }

  export type GetMemberIdentityVerificationAggregateType<T extends MemberIdentityVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberIdentityVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberIdentityVerification[P]>
      : GetScalarType<T[P], AggregateMemberIdentityVerification[P]>
  }




  export type MemberIdentityVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberIdentityVerificationWhereInput
    orderBy?: MemberIdentityVerificationOrderByWithAggregationInput | MemberIdentityVerificationOrderByWithAggregationInput[]
    by: MemberIdentityVerificationScalarFieldEnum[] | MemberIdentityVerificationScalarFieldEnum
    having?: MemberIdentityVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberIdentityVerificationCountAggregateInputType | true
    _min?: MemberIdentityVerificationMinAggregateInputType
    _max?: MemberIdentityVerificationMaxAggregateInputType
  }

  export type MemberIdentityVerificationGroupByOutputType = {
    id: string
    userId: string
    passportPhoto: string | null
    selfiePhoto: string | null
    verificationStatus: $Enums.VerificationStatus
    isVerifiedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: MemberIdentityVerificationCountAggregateOutputType | null
    _min: MemberIdentityVerificationMinAggregateOutputType | null
    _max: MemberIdentityVerificationMaxAggregateOutputType | null
  }

  type GetMemberIdentityVerificationGroupByPayload<T extends MemberIdentityVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberIdentityVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberIdentityVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberIdentityVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], MemberIdentityVerificationGroupByOutputType[P]>
        }
      >
    >


  export type MemberIdentityVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    passportPhoto?: boolean
    selfiePhoto?: boolean
    verificationStatus?: boolean
    isVerifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | MemberIdentityVerification$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["memberIdentityVerification"]>

  export type MemberIdentityVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    passportPhoto?: boolean
    selfiePhoto?: boolean
    verificationStatus?: boolean
    isVerifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | MemberIdentityVerification$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["memberIdentityVerification"]>

  export type MemberIdentityVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    passportPhoto?: boolean
    selfiePhoto?: boolean
    verificationStatus?: boolean
    isVerifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | MemberIdentityVerification$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["memberIdentityVerification"]>

  export type MemberIdentityVerificationSelectScalar = {
    id?: boolean
    userId?: boolean
    passportPhoto?: boolean
    selfiePhoto?: boolean
    verificationStatus?: boolean
    isVerifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberIdentityVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "passportPhoto" | "selfiePhoto" | "verificationStatus" | "isVerifiedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["memberIdentityVerification"]>
  export type MemberIdentityVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | MemberIdentityVerification$verifierArgs<ExtArgs>
  }
  export type MemberIdentityVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | MemberIdentityVerification$verifierArgs<ExtArgs>
  }
  export type MemberIdentityVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | MemberIdentityVerification$verifierArgs<ExtArgs>
  }

  export type $MemberIdentityVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberIdentityVerification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      verifier: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      passportPhoto: string | null
      selfiePhoto: string | null
      verificationStatus: $Enums.VerificationStatus
      isVerifiedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["memberIdentityVerification"]>
    composites: {}
  }

  type MemberIdentityVerificationGetPayload<S extends boolean | null | undefined | MemberIdentityVerificationDefaultArgs> = $Result.GetResult<Prisma.$MemberIdentityVerificationPayload, S>

  type MemberIdentityVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberIdentityVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberIdentityVerificationCountAggregateInputType | true
    }

  export interface MemberIdentityVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberIdentityVerification'], meta: { name: 'MemberIdentityVerification' } }
    /**
     * Find zero or one MemberIdentityVerification that matches the filter.
     * @param {MemberIdentityVerificationFindUniqueArgs} args - Arguments to find a MemberIdentityVerification
     * @example
     * // Get one MemberIdentityVerification
     * const memberIdentityVerification = await prisma.memberIdentityVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberIdentityVerificationFindUniqueArgs>(args: SelectSubset<T, MemberIdentityVerificationFindUniqueArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemberIdentityVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberIdentityVerificationFindUniqueOrThrowArgs} args - Arguments to find a MemberIdentityVerification
     * @example
     * // Get one MemberIdentityVerification
     * const memberIdentityVerification = await prisma.memberIdentityVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberIdentityVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberIdentityVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberIdentityVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberIdentityVerificationFindFirstArgs} args - Arguments to find a MemberIdentityVerification
     * @example
     * // Get one MemberIdentityVerification
     * const memberIdentityVerification = await prisma.memberIdentityVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberIdentityVerificationFindFirstArgs>(args?: SelectSubset<T, MemberIdentityVerificationFindFirstArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberIdentityVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberIdentityVerificationFindFirstOrThrowArgs} args - Arguments to find a MemberIdentityVerification
     * @example
     * // Get one MemberIdentityVerification
     * const memberIdentityVerification = await prisma.memberIdentityVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberIdentityVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberIdentityVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemberIdentityVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberIdentityVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemberIdentityVerifications
     * const memberIdentityVerifications = await prisma.memberIdentityVerification.findMany()
     * 
     * // Get first 10 MemberIdentityVerifications
     * const memberIdentityVerifications = await prisma.memberIdentityVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberIdentityVerificationWithIdOnly = await prisma.memberIdentityVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberIdentityVerificationFindManyArgs>(args?: SelectSubset<T, MemberIdentityVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemberIdentityVerification.
     * @param {MemberIdentityVerificationCreateArgs} args - Arguments to create a MemberIdentityVerification.
     * @example
     * // Create one MemberIdentityVerification
     * const MemberIdentityVerification = await prisma.memberIdentityVerification.create({
     *   data: {
     *     // ... data to create a MemberIdentityVerification
     *   }
     * })
     * 
     */
    create<T extends MemberIdentityVerificationCreateArgs>(args: SelectSubset<T, MemberIdentityVerificationCreateArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemberIdentityVerifications.
     * @param {MemberIdentityVerificationCreateManyArgs} args - Arguments to create many MemberIdentityVerifications.
     * @example
     * // Create many MemberIdentityVerifications
     * const memberIdentityVerification = await prisma.memberIdentityVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberIdentityVerificationCreateManyArgs>(args?: SelectSubset<T, MemberIdentityVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemberIdentityVerifications and returns the data saved in the database.
     * @param {MemberIdentityVerificationCreateManyAndReturnArgs} args - Arguments to create many MemberIdentityVerifications.
     * @example
     * // Create many MemberIdentityVerifications
     * const memberIdentityVerification = await prisma.memberIdentityVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemberIdentityVerifications and only return the `id`
     * const memberIdentityVerificationWithIdOnly = await prisma.memberIdentityVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberIdentityVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberIdentityVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemberIdentityVerification.
     * @param {MemberIdentityVerificationDeleteArgs} args - Arguments to delete one MemberIdentityVerification.
     * @example
     * // Delete one MemberIdentityVerification
     * const MemberIdentityVerification = await prisma.memberIdentityVerification.delete({
     *   where: {
     *     // ... filter to delete one MemberIdentityVerification
     *   }
     * })
     * 
     */
    delete<T extends MemberIdentityVerificationDeleteArgs>(args: SelectSubset<T, MemberIdentityVerificationDeleteArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemberIdentityVerification.
     * @param {MemberIdentityVerificationUpdateArgs} args - Arguments to update one MemberIdentityVerification.
     * @example
     * // Update one MemberIdentityVerification
     * const memberIdentityVerification = await prisma.memberIdentityVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberIdentityVerificationUpdateArgs>(args: SelectSubset<T, MemberIdentityVerificationUpdateArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemberIdentityVerifications.
     * @param {MemberIdentityVerificationDeleteManyArgs} args - Arguments to filter MemberIdentityVerifications to delete.
     * @example
     * // Delete a few MemberIdentityVerifications
     * const { count } = await prisma.memberIdentityVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberIdentityVerificationDeleteManyArgs>(args?: SelectSubset<T, MemberIdentityVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberIdentityVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberIdentityVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemberIdentityVerifications
     * const memberIdentityVerification = await prisma.memberIdentityVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberIdentityVerificationUpdateManyArgs>(args: SelectSubset<T, MemberIdentityVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberIdentityVerifications and returns the data updated in the database.
     * @param {MemberIdentityVerificationUpdateManyAndReturnArgs} args - Arguments to update many MemberIdentityVerifications.
     * @example
     * // Update many MemberIdentityVerifications
     * const memberIdentityVerification = await prisma.memberIdentityVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemberIdentityVerifications and only return the `id`
     * const memberIdentityVerificationWithIdOnly = await prisma.memberIdentityVerification.updateManyAndReturn({
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
    updateManyAndReturn<T extends MemberIdentityVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberIdentityVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemberIdentityVerification.
     * @param {MemberIdentityVerificationUpsertArgs} args - Arguments to update or create a MemberIdentityVerification.
     * @example
     * // Update or create a MemberIdentityVerification
     * const memberIdentityVerification = await prisma.memberIdentityVerification.upsert({
     *   create: {
     *     // ... data to create a MemberIdentityVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemberIdentityVerification we want to update
     *   }
     * })
     */
    upsert<T extends MemberIdentityVerificationUpsertArgs>(args: SelectSubset<T, MemberIdentityVerificationUpsertArgs<ExtArgs>>): Prisma__MemberIdentityVerificationClient<$Result.GetResult<Prisma.$MemberIdentityVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemberIdentityVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberIdentityVerificationCountArgs} args - Arguments to filter MemberIdentityVerifications to count.
     * @example
     * // Count the number of MemberIdentityVerifications
     * const count = await prisma.memberIdentityVerification.count({
     *   where: {
     *     // ... the filter for the MemberIdentityVerifications we want to count
     *   }
     * })
    **/
    count<T extends MemberIdentityVerificationCountArgs>(
      args?: Subset<T, MemberIdentityVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberIdentityVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemberIdentityVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberIdentityVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MemberIdentityVerificationAggregateArgs>(args: Subset<T, MemberIdentityVerificationAggregateArgs>): Prisma.PrismaPromise<GetMemberIdentityVerificationAggregateType<T>>

    /**
     * Group by MemberIdentityVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberIdentityVerificationGroupByArgs} args - Group by arguments.
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
      T extends MemberIdentityVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberIdentityVerificationGroupByArgs['orderBy'] }
        : { orderBy?: MemberIdentityVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MemberIdentityVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberIdentityVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemberIdentityVerification model
   */
  readonly fields: MemberIdentityVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemberIdentityVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberIdentityVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    verifier<T extends MemberIdentityVerification$verifierArgs<ExtArgs> = {}>(args?: Subset<T, MemberIdentityVerification$verifierArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MemberIdentityVerification model
   */
  interface MemberIdentityVerificationFieldRefs {
    readonly id: FieldRef<"MemberIdentityVerification", 'String'>
    readonly userId: FieldRef<"MemberIdentityVerification", 'String'>
    readonly passportPhoto: FieldRef<"MemberIdentityVerification", 'String'>
    readonly selfiePhoto: FieldRef<"MemberIdentityVerification", 'String'>
    readonly verificationStatus: FieldRef<"MemberIdentityVerification", 'VerificationStatus'>
    readonly isVerifiedBy: FieldRef<"MemberIdentityVerification", 'String'>
    readonly createdAt: FieldRef<"MemberIdentityVerification", 'DateTime'>
    readonly updatedAt: FieldRef<"MemberIdentityVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MemberIdentityVerification findUnique
   */
  export type MemberIdentityVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * Filter, which MemberIdentityVerification to fetch.
     */
    where: MemberIdentityVerificationWhereUniqueInput
  }

  /**
   * MemberIdentityVerification findUniqueOrThrow
   */
  export type MemberIdentityVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * Filter, which MemberIdentityVerification to fetch.
     */
    where: MemberIdentityVerificationWhereUniqueInput
  }

  /**
   * MemberIdentityVerification findFirst
   */
  export type MemberIdentityVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * Filter, which MemberIdentityVerification to fetch.
     */
    where?: MemberIdentityVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberIdentityVerifications to fetch.
     */
    orderBy?: MemberIdentityVerificationOrderByWithRelationInput | MemberIdentityVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberIdentityVerifications.
     */
    cursor?: MemberIdentityVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberIdentityVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberIdentityVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberIdentityVerifications.
     */
    distinct?: MemberIdentityVerificationScalarFieldEnum | MemberIdentityVerificationScalarFieldEnum[]
  }

  /**
   * MemberIdentityVerification findFirstOrThrow
   */
  export type MemberIdentityVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * Filter, which MemberIdentityVerification to fetch.
     */
    where?: MemberIdentityVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberIdentityVerifications to fetch.
     */
    orderBy?: MemberIdentityVerificationOrderByWithRelationInput | MemberIdentityVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberIdentityVerifications.
     */
    cursor?: MemberIdentityVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberIdentityVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberIdentityVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberIdentityVerifications.
     */
    distinct?: MemberIdentityVerificationScalarFieldEnum | MemberIdentityVerificationScalarFieldEnum[]
  }

  /**
   * MemberIdentityVerification findMany
   */
  export type MemberIdentityVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * Filter, which MemberIdentityVerifications to fetch.
     */
    where?: MemberIdentityVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberIdentityVerifications to fetch.
     */
    orderBy?: MemberIdentityVerificationOrderByWithRelationInput | MemberIdentityVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemberIdentityVerifications.
     */
    cursor?: MemberIdentityVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberIdentityVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberIdentityVerifications.
     */
    skip?: number
    distinct?: MemberIdentityVerificationScalarFieldEnum | MemberIdentityVerificationScalarFieldEnum[]
  }

  /**
   * MemberIdentityVerification create
   */
  export type MemberIdentityVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a MemberIdentityVerification.
     */
    data: XOR<MemberIdentityVerificationCreateInput, MemberIdentityVerificationUncheckedCreateInput>
  }

  /**
   * MemberIdentityVerification createMany
   */
  export type MemberIdentityVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemberIdentityVerifications.
     */
    data: MemberIdentityVerificationCreateManyInput | MemberIdentityVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberIdentityVerification createManyAndReturn
   */
  export type MemberIdentityVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many MemberIdentityVerifications.
     */
    data: MemberIdentityVerificationCreateManyInput | MemberIdentityVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberIdentityVerification update
   */
  export type MemberIdentityVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a MemberIdentityVerification.
     */
    data: XOR<MemberIdentityVerificationUpdateInput, MemberIdentityVerificationUncheckedUpdateInput>
    /**
     * Choose, which MemberIdentityVerification to update.
     */
    where: MemberIdentityVerificationWhereUniqueInput
  }

  /**
   * MemberIdentityVerification updateMany
   */
  export type MemberIdentityVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemberIdentityVerifications.
     */
    data: XOR<MemberIdentityVerificationUpdateManyMutationInput, MemberIdentityVerificationUncheckedUpdateManyInput>
    /**
     * Filter which MemberIdentityVerifications to update
     */
    where?: MemberIdentityVerificationWhereInput
    /**
     * Limit how many MemberIdentityVerifications to update.
     */
    limit?: number
  }

  /**
   * MemberIdentityVerification updateManyAndReturn
   */
  export type MemberIdentityVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * The data used to update MemberIdentityVerifications.
     */
    data: XOR<MemberIdentityVerificationUpdateManyMutationInput, MemberIdentityVerificationUncheckedUpdateManyInput>
    /**
     * Filter which MemberIdentityVerifications to update
     */
    where?: MemberIdentityVerificationWhereInput
    /**
     * Limit how many MemberIdentityVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberIdentityVerification upsert
   */
  export type MemberIdentityVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the MemberIdentityVerification to update in case it exists.
     */
    where: MemberIdentityVerificationWhereUniqueInput
    /**
     * In case the MemberIdentityVerification found by the `where` argument doesn't exist, create a new MemberIdentityVerification with this data.
     */
    create: XOR<MemberIdentityVerificationCreateInput, MemberIdentityVerificationUncheckedCreateInput>
    /**
     * In case the MemberIdentityVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberIdentityVerificationUpdateInput, MemberIdentityVerificationUncheckedUpdateInput>
  }

  /**
   * MemberIdentityVerification delete
   */
  export type MemberIdentityVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
    /**
     * Filter which MemberIdentityVerification to delete.
     */
    where: MemberIdentityVerificationWhereUniqueInput
  }

  /**
   * MemberIdentityVerification deleteMany
   */
  export type MemberIdentityVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberIdentityVerifications to delete
     */
    where?: MemberIdentityVerificationWhereInput
    /**
     * Limit how many MemberIdentityVerifications to delete.
     */
    limit?: number
  }

  /**
   * MemberIdentityVerification.verifier
   */
  export type MemberIdentityVerification$verifierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * MemberIdentityVerification without action
   */
  export type MemberIdentityVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberIdentityVerification
     */
    select?: MemberIdentityVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberIdentityVerification
     */
    omit?: MemberIdentityVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIdentityVerificationInclude<ExtArgs> | null
  }


  /**
   * Model CorporateRegistration
   */

  export type AggregateCorporateRegistration = {
    _count: CorporateRegistrationCountAggregateOutputType | null
    _min: CorporateRegistrationMinAggregateOutputType | null
    _max: CorporateRegistrationMaxAggregateOutputType | null
  }

  export type CorporateRegistrationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    companyName: string | null
    businessLicenseFile: string | null
    verificationStatus: $Enums.VerificationStatus | null
    isVerifiedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CorporateRegistrationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    companyName: string | null
    businessLicenseFile: string | null
    verificationStatus: $Enums.VerificationStatus | null
    isVerifiedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CorporateRegistrationCountAggregateOutputType = {
    id: number
    userId: number
    companyName: number
    businessLicenseFile: number
    verificationStatus: number
    isVerifiedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CorporateRegistrationMinAggregateInputType = {
    id?: true
    userId?: true
    companyName?: true
    businessLicenseFile?: true
    verificationStatus?: true
    isVerifiedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CorporateRegistrationMaxAggregateInputType = {
    id?: true
    userId?: true
    companyName?: true
    businessLicenseFile?: true
    verificationStatus?: true
    isVerifiedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CorporateRegistrationCountAggregateInputType = {
    id?: true
    userId?: true
    companyName?: true
    businessLicenseFile?: true
    verificationStatus?: true
    isVerifiedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CorporateRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorporateRegistration to aggregate.
     */
    where?: CorporateRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateRegistrations to fetch.
     */
    orderBy?: CorporateRegistrationOrderByWithRelationInput | CorporateRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CorporateRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CorporateRegistrations
    **/
    _count?: true | CorporateRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CorporateRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CorporateRegistrationMaxAggregateInputType
  }

  export type GetCorporateRegistrationAggregateType<T extends CorporateRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateCorporateRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCorporateRegistration[P]>
      : GetScalarType<T[P], AggregateCorporateRegistration[P]>
  }




  export type CorporateRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorporateRegistrationWhereInput
    orderBy?: CorporateRegistrationOrderByWithAggregationInput | CorporateRegistrationOrderByWithAggregationInput[]
    by: CorporateRegistrationScalarFieldEnum[] | CorporateRegistrationScalarFieldEnum
    having?: CorporateRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CorporateRegistrationCountAggregateInputType | true
    _min?: CorporateRegistrationMinAggregateInputType
    _max?: CorporateRegistrationMaxAggregateInputType
  }

  export type CorporateRegistrationGroupByOutputType = {
    id: string
    userId: string
    companyName: string | null
    businessLicenseFile: string | null
    verificationStatus: $Enums.VerificationStatus
    isVerifiedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: CorporateRegistrationCountAggregateOutputType | null
    _min: CorporateRegistrationMinAggregateOutputType | null
    _max: CorporateRegistrationMaxAggregateOutputType | null
  }

  type GetCorporateRegistrationGroupByPayload<T extends CorporateRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CorporateRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CorporateRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CorporateRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], CorporateRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type CorporateRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyName?: boolean
    businessLicenseFile?: boolean
    verificationStatus?: boolean
    isVerifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | CorporateRegistration$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["corporateRegistration"]>

  export type CorporateRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyName?: boolean
    businessLicenseFile?: boolean
    verificationStatus?: boolean
    isVerifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | CorporateRegistration$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["corporateRegistration"]>

  export type CorporateRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyName?: boolean
    businessLicenseFile?: boolean
    verificationStatus?: boolean
    isVerifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | CorporateRegistration$verifierArgs<ExtArgs>
  }, ExtArgs["result"]["corporateRegistration"]>

  export type CorporateRegistrationSelectScalar = {
    id?: boolean
    userId?: boolean
    companyName?: boolean
    businessLicenseFile?: boolean
    verificationStatus?: boolean
    isVerifiedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CorporateRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "companyName" | "businessLicenseFile" | "verificationStatus" | "isVerifiedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["corporateRegistration"]>
  export type CorporateRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | CorporateRegistration$verifierArgs<ExtArgs>
  }
  export type CorporateRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | CorporateRegistration$verifierArgs<ExtArgs>
  }
  export type CorporateRegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    verifier?: boolean | CorporateRegistration$verifierArgs<ExtArgs>
  }

  export type $CorporateRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CorporateRegistration"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      verifier: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      companyName: string | null
      businessLicenseFile: string | null
      verificationStatus: $Enums.VerificationStatus
      isVerifiedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["corporateRegistration"]>
    composites: {}
  }

  type CorporateRegistrationGetPayload<S extends boolean | null | undefined | CorporateRegistrationDefaultArgs> = $Result.GetResult<Prisma.$CorporateRegistrationPayload, S>

  type CorporateRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CorporateRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CorporateRegistrationCountAggregateInputType | true
    }

  export interface CorporateRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CorporateRegistration'], meta: { name: 'CorporateRegistration' } }
    /**
     * Find zero or one CorporateRegistration that matches the filter.
     * @param {CorporateRegistrationFindUniqueArgs} args - Arguments to find a CorporateRegistration
     * @example
     * // Get one CorporateRegistration
     * const corporateRegistration = await prisma.corporateRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CorporateRegistrationFindUniqueArgs>(args: SelectSubset<T, CorporateRegistrationFindUniqueArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CorporateRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CorporateRegistrationFindUniqueOrThrowArgs} args - Arguments to find a CorporateRegistration
     * @example
     * // Get one CorporateRegistration
     * const corporateRegistration = await prisma.corporateRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CorporateRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, CorporateRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorporateRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateRegistrationFindFirstArgs} args - Arguments to find a CorporateRegistration
     * @example
     * // Get one CorporateRegistration
     * const corporateRegistration = await prisma.corporateRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CorporateRegistrationFindFirstArgs>(args?: SelectSubset<T, CorporateRegistrationFindFirstArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CorporateRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateRegistrationFindFirstOrThrowArgs} args - Arguments to find a CorporateRegistration
     * @example
     * // Get one CorporateRegistration
     * const corporateRegistration = await prisma.corporateRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CorporateRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, CorporateRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CorporateRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CorporateRegistrations
     * const corporateRegistrations = await prisma.corporateRegistration.findMany()
     * 
     * // Get first 10 CorporateRegistrations
     * const corporateRegistrations = await prisma.corporateRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const corporateRegistrationWithIdOnly = await prisma.corporateRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CorporateRegistrationFindManyArgs>(args?: SelectSubset<T, CorporateRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CorporateRegistration.
     * @param {CorporateRegistrationCreateArgs} args - Arguments to create a CorporateRegistration.
     * @example
     * // Create one CorporateRegistration
     * const CorporateRegistration = await prisma.corporateRegistration.create({
     *   data: {
     *     // ... data to create a CorporateRegistration
     *   }
     * })
     * 
     */
    create<T extends CorporateRegistrationCreateArgs>(args: SelectSubset<T, CorporateRegistrationCreateArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CorporateRegistrations.
     * @param {CorporateRegistrationCreateManyArgs} args - Arguments to create many CorporateRegistrations.
     * @example
     * // Create many CorporateRegistrations
     * const corporateRegistration = await prisma.corporateRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CorporateRegistrationCreateManyArgs>(args?: SelectSubset<T, CorporateRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CorporateRegistrations and returns the data saved in the database.
     * @param {CorporateRegistrationCreateManyAndReturnArgs} args - Arguments to create many CorporateRegistrations.
     * @example
     * // Create many CorporateRegistrations
     * const corporateRegistration = await prisma.corporateRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CorporateRegistrations and only return the `id`
     * const corporateRegistrationWithIdOnly = await prisma.corporateRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CorporateRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, CorporateRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CorporateRegistration.
     * @param {CorporateRegistrationDeleteArgs} args - Arguments to delete one CorporateRegistration.
     * @example
     * // Delete one CorporateRegistration
     * const CorporateRegistration = await prisma.corporateRegistration.delete({
     *   where: {
     *     // ... filter to delete one CorporateRegistration
     *   }
     * })
     * 
     */
    delete<T extends CorporateRegistrationDeleteArgs>(args: SelectSubset<T, CorporateRegistrationDeleteArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CorporateRegistration.
     * @param {CorporateRegistrationUpdateArgs} args - Arguments to update one CorporateRegistration.
     * @example
     * // Update one CorporateRegistration
     * const corporateRegistration = await prisma.corporateRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CorporateRegistrationUpdateArgs>(args: SelectSubset<T, CorporateRegistrationUpdateArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CorporateRegistrations.
     * @param {CorporateRegistrationDeleteManyArgs} args - Arguments to filter CorporateRegistrations to delete.
     * @example
     * // Delete a few CorporateRegistrations
     * const { count } = await prisma.corporateRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CorporateRegistrationDeleteManyArgs>(args?: SelectSubset<T, CorporateRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorporateRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CorporateRegistrations
     * const corporateRegistration = await prisma.corporateRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CorporateRegistrationUpdateManyArgs>(args: SelectSubset<T, CorporateRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CorporateRegistrations and returns the data updated in the database.
     * @param {CorporateRegistrationUpdateManyAndReturnArgs} args - Arguments to update many CorporateRegistrations.
     * @example
     * // Update many CorporateRegistrations
     * const corporateRegistration = await prisma.corporateRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CorporateRegistrations and only return the `id`
     * const corporateRegistrationWithIdOnly = await prisma.corporateRegistration.updateManyAndReturn({
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
    updateManyAndReturn<T extends CorporateRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, CorporateRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CorporateRegistration.
     * @param {CorporateRegistrationUpsertArgs} args - Arguments to update or create a CorporateRegistration.
     * @example
     * // Update or create a CorporateRegistration
     * const corporateRegistration = await prisma.corporateRegistration.upsert({
     *   create: {
     *     // ... data to create a CorporateRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CorporateRegistration we want to update
     *   }
     * })
     */
    upsert<T extends CorporateRegistrationUpsertArgs>(args: SelectSubset<T, CorporateRegistrationUpsertArgs<ExtArgs>>): Prisma__CorporateRegistrationClient<$Result.GetResult<Prisma.$CorporateRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CorporateRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateRegistrationCountArgs} args - Arguments to filter CorporateRegistrations to count.
     * @example
     * // Count the number of CorporateRegistrations
     * const count = await prisma.corporateRegistration.count({
     *   where: {
     *     // ... the filter for the CorporateRegistrations we want to count
     *   }
     * })
    **/
    count<T extends CorporateRegistrationCountArgs>(
      args?: Subset<T, CorporateRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CorporateRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CorporateRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CorporateRegistrationAggregateArgs>(args: Subset<T, CorporateRegistrationAggregateArgs>): Prisma.PrismaPromise<GetCorporateRegistrationAggregateType<T>>

    /**
     * Group by CorporateRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorporateRegistrationGroupByArgs} args - Group by arguments.
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
      T extends CorporateRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CorporateRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: CorporateRegistrationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CorporateRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorporateRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CorporateRegistration model
   */
  readonly fields: CorporateRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CorporateRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CorporateRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    verifier<T extends CorporateRegistration$verifierArgs<ExtArgs> = {}>(args?: Subset<T, CorporateRegistration$verifierArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CorporateRegistration model
   */
  interface CorporateRegistrationFieldRefs {
    readonly id: FieldRef<"CorporateRegistration", 'String'>
    readonly userId: FieldRef<"CorporateRegistration", 'String'>
    readonly companyName: FieldRef<"CorporateRegistration", 'String'>
    readonly businessLicenseFile: FieldRef<"CorporateRegistration", 'String'>
    readonly verificationStatus: FieldRef<"CorporateRegistration", 'VerificationStatus'>
    readonly isVerifiedBy: FieldRef<"CorporateRegistration", 'String'>
    readonly createdAt: FieldRef<"CorporateRegistration", 'DateTime'>
    readonly updatedAt: FieldRef<"CorporateRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CorporateRegistration findUnique
   */
  export type CorporateRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which CorporateRegistration to fetch.
     */
    where: CorporateRegistrationWhereUniqueInput
  }

  /**
   * CorporateRegistration findUniqueOrThrow
   */
  export type CorporateRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which CorporateRegistration to fetch.
     */
    where: CorporateRegistrationWhereUniqueInput
  }

  /**
   * CorporateRegistration findFirst
   */
  export type CorporateRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which CorporateRegistration to fetch.
     */
    where?: CorporateRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateRegistrations to fetch.
     */
    orderBy?: CorporateRegistrationOrderByWithRelationInput | CorporateRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorporateRegistrations.
     */
    cursor?: CorporateRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorporateRegistrations.
     */
    distinct?: CorporateRegistrationScalarFieldEnum | CorporateRegistrationScalarFieldEnum[]
  }

  /**
   * CorporateRegistration findFirstOrThrow
   */
  export type CorporateRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which CorporateRegistration to fetch.
     */
    where?: CorporateRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateRegistrations to fetch.
     */
    orderBy?: CorporateRegistrationOrderByWithRelationInput | CorporateRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CorporateRegistrations.
     */
    cursor?: CorporateRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CorporateRegistrations.
     */
    distinct?: CorporateRegistrationScalarFieldEnum | CorporateRegistrationScalarFieldEnum[]
  }

  /**
   * CorporateRegistration findMany
   */
  export type CorporateRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which CorporateRegistrations to fetch.
     */
    where?: CorporateRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CorporateRegistrations to fetch.
     */
    orderBy?: CorporateRegistrationOrderByWithRelationInput | CorporateRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CorporateRegistrations.
     */
    cursor?: CorporateRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CorporateRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CorporateRegistrations.
     */
    skip?: number
    distinct?: CorporateRegistrationScalarFieldEnum | CorporateRegistrationScalarFieldEnum[]
  }

  /**
   * CorporateRegistration create
   */
  export type CorporateRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a CorporateRegistration.
     */
    data: XOR<CorporateRegistrationCreateInput, CorporateRegistrationUncheckedCreateInput>
  }

  /**
   * CorporateRegistration createMany
   */
  export type CorporateRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CorporateRegistrations.
     */
    data: CorporateRegistrationCreateManyInput | CorporateRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CorporateRegistration createManyAndReturn
   */
  export type CorporateRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many CorporateRegistrations.
     */
    data: CorporateRegistrationCreateManyInput | CorporateRegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorporateRegistration update
   */
  export type CorporateRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a CorporateRegistration.
     */
    data: XOR<CorporateRegistrationUpdateInput, CorporateRegistrationUncheckedUpdateInput>
    /**
     * Choose, which CorporateRegistration to update.
     */
    where: CorporateRegistrationWhereUniqueInput
  }

  /**
   * CorporateRegistration updateMany
   */
  export type CorporateRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CorporateRegistrations.
     */
    data: XOR<CorporateRegistrationUpdateManyMutationInput, CorporateRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which CorporateRegistrations to update
     */
    where?: CorporateRegistrationWhereInput
    /**
     * Limit how many CorporateRegistrations to update.
     */
    limit?: number
  }

  /**
   * CorporateRegistration updateManyAndReturn
   */
  export type CorporateRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update CorporateRegistrations.
     */
    data: XOR<CorporateRegistrationUpdateManyMutationInput, CorporateRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which CorporateRegistrations to update
     */
    where?: CorporateRegistrationWhereInput
    /**
     * Limit how many CorporateRegistrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CorporateRegistration upsert
   */
  export type CorporateRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the CorporateRegistration to update in case it exists.
     */
    where: CorporateRegistrationWhereUniqueInput
    /**
     * In case the CorporateRegistration found by the `where` argument doesn't exist, create a new CorporateRegistration with this data.
     */
    create: XOR<CorporateRegistrationCreateInput, CorporateRegistrationUncheckedCreateInput>
    /**
     * In case the CorporateRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CorporateRegistrationUpdateInput, CorporateRegistrationUncheckedUpdateInput>
  }

  /**
   * CorporateRegistration delete
   */
  export type CorporateRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
    /**
     * Filter which CorporateRegistration to delete.
     */
    where: CorporateRegistrationWhereUniqueInput
  }

  /**
   * CorporateRegistration deleteMany
   */
  export type CorporateRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CorporateRegistrations to delete
     */
    where?: CorporateRegistrationWhereInput
    /**
     * Limit how many CorporateRegistrations to delete.
     */
    limit?: number
  }

  /**
   * CorporateRegistration.verifier
   */
  export type CorporateRegistration$verifierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * CorporateRegistration without action
   */
  export type CorporateRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CorporateRegistration
     */
    select?: CorporateRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CorporateRegistration
     */
    omit?: CorporateRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CorporateRegistrationInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    type: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    type: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    type: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    type?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    id: string
    userId: string
    token: string
    type: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    type?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "type" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["verificationToken"]>
  export type VerificationTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VerificationTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VerificationTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      type: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly id: FieldRef<"VerificationToken", 'String'>
    readonly userId: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly type: FieldRef<"VerificationToken", 'String'>
    readonly expiresAt: FieldRef<"VerificationToken", 'DateTime'>
    readonly usedAt: FieldRef<"VerificationToken", 'DateTime'>
    readonly createdAt: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationTokenInclude<ExtArgs> | null
  }


  /**
   * Model Sanction
   */

  export type AggregateSanction = {
    _count: SanctionCountAggregateOutputType | null
    _min: SanctionMinAggregateOutputType | null
    _max: SanctionMaxAggregateOutputType | null
  }

  export type SanctionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sanctionType: $Enums.SanctionType | null
    reason: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
  }

  export type SanctionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sanctionType: $Enums.SanctionType | null
    reason: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
  }

  export type SanctionCountAggregateOutputType = {
    id: number
    userId: number
    sanctionType: number
    reason: number
    startDate: number
    endDate: number
    createdAt: number
    _all: number
  }


  export type SanctionMinAggregateInputType = {
    id?: true
    userId?: true
    sanctionType?: true
    reason?: true
    startDate?: true
    endDate?: true
    createdAt?: true
  }

  export type SanctionMaxAggregateInputType = {
    id?: true
    userId?: true
    sanctionType?: true
    reason?: true
    startDate?: true
    endDate?: true
    createdAt?: true
  }

  export type SanctionCountAggregateInputType = {
    id?: true
    userId?: true
    sanctionType?: true
    reason?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    _all?: true
  }

  export type SanctionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sanction to aggregate.
     */
    where?: SanctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sanctions to fetch.
     */
    orderBy?: SanctionOrderByWithRelationInput | SanctionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SanctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sanctions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sanctions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sanctions
    **/
    _count?: true | SanctionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SanctionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SanctionMaxAggregateInputType
  }

  export type GetSanctionAggregateType<T extends SanctionAggregateArgs> = {
        [P in keyof T & keyof AggregateSanction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSanction[P]>
      : GetScalarType<T[P], AggregateSanction[P]>
  }




  export type SanctionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SanctionWhereInput
    orderBy?: SanctionOrderByWithAggregationInput | SanctionOrderByWithAggregationInput[]
    by: SanctionScalarFieldEnum[] | SanctionScalarFieldEnum
    having?: SanctionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SanctionCountAggregateInputType | true
    _min?: SanctionMinAggregateInputType
    _max?: SanctionMaxAggregateInputType
  }

  export type SanctionGroupByOutputType = {
    id: string
    userId: string
    sanctionType: $Enums.SanctionType
    reason: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date
    _count: SanctionCountAggregateOutputType | null
    _min: SanctionMinAggregateOutputType | null
    _max: SanctionMaxAggregateOutputType | null
  }

  type GetSanctionGroupByPayload<T extends SanctionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SanctionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SanctionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SanctionGroupByOutputType[P]>
            : GetScalarType<T[P], SanctionGroupByOutputType[P]>
        }
      >
    >


  export type SanctionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sanctionType?: boolean
    reason?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sanction"]>

  export type SanctionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sanctionType?: boolean
    reason?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sanction"]>

  export type SanctionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sanctionType?: boolean
    reason?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sanction"]>

  export type SanctionSelectScalar = {
    id?: boolean
    userId?: boolean
    sanctionType?: boolean
    reason?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
  }

  export type SanctionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sanctionType" | "reason" | "startDate" | "endDate" | "createdAt", ExtArgs["result"]["sanction"]>
  export type SanctionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SanctionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SanctionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SanctionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sanction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      sanctionType: $Enums.SanctionType
      reason: string | null
      startDate: Date | null
      endDate: Date | null
      createdAt: Date
    }, ExtArgs["result"]["sanction"]>
    composites: {}
  }

  type SanctionGetPayload<S extends boolean | null | undefined | SanctionDefaultArgs> = $Result.GetResult<Prisma.$SanctionPayload, S>

  type SanctionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SanctionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SanctionCountAggregateInputType | true
    }

  export interface SanctionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sanction'], meta: { name: 'Sanction' } }
    /**
     * Find zero or one Sanction that matches the filter.
     * @param {SanctionFindUniqueArgs} args - Arguments to find a Sanction
     * @example
     * // Get one Sanction
     * const sanction = await prisma.sanction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SanctionFindUniqueArgs>(args: SelectSubset<T, SanctionFindUniqueArgs<ExtArgs>>): Prisma__SanctionClient<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sanction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SanctionFindUniqueOrThrowArgs} args - Arguments to find a Sanction
     * @example
     * // Get one Sanction
     * const sanction = await prisma.sanction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SanctionFindUniqueOrThrowArgs>(args: SelectSubset<T, SanctionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SanctionClient<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sanction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanctionFindFirstArgs} args - Arguments to find a Sanction
     * @example
     * // Get one Sanction
     * const sanction = await prisma.sanction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SanctionFindFirstArgs>(args?: SelectSubset<T, SanctionFindFirstArgs<ExtArgs>>): Prisma__SanctionClient<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sanction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanctionFindFirstOrThrowArgs} args - Arguments to find a Sanction
     * @example
     * // Get one Sanction
     * const sanction = await prisma.sanction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SanctionFindFirstOrThrowArgs>(args?: SelectSubset<T, SanctionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SanctionClient<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sanctions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanctionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sanctions
     * const sanctions = await prisma.sanction.findMany()
     * 
     * // Get first 10 Sanctions
     * const sanctions = await prisma.sanction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sanctionWithIdOnly = await prisma.sanction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SanctionFindManyArgs>(args?: SelectSubset<T, SanctionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sanction.
     * @param {SanctionCreateArgs} args - Arguments to create a Sanction.
     * @example
     * // Create one Sanction
     * const Sanction = await prisma.sanction.create({
     *   data: {
     *     // ... data to create a Sanction
     *   }
     * })
     * 
     */
    create<T extends SanctionCreateArgs>(args: SelectSubset<T, SanctionCreateArgs<ExtArgs>>): Prisma__SanctionClient<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sanctions.
     * @param {SanctionCreateManyArgs} args - Arguments to create many Sanctions.
     * @example
     * // Create many Sanctions
     * const sanction = await prisma.sanction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SanctionCreateManyArgs>(args?: SelectSubset<T, SanctionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sanctions and returns the data saved in the database.
     * @param {SanctionCreateManyAndReturnArgs} args - Arguments to create many Sanctions.
     * @example
     * // Create many Sanctions
     * const sanction = await prisma.sanction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sanctions and only return the `id`
     * const sanctionWithIdOnly = await prisma.sanction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SanctionCreateManyAndReturnArgs>(args?: SelectSubset<T, SanctionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sanction.
     * @param {SanctionDeleteArgs} args - Arguments to delete one Sanction.
     * @example
     * // Delete one Sanction
     * const Sanction = await prisma.sanction.delete({
     *   where: {
     *     // ... filter to delete one Sanction
     *   }
     * })
     * 
     */
    delete<T extends SanctionDeleteArgs>(args: SelectSubset<T, SanctionDeleteArgs<ExtArgs>>): Prisma__SanctionClient<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sanction.
     * @param {SanctionUpdateArgs} args - Arguments to update one Sanction.
     * @example
     * // Update one Sanction
     * const sanction = await prisma.sanction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SanctionUpdateArgs>(args: SelectSubset<T, SanctionUpdateArgs<ExtArgs>>): Prisma__SanctionClient<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sanctions.
     * @param {SanctionDeleteManyArgs} args - Arguments to filter Sanctions to delete.
     * @example
     * // Delete a few Sanctions
     * const { count } = await prisma.sanction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SanctionDeleteManyArgs>(args?: SelectSubset<T, SanctionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sanctions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanctionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sanctions
     * const sanction = await prisma.sanction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SanctionUpdateManyArgs>(args: SelectSubset<T, SanctionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sanctions and returns the data updated in the database.
     * @param {SanctionUpdateManyAndReturnArgs} args - Arguments to update many Sanctions.
     * @example
     * // Update many Sanctions
     * const sanction = await prisma.sanction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sanctions and only return the `id`
     * const sanctionWithIdOnly = await prisma.sanction.updateManyAndReturn({
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
    updateManyAndReturn<T extends SanctionUpdateManyAndReturnArgs>(args: SelectSubset<T, SanctionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sanction.
     * @param {SanctionUpsertArgs} args - Arguments to update or create a Sanction.
     * @example
     * // Update or create a Sanction
     * const sanction = await prisma.sanction.upsert({
     *   create: {
     *     // ... data to create a Sanction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sanction we want to update
     *   }
     * })
     */
    upsert<T extends SanctionUpsertArgs>(args: SelectSubset<T, SanctionUpsertArgs<ExtArgs>>): Prisma__SanctionClient<$Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sanctions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanctionCountArgs} args - Arguments to filter Sanctions to count.
     * @example
     * // Count the number of Sanctions
     * const count = await prisma.sanction.count({
     *   where: {
     *     // ... the filter for the Sanctions we want to count
     *   }
     * })
    **/
    count<T extends SanctionCountArgs>(
      args?: Subset<T, SanctionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SanctionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sanction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanctionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SanctionAggregateArgs>(args: Subset<T, SanctionAggregateArgs>): Prisma.PrismaPromise<GetSanctionAggregateType<T>>

    /**
     * Group by Sanction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanctionGroupByArgs} args - Group by arguments.
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
      T extends SanctionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SanctionGroupByArgs['orderBy'] }
        : { orderBy?: SanctionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SanctionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSanctionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sanction model
   */
  readonly fields: SanctionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sanction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SanctionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Sanction model
   */
  interface SanctionFieldRefs {
    readonly id: FieldRef<"Sanction", 'String'>
    readonly userId: FieldRef<"Sanction", 'String'>
    readonly sanctionType: FieldRef<"Sanction", 'SanctionType'>
    readonly reason: FieldRef<"Sanction", 'String'>
    readonly startDate: FieldRef<"Sanction", 'DateTime'>
    readonly endDate: FieldRef<"Sanction", 'DateTime'>
    readonly createdAt: FieldRef<"Sanction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sanction findUnique
   */
  export type SanctionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * Filter, which Sanction to fetch.
     */
    where: SanctionWhereUniqueInput
  }

  /**
   * Sanction findUniqueOrThrow
   */
  export type SanctionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * Filter, which Sanction to fetch.
     */
    where: SanctionWhereUniqueInput
  }

  /**
   * Sanction findFirst
   */
  export type SanctionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * Filter, which Sanction to fetch.
     */
    where?: SanctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sanctions to fetch.
     */
    orderBy?: SanctionOrderByWithRelationInput | SanctionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sanctions.
     */
    cursor?: SanctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sanctions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sanctions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sanctions.
     */
    distinct?: SanctionScalarFieldEnum | SanctionScalarFieldEnum[]
  }

  /**
   * Sanction findFirstOrThrow
   */
  export type SanctionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * Filter, which Sanction to fetch.
     */
    where?: SanctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sanctions to fetch.
     */
    orderBy?: SanctionOrderByWithRelationInput | SanctionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sanctions.
     */
    cursor?: SanctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sanctions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sanctions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sanctions.
     */
    distinct?: SanctionScalarFieldEnum | SanctionScalarFieldEnum[]
  }

  /**
   * Sanction findMany
   */
  export type SanctionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * Filter, which Sanctions to fetch.
     */
    where?: SanctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sanctions to fetch.
     */
    orderBy?: SanctionOrderByWithRelationInput | SanctionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sanctions.
     */
    cursor?: SanctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sanctions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sanctions.
     */
    skip?: number
    distinct?: SanctionScalarFieldEnum | SanctionScalarFieldEnum[]
  }

  /**
   * Sanction create
   */
  export type SanctionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * The data needed to create a Sanction.
     */
    data: XOR<SanctionCreateInput, SanctionUncheckedCreateInput>
  }

  /**
   * Sanction createMany
   */
  export type SanctionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sanctions.
     */
    data: SanctionCreateManyInput | SanctionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sanction createManyAndReturn
   */
  export type SanctionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * The data used to create many Sanctions.
     */
    data: SanctionCreateManyInput | SanctionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sanction update
   */
  export type SanctionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * The data needed to update a Sanction.
     */
    data: XOR<SanctionUpdateInput, SanctionUncheckedUpdateInput>
    /**
     * Choose, which Sanction to update.
     */
    where: SanctionWhereUniqueInput
  }

  /**
   * Sanction updateMany
   */
  export type SanctionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sanctions.
     */
    data: XOR<SanctionUpdateManyMutationInput, SanctionUncheckedUpdateManyInput>
    /**
     * Filter which Sanctions to update
     */
    where?: SanctionWhereInput
    /**
     * Limit how many Sanctions to update.
     */
    limit?: number
  }

  /**
   * Sanction updateManyAndReturn
   */
  export type SanctionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * The data used to update Sanctions.
     */
    data: XOR<SanctionUpdateManyMutationInput, SanctionUncheckedUpdateManyInput>
    /**
     * Filter which Sanctions to update
     */
    where?: SanctionWhereInput
    /**
     * Limit how many Sanctions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sanction upsert
   */
  export type SanctionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * The filter to search for the Sanction to update in case it exists.
     */
    where: SanctionWhereUniqueInput
    /**
     * In case the Sanction found by the `where` argument doesn't exist, create a new Sanction with this data.
     */
    create: XOR<SanctionCreateInput, SanctionUncheckedCreateInput>
    /**
     * In case the Sanction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SanctionUpdateInput, SanctionUncheckedUpdateInput>
  }

  /**
   * Sanction delete
   */
  export type SanctionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
    /**
     * Filter which Sanction to delete.
     */
    where: SanctionWhereUniqueInput
  }

  /**
   * Sanction deleteMany
   */
  export type SanctionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sanctions to delete
     */
    where?: SanctionWhereInput
    /**
     * Limit how many Sanctions to delete.
     */
    limit?: number
  }

  /**
   * Sanction without action
   */
  export type SanctionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sanction
     */
    select?: SanctionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sanction
     */
    omit?: SanctionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SanctionInclude<ExtArgs> | null
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
    role: 'role',
    email: 'email',
    password: 'password',
    phone: 'phone',
    fullName: 'fullName',
    status: 'status',
    isEmailedVerified: 'isEmailedVerified',
    isPhoneVerified: 'isPhoneVerified',
    walletId: 'walletId',
    userInfoId: 'userInfoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserInformationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    profileImage: 'profileImage',
    gender: 'gender',
    address: 'address',
    country: 'country',
    city: 'city',
    cvForm: 'cvForm',
    additionalInformation: 'additionalInformation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserInformationScalarFieldEnum = (typeof UserInformationScalarFieldEnum)[keyof typeof UserInformationScalarFieldEnum]


  export const SocialAuthScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerId: 'providerId'
  };

  export type SocialAuthScalarFieldEnum = (typeof SocialAuthScalarFieldEnum)[keyof typeof SocialAuthScalarFieldEnum]


  export const MemberIdentityVerificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    passportPhoto: 'passportPhoto',
    selfiePhoto: 'selfiePhoto',
    verificationStatus: 'verificationStatus',
    isVerifiedBy: 'isVerifiedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberIdentityVerificationScalarFieldEnum = (typeof MemberIdentityVerificationScalarFieldEnum)[keyof typeof MemberIdentityVerificationScalarFieldEnum]


  export const CorporateRegistrationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    companyName: 'companyName',
    businessLicenseFile: 'businessLicenseFile',
    verificationStatus: 'verificationStatus',
    isVerifiedBy: 'isVerifiedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CorporateRegistrationScalarFieldEnum = (typeof CorporateRegistrationScalarFieldEnum)[keyof typeof CorporateRegistrationScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    type: 'type',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SanctionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sanctionType: 'sanctionType',
    reason: 'reason',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt'
  };

  export type SanctionScalarFieldEnum = (typeof SanctionScalarFieldEnum)[keyof typeof SanctionScalarFieldEnum]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SocialProvider'
   */
  export type EnumSocialProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SocialProvider'>
    


  /**
   * Reference to a field of type 'SocialProvider[]'
   */
  export type ListEnumSocialProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SocialProvider[]'>
    


  /**
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    


  /**
   * Reference to a field of type 'SanctionType'
   */
  export type EnumSanctionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SanctionType'>
    


  /**
   * Reference to a field of type 'SanctionType[]'
   */
  export type ListEnumSanctionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SanctionType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    fullName?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    isEmailedVerified?: BoolFilter<"User"> | boolean
    isPhoneVerified?: BoolFilter<"User"> | boolean
    walletId?: StringNullableFilter<"User"> | string | null
    userInfoId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    memberIdentityVerification?: XOR<MemberIdentityVerificationNullableScalarRelationFilter, MemberIdentityVerificationWhereInput> | null
    corporateRegistration?: XOR<CorporateRegistrationNullableScalarRelationFilter, CorporateRegistrationWhereInput> | null
    verifiedMemberIdentities?: MemberIdentityVerificationListRelationFilter
    verifiedCorporateRegistrations?: CorporateRegistrationListRelationFilter
    sanctions?: SanctionListRelationFilter
    userInformation?: XOR<UserInformationNullableScalarRelationFilter, UserInformationWhereInput> | null
    socialAuths?: XOR<SocialAuthNullableScalarRelationFilter, SocialAuthWhereInput> | null
    verificationTokens?: VerificationTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    status?: SortOrder
    isEmailedVerified?: SortOrder
    isPhoneVerified?: SortOrder
    walletId?: SortOrderInput | SortOrder
    userInfoId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    memberIdentityVerification?: MemberIdentityVerificationOrderByWithRelationInput
    corporateRegistration?: CorporateRegistrationOrderByWithRelationInput
    verifiedMemberIdentities?: MemberIdentityVerificationOrderByRelationAggregateInput
    verifiedCorporateRegistrations?: CorporateRegistrationOrderByRelationAggregateInput
    sanctions?: SanctionOrderByRelationAggregateInput
    userInformation?: UserInformationOrderByWithRelationInput
    socialAuths?: SocialAuthOrderByWithRelationInput
    verificationTokens?: VerificationTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    walletId?: string
    userInfoId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    fullName?: StringNullableFilter<"User"> | string | null
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    isEmailedVerified?: BoolFilter<"User"> | boolean
    isPhoneVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    memberIdentityVerification?: XOR<MemberIdentityVerificationNullableScalarRelationFilter, MemberIdentityVerificationWhereInput> | null
    corporateRegistration?: XOR<CorporateRegistrationNullableScalarRelationFilter, CorporateRegistrationWhereInput> | null
    verifiedMemberIdentities?: MemberIdentityVerificationListRelationFilter
    verifiedCorporateRegistrations?: CorporateRegistrationListRelationFilter
    sanctions?: SanctionListRelationFilter
    userInformation?: XOR<UserInformationNullableScalarRelationFilter, UserInformationWhereInput> | null
    socialAuths?: XOR<SocialAuthNullableScalarRelationFilter, SocialAuthWhereInput> | null
    verificationTokens?: VerificationTokenListRelationFilter
  }, "id" | "walletId" | "userInfoId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    fullName?: SortOrderInput | SortOrder
    status?: SortOrder
    isEmailedVerified?: SortOrder
    isPhoneVerified?: SortOrder
    walletId?: SortOrderInput | SortOrder
    userInfoId?: SortOrderInput | SortOrder
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
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    fullName?: StringNullableWithAggregatesFilter<"User"> | string | null
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    isEmailedVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isPhoneVerified?: BoolWithAggregatesFilter<"User"> | boolean
    walletId?: StringNullableWithAggregatesFilter<"User"> | string | null
    userInfoId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserInformationWhereInput = {
    AND?: UserInformationWhereInput | UserInformationWhereInput[]
    OR?: UserInformationWhereInput[]
    NOT?: UserInformationWhereInput | UserInformationWhereInput[]
    id?: StringFilter<"UserInformation"> | string
    userId?: StringFilter<"UserInformation"> | string
    profileImage?: StringNullableFilter<"UserInformation"> | string | null
    gender?: StringNullableFilter<"UserInformation"> | string | null
    address?: StringNullableFilter<"UserInformation"> | string | null
    country?: StringNullableFilter<"UserInformation"> | string | null
    city?: StringNullableFilter<"UserInformation"> | string | null
    cvForm?: StringNullableFilter<"UserInformation"> | string | null
    additionalInformation?: StringNullableFilter<"UserInformation"> | string | null
    createdAt?: DateTimeFilter<"UserInformation"> | Date | string
    updatedAt?: DateTimeFilter<"UserInformation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserInformationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    cvForm?: SortOrderInput | SortOrder
    additionalInformation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserInformationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserInformationWhereInput | UserInformationWhereInput[]
    OR?: UserInformationWhereInput[]
    NOT?: UserInformationWhereInput | UserInformationWhereInput[]
    profileImage?: StringNullableFilter<"UserInformation"> | string | null
    gender?: StringNullableFilter<"UserInformation"> | string | null
    address?: StringNullableFilter<"UserInformation"> | string | null
    country?: StringNullableFilter<"UserInformation"> | string | null
    city?: StringNullableFilter<"UserInformation"> | string | null
    cvForm?: StringNullableFilter<"UserInformation"> | string | null
    additionalInformation?: StringNullableFilter<"UserInformation"> | string | null
    createdAt?: DateTimeFilter<"UserInformation"> | Date | string
    updatedAt?: DateTimeFilter<"UserInformation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserInformationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    cvForm?: SortOrderInput | SortOrder
    additionalInformation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserInformationCountOrderByAggregateInput
    _max?: UserInformationMaxOrderByAggregateInput
    _min?: UserInformationMinOrderByAggregateInput
  }

  export type UserInformationScalarWhereWithAggregatesInput = {
    AND?: UserInformationScalarWhereWithAggregatesInput | UserInformationScalarWhereWithAggregatesInput[]
    OR?: UserInformationScalarWhereWithAggregatesInput[]
    NOT?: UserInformationScalarWhereWithAggregatesInput | UserInformationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserInformation"> | string
    userId?: StringWithAggregatesFilter<"UserInformation"> | string
    profileImage?: StringNullableWithAggregatesFilter<"UserInformation"> | string | null
    gender?: StringNullableWithAggregatesFilter<"UserInformation"> | string | null
    address?: StringNullableWithAggregatesFilter<"UserInformation"> | string | null
    country?: StringNullableWithAggregatesFilter<"UserInformation"> | string | null
    city?: StringNullableWithAggregatesFilter<"UserInformation"> | string | null
    cvForm?: StringNullableWithAggregatesFilter<"UserInformation"> | string | null
    additionalInformation?: StringNullableWithAggregatesFilter<"UserInformation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserInformation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserInformation"> | Date | string
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
    userId?: string
    AND?: SocialAuthWhereInput | SocialAuthWhereInput[]
    OR?: SocialAuthWhereInput[]
    NOT?: SocialAuthWhereInput | SocialAuthWhereInput[]
    id?: StringFilter<"SocialAuth"> | string
    provider?: EnumSocialProviderFilter<"SocialAuth"> | $Enums.SocialProvider
    providerId?: StringFilter<"SocialAuth"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId">

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

  export type MemberIdentityVerificationWhereInput = {
    AND?: MemberIdentityVerificationWhereInput | MemberIdentityVerificationWhereInput[]
    OR?: MemberIdentityVerificationWhereInput[]
    NOT?: MemberIdentityVerificationWhereInput | MemberIdentityVerificationWhereInput[]
    id?: StringFilter<"MemberIdentityVerification"> | string
    userId?: StringFilter<"MemberIdentityVerification"> | string
    passportPhoto?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    selfiePhoto?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"MemberIdentityVerification"> | $Enums.VerificationStatus
    isVerifiedBy?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    createdAt?: DateTimeFilter<"MemberIdentityVerification"> | Date | string
    updatedAt?: DateTimeFilter<"MemberIdentityVerification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    verifier?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type MemberIdentityVerificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    passportPhoto?: SortOrderInput | SortOrder
    selfiePhoto?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    verifier?: UserOrderByWithRelationInput
  }

  export type MemberIdentityVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: MemberIdentityVerificationWhereInput | MemberIdentityVerificationWhereInput[]
    OR?: MemberIdentityVerificationWhereInput[]
    NOT?: MemberIdentityVerificationWhereInput | MemberIdentityVerificationWhereInput[]
    passportPhoto?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    selfiePhoto?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"MemberIdentityVerification"> | $Enums.VerificationStatus
    isVerifiedBy?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    createdAt?: DateTimeFilter<"MemberIdentityVerification"> | Date | string
    updatedAt?: DateTimeFilter<"MemberIdentityVerification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    verifier?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "userId">

  export type MemberIdentityVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    passportPhoto?: SortOrderInput | SortOrder
    selfiePhoto?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberIdentityVerificationCountOrderByAggregateInput
    _max?: MemberIdentityVerificationMaxOrderByAggregateInput
    _min?: MemberIdentityVerificationMinOrderByAggregateInput
  }

  export type MemberIdentityVerificationScalarWhereWithAggregatesInput = {
    AND?: MemberIdentityVerificationScalarWhereWithAggregatesInput | MemberIdentityVerificationScalarWhereWithAggregatesInput[]
    OR?: MemberIdentityVerificationScalarWhereWithAggregatesInput[]
    NOT?: MemberIdentityVerificationScalarWhereWithAggregatesInput | MemberIdentityVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemberIdentityVerification"> | string
    userId?: StringWithAggregatesFilter<"MemberIdentityVerification"> | string
    passportPhoto?: StringNullableWithAggregatesFilter<"MemberIdentityVerification"> | string | null
    selfiePhoto?: StringNullableWithAggregatesFilter<"MemberIdentityVerification"> | string | null
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"MemberIdentityVerification"> | $Enums.VerificationStatus
    isVerifiedBy?: StringNullableWithAggregatesFilter<"MemberIdentityVerification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MemberIdentityVerification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MemberIdentityVerification"> | Date | string
  }

  export type CorporateRegistrationWhereInput = {
    AND?: CorporateRegistrationWhereInput | CorporateRegistrationWhereInput[]
    OR?: CorporateRegistrationWhereInput[]
    NOT?: CorporateRegistrationWhereInput | CorporateRegistrationWhereInput[]
    id?: StringFilter<"CorporateRegistration"> | string
    userId?: StringFilter<"CorporateRegistration"> | string
    companyName?: StringNullableFilter<"CorporateRegistration"> | string | null
    businessLicenseFile?: StringNullableFilter<"CorporateRegistration"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"CorporateRegistration"> | $Enums.VerificationStatus
    isVerifiedBy?: StringNullableFilter<"CorporateRegistration"> | string | null
    createdAt?: DateTimeFilter<"CorporateRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"CorporateRegistration"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    verifier?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type CorporateRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrderInput | SortOrder
    businessLicenseFile?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    verifier?: UserOrderByWithRelationInput
  }

  export type CorporateRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CorporateRegistrationWhereInput | CorporateRegistrationWhereInput[]
    OR?: CorporateRegistrationWhereInput[]
    NOT?: CorporateRegistrationWhereInput | CorporateRegistrationWhereInput[]
    companyName?: StringNullableFilter<"CorporateRegistration"> | string | null
    businessLicenseFile?: StringNullableFilter<"CorporateRegistration"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"CorporateRegistration"> | $Enums.VerificationStatus
    isVerifiedBy?: StringNullableFilter<"CorporateRegistration"> | string | null
    createdAt?: DateTimeFilter<"CorporateRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"CorporateRegistration"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    verifier?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "userId">

  export type CorporateRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrderInput | SortOrder
    businessLicenseFile?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CorporateRegistrationCountOrderByAggregateInput
    _max?: CorporateRegistrationMaxOrderByAggregateInput
    _min?: CorporateRegistrationMinOrderByAggregateInput
  }

  export type CorporateRegistrationScalarWhereWithAggregatesInput = {
    AND?: CorporateRegistrationScalarWhereWithAggregatesInput | CorporateRegistrationScalarWhereWithAggregatesInput[]
    OR?: CorporateRegistrationScalarWhereWithAggregatesInput[]
    NOT?: CorporateRegistrationScalarWhereWithAggregatesInput | CorporateRegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CorporateRegistration"> | string
    userId?: StringWithAggregatesFilter<"CorporateRegistration"> | string
    companyName?: StringNullableWithAggregatesFilter<"CorporateRegistration"> | string | null
    businessLicenseFile?: StringNullableWithAggregatesFilter<"CorporateRegistration"> | string | null
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"CorporateRegistration"> | $Enums.VerificationStatus
    isVerifiedBy?: StringNullableWithAggregatesFilter<"CorporateRegistration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CorporateRegistration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CorporateRegistration"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    id?: StringFilter<"VerificationToken"> | string
    userId?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    type?: StringFilter<"VerificationToken"> | string
    expiresAt?: DateTimeFilter<"VerificationToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"VerificationToken"> | Date | string | null
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VerificationTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    userId?: StringFilter<"VerificationToken"> | string
    type?: StringFilter<"VerificationToken"> | string
    expiresAt?: DateTimeFilter<"VerificationToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"VerificationToken"> | Date | string | null
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type VerificationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationToken"> | string
    userId?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    type?: StringWithAggregatesFilter<"VerificationToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"VerificationToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type SanctionWhereInput = {
    AND?: SanctionWhereInput | SanctionWhereInput[]
    OR?: SanctionWhereInput[]
    NOT?: SanctionWhereInput | SanctionWhereInput[]
    id?: StringFilter<"Sanction"> | string
    userId?: StringFilter<"Sanction"> | string
    sanctionType?: EnumSanctionTypeFilter<"Sanction"> | $Enums.SanctionType
    reason?: StringNullableFilter<"Sanction"> | string | null
    startDate?: DateTimeNullableFilter<"Sanction"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Sanction"> | Date | string | null
    createdAt?: DateTimeFilter<"Sanction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SanctionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sanctionType?: SortOrder
    reason?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SanctionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SanctionWhereInput | SanctionWhereInput[]
    OR?: SanctionWhereInput[]
    NOT?: SanctionWhereInput | SanctionWhereInput[]
    userId?: StringFilter<"Sanction"> | string
    sanctionType?: EnumSanctionTypeFilter<"Sanction"> | $Enums.SanctionType
    reason?: StringNullableFilter<"Sanction"> | string | null
    startDate?: DateTimeNullableFilter<"Sanction"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Sanction"> | Date | string | null
    createdAt?: DateTimeFilter<"Sanction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SanctionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sanctionType?: SortOrder
    reason?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SanctionCountOrderByAggregateInput
    _max?: SanctionMaxOrderByAggregateInput
    _min?: SanctionMinOrderByAggregateInput
  }

  export type SanctionScalarWhereWithAggregatesInput = {
    AND?: SanctionScalarWhereWithAggregatesInput | SanctionScalarWhereWithAggregatesInput[]
    OR?: SanctionScalarWhereWithAggregatesInput[]
    NOT?: SanctionScalarWhereWithAggregatesInput | SanctionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sanction"> | string
    userId?: StringWithAggregatesFilter<"Sanction"> | string
    sanctionType?: EnumSanctionTypeWithAggregatesFilter<"Sanction"> | $Enums.SanctionType
    reason?: StringNullableWithAggregatesFilter<"Sanction"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Sanction"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Sanction"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Sanction"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionCreateNestedManyWithoutUserInput
    userInformation?: UserInformationCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionUncheckedCreateNestedManyWithoutUserInput
    userInformation?: UserInformationUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUncheckedUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInformationCreateInput = {
    id?: string
    profileImage?: string | null
    gender?: string | null
    address?: string | null
    country?: string | null
    city?: string | null
    cvForm?: string | null
    additionalInformation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserInformationInput
  }

  export type UserInformationUncheckedCreateInput = {
    id?: string
    userId: string
    profileImage?: string | null
    gender?: string | null
    address?: string | null
    country?: string | null
    city?: string | null
    cvForm?: string | null
    additionalInformation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserInformationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    cvForm?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserInformationNestedInput
  }

  export type UserInformationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    cvForm?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInformationCreateManyInput = {
    id?: string
    userId: string
    profileImage?: string | null
    gender?: string | null
    address?: string | null
    country?: string | null
    city?: string | null
    cvForm?: string | null
    additionalInformation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserInformationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    cvForm?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInformationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    cvForm?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type MemberIdentityVerificationCreateInput = {
    id?: string
    passportPhoto?: string | null
    selfiePhoto?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMemberIdentityVerificationInput
    verifier?: UserCreateNestedOneWithoutVerifiedMemberIdentitiesInput
  }

  export type MemberIdentityVerificationUncheckedCreateInput = {
    id?: string
    userId: string
    passportPhoto?: string | null
    selfiePhoto?: string | null
    verificationStatus?: $Enums.VerificationStatus
    isVerifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberIdentityVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMemberIdentityVerificationNestedInput
    verifier?: UserUpdateOneWithoutVerifiedMemberIdentitiesNestedInput
  }

  export type MemberIdentityVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    isVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberIdentityVerificationCreateManyInput = {
    id?: string
    userId: string
    passportPhoto?: string | null
    selfiePhoto?: string | null
    verificationStatus?: $Enums.VerificationStatus
    isVerifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberIdentityVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberIdentityVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    isVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateRegistrationCreateInput = {
    id?: string
    companyName?: string | null
    businessLicenseFile?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCorporateRegistrationInput
    verifier?: UserCreateNestedOneWithoutVerifiedCorporateRegistrationsInput
  }

  export type CorporateRegistrationUncheckedCreateInput = {
    id?: string
    userId: string
    companyName?: string | null
    businessLicenseFile?: string | null
    verificationStatus?: $Enums.VerificationStatus
    isVerifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CorporateRegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCorporateRegistrationNestedInput
    verifier?: UserUpdateOneWithoutVerifiedCorporateRegistrationsNestedInput
  }

  export type CorporateRegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    isVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateRegistrationCreateManyInput = {
    id?: string
    userId: string
    companyName?: string | null
    businessLicenseFile?: string | null
    verificationStatus?: $Enums.VerificationStatus
    isVerifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CorporateRegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateRegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    isVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    id?: string
    token: string
    type: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutVerificationTokensInput
  }

  export type VerificationTokenUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    type: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVerificationTokensNestedInput
  }

  export type VerificationTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    id?: string
    userId: string
    token: string
    type: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanctionCreateInput = {
    id?: string
    sanctionType: $Enums.SanctionType
    reason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSanctionsInput
  }

  export type SanctionUncheckedCreateInput = {
    id?: string
    userId: string
    sanctionType: $Enums.SanctionType
    reason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
  }

  export type SanctionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sanctionType?: EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSanctionsNestedInput
  }

  export type SanctionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sanctionType?: EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanctionCreateManyInput = {
    id?: string
    userId: string
    sanctionType: $Enums.SanctionType
    reason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
  }

  export type SanctionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sanctionType?: EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanctionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sanctionType?: EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type MemberIdentityVerificationNullableScalarRelationFilter = {
    is?: MemberIdentityVerificationWhereInput | null
    isNot?: MemberIdentityVerificationWhereInput | null
  }

  export type CorporateRegistrationNullableScalarRelationFilter = {
    is?: CorporateRegistrationWhereInput | null
    isNot?: CorporateRegistrationWhereInput | null
  }

  export type MemberIdentityVerificationListRelationFilter = {
    every?: MemberIdentityVerificationWhereInput
    some?: MemberIdentityVerificationWhereInput
    none?: MemberIdentityVerificationWhereInput
  }

  export type CorporateRegistrationListRelationFilter = {
    every?: CorporateRegistrationWhereInput
    some?: CorporateRegistrationWhereInput
    none?: CorporateRegistrationWhereInput
  }

  export type SanctionListRelationFilter = {
    every?: SanctionWhereInput
    some?: SanctionWhereInput
    none?: SanctionWhereInput
  }

  export type UserInformationNullableScalarRelationFilter = {
    is?: UserInformationWhereInput | null
    isNot?: UserInformationWhereInput | null
  }

  export type SocialAuthNullableScalarRelationFilter = {
    is?: SocialAuthWhereInput | null
    isNot?: SocialAuthWhereInput | null
  }

  export type VerificationTokenListRelationFilter = {
    every?: VerificationTokenWhereInput
    some?: VerificationTokenWhereInput
    none?: VerificationTokenWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MemberIdentityVerificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CorporateRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SanctionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VerificationTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    isEmailedVerified?: SortOrder
    isPhoneVerified?: SortOrder
    walletId?: SortOrder
    userInfoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    isEmailedVerified?: SortOrder
    isPhoneVerified?: SortOrder
    walletId?: SortOrder
    userInfoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    isEmailedVerified?: SortOrder
    isPhoneVerified?: SortOrder
    walletId?: SortOrder
    userInfoId?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserInformationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileImage?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    country?: SortOrder
    city?: SortOrder
    cvForm?: SortOrder
    additionalInformation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserInformationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileImage?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    country?: SortOrder
    city?: SortOrder
    cvForm?: SortOrder
    additionalInformation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserInformationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    profileImage?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    country?: SortOrder
    city?: SortOrder
    cvForm?: SortOrder
    additionalInformation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSocialProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderFilter<$PrismaModel> | $Enums.SocialProvider
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

  export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type MemberIdentityVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passportPhoto?: SortOrder
    selfiePhoto?: SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberIdentityVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passportPhoto?: SortOrder
    selfiePhoto?: SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberIdentityVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passportPhoto?: SortOrder
    selfiePhoto?: SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type CorporateRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    businessLicenseFile?: SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CorporateRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    businessLicenseFile?: SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CorporateRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    businessLicenseFile?: SortOrder
    verificationStatus?: SortOrder
    isVerifiedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type VerificationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
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

  export type EnumSanctionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SanctionType | EnumSanctionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SanctionType[] | ListEnumSanctionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SanctionType[] | ListEnumSanctionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSanctionTypeFilter<$PrismaModel> | $Enums.SanctionType
  }

  export type SanctionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sanctionType?: SortOrder
    reason?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
  }

  export type SanctionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sanctionType?: SortOrder
    reason?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
  }

  export type SanctionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sanctionType?: SortOrder
    reason?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSanctionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SanctionType | EnumSanctionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SanctionType[] | ListEnumSanctionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SanctionType[] | ListEnumSanctionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSanctionTypeWithAggregatesFilter<$PrismaModel> | $Enums.SanctionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSanctionTypeFilter<$PrismaModel>
    _max?: NestedEnumSanctionTypeFilter<$PrismaModel>
  }

  export type MemberIdentityVerificationCreateNestedOneWithoutUserInput = {
    create?: XOR<MemberIdentityVerificationCreateWithoutUserInput, MemberIdentityVerificationUncheckedCreateWithoutUserInput>
    connectOrCreate?: MemberIdentityVerificationCreateOrConnectWithoutUserInput
    connect?: MemberIdentityVerificationWhereUniqueInput
  }

  export type CorporateRegistrationCreateNestedOneWithoutUserInput = {
    create?: XOR<CorporateRegistrationCreateWithoutUserInput, CorporateRegistrationUncheckedCreateWithoutUserInput>
    connectOrCreate?: CorporateRegistrationCreateOrConnectWithoutUserInput
    connect?: CorporateRegistrationWhereUniqueInput
  }

  export type MemberIdentityVerificationCreateNestedManyWithoutVerifierInput = {
    create?: XOR<MemberIdentityVerificationCreateWithoutVerifierInput, MemberIdentityVerificationUncheckedCreateWithoutVerifierInput> | MemberIdentityVerificationCreateWithoutVerifierInput[] | MemberIdentityVerificationUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: MemberIdentityVerificationCreateOrConnectWithoutVerifierInput | MemberIdentityVerificationCreateOrConnectWithoutVerifierInput[]
    createMany?: MemberIdentityVerificationCreateManyVerifierInputEnvelope
    connect?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
  }

  export type CorporateRegistrationCreateNestedManyWithoutVerifierInput = {
    create?: XOR<CorporateRegistrationCreateWithoutVerifierInput, CorporateRegistrationUncheckedCreateWithoutVerifierInput> | CorporateRegistrationCreateWithoutVerifierInput[] | CorporateRegistrationUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: CorporateRegistrationCreateOrConnectWithoutVerifierInput | CorporateRegistrationCreateOrConnectWithoutVerifierInput[]
    createMany?: CorporateRegistrationCreateManyVerifierInputEnvelope
    connect?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
  }

  export type SanctionCreateNestedManyWithoutUserInput = {
    create?: XOR<SanctionCreateWithoutUserInput, SanctionUncheckedCreateWithoutUserInput> | SanctionCreateWithoutUserInput[] | SanctionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SanctionCreateOrConnectWithoutUserInput | SanctionCreateOrConnectWithoutUserInput[]
    createMany?: SanctionCreateManyUserInputEnvelope
    connect?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
  }

  export type UserInformationCreateNestedOneWithoutUserInput = {
    create?: XOR<UserInformationCreateWithoutUserInput, UserInformationUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserInformationCreateOrConnectWithoutUserInput
    connect?: UserInformationWhereUniqueInput
  }

  export type SocialAuthCreateNestedOneWithoutUserInput = {
    create?: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: SocialAuthCreateOrConnectWithoutUserInput
    connect?: SocialAuthWhereUniqueInput
  }

  export type VerificationTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<VerificationTokenCreateWithoutUserInput, VerificationTokenUncheckedCreateWithoutUserInput> | VerificationTokenCreateWithoutUserInput[] | VerificationTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VerificationTokenCreateOrConnectWithoutUserInput | VerificationTokenCreateOrConnectWithoutUserInput[]
    createMany?: VerificationTokenCreateManyUserInputEnvelope
    connect?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
  }

  export type MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MemberIdentityVerificationCreateWithoutUserInput, MemberIdentityVerificationUncheckedCreateWithoutUserInput>
    connectOrCreate?: MemberIdentityVerificationCreateOrConnectWithoutUserInput
    connect?: MemberIdentityVerificationWhereUniqueInput
  }

  export type CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CorporateRegistrationCreateWithoutUserInput, CorporateRegistrationUncheckedCreateWithoutUserInput>
    connectOrCreate?: CorporateRegistrationCreateOrConnectWithoutUserInput
    connect?: CorporateRegistrationWhereUniqueInput
  }

  export type MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput = {
    create?: XOR<MemberIdentityVerificationCreateWithoutVerifierInput, MemberIdentityVerificationUncheckedCreateWithoutVerifierInput> | MemberIdentityVerificationCreateWithoutVerifierInput[] | MemberIdentityVerificationUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: MemberIdentityVerificationCreateOrConnectWithoutVerifierInput | MemberIdentityVerificationCreateOrConnectWithoutVerifierInput[]
    createMany?: MemberIdentityVerificationCreateManyVerifierInputEnvelope
    connect?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
  }

  export type CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput = {
    create?: XOR<CorporateRegistrationCreateWithoutVerifierInput, CorporateRegistrationUncheckedCreateWithoutVerifierInput> | CorporateRegistrationCreateWithoutVerifierInput[] | CorporateRegistrationUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: CorporateRegistrationCreateOrConnectWithoutVerifierInput | CorporateRegistrationCreateOrConnectWithoutVerifierInput[]
    createMany?: CorporateRegistrationCreateManyVerifierInputEnvelope
    connect?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
  }

  export type SanctionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SanctionCreateWithoutUserInput, SanctionUncheckedCreateWithoutUserInput> | SanctionCreateWithoutUserInput[] | SanctionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SanctionCreateOrConnectWithoutUserInput | SanctionCreateOrConnectWithoutUserInput[]
    createMany?: SanctionCreateManyUserInputEnvelope
    connect?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
  }

  export type UserInformationUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserInformationCreateWithoutUserInput, UserInformationUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserInformationCreateOrConnectWithoutUserInput
    connect?: UserInformationWhereUniqueInput
  }

  export type SocialAuthUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: SocialAuthCreateOrConnectWithoutUserInput
    connect?: SocialAuthWhereUniqueInput
  }

  export type VerificationTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VerificationTokenCreateWithoutUserInput, VerificationTokenUncheckedCreateWithoutUserInput> | VerificationTokenCreateWithoutUserInput[] | VerificationTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VerificationTokenCreateOrConnectWithoutUserInput | VerificationTokenCreateOrConnectWithoutUserInput[]
    createMany?: VerificationTokenCreateManyUserInputEnvelope
    connect?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MemberIdentityVerificationUpdateOneWithoutUserNestedInput = {
    create?: XOR<MemberIdentityVerificationCreateWithoutUserInput, MemberIdentityVerificationUncheckedCreateWithoutUserInput>
    connectOrCreate?: MemberIdentityVerificationCreateOrConnectWithoutUserInput
    upsert?: MemberIdentityVerificationUpsertWithoutUserInput
    disconnect?: MemberIdentityVerificationWhereInput | boolean
    delete?: MemberIdentityVerificationWhereInput | boolean
    connect?: MemberIdentityVerificationWhereUniqueInput
    update?: XOR<XOR<MemberIdentityVerificationUpdateToOneWithWhereWithoutUserInput, MemberIdentityVerificationUpdateWithoutUserInput>, MemberIdentityVerificationUncheckedUpdateWithoutUserInput>
  }

  export type CorporateRegistrationUpdateOneWithoutUserNestedInput = {
    create?: XOR<CorporateRegistrationCreateWithoutUserInput, CorporateRegistrationUncheckedCreateWithoutUserInput>
    connectOrCreate?: CorporateRegistrationCreateOrConnectWithoutUserInput
    upsert?: CorporateRegistrationUpsertWithoutUserInput
    disconnect?: CorporateRegistrationWhereInput | boolean
    delete?: CorporateRegistrationWhereInput | boolean
    connect?: CorporateRegistrationWhereUniqueInput
    update?: XOR<XOR<CorporateRegistrationUpdateToOneWithWhereWithoutUserInput, CorporateRegistrationUpdateWithoutUserInput>, CorporateRegistrationUncheckedUpdateWithoutUserInput>
  }

  export type MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput = {
    create?: XOR<MemberIdentityVerificationCreateWithoutVerifierInput, MemberIdentityVerificationUncheckedCreateWithoutVerifierInput> | MemberIdentityVerificationCreateWithoutVerifierInput[] | MemberIdentityVerificationUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: MemberIdentityVerificationCreateOrConnectWithoutVerifierInput | MemberIdentityVerificationCreateOrConnectWithoutVerifierInput[]
    upsert?: MemberIdentityVerificationUpsertWithWhereUniqueWithoutVerifierInput | MemberIdentityVerificationUpsertWithWhereUniqueWithoutVerifierInput[]
    createMany?: MemberIdentityVerificationCreateManyVerifierInputEnvelope
    set?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
    disconnect?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
    delete?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
    connect?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
    update?: MemberIdentityVerificationUpdateWithWhereUniqueWithoutVerifierInput | MemberIdentityVerificationUpdateWithWhereUniqueWithoutVerifierInput[]
    updateMany?: MemberIdentityVerificationUpdateManyWithWhereWithoutVerifierInput | MemberIdentityVerificationUpdateManyWithWhereWithoutVerifierInput[]
    deleteMany?: MemberIdentityVerificationScalarWhereInput | MemberIdentityVerificationScalarWhereInput[]
  }

  export type CorporateRegistrationUpdateManyWithoutVerifierNestedInput = {
    create?: XOR<CorporateRegistrationCreateWithoutVerifierInput, CorporateRegistrationUncheckedCreateWithoutVerifierInput> | CorporateRegistrationCreateWithoutVerifierInput[] | CorporateRegistrationUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: CorporateRegistrationCreateOrConnectWithoutVerifierInput | CorporateRegistrationCreateOrConnectWithoutVerifierInput[]
    upsert?: CorporateRegistrationUpsertWithWhereUniqueWithoutVerifierInput | CorporateRegistrationUpsertWithWhereUniqueWithoutVerifierInput[]
    createMany?: CorporateRegistrationCreateManyVerifierInputEnvelope
    set?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
    disconnect?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
    delete?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
    connect?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
    update?: CorporateRegistrationUpdateWithWhereUniqueWithoutVerifierInput | CorporateRegistrationUpdateWithWhereUniqueWithoutVerifierInput[]
    updateMany?: CorporateRegistrationUpdateManyWithWhereWithoutVerifierInput | CorporateRegistrationUpdateManyWithWhereWithoutVerifierInput[]
    deleteMany?: CorporateRegistrationScalarWhereInput | CorporateRegistrationScalarWhereInput[]
  }

  export type SanctionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SanctionCreateWithoutUserInput, SanctionUncheckedCreateWithoutUserInput> | SanctionCreateWithoutUserInput[] | SanctionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SanctionCreateOrConnectWithoutUserInput | SanctionCreateOrConnectWithoutUserInput[]
    upsert?: SanctionUpsertWithWhereUniqueWithoutUserInput | SanctionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SanctionCreateManyUserInputEnvelope
    set?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
    disconnect?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
    delete?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
    connect?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
    update?: SanctionUpdateWithWhereUniqueWithoutUserInput | SanctionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SanctionUpdateManyWithWhereWithoutUserInput | SanctionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SanctionScalarWhereInput | SanctionScalarWhereInput[]
  }

  export type UserInformationUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserInformationCreateWithoutUserInput, UserInformationUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserInformationCreateOrConnectWithoutUserInput
    upsert?: UserInformationUpsertWithoutUserInput
    disconnect?: UserInformationWhereInput | boolean
    delete?: UserInformationWhereInput | boolean
    connect?: UserInformationWhereUniqueInput
    update?: XOR<XOR<UserInformationUpdateToOneWithWhereWithoutUserInput, UserInformationUpdateWithoutUserInput>, UserInformationUncheckedUpdateWithoutUserInput>
  }

  export type SocialAuthUpdateOneWithoutUserNestedInput = {
    create?: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: SocialAuthCreateOrConnectWithoutUserInput
    upsert?: SocialAuthUpsertWithoutUserInput
    disconnect?: SocialAuthWhereInput | boolean
    delete?: SocialAuthWhereInput | boolean
    connect?: SocialAuthWhereUniqueInput
    update?: XOR<XOR<SocialAuthUpdateToOneWithWhereWithoutUserInput, SocialAuthUpdateWithoutUserInput>, SocialAuthUncheckedUpdateWithoutUserInput>
  }

  export type VerificationTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<VerificationTokenCreateWithoutUserInput, VerificationTokenUncheckedCreateWithoutUserInput> | VerificationTokenCreateWithoutUserInput[] | VerificationTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VerificationTokenCreateOrConnectWithoutUserInput | VerificationTokenCreateOrConnectWithoutUserInput[]
    upsert?: VerificationTokenUpsertWithWhereUniqueWithoutUserInput | VerificationTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VerificationTokenCreateManyUserInputEnvelope
    set?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
    disconnect?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
    delete?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
    connect?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
    update?: VerificationTokenUpdateWithWhereUniqueWithoutUserInput | VerificationTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VerificationTokenUpdateManyWithWhereWithoutUserInput | VerificationTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VerificationTokenScalarWhereInput | VerificationTokenScalarWhereInput[]
  }

  export type MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<MemberIdentityVerificationCreateWithoutUserInput, MemberIdentityVerificationUncheckedCreateWithoutUserInput>
    connectOrCreate?: MemberIdentityVerificationCreateOrConnectWithoutUserInput
    upsert?: MemberIdentityVerificationUpsertWithoutUserInput
    disconnect?: MemberIdentityVerificationWhereInput | boolean
    delete?: MemberIdentityVerificationWhereInput | boolean
    connect?: MemberIdentityVerificationWhereUniqueInput
    update?: XOR<XOR<MemberIdentityVerificationUpdateToOneWithWhereWithoutUserInput, MemberIdentityVerificationUpdateWithoutUserInput>, MemberIdentityVerificationUncheckedUpdateWithoutUserInput>
  }

  export type CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CorporateRegistrationCreateWithoutUserInput, CorporateRegistrationUncheckedCreateWithoutUserInput>
    connectOrCreate?: CorporateRegistrationCreateOrConnectWithoutUserInput
    upsert?: CorporateRegistrationUpsertWithoutUserInput
    disconnect?: CorporateRegistrationWhereInput | boolean
    delete?: CorporateRegistrationWhereInput | boolean
    connect?: CorporateRegistrationWhereUniqueInput
    update?: XOR<XOR<CorporateRegistrationUpdateToOneWithWhereWithoutUserInput, CorporateRegistrationUpdateWithoutUserInput>, CorporateRegistrationUncheckedUpdateWithoutUserInput>
  }

  export type MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput = {
    create?: XOR<MemberIdentityVerificationCreateWithoutVerifierInput, MemberIdentityVerificationUncheckedCreateWithoutVerifierInput> | MemberIdentityVerificationCreateWithoutVerifierInput[] | MemberIdentityVerificationUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: MemberIdentityVerificationCreateOrConnectWithoutVerifierInput | MemberIdentityVerificationCreateOrConnectWithoutVerifierInput[]
    upsert?: MemberIdentityVerificationUpsertWithWhereUniqueWithoutVerifierInput | MemberIdentityVerificationUpsertWithWhereUniqueWithoutVerifierInput[]
    createMany?: MemberIdentityVerificationCreateManyVerifierInputEnvelope
    set?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
    disconnect?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
    delete?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
    connect?: MemberIdentityVerificationWhereUniqueInput | MemberIdentityVerificationWhereUniqueInput[]
    update?: MemberIdentityVerificationUpdateWithWhereUniqueWithoutVerifierInput | MemberIdentityVerificationUpdateWithWhereUniqueWithoutVerifierInput[]
    updateMany?: MemberIdentityVerificationUpdateManyWithWhereWithoutVerifierInput | MemberIdentityVerificationUpdateManyWithWhereWithoutVerifierInput[]
    deleteMany?: MemberIdentityVerificationScalarWhereInput | MemberIdentityVerificationScalarWhereInput[]
  }

  export type CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput = {
    create?: XOR<CorporateRegistrationCreateWithoutVerifierInput, CorporateRegistrationUncheckedCreateWithoutVerifierInput> | CorporateRegistrationCreateWithoutVerifierInput[] | CorporateRegistrationUncheckedCreateWithoutVerifierInput[]
    connectOrCreate?: CorporateRegistrationCreateOrConnectWithoutVerifierInput | CorporateRegistrationCreateOrConnectWithoutVerifierInput[]
    upsert?: CorporateRegistrationUpsertWithWhereUniqueWithoutVerifierInput | CorporateRegistrationUpsertWithWhereUniqueWithoutVerifierInput[]
    createMany?: CorporateRegistrationCreateManyVerifierInputEnvelope
    set?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
    disconnect?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
    delete?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
    connect?: CorporateRegistrationWhereUniqueInput | CorporateRegistrationWhereUniqueInput[]
    update?: CorporateRegistrationUpdateWithWhereUniqueWithoutVerifierInput | CorporateRegistrationUpdateWithWhereUniqueWithoutVerifierInput[]
    updateMany?: CorporateRegistrationUpdateManyWithWhereWithoutVerifierInput | CorporateRegistrationUpdateManyWithWhereWithoutVerifierInput[]
    deleteMany?: CorporateRegistrationScalarWhereInput | CorporateRegistrationScalarWhereInput[]
  }

  export type SanctionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SanctionCreateWithoutUserInput, SanctionUncheckedCreateWithoutUserInput> | SanctionCreateWithoutUserInput[] | SanctionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SanctionCreateOrConnectWithoutUserInput | SanctionCreateOrConnectWithoutUserInput[]
    upsert?: SanctionUpsertWithWhereUniqueWithoutUserInput | SanctionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SanctionCreateManyUserInputEnvelope
    set?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
    disconnect?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
    delete?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
    connect?: SanctionWhereUniqueInput | SanctionWhereUniqueInput[]
    update?: SanctionUpdateWithWhereUniqueWithoutUserInput | SanctionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SanctionUpdateManyWithWhereWithoutUserInput | SanctionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SanctionScalarWhereInput | SanctionScalarWhereInput[]
  }

  export type UserInformationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserInformationCreateWithoutUserInput, UserInformationUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserInformationCreateOrConnectWithoutUserInput
    upsert?: UserInformationUpsertWithoutUserInput
    disconnect?: UserInformationWhereInput | boolean
    delete?: UserInformationWhereInput | boolean
    connect?: UserInformationWhereUniqueInput
    update?: XOR<XOR<UserInformationUpdateToOneWithWhereWithoutUserInput, UserInformationUpdateWithoutUserInput>, UserInformationUncheckedUpdateWithoutUserInput>
  }

  export type SocialAuthUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: SocialAuthCreateOrConnectWithoutUserInput
    upsert?: SocialAuthUpsertWithoutUserInput
    disconnect?: SocialAuthWhereInput | boolean
    delete?: SocialAuthWhereInput | boolean
    connect?: SocialAuthWhereUniqueInput
    update?: XOR<XOR<SocialAuthUpdateToOneWithWhereWithoutUserInput, SocialAuthUpdateWithoutUserInput>, SocialAuthUncheckedUpdateWithoutUserInput>
  }

  export type VerificationTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VerificationTokenCreateWithoutUserInput, VerificationTokenUncheckedCreateWithoutUserInput> | VerificationTokenCreateWithoutUserInput[] | VerificationTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VerificationTokenCreateOrConnectWithoutUserInput | VerificationTokenCreateOrConnectWithoutUserInput[]
    upsert?: VerificationTokenUpsertWithWhereUniqueWithoutUserInput | VerificationTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VerificationTokenCreateManyUserInputEnvelope
    set?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
    disconnect?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
    delete?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
    connect?: VerificationTokenWhereUniqueInput | VerificationTokenWhereUniqueInput[]
    update?: VerificationTokenUpdateWithWhereUniqueWithoutUserInput | VerificationTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VerificationTokenUpdateManyWithWhereWithoutUserInput | VerificationTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VerificationTokenScalarWhereInput | VerificationTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserInformationInput = {
    create?: XOR<UserCreateWithoutUserInformationInput, UserUncheckedCreateWithoutUserInformationInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserInformationInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserInformationNestedInput = {
    create?: XOR<UserCreateWithoutUserInformationInput, UserUncheckedCreateWithoutUserInformationInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserInformationInput
    upsert?: UserUpsertWithoutUserInformationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserInformationInput, UserUpdateWithoutUserInformationInput>, UserUncheckedUpdateWithoutUserInformationInput>
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

  export type UserCreateNestedOneWithoutMemberIdentityVerificationInput = {
    create?: XOR<UserCreateWithoutMemberIdentityVerificationInput, UserUncheckedCreateWithoutMemberIdentityVerificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemberIdentityVerificationInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVerifiedMemberIdentitiesInput = {
    create?: XOR<UserCreateWithoutVerifiedMemberIdentitiesInput, UserUncheckedCreateWithoutVerifiedMemberIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedMemberIdentitiesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type UserUpdateOneRequiredWithoutMemberIdentityVerificationNestedInput = {
    create?: XOR<UserCreateWithoutMemberIdentityVerificationInput, UserUncheckedCreateWithoutMemberIdentityVerificationInput>
    connectOrCreate?: UserCreateOrConnectWithoutMemberIdentityVerificationInput
    upsert?: UserUpsertWithoutMemberIdentityVerificationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMemberIdentityVerificationInput, UserUpdateWithoutMemberIdentityVerificationInput>, UserUncheckedUpdateWithoutMemberIdentityVerificationInput>
  }

  export type UserUpdateOneWithoutVerifiedMemberIdentitiesNestedInput = {
    create?: XOR<UserCreateWithoutVerifiedMemberIdentitiesInput, UserUncheckedCreateWithoutVerifiedMemberIdentitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedMemberIdentitiesInput
    upsert?: UserUpsertWithoutVerifiedMemberIdentitiesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerifiedMemberIdentitiesInput, UserUpdateWithoutVerifiedMemberIdentitiesInput>, UserUncheckedUpdateWithoutVerifiedMemberIdentitiesInput>
  }

  export type UserCreateNestedOneWithoutCorporateRegistrationInput = {
    create?: XOR<UserCreateWithoutCorporateRegistrationInput, UserUncheckedCreateWithoutCorporateRegistrationInput>
    connectOrCreate?: UserCreateOrConnectWithoutCorporateRegistrationInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVerifiedCorporateRegistrationsInput = {
    create?: XOR<UserCreateWithoutVerifiedCorporateRegistrationsInput, UserUncheckedCreateWithoutVerifiedCorporateRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedCorporateRegistrationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCorporateRegistrationNestedInput = {
    create?: XOR<UserCreateWithoutCorporateRegistrationInput, UserUncheckedCreateWithoutCorporateRegistrationInput>
    connectOrCreate?: UserCreateOrConnectWithoutCorporateRegistrationInput
    upsert?: UserUpsertWithoutCorporateRegistrationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCorporateRegistrationInput, UserUpdateWithoutCorporateRegistrationInput>, UserUncheckedUpdateWithoutCorporateRegistrationInput>
  }

  export type UserUpdateOneWithoutVerifiedCorporateRegistrationsNestedInput = {
    create?: XOR<UserCreateWithoutVerifiedCorporateRegistrationsInput, UserUncheckedCreateWithoutVerifiedCorporateRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedCorporateRegistrationsInput
    upsert?: UserUpsertWithoutVerifiedCorporateRegistrationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerifiedCorporateRegistrationsInput, UserUpdateWithoutVerifiedCorporateRegistrationsInput>, UserUncheckedUpdateWithoutVerifiedCorporateRegistrationsInput>
  }

  export type UserCreateNestedOneWithoutVerificationTokensInput = {
    create?: XOR<UserCreateWithoutVerificationTokensInput, UserUncheckedCreateWithoutVerificationTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationTokensInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutVerificationTokensNestedInput = {
    create?: XOR<UserCreateWithoutVerificationTokensInput, UserUncheckedCreateWithoutVerificationTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationTokensInput
    upsert?: UserUpsertWithoutVerificationTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerificationTokensInput, UserUpdateWithoutVerificationTokensInput>, UserUncheckedUpdateWithoutVerificationTokensInput>
  }

  export type UserCreateNestedOneWithoutSanctionsInput = {
    create?: XOR<UserCreateWithoutSanctionsInput, UserUncheckedCreateWithoutSanctionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSanctionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumSanctionTypeFieldUpdateOperationsInput = {
    set?: $Enums.SanctionType
  }

  export type UserUpdateOneRequiredWithoutSanctionsNestedInput = {
    create?: XOR<UserCreateWithoutSanctionsInput, UserUncheckedCreateWithoutSanctionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSanctionsInput
    upsert?: UserUpsertWithoutSanctionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSanctionsInput, UserUpdateWithoutSanctionsInput>, UserUncheckedUpdateWithoutSanctionsInput>
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
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

  export type NestedEnumSanctionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SanctionType | EnumSanctionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SanctionType[] | ListEnumSanctionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SanctionType[] | ListEnumSanctionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSanctionTypeFilter<$PrismaModel> | $Enums.SanctionType
  }

  export type NestedEnumSanctionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SanctionType | EnumSanctionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SanctionType[] | ListEnumSanctionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SanctionType[] | ListEnumSanctionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSanctionTypeWithAggregatesFilter<$PrismaModel> | $Enums.SanctionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSanctionTypeFilter<$PrismaModel>
    _max?: NestedEnumSanctionTypeFilter<$PrismaModel>
  }

  export type MemberIdentityVerificationCreateWithoutUserInput = {
    id?: string
    passportPhoto?: string | null
    selfiePhoto?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    verifier?: UserCreateNestedOneWithoutVerifiedMemberIdentitiesInput
  }

  export type MemberIdentityVerificationUncheckedCreateWithoutUserInput = {
    id?: string
    passportPhoto?: string | null
    selfiePhoto?: string | null
    verificationStatus?: $Enums.VerificationStatus
    isVerifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberIdentityVerificationCreateOrConnectWithoutUserInput = {
    where: MemberIdentityVerificationWhereUniqueInput
    create: XOR<MemberIdentityVerificationCreateWithoutUserInput, MemberIdentityVerificationUncheckedCreateWithoutUserInput>
  }

  export type CorporateRegistrationCreateWithoutUserInput = {
    id?: string
    companyName?: string | null
    businessLicenseFile?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    verifier?: UserCreateNestedOneWithoutVerifiedCorporateRegistrationsInput
  }

  export type CorporateRegistrationUncheckedCreateWithoutUserInput = {
    id?: string
    companyName?: string | null
    businessLicenseFile?: string | null
    verificationStatus?: $Enums.VerificationStatus
    isVerifiedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CorporateRegistrationCreateOrConnectWithoutUserInput = {
    where: CorporateRegistrationWhereUniqueInput
    create: XOR<CorporateRegistrationCreateWithoutUserInput, CorporateRegistrationUncheckedCreateWithoutUserInput>
  }

  export type MemberIdentityVerificationCreateWithoutVerifierInput = {
    id?: string
    passportPhoto?: string | null
    selfiePhoto?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMemberIdentityVerificationInput
  }

  export type MemberIdentityVerificationUncheckedCreateWithoutVerifierInput = {
    id?: string
    userId: string
    passportPhoto?: string | null
    selfiePhoto?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberIdentityVerificationCreateOrConnectWithoutVerifierInput = {
    where: MemberIdentityVerificationWhereUniqueInput
    create: XOR<MemberIdentityVerificationCreateWithoutVerifierInput, MemberIdentityVerificationUncheckedCreateWithoutVerifierInput>
  }

  export type MemberIdentityVerificationCreateManyVerifierInputEnvelope = {
    data: MemberIdentityVerificationCreateManyVerifierInput | MemberIdentityVerificationCreateManyVerifierInput[]
    skipDuplicates?: boolean
  }

  export type CorporateRegistrationCreateWithoutVerifierInput = {
    id?: string
    companyName?: string | null
    businessLicenseFile?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCorporateRegistrationInput
  }

  export type CorporateRegistrationUncheckedCreateWithoutVerifierInput = {
    id?: string
    userId: string
    companyName?: string | null
    businessLicenseFile?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CorporateRegistrationCreateOrConnectWithoutVerifierInput = {
    where: CorporateRegistrationWhereUniqueInput
    create: XOR<CorporateRegistrationCreateWithoutVerifierInput, CorporateRegistrationUncheckedCreateWithoutVerifierInput>
  }

  export type CorporateRegistrationCreateManyVerifierInputEnvelope = {
    data: CorporateRegistrationCreateManyVerifierInput | CorporateRegistrationCreateManyVerifierInput[]
    skipDuplicates?: boolean
  }

  export type SanctionCreateWithoutUserInput = {
    id?: string
    sanctionType: $Enums.SanctionType
    reason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
  }

  export type SanctionUncheckedCreateWithoutUserInput = {
    id?: string
    sanctionType: $Enums.SanctionType
    reason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
  }

  export type SanctionCreateOrConnectWithoutUserInput = {
    where: SanctionWhereUniqueInput
    create: XOR<SanctionCreateWithoutUserInput, SanctionUncheckedCreateWithoutUserInput>
  }

  export type SanctionCreateManyUserInputEnvelope = {
    data: SanctionCreateManyUserInput | SanctionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserInformationCreateWithoutUserInput = {
    id?: string
    profileImage?: string | null
    gender?: string | null
    address?: string | null
    country?: string | null
    city?: string | null
    cvForm?: string | null
    additionalInformation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserInformationUncheckedCreateWithoutUserInput = {
    id?: string
    profileImage?: string | null
    gender?: string | null
    address?: string | null
    country?: string | null
    city?: string | null
    cvForm?: string | null
    additionalInformation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserInformationCreateOrConnectWithoutUserInput = {
    where: UserInformationWhereUniqueInput
    create: XOR<UserInformationCreateWithoutUserInput, UserInformationUncheckedCreateWithoutUserInput>
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

  export type VerificationTokenCreateWithoutUserInput = {
    id?: string
    token: string
    type: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    type: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationTokenCreateOrConnectWithoutUserInput = {
    where: VerificationTokenWhereUniqueInput
    create: XOR<VerificationTokenCreateWithoutUserInput, VerificationTokenUncheckedCreateWithoutUserInput>
  }

  export type VerificationTokenCreateManyUserInputEnvelope = {
    data: VerificationTokenCreateManyUserInput | VerificationTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MemberIdentityVerificationUpsertWithoutUserInput = {
    update: XOR<MemberIdentityVerificationUpdateWithoutUserInput, MemberIdentityVerificationUncheckedUpdateWithoutUserInput>
    create: XOR<MemberIdentityVerificationCreateWithoutUserInput, MemberIdentityVerificationUncheckedCreateWithoutUserInput>
    where?: MemberIdentityVerificationWhereInput
  }

  export type MemberIdentityVerificationUpdateToOneWithWhereWithoutUserInput = {
    where?: MemberIdentityVerificationWhereInput
    data: XOR<MemberIdentityVerificationUpdateWithoutUserInput, MemberIdentityVerificationUncheckedUpdateWithoutUserInput>
  }

  export type MemberIdentityVerificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifier?: UserUpdateOneWithoutVerifiedMemberIdentitiesNestedInput
  }

  export type MemberIdentityVerificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    isVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateRegistrationUpsertWithoutUserInput = {
    update: XOR<CorporateRegistrationUpdateWithoutUserInput, CorporateRegistrationUncheckedUpdateWithoutUserInput>
    create: XOR<CorporateRegistrationCreateWithoutUserInput, CorporateRegistrationUncheckedCreateWithoutUserInput>
    where?: CorporateRegistrationWhereInput
  }

  export type CorporateRegistrationUpdateToOneWithWhereWithoutUserInput = {
    where?: CorporateRegistrationWhereInput
    data: XOR<CorporateRegistrationUpdateWithoutUserInput, CorporateRegistrationUncheckedUpdateWithoutUserInput>
  }

  export type CorporateRegistrationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifier?: UserUpdateOneWithoutVerifiedCorporateRegistrationsNestedInput
  }

  export type CorporateRegistrationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    isVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberIdentityVerificationUpsertWithWhereUniqueWithoutVerifierInput = {
    where: MemberIdentityVerificationWhereUniqueInput
    update: XOR<MemberIdentityVerificationUpdateWithoutVerifierInput, MemberIdentityVerificationUncheckedUpdateWithoutVerifierInput>
    create: XOR<MemberIdentityVerificationCreateWithoutVerifierInput, MemberIdentityVerificationUncheckedCreateWithoutVerifierInput>
  }

  export type MemberIdentityVerificationUpdateWithWhereUniqueWithoutVerifierInput = {
    where: MemberIdentityVerificationWhereUniqueInput
    data: XOR<MemberIdentityVerificationUpdateWithoutVerifierInput, MemberIdentityVerificationUncheckedUpdateWithoutVerifierInput>
  }

  export type MemberIdentityVerificationUpdateManyWithWhereWithoutVerifierInput = {
    where: MemberIdentityVerificationScalarWhereInput
    data: XOR<MemberIdentityVerificationUpdateManyMutationInput, MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierInput>
  }

  export type MemberIdentityVerificationScalarWhereInput = {
    AND?: MemberIdentityVerificationScalarWhereInput | MemberIdentityVerificationScalarWhereInput[]
    OR?: MemberIdentityVerificationScalarWhereInput[]
    NOT?: MemberIdentityVerificationScalarWhereInput | MemberIdentityVerificationScalarWhereInput[]
    id?: StringFilter<"MemberIdentityVerification"> | string
    userId?: StringFilter<"MemberIdentityVerification"> | string
    passportPhoto?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    selfiePhoto?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"MemberIdentityVerification"> | $Enums.VerificationStatus
    isVerifiedBy?: StringNullableFilter<"MemberIdentityVerification"> | string | null
    createdAt?: DateTimeFilter<"MemberIdentityVerification"> | Date | string
    updatedAt?: DateTimeFilter<"MemberIdentityVerification"> | Date | string
  }

  export type CorporateRegistrationUpsertWithWhereUniqueWithoutVerifierInput = {
    where: CorporateRegistrationWhereUniqueInput
    update: XOR<CorporateRegistrationUpdateWithoutVerifierInput, CorporateRegistrationUncheckedUpdateWithoutVerifierInput>
    create: XOR<CorporateRegistrationCreateWithoutVerifierInput, CorporateRegistrationUncheckedCreateWithoutVerifierInput>
  }

  export type CorporateRegistrationUpdateWithWhereUniqueWithoutVerifierInput = {
    where: CorporateRegistrationWhereUniqueInput
    data: XOR<CorporateRegistrationUpdateWithoutVerifierInput, CorporateRegistrationUncheckedUpdateWithoutVerifierInput>
  }

  export type CorporateRegistrationUpdateManyWithWhereWithoutVerifierInput = {
    where: CorporateRegistrationScalarWhereInput
    data: XOR<CorporateRegistrationUpdateManyMutationInput, CorporateRegistrationUncheckedUpdateManyWithoutVerifierInput>
  }

  export type CorporateRegistrationScalarWhereInput = {
    AND?: CorporateRegistrationScalarWhereInput | CorporateRegistrationScalarWhereInput[]
    OR?: CorporateRegistrationScalarWhereInput[]
    NOT?: CorporateRegistrationScalarWhereInput | CorporateRegistrationScalarWhereInput[]
    id?: StringFilter<"CorporateRegistration"> | string
    userId?: StringFilter<"CorporateRegistration"> | string
    companyName?: StringNullableFilter<"CorporateRegistration"> | string | null
    businessLicenseFile?: StringNullableFilter<"CorporateRegistration"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"CorporateRegistration"> | $Enums.VerificationStatus
    isVerifiedBy?: StringNullableFilter<"CorporateRegistration"> | string | null
    createdAt?: DateTimeFilter<"CorporateRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"CorporateRegistration"> | Date | string
  }

  export type SanctionUpsertWithWhereUniqueWithoutUserInput = {
    where: SanctionWhereUniqueInput
    update: XOR<SanctionUpdateWithoutUserInput, SanctionUncheckedUpdateWithoutUserInput>
    create: XOR<SanctionCreateWithoutUserInput, SanctionUncheckedCreateWithoutUserInput>
  }

  export type SanctionUpdateWithWhereUniqueWithoutUserInput = {
    where: SanctionWhereUniqueInput
    data: XOR<SanctionUpdateWithoutUserInput, SanctionUncheckedUpdateWithoutUserInput>
  }

  export type SanctionUpdateManyWithWhereWithoutUserInput = {
    where: SanctionScalarWhereInput
    data: XOR<SanctionUpdateManyMutationInput, SanctionUncheckedUpdateManyWithoutUserInput>
  }

  export type SanctionScalarWhereInput = {
    AND?: SanctionScalarWhereInput | SanctionScalarWhereInput[]
    OR?: SanctionScalarWhereInput[]
    NOT?: SanctionScalarWhereInput | SanctionScalarWhereInput[]
    id?: StringFilter<"Sanction"> | string
    userId?: StringFilter<"Sanction"> | string
    sanctionType?: EnumSanctionTypeFilter<"Sanction"> | $Enums.SanctionType
    reason?: StringNullableFilter<"Sanction"> | string | null
    startDate?: DateTimeNullableFilter<"Sanction"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Sanction"> | Date | string | null
    createdAt?: DateTimeFilter<"Sanction"> | Date | string
  }

  export type UserInformationUpsertWithoutUserInput = {
    update: XOR<UserInformationUpdateWithoutUserInput, UserInformationUncheckedUpdateWithoutUserInput>
    create: XOR<UserInformationCreateWithoutUserInput, UserInformationUncheckedCreateWithoutUserInput>
    where?: UserInformationWhereInput
  }

  export type UserInformationUpdateToOneWithWhereWithoutUserInput = {
    where?: UserInformationWhereInput
    data: XOR<UserInformationUpdateWithoutUserInput, UserInformationUncheckedUpdateWithoutUserInput>
  }

  export type UserInformationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    cvForm?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInformationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    cvForm?: NullableStringFieldUpdateOperationsInput | string | null
    additionalInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SocialAuthUpsertWithoutUserInput = {
    update: XOR<SocialAuthUpdateWithoutUserInput, SocialAuthUncheckedUpdateWithoutUserInput>
    create: XOR<SocialAuthCreateWithoutUserInput, SocialAuthUncheckedCreateWithoutUserInput>
    where?: SocialAuthWhereInput
  }

  export type SocialAuthUpdateToOneWithWhereWithoutUserInput = {
    where?: SocialAuthWhereInput
    data: XOR<SocialAuthUpdateWithoutUserInput, SocialAuthUncheckedUpdateWithoutUserInput>
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

  export type VerificationTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: VerificationTokenWhereUniqueInput
    update: XOR<VerificationTokenUpdateWithoutUserInput, VerificationTokenUncheckedUpdateWithoutUserInput>
    create: XOR<VerificationTokenCreateWithoutUserInput, VerificationTokenUncheckedCreateWithoutUserInput>
  }

  export type VerificationTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: VerificationTokenWhereUniqueInput
    data: XOR<VerificationTokenUpdateWithoutUserInput, VerificationTokenUncheckedUpdateWithoutUserInput>
  }

  export type VerificationTokenUpdateManyWithWhereWithoutUserInput = {
    where: VerificationTokenScalarWhereInput
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type VerificationTokenScalarWhereInput = {
    AND?: VerificationTokenScalarWhereInput | VerificationTokenScalarWhereInput[]
    OR?: VerificationTokenScalarWhereInput[]
    NOT?: VerificationTokenScalarWhereInput | VerificationTokenScalarWhereInput[]
    id?: StringFilter<"VerificationToken"> | string
    userId?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    type?: StringFilter<"VerificationToken"> | string
    expiresAt?: DateTimeFilter<"VerificationToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"VerificationToken"> | Date | string | null
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type UserCreateWithoutUserInformationInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionCreateNestedManyWithoutUserInput
    socialAuths?: SocialAuthCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserInformationInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionUncheckedCreateNestedManyWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserInformationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserInformationInput, UserUncheckedCreateWithoutUserInformationInput>
  }

  export type UserUpsertWithoutUserInformationInput = {
    update: XOR<UserUpdateWithoutUserInformationInput, UserUncheckedUpdateWithoutUserInformationInput>
    create: XOR<UserCreateWithoutUserInformationInput, UserUncheckedCreateWithoutUserInformationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserInformationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserInformationInput, UserUncheckedUpdateWithoutUserInformationInput>
  }

  export type UserUpdateWithoutUserInformationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUpdateManyWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserInformationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUncheckedUpdateManyWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSocialAuthsInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionCreateNestedManyWithoutUserInput
    userInformation?: UserInformationCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSocialAuthsInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionUncheckedCreateNestedManyWithoutUserInput
    userInformation?: UserInformationUncheckedCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenUncheckedCreateNestedManyWithoutUserInput
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
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSocialAuthsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUncheckedUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUncheckedUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMemberIdentityVerificationInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    corporateRegistration?: CorporateRegistrationCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionCreateNestedManyWithoutUserInput
    userInformation?: UserInformationCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMemberIdentityVerificationInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    corporateRegistration?: CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionUncheckedCreateNestedManyWithoutUserInput
    userInformation?: UserInformationUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMemberIdentityVerificationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMemberIdentityVerificationInput, UserUncheckedCreateWithoutMemberIdentityVerificationInput>
  }

  export type UserCreateWithoutVerifiedMemberIdentitiesInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationCreateNestedOneWithoutUserInput
    verifiedCorporateRegistrations?: CorporateRegistrationCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionCreateNestedManyWithoutUserInput
    userInformation?: UserInformationCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVerifiedMemberIdentitiesInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionUncheckedCreateNestedManyWithoutUserInput
    userInformation?: UserInformationUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVerifiedMemberIdentitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerifiedMemberIdentitiesInput, UserUncheckedCreateWithoutVerifiedMemberIdentitiesInput>
  }

  export type UserUpsertWithoutMemberIdentityVerificationInput = {
    update: XOR<UserUpdateWithoutMemberIdentityVerificationInput, UserUncheckedUpdateWithoutMemberIdentityVerificationInput>
    create: XOR<UserCreateWithoutMemberIdentityVerificationInput, UserUncheckedCreateWithoutMemberIdentityVerificationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMemberIdentityVerificationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMemberIdentityVerificationInput, UserUncheckedUpdateWithoutMemberIdentityVerificationInput>
  }

  export type UserUpdateWithoutMemberIdentityVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporateRegistration?: CorporateRegistrationUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMemberIdentityVerificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    corporateRegistration?: CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUncheckedUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutVerifiedMemberIdentitiesInput = {
    update: XOR<UserUpdateWithoutVerifiedMemberIdentitiesInput, UserUncheckedUpdateWithoutVerifiedMemberIdentitiesInput>
    create: XOR<UserCreateWithoutVerifiedMemberIdentitiesInput, UserUncheckedCreateWithoutVerifiedMemberIdentitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerifiedMemberIdentitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerifiedMemberIdentitiesInput, UserUncheckedUpdateWithoutVerifiedMemberIdentitiesInput>
  }

  export type UserUpdateWithoutVerifiedMemberIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUpdateOneWithoutUserNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVerifiedMemberIdentitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUncheckedUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCorporateRegistrationInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionCreateNestedManyWithoutUserInput
    userInformation?: UserInformationCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCorporateRegistrationInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionUncheckedCreateNestedManyWithoutUserInput
    userInformation?: UserInformationUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCorporateRegistrationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCorporateRegistrationInput, UserUncheckedCreateWithoutCorporateRegistrationInput>
  }

  export type UserCreateWithoutVerifiedCorporateRegistrationsInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionCreateNestedManyWithoutUserInput
    userInformation?: UserInformationCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVerifiedCorporateRegistrationsInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionUncheckedCreateNestedManyWithoutUserInput
    userInformation?: UserInformationUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVerifiedCorporateRegistrationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerifiedCorporateRegistrationsInput, UserUncheckedCreateWithoutVerifiedCorporateRegistrationsInput>
  }

  export type UserUpsertWithoutCorporateRegistrationInput = {
    update: XOR<UserUpdateWithoutCorporateRegistrationInput, UserUncheckedUpdateWithoutCorporateRegistrationInput>
    create: XOR<UserCreateWithoutCorporateRegistrationInput, UserUncheckedCreateWithoutCorporateRegistrationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCorporateRegistrationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCorporateRegistrationInput, UserUncheckedUpdateWithoutCorporateRegistrationInput>
  }

  export type UserUpdateWithoutCorporateRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCorporateRegistrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUncheckedUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutVerifiedCorporateRegistrationsInput = {
    update: XOR<UserUpdateWithoutVerifiedCorporateRegistrationsInput, UserUncheckedUpdateWithoutVerifiedCorporateRegistrationsInput>
    create: XOR<UserCreateWithoutVerifiedCorporateRegistrationsInput, UserUncheckedCreateWithoutVerifiedCorporateRegistrationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerifiedCorporateRegistrationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerifiedCorporateRegistrationsInput, UserUncheckedUpdateWithoutVerifiedCorporateRegistrationsInput>
  }

  export type UserUpdateWithoutVerifiedCorporateRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVerifiedCorporateRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUncheckedUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutVerificationTokensInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionCreateNestedManyWithoutUserInput
    userInformation?: UserInformationCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVerificationTokensInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput
    sanctions?: SanctionUncheckedCreateNestedManyWithoutUserInput
    userInformation?: UserInformationUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVerificationTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerificationTokensInput, UserUncheckedCreateWithoutVerificationTokensInput>
  }

  export type UserUpsertWithoutVerificationTokensInput = {
    update: XOR<UserUpdateWithoutVerificationTokensInput, UserUncheckedUpdateWithoutVerificationTokensInput>
    create: XOR<UserCreateWithoutVerificationTokensInput, UserUncheckedCreateWithoutVerificationTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerificationTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerificationTokensInput, UserUncheckedUpdateWithoutVerificationTokensInput>
  }

  export type UserUpdateWithoutVerificationTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVerificationTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput
    sanctions?: SanctionUncheckedUpdateManyWithoutUserNestedInput
    userInformation?: UserInformationUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutSanctionsInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationCreateNestedManyWithoutVerifierInput
    userInformation?: UserInformationCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSanctionsInput = {
    id?: string
    role?: $Enums.UserRole
    email?: string | null
    password?: string | null
    phone?: string | null
    fullName?: string | null
    status?: $Enums.UserStatus
    isEmailedVerified?: boolean
    isPhoneVerified?: boolean
    walletId?: string | null
    userInfoId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedCreateNestedOneWithoutUserInput
    corporateRegistration?: CorporateRegistrationUncheckedCreateNestedOneWithoutUserInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedCreateNestedManyWithoutVerifierInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedCreateNestedManyWithoutVerifierInput
    userInformation?: UserInformationUncheckedCreateNestedOneWithoutUserInput
    socialAuths?: SocialAuthUncheckedCreateNestedOneWithoutUserInput
    verificationTokens?: VerificationTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSanctionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSanctionsInput, UserUncheckedCreateWithoutSanctionsInput>
  }

  export type UserUpsertWithoutSanctionsInput = {
    update: XOR<UserUpdateWithoutSanctionsInput, UserUncheckedUpdateWithoutSanctionsInput>
    create: XOR<UserCreateWithoutSanctionsInput, UserUncheckedCreateWithoutSanctionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSanctionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSanctionsInput, UserUncheckedUpdateWithoutSanctionsInput>
  }

  export type UserUpdateWithoutSanctionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUpdateManyWithoutVerifierNestedInput
    userInformation?: UserInformationUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSanctionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    isEmailedVerified?: BoolFieldUpdateOperationsInput | boolean
    isPhoneVerified?: BoolFieldUpdateOperationsInput | boolean
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    userInfoId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberIdentityVerification?: MemberIdentityVerificationUncheckedUpdateOneWithoutUserNestedInput
    corporateRegistration?: CorporateRegistrationUncheckedUpdateOneWithoutUserNestedInput
    verifiedMemberIdentities?: MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierNestedInput
    verifiedCorporateRegistrations?: CorporateRegistrationUncheckedUpdateManyWithoutVerifierNestedInput
    userInformation?: UserInformationUncheckedUpdateOneWithoutUserNestedInput
    socialAuths?: SocialAuthUncheckedUpdateOneWithoutUserNestedInput
    verificationTokens?: VerificationTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MemberIdentityVerificationCreateManyVerifierInput = {
    id?: string
    userId: string
    passportPhoto?: string | null
    selfiePhoto?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CorporateRegistrationCreateManyVerifierInput = {
    id?: string
    userId: string
    companyName?: string | null
    businessLicenseFile?: string | null
    verificationStatus?: $Enums.VerificationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SanctionCreateManyUserInput = {
    id?: string
    sanctionType: $Enums.SanctionType
    reason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
  }

  export type VerificationTokenCreateManyUserInput = {
    id?: string
    token: string
    type: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type MemberIdentityVerificationUpdateWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMemberIdentityVerificationNestedInput
  }

  export type MemberIdentityVerificationUncheckedUpdateWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberIdentityVerificationUncheckedUpdateManyWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    passportPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    selfiePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateRegistrationUpdateWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCorporateRegistrationNestedInput
  }

  export type CorporateRegistrationUncheckedUpdateWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateRegistrationUncheckedUpdateManyWithoutVerifierInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    businessLicenseFile?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanctionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sanctionType?: EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanctionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sanctionType?: EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SanctionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sanctionType?: EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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