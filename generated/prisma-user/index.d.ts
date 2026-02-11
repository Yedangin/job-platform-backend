
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
 * Model ProfileEducation
 * 
 */
export type ProfileEducation = $Result.DefaultSelection<Prisma.$ProfileEducationPayload>
/**
 * Model ProfileCareer
 * 
 */
export type ProfileCareer = $Result.DefaultSelection<Prisma.$ProfileCareerPayload>
/**
 * Model ProfileLanguage
 * 
 */
export type ProfileLanguage = $Result.DefaultSelection<Prisma.$ProfileLanguagePayload>
/**
 * Model SupportTicket
 * 
 */
export type SupportTicket = $Result.DefaultSelection<Prisma.$SupportTicketPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  INDIVIDUAL: 'INDIVIDUAL',
  CORPORATE: 'CORPORATE',
  ADMIN: 'ADMIN'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const SocialProvider: {
  NONE: 'NONE',
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


export const VerificationMethod: {
  CEO_MATCH: 'CEO_MATCH',
  CORP_EMAIL: 'CORP_EMAIL',
  DOCUMENT_MANUAL: 'DOCUMENT_MANUAL'
};

export type VerificationMethod = (typeof VerificationMethod)[keyof typeof VerificationMethod]


export const CompanySizeType: {
  SME: 'SME',
  MID: 'MID',
  LARGE: 'LARGE',
  STARTUP: 'STARTUP'
};

export type CompanySizeType = (typeof CompanySizeType)[keyof typeof CompanySizeType]


export const Gender: {
  M: 'M',
  F: 'F'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const DesiredJobType: {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERN: 'INTERN'
};

export type DesiredJobType = (typeof DesiredJobType)[keyof typeof DesiredJobType]


export const EducationLevel: {
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  COLLEGE: 'COLLEGE',
  BACHELOR: 'BACHELOR',
  MASTER: 'MASTER',
  DOCTOR: 'DOCTOR'
};

export type EducationLevel = (typeof EducationLevel)[keyof typeof EducationLevel]


export const KoreanFluencyLevel: {
  NONE: 'NONE',
  BASIC: 'BASIC',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  NATIVE: 'NATIVE'
};

export type KoreanFluencyLevel = (typeof KoreanFluencyLevel)[keyof typeof KoreanFluencyLevel]


export const GraduationStatus: {
  GRADUATED: 'GRADUATED',
  ATTENDING: 'ATTENDING',
  LEAVE: 'LEAVE',
  DROPOUT: 'DROPOUT'
};

export type GraduationStatus = (typeof GraduationStatus)[keyof typeof GraduationStatus]


export const TicketStatus: {
  OPEN: 'OPEN',
  ANSWERED: 'ANSWERED',
  CLOSED: 'CLOSED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type SocialProvider = $Enums.SocialProvider

export const SocialProvider: typeof $Enums.SocialProvider

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type VerificationMethod = $Enums.VerificationMethod

export const VerificationMethod: typeof $Enums.VerificationMethod

export type CompanySizeType = $Enums.CompanySizeType

export const CompanySizeType: typeof $Enums.CompanySizeType

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type DesiredJobType = $Enums.DesiredJobType

export const DesiredJobType: typeof $Enums.DesiredJobType

export type EducationLevel = $Enums.EducationLevel

export const EducationLevel: typeof $Enums.EducationLevel

export type KoreanFluencyLevel = $Enums.KoreanFluencyLevel

export const KoreanFluencyLevel: typeof $Enums.KoreanFluencyLevel

export type GraduationStatus = $Enums.GraduationStatus

export const GraduationStatus: typeof $Enums.GraduationStatus

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

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
   * `prisma.profileEducation`: Exposes CRUD operations for the **ProfileEducation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfileEducations
    * const profileEducations = await prisma.profileEducation.findMany()
    * ```
    */
  get profileEducation(): Prisma.ProfileEducationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profileCareer`: Exposes CRUD operations for the **ProfileCareer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfileCareers
    * const profileCareers = await prisma.profileCareer.findMany()
    * ```
    */
  get profileCareer(): Prisma.ProfileCareerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profileLanguage`: Exposes CRUD operations for the **ProfileLanguage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfileLanguages
    * const profileLanguages = await prisma.profileLanguage.findMany()
    * ```
    */
  get profileLanguage(): Prisma.ProfileLanguageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportTicket`: Exposes CRUD operations for the **SupportTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportTickets
    * const supportTickets = await prisma.supportTicket.findMany()
    * ```
    */
  get supportTicket(): Prisma.SupportTicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;
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
    ProfileEducation: 'ProfileEducation',
    ProfileCareer: 'ProfileCareer',
    ProfileLanguage: 'ProfileLanguage',
    SupportTicket: 'SupportTicket',
    ActivityLog: 'ActivityLog'
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
      modelProps: "user" | "corporateProfile" | "individualProfile" | "talentAccessLog" | "profileEducation" | "profileCareer" | "profileLanguage" | "supportTicket" | "activityLog"
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
      ProfileEducation: {
        payload: Prisma.$ProfileEducationPayload<ExtArgs>
        fields: Prisma.ProfileEducationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileEducationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileEducationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>
          }
          findFirst: {
            args: Prisma.ProfileEducationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileEducationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>
          }
          findMany: {
            args: Prisma.ProfileEducationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>[]
          }
          create: {
            args: Prisma.ProfileEducationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>
          }
          createMany: {
            args: Prisma.ProfileEducationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileEducationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>[]
          }
          delete: {
            args: Prisma.ProfileEducationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>
          }
          update: {
            args: Prisma.ProfileEducationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>
          }
          deleteMany: {
            args: Prisma.ProfileEducationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileEducationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileEducationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>[]
          }
          upsert: {
            args: Prisma.ProfileEducationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileEducationPayload>
          }
          aggregate: {
            args: Prisma.ProfileEducationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfileEducation>
          }
          groupBy: {
            args: Prisma.ProfileEducationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileEducationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileEducationCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileEducationCountAggregateOutputType> | number
          }
        }
      }
      ProfileCareer: {
        payload: Prisma.$ProfileCareerPayload<ExtArgs>
        fields: Prisma.ProfileCareerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileCareerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileCareerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>
          }
          findFirst: {
            args: Prisma.ProfileCareerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileCareerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>
          }
          findMany: {
            args: Prisma.ProfileCareerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>[]
          }
          create: {
            args: Prisma.ProfileCareerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>
          }
          createMany: {
            args: Prisma.ProfileCareerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCareerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>[]
          }
          delete: {
            args: Prisma.ProfileCareerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>
          }
          update: {
            args: Prisma.ProfileCareerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>
          }
          deleteMany: {
            args: Prisma.ProfileCareerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileCareerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileCareerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>[]
          }
          upsert: {
            args: Prisma.ProfileCareerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileCareerPayload>
          }
          aggregate: {
            args: Prisma.ProfileCareerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfileCareer>
          }
          groupBy: {
            args: Prisma.ProfileCareerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileCareerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCareerCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCareerCountAggregateOutputType> | number
          }
        }
      }
      ProfileLanguage: {
        payload: Prisma.$ProfileLanguagePayload<ExtArgs>
        fields: Prisma.ProfileLanguageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileLanguageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileLanguageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>
          }
          findFirst: {
            args: Prisma.ProfileLanguageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileLanguageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>
          }
          findMany: {
            args: Prisma.ProfileLanguageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>[]
          }
          create: {
            args: Prisma.ProfileLanguageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>
          }
          createMany: {
            args: Prisma.ProfileLanguageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileLanguageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>[]
          }
          delete: {
            args: Prisma.ProfileLanguageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>
          }
          update: {
            args: Prisma.ProfileLanguageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>
          }
          deleteMany: {
            args: Prisma.ProfileLanguageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileLanguageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileLanguageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>[]
          }
          upsert: {
            args: Prisma.ProfileLanguageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileLanguagePayload>
          }
          aggregate: {
            args: Prisma.ProfileLanguageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfileLanguage>
          }
          groupBy: {
            args: Prisma.ProfileLanguageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileLanguageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileLanguageCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileLanguageCountAggregateOutputType> | number
          }
        }
      }
      SupportTicket: {
        payload: Prisma.$SupportTicketPayload<ExtArgs>
        fields: Prisma.SupportTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findFirst: {
            args: Prisma.SupportTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findMany: {
            args: Prisma.SupportTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          create: {
            args: Prisma.SupportTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          createMany: {
            args: Prisma.SupportTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportTicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          delete: {
            args: Prisma.SupportTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          update: {
            args: Prisma.SupportTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          deleteMany: {
            args: Prisma.SupportTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupportTicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          upsert: {
            args: Prisma.SupportTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          aggregate: {
            args: Prisma.SupportTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportTicket>
          }
          groupBy: {
            args: Prisma.SupportTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportTicketCountArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
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
    profileEducation?: ProfileEducationOmit
    profileCareer?: ProfileCareerOmit
    profileLanguage?: ProfileLanguageOmit
    supportTicket?: SupportTicketOmit
    activityLog?: ActivityLogOmit
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
    supportTickets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supportTickets?: boolean | UserCountOutputTypeCountSupportTicketsArgs
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
  export type UserCountOutputTypeCountSupportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
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
    educations: number
    careers: number
    languages: number
  }

  export type IndividualProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessLogs?: boolean | IndividualProfileCountOutputTypeCountAccessLogsArgs
    educations?: boolean | IndividualProfileCountOutputTypeCountEducationsArgs
    careers?: boolean | IndividualProfileCountOutputTypeCountCareersArgs
    languages?: boolean | IndividualProfileCountOutputTypeCountLanguagesArgs
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
   * IndividualProfileCountOutputType without action
   */
  export type IndividualProfileCountOutputTypeCountEducationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileEducationWhereInput
  }

  /**
   * IndividualProfileCountOutputType without action
   */
  export type IndividualProfileCountOutputTypeCountCareersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileCareerWhereInput
  }

  /**
   * IndividualProfileCountOutputType without action
   */
  export type IndividualProfileCountOutputTypeCountLanguagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileLanguageWhereInput
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
    socialProvider: $Enums.SocialProvider | null
    socialProviderId: string | null
    userType: $Enums.UserType | null
    isActive: boolean | null
    joinedAt: Date | null
    lastLoginAt: Date | null
    deletedAt: Date | null
    deleteScheduledAt: Date | null
    notifSms: boolean | null
    notifEmail: boolean | null
    notifKakao: boolean | null
    notifEnabledAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    socialProvider: $Enums.SocialProvider | null
    socialProviderId: string | null
    userType: $Enums.UserType | null
    isActive: boolean | null
    joinedAt: Date | null
    lastLoginAt: Date | null
    deletedAt: Date | null
    deleteScheduledAt: Date | null
    notifSms: boolean | null
    notifEmail: boolean | null
    notifKakao: boolean | null
    notifEnabledAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    socialProvider: number
    socialProviderId: number
    userType: number
    isActive: number
    joinedAt: number
    lastLoginAt: number
    deletedAt: number
    deleteScheduledAt: number
    notifSms: number
    notifEmail: number
    notifKakao: number
    notifEnabledAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    socialProvider?: true
    socialProviderId?: true
    userType?: true
    isActive?: true
    joinedAt?: true
    lastLoginAt?: true
    deletedAt?: true
    deleteScheduledAt?: true
    notifSms?: true
    notifEmail?: true
    notifKakao?: true
    notifEnabledAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    socialProvider?: true
    socialProviderId?: true
    userType?: true
    isActive?: true
    joinedAt?: true
    lastLoginAt?: true
    deletedAt?: true
    deleteScheduledAt?: true
    notifSms?: true
    notifEmail?: true
    notifKakao?: true
    notifEnabledAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    socialProvider?: true
    socialProviderId?: true
    userType?: true
    isActive?: true
    joinedAt?: true
    lastLoginAt?: true
    deletedAt?: true
    deleteScheduledAt?: true
    notifSms?: true
    notifEmail?: true
    notifKakao?: true
    notifEnabledAt?: true
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
    email: string
    password: string | null
    socialProvider: $Enums.SocialProvider
    socialProviderId: string | null
    userType: $Enums.UserType
    isActive: boolean
    joinedAt: Date
    lastLoginAt: Date | null
    deletedAt: Date | null
    deleteScheduledAt: Date | null
    notifSms: boolean
    notifEmail: boolean
    notifKakao: boolean
    notifEnabledAt: Date | null
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
    socialProvider?: boolean
    socialProviderId?: boolean
    userType?: boolean
    isActive?: boolean
    joinedAt?: boolean
    lastLoginAt?: boolean
    deletedAt?: boolean
    deleteScheduledAt?: boolean
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: boolean
    corporate?: boolean | User$corporateArgs<ExtArgs>
    individual?: boolean | User$individualArgs<ExtArgs>
    supportTickets?: boolean | User$supportTicketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    socialProvider?: boolean
    socialProviderId?: boolean
    userType?: boolean
    isActive?: boolean
    joinedAt?: boolean
    lastLoginAt?: boolean
    deletedAt?: boolean
    deleteScheduledAt?: boolean
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    socialProvider?: boolean
    socialProviderId?: boolean
    userType?: boolean
    isActive?: boolean
    joinedAt?: boolean
    lastLoginAt?: boolean
    deletedAt?: boolean
    deleteScheduledAt?: boolean
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    socialProvider?: boolean
    socialProviderId?: boolean
    userType?: boolean
    isActive?: boolean
    joinedAt?: boolean
    lastLoginAt?: boolean
    deletedAt?: boolean
    deleteScheduledAt?: boolean
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "socialProvider" | "socialProviderId" | "userType" | "isActive" | "joinedAt" | "lastLoginAt" | "deletedAt" | "deleteScheduledAt" | "notifSms" | "notifEmail" | "notifKakao" | "notifEnabledAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    corporate?: boolean | User$corporateArgs<ExtArgs>
    individual?: boolean | User$individualArgs<ExtArgs>
    supportTickets?: boolean | User$supportTicketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      corporate: Prisma.$CorporateProfilePayload<ExtArgs> | null
      individual: Prisma.$IndividualProfilePayload<ExtArgs> | null
      supportTickets: Prisma.$SupportTicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      socialProvider: $Enums.SocialProvider
      socialProviderId: string | null
      userType: $Enums.UserType
      isActive: boolean
      joinedAt: Date
      lastLoginAt: Date | null
      deletedAt: Date | null
      deleteScheduledAt: Date | null
      notifSms: boolean
      notifEmail: boolean
      notifKakao: boolean
      notifEnabledAt: Date | null
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
    supportTickets<T extends User$supportTicketsArgs<ExtArgs> = {}>(args?: Subset<T, User$supportTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly socialProvider: FieldRef<"User", 'SocialProvider'>
    readonly socialProviderId: FieldRef<"User", 'String'>
    readonly userType: FieldRef<"User", 'UserType'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly joinedAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly deleteScheduledAt: FieldRef<"User", 'DateTime'>
    readonly notifSms: FieldRef<"User", 'Boolean'>
    readonly notifEmail: FieldRef<"User", 'Boolean'>
    readonly notifKakao: FieldRef<"User", 'Boolean'>
    readonly notifEnabledAt: FieldRef<"User", 'DateTime'>
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
   * User.supportTickets
   */
  export type User$supportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    cursor?: SupportTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
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
    employeeCountKorean: number | null
    employeeCountForeign: number | null
    annualRevenue: number | null
  }

  export type CorporateProfileSumAggregateOutputType = {
    companyId: bigint | null
    employeeCountKorean: number | null
    employeeCountForeign: number | null
    annualRevenue: bigint | null
  }

  export type CorporateProfileMinAggregateOutputType = {
    companyId: bigint | null
    authId: string | null
    bizRegNumber: string | null
    companyNameOfficial: string | null
    ceoName: string | null
    foundingDate: Date | null
    managerName: string | null
    managerPhone: string | null
    managerEmail: string | null
    verificationStatus: $Enums.VerificationStatus | null
    verificationMethod: $Enums.VerificationMethod | null
    proofDocumentUrl: string | null
    brandName: string | null
    logoImageUrl: string | null
    companyIntro: string | null
    ksicCode: string | null
    addressRoad: string | null
    companySizeType: $Enums.CompanySizeType | null
    employeeCountKorean: number | null
    employeeCountForeign: number | null
    annualRevenue: bigint | null
    isBizVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CorporateProfileMaxAggregateOutputType = {
    companyId: bigint | null
    authId: string | null
    bizRegNumber: string | null
    companyNameOfficial: string | null
    ceoName: string | null
    foundingDate: Date | null
    managerName: string | null
    managerPhone: string | null
    managerEmail: string | null
    verificationStatus: $Enums.VerificationStatus | null
    verificationMethod: $Enums.VerificationMethod | null
    proofDocumentUrl: string | null
    brandName: string | null
    logoImageUrl: string | null
    companyIntro: string | null
    ksicCode: string | null
    addressRoad: string | null
    companySizeType: $Enums.CompanySizeType | null
    employeeCountKorean: number | null
    employeeCountForeign: number | null
    annualRevenue: bigint | null
    isBizVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CorporateProfileCountAggregateOutputType = {
    companyId: number
    authId: number
    bizRegNumber: number
    companyNameOfficial: number
    ceoName: number
    foundingDate: number
    managerName: number
    managerPhone: number
    managerEmail: number
    verificationStatus: number
    verificationMethod: number
    proofDocumentUrl: number
    brandName: number
    logoImageUrl: number
    companyIntro: number
    ksicCode: number
    addressRoad: number
    companySizeType: number
    employeeCountKorean: number
    employeeCountForeign: number
    annualRevenue: number
    isBizVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CorporateProfileAvgAggregateInputType = {
    companyId?: true
    employeeCountKorean?: true
    employeeCountForeign?: true
    annualRevenue?: true
  }

  export type CorporateProfileSumAggregateInputType = {
    companyId?: true
    employeeCountKorean?: true
    employeeCountForeign?: true
    annualRevenue?: true
  }

  export type CorporateProfileMinAggregateInputType = {
    companyId?: true
    authId?: true
    bizRegNumber?: true
    companyNameOfficial?: true
    ceoName?: true
    foundingDate?: true
    managerName?: true
    managerPhone?: true
    managerEmail?: true
    verificationStatus?: true
    verificationMethod?: true
    proofDocumentUrl?: true
    brandName?: true
    logoImageUrl?: true
    companyIntro?: true
    ksicCode?: true
    addressRoad?: true
    companySizeType?: true
    employeeCountKorean?: true
    employeeCountForeign?: true
    annualRevenue?: true
    isBizVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CorporateProfileMaxAggregateInputType = {
    companyId?: true
    authId?: true
    bizRegNumber?: true
    companyNameOfficial?: true
    ceoName?: true
    foundingDate?: true
    managerName?: true
    managerPhone?: true
    managerEmail?: true
    verificationStatus?: true
    verificationMethod?: true
    proofDocumentUrl?: true
    brandName?: true
    logoImageUrl?: true
    companyIntro?: true
    ksicCode?: true
    addressRoad?: true
    companySizeType?: true
    employeeCountKorean?: true
    employeeCountForeign?: true
    annualRevenue?: true
    isBizVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CorporateProfileCountAggregateInputType = {
    companyId?: true
    authId?: true
    bizRegNumber?: true
    companyNameOfficial?: true
    ceoName?: true
    foundingDate?: true
    managerName?: true
    managerPhone?: true
    managerEmail?: true
    verificationStatus?: true
    verificationMethod?: true
    proofDocumentUrl?: true
    brandName?: true
    logoImageUrl?: true
    companyIntro?: true
    ksicCode?: true
    addressRoad?: true
    companySizeType?: true
    employeeCountKorean?: true
    employeeCountForeign?: true
    annualRevenue?: true
    isBizVerified?: true
    createdAt?: true
    updatedAt?: true
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
    authId: string
    bizRegNumber: string
    companyNameOfficial: string
    ceoName: string
    foundingDate: Date | null
    managerName: string
    managerPhone: string
    managerEmail: string
    verificationStatus: $Enums.VerificationStatus
    verificationMethod: $Enums.VerificationMethod | null
    proofDocumentUrl: string | null
    brandName: string | null
    logoImageUrl: string | null
    companyIntro: string | null
    ksicCode: string
    addressRoad: string
    companySizeType: $Enums.CompanySizeType
    employeeCountKorean: number
    employeeCountForeign: number
    annualRevenue: bigint
    isBizVerified: boolean
    createdAt: Date
    updatedAt: Date
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
    authId?: boolean
    bizRegNumber?: boolean
    companyNameOfficial?: boolean
    ceoName?: boolean
    foundingDate?: boolean
    managerName?: boolean
    managerPhone?: boolean
    managerEmail?: boolean
    verificationStatus?: boolean
    verificationMethod?: boolean
    proofDocumentUrl?: boolean
    brandName?: boolean
    logoImageUrl?: boolean
    companyIntro?: boolean
    ksicCode?: boolean
    addressRoad?: boolean
    companySizeType?: boolean
    employeeCountKorean?: boolean
    employeeCountForeign?: boolean
    annualRevenue?: boolean
    isBizVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    accessLogs?: boolean | CorporateProfile$accessLogsArgs<ExtArgs>
    _count?: boolean | CorporateProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corporateProfile"]>

  export type CorporateProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    companyId?: boolean
    authId?: boolean
    bizRegNumber?: boolean
    companyNameOfficial?: boolean
    ceoName?: boolean
    foundingDate?: boolean
    managerName?: boolean
    managerPhone?: boolean
    managerEmail?: boolean
    verificationStatus?: boolean
    verificationMethod?: boolean
    proofDocumentUrl?: boolean
    brandName?: boolean
    logoImageUrl?: boolean
    companyIntro?: boolean
    ksicCode?: boolean
    addressRoad?: boolean
    companySizeType?: boolean
    employeeCountKorean?: boolean
    employeeCountForeign?: boolean
    annualRevenue?: boolean
    isBizVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corporateProfile"]>

  export type CorporateProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    companyId?: boolean
    authId?: boolean
    bizRegNumber?: boolean
    companyNameOfficial?: boolean
    ceoName?: boolean
    foundingDate?: boolean
    managerName?: boolean
    managerPhone?: boolean
    managerEmail?: boolean
    verificationStatus?: boolean
    verificationMethod?: boolean
    proofDocumentUrl?: boolean
    brandName?: boolean
    logoImageUrl?: boolean
    companyIntro?: boolean
    ksicCode?: boolean
    addressRoad?: boolean
    companySizeType?: boolean
    employeeCountKorean?: boolean
    employeeCountForeign?: boolean
    annualRevenue?: boolean
    isBizVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["corporateProfile"]>

  export type CorporateProfileSelectScalar = {
    companyId?: boolean
    authId?: boolean
    bizRegNumber?: boolean
    companyNameOfficial?: boolean
    ceoName?: boolean
    foundingDate?: boolean
    managerName?: boolean
    managerPhone?: boolean
    managerEmail?: boolean
    verificationStatus?: boolean
    verificationMethod?: boolean
    proofDocumentUrl?: boolean
    brandName?: boolean
    logoImageUrl?: boolean
    companyIntro?: boolean
    ksicCode?: boolean
    addressRoad?: boolean
    companySizeType?: boolean
    employeeCountKorean?: boolean
    employeeCountForeign?: boolean
    annualRevenue?: boolean
    isBizVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CorporateProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"companyId" | "authId" | "bizRegNumber" | "companyNameOfficial" | "ceoName" | "foundingDate" | "managerName" | "managerPhone" | "managerEmail" | "verificationStatus" | "verificationMethod" | "proofDocumentUrl" | "brandName" | "logoImageUrl" | "companyIntro" | "ksicCode" | "addressRoad" | "companySizeType" | "employeeCountKorean" | "employeeCountForeign" | "annualRevenue" | "isBizVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["corporateProfile"]>
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
      authId: string
      bizRegNumber: string
      companyNameOfficial: string
      ceoName: string
      foundingDate: Date | null
      managerName: string
      managerPhone: string
      managerEmail: string
      verificationStatus: $Enums.VerificationStatus
      verificationMethod: $Enums.VerificationMethod | null
      proofDocumentUrl: string | null
      brandName: string | null
      logoImageUrl: string | null
      companyIntro: string | null
      ksicCode: string
      addressRoad: string
      companySizeType: $Enums.CompanySizeType
      employeeCountKorean: number
      employeeCountForeign: number
      annualRevenue: bigint
      isBizVerified: boolean
      createdAt: Date
      updatedAt: Date
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
    readonly authId: FieldRef<"CorporateProfile", 'String'>
    readonly bizRegNumber: FieldRef<"CorporateProfile", 'String'>
    readonly companyNameOfficial: FieldRef<"CorporateProfile", 'String'>
    readonly ceoName: FieldRef<"CorporateProfile", 'String'>
    readonly foundingDate: FieldRef<"CorporateProfile", 'DateTime'>
    readonly managerName: FieldRef<"CorporateProfile", 'String'>
    readonly managerPhone: FieldRef<"CorporateProfile", 'String'>
    readonly managerEmail: FieldRef<"CorporateProfile", 'String'>
    readonly verificationStatus: FieldRef<"CorporateProfile", 'VerificationStatus'>
    readonly verificationMethod: FieldRef<"CorporateProfile", 'VerificationMethod'>
    readonly proofDocumentUrl: FieldRef<"CorporateProfile", 'String'>
    readonly brandName: FieldRef<"CorporateProfile", 'String'>
    readonly logoImageUrl: FieldRef<"CorporateProfile", 'String'>
    readonly companyIntro: FieldRef<"CorporateProfile", 'String'>
    readonly ksicCode: FieldRef<"CorporateProfile", 'String'>
    readonly addressRoad: FieldRef<"CorporateProfile", 'String'>
    readonly companySizeType: FieldRef<"CorporateProfile", 'CompanySizeType'>
    readonly employeeCountKorean: FieldRef<"CorporateProfile", 'Int'>
    readonly employeeCountForeign: FieldRef<"CorporateProfile", 'Int'>
    readonly annualRevenue: FieldRef<"CorporateProfile", 'BigInt'>
    readonly isBizVerified: FieldRef<"CorporateProfile", 'Boolean'>
    readonly createdAt: FieldRef<"CorporateProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"CorporateProfile", 'DateTime'>
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
    desiredSalary: number | null
    totalCareerMonths: number | null
  }

  export type IndividualProfileSumAggregateOutputType = {
    individualId: bigint | null
    desiredSalary: number | null
    totalCareerMonths: number | null
  }

  export type IndividualProfileMinAggregateOutputType = {
    individualId: bigint | null
    authId: string | null
    realName: string | null
    nationality: string | null
    birthDate: Date | null
    gender: $Enums.Gender | null
    addressRoad: string | null
    visaType: string | null
    visaExpiryDate: Date | null
    desiredJobType: $Enums.DesiredJobType | null
    desiredSalary: number | null
    desiredIndustries: string | null
    isOpenToScout: boolean | null
    finalEducationLvl: $Enums.EducationLevel | null
    koreanFluencyLvl: $Enums.KoreanFluencyLevel | null
    totalCareerMonths: number | null
    profileImageUrl: string | null
    resumeFileUrl: string | null
    portfolioUrl: string | null
    selfIntro: string | null
    isProfileCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IndividualProfileMaxAggregateOutputType = {
    individualId: bigint | null
    authId: string | null
    realName: string | null
    nationality: string | null
    birthDate: Date | null
    gender: $Enums.Gender | null
    addressRoad: string | null
    visaType: string | null
    visaExpiryDate: Date | null
    desiredJobType: $Enums.DesiredJobType | null
    desiredSalary: number | null
    desiredIndustries: string | null
    isOpenToScout: boolean | null
    finalEducationLvl: $Enums.EducationLevel | null
    koreanFluencyLvl: $Enums.KoreanFluencyLevel | null
    totalCareerMonths: number | null
    profileImageUrl: string | null
    resumeFileUrl: string | null
    portfolioUrl: string | null
    selfIntro: string | null
    isProfileCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IndividualProfileCountAggregateOutputType = {
    individualId: number
    authId: number
    realName: number
    nationality: number
    birthDate: number
    gender: number
    addressRoad: number
    visaType: number
    visaExpiryDate: number
    desiredJobType: number
    desiredSalary: number
    desiredIndustries: number
    isOpenToScout: number
    finalEducationLvl: number
    koreanFluencyLvl: number
    totalCareerMonths: number
    profileImageUrl: number
    resumeFileUrl: number
    portfolioUrl: number
    selfIntro: number
    isProfileCompleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IndividualProfileAvgAggregateInputType = {
    individualId?: true
    desiredSalary?: true
    totalCareerMonths?: true
  }

  export type IndividualProfileSumAggregateInputType = {
    individualId?: true
    desiredSalary?: true
    totalCareerMonths?: true
  }

  export type IndividualProfileMinAggregateInputType = {
    individualId?: true
    authId?: true
    realName?: true
    nationality?: true
    birthDate?: true
    gender?: true
    addressRoad?: true
    visaType?: true
    visaExpiryDate?: true
    desiredJobType?: true
    desiredSalary?: true
    desiredIndustries?: true
    isOpenToScout?: true
    finalEducationLvl?: true
    koreanFluencyLvl?: true
    totalCareerMonths?: true
    profileImageUrl?: true
    resumeFileUrl?: true
    portfolioUrl?: true
    selfIntro?: true
    isProfileCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IndividualProfileMaxAggregateInputType = {
    individualId?: true
    authId?: true
    realName?: true
    nationality?: true
    birthDate?: true
    gender?: true
    addressRoad?: true
    visaType?: true
    visaExpiryDate?: true
    desiredJobType?: true
    desiredSalary?: true
    desiredIndustries?: true
    isOpenToScout?: true
    finalEducationLvl?: true
    koreanFluencyLvl?: true
    totalCareerMonths?: true
    profileImageUrl?: true
    resumeFileUrl?: true
    portfolioUrl?: true
    selfIntro?: true
    isProfileCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IndividualProfileCountAggregateInputType = {
    individualId?: true
    authId?: true
    realName?: true
    nationality?: true
    birthDate?: true
    gender?: true
    addressRoad?: true
    visaType?: true
    visaExpiryDate?: true
    desiredJobType?: true
    desiredSalary?: true
    desiredIndustries?: true
    isOpenToScout?: true
    finalEducationLvl?: true
    koreanFluencyLvl?: true
    totalCareerMonths?: true
    profileImageUrl?: true
    resumeFileUrl?: true
    portfolioUrl?: true
    selfIntro?: true
    isProfileCompleted?: true
    createdAt?: true
    updatedAt?: true
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
    authId: string
    realName: string
    nationality: string
    birthDate: Date
    gender: $Enums.Gender
    addressRoad: string | null
    visaType: string
    visaExpiryDate: Date
    desiredJobType: $Enums.DesiredJobType
    desiredSalary: number
    desiredIndustries: string | null
    isOpenToScout: boolean
    finalEducationLvl: $Enums.EducationLevel | null
    koreanFluencyLvl: $Enums.KoreanFluencyLevel | null
    totalCareerMonths: number
    profileImageUrl: string | null
    resumeFileUrl: string | null
    portfolioUrl: string | null
    selfIntro: string | null
    isProfileCompleted: boolean
    createdAt: Date
    updatedAt: Date
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
    authId?: boolean
    realName?: boolean
    nationality?: boolean
    birthDate?: boolean
    gender?: boolean
    addressRoad?: boolean
    visaType?: boolean
    visaExpiryDate?: boolean
    desiredJobType?: boolean
    desiredSalary?: boolean
    desiredIndustries?: boolean
    isOpenToScout?: boolean
    finalEducationLvl?: boolean
    koreanFluencyLvl?: boolean
    totalCareerMonths?: boolean
    profileImageUrl?: boolean
    resumeFileUrl?: boolean
    portfolioUrl?: boolean
    selfIntro?: boolean
    isProfileCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    accessLogs?: boolean | IndividualProfile$accessLogsArgs<ExtArgs>
    educations?: boolean | IndividualProfile$educationsArgs<ExtArgs>
    careers?: boolean | IndividualProfile$careersArgs<ExtArgs>
    languages?: boolean | IndividualProfile$languagesArgs<ExtArgs>
    _count?: boolean | IndividualProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["individualProfile"]>

  export type IndividualProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    individualId?: boolean
    authId?: boolean
    realName?: boolean
    nationality?: boolean
    birthDate?: boolean
    gender?: boolean
    addressRoad?: boolean
    visaType?: boolean
    visaExpiryDate?: boolean
    desiredJobType?: boolean
    desiredSalary?: boolean
    desiredIndustries?: boolean
    isOpenToScout?: boolean
    finalEducationLvl?: boolean
    koreanFluencyLvl?: boolean
    totalCareerMonths?: boolean
    profileImageUrl?: boolean
    resumeFileUrl?: boolean
    portfolioUrl?: boolean
    selfIntro?: boolean
    isProfileCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["individualProfile"]>

  export type IndividualProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    individualId?: boolean
    authId?: boolean
    realName?: boolean
    nationality?: boolean
    birthDate?: boolean
    gender?: boolean
    addressRoad?: boolean
    visaType?: boolean
    visaExpiryDate?: boolean
    desiredJobType?: boolean
    desiredSalary?: boolean
    desiredIndustries?: boolean
    isOpenToScout?: boolean
    finalEducationLvl?: boolean
    koreanFluencyLvl?: boolean
    totalCareerMonths?: boolean
    profileImageUrl?: boolean
    resumeFileUrl?: boolean
    portfolioUrl?: boolean
    selfIntro?: boolean
    isProfileCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["individualProfile"]>

  export type IndividualProfileSelectScalar = {
    individualId?: boolean
    authId?: boolean
    realName?: boolean
    nationality?: boolean
    birthDate?: boolean
    gender?: boolean
    addressRoad?: boolean
    visaType?: boolean
    visaExpiryDate?: boolean
    desiredJobType?: boolean
    desiredSalary?: boolean
    desiredIndustries?: boolean
    isOpenToScout?: boolean
    finalEducationLvl?: boolean
    koreanFluencyLvl?: boolean
    totalCareerMonths?: boolean
    profileImageUrl?: boolean
    resumeFileUrl?: boolean
    portfolioUrl?: boolean
    selfIntro?: boolean
    isProfileCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IndividualProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"individualId" | "authId" | "realName" | "nationality" | "birthDate" | "gender" | "addressRoad" | "visaType" | "visaExpiryDate" | "desiredJobType" | "desiredSalary" | "desiredIndustries" | "isOpenToScout" | "finalEducationLvl" | "koreanFluencyLvl" | "totalCareerMonths" | "profileImageUrl" | "resumeFileUrl" | "portfolioUrl" | "selfIntro" | "isProfileCompleted" | "createdAt" | "updatedAt", ExtArgs["result"]["individualProfile"]>
  export type IndividualProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    accessLogs?: boolean | IndividualProfile$accessLogsArgs<ExtArgs>
    educations?: boolean | IndividualProfile$educationsArgs<ExtArgs>
    careers?: boolean | IndividualProfile$careersArgs<ExtArgs>
    languages?: boolean | IndividualProfile$languagesArgs<ExtArgs>
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
      educations: Prisma.$ProfileEducationPayload<ExtArgs>[]
      careers: Prisma.$ProfileCareerPayload<ExtArgs>[]
      languages: Prisma.$ProfileLanguagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      individualId: bigint
      authId: string
      realName: string
      nationality: string
      birthDate: Date
      gender: $Enums.Gender
      addressRoad: string | null
      visaType: string
      visaExpiryDate: Date
      desiredJobType: $Enums.DesiredJobType
      desiredSalary: number
      desiredIndustries: string | null
      isOpenToScout: boolean
      finalEducationLvl: $Enums.EducationLevel | null
      koreanFluencyLvl: $Enums.KoreanFluencyLevel | null
      totalCareerMonths: number
      profileImageUrl: string | null
      resumeFileUrl: string | null
      portfolioUrl: string | null
      selfIntro: string | null
      isProfileCompleted: boolean
      createdAt: Date
      updatedAt: Date
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
    educations<T extends IndividualProfile$educationsArgs<ExtArgs> = {}>(args?: Subset<T, IndividualProfile$educationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    careers<T extends IndividualProfile$careersArgs<ExtArgs> = {}>(args?: Subset<T, IndividualProfile$careersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    languages<T extends IndividualProfile$languagesArgs<ExtArgs> = {}>(args?: Subset<T, IndividualProfile$languagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly authId: FieldRef<"IndividualProfile", 'String'>
    readonly realName: FieldRef<"IndividualProfile", 'String'>
    readonly nationality: FieldRef<"IndividualProfile", 'String'>
    readonly birthDate: FieldRef<"IndividualProfile", 'DateTime'>
    readonly gender: FieldRef<"IndividualProfile", 'Gender'>
    readonly addressRoad: FieldRef<"IndividualProfile", 'String'>
    readonly visaType: FieldRef<"IndividualProfile", 'String'>
    readonly visaExpiryDate: FieldRef<"IndividualProfile", 'DateTime'>
    readonly desiredJobType: FieldRef<"IndividualProfile", 'DesiredJobType'>
    readonly desiredSalary: FieldRef<"IndividualProfile", 'Int'>
    readonly desiredIndustries: FieldRef<"IndividualProfile", 'String'>
    readonly isOpenToScout: FieldRef<"IndividualProfile", 'Boolean'>
    readonly finalEducationLvl: FieldRef<"IndividualProfile", 'EducationLevel'>
    readonly koreanFluencyLvl: FieldRef<"IndividualProfile", 'KoreanFluencyLevel'>
    readonly totalCareerMonths: FieldRef<"IndividualProfile", 'Int'>
    readonly profileImageUrl: FieldRef<"IndividualProfile", 'String'>
    readonly resumeFileUrl: FieldRef<"IndividualProfile", 'String'>
    readonly portfolioUrl: FieldRef<"IndividualProfile", 'String'>
    readonly selfIntro: FieldRef<"IndividualProfile", 'String'>
    readonly isProfileCompleted: FieldRef<"IndividualProfile", 'Boolean'>
    readonly createdAt: FieldRef<"IndividualProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"IndividualProfile", 'DateTime'>
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
   * IndividualProfile.educations
   */
  export type IndividualProfile$educationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    where?: ProfileEducationWhereInput
    orderBy?: ProfileEducationOrderByWithRelationInput | ProfileEducationOrderByWithRelationInput[]
    cursor?: ProfileEducationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileEducationScalarFieldEnum | ProfileEducationScalarFieldEnum[]
  }

  /**
   * IndividualProfile.careers
   */
  export type IndividualProfile$careersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    where?: ProfileCareerWhereInput
    orderBy?: ProfileCareerOrderByWithRelationInput | ProfileCareerOrderByWithRelationInput[]
    cursor?: ProfileCareerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileCareerScalarFieldEnum | ProfileCareerScalarFieldEnum[]
  }

  /**
   * IndividualProfile.languages
   */
  export type IndividualProfile$languagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    where?: ProfileLanguageWhereInput
    orderBy?: ProfileLanguageOrderByWithRelationInput | ProfileLanguageOrderByWithRelationInput[]
    cursor?: ProfileLanguageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileLanguageScalarFieldEnum | ProfileLanguageScalarFieldEnum[]
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
   * Model ProfileEducation
   */

  export type AggregateProfileEducation = {
    _count: ProfileEducationCountAggregateOutputType | null
    _avg: ProfileEducationAvgAggregateOutputType | null
    _sum: ProfileEducationSumAggregateOutputType | null
    _min: ProfileEducationMinAggregateOutputType | null
    _max: ProfileEducationMaxAggregateOutputType | null
  }

  export type ProfileEducationAvgAggregateOutputType = {
    eduId: number | null
    individualId: number | null
    gpaScore: Decimal | null
  }

  export type ProfileEducationSumAggregateOutputType = {
    eduId: bigint | null
    individualId: bigint | null
    gpaScore: Decimal | null
  }

  export type ProfileEducationMinAggregateOutputType = {
    eduId: bigint | null
    individualId: bigint | null
    schoolName: string | null
    majorName: string | null
    degreeLevel: $Enums.EducationLevel | null
    startDate: Date | null
    graduationDate: Date | null
    graduationStatus: $Enums.GraduationStatus | null
    gpaScore: Decimal | null
  }

  export type ProfileEducationMaxAggregateOutputType = {
    eduId: bigint | null
    individualId: bigint | null
    schoolName: string | null
    majorName: string | null
    degreeLevel: $Enums.EducationLevel | null
    startDate: Date | null
    graduationDate: Date | null
    graduationStatus: $Enums.GraduationStatus | null
    gpaScore: Decimal | null
  }

  export type ProfileEducationCountAggregateOutputType = {
    eduId: number
    individualId: number
    schoolName: number
    majorName: number
    degreeLevel: number
    startDate: number
    graduationDate: number
    graduationStatus: number
    gpaScore: number
    _all: number
  }


  export type ProfileEducationAvgAggregateInputType = {
    eduId?: true
    individualId?: true
    gpaScore?: true
  }

  export type ProfileEducationSumAggregateInputType = {
    eduId?: true
    individualId?: true
    gpaScore?: true
  }

  export type ProfileEducationMinAggregateInputType = {
    eduId?: true
    individualId?: true
    schoolName?: true
    majorName?: true
    degreeLevel?: true
    startDate?: true
    graduationDate?: true
    graduationStatus?: true
    gpaScore?: true
  }

  export type ProfileEducationMaxAggregateInputType = {
    eduId?: true
    individualId?: true
    schoolName?: true
    majorName?: true
    degreeLevel?: true
    startDate?: true
    graduationDate?: true
    graduationStatus?: true
    gpaScore?: true
  }

  export type ProfileEducationCountAggregateInputType = {
    eduId?: true
    individualId?: true
    schoolName?: true
    majorName?: true
    degreeLevel?: true
    startDate?: true
    graduationDate?: true
    graduationStatus?: true
    gpaScore?: true
    _all?: true
  }

  export type ProfileEducationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileEducation to aggregate.
     */
    where?: ProfileEducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileEducations to fetch.
     */
    orderBy?: ProfileEducationOrderByWithRelationInput | ProfileEducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileEducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileEducations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileEducations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfileEducations
    **/
    _count?: true | ProfileEducationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileEducationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileEducationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileEducationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileEducationMaxAggregateInputType
  }

  export type GetProfileEducationAggregateType<T extends ProfileEducationAggregateArgs> = {
        [P in keyof T & keyof AggregateProfileEducation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfileEducation[P]>
      : GetScalarType<T[P], AggregateProfileEducation[P]>
  }




  export type ProfileEducationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileEducationWhereInput
    orderBy?: ProfileEducationOrderByWithAggregationInput | ProfileEducationOrderByWithAggregationInput[]
    by: ProfileEducationScalarFieldEnum[] | ProfileEducationScalarFieldEnum
    having?: ProfileEducationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileEducationCountAggregateInputType | true
    _avg?: ProfileEducationAvgAggregateInputType
    _sum?: ProfileEducationSumAggregateInputType
    _min?: ProfileEducationMinAggregateInputType
    _max?: ProfileEducationMaxAggregateInputType
  }

  export type ProfileEducationGroupByOutputType = {
    eduId: bigint
    individualId: bigint
    schoolName: string
    majorName: string
    degreeLevel: $Enums.EducationLevel
    startDate: Date
    graduationDate: Date | null
    graduationStatus: $Enums.GraduationStatus
    gpaScore: Decimal | null
    _count: ProfileEducationCountAggregateOutputType | null
    _avg: ProfileEducationAvgAggregateOutputType | null
    _sum: ProfileEducationSumAggregateOutputType | null
    _min: ProfileEducationMinAggregateOutputType | null
    _max: ProfileEducationMaxAggregateOutputType | null
  }

  type GetProfileEducationGroupByPayload<T extends ProfileEducationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileEducationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileEducationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileEducationGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileEducationGroupByOutputType[P]>
        }
      >
    >


  export type ProfileEducationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eduId?: boolean
    individualId?: boolean
    schoolName?: boolean
    majorName?: boolean
    degreeLevel?: boolean
    startDate?: boolean
    graduationDate?: boolean
    graduationStatus?: boolean
    gpaScore?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileEducation"]>

  export type ProfileEducationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eduId?: boolean
    individualId?: boolean
    schoolName?: boolean
    majorName?: boolean
    degreeLevel?: boolean
    startDate?: boolean
    graduationDate?: boolean
    graduationStatus?: boolean
    gpaScore?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileEducation"]>

  export type ProfileEducationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eduId?: boolean
    individualId?: boolean
    schoolName?: boolean
    majorName?: boolean
    degreeLevel?: boolean
    startDate?: boolean
    graduationDate?: boolean
    graduationStatus?: boolean
    gpaScore?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileEducation"]>

  export type ProfileEducationSelectScalar = {
    eduId?: boolean
    individualId?: boolean
    schoolName?: boolean
    majorName?: boolean
    degreeLevel?: boolean
    startDate?: boolean
    graduationDate?: boolean
    graduationStatus?: boolean
    gpaScore?: boolean
  }

  export type ProfileEducationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eduId" | "individualId" | "schoolName" | "majorName" | "degreeLevel" | "startDate" | "graduationDate" | "graduationStatus" | "gpaScore", ExtArgs["result"]["profileEducation"]>
  export type ProfileEducationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }
  export type ProfileEducationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }
  export type ProfileEducationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }

  export type $ProfileEducationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfileEducation"
    objects: {
      individual: Prisma.$IndividualProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      eduId: bigint
      individualId: bigint
      schoolName: string
      majorName: string
      degreeLevel: $Enums.EducationLevel
      startDate: Date
      graduationDate: Date | null
      graduationStatus: $Enums.GraduationStatus
      gpaScore: Prisma.Decimal | null
    }, ExtArgs["result"]["profileEducation"]>
    composites: {}
  }

  type ProfileEducationGetPayload<S extends boolean | null | undefined | ProfileEducationDefaultArgs> = $Result.GetResult<Prisma.$ProfileEducationPayload, S>

  type ProfileEducationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileEducationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileEducationCountAggregateInputType | true
    }

  export interface ProfileEducationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfileEducation'], meta: { name: 'ProfileEducation' } }
    /**
     * Find zero or one ProfileEducation that matches the filter.
     * @param {ProfileEducationFindUniqueArgs} args - Arguments to find a ProfileEducation
     * @example
     * // Get one ProfileEducation
     * const profileEducation = await prisma.profileEducation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileEducationFindUniqueArgs>(args: SelectSubset<T, ProfileEducationFindUniqueArgs<ExtArgs>>): Prisma__ProfileEducationClient<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfileEducation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileEducationFindUniqueOrThrowArgs} args - Arguments to find a ProfileEducation
     * @example
     * // Get one ProfileEducation
     * const profileEducation = await prisma.profileEducation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileEducationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileEducationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileEducationClient<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileEducation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileEducationFindFirstArgs} args - Arguments to find a ProfileEducation
     * @example
     * // Get one ProfileEducation
     * const profileEducation = await prisma.profileEducation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileEducationFindFirstArgs>(args?: SelectSubset<T, ProfileEducationFindFirstArgs<ExtArgs>>): Prisma__ProfileEducationClient<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileEducation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileEducationFindFirstOrThrowArgs} args - Arguments to find a ProfileEducation
     * @example
     * // Get one ProfileEducation
     * const profileEducation = await prisma.profileEducation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileEducationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileEducationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileEducationClient<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfileEducations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileEducationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfileEducations
     * const profileEducations = await prisma.profileEducation.findMany()
     * 
     * // Get first 10 ProfileEducations
     * const profileEducations = await prisma.profileEducation.findMany({ take: 10 })
     * 
     * // Only select the `eduId`
     * const profileEducationWithEduIdOnly = await prisma.profileEducation.findMany({ select: { eduId: true } })
     * 
     */
    findMany<T extends ProfileEducationFindManyArgs>(args?: SelectSubset<T, ProfileEducationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfileEducation.
     * @param {ProfileEducationCreateArgs} args - Arguments to create a ProfileEducation.
     * @example
     * // Create one ProfileEducation
     * const ProfileEducation = await prisma.profileEducation.create({
     *   data: {
     *     // ... data to create a ProfileEducation
     *   }
     * })
     * 
     */
    create<T extends ProfileEducationCreateArgs>(args: SelectSubset<T, ProfileEducationCreateArgs<ExtArgs>>): Prisma__ProfileEducationClient<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfileEducations.
     * @param {ProfileEducationCreateManyArgs} args - Arguments to create many ProfileEducations.
     * @example
     * // Create many ProfileEducations
     * const profileEducation = await prisma.profileEducation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileEducationCreateManyArgs>(args?: SelectSubset<T, ProfileEducationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfileEducations and returns the data saved in the database.
     * @param {ProfileEducationCreateManyAndReturnArgs} args - Arguments to create many ProfileEducations.
     * @example
     * // Create many ProfileEducations
     * const profileEducation = await prisma.profileEducation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfileEducations and only return the `eduId`
     * const profileEducationWithEduIdOnly = await prisma.profileEducation.createManyAndReturn({
     *   select: { eduId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileEducationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileEducationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfileEducation.
     * @param {ProfileEducationDeleteArgs} args - Arguments to delete one ProfileEducation.
     * @example
     * // Delete one ProfileEducation
     * const ProfileEducation = await prisma.profileEducation.delete({
     *   where: {
     *     // ... filter to delete one ProfileEducation
     *   }
     * })
     * 
     */
    delete<T extends ProfileEducationDeleteArgs>(args: SelectSubset<T, ProfileEducationDeleteArgs<ExtArgs>>): Prisma__ProfileEducationClient<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfileEducation.
     * @param {ProfileEducationUpdateArgs} args - Arguments to update one ProfileEducation.
     * @example
     * // Update one ProfileEducation
     * const profileEducation = await prisma.profileEducation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileEducationUpdateArgs>(args: SelectSubset<T, ProfileEducationUpdateArgs<ExtArgs>>): Prisma__ProfileEducationClient<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfileEducations.
     * @param {ProfileEducationDeleteManyArgs} args - Arguments to filter ProfileEducations to delete.
     * @example
     * // Delete a few ProfileEducations
     * const { count } = await prisma.profileEducation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileEducationDeleteManyArgs>(args?: SelectSubset<T, ProfileEducationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileEducations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileEducationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfileEducations
     * const profileEducation = await prisma.profileEducation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileEducationUpdateManyArgs>(args: SelectSubset<T, ProfileEducationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileEducations and returns the data updated in the database.
     * @param {ProfileEducationUpdateManyAndReturnArgs} args - Arguments to update many ProfileEducations.
     * @example
     * // Update many ProfileEducations
     * const profileEducation = await prisma.profileEducation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfileEducations and only return the `eduId`
     * const profileEducationWithEduIdOnly = await prisma.profileEducation.updateManyAndReturn({
     *   select: { eduId: true },
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
    updateManyAndReturn<T extends ProfileEducationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileEducationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfileEducation.
     * @param {ProfileEducationUpsertArgs} args - Arguments to update or create a ProfileEducation.
     * @example
     * // Update or create a ProfileEducation
     * const profileEducation = await prisma.profileEducation.upsert({
     *   create: {
     *     // ... data to create a ProfileEducation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfileEducation we want to update
     *   }
     * })
     */
    upsert<T extends ProfileEducationUpsertArgs>(args: SelectSubset<T, ProfileEducationUpsertArgs<ExtArgs>>): Prisma__ProfileEducationClient<$Result.GetResult<Prisma.$ProfileEducationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfileEducations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileEducationCountArgs} args - Arguments to filter ProfileEducations to count.
     * @example
     * // Count the number of ProfileEducations
     * const count = await prisma.profileEducation.count({
     *   where: {
     *     // ... the filter for the ProfileEducations we want to count
     *   }
     * })
    **/
    count<T extends ProfileEducationCountArgs>(
      args?: Subset<T, ProfileEducationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileEducationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfileEducation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileEducationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfileEducationAggregateArgs>(args: Subset<T, ProfileEducationAggregateArgs>): Prisma.PrismaPromise<GetProfileEducationAggregateType<T>>

    /**
     * Group by ProfileEducation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileEducationGroupByArgs} args - Group by arguments.
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
      T extends ProfileEducationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileEducationGroupByArgs['orderBy'] }
        : { orderBy?: ProfileEducationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfileEducationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileEducationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfileEducation model
   */
  readonly fields: ProfileEducationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfileEducation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileEducationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ProfileEducation model
   */
  interface ProfileEducationFieldRefs {
    readonly eduId: FieldRef<"ProfileEducation", 'BigInt'>
    readonly individualId: FieldRef<"ProfileEducation", 'BigInt'>
    readonly schoolName: FieldRef<"ProfileEducation", 'String'>
    readonly majorName: FieldRef<"ProfileEducation", 'String'>
    readonly degreeLevel: FieldRef<"ProfileEducation", 'EducationLevel'>
    readonly startDate: FieldRef<"ProfileEducation", 'DateTime'>
    readonly graduationDate: FieldRef<"ProfileEducation", 'DateTime'>
    readonly graduationStatus: FieldRef<"ProfileEducation", 'GraduationStatus'>
    readonly gpaScore: FieldRef<"ProfileEducation", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * ProfileEducation findUnique
   */
  export type ProfileEducationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * Filter, which ProfileEducation to fetch.
     */
    where: ProfileEducationWhereUniqueInput
  }

  /**
   * ProfileEducation findUniqueOrThrow
   */
  export type ProfileEducationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * Filter, which ProfileEducation to fetch.
     */
    where: ProfileEducationWhereUniqueInput
  }

  /**
   * ProfileEducation findFirst
   */
  export type ProfileEducationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * Filter, which ProfileEducation to fetch.
     */
    where?: ProfileEducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileEducations to fetch.
     */
    orderBy?: ProfileEducationOrderByWithRelationInput | ProfileEducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileEducations.
     */
    cursor?: ProfileEducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileEducations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileEducations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileEducations.
     */
    distinct?: ProfileEducationScalarFieldEnum | ProfileEducationScalarFieldEnum[]
  }

  /**
   * ProfileEducation findFirstOrThrow
   */
  export type ProfileEducationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * Filter, which ProfileEducation to fetch.
     */
    where?: ProfileEducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileEducations to fetch.
     */
    orderBy?: ProfileEducationOrderByWithRelationInput | ProfileEducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileEducations.
     */
    cursor?: ProfileEducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileEducations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileEducations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileEducations.
     */
    distinct?: ProfileEducationScalarFieldEnum | ProfileEducationScalarFieldEnum[]
  }

  /**
   * ProfileEducation findMany
   */
  export type ProfileEducationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * Filter, which ProfileEducations to fetch.
     */
    where?: ProfileEducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileEducations to fetch.
     */
    orderBy?: ProfileEducationOrderByWithRelationInput | ProfileEducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfileEducations.
     */
    cursor?: ProfileEducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileEducations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileEducations.
     */
    skip?: number
    distinct?: ProfileEducationScalarFieldEnum | ProfileEducationScalarFieldEnum[]
  }

  /**
   * ProfileEducation create
   */
  export type ProfileEducationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfileEducation.
     */
    data: XOR<ProfileEducationCreateInput, ProfileEducationUncheckedCreateInput>
  }

  /**
   * ProfileEducation createMany
   */
  export type ProfileEducationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfileEducations.
     */
    data: ProfileEducationCreateManyInput | ProfileEducationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfileEducation createManyAndReturn
   */
  export type ProfileEducationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * The data used to create many ProfileEducations.
     */
    data: ProfileEducationCreateManyInput | ProfileEducationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfileEducation update
   */
  export type ProfileEducationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfileEducation.
     */
    data: XOR<ProfileEducationUpdateInput, ProfileEducationUncheckedUpdateInput>
    /**
     * Choose, which ProfileEducation to update.
     */
    where: ProfileEducationWhereUniqueInput
  }

  /**
   * ProfileEducation updateMany
   */
  export type ProfileEducationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfileEducations.
     */
    data: XOR<ProfileEducationUpdateManyMutationInput, ProfileEducationUncheckedUpdateManyInput>
    /**
     * Filter which ProfileEducations to update
     */
    where?: ProfileEducationWhereInput
    /**
     * Limit how many ProfileEducations to update.
     */
    limit?: number
  }

  /**
   * ProfileEducation updateManyAndReturn
   */
  export type ProfileEducationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * The data used to update ProfileEducations.
     */
    data: XOR<ProfileEducationUpdateManyMutationInput, ProfileEducationUncheckedUpdateManyInput>
    /**
     * Filter which ProfileEducations to update
     */
    where?: ProfileEducationWhereInput
    /**
     * Limit how many ProfileEducations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfileEducation upsert
   */
  export type ProfileEducationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfileEducation to update in case it exists.
     */
    where: ProfileEducationWhereUniqueInput
    /**
     * In case the ProfileEducation found by the `where` argument doesn't exist, create a new ProfileEducation with this data.
     */
    create: XOR<ProfileEducationCreateInput, ProfileEducationUncheckedCreateInput>
    /**
     * In case the ProfileEducation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileEducationUpdateInput, ProfileEducationUncheckedUpdateInput>
  }

  /**
   * ProfileEducation delete
   */
  export type ProfileEducationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
    /**
     * Filter which ProfileEducation to delete.
     */
    where: ProfileEducationWhereUniqueInput
  }

  /**
   * ProfileEducation deleteMany
   */
  export type ProfileEducationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileEducations to delete
     */
    where?: ProfileEducationWhereInput
    /**
     * Limit how many ProfileEducations to delete.
     */
    limit?: number
  }

  /**
   * ProfileEducation without action
   */
  export type ProfileEducationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileEducation
     */
    select?: ProfileEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileEducation
     */
    omit?: ProfileEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileEducationInclude<ExtArgs> | null
  }


  /**
   * Model ProfileCareer
   */

  export type AggregateProfileCareer = {
    _count: ProfileCareerCountAggregateOutputType | null
    _avg: ProfileCareerAvgAggregateOutputType | null
    _sum: ProfileCareerSumAggregateOutputType | null
    _min: ProfileCareerMinAggregateOutputType | null
    _max: ProfileCareerMaxAggregateOutputType | null
  }

  export type ProfileCareerAvgAggregateOutputType = {
    careerId: number | null
    individualId: number | null
  }

  export type ProfileCareerSumAggregateOutputType = {
    careerId: bigint | null
    individualId: bigint | null
  }

  export type ProfileCareerMinAggregateOutputType = {
    careerId: bigint | null
    individualId: bigint | null
    companyName: string | null
    dutyRole: string | null
    jobPosition: string | null
    startDate: Date | null
    endDate: Date | null
    isCurrent: boolean | null
    description: string | null
  }

  export type ProfileCareerMaxAggregateOutputType = {
    careerId: bigint | null
    individualId: bigint | null
    companyName: string | null
    dutyRole: string | null
    jobPosition: string | null
    startDate: Date | null
    endDate: Date | null
    isCurrent: boolean | null
    description: string | null
  }

  export type ProfileCareerCountAggregateOutputType = {
    careerId: number
    individualId: number
    companyName: number
    dutyRole: number
    jobPosition: number
    startDate: number
    endDate: number
    isCurrent: number
    description: number
    _all: number
  }


  export type ProfileCareerAvgAggregateInputType = {
    careerId?: true
    individualId?: true
  }

  export type ProfileCareerSumAggregateInputType = {
    careerId?: true
    individualId?: true
  }

  export type ProfileCareerMinAggregateInputType = {
    careerId?: true
    individualId?: true
    companyName?: true
    dutyRole?: true
    jobPosition?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    description?: true
  }

  export type ProfileCareerMaxAggregateInputType = {
    careerId?: true
    individualId?: true
    companyName?: true
    dutyRole?: true
    jobPosition?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    description?: true
  }

  export type ProfileCareerCountAggregateInputType = {
    careerId?: true
    individualId?: true
    companyName?: true
    dutyRole?: true
    jobPosition?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    description?: true
    _all?: true
  }

  export type ProfileCareerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileCareer to aggregate.
     */
    where?: ProfileCareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileCareers to fetch.
     */
    orderBy?: ProfileCareerOrderByWithRelationInput | ProfileCareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileCareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileCareers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileCareers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfileCareers
    **/
    _count?: true | ProfileCareerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileCareerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileCareerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileCareerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileCareerMaxAggregateInputType
  }

  export type GetProfileCareerAggregateType<T extends ProfileCareerAggregateArgs> = {
        [P in keyof T & keyof AggregateProfileCareer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfileCareer[P]>
      : GetScalarType<T[P], AggregateProfileCareer[P]>
  }




  export type ProfileCareerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileCareerWhereInput
    orderBy?: ProfileCareerOrderByWithAggregationInput | ProfileCareerOrderByWithAggregationInput[]
    by: ProfileCareerScalarFieldEnum[] | ProfileCareerScalarFieldEnum
    having?: ProfileCareerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCareerCountAggregateInputType | true
    _avg?: ProfileCareerAvgAggregateInputType
    _sum?: ProfileCareerSumAggregateInputType
    _min?: ProfileCareerMinAggregateInputType
    _max?: ProfileCareerMaxAggregateInputType
  }

  export type ProfileCareerGroupByOutputType = {
    careerId: bigint
    individualId: bigint
    companyName: string
    dutyRole: string
    jobPosition: string | null
    startDate: Date
    endDate: Date | null
    isCurrent: boolean
    description: string | null
    _count: ProfileCareerCountAggregateOutputType | null
    _avg: ProfileCareerAvgAggregateOutputType | null
    _sum: ProfileCareerSumAggregateOutputType | null
    _min: ProfileCareerMinAggregateOutputType | null
    _max: ProfileCareerMaxAggregateOutputType | null
  }

  type GetProfileCareerGroupByPayload<T extends ProfileCareerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileCareerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileCareerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileCareerGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileCareerGroupByOutputType[P]>
        }
      >
    >


  export type ProfileCareerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    careerId?: boolean
    individualId?: boolean
    companyName?: boolean
    dutyRole?: boolean
    jobPosition?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    description?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileCareer"]>

  export type ProfileCareerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    careerId?: boolean
    individualId?: boolean
    companyName?: boolean
    dutyRole?: boolean
    jobPosition?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    description?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileCareer"]>

  export type ProfileCareerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    careerId?: boolean
    individualId?: boolean
    companyName?: boolean
    dutyRole?: boolean
    jobPosition?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    description?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileCareer"]>

  export type ProfileCareerSelectScalar = {
    careerId?: boolean
    individualId?: boolean
    companyName?: boolean
    dutyRole?: boolean
    jobPosition?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    description?: boolean
  }

  export type ProfileCareerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"careerId" | "individualId" | "companyName" | "dutyRole" | "jobPosition" | "startDate" | "endDate" | "isCurrent" | "description", ExtArgs["result"]["profileCareer"]>
  export type ProfileCareerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }
  export type ProfileCareerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }
  export type ProfileCareerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }

  export type $ProfileCareerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfileCareer"
    objects: {
      individual: Prisma.$IndividualProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      careerId: bigint
      individualId: bigint
      companyName: string
      dutyRole: string
      jobPosition: string | null
      startDate: Date
      endDate: Date | null
      isCurrent: boolean
      description: string | null
    }, ExtArgs["result"]["profileCareer"]>
    composites: {}
  }

  type ProfileCareerGetPayload<S extends boolean | null | undefined | ProfileCareerDefaultArgs> = $Result.GetResult<Prisma.$ProfileCareerPayload, S>

  type ProfileCareerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileCareerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCareerCountAggregateInputType | true
    }

  export interface ProfileCareerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfileCareer'], meta: { name: 'ProfileCareer' } }
    /**
     * Find zero or one ProfileCareer that matches the filter.
     * @param {ProfileCareerFindUniqueArgs} args - Arguments to find a ProfileCareer
     * @example
     * // Get one ProfileCareer
     * const profileCareer = await prisma.profileCareer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileCareerFindUniqueArgs>(args: SelectSubset<T, ProfileCareerFindUniqueArgs<ExtArgs>>): Prisma__ProfileCareerClient<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfileCareer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileCareerFindUniqueOrThrowArgs} args - Arguments to find a ProfileCareer
     * @example
     * // Get one ProfileCareer
     * const profileCareer = await prisma.profileCareer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileCareerFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileCareerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileCareerClient<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileCareer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCareerFindFirstArgs} args - Arguments to find a ProfileCareer
     * @example
     * // Get one ProfileCareer
     * const profileCareer = await prisma.profileCareer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileCareerFindFirstArgs>(args?: SelectSubset<T, ProfileCareerFindFirstArgs<ExtArgs>>): Prisma__ProfileCareerClient<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileCareer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCareerFindFirstOrThrowArgs} args - Arguments to find a ProfileCareer
     * @example
     * // Get one ProfileCareer
     * const profileCareer = await prisma.profileCareer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileCareerFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileCareerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileCareerClient<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfileCareers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCareerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfileCareers
     * const profileCareers = await prisma.profileCareer.findMany()
     * 
     * // Get first 10 ProfileCareers
     * const profileCareers = await prisma.profileCareer.findMany({ take: 10 })
     * 
     * // Only select the `careerId`
     * const profileCareerWithCareerIdOnly = await prisma.profileCareer.findMany({ select: { careerId: true } })
     * 
     */
    findMany<T extends ProfileCareerFindManyArgs>(args?: SelectSubset<T, ProfileCareerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfileCareer.
     * @param {ProfileCareerCreateArgs} args - Arguments to create a ProfileCareer.
     * @example
     * // Create one ProfileCareer
     * const ProfileCareer = await prisma.profileCareer.create({
     *   data: {
     *     // ... data to create a ProfileCareer
     *   }
     * })
     * 
     */
    create<T extends ProfileCareerCreateArgs>(args: SelectSubset<T, ProfileCareerCreateArgs<ExtArgs>>): Prisma__ProfileCareerClient<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfileCareers.
     * @param {ProfileCareerCreateManyArgs} args - Arguments to create many ProfileCareers.
     * @example
     * // Create many ProfileCareers
     * const profileCareer = await prisma.profileCareer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCareerCreateManyArgs>(args?: SelectSubset<T, ProfileCareerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfileCareers and returns the data saved in the database.
     * @param {ProfileCareerCreateManyAndReturnArgs} args - Arguments to create many ProfileCareers.
     * @example
     * // Create many ProfileCareers
     * const profileCareer = await prisma.profileCareer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfileCareers and only return the `careerId`
     * const profileCareerWithCareerIdOnly = await prisma.profileCareer.createManyAndReturn({
     *   select: { careerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCareerCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCareerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfileCareer.
     * @param {ProfileCareerDeleteArgs} args - Arguments to delete one ProfileCareer.
     * @example
     * // Delete one ProfileCareer
     * const ProfileCareer = await prisma.profileCareer.delete({
     *   where: {
     *     // ... filter to delete one ProfileCareer
     *   }
     * })
     * 
     */
    delete<T extends ProfileCareerDeleteArgs>(args: SelectSubset<T, ProfileCareerDeleteArgs<ExtArgs>>): Prisma__ProfileCareerClient<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfileCareer.
     * @param {ProfileCareerUpdateArgs} args - Arguments to update one ProfileCareer.
     * @example
     * // Update one ProfileCareer
     * const profileCareer = await prisma.profileCareer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileCareerUpdateArgs>(args: SelectSubset<T, ProfileCareerUpdateArgs<ExtArgs>>): Prisma__ProfileCareerClient<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfileCareers.
     * @param {ProfileCareerDeleteManyArgs} args - Arguments to filter ProfileCareers to delete.
     * @example
     * // Delete a few ProfileCareers
     * const { count } = await prisma.profileCareer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileCareerDeleteManyArgs>(args?: SelectSubset<T, ProfileCareerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileCareers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCareerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfileCareers
     * const profileCareer = await prisma.profileCareer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileCareerUpdateManyArgs>(args: SelectSubset<T, ProfileCareerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileCareers and returns the data updated in the database.
     * @param {ProfileCareerUpdateManyAndReturnArgs} args - Arguments to update many ProfileCareers.
     * @example
     * // Update many ProfileCareers
     * const profileCareer = await prisma.profileCareer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfileCareers and only return the `careerId`
     * const profileCareerWithCareerIdOnly = await prisma.profileCareer.updateManyAndReturn({
     *   select: { careerId: true },
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
    updateManyAndReturn<T extends ProfileCareerUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileCareerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfileCareer.
     * @param {ProfileCareerUpsertArgs} args - Arguments to update or create a ProfileCareer.
     * @example
     * // Update or create a ProfileCareer
     * const profileCareer = await prisma.profileCareer.upsert({
     *   create: {
     *     // ... data to create a ProfileCareer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfileCareer we want to update
     *   }
     * })
     */
    upsert<T extends ProfileCareerUpsertArgs>(args: SelectSubset<T, ProfileCareerUpsertArgs<ExtArgs>>): Prisma__ProfileCareerClient<$Result.GetResult<Prisma.$ProfileCareerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfileCareers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCareerCountArgs} args - Arguments to filter ProfileCareers to count.
     * @example
     * // Count the number of ProfileCareers
     * const count = await prisma.profileCareer.count({
     *   where: {
     *     // ... the filter for the ProfileCareers we want to count
     *   }
     * })
    **/
    count<T extends ProfileCareerCountArgs>(
      args?: Subset<T, ProfileCareerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCareerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfileCareer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCareerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfileCareerAggregateArgs>(args: Subset<T, ProfileCareerAggregateArgs>): Prisma.PrismaPromise<GetProfileCareerAggregateType<T>>

    /**
     * Group by ProfileCareer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCareerGroupByArgs} args - Group by arguments.
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
      T extends ProfileCareerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileCareerGroupByArgs['orderBy'] }
        : { orderBy?: ProfileCareerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfileCareerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileCareerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfileCareer model
   */
  readonly fields: ProfileCareerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfileCareer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileCareerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ProfileCareer model
   */
  interface ProfileCareerFieldRefs {
    readonly careerId: FieldRef<"ProfileCareer", 'BigInt'>
    readonly individualId: FieldRef<"ProfileCareer", 'BigInt'>
    readonly companyName: FieldRef<"ProfileCareer", 'String'>
    readonly dutyRole: FieldRef<"ProfileCareer", 'String'>
    readonly jobPosition: FieldRef<"ProfileCareer", 'String'>
    readonly startDate: FieldRef<"ProfileCareer", 'DateTime'>
    readonly endDate: FieldRef<"ProfileCareer", 'DateTime'>
    readonly isCurrent: FieldRef<"ProfileCareer", 'Boolean'>
    readonly description: FieldRef<"ProfileCareer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProfileCareer findUnique
   */
  export type ProfileCareerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * Filter, which ProfileCareer to fetch.
     */
    where: ProfileCareerWhereUniqueInput
  }

  /**
   * ProfileCareer findUniqueOrThrow
   */
  export type ProfileCareerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * Filter, which ProfileCareer to fetch.
     */
    where: ProfileCareerWhereUniqueInput
  }

  /**
   * ProfileCareer findFirst
   */
  export type ProfileCareerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * Filter, which ProfileCareer to fetch.
     */
    where?: ProfileCareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileCareers to fetch.
     */
    orderBy?: ProfileCareerOrderByWithRelationInput | ProfileCareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileCareers.
     */
    cursor?: ProfileCareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileCareers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileCareers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileCareers.
     */
    distinct?: ProfileCareerScalarFieldEnum | ProfileCareerScalarFieldEnum[]
  }

  /**
   * ProfileCareer findFirstOrThrow
   */
  export type ProfileCareerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * Filter, which ProfileCareer to fetch.
     */
    where?: ProfileCareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileCareers to fetch.
     */
    orderBy?: ProfileCareerOrderByWithRelationInput | ProfileCareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileCareers.
     */
    cursor?: ProfileCareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileCareers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileCareers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileCareers.
     */
    distinct?: ProfileCareerScalarFieldEnum | ProfileCareerScalarFieldEnum[]
  }

  /**
   * ProfileCareer findMany
   */
  export type ProfileCareerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * Filter, which ProfileCareers to fetch.
     */
    where?: ProfileCareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileCareers to fetch.
     */
    orderBy?: ProfileCareerOrderByWithRelationInput | ProfileCareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfileCareers.
     */
    cursor?: ProfileCareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileCareers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileCareers.
     */
    skip?: number
    distinct?: ProfileCareerScalarFieldEnum | ProfileCareerScalarFieldEnum[]
  }

  /**
   * ProfileCareer create
   */
  export type ProfileCareerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfileCareer.
     */
    data: XOR<ProfileCareerCreateInput, ProfileCareerUncheckedCreateInput>
  }

  /**
   * ProfileCareer createMany
   */
  export type ProfileCareerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfileCareers.
     */
    data: ProfileCareerCreateManyInput | ProfileCareerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfileCareer createManyAndReturn
   */
  export type ProfileCareerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * The data used to create many ProfileCareers.
     */
    data: ProfileCareerCreateManyInput | ProfileCareerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfileCareer update
   */
  export type ProfileCareerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfileCareer.
     */
    data: XOR<ProfileCareerUpdateInput, ProfileCareerUncheckedUpdateInput>
    /**
     * Choose, which ProfileCareer to update.
     */
    where: ProfileCareerWhereUniqueInput
  }

  /**
   * ProfileCareer updateMany
   */
  export type ProfileCareerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfileCareers.
     */
    data: XOR<ProfileCareerUpdateManyMutationInput, ProfileCareerUncheckedUpdateManyInput>
    /**
     * Filter which ProfileCareers to update
     */
    where?: ProfileCareerWhereInput
    /**
     * Limit how many ProfileCareers to update.
     */
    limit?: number
  }

  /**
   * ProfileCareer updateManyAndReturn
   */
  export type ProfileCareerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * The data used to update ProfileCareers.
     */
    data: XOR<ProfileCareerUpdateManyMutationInput, ProfileCareerUncheckedUpdateManyInput>
    /**
     * Filter which ProfileCareers to update
     */
    where?: ProfileCareerWhereInput
    /**
     * Limit how many ProfileCareers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfileCareer upsert
   */
  export type ProfileCareerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfileCareer to update in case it exists.
     */
    where: ProfileCareerWhereUniqueInput
    /**
     * In case the ProfileCareer found by the `where` argument doesn't exist, create a new ProfileCareer with this data.
     */
    create: XOR<ProfileCareerCreateInput, ProfileCareerUncheckedCreateInput>
    /**
     * In case the ProfileCareer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileCareerUpdateInput, ProfileCareerUncheckedUpdateInput>
  }

  /**
   * ProfileCareer delete
   */
  export type ProfileCareerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
    /**
     * Filter which ProfileCareer to delete.
     */
    where: ProfileCareerWhereUniqueInput
  }

  /**
   * ProfileCareer deleteMany
   */
  export type ProfileCareerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileCareers to delete
     */
    where?: ProfileCareerWhereInput
    /**
     * Limit how many ProfileCareers to delete.
     */
    limit?: number
  }

  /**
   * ProfileCareer without action
   */
  export type ProfileCareerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCareer
     */
    select?: ProfileCareerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileCareer
     */
    omit?: ProfileCareerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileCareerInclude<ExtArgs> | null
  }


  /**
   * Model ProfileLanguage
   */

  export type AggregateProfileLanguage = {
    _count: ProfileLanguageCountAggregateOutputType | null
    _avg: ProfileLanguageAvgAggregateOutputType | null
    _sum: ProfileLanguageSumAggregateOutputType | null
    _min: ProfileLanguageMinAggregateOutputType | null
    _max: ProfileLanguageMaxAggregateOutputType | null
  }

  export type ProfileLanguageAvgAggregateOutputType = {
    langId: number | null
    individualId: number | null
  }

  export type ProfileLanguageSumAggregateOutputType = {
    langId: bigint | null
    individualId: bigint | null
  }

  export type ProfileLanguageMinAggregateOutputType = {
    langId: bigint | null
    individualId: bigint | null
    languageType: string | null
    testType: string | null
    scoreLevel: string | null
    obtainedDate: Date | null
    expiryDate: Date | null
    isVerified: boolean | null
  }

  export type ProfileLanguageMaxAggregateOutputType = {
    langId: bigint | null
    individualId: bigint | null
    languageType: string | null
    testType: string | null
    scoreLevel: string | null
    obtainedDate: Date | null
    expiryDate: Date | null
    isVerified: boolean | null
  }

  export type ProfileLanguageCountAggregateOutputType = {
    langId: number
    individualId: number
    languageType: number
    testType: number
    scoreLevel: number
    obtainedDate: number
    expiryDate: number
    isVerified: number
    _all: number
  }


  export type ProfileLanguageAvgAggregateInputType = {
    langId?: true
    individualId?: true
  }

  export type ProfileLanguageSumAggregateInputType = {
    langId?: true
    individualId?: true
  }

  export type ProfileLanguageMinAggregateInputType = {
    langId?: true
    individualId?: true
    languageType?: true
    testType?: true
    scoreLevel?: true
    obtainedDate?: true
    expiryDate?: true
    isVerified?: true
  }

  export type ProfileLanguageMaxAggregateInputType = {
    langId?: true
    individualId?: true
    languageType?: true
    testType?: true
    scoreLevel?: true
    obtainedDate?: true
    expiryDate?: true
    isVerified?: true
  }

  export type ProfileLanguageCountAggregateInputType = {
    langId?: true
    individualId?: true
    languageType?: true
    testType?: true
    scoreLevel?: true
    obtainedDate?: true
    expiryDate?: true
    isVerified?: true
    _all?: true
  }

  export type ProfileLanguageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileLanguage to aggregate.
     */
    where?: ProfileLanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileLanguages to fetch.
     */
    orderBy?: ProfileLanguageOrderByWithRelationInput | ProfileLanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileLanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileLanguages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileLanguages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfileLanguages
    **/
    _count?: true | ProfileLanguageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileLanguageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileLanguageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileLanguageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileLanguageMaxAggregateInputType
  }

  export type GetProfileLanguageAggregateType<T extends ProfileLanguageAggregateArgs> = {
        [P in keyof T & keyof AggregateProfileLanguage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfileLanguage[P]>
      : GetScalarType<T[P], AggregateProfileLanguage[P]>
  }




  export type ProfileLanguageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileLanguageWhereInput
    orderBy?: ProfileLanguageOrderByWithAggregationInput | ProfileLanguageOrderByWithAggregationInput[]
    by: ProfileLanguageScalarFieldEnum[] | ProfileLanguageScalarFieldEnum
    having?: ProfileLanguageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileLanguageCountAggregateInputType | true
    _avg?: ProfileLanguageAvgAggregateInputType
    _sum?: ProfileLanguageSumAggregateInputType
    _min?: ProfileLanguageMinAggregateInputType
    _max?: ProfileLanguageMaxAggregateInputType
  }

  export type ProfileLanguageGroupByOutputType = {
    langId: bigint
    individualId: bigint
    languageType: string
    testType: string | null
    scoreLevel: string
    obtainedDate: Date | null
    expiryDate: Date | null
    isVerified: boolean
    _count: ProfileLanguageCountAggregateOutputType | null
    _avg: ProfileLanguageAvgAggregateOutputType | null
    _sum: ProfileLanguageSumAggregateOutputType | null
    _min: ProfileLanguageMinAggregateOutputType | null
    _max: ProfileLanguageMaxAggregateOutputType | null
  }

  type GetProfileLanguageGroupByPayload<T extends ProfileLanguageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileLanguageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileLanguageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileLanguageGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileLanguageGroupByOutputType[P]>
        }
      >
    >


  export type ProfileLanguageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    langId?: boolean
    individualId?: boolean
    languageType?: boolean
    testType?: boolean
    scoreLevel?: boolean
    obtainedDate?: boolean
    expiryDate?: boolean
    isVerified?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileLanguage"]>

  export type ProfileLanguageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    langId?: boolean
    individualId?: boolean
    languageType?: boolean
    testType?: boolean
    scoreLevel?: boolean
    obtainedDate?: boolean
    expiryDate?: boolean
    isVerified?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileLanguage"]>

  export type ProfileLanguageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    langId?: boolean
    individualId?: boolean
    languageType?: boolean
    testType?: boolean
    scoreLevel?: boolean
    obtainedDate?: boolean
    expiryDate?: boolean
    isVerified?: boolean
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileLanguage"]>

  export type ProfileLanguageSelectScalar = {
    langId?: boolean
    individualId?: boolean
    languageType?: boolean
    testType?: boolean
    scoreLevel?: boolean
    obtainedDate?: boolean
    expiryDate?: boolean
    isVerified?: boolean
  }

  export type ProfileLanguageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"langId" | "individualId" | "languageType" | "testType" | "scoreLevel" | "obtainedDate" | "expiryDate" | "isVerified", ExtArgs["result"]["profileLanguage"]>
  export type ProfileLanguageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }
  export type ProfileLanguageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }
  export type ProfileLanguageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    individual?: boolean | IndividualProfileDefaultArgs<ExtArgs>
  }

  export type $ProfileLanguagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfileLanguage"
    objects: {
      individual: Prisma.$IndividualProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      langId: bigint
      individualId: bigint
      languageType: string
      testType: string | null
      scoreLevel: string
      obtainedDate: Date | null
      expiryDate: Date | null
      isVerified: boolean
    }, ExtArgs["result"]["profileLanguage"]>
    composites: {}
  }

  type ProfileLanguageGetPayload<S extends boolean | null | undefined | ProfileLanguageDefaultArgs> = $Result.GetResult<Prisma.$ProfileLanguagePayload, S>

  type ProfileLanguageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileLanguageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileLanguageCountAggregateInputType | true
    }

  export interface ProfileLanguageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfileLanguage'], meta: { name: 'ProfileLanguage' } }
    /**
     * Find zero or one ProfileLanguage that matches the filter.
     * @param {ProfileLanguageFindUniqueArgs} args - Arguments to find a ProfileLanguage
     * @example
     * // Get one ProfileLanguage
     * const profileLanguage = await prisma.profileLanguage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileLanguageFindUniqueArgs>(args: SelectSubset<T, ProfileLanguageFindUniqueArgs<ExtArgs>>): Prisma__ProfileLanguageClient<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfileLanguage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileLanguageFindUniqueOrThrowArgs} args - Arguments to find a ProfileLanguage
     * @example
     * // Get one ProfileLanguage
     * const profileLanguage = await prisma.profileLanguage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileLanguageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileLanguageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileLanguageClient<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileLanguage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileLanguageFindFirstArgs} args - Arguments to find a ProfileLanguage
     * @example
     * // Get one ProfileLanguage
     * const profileLanguage = await prisma.profileLanguage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileLanguageFindFirstArgs>(args?: SelectSubset<T, ProfileLanguageFindFirstArgs<ExtArgs>>): Prisma__ProfileLanguageClient<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileLanguage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileLanguageFindFirstOrThrowArgs} args - Arguments to find a ProfileLanguage
     * @example
     * // Get one ProfileLanguage
     * const profileLanguage = await prisma.profileLanguage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileLanguageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileLanguageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileLanguageClient<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfileLanguages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileLanguageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfileLanguages
     * const profileLanguages = await prisma.profileLanguage.findMany()
     * 
     * // Get first 10 ProfileLanguages
     * const profileLanguages = await prisma.profileLanguage.findMany({ take: 10 })
     * 
     * // Only select the `langId`
     * const profileLanguageWithLangIdOnly = await prisma.profileLanguage.findMany({ select: { langId: true } })
     * 
     */
    findMany<T extends ProfileLanguageFindManyArgs>(args?: SelectSubset<T, ProfileLanguageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfileLanguage.
     * @param {ProfileLanguageCreateArgs} args - Arguments to create a ProfileLanguage.
     * @example
     * // Create one ProfileLanguage
     * const ProfileLanguage = await prisma.profileLanguage.create({
     *   data: {
     *     // ... data to create a ProfileLanguage
     *   }
     * })
     * 
     */
    create<T extends ProfileLanguageCreateArgs>(args: SelectSubset<T, ProfileLanguageCreateArgs<ExtArgs>>): Prisma__ProfileLanguageClient<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfileLanguages.
     * @param {ProfileLanguageCreateManyArgs} args - Arguments to create many ProfileLanguages.
     * @example
     * // Create many ProfileLanguages
     * const profileLanguage = await prisma.profileLanguage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileLanguageCreateManyArgs>(args?: SelectSubset<T, ProfileLanguageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfileLanguages and returns the data saved in the database.
     * @param {ProfileLanguageCreateManyAndReturnArgs} args - Arguments to create many ProfileLanguages.
     * @example
     * // Create many ProfileLanguages
     * const profileLanguage = await prisma.profileLanguage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfileLanguages and only return the `langId`
     * const profileLanguageWithLangIdOnly = await prisma.profileLanguage.createManyAndReturn({
     *   select: { langId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileLanguageCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileLanguageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfileLanguage.
     * @param {ProfileLanguageDeleteArgs} args - Arguments to delete one ProfileLanguage.
     * @example
     * // Delete one ProfileLanguage
     * const ProfileLanguage = await prisma.profileLanguage.delete({
     *   where: {
     *     // ... filter to delete one ProfileLanguage
     *   }
     * })
     * 
     */
    delete<T extends ProfileLanguageDeleteArgs>(args: SelectSubset<T, ProfileLanguageDeleteArgs<ExtArgs>>): Prisma__ProfileLanguageClient<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfileLanguage.
     * @param {ProfileLanguageUpdateArgs} args - Arguments to update one ProfileLanguage.
     * @example
     * // Update one ProfileLanguage
     * const profileLanguage = await prisma.profileLanguage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileLanguageUpdateArgs>(args: SelectSubset<T, ProfileLanguageUpdateArgs<ExtArgs>>): Prisma__ProfileLanguageClient<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfileLanguages.
     * @param {ProfileLanguageDeleteManyArgs} args - Arguments to filter ProfileLanguages to delete.
     * @example
     * // Delete a few ProfileLanguages
     * const { count } = await prisma.profileLanguage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileLanguageDeleteManyArgs>(args?: SelectSubset<T, ProfileLanguageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileLanguages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileLanguageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfileLanguages
     * const profileLanguage = await prisma.profileLanguage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileLanguageUpdateManyArgs>(args: SelectSubset<T, ProfileLanguageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileLanguages and returns the data updated in the database.
     * @param {ProfileLanguageUpdateManyAndReturnArgs} args - Arguments to update many ProfileLanguages.
     * @example
     * // Update many ProfileLanguages
     * const profileLanguage = await prisma.profileLanguage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfileLanguages and only return the `langId`
     * const profileLanguageWithLangIdOnly = await prisma.profileLanguage.updateManyAndReturn({
     *   select: { langId: true },
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
    updateManyAndReturn<T extends ProfileLanguageUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileLanguageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfileLanguage.
     * @param {ProfileLanguageUpsertArgs} args - Arguments to update or create a ProfileLanguage.
     * @example
     * // Update or create a ProfileLanguage
     * const profileLanguage = await prisma.profileLanguage.upsert({
     *   create: {
     *     // ... data to create a ProfileLanguage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfileLanguage we want to update
     *   }
     * })
     */
    upsert<T extends ProfileLanguageUpsertArgs>(args: SelectSubset<T, ProfileLanguageUpsertArgs<ExtArgs>>): Prisma__ProfileLanguageClient<$Result.GetResult<Prisma.$ProfileLanguagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfileLanguages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileLanguageCountArgs} args - Arguments to filter ProfileLanguages to count.
     * @example
     * // Count the number of ProfileLanguages
     * const count = await prisma.profileLanguage.count({
     *   where: {
     *     // ... the filter for the ProfileLanguages we want to count
     *   }
     * })
    **/
    count<T extends ProfileLanguageCountArgs>(
      args?: Subset<T, ProfileLanguageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileLanguageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfileLanguage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileLanguageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfileLanguageAggregateArgs>(args: Subset<T, ProfileLanguageAggregateArgs>): Prisma.PrismaPromise<GetProfileLanguageAggregateType<T>>

    /**
     * Group by ProfileLanguage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileLanguageGroupByArgs} args - Group by arguments.
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
      T extends ProfileLanguageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileLanguageGroupByArgs['orderBy'] }
        : { orderBy?: ProfileLanguageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfileLanguageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileLanguageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfileLanguage model
   */
  readonly fields: ProfileLanguageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfileLanguage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileLanguageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ProfileLanguage model
   */
  interface ProfileLanguageFieldRefs {
    readonly langId: FieldRef<"ProfileLanguage", 'BigInt'>
    readonly individualId: FieldRef<"ProfileLanguage", 'BigInt'>
    readonly languageType: FieldRef<"ProfileLanguage", 'String'>
    readonly testType: FieldRef<"ProfileLanguage", 'String'>
    readonly scoreLevel: FieldRef<"ProfileLanguage", 'String'>
    readonly obtainedDate: FieldRef<"ProfileLanguage", 'DateTime'>
    readonly expiryDate: FieldRef<"ProfileLanguage", 'DateTime'>
    readonly isVerified: FieldRef<"ProfileLanguage", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProfileLanguage findUnique
   */
  export type ProfileLanguageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * Filter, which ProfileLanguage to fetch.
     */
    where: ProfileLanguageWhereUniqueInput
  }

  /**
   * ProfileLanguage findUniqueOrThrow
   */
  export type ProfileLanguageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * Filter, which ProfileLanguage to fetch.
     */
    where: ProfileLanguageWhereUniqueInput
  }

  /**
   * ProfileLanguage findFirst
   */
  export type ProfileLanguageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * Filter, which ProfileLanguage to fetch.
     */
    where?: ProfileLanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileLanguages to fetch.
     */
    orderBy?: ProfileLanguageOrderByWithRelationInput | ProfileLanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileLanguages.
     */
    cursor?: ProfileLanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileLanguages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileLanguages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileLanguages.
     */
    distinct?: ProfileLanguageScalarFieldEnum | ProfileLanguageScalarFieldEnum[]
  }

  /**
   * ProfileLanguage findFirstOrThrow
   */
  export type ProfileLanguageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * Filter, which ProfileLanguage to fetch.
     */
    where?: ProfileLanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileLanguages to fetch.
     */
    orderBy?: ProfileLanguageOrderByWithRelationInput | ProfileLanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileLanguages.
     */
    cursor?: ProfileLanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileLanguages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileLanguages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileLanguages.
     */
    distinct?: ProfileLanguageScalarFieldEnum | ProfileLanguageScalarFieldEnum[]
  }

  /**
   * ProfileLanguage findMany
   */
  export type ProfileLanguageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * Filter, which ProfileLanguages to fetch.
     */
    where?: ProfileLanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileLanguages to fetch.
     */
    orderBy?: ProfileLanguageOrderByWithRelationInput | ProfileLanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfileLanguages.
     */
    cursor?: ProfileLanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileLanguages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileLanguages.
     */
    skip?: number
    distinct?: ProfileLanguageScalarFieldEnum | ProfileLanguageScalarFieldEnum[]
  }

  /**
   * ProfileLanguage create
   */
  export type ProfileLanguageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfileLanguage.
     */
    data: XOR<ProfileLanguageCreateInput, ProfileLanguageUncheckedCreateInput>
  }

  /**
   * ProfileLanguage createMany
   */
  export type ProfileLanguageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfileLanguages.
     */
    data: ProfileLanguageCreateManyInput | ProfileLanguageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfileLanguage createManyAndReturn
   */
  export type ProfileLanguageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * The data used to create many ProfileLanguages.
     */
    data: ProfileLanguageCreateManyInput | ProfileLanguageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfileLanguage update
   */
  export type ProfileLanguageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfileLanguage.
     */
    data: XOR<ProfileLanguageUpdateInput, ProfileLanguageUncheckedUpdateInput>
    /**
     * Choose, which ProfileLanguage to update.
     */
    where: ProfileLanguageWhereUniqueInput
  }

  /**
   * ProfileLanguage updateMany
   */
  export type ProfileLanguageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfileLanguages.
     */
    data: XOR<ProfileLanguageUpdateManyMutationInput, ProfileLanguageUncheckedUpdateManyInput>
    /**
     * Filter which ProfileLanguages to update
     */
    where?: ProfileLanguageWhereInput
    /**
     * Limit how many ProfileLanguages to update.
     */
    limit?: number
  }

  /**
   * ProfileLanguage updateManyAndReturn
   */
  export type ProfileLanguageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * The data used to update ProfileLanguages.
     */
    data: XOR<ProfileLanguageUpdateManyMutationInput, ProfileLanguageUncheckedUpdateManyInput>
    /**
     * Filter which ProfileLanguages to update
     */
    where?: ProfileLanguageWhereInput
    /**
     * Limit how many ProfileLanguages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfileLanguage upsert
   */
  export type ProfileLanguageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfileLanguage to update in case it exists.
     */
    where: ProfileLanguageWhereUniqueInput
    /**
     * In case the ProfileLanguage found by the `where` argument doesn't exist, create a new ProfileLanguage with this data.
     */
    create: XOR<ProfileLanguageCreateInput, ProfileLanguageUncheckedCreateInput>
    /**
     * In case the ProfileLanguage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileLanguageUpdateInput, ProfileLanguageUncheckedUpdateInput>
  }

  /**
   * ProfileLanguage delete
   */
  export type ProfileLanguageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
    /**
     * Filter which ProfileLanguage to delete.
     */
    where: ProfileLanguageWhereUniqueInput
  }

  /**
   * ProfileLanguage deleteMany
   */
  export type ProfileLanguageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileLanguages to delete
     */
    where?: ProfileLanguageWhereInput
    /**
     * Limit how many ProfileLanguages to delete.
     */
    limit?: number
  }

  /**
   * ProfileLanguage without action
   */
  export type ProfileLanguageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileLanguage
     */
    select?: ProfileLanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileLanguage
     */
    omit?: ProfileLanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileLanguageInclude<ExtArgs> | null
  }


  /**
   * Model SupportTicket
   */

  export type AggregateSupportTicket = {
    _count: SupportTicketCountAggregateOutputType | null
    _avg: SupportTicketAvgAggregateOutputType | null
    _sum: SupportTicketSumAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  export type SupportTicketAvgAggregateOutputType = {
    id: number | null
  }

  export type SupportTicketSumAggregateOutputType = {
    id: bigint | null
  }

  export type SupportTicketMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    title: string | null
    content: string | null
    status: $Enums.TicketStatus | null
    answer: string | null
    answeredAt: Date | null
    createdAt: Date | null
  }

  export type SupportTicketMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    title: string | null
    content: string | null
    status: $Enums.TicketStatus | null
    answer: string | null
    answeredAt: Date | null
    createdAt: Date | null
  }

  export type SupportTicketCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    content: number
    status: number
    answer: number
    answeredAt: number
    createdAt: number
    _all: number
  }


  export type SupportTicketAvgAggregateInputType = {
    id?: true
  }

  export type SupportTicketSumAggregateInputType = {
    id?: true
  }

  export type SupportTicketMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    status?: true
    answer?: true
    answeredAt?: true
    createdAt?: true
  }

  export type SupportTicketMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    status?: true
    answer?: true
    answeredAt?: true
    createdAt?: true
  }

  export type SupportTicketCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    status?: true
    answer?: true
    answeredAt?: true
    createdAt?: true
    _all?: true
  }

  export type SupportTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTicket to aggregate.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportTickets
    **/
    _count?: true | SupportTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupportTicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupportTicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportTicketMaxAggregateInputType
  }

  export type GetSupportTicketAggregateType<T extends SupportTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportTicket[P]>
      : GetScalarType<T[P], AggregateSupportTicket[P]>
  }




  export type SupportTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithAggregationInput | SupportTicketOrderByWithAggregationInput[]
    by: SupportTicketScalarFieldEnum[] | SupportTicketScalarFieldEnum
    having?: SupportTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportTicketCountAggregateInputType | true
    _avg?: SupportTicketAvgAggregateInputType
    _sum?: SupportTicketSumAggregateInputType
    _min?: SupportTicketMinAggregateInputType
    _max?: SupportTicketMaxAggregateInputType
  }

  export type SupportTicketGroupByOutputType = {
    id: bigint
    userId: string
    title: string
    content: string
    status: $Enums.TicketStatus
    answer: string | null
    answeredAt: Date | null
    createdAt: Date
    _count: SupportTicketCountAggregateOutputType | null
    _avg: SupportTicketAvgAggregateOutputType | null
    _sum: SupportTicketSumAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  type GetSupportTicketGroupByPayload<T extends SupportTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
            : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
        }
      >
    >


  export type SupportTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    answer?: boolean
    answeredAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>

  export type SupportTicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    answer?: boolean
    answeredAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>

  export type SupportTicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    answer?: boolean
    answeredAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>

  export type SupportTicketSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    answer?: boolean
    answeredAt?: boolean
    createdAt?: boolean
  }

  export type SupportTicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "content" | "status" | "answer" | "answeredAt" | "createdAt", ExtArgs["result"]["supportTicket"]>
  export type SupportTicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SupportTicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SupportTicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SupportTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportTicket"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string
      title: string
      content: string
      status: $Enums.TicketStatus
      answer: string | null
      answeredAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["supportTicket"]>
    composites: {}
  }

  type SupportTicketGetPayload<S extends boolean | null | undefined | SupportTicketDefaultArgs> = $Result.GetResult<Prisma.$SupportTicketPayload, S>

  type SupportTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportTicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportTicketCountAggregateInputType | true
    }

  export interface SupportTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportTicket'], meta: { name: 'SupportTicket' } }
    /**
     * Find zero or one SupportTicket that matches the filter.
     * @param {SupportTicketFindUniqueArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportTicketFindUniqueArgs>(args: SelectSubset<T, SupportTicketFindUniqueArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupportTicket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportTicketFindUniqueOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportTicketFindFirstArgs>(args?: SelectSubset<T, SupportTicketFindFirstArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupportTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany()
     * 
     * // Get first 10 SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportTicketFindManyArgs>(args?: SelectSubset<T, SupportTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupportTicket.
     * @param {SupportTicketCreateArgs} args - Arguments to create a SupportTicket.
     * @example
     * // Create one SupportTicket
     * const SupportTicket = await prisma.supportTicket.create({
     *   data: {
     *     // ... data to create a SupportTicket
     *   }
     * })
     * 
     */
    create<T extends SupportTicketCreateArgs>(args: SelectSubset<T, SupportTicketCreateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupportTickets.
     * @param {SupportTicketCreateManyArgs} args - Arguments to create many SupportTickets.
     * @example
     * // Create many SupportTickets
     * const supportTicket = await prisma.supportTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportTicketCreateManyArgs>(args?: SelectSubset<T, SupportTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportTickets and returns the data saved in the database.
     * @param {SupportTicketCreateManyAndReturnArgs} args - Arguments to create many SupportTickets.
     * @example
     * // Create many SupportTickets
     * const supportTicket = await prisma.supportTicket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportTickets and only return the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportTicketCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportTicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupportTicket.
     * @param {SupportTicketDeleteArgs} args - Arguments to delete one SupportTicket.
     * @example
     * // Delete one SupportTicket
     * const SupportTicket = await prisma.supportTicket.delete({
     *   where: {
     *     // ... filter to delete one SupportTicket
     *   }
     * })
     * 
     */
    delete<T extends SupportTicketDeleteArgs>(args: SelectSubset<T, SupportTicketDeleteArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupportTicket.
     * @param {SupportTicketUpdateArgs} args - Arguments to update one SupportTicket.
     * @example
     * // Update one SupportTicket
     * const supportTicket = await prisma.supportTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportTicketUpdateArgs>(args: SelectSubset<T, SupportTicketUpdateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupportTickets.
     * @param {SupportTicketDeleteManyArgs} args - Arguments to filter SupportTickets to delete.
     * @example
     * // Delete a few SupportTickets
     * const { count } = await prisma.supportTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportTicketDeleteManyArgs>(args?: SelectSubset<T, SupportTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportTickets
     * const supportTicket = await prisma.supportTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportTicketUpdateManyArgs>(args: SelectSubset<T, SupportTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportTickets and returns the data updated in the database.
     * @param {SupportTicketUpdateManyAndReturnArgs} args - Arguments to update many SupportTickets.
     * @example
     * // Update many SupportTickets
     * const supportTicket = await prisma.supportTicket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupportTickets and only return the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.updateManyAndReturn({
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
    updateManyAndReturn<T extends SupportTicketUpdateManyAndReturnArgs>(args: SelectSubset<T, SupportTicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupportTicket.
     * @param {SupportTicketUpsertArgs} args - Arguments to update or create a SupportTicket.
     * @example
     * // Update or create a SupportTicket
     * const supportTicket = await prisma.supportTicket.upsert({
     *   create: {
     *     // ... data to create a SupportTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportTicket we want to update
     *   }
     * })
     */
    upsert<T extends SupportTicketUpsertArgs>(args: SelectSubset<T, SupportTicketUpsertArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketCountArgs} args - Arguments to filter SupportTickets to count.
     * @example
     * // Count the number of SupportTickets
     * const count = await prisma.supportTicket.count({
     *   where: {
     *     // ... the filter for the SupportTickets we want to count
     *   }
     * })
    **/
    count<T extends SupportTicketCountArgs>(
      args?: Subset<T, SupportTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupportTicketAggregateArgs>(args: Subset<T, SupportTicketAggregateArgs>): Prisma.PrismaPromise<GetSupportTicketAggregateType<T>>

    /**
     * Group by SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketGroupByArgs} args - Group by arguments.
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
      T extends SupportTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportTicketGroupByArgs['orderBy'] }
        : { orderBy?: SupportTicketGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupportTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportTicket model
   */
  readonly fields: SupportTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SupportTicket model
   */
  interface SupportTicketFieldRefs {
    readonly id: FieldRef<"SupportTicket", 'BigInt'>
    readonly userId: FieldRef<"SupportTicket", 'String'>
    readonly title: FieldRef<"SupportTicket", 'String'>
    readonly content: FieldRef<"SupportTicket", 'String'>
    readonly status: FieldRef<"SupportTicket", 'TicketStatus'>
    readonly answer: FieldRef<"SupportTicket", 'String'>
    readonly answeredAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly createdAt: FieldRef<"SupportTicket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupportTicket findUnique
   */
  export type SupportTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findUniqueOrThrow
   */
  export type SupportTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findFirst
   */
  export type SupportTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findFirstOrThrow
   */
  export type SupportTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findMany
   */
  export type SupportTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTickets to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket create
   */
  export type SupportTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportTicket.
     */
    data: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
  }

  /**
   * SupportTicket createMany
   */
  export type SupportTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportTickets.
     */
    data: SupportTicketCreateManyInput | SupportTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportTicket createManyAndReturn
   */
  export type SupportTicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * The data used to create many SupportTickets.
     */
    data: SupportTicketCreateManyInput | SupportTicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportTicket update
   */
  export type SupportTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportTicket.
     */
    data: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
    /**
     * Choose, which SupportTicket to update.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket updateMany
   */
  export type SupportTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportTickets.
     */
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyInput>
    /**
     * Filter which SupportTickets to update
     */
    where?: SupportTicketWhereInput
    /**
     * Limit how many SupportTickets to update.
     */
    limit?: number
  }

  /**
   * SupportTicket updateManyAndReturn
   */
  export type SupportTicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * The data used to update SupportTickets.
     */
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyInput>
    /**
     * Filter which SupportTickets to update
     */
    where?: SupportTicketWhereInput
    /**
     * Limit how many SupportTickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportTicket upsert
   */
  export type SupportTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportTicket to update in case it exists.
     */
    where: SupportTicketWhereUniqueInput
    /**
     * In case the SupportTicket found by the `where` argument doesn't exist, create a new SupportTicket with this data.
     */
    create: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
    /**
     * In case the SupportTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
  }

  /**
   * SupportTicket delete
   */
  export type SupportTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter which SupportTicket to delete.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket deleteMany
   */
  export type SupportTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTickets to delete
     */
    where?: SupportTicketWhereInput
    /**
     * Limit how many SupportTickets to delete.
     */
    limit?: number
  }

  /**
   * SupportTicket without action
   */
  export type SupportTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportTicket
     */
    omit?: SupportTicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogAvgAggregateOutputType = {
    id: number | null
  }

  export type ActivityLogSumAggregateOutputType = {
    id: bigint | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    userEmail: string | null
    userName: string | null
    userGender: string | null
    actionType: string | null
    description: string | null
    metadata: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    userEmail: string | null
    userName: string | null
    userGender: string | null
    actionType: string | null
    description: string | null
    metadata: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    userId: number
    userEmail: number
    userName: number
    userGender: number
    actionType: number
    description: number
    metadata: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type ActivityLogAvgAggregateInputType = {
    id?: true
  }

  export type ActivityLogSumAggregateInputType = {
    id?: true
  }

  export type ActivityLogMinAggregateInputType = {
    id?: true
    userId?: true
    userEmail?: true
    userName?: true
    userGender?: true
    actionType?: true
    description?: true
    metadata?: true
    ipAddress?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    userId?: true
    userEmail?: true
    userName?: true
    userGender?: true
    actionType?: true
    description?: true
    metadata?: true
    ipAddress?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    userId?: true
    userEmail?: true
    userName?: true
    userGender?: true
    actionType?: true
    description?: true
    metadata?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivityLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _avg?: ActivityLogAvgAggregateInputType
    _sum?: ActivityLogSumAggregateInputType
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: bigint
    userId: string | null
    userEmail: string | null
    userName: string | null
    userGender: string | null
    actionType: string
    description: string | null
    metadata: string | null
    ipAddress: string | null
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userEmail?: boolean
    userName?: boolean
    userGender?: boolean
    actionType?: boolean
    description?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userEmail?: boolean
    userName?: boolean
    userGender?: boolean
    actionType?: boolean
    description?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userEmail?: boolean
    userName?: boolean
    userGender?: boolean
    actionType?: boolean
    description?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    userId?: boolean
    userEmail?: boolean
    userName?: boolean
    userGender?: boolean
    actionType?: boolean
    description?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "userEmail" | "userName" | "userGender" | "actionType" | "description" | "metadata" | "ipAddress" | "createdAt", ExtArgs["result"]["activityLog"]>

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string | null
      userEmail: string | null
      userName: string | null
      userGender: string | null
      actionType: string
      description: string | null
      metadata: string | null
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
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
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'BigInt'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly userEmail: FieldRef<"ActivityLog", 'String'>
    readonly userName: FieldRef<"ActivityLog", 'String'>
    readonly userGender: FieldRef<"ActivityLog", 'String'>
    readonly actionType: FieldRef<"ActivityLog", 'String'>
    readonly description: FieldRef<"ActivityLog", 'String'>
    readonly metadata: FieldRef<"ActivityLog", 'String'>
    readonly ipAddress: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
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
    socialProvider: 'socialProvider',
    socialProviderId: 'socialProviderId',
    userType: 'userType',
    isActive: 'isActive',
    joinedAt: 'joinedAt',
    lastLoginAt: 'lastLoginAt',
    deletedAt: 'deletedAt',
    deleteScheduledAt: 'deleteScheduledAt',
    notifSms: 'notifSms',
    notifEmail: 'notifEmail',
    notifKakao: 'notifKakao',
    notifEnabledAt: 'notifEnabledAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CorporateProfileScalarFieldEnum: {
    companyId: 'companyId',
    authId: 'authId',
    bizRegNumber: 'bizRegNumber',
    companyNameOfficial: 'companyNameOfficial',
    ceoName: 'ceoName',
    foundingDate: 'foundingDate',
    managerName: 'managerName',
    managerPhone: 'managerPhone',
    managerEmail: 'managerEmail',
    verificationStatus: 'verificationStatus',
    verificationMethod: 'verificationMethod',
    proofDocumentUrl: 'proofDocumentUrl',
    brandName: 'brandName',
    logoImageUrl: 'logoImageUrl',
    companyIntro: 'companyIntro',
    ksicCode: 'ksicCode',
    addressRoad: 'addressRoad',
    companySizeType: 'companySizeType',
    employeeCountKorean: 'employeeCountKorean',
    employeeCountForeign: 'employeeCountForeign',
    annualRevenue: 'annualRevenue',
    isBizVerified: 'isBizVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CorporateProfileScalarFieldEnum = (typeof CorporateProfileScalarFieldEnum)[keyof typeof CorporateProfileScalarFieldEnum]


  export const IndividualProfileScalarFieldEnum: {
    individualId: 'individualId',
    authId: 'authId',
    realName: 'realName',
    nationality: 'nationality',
    birthDate: 'birthDate',
    gender: 'gender',
    addressRoad: 'addressRoad',
    visaType: 'visaType',
    visaExpiryDate: 'visaExpiryDate',
    desiredJobType: 'desiredJobType',
    desiredSalary: 'desiredSalary',
    desiredIndustries: 'desiredIndustries',
    isOpenToScout: 'isOpenToScout',
    finalEducationLvl: 'finalEducationLvl',
    koreanFluencyLvl: 'koreanFluencyLvl',
    totalCareerMonths: 'totalCareerMonths',
    profileImageUrl: 'profileImageUrl',
    resumeFileUrl: 'resumeFileUrl',
    portfolioUrl: 'portfolioUrl',
    selfIntro: 'selfIntro',
    isProfileCompleted: 'isProfileCompleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IndividualProfileScalarFieldEnum = (typeof IndividualProfileScalarFieldEnum)[keyof typeof IndividualProfileScalarFieldEnum]


  export const TalentAccessLogScalarFieldEnum: {
    accessId: 'accessId',
    corporateId: 'corporateId',
    individualId: 'individualId',
    accessedAt: 'accessedAt'
  };

  export type TalentAccessLogScalarFieldEnum = (typeof TalentAccessLogScalarFieldEnum)[keyof typeof TalentAccessLogScalarFieldEnum]


  export const ProfileEducationScalarFieldEnum: {
    eduId: 'eduId',
    individualId: 'individualId',
    schoolName: 'schoolName',
    majorName: 'majorName',
    degreeLevel: 'degreeLevel',
    startDate: 'startDate',
    graduationDate: 'graduationDate',
    graduationStatus: 'graduationStatus',
    gpaScore: 'gpaScore'
  };

  export type ProfileEducationScalarFieldEnum = (typeof ProfileEducationScalarFieldEnum)[keyof typeof ProfileEducationScalarFieldEnum]


  export const ProfileCareerScalarFieldEnum: {
    careerId: 'careerId',
    individualId: 'individualId',
    companyName: 'companyName',
    dutyRole: 'dutyRole',
    jobPosition: 'jobPosition',
    startDate: 'startDate',
    endDate: 'endDate',
    isCurrent: 'isCurrent',
    description: 'description'
  };

  export type ProfileCareerScalarFieldEnum = (typeof ProfileCareerScalarFieldEnum)[keyof typeof ProfileCareerScalarFieldEnum]


  export const ProfileLanguageScalarFieldEnum: {
    langId: 'langId',
    individualId: 'individualId',
    languageType: 'languageType',
    testType: 'testType',
    scoreLevel: 'scoreLevel',
    obtainedDate: 'obtainedDate',
    expiryDate: 'expiryDate',
    isVerified: 'isVerified'
  };

  export type ProfileLanguageScalarFieldEnum = (typeof ProfileLanguageScalarFieldEnum)[keyof typeof ProfileLanguageScalarFieldEnum]


  export const SupportTicketScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    content: 'content',
    status: 'status',
    answer: 'answer',
    answeredAt: 'answeredAt',
    createdAt: 'createdAt'
  };

  export type SupportTicketScalarFieldEnum = (typeof SupportTicketScalarFieldEnum)[keyof typeof SupportTicketScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    userEmail: 'userEmail',
    userName: 'userName',
    userGender: 'userGender',
    actionType: 'actionType',
    description: 'description',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


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
   * Reference to a field of type 'SocialProvider'
   */
  export type EnumSocialProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SocialProvider'>
    


  /**
   * Reference to a field of type 'SocialProvider[]'
   */
  export type ListEnumSocialProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SocialProvider[]'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'UserType[]'
   */
  export type ListEnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType[]'>
    


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    


  /**
   * Reference to a field of type 'VerificationMethod'
   */
  export type EnumVerificationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationMethod'>
    


  /**
   * Reference to a field of type 'VerificationMethod[]'
   */
  export type ListEnumVerificationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationMethod[]'>
    


  /**
   * Reference to a field of type 'CompanySizeType'
   */
  export type EnumCompanySizeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanySizeType'>
    


  /**
   * Reference to a field of type 'CompanySizeType[]'
   */
  export type ListEnumCompanySizeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanySizeType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'DesiredJobType'
   */
  export type EnumDesiredJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DesiredJobType'>
    


  /**
   * Reference to a field of type 'DesiredJobType[]'
   */
  export type ListEnumDesiredJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DesiredJobType[]'>
    


  /**
   * Reference to a field of type 'EducationLevel'
   */
  export type EnumEducationLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EducationLevel'>
    


  /**
   * Reference to a field of type 'EducationLevel[]'
   */
  export type ListEnumEducationLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EducationLevel[]'>
    


  /**
   * Reference to a field of type 'KoreanFluencyLevel'
   */
  export type EnumKoreanFluencyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KoreanFluencyLevel'>
    


  /**
   * Reference to a field of type 'KoreanFluencyLevel[]'
   */
  export type ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KoreanFluencyLevel[]'>
    


  /**
   * Reference to a field of type 'GraduationStatus'
   */
  export type EnumGraduationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GraduationStatus'>
    


  /**
   * Reference to a field of type 'GraduationStatus[]'
   */
  export type ListEnumGraduationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GraduationStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


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
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    socialProvider?: EnumSocialProviderFilter<"User"> | $Enums.SocialProvider
    socialProviderId?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    isActive?: BoolFilter<"User"> | boolean
    joinedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deleteScheduledAt?: DateTimeNullableFilter<"User"> | Date | string | null
    notifSms?: BoolFilter<"User"> | boolean
    notifEmail?: BoolFilter<"User"> | boolean
    notifKakao?: BoolFilter<"User"> | boolean
    notifEnabledAt?: DateTimeNullableFilter<"User"> | Date | string | null
    corporate?: XOR<CorporateProfileNullableScalarRelationFilter, CorporateProfileWhereInput> | null
    individual?: XOR<IndividualProfileNullableScalarRelationFilter, IndividualProfileWhereInput> | null
    supportTickets?: SupportTicketListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    socialProvider?: SortOrder
    socialProviderId?: SortOrderInput | SortOrder
    userType?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deleteScheduledAt?: SortOrderInput | SortOrder
    notifSms?: SortOrder
    notifEmail?: SortOrder
    notifKakao?: SortOrder
    notifEnabledAt?: SortOrderInput | SortOrder
    corporate?: CorporateProfileOrderByWithRelationInput
    individual?: IndividualProfileOrderByWithRelationInput
    supportTickets?: SupportTicketOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    socialProvider_socialProviderId?: UserSocialProviderSocialProviderIdCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    socialProvider?: EnumSocialProviderFilter<"User"> | $Enums.SocialProvider
    socialProviderId?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    isActive?: BoolFilter<"User"> | boolean
    joinedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deleteScheduledAt?: DateTimeNullableFilter<"User"> | Date | string | null
    notifSms?: BoolFilter<"User"> | boolean
    notifEmail?: BoolFilter<"User"> | boolean
    notifKakao?: BoolFilter<"User"> | boolean
    notifEnabledAt?: DateTimeNullableFilter<"User"> | Date | string | null
    corporate?: XOR<CorporateProfileNullableScalarRelationFilter, CorporateProfileWhereInput> | null
    individual?: XOR<IndividualProfileNullableScalarRelationFilter, IndividualProfileWhereInput> | null
    supportTickets?: SupportTicketListRelationFilter
  }, "id" | "email" | "socialProvider_socialProviderId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    socialProvider?: SortOrder
    socialProviderId?: SortOrderInput | SortOrder
    userType?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deleteScheduledAt?: SortOrderInput | SortOrder
    notifSms?: SortOrder
    notifEmail?: SortOrder
    notifKakao?: SortOrder
    notifEnabledAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    socialProvider?: EnumSocialProviderWithAggregatesFilter<"User"> | $Enums.SocialProvider
    socialProviderId?: StringNullableWithAggregatesFilter<"User"> | string | null
    userType?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    joinedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    deleteScheduledAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    notifSms?: BoolWithAggregatesFilter<"User"> | boolean
    notifEmail?: BoolWithAggregatesFilter<"User"> | boolean
    notifKakao?: BoolWithAggregatesFilter<"User"> | boolean
    notifEnabledAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type CorporateProfileWhereInput = {
    AND?: CorporateProfileWhereInput | CorporateProfileWhereInput[]
    OR?: CorporateProfileWhereInput[]
    NOT?: CorporateProfileWhereInput | CorporateProfileWhereInput[]
    companyId?: BigIntFilter<"CorporateProfile"> | bigint | number
    authId?: StringFilter<"CorporateProfile"> | string
    bizRegNumber?: StringFilter<"CorporateProfile"> | string
    companyNameOfficial?: StringFilter<"CorporateProfile"> | string
    ceoName?: StringFilter<"CorporateProfile"> | string
    foundingDate?: DateTimeNullableFilter<"CorporateProfile"> | Date | string | null
    managerName?: StringFilter<"CorporateProfile"> | string
    managerPhone?: StringFilter<"CorporateProfile"> | string
    managerEmail?: StringFilter<"CorporateProfile"> | string
    verificationStatus?: EnumVerificationStatusFilter<"CorporateProfile"> | $Enums.VerificationStatus
    verificationMethod?: EnumVerificationMethodNullableFilter<"CorporateProfile"> | $Enums.VerificationMethod | null
    proofDocumentUrl?: StringNullableFilter<"CorporateProfile"> | string | null
    brandName?: StringNullableFilter<"CorporateProfile"> | string | null
    logoImageUrl?: StringNullableFilter<"CorporateProfile"> | string | null
    companyIntro?: StringNullableFilter<"CorporateProfile"> | string | null
    ksicCode?: StringFilter<"CorporateProfile"> | string
    addressRoad?: StringFilter<"CorporateProfile"> | string
    companySizeType?: EnumCompanySizeTypeFilter<"CorporateProfile"> | $Enums.CompanySizeType
    employeeCountKorean?: IntFilter<"CorporateProfile"> | number
    employeeCountForeign?: IntFilter<"CorporateProfile"> | number
    annualRevenue?: BigIntFilter<"CorporateProfile"> | bigint | number
    isBizVerified?: BoolFilter<"CorporateProfile"> | boolean
    createdAt?: DateTimeFilter<"CorporateProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CorporateProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    accessLogs?: TalentAccessLogListRelationFilter
  }

  export type CorporateProfileOrderByWithRelationInput = {
    companyId?: SortOrder
    authId?: SortOrder
    bizRegNumber?: SortOrder
    companyNameOfficial?: SortOrder
    ceoName?: SortOrder
    foundingDate?: SortOrderInput | SortOrder
    managerName?: SortOrder
    managerPhone?: SortOrder
    managerEmail?: SortOrder
    verificationStatus?: SortOrder
    verificationMethod?: SortOrderInput | SortOrder
    proofDocumentUrl?: SortOrderInput | SortOrder
    brandName?: SortOrderInput | SortOrder
    logoImageUrl?: SortOrderInput | SortOrder
    companyIntro?: SortOrderInput | SortOrder
    ksicCode?: SortOrder
    addressRoad?: SortOrder
    companySizeType?: SortOrder
    employeeCountKorean?: SortOrder
    employeeCountForeign?: SortOrder
    annualRevenue?: SortOrder
    isBizVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    accessLogs?: TalentAccessLogOrderByRelationAggregateInput
  }

  export type CorporateProfileWhereUniqueInput = Prisma.AtLeast<{
    companyId?: bigint | number
    authId?: string
    bizRegNumber?: string
    AND?: CorporateProfileWhereInput | CorporateProfileWhereInput[]
    OR?: CorporateProfileWhereInput[]
    NOT?: CorporateProfileWhereInput | CorporateProfileWhereInput[]
    companyNameOfficial?: StringFilter<"CorporateProfile"> | string
    ceoName?: StringFilter<"CorporateProfile"> | string
    foundingDate?: DateTimeNullableFilter<"CorporateProfile"> | Date | string | null
    managerName?: StringFilter<"CorporateProfile"> | string
    managerPhone?: StringFilter<"CorporateProfile"> | string
    managerEmail?: StringFilter<"CorporateProfile"> | string
    verificationStatus?: EnumVerificationStatusFilter<"CorporateProfile"> | $Enums.VerificationStatus
    verificationMethod?: EnumVerificationMethodNullableFilter<"CorporateProfile"> | $Enums.VerificationMethod | null
    proofDocumentUrl?: StringNullableFilter<"CorporateProfile"> | string | null
    brandName?: StringNullableFilter<"CorporateProfile"> | string | null
    logoImageUrl?: StringNullableFilter<"CorporateProfile"> | string | null
    companyIntro?: StringNullableFilter<"CorporateProfile"> | string | null
    ksicCode?: StringFilter<"CorporateProfile"> | string
    addressRoad?: StringFilter<"CorporateProfile"> | string
    companySizeType?: EnumCompanySizeTypeFilter<"CorporateProfile"> | $Enums.CompanySizeType
    employeeCountKorean?: IntFilter<"CorporateProfile"> | number
    employeeCountForeign?: IntFilter<"CorporateProfile"> | number
    annualRevenue?: BigIntFilter<"CorporateProfile"> | bigint | number
    isBizVerified?: BoolFilter<"CorporateProfile"> | boolean
    createdAt?: DateTimeFilter<"CorporateProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CorporateProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    accessLogs?: TalentAccessLogListRelationFilter
  }, "companyId" | "authId" | "bizRegNumber">

  export type CorporateProfileOrderByWithAggregationInput = {
    companyId?: SortOrder
    authId?: SortOrder
    bizRegNumber?: SortOrder
    companyNameOfficial?: SortOrder
    ceoName?: SortOrder
    foundingDate?: SortOrderInput | SortOrder
    managerName?: SortOrder
    managerPhone?: SortOrder
    managerEmail?: SortOrder
    verificationStatus?: SortOrder
    verificationMethod?: SortOrderInput | SortOrder
    proofDocumentUrl?: SortOrderInput | SortOrder
    brandName?: SortOrderInput | SortOrder
    logoImageUrl?: SortOrderInput | SortOrder
    companyIntro?: SortOrderInput | SortOrder
    ksicCode?: SortOrder
    addressRoad?: SortOrder
    companySizeType?: SortOrder
    employeeCountKorean?: SortOrder
    employeeCountForeign?: SortOrder
    annualRevenue?: SortOrder
    isBizVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    authId?: StringWithAggregatesFilter<"CorporateProfile"> | string
    bizRegNumber?: StringWithAggregatesFilter<"CorporateProfile"> | string
    companyNameOfficial?: StringWithAggregatesFilter<"CorporateProfile"> | string
    ceoName?: StringWithAggregatesFilter<"CorporateProfile"> | string
    foundingDate?: DateTimeNullableWithAggregatesFilter<"CorporateProfile"> | Date | string | null
    managerName?: StringWithAggregatesFilter<"CorporateProfile"> | string
    managerPhone?: StringWithAggregatesFilter<"CorporateProfile"> | string
    managerEmail?: StringWithAggregatesFilter<"CorporateProfile"> | string
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"CorporateProfile"> | $Enums.VerificationStatus
    verificationMethod?: EnumVerificationMethodNullableWithAggregatesFilter<"CorporateProfile"> | $Enums.VerificationMethod | null
    proofDocumentUrl?: StringNullableWithAggregatesFilter<"CorporateProfile"> | string | null
    brandName?: StringNullableWithAggregatesFilter<"CorporateProfile"> | string | null
    logoImageUrl?: StringNullableWithAggregatesFilter<"CorporateProfile"> | string | null
    companyIntro?: StringNullableWithAggregatesFilter<"CorporateProfile"> | string | null
    ksicCode?: StringWithAggregatesFilter<"CorporateProfile"> | string
    addressRoad?: StringWithAggregatesFilter<"CorporateProfile"> | string
    companySizeType?: EnumCompanySizeTypeWithAggregatesFilter<"CorporateProfile"> | $Enums.CompanySizeType
    employeeCountKorean?: IntWithAggregatesFilter<"CorporateProfile"> | number
    employeeCountForeign?: IntWithAggregatesFilter<"CorporateProfile"> | number
    annualRevenue?: BigIntWithAggregatesFilter<"CorporateProfile"> | bigint | number
    isBizVerified?: BoolWithAggregatesFilter<"CorporateProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CorporateProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CorporateProfile"> | Date | string
  }

  export type IndividualProfileWhereInput = {
    AND?: IndividualProfileWhereInput | IndividualProfileWhereInput[]
    OR?: IndividualProfileWhereInput[]
    NOT?: IndividualProfileWhereInput | IndividualProfileWhereInput[]
    individualId?: BigIntFilter<"IndividualProfile"> | bigint | number
    authId?: StringFilter<"IndividualProfile"> | string
    realName?: StringFilter<"IndividualProfile"> | string
    nationality?: StringFilter<"IndividualProfile"> | string
    birthDate?: DateTimeFilter<"IndividualProfile"> | Date | string
    gender?: EnumGenderFilter<"IndividualProfile"> | $Enums.Gender
    addressRoad?: StringNullableFilter<"IndividualProfile"> | string | null
    visaType?: StringFilter<"IndividualProfile"> | string
    visaExpiryDate?: DateTimeFilter<"IndividualProfile"> | Date | string
    desiredJobType?: EnumDesiredJobTypeFilter<"IndividualProfile"> | $Enums.DesiredJobType
    desiredSalary?: IntFilter<"IndividualProfile"> | number
    desiredIndustries?: StringNullableFilter<"IndividualProfile"> | string | null
    isOpenToScout?: BoolFilter<"IndividualProfile"> | boolean
    finalEducationLvl?: EnumEducationLevelNullableFilter<"IndividualProfile"> | $Enums.EducationLevel | null
    koreanFluencyLvl?: EnumKoreanFluencyLevelNullableFilter<"IndividualProfile"> | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFilter<"IndividualProfile"> | number
    profileImageUrl?: StringNullableFilter<"IndividualProfile"> | string | null
    resumeFileUrl?: StringNullableFilter<"IndividualProfile"> | string | null
    portfolioUrl?: StringNullableFilter<"IndividualProfile"> | string | null
    selfIntro?: StringNullableFilter<"IndividualProfile"> | string | null
    isProfileCompleted?: BoolFilter<"IndividualProfile"> | boolean
    createdAt?: DateTimeFilter<"IndividualProfile"> | Date | string
    updatedAt?: DateTimeFilter<"IndividualProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    accessLogs?: TalentAccessLogListRelationFilter
    educations?: ProfileEducationListRelationFilter
    careers?: ProfileCareerListRelationFilter
    languages?: ProfileLanguageListRelationFilter
  }

  export type IndividualProfileOrderByWithRelationInput = {
    individualId?: SortOrder
    authId?: SortOrder
    realName?: SortOrder
    nationality?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    addressRoad?: SortOrderInput | SortOrder
    visaType?: SortOrder
    visaExpiryDate?: SortOrder
    desiredJobType?: SortOrder
    desiredSalary?: SortOrder
    desiredIndustries?: SortOrderInput | SortOrder
    isOpenToScout?: SortOrder
    finalEducationLvl?: SortOrderInput | SortOrder
    koreanFluencyLvl?: SortOrderInput | SortOrder
    totalCareerMonths?: SortOrder
    profileImageUrl?: SortOrderInput | SortOrder
    resumeFileUrl?: SortOrderInput | SortOrder
    portfolioUrl?: SortOrderInput | SortOrder
    selfIntro?: SortOrderInput | SortOrder
    isProfileCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    accessLogs?: TalentAccessLogOrderByRelationAggregateInput
    educations?: ProfileEducationOrderByRelationAggregateInput
    careers?: ProfileCareerOrderByRelationAggregateInput
    languages?: ProfileLanguageOrderByRelationAggregateInput
  }

  export type IndividualProfileWhereUniqueInput = Prisma.AtLeast<{
    individualId?: bigint | number
    authId?: string
    AND?: IndividualProfileWhereInput | IndividualProfileWhereInput[]
    OR?: IndividualProfileWhereInput[]
    NOT?: IndividualProfileWhereInput | IndividualProfileWhereInput[]
    realName?: StringFilter<"IndividualProfile"> | string
    nationality?: StringFilter<"IndividualProfile"> | string
    birthDate?: DateTimeFilter<"IndividualProfile"> | Date | string
    gender?: EnumGenderFilter<"IndividualProfile"> | $Enums.Gender
    addressRoad?: StringNullableFilter<"IndividualProfile"> | string | null
    visaType?: StringFilter<"IndividualProfile"> | string
    visaExpiryDate?: DateTimeFilter<"IndividualProfile"> | Date | string
    desiredJobType?: EnumDesiredJobTypeFilter<"IndividualProfile"> | $Enums.DesiredJobType
    desiredSalary?: IntFilter<"IndividualProfile"> | number
    desiredIndustries?: StringNullableFilter<"IndividualProfile"> | string | null
    isOpenToScout?: BoolFilter<"IndividualProfile"> | boolean
    finalEducationLvl?: EnumEducationLevelNullableFilter<"IndividualProfile"> | $Enums.EducationLevel | null
    koreanFluencyLvl?: EnumKoreanFluencyLevelNullableFilter<"IndividualProfile"> | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFilter<"IndividualProfile"> | number
    profileImageUrl?: StringNullableFilter<"IndividualProfile"> | string | null
    resumeFileUrl?: StringNullableFilter<"IndividualProfile"> | string | null
    portfolioUrl?: StringNullableFilter<"IndividualProfile"> | string | null
    selfIntro?: StringNullableFilter<"IndividualProfile"> | string | null
    isProfileCompleted?: BoolFilter<"IndividualProfile"> | boolean
    createdAt?: DateTimeFilter<"IndividualProfile"> | Date | string
    updatedAt?: DateTimeFilter<"IndividualProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    accessLogs?: TalentAccessLogListRelationFilter
    educations?: ProfileEducationListRelationFilter
    careers?: ProfileCareerListRelationFilter
    languages?: ProfileLanguageListRelationFilter
  }, "individualId" | "authId">

  export type IndividualProfileOrderByWithAggregationInput = {
    individualId?: SortOrder
    authId?: SortOrder
    realName?: SortOrder
    nationality?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    addressRoad?: SortOrderInput | SortOrder
    visaType?: SortOrder
    visaExpiryDate?: SortOrder
    desiredJobType?: SortOrder
    desiredSalary?: SortOrder
    desiredIndustries?: SortOrderInput | SortOrder
    isOpenToScout?: SortOrder
    finalEducationLvl?: SortOrderInput | SortOrder
    koreanFluencyLvl?: SortOrderInput | SortOrder
    totalCareerMonths?: SortOrder
    profileImageUrl?: SortOrderInput | SortOrder
    resumeFileUrl?: SortOrderInput | SortOrder
    portfolioUrl?: SortOrderInput | SortOrder
    selfIntro?: SortOrderInput | SortOrder
    isProfileCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    authId?: StringWithAggregatesFilter<"IndividualProfile"> | string
    realName?: StringWithAggregatesFilter<"IndividualProfile"> | string
    nationality?: StringWithAggregatesFilter<"IndividualProfile"> | string
    birthDate?: DateTimeWithAggregatesFilter<"IndividualProfile"> | Date | string
    gender?: EnumGenderWithAggregatesFilter<"IndividualProfile"> | $Enums.Gender
    addressRoad?: StringNullableWithAggregatesFilter<"IndividualProfile"> | string | null
    visaType?: StringWithAggregatesFilter<"IndividualProfile"> | string
    visaExpiryDate?: DateTimeWithAggregatesFilter<"IndividualProfile"> | Date | string
    desiredJobType?: EnumDesiredJobTypeWithAggregatesFilter<"IndividualProfile"> | $Enums.DesiredJobType
    desiredSalary?: IntWithAggregatesFilter<"IndividualProfile"> | number
    desiredIndustries?: StringNullableWithAggregatesFilter<"IndividualProfile"> | string | null
    isOpenToScout?: BoolWithAggregatesFilter<"IndividualProfile"> | boolean
    finalEducationLvl?: EnumEducationLevelNullableWithAggregatesFilter<"IndividualProfile"> | $Enums.EducationLevel | null
    koreanFluencyLvl?: EnumKoreanFluencyLevelNullableWithAggregatesFilter<"IndividualProfile"> | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntWithAggregatesFilter<"IndividualProfile"> | number
    profileImageUrl?: StringNullableWithAggregatesFilter<"IndividualProfile"> | string | null
    resumeFileUrl?: StringNullableWithAggregatesFilter<"IndividualProfile"> | string | null
    portfolioUrl?: StringNullableWithAggregatesFilter<"IndividualProfile"> | string | null
    selfIntro?: StringNullableWithAggregatesFilter<"IndividualProfile"> | string | null
    isProfileCompleted?: BoolWithAggregatesFilter<"IndividualProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"IndividualProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IndividualProfile"> | Date | string
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

  export type ProfileEducationWhereInput = {
    AND?: ProfileEducationWhereInput | ProfileEducationWhereInput[]
    OR?: ProfileEducationWhereInput[]
    NOT?: ProfileEducationWhereInput | ProfileEducationWhereInput[]
    eduId?: BigIntFilter<"ProfileEducation"> | bigint | number
    individualId?: BigIntFilter<"ProfileEducation"> | bigint | number
    schoolName?: StringFilter<"ProfileEducation"> | string
    majorName?: StringFilter<"ProfileEducation"> | string
    degreeLevel?: EnumEducationLevelFilter<"ProfileEducation"> | $Enums.EducationLevel
    startDate?: DateTimeFilter<"ProfileEducation"> | Date | string
    graduationDate?: DateTimeNullableFilter<"ProfileEducation"> | Date | string | null
    graduationStatus?: EnumGraduationStatusFilter<"ProfileEducation"> | $Enums.GraduationStatus
    gpaScore?: DecimalNullableFilter<"ProfileEducation"> | Decimal | DecimalJsLike | number | string | null
    individual?: XOR<IndividualProfileScalarRelationFilter, IndividualProfileWhereInput>
  }

  export type ProfileEducationOrderByWithRelationInput = {
    eduId?: SortOrder
    individualId?: SortOrder
    schoolName?: SortOrder
    majorName?: SortOrder
    degreeLevel?: SortOrder
    startDate?: SortOrder
    graduationDate?: SortOrderInput | SortOrder
    graduationStatus?: SortOrder
    gpaScore?: SortOrderInput | SortOrder
    individual?: IndividualProfileOrderByWithRelationInput
  }

  export type ProfileEducationWhereUniqueInput = Prisma.AtLeast<{
    eduId?: bigint | number
    AND?: ProfileEducationWhereInput | ProfileEducationWhereInput[]
    OR?: ProfileEducationWhereInput[]
    NOT?: ProfileEducationWhereInput | ProfileEducationWhereInput[]
    individualId?: BigIntFilter<"ProfileEducation"> | bigint | number
    schoolName?: StringFilter<"ProfileEducation"> | string
    majorName?: StringFilter<"ProfileEducation"> | string
    degreeLevel?: EnumEducationLevelFilter<"ProfileEducation"> | $Enums.EducationLevel
    startDate?: DateTimeFilter<"ProfileEducation"> | Date | string
    graduationDate?: DateTimeNullableFilter<"ProfileEducation"> | Date | string | null
    graduationStatus?: EnumGraduationStatusFilter<"ProfileEducation"> | $Enums.GraduationStatus
    gpaScore?: DecimalNullableFilter<"ProfileEducation"> | Decimal | DecimalJsLike | number | string | null
    individual?: XOR<IndividualProfileScalarRelationFilter, IndividualProfileWhereInput>
  }, "eduId">

  export type ProfileEducationOrderByWithAggregationInput = {
    eduId?: SortOrder
    individualId?: SortOrder
    schoolName?: SortOrder
    majorName?: SortOrder
    degreeLevel?: SortOrder
    startDate?: SortOrder
    graduationDate?: SortOrderInput | SortOrder
    graduationStatus?: SortOrder
    gpaScore?: SortOrderInput | SortOrder
    _count?: ProfileEducationCountOrderByAggregateInput
    _avg?: ProfileEducationAvgOrderByAggregateInput
    _max?: ProfileEducationMaxOrderByAggregateInput
    _min?: ProfileEducationMinOrderByAggregateInput
    _sum?: ProfileEducationSumOrderByAggregateInput
  }

  export type ProfileEducationScalarWhereWithAggregatesInput = {
    AND?: ProfileEducationScalarWhereWithAggregatesInput | ProfileEducationScalarWhereWithAggregatesInput[]
    OR?: ProfileEducationScalarWhereWithAggregatesInput[]
    NOT?: ProfileEducationScalarWhereWithAggregatesInput | ProfileEducationScalarWhereWithAggregatesInput[]
    eduId?: BigIntWithAggregatesFilter<"ProfileEducation"> | bigint | number
    individualId?: BigIntWithAggregatesFilter<"ProfileEducation"> | bigint | number
    schoolName?: StringWithAggregatesFilter<"ProfileEducation"> | string
    majorName?: StringWithAggregatesFilter<"ProfileEducation"> | string
    degreeLevel?: EnumEducationLevelWithAggregatesFilter<"ProfileEducation"> | $Enums.EducationLevel
    startDate?: DateTimeWithAggregatesFilter<"ProfileEducation"> | Date | string
    graduationDate?: DateTimeNullableWithAggregatesFilter<"ProfileEducation"> | Date | string | null
    graduationStatus?: EnumGraduationStatusWithAggregatesFilter<"ProfileEducation"> | $Enums.GraduationStatus
    gpaScore?: DecimalNullableWithAggregatesFilter<"ProfileEducation"> | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileCareerWhereInput = {
    AND?: ProfileCareerWhereInput | ProfileCareerWhereInput[]
    OR?: ProfileCareerWhereInput[]
    NOT?: ProfileCareerWhereInput | ProfileCareerWhereInput[]
    careerId?: BigIntFilter<"ProfileCareer"> | bigint | number
    individualId?: BigIntFilter<"ProfileCareer"> | bigint | number
    companyName?: StringFilter<"ProfileCareer"> | string
    dutyRole?: StringFilter<"ProfileCareer"> | string
    jobPosition?: StringNullableFilter<"ProfileCareer"> | string | null
    startDate?: DateTimeFilter<"ProfileCareer"> | Date | string
    endDate?: DateTimeNullableFilter<"ProfileCareer"> | Date | string | null
    isCurrent?: BoolFilter<"ProfileCareer"> | boolean
    description?: StringNullableFilter<"ProfileCareer"> | string | null
    individual?: XOR<IndividualProfileScalarRelationFilter, IndividualProfileWhereInput>
  }

  export type ProfileCareerOrderByWithRelationInput = {
    careerId?: SortOrder
    individualId?: SortOrder
    companyName?: SortOrder
    dutyRole?: SortOrder
    jobPosition?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    description?: SortOrderInput | SortOrder
    individual?: IndividualProfileOrderByWithRelationInput
  }

  export type ProfileCareerWhereUniqueInput = Prisma.AtLeast<{
    careerId?: bigint | number
    AND?: ProfileCareerWhereInput | ProfileCareerWhereInput[]
    OR?: ProfileCareerWhereInput[]
    NOT?: ProfileCareerWhereInput | ProfileCareerWhereInput[]
    individualId?: BigIntFilter<"ProfileCareer"> | bigint | number
    companyName?: StringFilter<"ProfileCareer"> | string
    dutyRole?: StringFilter<"ProfileCareer"> | string
    jobPosition?: StringNullableFilter<"ProfileCareer"> | string | null
    startDate?: DateTimeFilter<"ProfileCareer"> | Date | string
    endDate?: DateTimeNullableFilter<"ProfileCareer"> | Date | string | null
    isCurrent?: BoolFilter<"ProfileCareer"> | boolean
    description?: StringNullableFilter<"ProfileCareer"> | string | null
    individual?: XOR<IndividualProfileScalarRelationFilter, IndividualProfileWhereInput>
  }, "careerId">

  export type ProfileCareerOrderByWithAggregationInput = {
    careerId?: SortOrder
    individualId?: SortOrder
    companyName?: SortOrder
    dutyRole?: SortOrder
    jobPosition?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: ProfileCareerCountOrderByAggregateInput
    _avg?: ProfileCareerAvgOrderByAggregateInput
    _max?: ProfileCareerMaxOrderByAggregateInput
    _min?: ProfileCareerMinOrderByAggregateInput
    _sum?: ProfileCareerSumOrderByAggregateInput
  }

  export type ProfileCareerScalarWhereWithAggregatesInput = {
    AND?: ProfileCareerScalarWhereWithAggregatesInput | ProfileCareerScalarWhereWithAggregatesInput[]
    OR?: ProfileCareerScalarWhereWithAggregatesInput[]
    NOT?: ProfileCareerScalarWhereWithAggregatesInput | ProfileCareerScalarWhereWithAggregatesInput[]
    careerId?: BigIntWithAggregatesFilter<"ProfileCareer"> | bigint | number
    individualId?: BigIntWithAggregatesFilter<"ProfileCareer"> | bigint | number
    companyName?: StringWithAggregatesFilter<"ProfileCareer"> | string
    dutyRole?: StringWithAggregatesFilter<"ProfileCareer"> | string
    jobPosition?: StringNullableWithAggregatesFilter<"ProfileCareer"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"ProfileCareer"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"ProfileCareer"> | Date | string | null
    isCurrent?: BoolWithAggregatesFilter<"ProfileCareer"> | boolean
    description?: StringNullableWithAggregatesFilter<"ProfileCareer"> | string | null
  }

  export type ProfileLanguageWhereInput = {
    AND?: ProfileLanguageWhereInput | ProfileLanguageWhereInput[]
    OR?: ProfileLanguageWhereInput[]
    NOT?: ProfileLanguageWhereInput | ProfileLanguageWhereInput[]
    langId?: BigIntFilter<"ProfileLanguage"> | bigint | number
    individualId?: BigIntFilter<"ProfileLanguage"> | bigint | number
    languageType?: StringFilter<"ProfileLanguage"> | string
    testType?: StringNullableFilter<"ProfileLanguage"> | string | null
    scoreLevel?: StringFilter<"ProfileLanguage"> | string
    obtainedDate?: DateTimeNullableFilter<"ProfileLanguage"> | Date | string | null
    expiryDate?: DateTimeNullableFilter<"ProfileLanguage"> | Date | string | null
    isVerified?: BoolFilter<"ProfileLanguage"> | boolean
    individual?: XOR<IndividualProfileScalarRelationFilter, IndividualProfileWhereInput>
  }

  export type ProfileLanguageOrderByWithRelationInput = {
    langId?: SortOrder
    individualId?: SortOrder
    languageType?: SortOrder
    testType?: SortOrderInput | SortOrder
    scoreLevel?: SortOrder
    obtainedDate?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    individual?: IndividualProfileOrderByWithRelationInput
  }

  export type ProfileLanguageWhereUniqueInput = Prisma.AtLeast<{
    langId?: bigint | number
    AND?: ProfileLanguageWhereInput | ProfileLanguageWhereInput[]
    OR?: ProfileLanguageWhereInput[]
    NOT?: ProfileLanguageWhereInput | ProfileLanguageWhereInput[]
    individualId?: BigIntFilter<"ProfileLanguage"> | bigint | number
    languageType?: StringFilter<"ProfileLanguage"> | string
    testType?: StringNullableFilter<"ProfileLanguage"> | string | null
    scoreLevel?: StringFilter<"ProfileLanguage"> | string
    obtainedDate?: DateTimeNullableFilter<"ProfileLanguage"> | Date | string | null
    expiryDate?: DateTimeNullableFilter<"ProfileLanguage"> | Date | string | null
    isVerified?: BoolFilter<"ProfileLanguage"> | boolean
    individual?: XOR<IndividualProfileScalarRelationFilter, IndividualProfileWhereInput>
  }, "langId">

  export type ProfileLanguageOrderByWithAggregationInput = {
    langId?: SortOrder
    individualId?: SortOrder
    languageType?: SortOrder
    testType?: SortOrderInput | SortOrder
    scoreLevel?: SortOrder
    obtainedDate?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    _count?: ProfileLanguageCountOrderByAggregateInput
    _avg?: ProfileLanguageAvgOrderByAggregateInput
    _max?: ProfileLanguageMaxOrderByAggregateInput
    _min?: ProfileLanguageMinOrderByAggregateInput
    _sum?: ProfileLanguageSumOrderByAggregateInput
  }

  export type ProfileLanguageScalarWhereWithAggregatesInput = {
    AND?: ProfileLanguageScalarWhereWithAggregatesInput | ProfileLanguageScalarWhereWithAggregatesInput[]
    OR?: ProfileLanguageScalarWhereWithAggregatesInput[]
    NOT?: ProfileLanguageScalarWhereWithAggregatesInput | ProfileLanguageScalarWhereWithAggregatesInput[]
    langId?: BigIntWithAggregatesFilter<"ProfileLanguage"> | bigint | number
    individualId?: BigIntWithAggregatesFilter<"ProfileLanguage"> | bigint | number
    languageType?: StringWithAggregatesFilter<"ProfileLanguage"> | string
    testType?: StringNullableWithAggregatesFilter<"ProfileLanguage"> | string | null
    scoreLevel?: StringWithAggregatesFilter<"ProfileLanguage"> | string
    obtainedDate?: DateTimeNullableWithAggregatesFilter<"ProfileLanguage"> | Date | string | null
    expiryDate?: DateTimeNullableWithAggregatesFilter<"ProfileLanguage"> | Date | string | null
    isVerified?: BoolWithAggregatesFilter<"ProfileLanguage"> | boolean
  }

  export type SupportTicketWhereInput = {
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    id?: BigIntFilter<"SupportTicket"> | bigint | number
    userId?: StringFilter<"SupportTicket"> | string
    title?: StringFilter<"SupportTicket"> | string
    content?: StringFilter<"SupportTicket"> | string
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    answer?: StringNullableFilter<"SupportTicket"> | string | null
    answeredAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SupportTicketOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    answer?: SortOrderInput | SortOrder
    answeredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SupportTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    userId?: StringFilter<"SupportTicket"> | string
    title?: StringFilter<"SupportTicket"> | string
    content?: StringFilter<"SupportTicket"> | string
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    answer?: StringNullableFilter<"SupportTicket"> | string | null
    answeredAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SupportTicketOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    answer?: SortOrderInput | SortOrder
    answeredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SupportTicketCountOrderByAggregateInput
    _avg?: SupportTicketAvgOrderByAggregateInput
    _max?: SupportTicketMaxOrderByAggregateInput
    _min?: SupportTicketMinOrderByAggregateInput
    _sum?: SupportTicketSumOrderByAggregateInput
  }

  export type SupportTicketScalarWhereWithAggregatesInput = {
    AND?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    OR?: SupportTicketScalarWhereWithAggregatesInput[]
    NOT?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"SupportTicket"> | bigint | number
    userId?: StringWithAggregatesFilter<"SupportTicket"> | string
    title?: StringWithAggregatesFilter<"SupportTicket"> | string
    content?: StringWithAggregatesFilter<"SupportTicket"> | string
    status?: EnumTicketStatusWithAggregatesFilter<"SupportTicket"> | $Enums.TicketStatus
    answer?: StringNullableWithAggregatesFilter<"SupportTicket"> | string | null
    answeredAt?: DateTimeNullableWithAggregatesFilter<"SupportTicket"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: BigIntFilter<"ActivityLog"> | bigint | number
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    userEmail?: StringNullableFilter<"ActivityLog"> | string | null
    userName?: StringNullableFilter<"ActivityLog"> | string | null
    userGender?: StringNullableFilter<"ActivityLog"> | string | null
    actionType?: StringFilter<"ActivityLog"> | string
    description?: StringNullableFilter<"ActivityLog"> | string | null
    metadata?: StringNullableFilter<"ActivityLog"> | string | null
    ipAddress?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    userEmail?: SortOrderInput | SortOrder
    userName?: SortOrderInput | SortOrder
    userGender?: SortOrderInput | SortOrder
    actionType?: SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    userEmail?: StringNullableFilter<"ActivityLog"> | string | null
    userName?: StringNullableFilter<"ActivityLog"> | string | null
    userGender?: StringNullableFilter<"ActivityLog"> | string | null
    actionType?: StringFilter<"ActivityLog"> | string
    description?: StringNullableFilter<"ActivityLog"> | string | null
    metadata?: StringNullableFilter<"ActivityLog"> | string | null
    ipAddress?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    userEmail?: SortOrderInput | SortOrder
    userName?: SortOrderInput | SortOrder
    userGender?: SortOrderInput | SortOrder
    actionType?: SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _avg?: ActivityLogAvgOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
    _sum?: ActivityLogSumOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"ActivityLog"> | bigint | number
    userId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    userEmail?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    userName?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    userGender?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    actionType?: StringWithAggregatesFilter<"ActivityLog"> | string
    description?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
    corporate?: CorporateProfileCreateNestedOneWithoutUserInput
    individual?: IndividualProfileCreateNestedOneWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
    corporate?: CorporateProfileUncheckedCreateNestedOneWithoutUserInput
    individual?: IndividualProfileUncheckedCreateNestedOneWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    corporate?: CorporateProfileUpdateOneWithoutUserNestedInput
    individual?: IndividualProfileUpdateOneWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    corporate?: CorporateProfileUncheckedUpdateOneWithoutUserNestedInput
    individual?: IndividualProfileUncheckedUpdateOneWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CorporateProfileCreateInput = {
    companyId?: bigint | number
    bizRegNumber: string
    companyNameOfficial: string
    ceoName: string
    foundingDate?: Date | string | null
    managerName: string
    managerPhone: string
    managerEmail: string
    verificationStatus?: $Enums.VerificationStatus
    verificationMethod?: $Enums.VerificationMethod | null
    proofDocumentUrl?: string | null
    brandName?: string | null
    logoImageUrl?: string | null
    companyIntro?: string | null
    ksicCode: string
    addressRoad: string
    companySizeType?: $Enums.CompanySizeType
    employeeCountKorean?: number
    employeeCountForeign?: number
    annualRevenue?: bigint | number
    isBizVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCorporateInput
    accessLogs?: TalentAccessLogCreateNestedManyWithoutCorporateInput
  }

  export type CorporateProfileUncheckedCreateInput = {
    companyId?: bigint | number
    authId: string
    bizRegNumber: string
    companyNameOfficial: string
    ceoName: string
    foundingDate?: Date | string | null
    managerName: string
    managerPhone: string
    managerEmail: string
    verificationStatus?: $Enums.VerificationStatus
    verificationMethod?: $Enums.VerificationMethod | null
    proofDocumentUrl?: string | null
    brandName?: string | null
    logoImageUrl?: string | null
    companyIntro?: string | null
    ksicCode: string
    addressRoad: string
    companySizeType?: $Enums.CompanySizeType
    employeeCountKorean?: number
    employeeCountForeign?: number
    annualRevenue?: bigint | number
    isBizVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutCorporateInput
  }

  export type CorporateProfileUpdateInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    bizRegNumber?: StringFieldUpdateOperationsInput | string
    companyNameOfficial?: StringFieldUpdateOperationsInput | string
    ceoName?: StringFieldUpdateOperationsInput | string
    foundingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    managerName?: StringFieldUpdateOperationsInput | string
    managerPhone?: StringFieldUpdateOperationsInput | string
    managerEmail?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verificationMethod?: NullableEnumVerificationMethodFieldUpdateOperationsInput | $Enums.VerificationMethod | null
    proofDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    brandName?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyIntro?: NullableStringFieldUpdateOperationsInput | string | null
    ksicCode?: StringFieldUpdateOperationsInput | string
    addressRoad?: StringFieldUpdateOperationsInput | string
    companySizeType?: EnumCompanySizeTypeFieldUpdateOperationsInput | $Enums.CompanySizeType
    employeeCountKorean?: IntFieldUpdateOperationsInput | number
    employeeCountForeign?: IntFieldUpdateOperationsInput | number
    annualRevenue?: BigIntFieldUpdateOperationsInput | bigint | number
    isBizVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCorporateNestedInput
    accessLogs?: TalentAccessLogUpdateManyWithoutCorporateNestedInput
  }

  export type CorporateProfileUncheckedUpdateInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    bizRegNumber?: StringFieldUpdateOperationsInput | string
    companyNameOfficial?: StringFieldUpdateOperationsInput | string
    ceoName?: StringFieldUpdateOperationsInput | string
    foundingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    managerName?: StringFieldUpdateOperationsInput | string
    managerPhone?: StringFieldUpdateOperationsInput | string
    managerEmail?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verificationMethod?: NullableEnumVerificationMethodFieldUpdateOperationsInput | $Enums.VerificationMethod | null
    proofDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    brandName?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyIntro?: NullableStringFieldUpdateOperationsInput | string | null
    ksicCode?: StringFieldUpdateOperationsInput | string
    addressRoad?: StringFieldUpdateOperationsInput | string
    companySizeType?: EnumCompanySizeTypeFieldUpdateOperationsInput | $Enums.CompanySizeType
    employeeCountKorean?: IntFieldUpdateOperationsInput | number
    employeeCountForeign?: IntFieldUpdateOperationsInput | number
    annualRevenue?: BigIntFieldUpdateOperationsInput | bigint | number
    isBizVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutCorporateNestedInput
  }

  export type CorporateProfileCreateManyInput = {
    companyId?: bigint | number
    authId: string
    bizRegNumber: string
    companyNameOfficial: string
    ceoName: string
    foundingDate?: Date | string | null
    managerName: string
    managerPhone: string
    managerEmail: string
    verificationStatus?: $Enums.VerificationStatus
    verificationMethod?: $Enums.VerificationMethod | null
    proofDocumentUrl?: string | null
    brandName?: string | null
    logoImageUrl?: string | null
    companyIntro?: string | null
    ksicCode: string
    addressRoad: string
    companySizeType?: $Enums.CompanySizeType
    employeeCountKorean?: number
    employeeCountForeign?: number
    annualRevenue?: bigint | number
    isBizVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CorporateProfileUpdateManyMutationInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    bizRegNumber?: StringFieldUpdateOperationsInput | string
    companyNameOfficial?: StringFieldUpdateOperationsInput | string
    ceoName?: StringFieldUpdateOperationsInput | string
    foundingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    managerName?: StringFieldUpdateOperationsInput | string
    managerPhone?: StringFieldUpdateOperationsInput | string
    managerEmail?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verificationMethod?: NullableEnumVerificationMethodFieldUpdateOperationsInput | $Enums.VerificationMethod | null
    proofDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    brandName?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyIntro?: NullableStringFieldUpdateOperationsInput | string | null
    ksicCode?: StringFieldUpdateOperationsInput | string
    addressRoad?: StringFieldUpdateOperationsInput | string
    companySizeType?: EnumCompanySizeTypeFieldUpdateOperationsInput | $Enums.CompanySizeType
    employeeCountKorean?: IntFieldUpdateOperationsInput | number
    employeeCountForeign?: IntFieldUpdateOperationsInput | number
    annualRevenue?: BigIntFieldUpdateOperationsInput | bigint | number
    isBizVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorporateProfileUncheckedUpdateManyInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    bizRegNumber?: StringFieldUpdateOperationsInput | string
    companyNameOfficial?: StringFieldUpdateOperationsInput | string
    ceoName?: StringFieldUpdateOperationsInput | string
    foundingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    managerName?: StringFieldUpdateOperationsInput | string
    managerPhone?: StringFieldUpdateOperationsInput | string
    managerEmail?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verificationMethod?: NullableEnumVerificationMethodFieldUpdateOperationsInput | $Enums.VerificationMethod | null
    proofDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    brandName?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyIntro?: NullableStringFieldUpdateOperationsInput | string | null
    ksicCode?: StringFieldUpdateOperationsInput | string
    addressRoad?: StringFieldUpdateOperationsInput | string
    companySizeType?: EnumCompanySizeTypeFieldUpdateOperationsInput | $Enums.CompanySizeType
    employeeCountKorean?: IntFieldUpdateOperationsInput | number
    employeeCountForeign?: IntFieldUpdateOperationsInput | number
    annualRevenue?: BigIntFieldUpdateOperationsInput | bigint | number
    isBizVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndividualProfileCreateInput = {
    individualId?: bigint | number
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutIndividualInput
    accessLogs?: TalentAccessLogCreateNestedManyWithoutIndividualInput
    educations?: ProfileEducationCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateInput = {
    individualId?: bigint | number
    authId: string
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput
    educations?: ProfileEducationUncheckedCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerUncheckedCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageUncheckedCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUpdateInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutIndividualNestedInput
    accessLogs?: TalentAccessLogUpdateManyWithoutIndividualNestedInput
    educations?: ProfileEducationUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutIndividualNestedInput
    educations?: ProfileEducationUncheckedUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUncheckedUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUncheckedUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileCreateManyInput = {
    individualId?: bigint | number
    authId: string
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IndividualProfileUpdateManyMutationInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndividualProfileUncheckedUpdateManyInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ProfileEducationCreateInput = {
    eduId?: bigint | number
    schoolName: string
    majorName: string
    degreeLevel: $Enums.EducationLevel
    startDate: Date | string
    graduationDate?: Date | string | null
    graduationStatus: $Enums.GraduationStatus
    gpaScore?: Decimal | DecimalJsLike | number | string | null
    individual: IndividualProfileCreateNestedOneWithoutEducationsInput
  }

  export type ProfileEducationUncheckedCreateInput = {
    eduId?: bigint | number
    individualId: bigint | number
    schoolName: string
    majorName: string
    degreeLevel: $Enums.EducationLevel
    startDate: Date | string
    graduationDate?: Date | string | null
    graduationStatus: $Enums.GraduationStatus
    gpaScore?: Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationUpdateInput = {
    eduId?: BigIntFieldUpdateOperationsInput | bigint | number
    schoolName?: StringFieldUpdateOperationsInput | string
    majorName?: StringFieldUpdateOperationsInput | string
    degreeLevel?: EnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    graduationStatus?: EnumGraduationStatusFieldUpdateOperationsInput | $Enums.GraduationStatus
    gpaScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    individual?: IndividualProfileUpdateOneRequiredWithoutEducationsNestedInput
  }

  export type ProfileEducationUncheckedUpdateInput = {
    eduId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    schoolName?: StringFieldUpdateOperationsInput | string
    majorName?: StringFieldUpdateOperationsInput | string
    degreeLevel?: EnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    graduationStatus?: EnumGraduationStatusFieldUpdateOperationsInput | $Enums.GraduationStatus
    gpaScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationCreateManyInput = {
    eduId?: bigint | number
    individualId: bigint | number
    schoolName: string
    majorName: string
    degreeLevel: $Enums.EducationLevel
    startDate: Date | string
    graduationDate?: Date | string | null
    graduationStatus: $Enums.GraduationStatus
    gpaScore?: Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationUpdateManyMutationInput = {
    eduId?: BigIntFieldUpdateOperationsInput | bigint | number
    schoolName?: StringFieldUpdateOperationsInput | string
    majorName?: StringFieldUpdateOperationsInput | string
    degreeLevel?: EnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    graduationStatus?: EnumGraduationStatusFieldUpdateOperationsInput | $Enums.GraduationStatus
    gpaScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationUncheckedUpdateManyInput = {
    eduId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    schoolName?: StringFieldUpdateOperationsInput | string
    majorName?: StringFieldUpdateOperationsInput | string
    degreeLevel?: EnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    graduationStatus?: EnumGraduationStatusFieldUpdateOperationsInput | $Enums.GraduationStatus
    gpaScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileCareerCreateInput = {
    careerId?: bigint | number
    companyName: string
    dutyRole: string
    jobPosition?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    description?: string | null
    individual: IndividualProfileCreateNestedOneWithoutCareersInput
  }

  export type ProfileCareerUncheckedCreateInput = {
    careerId?: bigint | number
    individualId: bigint | number
    companyName: string
    dutyRole: string
    jobPosition?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    description?: string | null
  }

  export type ProfileCareerUpdateInput = {
    careerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    dutyRole?: StringFieldUpdateOperationsInput | string
    jobPosition?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    individual?: IndividualProfileUpdateOneRequiredWithoutCareersNestedInput
  }

  export type ProfileCareerUncheckedUpdateInput = {
    careerId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    dutyRole?: StringFieldUpdateOperationsInput | string
    jobPosition?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileCareerCreateManyInput = {
    careerId?: bigint | number
    individualId: bigint | number
    companyName: string
    dutyRole: string
    jobPosition?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    description?: string | null
  }

  export type ProfileCareerUpdateManyMutationInput = {
    careerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    dutyRole?: StringFieldUpdateOperationsInput | string
    jobPosition?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileCareerUncheckedUpdateManyInput = {
    careerId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    dutyRole?: StringFieldUpdateOperationsInput | string
    jobPosition?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileLanguageCreateInput = {
    langId?: bigint | number
    languageType: string
    testType?: string | null
    scoreLevel: string
    obtainedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
    individual: IndividualProfileCreateNestedOneWithoutLanguagesInput
  }

  export type ProfileLanguageUncheckedCreateInput = {
    langId?: bigint | number
    individualId: bigint | number
    languageType: string
    testType?: string | null
    scoreLevel: string
    obtainedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
  }

  export type ProfileLanguageUpdateInput = {
    langId?: BigIntFieldUpdateOperationsInput | bigint | number
    languageType?: StringFieldUpdateOperationsInput | string
    testType?: NullableStringFieldUpdateOperationsInput | string | null
    scoreLevel?: StringFieldUpdateOperationsInput | string
    obtainedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    individual?: IndividualProfileUpdateOneRequiredWithoutLanguagesNestedInput
  }

  export type ProfileLanguageUncheckedUpdateInput = {
    langId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    languageType?: StringFieldUpdateOperationsInput | string
    testType?: NullableStringFieldUpdateOperationsInput | string | null
    scoreLevel?: StringFieldUpdateOperationsInput | string
    obtainedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProfileLanguageCreateManyInput = {
    langId?: bigint | number
    individualId: bigint | number
    languageType: string
    testType?: string | null
    scoreLevel: string
    obtainedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
  }

  export type ProfileLanguageUpdateManyMutationInput = {
    langId?: BigIntFieldUpdateOperationsInput | bigint | number
    languageType?: StringFieldUpdateOperationsInput | string
    testType?: NullableStringFieldUpdateOperationsInput | string | null
    scoreLevel?: StringFieldUpdateOperationsInput | string
    obtainedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProfileLanguageUncheckedUpdateManyInput = {
    langId?: BigIntFieldUpdateOperationsInput | bigint | number
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    languageType?: StringFieldUpdateOperationsInput | string
    testType?: NullableStringFieldUpdateOperationsInput | string | null
    scoreLevel?: StringFieldUpdateOperationsInput | string
    obtainedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SupportTicketCreateInput = {
    id?: bigint | number
    title: string
    content: string
    status?: $Enums.TicketStatus
    answer?: string | null
    answeredAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSupportTicketsInput
  }

  export type SupportTicketUncheckedCreateInput = {
    id?: bigint | number
    userId: string
    title: string
    content: string
    status?: $Enums.TicketStatus
    answer?: string | null
    answeredAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SupportTicketUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSupportTicketsNestedInput
  }

  export type SupportTicketUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketCreateManyInput = {
    id?: bigint | number
    userId: string
    title: string
    content: string
    status?: $Enums.TicketStatus
    answer?: string | null
    answeredAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SupportTicketUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateInput = {
    id?: bigint | number
    userId?: string | null
    userEmail?: string | null
    userName?: string | null
    userGender?: string | null
    actionType: string
    description?: string | null
    metadata?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: bigint | number
    userId?: string | null
    userEmail?: string | null
    userName?: string | null
    userGender?: string | null
    actionType: string
    description?: string | null
    metadata?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userEmail?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userGender?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userEmail?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userGender?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: bigint | number
    userId?: string | null
    userEmail?: string | null
    userName?: string | null
    userGender?: string | null
    actionType: string
    description?: string | null
    metadata?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userEmail?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userGender?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userEmail?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    userGender?: NullableStringFieldUpdateOperationsInput | string | null
    actionType?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
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
  }

  export type EnumSocialProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderFilter<$PrismaModel> | $Enums.SocialProvider
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
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

  export type CorporateProfileNullableScalarRelationFilter = {
    is?: CorporateProfileWhereInput | null
    isNot?: CorporateProfileWhereInput | null
  }

  export type IndividualProfileNullableScalarRelationFilter = {
    is?: IndividualProfileWhereInput | null
    isNot?: IndividualProfileWhereInput | null
  }

  export type SupportTicketListRelationFilter = {
    every?: SupportTicketWhereInput
    some?: SupportTicketWhereInput
    none?: SupportTicketWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SupportTicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserSocialProviderSocialProviderIdCompoundUniqueInput = {
    socialProvider: $Enums.SocialProvider
    socialProviderId: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    socialProvider?: SortOrder
    socialProviderId?: SortOrder
    userType?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    lastLoginAt?: SortOrder
    deletedAt?: SortOrder
    deleteScheduledAt?: SortOrder
    notifSms?: SortOrder
    notifEmail?: SortOrder
    notifKakao?: SortOrder
    notifEnabledAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    socialProvider?: SortOrder
    socialProviderId?: SortOrder
    userType?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    lastLoginAt?: SortOrder
    deletedAt?: SortOrder
    deleteScheduledAt?: SortOrder
    notifSms?: SortOrder
    notifEmail?: SortOrder
    notifKakao?: SortOrder
    notifEnabledAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    socialProvider?: SortOrder
    socialProviderId?: SortOrder
    userType?: SortOrder
    isActive?: SortOrder
    joinedAt?: SortOrder
    lastLoginAt?: SortOrder
    deletedAt?: SortOrder
    deleteScheduledAt?: SortOrder
    notifSms?: SortOrder
    notifEmail?: SortOrder
    notifKakao?: SortOrder
    notifEnabledAt?: SortOrder
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

  export type EnumSocialProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderWithAggregatesFilter<$PrismaModel> | $Enums.SocialProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSocialProviderFilter<$PrismaModel>
    _max?: NestedEnumSocialProviderFilter<$PrismaModel>
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

  export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type EnumVerificationMethodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationMethod | EnumVerificationMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.VerificationMethod[] | ListEnumVerificationMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.VerificationMethod[] | ListEnumVerificationMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumVerificationMethodNullableFilter<$PrismaModel> | $Enums.VerificationMethod | null
  }

  export type EnumCompanySizeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanySizeType | EnumCompanySizeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CompanySizeType[] | ListEnumCompanySizeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanySizeType[] | ListEnumCompanySizeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanySizeTypeFilter<$PrismaModel> | $Enums.CompanySizeType
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
    authId?: SortOrder
    bizRegNumber?: SortOrder
    companyNameOfficial?: SortOrder
    ceoName?: SortOrder
    foundingDate?: SortOrder
    managerName?: SortOrder
    managerPhone?: SortOrder
    managerEmail?: SortOrder
    verificationStatus?: SortOrder
    verificationMethod?: SortOrder
    proofDocumentUrl?: SortOrder
    brandName?: SortOrder
    logoImageUrl?: SortOrder
    companyIntro?: SortOrder
    ksicCode?: SortOrder
    addressRoad?: SortOrder
    companySizeType?: SortOrder
    employeeCountKorean?: SortOrder
    employeeCountForeign?: SortOrder
    annualRevenue?: SortOrder
    isBizVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CorporateProfileAvgOrderByAggregateInput = {
    companyId?: SortOrder
    employeeCountKorean?: SortOrder
    employeeCountForeign?: SortOrder
    annualRevenue?: SortOrder
  }

  export type CorporateProfileMaxOrderByAggregateInput = {
    companyId?: SortOrder
    authId?: SortOrder
    bizRegNumber?: SortOrder
    companyNameOfficial?: SortOrder
    ceoName?: SortOrder
    foundingDate?: SortOrder
    managerName?: SortOrder
    managerPhone?: SortOrder
    managerEmail?: SortOrder
    verificationStatus?: SortOrder
    verificationMethod?: SortOrder
    proofDocumentUrl?: SortOrder
    brandName?: SortOrder
    logoImageUrl?: SortOrder
    companyIntro?: SortOrder
    ksicCode?: SortOrder
    addressRoad?: SortOrder
    companySizeType?: SortOrder
    employeeCountKorean?: SortOrder
    employeeCountForeign?: SortOrder
    annualRevenue?: SortOrder
    isBizVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CorporateProfileMinOrderByAggregateInput = {
    companyId?: SortOrder
    authId?: SortOrder
    bizRegNumber?: SortOrder
    companyNameOfficial?: SortOrder
    ceoName?: SortOrder
    foundingDate?: SortOrder
    managerName?: SortOrder
    managerPhone?: SortOrder
    managerEmail?: SortOrder
    verificationStatus?: SortOrder
    verificationMethod?: SortOrder
    proofDocumentUrl?: SortOrder
    brandName?: SortOrder
    logoImageUrl?: SortOrder
    companyIntro?: SortOrder
    ksicCode?: SortOrder
    addressRoad?: SortOrder
    companySizeType?: SortOrder
    employeeCountKorean?: SortOrder
    employeeCountForeign?: SortOrder
    annualRevenue?: SortOrder
    isBizVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CorporateProfileSumOrderByAggregateInput = {
    companyId?: SortOrder
    employeeCountKorean?: SortOrder
    employeeCountForeign?: SortOrder
    annualRevenue?: SortOrder
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

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type EnumVerificationMethodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationMethod | EnumVerificationMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.VerificationMethod[] | ListEnumVerificationMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.VerificationMethod[] | ListEnumVerificationMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumVerificationMethodNullableWithAggregatesFilter<$PrismaModel> | $Enums.VerificationMethod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumVerificationMethodNullableFilter<$PrismaModel>
    _max?: NestedEnumVerificationMethodNullableFilter<$PrismaModel>
  }

  export type EnumCompanySizeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanySizeType | EnumCompanySizeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CompanySizeType[] | ListEnumCompanySizeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanySizeType[] | ListEnumCompanySizeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanySizeTypeWithAggregatesFilter<$PrismaModel> | $Enums.CompanySizeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompanySizeTypeFilter<$PrismaModel>
    _max?: NestedEnumCompanySizeTypeFilter<$PrismaModel>
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

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type EnumDesiredJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DesiredJobType | EnumDesiredJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DesiredJobType[] | ListEnumDesiredJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DesiredJobType[] | ListEnumDesiredJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDesiredJobTypeFilter<$PrismaModel> | $Enums.DesiredJobType
  }

  export type EnumEducationLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableFilter<$PrismaModel> | $Enums.EducationLevel | null
  }

  export type EnumKoreanFluencyLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.KoreanFluencyLevel | EnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.KoreanFluencyLevel[] | ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.KoreanFluencyLevel[] | ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumKoreanFluencyLevelNullableFilter<$PrismaModel> | $Enums.KoreanFluencyLevel | null
  }

  export type ProfileEducationListRelationFilter = {
    every?: ProfileEducationWhereInput
    some?: ProfileEducationWhereInput
    none?: ProfileEducationWhereInput
  }

  export type ProfileCareerListRelationFilter = {
    every?: ProfileCareerWhereInput
    some?: ProfileCareerWhereInput
    none?: ProfileCareerWhereInput
  }

  export type ProfileLanguageListRelationFilter = {
    every?: ProfileLanguageWhereInput
    some?: ProfileLanguageWhereInput
    none?: ProfileLanguageWhereInput
  }

  export type ProfileEducationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCareerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileLanguageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IndividualProfileCountOrderByAggregateInput = {
    individualId?: SortOrder
    authId?: SortOrder
    realName?: SortOrder
    nationality?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    addressRoad?: SortOrder
    visaType?: SortOrder
    visaExpiryDate?: SortOrder
    desiredJobType?: SortOrder
    desiredSalary?: SortOrder
    desiredIndustries?: SortOrder
    isOpenToScout?: SortOrder
    finalEducationLvl?: SortOrder
    koreanFluencyLvl?: SortOrder
    totalCareerMonths?: SortOrder
    profileImageUrl?: SortOrder
    resumeFileUrl?: SortOrder
    portfolioUrl?: SortOrder
    selfIntro?: SortOrder
    isProfileCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IndividualProfileAvgOrderByAggregateInput = {
    individualId?: SortOrder
    desiredSalary?: SortOrder
    totalCareerMonths?: SortOrder
  }

  export type IndividualProfileMaxOrderByAggregateInput = {
    individualId?: SortOrder
    authId?: SortOrder
    realName?: SortOrder
    nationality?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    addressRoad?: SortOrder
    visaType?: SortOrder
    visaExpiryDate?: SortOrder
    desiredJobType?: SortOrder
    desiredSalary?: SortOrder
    desiredIndustries?: SortOrder
    isOpenToScout?: SortOrder
    finalEducationLvl?: SortOrder
    koreanFluencyLvl?: SortOrder
    totalCareerMonths?: SortOrder
    profileImageUrl?: SortOrder
    resumeFileUrl?: SortOrder
    portfolioUrl?: SortOrder
    selfIntro?: SortOrder
    isProfileCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IndividualProfileMinOrderByAggregateInput = {
    individualId?: SortOrder
    authId?: SortOrder
    realName?: SortOrder
    nationality?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    addressRoad?: SortOrder
    visaType?: SortOrder
    visaExpiryDate?: SortOrder
    desiredJobType?: SortOrder
    desiredSalary?: SortOrder
    desiredIndustries?: SortOrder
    isOpenToScout?: SortOrder
    finalEducationLvl?: SortOrder
    koreanFluencyLvl?: SortOrder
    totalCareerMonths?: SortOrder
    profileImageUrl?: SortOrder
    resumeFileUrl?: SortOrder
    portfolioUrl?: SortOrder
    selfIntro?: SortOrder
    isProfileCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IndividualProfileSumOrderByAggregateInput = {
    individualId?: SortOrder
    desiredSalary?: SortOrder
    totalCareerMonths?: SortOrder
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type EnumDesiredJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DesiredJobType | EnumDesiredJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DesiredJobType[] | ListEnumDesiredJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DesiredJobType[] | ListEnumDesiredJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDesiredJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.DesiredJobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDesiredJobTypeFilter<$PrismaModel>
    _max?: NestedEnumDesiredJobTypeFilter<$PrismaModel>
  }

  export type EnumEducationLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.EducationLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
  }

  export type EnumKoreanFluencyLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KoreanFluencyLevel | EnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.KoreanFluencyLevel[] | ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.KoreanFluencyLevel[] | ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumKoreanFluencyLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.KoreanFluencyLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumKoreanFluencyLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumKoreanFluencyLevelNullableFilter<$PrismaModel>
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

  export type EnumEducationLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel>
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumEducationLevelFilter<$PrismaModel> | $Enums.EducationLevel
  }

  export type EnumGraduationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GraduationStatus | EnumGraduationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GraduationStatus[] | ListEnumGraduationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GraduationStatus[] | ListEnumGraduationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGraduationStatusFilter<$PrismaModel> | $Enums.GraduationStatus
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationCountOrderByAggregateInput = {
    eduId?: SortOrder
    individualId?: SortOrder
    schoolName?: SortOrder
    majorName?: SortOrder
    degreeLevel?: SortOrder
    startDate?: SortOrder
    graduationDate?: SortOrder
    graduationStatus?: SortOrder
    gpaScore?: SortOrder
  }

  export type ProfileEducationAvgOrderByAggregateInput = {
    eduId?: SortOrder
    individualId?: SortOrder
    gpaScore?: SortOrder
  }

  export type ProfileEducationMaxOrderByAggregateInput = {
    eduId?: SortOrder
    individualId?: SortOrder
    schoolName?: SortOrder
    majorName?: SortOrder
    degreeLevel?: SortOrder
    startDate?: SortOrder
    graduationDate?: SortOrder
    graduationStatus?: SortOrder
    gpaScore?: SortOrder
  }

  export type ProfileEducationMinOrderByAggregateInput = {
    eduId?: SortOrder
    individualId?: SortOrder
    schoolName?: SortOrder
    majorName?: SortOrder
    degreeLevel?: SortOrder
    startDate?: SortOrder
    graduationDate?: SortOrder
    graduationStatus?: SortOrder
    gpaScore?: SortOrder
  }

  export type ProfileEducationSumOrderByAggregateInput = {
    eduId?: SortOrder
    individualId?: SortOrder
    gpaScore?: SortOrder
  }

  export type EnumEducationLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel>
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumEducationLevelWithAggregatesFilter<$PrismaModel> | $Enums.EducationLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEducationLevelFilter<$PrismaModel>
    _max?: NestedEnumEducationLevelFilter<$PrismaModel>
  }

  export type EnumGraduationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GraduationStatus | EnumGraduationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GraduationStatus[] | ListEnumGraduationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GraduationStatus[] | ListEnumGraduationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGraduationStatusWithAggregatesFilter<$PrismaModel> | $Enums.GraduationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGraduationStatusFilter<$PrismaModel>
    _max?: NestedEnumGraduationStatusFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type ProfileCareerCountOrderByAggregateInput = {
    careerId?: SortOrder
    individualId?: SortOrder
    companyName?: SortOrder
    dutyRole?: SortOrder
    jobPosition?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    description?: SortOrder
  }

  export type ProfileCareerAvgOrderByAggregateInput = {
    careerId?: SortOrder
    individualId?: SortOrder
  }

  export type ProfileCareerMaxOrderByAggregateInput = {
    careerId?: SortOrder
    individualId?: SortOrder
    companyName?: SortOrder
    dutyRole?: SortOrder
    jobPosition?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    description?: SortOrder
  }

  export type ProfileCareerMinOrderByAggregateInput = {
    careerId?: SortOrder
    individualId?: SortOrder
    companyName?: SortOrder
    dutyRole?: SortOrder
    jobPosition?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    description?: SortOrder
  }

  export type ProfileCareerSumOrderByAggregateInput = {
    careerId?: SortOrder
    individualId?: SortOrder
  }

  export type ProfileLanguageCountOrderByAggregateInput = {
    langId?: SortOrder
    individualId?: SortOrder
    languageType?: SortOrder
    testType?: SortOrder
    scoreLevel?: SortOrder
    obtainedDate?: SortOrder
    expiryDate?: SortOrder
    isVerified?: SortOrder
  }

  export type ProfileLanguageAvgOrderByAggregateInput = {
    langId?: SortOrder
    individualId?: SortOrder
  }

  export type ProfileLanguageMaxOrderByAggregateInput = {
    langId?: SortOrder
    individualId?: SortOrder
    languageType?: SortOrder
    testType?: SortOrder
    scoreLevel?: SortOrder
    obtainedDate?: SortOrder
    expiryDate?: SortOrder
    isVerified?: SortOrder
  }

  export type ProfileLanguageMinOrderByAggregateInput = {
    langId?: SortOrder
    individualId?: SortOrder
    languageType?: SortOrder
    testType?: SortOrder
    scoreLevel?: SortOrder
    obtainedDate?: SortOrder
    expiryDate?: SortOrder
    isVerified?: SortOrder
  }

  export type ProfileLanguageSumOrderByAggregateInput = {
    langId?: SortOrder
    individualId?: SortOrder
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type SupportTicketCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    answer?: SortOrder
    answeredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportTicketAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SupportTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    answer?: SortOrder
    answeredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportTicketMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    answer?: SortOrder
    answeredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SupportTicketSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    userName?: SortOrder
    userGender?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    userName?: SortOrder
    userGender?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    userName?: SortOrder
    userGender?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type SupportTicketCreateNestedManyWithoutUserInput = {
    create?: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput> | SupportTicketCreateWithoutUserInput[] | SupportTicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUserInput | SupportTicketCreateOrConnectWithoutUserInput[]
    createMany?: SupportTicketCreateManyUserInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
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

  export type SupportTicketUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput> | SupportTicketCreateWithoutUserInput[] | SupportTicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUserInput | SupportTicketCreateOrConnectWithoutUserInput[]
    createMany?: SupportTicketCreateManyUserInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumSocialProviderFieldUpdateOperationsInput = {
    set?: $Enums.SocialProvider
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type SupportTicketUpdateManyWithoutUserNestedInput = {
    create?: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput> | SupportTicketCreateWithoutUserInput[] | SupportTicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUserInput | SupportTicketCreateOrConnectWithoutUserInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutUserInput | SupportTicketUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SupportTicketCreateManyUserInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutUserInput | SupportTicketUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutUserInput | SupportTicketUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
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

  export type SupportTicketUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput> | SupportTicketCreateWithoutUserInput[] | SupportTicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUserInput | SupportTicketCreateOrConnectWithoutUserInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutUserInput | SupportTicketUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SupportTicketCreateManyUserInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutUserInput | SupportTicketUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutUserInput | SupportTicketUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
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

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type NullableEnumVerificationMethodFieldUpdateOperationsInput = {
    set?: $Enums.VerificationMethod | null
  }

  export type EnumCompanySizeTypeFieldUpdateOperationsInput = {
    set?: $Enums.CompanySizeType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type ProfileEducationCreateNestedManyWithoutIndividualInput = {
    create?: XOR<ProfileEducationCreateWithoutIndividualInput, ProfileEducationUncheckedCreateWithoutIndividualInput> | ProfileEducationCreateWithoutIndividualInput[] | ProfileEducationUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileEducationCreateOrConnectWithoutIndividualInput | ProfileEducationCreateOrConnectWithoutIndividualInput[]
    createMany?: ProfileEducationCreateManyIndividualInputEnvelope
    connect?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
  }

  export type ProfileCareerCreateNestedManyWithoutIndividualInput = {
    create?: XOR<ProfileCareerCreateWithoutIndividualInput, ProfileCareerUncheckedCreateWithoutIndividualInput> | ProfileCareerCreateWithoutIndividualInput[] | ProfileCareerUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileCareerCreateOrConnectWithoutIndividualInput | ProfileCareerCreateOrConnectWithoutIndividualInput[]
    createMany?: ProfileCareerCreateManyIndividualInputEnvelope
    connect?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
  }

  export type ProfileLanguageCreateNestedManyWithoutIndividualInput = {
    create?: XOR<ProfileLanguageCreateWithoutIndividualInput, ProfileLanguageUncheckedCreateWithoutIndividualInput> | ProfileLanguageCreateWithoutIndividualInput[] | ProfileLanguageUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileLanguageCreateOrConnectWithoutIndividualInput | ProfileLanguageCreateOrConnectWithoutIndividualInput[]
    createMany?: ProfileLanguageCreateManyIndividualInputEnvelope
    connect?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
  }

  export type TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput = {
    create?: XOR<TalentAccessLogCreateWithoutIndividualInput, TalentAccessLogUncheckedCreateWithoutIndividualInput> | TalentAccessLogCreateWithoutIndividualInput[] | TalentAccessLogUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: TalentAccessLogCreateOrConnectWithoutIndividualInput | TalentAccessLogCreateOrConnectWithoutIndividualInput[]
    createMany?: TalentAccessLogCreateManyIndividualInputEnvelope
    connect?: TalentAccessLogWhereUniqueInput | TalentAccessLogWhereUniqueInput[]
  }

  export type ProfileEducationUncheckedCreateNestedManyWithoutIndividualInput = {
    create?: XOR<ProfileEducationCreateWithoutIndividualInput, ProfileEducationUncheckedCreateWithoutIndividualInput> | ProfileEducationCreateWithoutIndividualInput[] | ProfileEducationUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileEducationCreateOrConnectWithoutIndividualInput | ProfileEducationCreateOrConnectWithoutIndividualInput[]
    createMany?: ProfileEducationCreateManyIndividualInputEnvelope
    connect?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
  }

  export type ProfileCareerUncheckedCreateNestedManyWithoutIndividualInput = {
    create?: XOR<ProfileCareerCreateWithoutIndividualInput, ProfileCareerUncheckedCreateWithoutIndividualInput> | ProfileCareerCreateWithoutIndividualInput[] | ProfileCareerUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileCareerCreateOrConnectWithoutIndividualInput | ProfileCareerCreateOrConnectWithoutIndividualInput[]
    createMany?: ProfileCareerCreateManyIndividualInputEnvelope
    connect?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
  }

  export type ProfileLanguageUncheckedCreateNestedManyWithoutIndividualInput = {
    create?: XOR<ProfileLanguageCreateWithoutIndividualInput, ProfileLanguageUncheckedCreateWithoutIndividualInput> | ProfileLanguageCreateWithoutIndividualInput[] | ProfileLanguageUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileLanguageCreateOrConnectWithoutIndividualInput | ProfileLanguageCreateOrConnectWithoutIndividualInput[]
    createMany?: ProfileLanguageCreateManyIndividualInputEnvelope
    connect?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type EnumDesiredJobTypeFieldUpdateOperationsInput = {
    set?: $Enums.DesiredJobType
  }

  export type NullableEnumEducationLevelFieldUpdateOperationsInput = {
    set?: $Enums.EducationLevel | null
  }

  export type NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput = {
    set?: $Enums.KoreanFluencyLevel | null
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

  export type ProfileEducationUpdateManyWithoutIndividualNestedInput = {
    create?: XOR<ProfileEducationCreateWithoutIndividualInput, ProfileEducationUncheckedCreateWithoutIndividualInput> | ProfileEducationCreateWithoutIndividualInput[] | ProfileEducationUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileEducationCreateOrConnectWithoutIndividualInput | ProfileEducationCreateOrConnectWithoutIndividualInput[]
    upsert?: ProfileEducationUpsertWithWhereUniqueWithoutIndividualInput | ProfileEducationUpsertWithWhereUniqueWithoutIndividualInput[]
    createMany?: ProfileEducationCreateManyIndividualInputEnvelope
    set?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
    disconnect?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
    delete?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
    connect?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
    update?: ProfileEducationUpdateWithWhereUniqueWithoutIndividualInput | ProfileEducationUpdateWithWhereUniqueWithoutIndividualInput[]
    updateMany?: ProfileEducationUpdateManyWithWhereWithoutIndividualInput | ProfileEducationUpdateManyWithWhereWithoutIndividualInput[]
    deleteMany?: ProfileEducationScalarWhereInput | ProfileEducationScalarWhereInput[]
  }

  export type ProfileCareerUpdateManyWithoutIndividualNestedInput = {
    create?: XOR<ProfileCareerCreateWithoutIndividualInput, ProfileCareerUncheckedCreateWithoutIndividualInput> | ProfileCareerCreateWithoutIndividualInput[] | ProfileCareerUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileCareerCreateOrConnectWithoutIndividualInput | ProfileCareerCreateOrConnectWithoutIndividualInput[]
    upsert?: ProfileCareerUpsertWithWhereUniqueWithoutIndividualInput | ProfileCareerUpsertWithWhereUniqueWithoutIndividualInput[]
    createMany?: ProfileCareerCreateManyIndividualInputEnvelope
    set?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
    disconnect?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
    delete?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
    connect?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
    update?: ProfileCareerUpdateWithWhereUniqueWithoutIndividualInput | ProfileCareerUpdateWithWhereUniqueWithoutIndividualInput[]
    updateMany?: ProfileCareerUpdateManyWithWhereWithoutIndividualInput | ProfileCareerUpdateManyWithWhereWithoutIndividualInput[]
    deleteMany?: ProfileCareerScalarWhereInput | ProfileCareerScalarWhereInput[]
  }

  export type ProfileLanguageUpdateManyWithoutIndividualNestedInput = {
    create?: XOR<ProfileLanguageCreateWithoutIndividualInput, ProfileLanguageUncheckedCreateWithoutIndividualInput> | ProfileLanguageCreateWithoutIndividualInput[] | ProfileLanguageUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileLanguageCreateOrConnectWithoutIndividualInput | ProfileLanguageCreateOrConnectWithoutIndividualInput[]
    upsert?: ProfileLanguageUpsertWithWhereUniqueWithoutIndividualInput | ProfileLanguageUpsertWithWhereUniqueWithoutIndividualInput[]
    createMany?: ProfileLanguageCreateManyIndividualInputEnvelope
    set?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
    disconnect?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
    delete?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
    connect?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
    update?: ProfileLanguageUpdateWithWhereUniqueWithoutIndividualInput | ProfileLanguageUpdateWithWhereUniqueWithoutIndividualInput[]
    updateMany?: ProfileLanguageUpdateManyWithWhereWithoutIndividualInput | ProfileLanguageUpdateManyWithWhereWithoutIndividualInput[]
    deleteMany?: ProfileLanguageScalarWhereInput | ProfileLanguageScalarWhereInput[]
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

  export type ProfileEducationUncheckedUpdateManyWithoutIndividualNestedInput = {
    create?: XOR<ProfileEducationCreateWithoutIndividualInput, ProfileEducationUncheckedCreateWithoutIndividualInput> | ProfileEducationCreateWithoutIndividualInput[] | ProfileEducationUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileEducationCreateOrConnectWithoutIndividualInput | ProfileEducationCreateOrConnectWithoutIndividualInput[]
    upsert?: ProfileEducationUpsertWithWhereUniqueWithoutIndividualInput | ProfileEducationUpsertWithWhereUniqueWithoutIndividualInput[]
    createMany?: ProfileEducationCreateManyIndividualInputEnvelope
    set?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
    disconnect?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
    delete?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
    connect?: ProfileEducationWhereUniqueInput | ProfileEducationWhereUniqueInput[]
    update?: ProfileEducationUpdateWithWhereUniqueWithoutIndividualInput | ProfileEducationUpdateWithWhereUniqueWithoutIndividualInput[]
    updateMany?: ProfileEducationUpdateManyWithWhereWithoutIndividualInput | ProfileEducationUpdateManyWithWhereWithoutIndividualInput[]
    deleteMany?: ProfileEducationScalarWhereInput | ProfileEducationScalarWhereInput[]
  }

  export type ProfileCareerUncheckedUpdateManyWithoutIndividualNestedInput = {
    create?: XOR<ProfileCareerCreateWithoutIndividualInput, ProfileCareerUncheckedCreateWithoutIndividualInput> | ProfileCareerCreateWithoutIndividualInput[] | ProfileCareerUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileCareerCreateOrConnectWithoutIndividualInput | ProfileCareerCreateOrConnectWithoutIndividualInput[]
    upsert?: ProfileCareerUpsertWithWhereUniqueWithoutIndividualInput | ProfileCareerUpsertWithWhereUniqueWithoutIndividualInput[]
    createMany?: ProfileCareerCreateManyIndividualInputEnvelope
    set?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
    disconnect?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
    delete?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
    connect?: ProfileCareerWhereUniqueInput | ProfileCareerWhereUniqueInput[]
    update?: ProfileCareerUpdateWithWhereUniqueWithoutIndividualInput | ProfileCareerUpdateWithWhereUniqueWithoutIndividualInput[]
    updateMany?: ProfileCareerUpdateManyWithWhereWithoutIndividualInput | ProfileCareerUpdateManyWithWhereWithoutIndividualInput[]
    deleteMany?: ProfileCareerScalarWhereInput | ProfileCareerScalarWhereInput[]
  }

  export type ProfileLanguageUncheckedUpdateManyWithoutIndividualNestedInput = {
    create?: XOR<ProfileLanguageCreateWithoutIndividualInput, ProfileLanguageUncheckedCreateWithoutIndividualInput> | ProfileLanguageCreateWithoutIndividualInput[] | ProfileLanguageUncheckedCreateWithoutIndividualInput[]
    connectOrCreate?: ProfileLanguageCreateOrConnectWithoutIndividualInput | ProfileLanguageCreateOrConnectWithoutIndividualInput[]
    upsert?: ProfileLanguageUpsertWithWhereUniqueWithoutIndividualInput | ProfileLanguageUpsertWithWhereUniqueWithoutIndividualInput[]
    createMany?: ProfileLanguageCreateManyIndividualInputEnvelope
    set?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
    disconnect?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
    delete?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
    connect?: ProfileLanguageWhereUniqueInput | ProfileLanguageWhereUniqueInput[]
    update?: ProfileLanguageUpdateWithWhereUniqueWithoutIndividualInput | ProfileLanguageUpdateWithWhereUniqueWithoutIndividualInput[]
    updateMany?: ProfileLanguageUpdateManyWithWhereWithoutIndividualInput | ProfileLanguageUpdateManyWithWhereWithoutIndividualInput[]
    deleteMany?: ProfileLanguageScalarWhereInput | ProfileLanguageScalarWhereInput[]
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

  export type IndividualProfileCreateNestedOneWithoutEducationsInput = {
    create?: XOR<IndividualProfileCreateWithoutEducationsInput, IndividualProfileUncheckedCreateWithoutEducationsInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutEducationsInput
    connect?: IndividualProfileWhereUniqueInput
  }

  export type EnumEducationLevelFieldUpdateOperationsInput = {
    set?: $Enums.EducationLevel
  }

  export type EnumGraduationStatusFieldUpdateOperationsInput = {
    set?: $Enums.GraduationStatus
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IndividualProfileUpdateOneRequiredWithoutEducationsNestedInput = {
    create?: XOR<IndividualProfileCreateWithoutEducationsInput, IndividualProfileUncheckedCreateWithoutEducationsInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutEducationsInput
    upsert?: IndividualProfileUpsertWithoutEducationsInput
    connect?: IndividualProfileWhereUniqueInput
    update?: XOR<XOR<IndividualProfileUpdateToOneWithWhereWithoutEducationsInput, IndividualProfileUpdateWithoutEducationsInput>, IndividualProfileUncheckedUpdateWithoutEducationsInput>
  }

  export type IndividualProfileCreateNestedOneWithoutCareersInput = {
    create?: XOR<IndividualProfileCreateWithoutCareersInput, IndividualProfileUncheckedCreateWithoutCareersInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutCareersInput
    connect?: IndividualProfileWhereUniqueInput
  }

  export type IndividualProfileUpdateOneRequiredWithoutCareersNestedInput = {
    create?: XOR<IndividualProfileCreateWithoutCareersInput, IndividualProfileUncheckedCreateWithoutCareersInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutCareersInput
    upsert?: IndividualProfileUpsertWithoutCareersInput
    connect?: IndividualProfileWhereUniqueInput
    update?: XOR<XOR<IndividualProfileUpdateToOneWithWhereWithoutCareersInput, IndividualProfileUpdateWithoutCareersInput>, IndividualProfileUncheckedUpdateWithoutCareersInput>
  }

  export type IndividualProfileCreateNestedOneWithoutLanguagesInput = {
    create?: XOR<IndividualProfileCreateWithoutLanguagesInput, IndividualProfileUncheckedCreateWithoutLanguagesInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutLanguagesInput
    connect?: IndividualProfileWhereUniqueInput
  }

  export type IndividualProfileUpdateOneRequiredWithoutLanguagesNestedInput = {
    create?: XOR<IndividualProfileCreateWithoutLanguagesInput, IndividualProfileUncheckedCreateWithoutLanguagesInput>
    connectOrCreate?: IndividualProfileCreateOrConnectWithoutLanguagesInput
    upsert?: IndividualProfileUpsertWithoutLanguagesInput
    connect?: IndividualProfileWhereUniqueInput
    update?: XOR<XOR<IndividualProfileUpdateToOneWithWhereWithoutLanguagesInput, IndividualProfileUpdateWithoutLanguagesInput>, IndividualProfileUncheckedUpdateWithoutLanguagesInput>
  }

  export type UserCreateNestedOneWithoutSupportTicketsInput = {
    create?: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupportTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type UserUpdateOneRequiredWithoutSupportTicketsNestedInput = {
    create?: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupportTicketsInput
    upsert?: UserUpsertWithoutSupportTicketsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSupportTicketsInput, UserUpdateWithoutSupportTicketsInput>, UserUncheckedUpdateWithoutSupportTicketsInput>
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

  export type NestedEnumSocialProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderFilter<$PrismaModel> | $Enums.SocialProvider
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserType[] | ListEnumUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
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

  export type NestedEnumSocialProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SocialProvider | EnumSocialProviderFieldRefInput<$PrismaModel>
    in?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.SocialProvider[] | ListEnumSocialProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumSocialProviderWithAggregatesFilter<$PrismaModel> | $Enums.SocialProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSocialProviderFilter<$PrismaModel>
    _max?: NestedEnumSocialProviderFilter<$PrismaModel>
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

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type NestedEnumVerificationMethodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationMethod | EnumVerificationMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.VerificationMethod[] | ListEnumVerificationMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.VerificationMethod[] | ListEnumVerificationMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumVerificationMethodNullableFilter<$PrismaModel> | $Enums.VerificationMethod | null
  }

  export type NestedEnumCompanySizeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanySizeType | EnumCompanySizeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CompanySizeType[] | ListEnumCompanySizeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanySizeType[] | ListEnumCompanySizeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanySizeTypeFilter<$PrismaModel> | $Enums.CompanySizeType
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

  export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type NestedEnumVerificationMethodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationMethod | EnumVerificationMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.VerificationMethod[] | ListEnumVerificationMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.VerificationMethod[] | ListEnumVerificationMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumVerificationMethodNullableWithAggregatesFilter<$PrismaModel> | $Enums.VerificationMethod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumVerificationMethodNullableFilter<$PrismaModel>
    _max?: NestedEnumVerificationMethodNullableFilter<$PrismaModel>
  }

  export type NestedEnumCompanySizeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanySizeType | EnumCompanySizeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CompanySizeType[] | ListEnumCompanySizeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CompanySizeType[] | ListEnumCompanySizeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCompanySizeTypeWithAggregatesFilter<$PrismaModel> | $Enums.CompanySizeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCompanySizeTypeFilter<$PrismaModel>
    _max?: NestedEnumCompanySizeTypeFilter<$PrismaModel>
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

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumDesiredJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DesiredJobType | EnumDesiredJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DesiredJobType[] | ListEnumDesiredJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DesiredJobType[] | ListEnumDesiredJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDesiredJobTypeFilter<$PrismaModel> | $Enums.DesiredJobType
  }

  export type NestedEnumEducationLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableFilter<$PrismaModel> | $Enums.EducationLevel | null
  }

  export type NestedEnumKoreanFluencyLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.KoreanFluencyLevel | EnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.KoreanFluencyLevel[] | ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.KoreanFluencyLevel[] | ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumKoreanFluencyLevelNullableFilter<$PrismaModel> | $Enums.KoreanFluencyLevel | null
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumDesiredJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DesiredJobType | EnumDesiredJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DesiredJobType[] | ListEnumDesiredJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DesiredJobType[] | ListEnumDesiredJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDesiredJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.DesiredJobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDesiredJobTypeFilter<$PrismaModel>
    _max?: NestedEnumDesiredJobTypeFilter<$PrismaModel>
  }

  export type NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.EducationLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumKoreanFluencyLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KoreanFluencyLevel | EnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.KoreanFluencyLevel[] | ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.KoreanFluencyLevel[] | ListEnumKoreanFluencyLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumKoreanFluencyLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.KoreanFluencyLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumKoreanFluencyLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumKoreanFluencyLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumEducationLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel>
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumEducationLevelFilter<$PrismaModel> | $Enums.EducationLevel
  }

  export type NestedEnumGraduationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GraduationStatus | EnumGraduationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GraduationStatus[] | ListEnumGraduationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GraduationStatus[] | ListEnumGraduationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGraduationStatusFilter<$PrismaModel> | $Enums.GraduationStatus
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumEducationLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel>
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumEducationLevelWithAggregatesFilter<$PrismaModel> | $Enums.EducationLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEducationLevelFilter<$PrismaModel>
    _max?: NestedEnumEducationLevelFilter<$PrismaModel>
  }

  export type NestedEnumGraduationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GraduationStatus | EnumGraduationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GraduationStatus[] | ListEnumGraduationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GraduationStatus[] | ListEnumGraduationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGraduationStatusWithAggregatesFilter<$PrismaModel> | $Enums.GraduationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGraduationStatusFilter<$PrismaModel>
    _max?: NestedEnumGraduationStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type CorporateProfileCreateWithoutUserInput = {
    companyId?: bigint | number
    bizRegNumber: string
    companyNameOfficial: string
    ceoName: string
    foundingDate?: Date | string | null
    managerName: string
    managerPhone: string
    managerEmail: string
    verificationStatus?: $Enums.VerificationStatus
    verificationMethod?: $Enums.VerificationMethod | null
    proofDocumentUrl?: string | null
    brandName?: string | null
    logoImageUrl?: string | null
    companyIntro?: string | null
    ksicCode: string
    addressRoad: string
    companySizeType?: $Enums.CompanySizeType
    employeeCountKorean?: number
    employeeCountForeign?: number
    annualRevenue?: bigint | number
    isBizVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogCreateNestedManyWithoutCorporateInput
  }

  export type CorporateProfileUncheckedCreateWithoutUserInput = {
    companyId?: bigint | number
    bizRegNumber: string
    companyNameOfficial: string
    ceoName: string
    foundingDate?: Date | string | null
    managerName: string
    managerPhone: string
    managerEmail: string
    verificationStatus?: $Enums.VerificationStatus
    verificationMethod?: $Enums.VerificationMethod | null
    proofDocumentUrl?: string | null
    brandName?: string | null
    logoImageUrl?: string | null
    companyIntro?: string | null
    ksicCode: string
    addressRoad: string
    companySizeType?: $Enums.CompanySizeType
    employeeCountKorean?: number
    employeeCountForeign?: number
    annualRevenue?: bigint | number
    isBizVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutCorporateInput
  }

  export type CorporateProfileCreateOrConnectWithoutUserInput = {
    where: CorporateProfileWhereUniqueInput
    create: XOR<CorporateProfileCreateWithoutUserInput, CorporateProfileUncheckedCreateWithoutUserInput>
  }

  export type IndividualProfileCreateWithoutUserInput = {
    individualId?: bigint | number
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogCreateNestedManyWithoutIndividualInput
    educations?: ProfileEducationCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateWithoutUserInput = {
    individualId?: bigint | number
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput
    educations?: ProfileEducationUncheckedCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerUncheckedCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageUncheckedCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileCreateOrConnectWithoutUserInput = {
    where: IndividualProfileWhereUniqueInput
    create: XOR<IndividualProfileCreateWithoutUserInput, IndividualProfileUncheckedCreateWithoutUserInput>
  }

  export type SupportTicketCreateWithoutUserInput = {
    id?: bigint | number
    title: string
    content: string
    status?: $Enums.TicketStatus
    answer?: string | null
    answeredAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SupportTicketUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    title: string
    content: string
    status?: $Enums.TicketStatus
    answer?: string | null
    answeredAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SupportTicketCreateOrConnectWithoutUserInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput>
  }

  export type SupportTicketCreateManyUserInputEnvelope = {
    data: SupportTicketCreateManyUserInput | SupportTicketCreateManyUserInput[]
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
    bizRegNumber?: StringFieldUpdateOperationsInput | string
    companyNameOfficial?: StringFieldUpdateOperationsInput | string
    ceoName?: StringFieldUpdateOperationsInput | string
    foundingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    managerName?: StringFieldUpdateOperationsInput | string
    managerPhone?: StringFieldUpdateOperationsInput | string
    managerEmail?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verificationMethod?: NullableEnumVerificationMethodFieldUpdateOperationsInput | $Enums.VerificationMethod | null
    proofDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    brandName?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyIntro?: NullableStringFieldUpdateOperationsInput | string | null
    ksicCode?: StringFieldUpdateOperationsInput | string
    addressRoad?: StringFieldUpdateOperationsInput | string
    companySizeType?: EnumCompanySizeTypeFieldUpdateOperationsInput | $Enums.CompanySizeType
    employeeCountKorean?: IntFieldUpdateOperationsInput | number
    employeeCountForeign?: IntFieldUpdateOperationsInput | number
    annualRevenue?: BigIntFieldUpdateOperationsInput | bigint | number
    isBizVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessLogs?: TalentAccessLogUpdateManyWithoutCorporateNestedInput
  }

  export type CorporateProfileUncheckedUpdateWithoutUserInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    bizRegNumber?: StringFieldUpdateOperationsInput | string
    companyNameOfficial?: StringFieldUpdateOperationsInput | string
    ceoName?: StringFieldUpdateOperationsInput | string
    foundingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    managerName?: StringFieldUpdateOperationsInput | string
    managerPhone?: StringFieldUpdateOperationsInput | string
    managerEmail?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verificationMethod?: NullableEnumVerificationMethodFieldUpdateOperationsInput | $Enums.VerificationMethod | null
    proofDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    brandName?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyIntro?: NullableStringFieldUpdateOperationsInput | string | null
    ksicCode?: StringFieldUpdateOperationsInput | string
    addressRoad?: StringFieldUpdateOperationsInput | string
    companySizeType?: EnumCompanySizeTypeFieldUpdateOperationsInput | $Enums.CompanySizeType
    employeeCountKorean?: IntFieldUpdateOperationsInput | number
    employeeCountForeign?: IntFieldUpdateOperationsInput | number
    annualRevenue?: BigIntFieldUpdateOperationsInput | bigint | number
    isBizVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessLogs?: TalentAccessLogUpdateManyWithoutIndividualNestedInput
    educations?: ProfileEducationUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateWithoutUserInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutIndividualNestedInput
    educations?: ProfileEducationUncheckedUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUncheckedUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUncheckedUpdateManyWithoutIndividualNestedInput
  }

  export type SupportTicketUpsertWithWhereUniqueWithoutUserInput = {
    where: SupportTicketWhereUniqueInput
    update: XOR<SupportTicketUpdateWithoutUserInput, SupportTicketUncheckedUpdateWithoutUserInput>
    create: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput>
  }

  export type SupportTicketUpdateWithWhereUniqueWithoutUserInput = {
    where: SupportTicketWhereUniqueInput
    data: XOR<SupportTicketUpdateWithoutUserInput, SupportTicketUncheckedUpdateWithoutUserInput>
  }

  export type SupportTicketUpdateManyWithWhereWithoutUserInput = {
    where: SupportTicketScalarWhereInput
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyWithoutUserInput>
  }

  export type SupportTicketScalarWhereInput = {
    AND?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    OR?: SupportTicketScalarWhereInput[]
    NOT?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    id?: BigIntFilter<"SupportTicket"> | bigint | number
    userId?: StringFilter<"SupportTicket"> | string
    title?: StringFilter<"SupportTicket"> | string
    content?: StringFilter<"SupportTicket"> | string
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    answer?: StringNullableFilter<"SupportTicket"> | string | null
    answeredAt?: DateTimeNullableFilter<"SupportTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
  }

  export type UserCreateWithoutCorporateInput = {
    id?: string
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
    individual?: IndividualProfileCreateNestedOneWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCorporateInput = {
    id?: string
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
    individual?: IndividualProfileUncheckedCreateNestedOneWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUserInput
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
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    individual?: IndividualProfileUpdateOneWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCorporateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    individual?: IndividualProfileUncheckedUpdateOneWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUserNestedInput
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
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
    corporate?: CorporateProfileCreateNestedOneWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutIndividualInput = {
    id?: string
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
    corporate?: CorporateProfileUncheckedCreateNestedOneWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUserInput
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

  export type ProfileEducationCreateWithoutIndividualInput = {
    eduId?: bigint | number
    schoolName: string
    majorName: string
    degreeLevel: $Enums.EducationLevel
    startDate: Date | string
    graduationDate?: Date | string | null
    graduationStatus: $Enums.GraduationStatus
    gpaScore?: Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationUncheckedCreateWithoutIndividualInput = {
    eduId?: bigint | number
    schoolName: string
    majorName: string
    degreeLevel: $Enums.EducationLevel
    startDate: Date | string
    graduationDate?: Date | string | null
    graduationStatus: $Enums.GraduationStatus
    gpaScore?: Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationCreateOrConnectWithoutIndividualInput = {
    where: ProfileEducationWhereUniqueInput
    create: XOR<ProfileEducationCreateWithoutIndividualInput, ProfileEducationUncheckedCreateWithoutIndividualInput>
  }

  export type ProfileEducationCreateManyIndividualInputEnvelope = {
    data: ProfileEducationCreateManyIndividualInput | ProfileEducationCreateManyIndividualInput[]
    skipDuplicates?: boolean
  }

  export type ProfileCareerCreateWithoutIndividualInput = {
    careerId?: bigint | number
    companyName: string
    dutyRole: string
    jobPosition?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    description?: string | null
  }

  export type ProfileCareerUncheckedCreateWithoutIndividualInput = {
    careerId?: bigint | number
    companyName: string
    dutyRole: string
    jobPosition?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    description?: string | null
  }

  export type ProfileCareerCreateOrConnectWithoutIndividualInput = {
    where: ProfileCareerWhereUniqueInput
    create: XOR<ProfileCareerCreateWithoutIndividualInput, ProfileCareerUncheckedCreateWithoutIndividualInput>
  }

  export type ProfileCareerCreateManyIndividualInputEnvelope = {
    data: ProfileCareerCreateManyIndividualInput | ProfileCareerCreateManyIndividualInput[]
    skipDuplicates?: boolean
  }

  export type ProfileLanguageCreateWithoutIndividualInput = {
    langId?: bigint | number
    languageType: string
    testType?: string | null
    scoreLevel: string
    obtainedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
  }

  export type ProfileLanguageUncheckedCreateWithoutIndividualInput = {
    langId?: bigint | number
    languageType: string
    testType?: string | null
    scoreLevel: string
    obtainedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
  }

  export type ProfileLanguageCreateOrConnectWithoutIndividualInput = {
    where: ProfileLanguageWhereUniqueInput
    create: XOR<ProfileLanguageCreateWithoutIndividualInput, ProfileLanguageUncheckedCreateWithoutIndividualInput>
  }

  export type ProfileLanguageCreateManyIndividualInputEnvelope = {
    data: ProfileLanguageCreateManyIndividualInput | ProfileLanguageCreateManyIndividualInput[]
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
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    corporate?: CorporateProfileUpdateOneWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutIndividualInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    corporate?: CorporateProfileUncheckedUpdateOneWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUserNestedInput
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

  export type ProfileEducationUpsertWithWhereUniqueWithoutIndividualInput = {
    where: ProfileEducationWhereUniqueInput
    update: XOR<ProfileEducationUpdateWithoutIndividualInput, ProfileEducationUncheckedUpdateWithoutIndividualInput>
    create: XOR<ProfileEducationCreateWithoutIndividualInput, ProfileEducationUncheckedCreateWithoutIndividualInput>
  }

  export type ProfileEducationUpdateWithWhereUniqueWithoutIndividualInput = {
    where: ProfileEducationWhereUniqueInput
    data: XOR<ProfileEducationUpdateWithoutIndividualInput, ProfileEducationUncheckedUpdateWithoutIndividualInput>
  }

  export type ProfileEducationUpdateManyWithWhereWithoutIndividualInput = {
    where: ProfileEducationScalarWhereInput
    data: XOR<ProfileEducationUpdateManyMutationInput, ProfileEducationUncheckedUpdateManyWithoutIndividualInput>
  }

  export type ProfileEducationScalarWhereInput = {
    AND?: ProfileEducationScalarWhereInput | ProfileEducationScalarWhereInput[]
    OR?: ProfileEducationScalarWhereInput[]
    NOT?: ProfileEducationScalarWhereInput | ProfileEducationScalarWhereInput[]
    eduId?: BigIntFilter<"ProfileEducation"> | bigint | number
    individualId?: BigIntFilter<"ProfileEducation"> | bigint | number
    schoolName?: StringFilter<"ProfileEducation"> | string
    majorName?: StringFilter<"ProfileEducation"> | string
    degreeLevel?: EnumEducationLevelFilter<"ProfileEducation"> | $Enums.EducationLevel
    startDate?: DateTimeFilter<"ProfileEducation"> | Date | string
    graduationDate?: DateTimeNullableFilter<"ProfileEducation"> | Date | string | null
    graduationStatus?: EnumGraduationStatusFilter<"ProfileEducation"> | $Enums.GraduationStatus
    gpaScore?: DecimalNullableFilter<"ProfileEducation"> | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileCareerUpsertWithWhereUniqueWithoutIndividualInput = {
    where: ProfileCareerWhereUniqueInput
    update: XOR<ProfileCareerUpdateWithoutIndividualInput, ProfileCareerUncheckedUpdateWithoutIndividualInput>
    create: XOR<ProfileCareerCreateWithoutIndividualInput, ProfileCareerUncheckedCreateWithoutIndividualInput>
  }

  export type ProfileCareerUpdateWithWhereUniqueWithoutIndividualInput = {
    where: ProfileCareerWhereUniqueInput
    data: XOR<ProfileCareerUpdateWithoutIndividualInput, ProfileCareerUncheckedUpdateWithoutIndividualInput>
  }

  export type ProfileCareerUpdateManyWithWhereWithoutIndividualInput = {
    where: ProfileCareerScalarWhereInput
    data: XOR<ProfileCareerUpdateManyMutationInput, ProfileCareerUncheckedUpdateManyWithoutIndividualInput>
  }

  export type ProfileCareerScalarWhereInput = {
    AND?: ProfileCareerScalarWhereInput | ProfileCareerScalarWhereInput[]
    OR?: ProfileCareerScalarWhereInput[]
    NOT?: ProfileCareerScalarWhereInput | ProfileCareerScalarWhereInput[]
    careerId?: BigIntFilter<"ProfileCareer"> | bigint | number
    individualId?: BigIntFilter<"ProfileCareer"> | bigint | number
    companyName?: StringFilter<"ProfileCareer"> | string
    dutyRole?: StringFilter<"ProfileCareer"> | string
    jobPosition?: StringNullableFilter<"ProfileCareer"> | string | null
    startDate?: DateTimeFilter<"ProfileCareer"> | Date | string
    endDate?: DateTimeNullableFilter<"ProfileCareer"> | Date | string | null
    isCurrent?: BoolFilter<"ProfileCareer"> | boolean
    description?: StringNullableFilter<"ProfileCareer"> | string | null
  }

  export type ProfileLanguageUpsertWithWhereUniqueWithoutIndividualInput = {
    where: ProfileLanguageWhereUniqueInput
    update: XOR<ProfileLanguageUpdateWithoutIndividualInput, ProfileLanguageUncheckedUpdateWithoutIndividualInput>
    create: XOR<ProfileLanguageCreateWithoutIndividualInput, ProfileLanguageUncheckedCreateWithoutIndividualInput>
  }

  export type ProfileLanguageUpdateWithWhereUniqueWithoutIndividualInput = {
    where: ProfileLanguageWhereUniqueInput
    data: XOR<ProfileLanguageUpdateWithoutIndividualInput, ProfileLanguageUncheckedUpdateWithoutIndividualInput>
  }

  export type ProfileLanguageUpdateManyWithWhereWithoutIndividualInput = {
    where: ProfileLanguageScalarWhereInput
    data: XOR<ProfileLanguageUpdateManyMutationInput, ProfileLanguageUncheckedUpdateManyWithoutIndividualInput>
  }

  export type ProfileLanguageScalarWhereInput = {
    AND?: ProfileLanguageScalarWhereInput | ProfileLanguageScalarWhereInput[]
    OR?: ProfileLanguageScalarWhereInput[]
    NOT?: ProfileLanguageScalarWhereInput | ProfileLanguageScalarWhereInput[]
    langId?: BigIntFilter<"ProfileLanguage"> | bigint | number
    individualId?: BigIntFilter<"ProfileLanguage"> | bigint | number
    languageType?: StringFilter<"ProfileLanguage"> | string
    testType?: StringNullableFilter<"ProfileLanguage"> | string | null
    scoreLevel?: StringFilter<"ProfileLanguage"> | string
    obtainedDate?: DateTimeNullableFilter<"ProfileLanguage"> | Date | string | null
    expiryDate?: DateTimeNullableFilter<"ProfileLanguage"> | Date | string | null
    isVerified?: BoolFilter<"ProfileLanguage"> | boolean
  }

  export type CorporateProfileCreateWithoutAccessLogsInput = {
    companyId?: bigint | number
    bizRegNumber: string
    companyNameOfficial: string
    ceoName: string
    foundingDate?: Date | string | null
    managerName: string
    managerPhone: string
    managerEmail: string
    verificationStatus?: $Enums.VerificationStatus
    verificationMethod?: $Enums.VerificationMethod | null
    proofDocumentUrl?: string | null
    brandName?: string | null
    logoImageUrl?: string | null
    companyIntro?: string | null
    ksicCode: string
    addressRoad: string
    companySizeType?: $Enums.CompanySizeType
    employeeCountKorean?: number
    employeeCountForeign?: number
    annualRevenue?: bigint | number
    isBizVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCorporateInput
  }

  export type CorporateProfileUncheckedCreateWithoutAccessLogsInput = {
    companyId?: bigint | number
    authId: string
    bizRegNumber: string
    companyNameOfficial: string
    ceoName: string
    foundingDate?: Date | string | null
    managerName: string
    managerPhone: string
    managerEmail: string
    verificationStatus?: $Enums.VerificationStatus
    verificationMethod?: $Enums.VerificationMethod | null
    proofDocumentUrl?: string | null
    brandName?: string | null
    logoImageUrl?: string | null
    companyIntro?: string | null
    ksicCode: string
    addressRoad: string
    companySizeType?: $Enums.CompanySizeType
    employeeCountKorean?: number
    employeeCountForeign?: number
    annualRevenue?: bigint | number
    isBizVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CorporateProfileCreateOrConnectWithoutAccessLogsInput = {
    where: CorporateProfileWhereUniqueInput
    create: XOR<CorporateProfileCreateWithoutAccessLogsInput, CorporateProfileUncheckedCreateWithoutAccessLogsInput>
  }

  export type IndividualProfileCreateWithoutAccessLogsInput = {
    individualId?: bigint | number
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutIndividualInput
    educations?: ProfileEducationCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateWithoutAccessLogsInput = {
    individualId?: bigint | number
    authId: string
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    educations?: ProfileEducationUncheckedCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerUncheckedCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageUncheckedCreateNestedManyWithoutIndividualInput
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
    bizRegNumber?: StringFieldUpdateOperationsInput | string
    companyNameOfficial?: StringFieldUpdateOperationsInput | string
    ceoName?: StringFieldUpdateOperationsInput | string
    foundingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    managerName?: StringFieldUpdateOperationsInput | string
    managerPhone?: StringFieldUpdateOperationsInput | string
    managerEmail?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verificationMethod?: NullableEnumVerificationMethodFieldUpdateOperationsInput | $Enums.VerificationMethod | null
    proofDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    brandName?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyIntro?: NullableStringFieldUpdateOperationsInput | string | null
    ksicCode?: StringFieldUpdateOperationsInput | string
    addressRoad?: StringFieldUpdateOperationsInput | string
    companySizeType?: EnumCompanySizeTypeFieldUpdateOperationsInput | $Enums.CompanySizeType
    employeeCountKorean?: IntFieldUpdateOperationsInput | number
    employeeCountForeign?: IntFieldUpdateOperationsInput | number
    annualRevenue?: BigIntFieldUpdateOperationsInput | bigint | number
    isBizVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCorporateNestedInput
  }

  export type CorporateProfileUncheckedUpdateWithoutAccessLogsInput = {
    companyId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    bizRegNumber?: StringFieldUpdateOperationsInput | string
    companyNameOfficial?: StringFieldUpdateOperationsInput | string
    ceoName?: StringFieldUpdateOperationsInput | string
    foundingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    managerName?: StringFieldUpdateOperationsInput | string
    managerPhone?: StringFieldUpdateOperationsInput | string
    managerEmail?: StringFieldUpdateOperationsInput | string
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verificationMethod?: NullableEnumVerificationMethodFieldUpdateOperationsInput | $Enums.VerificationMethod | null
    proofDocumentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    brandName?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyIntro?: NullableStringFieldUpdateOperationsInput | string | null
    ksicCode?: StringFieldUpdateOperationsInput | string
    addressRoad?: StringFieldUpdateOperationsInput | string
    companySizeType?: EnumCompanySizeTypeFieldUpdateOperationsInput | $Enums.CompanySizeType
    employeeCountKorean?: IntFieldUpdateOperationsInput | number
    employeeCountForeign?: IntFieldUpdateOperationsInput | number
    annualRevenue?: BigIntFieldUpdateOperationsInput | bigint | number
    isBizVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutIndividualNestedInput
    educations?: ProfileEducationUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateWithoutAccessLogsInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    educations?: ProfileEducationUncheckedUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUncheckedUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUncheckedUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileCreateWithoutEducationsInput = {
    individualId?: bigint | number
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutIndividualInput
    accessLogs?: TalentAccessLogCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateWithoutEducationsInput = {
    individualId?: bigint | number
    authId: string
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerUncheckedCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageUncheckedCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileCreateOrConnectWithoutEducationsInput = {
    where: IndividualProfileWhereUniqueInput
    create: XOR<IndividualProfileCreateWithoutEducationsInput, IndividualProfileUncheckedCreateWithoutEducationsInput>
  }

  export type IndividualProfileUpsertWithoutEducationsInput = {
    update: XOR<IndividualProfileUpdateWithoutEducationsInput, IndividualProfileUncheckedUpdateWithoutEducationsInput>
    create: XOR<IndividualProfileCreateWithoutEducationsInput, IndividualProfileUncheckedCreateWithoutEducationsInput>
    where?: IndividualProfileWhereInput
  }

  export type IndividualProfileUpdateToOneWithWhereWithoutEducationsInput = {
    where?: IndividualProfileWhereInput
    data: XOR<IndividualProfileUpdateWithoutEducationsInput, IndividualProfileUncheckedUpdateWithoutEducationsInput>
  }

  export type IndividualProfileUpdateWithoutEducationsInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutIndividualNestedInput
    accessLogs?: TalentAccessLogUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateWithoutEducationsInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUncheckedUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUncheckedUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileCreateWithoutCareersInput = {
    individualId?: bigint | number
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutIndividualInput
    accessLogs?: TalentAccessLogCreateNestedManyWithoutIndividualInput
    educations?: ProfileEducationCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateWithoutCareersInput = {
    individualId?: bigint | number
    authId: string
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput
    educations?: ProfileEducationUncheckedCreateNestedManyWithoutIndividualInput
    languages?: ProfileLanguageUncheckedCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileCreateOrConnectWithoutCareersInput = {
    where: IndividualProfileWhereUniqueInput
    create: XOR<IndividualProfileCreateWithoutCareersInput, IndividualProfileUncheckedCreateWithoutCareersInput>
  }

  export type IndividualProfileUpsertWithoutCareersInput = {
    update: XOR<IndividualProfileUpdateWithoutCareersInput, IndividualProfileUncheckedUpdateWithoutCareersInput>
    create: XOR<IndividualProfileCreateWithoutCareersInput, IndividualProfileUncheckedCreateWithoutCareersInput>
    where?: IndividualProfileWhereInput
  }

  export type IndividualProfileUpdateToOneWithWhereWithoutCareersInput = {
    where?: IndividualProfileWhereInput
    data: XOR<IndividualProfileUpdateWithoutCareersInput, IndividualProfileUncheckedUpdateWithoutCareersInput>
  }

  export type IndividualProfileUpdateWithoutCareersInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutIndividualNestedInput
    accessLogs?: TalentAccessLogUpdateManyWithoutIndividualNestedInput
    educations?: ProfileEducationUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateWithoutCareersInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutIndividualNestedInput
    educations?: ProfileEducationUncheckedUpdateManyWithoutIndividualNestedInput
    languages?: ProfileLanguageUncheckedUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileCreateWithoutLanguagesInput = {
    individualId?: bigint | number
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutIndividualInput
    accessLogs?: TalentAccessLogCreateNestedManyWithoutIndividualInput
    educations?: ProfileEducationCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileUncheckedCreateWithoutLanguagesInput = {
    individualId?: bigint | number
    authId: string
    realName: string
    nationality: string
    birthDate: Date | string
    gender: $Enums.Gender
    addressRoad?: string | null
    visaType: string
    visaExpiryDate: Date | string
    desiredJobType?: $Enums.DesiredJobType
    desiredSalary?: number
    desiredIndustries?: string | null
    isOpenToScout?: boolean
    finalEducationLvl?: $Enums.EducationLevel | null
    koreanFluencyLvl?: $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: number
    profileImageUrl?: string | null
    resumeFileUrl?: string | null
    portfolioUrl?: string | null
    selfIntro?: string | null
    isProfileCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accessLogs?: TalentAccessLogUncheckedCreateNestedManyWithoutIndividualInput
    educations?: ProfileEducationUncheckedCreateNestedManyWithoutIndividualInput
    careers?: ProfileCareerUncheckedCreateNestedManyWithoutIndividualInput
  }

  export type IndividualProfileCreateOrConnectWithoutLanguagesInput = {
    where: IndividualProfileWhereUniqueInput
    create: XOR<IndividualProfileCreateWithoutLanguagesInput, IndividualProfileUncheckedCreateWithoutLanguagesInput>
  }

  export type IndividualProfileUpsertWithoutLanguagesInput = {
    update: XOR<IndividualProfileUpdateWithoutLanguagesInput, IndividualProfileUncheckedUpdateWithoutLanguagesInput>
    create: XOR<IndividualProfileCreateWithoutLanguagesInput, IndividualProfileUncheckedCreateWithoutLanguagesInput>
    where?: IndividualProfileWhereInput
  }

  export type IndividualProfileUpdateToOneWithWhereWithoutLanguagesInput = {
    where?: IndividualProfileWhereInput
    data: XOR<IndividualProfileUpdateWithoutLanguagesInput, IndividualProfileUncheckedUpdateWithoutLanguagesInput>
  }

  export type IndividualProfileUpdateWithoutLanguagesInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutIndividualNestedInput
    accessLogs?: TalentAccessLogUpdateManyWithoutIndividualNestedInput
    educations?: ProfileEducationUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUpdateManyWithoutIndividualNestedInput
  }

  export type IndividualProfileUncheckedUpdateWithoutLanguagesInput = {
    individualId?: BigIntFieldUpdateOperationsInput | bigint | number
    authId?: StringFieldUpdateOperationsInput | string
    realName?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    addressRoad?: NullableStringFieldUpdateOperationsInput | string | null
    visaType?: StringFieldUpdateOperationsInput | string
    visaExpiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    desiredJobType?: EnumDesiredJobTypeFieldUpdateOperationsInput | $Enums.DesiredJobType
    desiredSalary?: IntFieldUpdateOperationsInput | number
    desiredIndustries?: NullableStringFieldUpdateOperationsInput | string | null
    isOpenToScout?: BoolFieldUpdateOperationsInput | boolean
    finalEducationLvl?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    koreanFluencyLvl?: NullableEnumKoreanFluencyLevelFieldUpdateOperationsInput | $Enums.KoreanFluencyLevel | null
    totalCareerMonths?: IntFieldUpdateOperationsInput | number
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumeFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    selfIntro?: NullableStringFieldUpdateOperationsInput | string | null
    isProfileCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessLogs?: TalentAccessLogUncheckedUpdateManyWithoutIndividualNestedInput
    educations?: ProfileEducationUncheckedUpdateManyWithoutIndividualNestedInput
    careers?: ProfileCareerUncheckedUpdateManyWithoutIndividualNestedInput
  }

  export type UserCreateWithoutSupportTicketsInput = {
    id?: string
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
    corporate?: CorporateProfileCreateNestedOneWithoutUserInput
    individual?: IndividualProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSupportTicketsInput = {
    id?: string
    email: string
    password?: string | null
    socialProvider?: $Enums.SocialProvider
    socialProviderId?: string | null
    userType?: $Enums.UserType
    isActive?: boolean
    joinedAt?: Date | string
    lastLoginAt?: Date | string | null
    deletedAt?: Date | string | null
    deleteScheduledAt?: Date | string | null
    notifSms?: boolean
    notifEmail?: boolean
    notifKakao?: boolean
    notifEnabledAt?: Date | string | null
    corporate?: CorporateProfileUncheckedCreateNestedOneWithoutUserInput
    individual?: IndividualProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSupportTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
  }

  export type UserUpsertWithoutSupportTicketsInput = {
    update: XOR<UserUpdateWithoutSupportTicketsInput, UserUncheckedUpdateWithoutSupportTicketsInput>
    create: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSupportTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSupportTicketsInput, UserUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type UserUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    corporate?: CorporateProfileUpdateOneWithoutUserNestedInput
    individual?: IndividualProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    socialProvider?: EnumSocialProviderFieldUpdateOperationsInput | $Enums.SocialProvider
    socialProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleteScheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifSms?: BoolFieldUpdateOperationsInput | boolean
    notifEmail?: BoolFieldUpdateOperationsInput | boolean
    notifKakao?: BoolFieldUpdateOperationsInput | boolean
    notifEnabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    corporate?: CorporateProfileUncheckedUpdateOneWithoutUserNestedInput
    individual?: IndividualProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type SupportTicketCreateManyUserInput = {
    id?: bigint | number
    title: string
    content: string
    status?: $Enums.TicketStatus
    answer?: string | null
    answeredAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SupportTicketUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    answer?: NullableStringFieldUpdateOperationsInput | string | null
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ProfileEducationCreateManyIndividualInput = {
    eduId?: bigint | number
    schoolName: string
    majorName: string
    degreeLevel: $Enums.EducationLevel
    startDate: Date | string
    graduationDate?: Date | string | null
    graduationStatus: $Enums.GraduationStatus
    gpaScore?: Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileCareerCreateManyIndividualInput = {
    careerId?: bigint | number
    companyName: string
    dutyRole: string
    jobPosition?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    description?: string | null
  }

  export type ProfileLanguageCreateManyIndividualInput = {
    langId?: bigint | number
    languageType: string
    testType?: string | null
    scoreLevel: string
    obtainedDate?: Date | string | null
    expiryDate?: Date | string | null
    isVerified?: boolean
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

  export type ProfileEducationUpdateWithoutIndividualInput = {
    eduId?: BigIntFieldUpdateOperationsInput | bigint | number
    schoolName?: StringFieldUpdateOperationsInput | string
    majorName?: StringFieldUpdateOperationsInput | string
    degreeLevel?: EnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    graduationStatus?: EnumGraduationStatusFieldUpdateOperationsInput | $Enums.GraduationStatus
    gpaScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationUncheckedUpdateWithoutIndividualInput = {
    eduId?: BigIntFieldUpdateOperationsInput | bigint | number
    schoolName?: StringFieldUpdateOperationsInput | string
    majorName?: StringFieldUpdateOperationsInput | string
    degreeLevel?: EnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    graduationStatus?: EnumGraduationStatusFieldUpdateOperationsInput | $Enums.GraduationStatus
    gpaScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileEducationUncheckedUpdateManyWithoutIndividualInput = {
    eduId?: BigIntFieldUpdateOperationsInput | bigint | number
    schoolName?: StringFieldUpdateOperationsInput | string
    majorName?: StringFieldUpdateOperationsInput | string
    degreeLevel?: EnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    graduationStatus?: EnumGraduationStatusFieldUpdateOperationsInput | $Enums.GraduationStatus
    gpaScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type ProfileCareerUpdateWithoutIndividualInput = {
    careerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    dutyRole?: StringFieldUpdateOperationsInput | string
    jobPosition?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileCareerUncheckedUpdateWithoutIndividualInput = {
    careerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    dutyRole?: StringFieldUpdateOperationsInput | string
    jobPosition?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileCareerUncheckedUpdateManyWithoutIndividualInput = {
    careerId?: BigIntFieldUpdateOperationsInput | bigint | number
    companyName?: StringFieldUpdateOperationsInput | string
    dutyRole?: StringFieldUpdateOperationsInput | string
    jobPosition?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileLanguageUpdateWithoutIndividualInput = {
    langId?: BigIntFieldUpdateOperationsInput | bigint | number
    languageType?: StringFieldUpdateOperationsInput | string
    testType?: NullableStringFieldUpdateOperationsInput | string | null
    scoreLevel?: StringFieldUpdateOperationsInput | string
    obtainedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProfileLanguageUncheckedUpdateWithoutIndividualInput = {
    langId?: BigIntFieldUpdateOperationsInput | bigint | number
    languageType?: StringFieldUpdateOperationsInput | string
    testType?: NullableStringFieldUpdateOperationsInput | string | null
    scoreLevel?: StringFieldUpdateOperationsInput | string
    obtainedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProfileLanguageUncheckedUpdateManyWithoutIndividualInput = {
    langId?: BigIntFieldUpdateOperationsInput | bigint | number
    languageType?: StringFieldUpdateOperationsInput | string
    testType?: NullableStringFieldUpdateOperationsInput | string | null
    scoreLevel?: StringFieldUpdateOperationsInput | string
    obtainedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
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