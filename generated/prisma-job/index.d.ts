
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
 * Model IndustryVisaRule
 * 
 */
export type IndustryVisaRule = $Result.DefaultSelection<Prisma.$IndustryVisaRulePayload>
/**
 * Model JobPosting
 * 
 */
export type JobPosting = $Result.DefaultSelection<Prisma.$JobPostingPayload>
/**
 * Model JobAttributesAlba
 * 
 */
export type JobAttributesAlba = $Result.DefaultSelection<Prisma.$JobAttributesAlbaPayload>
/**
 * Model JobAttributesFulltime
 * 
 */
export type JobAttributesFulltime = $Result.DefaultSelection<Prisma.$JobAttributesFulltimePayload>
/**
 * Model InterviewSlot
 * 
 */
export type InterviewSlot = $Result.DefaultSelection<Prisma.$InterviewSlotPayload>
/**
 * Model JobApplication
 * 
 */
export type JobApplication = $Result.DefaultSelection<Prisma.$JobApplicationPayload>
/**
 * Model ApplyJob
 * 
 */
export type ApplyJob = $Result.DefaultSelection<Prisma.$ApplyJobPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BoardType: {
  PART_TIME: 'PART_TIME',
  FULL_TIME: 'FULL_TIME'
};

export type BoardType = (typeof BoardType)[keyof typeof BoardType]


export const PostStatus: {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
};

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]


export const Intensity: {
  UPPER: 'UPPER',
  MIDDLE: 'MIDDLE',
  LOWER: 'LOWER'
};

export type Intensity = (typeof Intensity)[keyof typeof Intensity]


export const InterviewType: {
  OFFLINE: 'OFFLINE',
  ONLINE: 'ONLINE'
};

export type InterviewType = (typeof InterviewType)[keyof typeof InterviewType]


export const ApplicationStatus: {
  PENDING: 'PENDING',
  INTERVIEW_REQUESTED: 'INTERVIEW_REQUESTED',
  COORDINATION_NEEDED: 'COORDINATION_NEEDED',
  CONFIRMED: 'CONFIRMED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


export const ActorType: {
  EMPLOYER: 'EMPLOYER',
  APPLICANT: 'APPLICANT'
};

export type ActorType = (typeof ActorType)[keyof typeof ActorType]


export const ApplyType: {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ApplyType = (typeof ApplyType)[keyof typeof ApplyType]

}

export type BoardType = $Enums.BoardType

export const BoardType: typeof $Enums.BoardType

export type PostStatus = $Enums.PostStatus

export const PostStatus: typeof $Enums.PostStatus

export type Intensity = $Enums.Intensity

export const Intensity: typeof $Enums.Intensity

export type InterviewType = $Enums.InterviewType

export const InterviewType: typeof $Enums.InterviewType

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type ActorType = $Enums.ActorType

export const ActorType: typeof $Enums.ActorType

export type ApplyType = $Enums.ApplyType

export const ApplyType: typeof $Enums.ApplyType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more IndustryVisaRules
 * const industryVisaRules = await prisma.industryVisaRule.findMany()
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
   * // Fetch zero or more IndustryVisaRules
   * const industryVisaRules = await prisma.industryVisaRule.findMany()
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
   * `prisma.industryVisaRule`: Exposes CRUD operations for the **IndustryVisaRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IndustryVisaRules
    * const industryVisaRules = await prisma.industryVisaRule.findMany()
    * ```
    */
  get industryVisaRule(): Prisma.IndustryVisaRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobPosting`: Exposes CRUD operations for the **JobPosting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobPostings
    * const jobPostings = await prisma.jobPosting.findMany()
    * ```
    */
  get jobPosting(): Prisma.JobPostingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobAttributesAlba`: Exposes CRUD operations for the **JobAttributesAlba** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobAttributesAlbas
    * const jobAttributesAlbas = await prisma.jobAttributesAlba.findMany()
    * ```
    */
  get jobAttributesAlba(): Prisma.JobAttributesAlbaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobAttributesFulltime`: Exposes CRUD operations for the **JobAttributesFulltime** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobAttributesFulltimes
    * const jobAttributesFulltimes = await prisma.jobAttributesFulltime.findMany()
    * ```
    */
  get jobAttributesFulltime(): Prisma.JobAttributesFulltimeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.interviewSlot`: Exposes CRUD operations for the **InterviewSlot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterviewSlots
    * const interviewSlots = await prisma.interviewSlot.findMany()
    * ```
    */
  get interviewSlot(): Prisma.InterviewSlotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobApplication`: Exposes CRUD operations for the **JobApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobApplications
    * const jobApplications = await prisma.jobApplication.findMany()
    * ```
    */
  get jobApplication(): Prisma.JobApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.applyJob`: Exposes CRUD operations for the **ApplyJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApplyJobs
    * const applyJobs = await prisma.applyJob.findMany()
    * ```
    */
  get applyJob(): Prisma.ApplyJobDelegate<ExtArgs, ClientOptions>;
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
    IndustryVisaRule: 'IndustryVisaRule',
    JobPosting: 'JobPosting',
    JobAttributesAlba: 'JobAttributesAlba',
    JobAttributesFulltime: 'JobAttributesFulltime',
    InterviewSlot: 'InterviewSlot',
    JobApplication: 'JobApplication',
    ApplyJob: 'ApplyJob'
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
      modelProps: "industryVisaRule" | "jobPosting" | "jobAttributesAlba" | "jobAttributesFulltime" | "interviewSlot" | "jobApplication" | "applyJob"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      IndustryVisaRule: {
        payload: Prisma.$IndustryVisaRulePayload<ExtArgs>
        fields: Prisma.IndustryVisaRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IndustryVisaRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IndustryVisaRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>
          }
          findFirst: {
            args: Prisma.IndustryVisaRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IndustryVisaRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>
          }
          findMany: {
            args: Prisma.IndustryVisaRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>[]
          }
          create: {
            args: Prisma.IndustryVisaRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>
          }
          createMany: {
            args: Prisma.IndustryVisaRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IndustryVisaRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>[]
          }
          delete: {
            args: Prisma.IndustryVisaRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>
          }
          update: {
            args: Prisma.IndustryVisaRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>
          }
          deleteMany: {
            args: Prisma.IndustryVisaRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IndustryVisaRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IndustryVisaRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>[]
          }
          upsert: {
            args: Prisma.IndustryVisaRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryVisaRulePayload>
          }
          aggregate: {
            args: Prisma.IndustryVisaRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIndustryVisaRule>
          }
          groupBy: {
            args: Prisma.IndustryVisaRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<IndustryVisaRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.IndustryVisaRuleCountArgs<ExtArgs>
            result: $Utils.Optional<IndustryVisaRuleCountAggregateOutputType> | number
          }
        }
      }
      JobPosting: {
        payload: Prisma.$JobPostingPayload<ExtArgs>
        fields: Prisma.JobPostingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobPostingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobPostingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          findFirst: {
            args: Prisma.JobPostingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobPostingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          findMany: {
            args: Prisma.JobPostingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          create: {
            args: Prisma.JobPostingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          createMany: {
            args: Prisma.JobPostingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobPostingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          delete: {
            args: Prisma.JobPostingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          update: {
            args: Prisma.JobPostingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          deleteMany: {
            args: Prisma.JobPostingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobPostingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobPostingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>[]
          }
          upsert: {
            args: Prisma.JobPostingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPostingPayload>
          }
          aggregate: {
            args: Prisma.JobPostingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobPosting>
          }
          groupBy: {
            args: Prisma.JobPostingGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobPostingGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobPostingCountArgs<ExtArgs>
            result: $Utils.Optional<JobPostingCountAggregateOutputType> | number
          }
        }
      }
      JobAttributesAlba: {
        payload: Prisma.$JobAttributesAlbaPayload<ExtArgs>
        fields: Prisma.JobAttributesAlbaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobAttributesAlbaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobAttributesAlbaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>
          }
          findFirst: {
            args: Prisma.JobAttributesAlbaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobAttributesAlbaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>
          }
          findMany: {
            args: Prisma.JobAttributesAlbaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>[]
          }
          create: {
            args: Prisma.JobAttributesAlbaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>
          }
          createMany: {
            args: Prisma.JobAttributesAlbaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobAttributesAlbaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>[]
          }
          delete: {
            args: Prisma.JobAttributesAlbaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>
          }
          update: {
            args: Prisma.JobAttributesAlbaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>
          }
          deleteMany: {
            args: Prisma.JobAttributesAlbaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobAttributesAlbaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobAttributesAlbaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>[]
          }
          upsert: {
            args: Prisma.JobAttributesAlbaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesAlbaPayload>
          }
          aggregate: {
            args: Prisma.JobAttributesAlbaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobAttributesAlba>
          }
          groupBy: {
            args: Prisma.JobAttributesAlbaGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobAttributesAlbaGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobAttributesAlbaCountArgs<ExtArgs>
            result: $Utils.Optional<JobAttributesAlbaCountAggregateOutputType> | number
          }
        }
      }
      JobAttributesFulltime: {
        payload: Prisma.$JobAttributesFulltimePayload<ExtArgs>
        fields: Prisma.JobAttributesFulltimeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobAttributesFulltimeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobAttributesFulltimeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>
          }
          findFirst: {
            args: Prisma.JobAttributesFulltimeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobAttributesFulltimeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>
          }
          findMany: {
            args: Prisma.JobAttributesFulltimeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>[]
          }
          create: {
            args: Prisma.JobAttributesFulltimeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>
          }
          createMany: {
            args: Prisma.JobAttributesFulltimeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobAttributesFulltimeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>[]
          }
          delete: {
            args: Prisma.JobAttributesFulltimeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>
          }
          update: {
            args: Prisma.JobAttributesFulltimeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>
          }
          deleteMany: {
            args: Prisma.JobAttributesFulltimeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobAttributesFulltimeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobAttributesFulltimeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>[]
          }
          upsert: {
            args: Prisma.JobAttributesFulltimeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobAttributesFulltimePayload>
          }
          aggregate: {
            args: Prisma.JobAttributesFulltimeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobAttributesFulltime>
          }
          groupBy: {
            args: Prisma.JobAttributesFulltimeGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobAttributesFulltimeGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobAttributesFulltimeCountArgs<ExtArgs>
            result: $Utils.Optional<JobAttributesFulltimeCountAggregateOutputType> | number
          }
        }
      }
      InterviewSlot: {
        payload: Prisma.$InterviewSlotPayload<ExtArgs>
        fields: Prisma.InterviewSlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewSlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewSlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>
          }
          findFirst: {
            args: Prisma.InterviewSlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewSlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>
          }
          findMany: {
            args: Prisma.InterviewSlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>[]
          }
          create: {
            args: Prisma.InterviewSlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>
          }
          createMany: {
            args: Prisma.InterviewSlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewSlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>[]
          }
          delete: {
            args: Prisma.InterviewSlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>
          }
          update: {
            args: Prisma.InterviewSlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>
          }
          deleteMany: {
            args: Prisma.InterviewSlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewSlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InterviewSlotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>[]
          }
          upsert: {
            args: Prisma.InterviewSlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewSlotPayload>
          }
          aggregate: {
            args: Prisma.InterviewSlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterviewSlot>
          }
          groupBy: {
            args: Prisma.InterviewSlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewSlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewSlotCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewSlotCountAggregateOutputType> | number
          }
        }
      }
      JobApplication: {
        payload: Prisma.$JobApplicationPayload<ExtArgs>
        fields: Prisma.JobApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          findFirst: {
            args: Prisma.JobApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          findMany: {
            args: Prisma.JobApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>[]
          }
          create: {
            args: Prisma.JobApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          createMany: {
            args: Prisma.JobApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>[]
          }
          delete: {
            args: Prisma.JobApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          update: {
            args: Prisma.JobApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          deleteMany: {
            args: Prisma.JobApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>[]
          }
          upsert: {
            args: Prisma.JobApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          aggregate: {
            args: Prisma.JobApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobApplication>
          }
          groupBy: {
            args: Prisma.JobApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<JobApplicationCountAggregateOutputType> | number
          }
        }
      }
      ApplyJob: {
        payload: Prisma.$ApplyJobPayload<ExtArgs>
        fields: Prisma.ApplyJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplyJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplyJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>
          }
          findFirst: {
            args: Prisma.ApplyJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplyJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>
          }
          findMany: {
            args: Prisma.ApplyJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>[]
          }
          create: {
            args: Prisma.ApplyJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>
          }
          createMany: {
            args: Prisma.ApplyJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApplyJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>[]
          }
          delete: {
            args: Prisma.ApplyJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>
          }
          update: {
            args: Prisma.ApplyJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>
          }
          deleteMany: {
            args: Prisma.ApplyJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplyJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApplyJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>[]
          }
          upsert: {
            args: Prisma.ApplyJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplyJobPayload>
          }
          aggregate: {
            args: Prisma.ApplyJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplyJob>
          }
          groupBy: {
            args: Prisma.ApplyJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplyJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplyJobCountArgs<ExtArgs>
            result: $Utils.Optional<ApplyJobCountAggregateOutputType> | number
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
    industryVisaRule?: IndustryVisaRuleOmit
    jobPosting?: JobPostingOmit
    jobAttributesAlba?: JobAttributesAlbaOmit
    jobAttributesFulltime?: JobAttributesFulltimeOmit
    interviewSlot?: InterviewSlotOmit
    jobApplication?: JobApplicationOmit
    applyJob?: ApplyJobOmit
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
   * Count Type JobPostingCountOutputType
   */

  export type JobPostingCountOutputType = {
    interviewSlots: number
    applications: number
  }

  export type JobPostingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interviewSlots?: boolean | JobPostingCountOutputTypeCountInterviewSlotsArgs
    applications?: boolean | JobPostingCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPostingCountOutputType
     */
    select?: JobPostingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeCountInterviewSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewSlotWhereInput
  }

  /**
   * JobPostingCountOutputType without action
   */
  export type JobPostingCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model IndustryVisaRule
   */

  export type AggregateIndustryVisaRule = {
    _count: IndustryVisaRuleCountAggregateOutputType | null
    _avg: IndustryVisaRuleAvgAggregateOutputType | null
    _sum: IndustryVisaRuleSumAggregateOutputType | null
    _min: IndustryVisaRuleMinAggregateOutputType | null
    _max: IndustryVisaRuleMaxAggregateOutputType | null
  }

  export type IndustryVisaRuleAvgAggregateOutputType = {
    id: number | null
  }

  export type IndustryVisaRuleSumAggregateOutputType = {
    id: number | null
  }

  export type IndustryVisaRuleMinAggregateOutputType = {
    id: number | null
    industryCode: string | null
    allowedVisa: string | null
  }

  export type IndustryVisaRuleMaxAggregateOutputType = {
    id: number | null
    industryCode: string | null
    allowedVisa: string | null
  }

  export type IndustryVisaRuleCountAggregateOutputType = {
    id: number
    industryCode: number
    allowedVisa: number
    _all: number
  }


  export type IndustryVisaRuleAvgAggregateInputType = {
    id?: true
  }

  export type IndustryVisaRuleSumAggregateInputType = {
    id?: true
  }

  export type IndustryVisaRuleMinAggregateInputType = {
    id?: true
    industryCode?: true
    allowedVisa?: true
  }

  export type IndustryVisaRuleMaxAggregateInputType = {
    id?: true
    industryCode?: true
    allowedVisa?: true
  }

  export type IndustryVisaRuleCountAggregateInputType = {
    id?: true
    industryCode?: true
    allowedVisa?: true
    _all?: true
  }

  export type IndustryVisaRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IndustryVisaRule to aggregate.
     */
    where?: IndustryVisaRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndustryVisaRules to fetch.
     */
    orderBy?: IndustryVisaRuleOrderByWithRelationInput | IndustryVisaRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IndustryVisaRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndustryVisaRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndustryVisaRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IndustryVisaRules
    **/
    _count?: true | IndustryVisaRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IndustryVisaRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IndustryVisaRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IndustryVisaRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IndustryVisaRuleMaxAggregateInputType
  }

  export type GetIndustryVisaRuleAggregateType<T extends IndustryVisaRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateIndustryVisaRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIndustryVisaRule[P]>
      : GetScalarType<T[P], AggregateIndustryVisaRule[P]>
  }




  export type IndustryVisaRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IndustryVisaRuleWhereInput
    orderBy?: IndustryVisaRuleOrderByWithAggregationInput | IndustryVisaRuleOrderByWithAggregationInput[]
    by: IndustryVisaRuleScalarFieldEnum[] | IndustryVisaRuleScalarFieldEnum
    having?: IndustryVisaRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IndustryVisaRuleCountAggregateInputType | true
    _avg?: IndustryVisaRuleAvgAggregateInputType
    _sum?: IndustryVisaRuleSumAggregateInputType
    _min?: IndustryVisaRuleMinAggregateInputType
    _max?: IndustryVisaRuleMaxAggregateInputType
  }

  export type IndustryVisaRuleGroupByOutputType = {
    id: number
    industryCode: string
    allowedVisa: string
    _count: IndustryVisaRuleCountAggregateOutputType | null
    _avg: IndustryVisaRuleAvgAggregateOutputType | null
    _sum: IndustryVisaRuleSumAggregateOutputType | null
    _min: IndustryVisaRuleMinAggregateOutputType | null
    _max: IndustryVisaRuleMaxAggregateOutputType | null
  }

  type GetIndustryVisaRuleGroupByPayload<T extends IndustryVisaRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IndustryVisaRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IndustryVisaRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IndustryVisaRuleGroupByOutputType[P]>
            : GetScalarType<T[P], IndustryVisaRuleGroupByOutputType[P]>
        }
      >
    >


  export type IndustryVisaRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    industryCode?: boolean
    allowedVisa?: boolean
  }, ExtArgs["result"]["industryVisaRule"]>

  export type IndustryVisaRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    industryCode?: boolean
    allowedVisa?: boolean
  }, ExtArgs["result"]["industryVisaRule"]>

  export type IndustryVisaRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    industryCode?: boolean
    allowedVisa?: boolean
  }, ExtArgs["result"]["industryVisaRule"]>

  export type IndustryVisaRuleSelectScalar = {
    id?: boolean
    industryCode?: boolean
    allowedVisa?: boolean
  }

  export type IndustryVisaRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "industryCode" | "allowedVisa", ExtArgs["result"]["industryVisaRule"]>

  export type $IndustryVisaRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IndustryVisaRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      industryCode: string
      allowedVisa: string
    }, ExtArgs["result"]["industryVisaRule"]>
    composites: {}
  }

  type IndustryVisaRuleGetPayload<S extends boolean | null | undefined | IndustryVisaRuleDefaultArgs> = $Result.GetResult<Prisma.$IndustryVisaRulePayload, S>

  type IndustryVisaRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IndustryVisaRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IndustryVisaRuleCountAggregateInputType | true
    }

  export interface IndustryVisaRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IndustryVisaRule'], meta: { name: 'IndustryVisaRule' } }
    /**
     * Find zero or one IndustryVisaRule that matches the filter.
     * @param {IndustryVisaRuleFindUniqueArgs} args - Arguments to find a IndustryVisaRule
     * @example
     * // Get one IndustryVisaRule
     * const industryVisaRule = await prisma.industryVisaRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IndustryVisaRuleFindUniqueArgs>(args: SelectSubset<T, IndustryVisaRuleFindUniqueArgs<ExtArgs>>): Prisma__IndustryVisaRuleClient<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IndustryVisaRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IndustryVisaRuleFindUniqueOrThrowArgs} args - Arguments to find a IndustryVisaRule
     * @example
     * // Get one IndustryVisaRule
     * const industryVisaRule = await prisma.industryVisaRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IndustryVisaRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, IndustryVisaRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IndustryVisaRuleClient<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IndustryVisaRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryVisaRuleFindFirstArgs} args - Arguments to find a IndustryVisaRule
     * @example
     * // Get one IndustryVisaRule
     * const industryVisaRule = await prisma.industryVisaRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IndustryVisaRuleFindFirstArgs>(args?: SelectSubset<T, IndustryVisaRuleFindFirstArgs<ExtArgs>>): Prisma__IndustryVisaRuleClient<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IndustryVisaRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryVisaRuleFindFirstOrThrowArgs} args - Arguments to find a IndustryVisaRule
     * @example
     * // Get one IndustryVisaRule
     * const industryVisaRule = await prisma.industryVisaRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IndustryVisaRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, IndustryVisaRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__IndustryVisaRuleClient<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IndustryVisaRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryVisaRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IndustryVisaRules
     * const industryVisaRules = await prisma.industryVisaRule.findMany()
     * 
     * // Get first 10 IndustryVisaRules
     * const industryVisaRules = await prisma.industryVisaRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const industryVisaRuleWithIdOnly = await prisma.industryVisaRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IndustryVisaRuleFindManyArgs>(args?: SelectSubset<T, IndustryVisaRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IndustryVisaRule.
     * @param {IndustryVisaRuleCreateArgs} args - Arguments to create a IndustryVisaRule.
     * @example
     * // Create one IndustryVisaRule
     * const IndustryVisaRule = await prisma.industryVisaRule.create({
     *   data: {
     *     // ... data to create a IndustryVisaRule
     *   }
     * })
     * 
     */
    create<T extends IndustryVisaRuleCreateArgs>(args: SelectSubset<T, IndustryVisaRuleCreateArgs<ExtArgs>>): Prisma__IndustryVisaRuleClient<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IndustryVisaRules.
     * @param {IndustryVisaRuleCreateManyArgs} args - Arguments to create many IndustryVisaRules.
     * @example
     * // Create many IndustryVisaRules
     * const industryVisaRule = await prisma.industryVisaRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IndustryVisaRuleCreateManyArgs>(args?: SelectSubset<T, IndustryVisaRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IndustryVisaRules and returns the data saved in the database.
     * @param {IndustryVisaRuleCreateManyAndReturnArgs} args - Arguments to create many IndustryVisaRules.
     * @example
     * // Create many IndustryVisaRules
     * const industryVisaRule = await prisma.industryVisaRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IndustryVisaRules and only return the `id`
     * const industryVisaRuleWithIdOnly = await prisma.industryVisaRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IndustryVisaRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, IndustryVisaRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IndustryVisaRule.
     * @param {IndustryVisaRuleDeleteArgs} args - Arguments to delete one IndustryVisaRule.
     * @example
     * // Delete one IndustryVisaRule
     * const IndustryVisaRule = await prisma.industryVisaRule.delete({
     *   where: {
     *     // ... filter to delete one IndustryVisaRule
     *   }
     * })
     * 
     */
    delete<T extends IndustryVisaRuleDeleteArgs>(args: SelectSubset<T, IndustryVisaRuleDeleteArgs<ExtArgs>>): Prisma__IndustryVisaRuleClient<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IndustryVisaRule.
     * @param {IndustryVisaRuleUpdateArgs} args - Arguments to update one IndustryVisaRule.
     * @example
     * // Update one IndustryVisaRule
     * const industryVisaRule = await prisma.industryVisaRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IndustryVisaRuleUpdateArgs>(args: SelectSubset<T, IndustryVisaRuleUpdateArgs<ExtArgs>>): Prisma__IndustryVisaRuleClient<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IndustryVisaRules.
     * @param {IndustryVisaRuleDeleteManyArgs} args - Arguments to filter IndustryVisaRules to delete.
     * @example
     * // Delete a few IndustryVisaRules
     * const { count } = await prisma.industryVisaRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IndustryVisaRuleDeleteManyArgs>(args?: SelectSubset<T, IndustryVisaRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IndustryVisaRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryVisaRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IndustryVisaRules
     * const industryVisaRule = await prisma.industryVisaRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IndustryVisaRuleUpdateManyArgs>(args: SelectSubset<T, IndustryVisaRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IndustryVisaRules and returns the data updated in the database.
     * @param {IndustryVisaRuleUpdateManyAndReturnArgs} args - Arguments to update many IndustryVisaRules.
     * @example
     * // Update many IndustryVisaRules
     * const industryVisaRule = await prisma.industryVisaRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IndustryVisaRules and only return the `id`
     * const industryVisaRuleWithIdOnly = await prisma.industryVisaRule.updateManyAndReturn({
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
    updateManyAndReturn<T extends IndustryVisaRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, IndustryVisaRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IndustryVisaRule.
     * @param {IndustryVisaRuleUpsertArgs} args - Arguments to update or create a IndustryVisaRule.
     * @example
     * // Update or create a IndustryVisaRule
     * const industryVisaRule = await prisma.industryVisaRule.upsert({
     *   create: {
     *     // ... data to create a IndustryVisaRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IndustryVisaRule we want to update
     *   }
     * })
     */
    upsert<T extends IndustryVisaRuleUpsertArgs>(args: SelectSubset<T, IndustryVisaRuleUpsertArgs<ExtArgs>>): Prisma__IndustryVisaRuleClient<$Result.GetResult<Prisma.$IndustryVisaRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IndustryVisaRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryVisaRuleCountArgs} args - Arguments to filter IndustryVisaRules to count.
     * @example
     * // Count the number of IndustryVisaRules
     * const count = await prisma.industryVisaRule.count({
     *   where: {
     *     // ... the filter for the IndustryVisaRules we want to count
     *   }
     * })
    **/
    count<T extends IndustryVisaRuleCountArgs>(
      args?: Subset<T, IndustryVisaRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IndustryVisaRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IndustryVisaRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryVisaRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IndustryVisaRuleAggregateArgs>(args: Subset<T, IndustryVisaRuleAggregateArgs>): Prisma.PrismaPromise<GetIndustryVisaRuleAggregateType<T>>

    /**
     * Group by IndustryVisaRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryVisaRuleGroupByArgs} args - Group by arguments.
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
      T extends IndustryVisaRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IndustryVisaRuleGroupByArgs['orderBy'] }
        : { orderBy?: IndustryVisaRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IndustryVisaRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndustryVisaRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IndustryVisaRule model
   */
  readonly fields: IndustryVisaRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IndustryVisaRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IndustryVisaRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the IndustryVisaRule model
   */
  interface IndustryVisaRuleFieldRefs {
    readonly id: FieldRef<"IndustryVisaRule", 'Int'>
    readonly industryCode: FieldRef<"IndustryVisaRule", 'String'>
    readonly allowedVisa: FieldRef<"IndustryVisaRule", 'String'>
  }
    

  // Custom InputTypes
  /**
   * IndustryVisaRule findUnique
   */
  export type IndustryVisaRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * Filter, which IndustryVisaRule to fetch.
     */
    where: IndustryVisaRuleWhereUniqueInput
  }

  /**
   * IndustryVisaRule findUniqueOrThrow
   */
  export type IndustryVisaRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * Filter, which IndustryVisaRule to fetch.
     */
    where: IndustryVisaRuleWhereUniqueInput
  }

  /**
   * IndustryVisaRule findFirst
   */
  export type IndustryVisaRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * Filter, which IndustryVisaRule to fetch.
     */
    where?: IndustryVisaRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndustryVisaRules to fetch.
     */
    orderBy?: IndustryVisaRuleOrderByWithRelationInput | IndustryVisaRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IndustryVisaRules.
     */
    cursor?: IndustryVisaRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndustryVisaRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndustryVisaRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IndustryVisaRules.
     */
    distinct?: IndustryVisaRuleScalarFieldEnum | IndustryVisaRuleScalarFieldEnum[]
  }

  /**
   * IndustryVisaRule findFirstOrThrow
   */
  export type IndustryVisaRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * Filter, which IndustryVisaRule to fetch.
     */
    where?: IndustryVisaRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndustryVisaRules to fetch.
     */
    orderBy?: IndustryVisaRuleOrderByWithRelationInput | IndustryVisaRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IndustryVisaRules.
     */
    cursor?: IndustryVisaRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndustryVisaRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndustryVisaRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IndustryVisaRules.
     */
    distinct?: IndustryVisaRuleScalarFieldEnum | IndustryVisaRuleScalarFieldEnum[]
  }

  /**
   * IndustryVisaRule findMany
   */
  export type IndustryVisaRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * Filter, which IndustryVisaRules to fetch.
     */
    where?: IndustryVisaRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndustryVisaRules to fetch.
     */
    orderBy?: IndustryVisaRuleOrderByWithRelationInput | IndustryVisaRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IndustryVisaRules.
     */
    cursor?: IndustryVisaRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndustryVisaRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndustryVisaRules.
     */
    skip?: number
    distinct?: IndustryVisaRuleScalarFieldEnum | IndustryVisaRuleScalarFieldEnum[]
  }

  /**
   * IndustryVisaRule create
   */
  export type IndustryVisaRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * The data needed to create a IndustryVisaRule.
     */
    data: XOR<IndustryVisaRuleCreateInput, IndustryVisaRuleUncheckedCreateInput>
  }

  /**
   * IndustryVisaRule createMany
   */
  export type IndustryVisaRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IndustryVisaRules.
     */
    data: IndustryVisaRuleCreateManyInput | IndustryVisaRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IndustryVisaRule createManyAndReturn
   */
  export type IndustryVisaRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * The data used to create many IndustryVisaRules.
     */
    data: IndustryVisaRuleCreateManyInput | IndustryVisaRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IndustryVisaRule update
   */
  export type IndustryVisaRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * The data needed to update a IndustryVisaRule.
     */
    data: XOR<IndustryVisaRuleUpdateInput, IndustryVisaRuleUncheckedUpdateInput>
    /**
     * Choose, which IndustryVisaRule to update.
     */
    where: IndustryVisaRuleWhereUniqueInput
  }

  /**
   * IndustryVisaRule updateMany
   */
  export type IndustryVisaRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IndustryVisaRules.
     */
    data: XOR<IndustryVisaRuleUpdateManyMutationInput, IndustryVisaRuleUncheckedUpdateManyInput>
    /**
     * Filter which IndustryVisaRules to update
     */
    where?: IndustryVisaRuleWhereInput
    /**
     * Limit how many IndustryVisaRules to update.
     */
    limit?: number
  }

  /**
   * IndustryVisaRule updateManyAndReturn
   */
  export type IndustryVisaRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * The data used to update IndustryVisaRules.
     */
    data: XOR<IndustryVisaRuleUpdateManyMutationInput, IndustryVisaRuleUncheckedUpdateManyInput>
    /**
     * Filter which IndustryVisaRules to update
     */
    where?: IndustryVisaRuleWhereInput
    /**
     * Limit how many IndustryVisaRules to update.
     */
    limit?: number
  }

  /**
   * IndustryVisaRule upsert
   */
  export type IndustryVisaRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * The filter to search for the IndustryVisaRule to update in case it exists.
     */
    where: IndustryVisaRuleWhereUniqueInput
    /**
     * In case the IndustryVisaRule found by the `where` argument doesn't exist, create a new IndustryVisaRule with this data.
     */
    create: XOR<IndustryVisaRuleCreateInput, IndustryVisaRuleUncheckedCreateInput>
    /**
     * In case the IndustryVisaRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IndustryVisaRuleUpdateInput, IndustryVisaRuleUncheckedUpdateInput>
  }

  /**
   * IndustryVisaRule delete
   */
  export type IndustryVisaRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
    /**
     * Filter which IndustryVisaRule to delete.
     */
    where: IndustryVisaRuleWhereUniqueInput
  }

  /**
   * IndustryVisaRule deleteMany
   */
  export type IndustryVisaRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IndustryVisaRules to delete
     */
    where?: IndustryVisaRuleWhereInput
    /**
     * Limit how many IndustryVisaRules to delete.
     */
    limit?: number
  }

  /**
   * IndustryVisaRule without action
   */
  export type IndustryVisaRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryVisaRule
     */
    select?: IndustryVisaRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustryVisaRule
     */
    omit?: IndustryVisaRuleOmit<ExtArgs> | null
  }


  /**
   * Model JobPosting
   */

  export type AggregateJobPosting = {
    _count: JobPostingCountAggregateOutputType | null
    _avg: JobPostingAvgAggregateOutputType | null
    _sum: JobPostingSumAggregateOutputType | null
    _min: JobPostingMinAggregateOutputType | null
    _max: JobPostingMaxAggregateOutputType | null
  }

  export type JobPostingAvgAggregateOutputType = {
    jobId: number | null
    corporateId: number | null
    minKoreanLevel: number | null
  }

  export type JobPostingSumAggregateOutputType = {
    jobId: bigint | null
    corporateId: bigint | null
    minKoreanLevel: number | null
  }

  export type JobPostingMinAggregateOutputType = {
    jobId: bigint | null
    corporateId: bigint | null
    boardType: $Enums.BoardType | null
    title: string | null
    description: string | null
    workContentImg: string | null
    status: $Enums.PostStatus | null
    isPremium: boolean | null
    premiumStartAt: Date | null
    premiumEndAt: Date | null
    closingDate: Date | null
    isRecruitmentEnd: boolean | null
    displayAddress: string | null
    actualAddress: string | null
    workIntensity: $Enums.Intensity | null
    allowedVisas: string | null
    minKoreanLevel: number | null
    contactName: string | null
    contactPhone: string | null
    intervieAPPLICANTwMethod: $Enums.InterviewType | null
    interviewPlace: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobPostingMaxAggregateOutputType = {
    jobId: bigint | null
    corporateId: bigint | null
    boardType: $Enums.BoardType | null
    title: string | null
    description: string | null
    workContentImg: string | null
    status: $Enums.PostStatus | null
    isPremium: boolean | null
    premiumStartAt: Date | null
    premiumEndAt: Date | null
    closingDate: Date | null
    isRecruitmentEnd: boolean | null
    displayAddress: string | null
    actualAddress: string | null
    workIntensity: $Enums.Intensity | null
    allowedVisas: string | null
    minKoreanLevel: number | null
    contactName: string | null
    contactPhone: string | null
    intervieAPPLICANTwMethod: $Enums.InterviewType | null
    interviewPlace: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobPostingCountAggregateOutputType = {
    jobId: number
    corporateId: number
    boardType: number
    title: number
    description: number
    workContentImg: number
    status: number
    isPremium: number
    premiumStartAt: number
    premiumEndAt: number
    closingDate: number
    isRecruitmentEnd: number
    displayAddress: number
    actualAddress: number
    workIntensity: number
    benefits: number
    allowedVisas: number
    minKoreanLevel: number
    contactName: number
    contactPhone: number
    intervieAPPLICANTwMethod: number
    interviewPlace: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobPostingAvgAggregateInputType = {
    jobId?: true
    corporateId?: true
    minKoreanLevel?: true
  }

  export type JobPostingSumAggregateInputType = {
    jobId?: true
    corporateId?: true
    minKoreanLevel?: true
  }

  export type JobPostingMinAggregateInputType = {
    jobId?: true
    corporateId?: true
    boardType?: true
    title?: true
    description?: true
    workContentImg?: true
    status?: true
    isPremium?: true
    premiumStartAt?: true
    premiumEndAt?: true
    closingDate?: true
    isRecruitmentEnd?: true
    displayAddress?: true
    actualAddress?: true
    workIntensity?: true
    allowedVisas?: true
    minKoreanLevel?: true
    contactName?: true
    contactPhone?: true
    intervieAPPLICANTwMethod?: true
    interviewPlace?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobPostingMaxAggregateInputType = {
    jobId?: true
    corporateId?: true
    boardType?: true
    title?: true
    description?: true
    workContentImg?: true
    status?: true
    isPremium?: true
    premiumStartAt?: true
    premiumEndAt?: true
    closingDate?: true
    isRecruitmentEnd?: true
    displayAddress?: true
    actualAddress?: true
    workIntensity?: true
    allowedVisas?: true
    minKoreanLevel?: true
    contactName?: true
    contactPhone?: true
    intervieAPPLICANTwMethod?: true
    interviewPlace?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobPostingCountAggregateInputType = {
    jobId?: true
    corporateId?: true
    boardType?: true
    title?: true
    description?: true
    workContentImg?: true
    status?: true
    isPremium?: true
    premiumStartAt?: true
    premiumEndAt?: true
    closingDate?: true
    isRecruitmentEnd?: true
    displayAddress?: true
    actualAddress?: true
    workIntensity?: true
    benefits?: true
    allowedVisas?: true
    minKoreanLevel?: true
    contactName?: true
    contactPhone?: true
    intervieAPPLICANTwMethod?: true
    interviewPlace?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobPostingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPosting to aggregate.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobPostings
    **/
    _count?: true | JobPostingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobPostingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobPostingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobPostingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobPostingMaxAggregateInputType
  }

  export type GetJobPostingAggregateType<T extends JobPostingAggregateArgs> = {
        [P in keyof T & keyof AggregateJobPosting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobPosting[P]>
      : GetScalarType<T[P], AggregateJobPosting[P]>
  }




  export type JobPostingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobPostingWhereInput
    orderBy?: JobPostingOrderByWithAggregationInput | JobPostingOrderByWithAggregationInput[]
    by: JobPostingScalarFieldEnum[] | JobPostingScalarFieldEnum
    having?: JobPostingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobPostingCountAggregateInputType | true
    _avg?: JobPostingAvgAggregateInputType
    _sum?: JobPostingSumAggregateInputType
    _min?: JobPostingMinAggregateInputType
    _max?: JobPostingMaxAggregateInputType
  }

  export type JobPostingGroupByOutputType = {
    jobId: bigint
    corporateId: bigint
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg: string | null
    status: $Enums.PostStatus
    isPremium: boolean
    premiumStartAt: Date | null
    premiumEndAt: Date | null
    closingDate: Date | null
    isRecruitmentEnd: boolean
    displayAddress: string
    actualAddress: string
    workIntensity: $Enums.Intensity
    benefits: JsonValue | null
    allowedVisas: string
    minKoreanLevel: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod: $Enums.InterviewType
    interviewPlace: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: JobPostingCountAggregateOutputType | null
    _avg: JobPostingAvgAggregateOutputType | null
    _sum: JobPostingSumAggregateOutputType | null
    _min: JobPostingMinAggregateOutputType | null
    _max: JobPostingMaxAggregateOutputType | null
  }

  type GetJobPostingGroupByPayload<T extends JobPostingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobPostingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobPostingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobPostingGroupByOutputType[P]>
            : GetScalarType<T[P], JobPostingGroupByOutputType[P]>
        }
      >
    >


  export type JobPostingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    corporateId?: boolean
    boardType?: boolean
    title?: boolean
    description?: boolean
    workContentImg?: boolean
    status?: boolean
    isPremium?: boolean
    premiumStartAt?: boolean
    premiumEndAt?: boolean
    closingDate?: boolean
    isRecruitmentEnd?: boolean
    displayAddress?: boolean
    actualAddress?: boolean
    workIntensity?: boolean
    benefits?: boolean
    allowedVisas?: boolean
    minKoreanLevel?: boolean
    contactName?: boolean
    contactPhone?: boolean
    intervieAPPLICANTwMethod?: boolean
    interviewPlace?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    albaAttributes?: boolean | JobPosting$albaAttributesArgs<ExtArgs>
    fulltimeAttributes?: boolean | JobPosting$fulltimeAttributesArgs<ExtArgs>
    interviewSlots?: boolean | JobPosting$interviewSlotsArgs<ExtArgs>
    applications?: boolean | JobPosting$applicationsArgs<ExtArgs>
    _count?: boolean | JobPostingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    corporateId?: boolean
    boardType?: boolean
    title?: boolean
    description?: boolean
    workContentImg?: boolean
    status?: boolean
    isPremium?: boolean
    premiumStartAt?: boolean
    premiumEndAt?: boolean
    closingDate?: boolean
    isRecruitmentEnd?: boolean
    displayAddress?: boolean
    actualAddress?: boolean
    workIntensity?: boolean
    benefits?: boolean
    allowedVisas?: boolean
    minKoreanLevel?: boolean
    contactName?: boolean
    contactPhone?: boolean
    intervieAPPLICANTwMethod?: boolean
    interviewPlace?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    corporateId?: boolean
    boardType?: boolean
    title?: boolean
    description?: boolean
    workContentImg?: boolean
    status?: boolean
    isPremium?: boolean
    premiumStartAt?: boolean
    premiumEndAt?: boolean
    closingDate?: boolean
    isRecruitmentEnd?: boolean
    displayAddress?: boolean
    actualAddress?: boolean
    workIntensity?: boolean
    benefits?: boolean
    allowedVisas?: boolean
    minKoreanLevel?: boolean
    contactName?: boolean
    contactPhone?: boolean
    intervieAPPLICANTwMethod?: boolean
    interviewPlace?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jobPosting"]>

  export type JobPostingSelectScalar = {
    jobId?: boolean
    corporateId?: boolean
    boardType?: boolean
    title?: boolean
    description?: boolean
    workContentImg?: boolean
    status?: boolean
    isPremium?: boolean
    premiumStartAt?: boolean
    premiumEndAt?: boolean
    closingDate?: boolean
    isRecruitmentEnd?: boolean
    displayAddress?: boolean
    actualAddress?: boolean
    workIntensity?: boolean
    benefits?: boolean
    allowedVisas?: boolean
    minKoreanLevel?: boolean
    contactName?: boolean
    contactPhone?: boolean
    intervieAPPLICANTwMethod?: boolean
    interviewPlace?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobPostingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"jobId" | "corporateId" | "boardType" | "title" | "description" | "workContentImg" | "status" | "isPremium" | "premiumStartAt" | "premiumEndAt" | "closingDate" | "isRecruitmentEnd" | "displayAddress" | "actualAddress" | "workIntensity" | "benefits" | "allowedVisas" | "minKoreanLevel" | "contactName" | "contactPhone" | "intervieAPPLICANTwMethod" | "interviewPlace" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["jobPosting"]>
  export type JobPostingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    albaAttributes?: boolean | JobPosting$albaAttributesArgs<ExtArgs>
    fulltimeAttributes?: boolean | JobPosting$fulltimeAttributesArgs<ExtArgs>
    interviewSlots?: boolean | JobPosting$interviewSlotsArgs<ExtArgs>
    applications?: boolean | JobPosting$applicationsArgs<ExtArgs>
    _count?: boolean | JobPostingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobPostingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type JobPostingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $JobPostingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobPosting"
    objects: {
      albaAttributes: Prisma.$JobAttributesAlbaPayload<ExtArgs> | null
      fulltimeAttributes: Prisma.$JobAttributesFulltimePayload<ExtArgs> | null
      interviewSlots: Prisma.$InterviewSlotPayload<ExtArgs>[]
      applications: Prisma.$JobApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      jobId: bigint
      corporateId: bigint
      boardType: $Enums.BoardType
      title: string
      description: string
      workContentImg: string | null
      status: $Enums.PostStatus
      isPremium: boolean
      premiumStartAt: Date | null
      premiumEndAt: Date | null
      closingDate: Date | null
      isRecruitmentEnd: boolean
      displayAddress: string
      actualAddress: string
      workIntensity: $Enums.Intensity
      benefits: Prisma.JsonValue | null
      allowedVisas: string
      minKoreanLevel: number
      contactName: string
      contactPhone: string
      intervieAPPLICANTwMethod: $Enums.InterviewType
      interviewPlace: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobPosting"]>
    composites: {}
  }

  type JobPostingGetPayload<S extends boolean | null | undefined | JobPostingDefaultArgs> = $Result.GetResult<Prisma.$JobPostingPayload, S>

  type JobPostingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobPostingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobPostingCountAggregateInputType | true
    }

  export interface JobPostingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobPosting'], meta: { name: 'JobPosting' } }
    /**
     * Find zero or one JobPosting that matches the filter.
     * @param {JobPostingFindUniqueArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobPostingFindUniqueArgs>(args: SelectSubset<T, JobPostingFindUniqueArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobPosting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobPostingFindUniqueOrThrowArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobPostingFindUniqueOrThrowArgs>(args: SelectSubset<T, JobPostingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobPosting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindFirstArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobPostingFindFirstArgs>(args?: SelectSubset<T, JobPostingFindFirstArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobPosting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindFirstOrThrowArgs} args - Arguments to find a JobPosting
     * @example
     * // Get one JobPosting
     * const jobPosting = await prisma.jobPosting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobPostingFindFirstOrThrowArgs>(args?: SelectSubset<T, JobPostingFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobPostings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobPostings
     * const jobPostings = await prisma.jobPosting.findMany()
     * 
     * // Get first 10 JobPostings
     * const jobPostings = await prisma.jobPosting.findMany({ take: 10 })
     * 
     * // Only select the `jobId`
     * const jobPostingWithJobIdOnly = await prisma.jobPosting.findMany({ select: { jobId: true } })
     * 
     */
    findMany<T extends JobPostingFindManyArgs>(args?: SelectSubset<T, JobPostingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobPosting.
     * @param {JobPostingCreateArgs} args - Arguments to create a JobPosting.
     * @example
     * // Create one JobPosting
     * const JobPosting = await prisma.jobPosting.create({
     *   data: {
     *     // ... data to create a JobPosting
     *   }
     * })
     * 
     */
    create<T extends JobPostingCreateArgs>(args: SelectSubset<T, JobPostingCreateArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobPostings.
     * @param {JobPostingCreateManyArgs} args - Arguments to create many JobPostings.
     * @example
     * // Create many JobPostings
     * const jobPosting = await prisma.jobPosting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobPostingCreateManyArgs>(args?: SelectSubset<T, JobPostingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobPostings and returns the data saved in the database.
     * @param {JobPostingCreateManyAndReturnArgs} args - Arguments to create many JobPostings.
     * @example
     * // Create many JobPostings
     * const jobPosting = await prisma.jobPosting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobPostings and only return the `jobId`
     * const jobPostingWithJobIdOnly = await prisma.jobPosting.createManyAndReturn({
     *   select: { jobId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobPostingCreateManyAndReturnArgs>(args?: SelectSubset<T, JobPostingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobPosting.
     * @param {JobPostingDeleteArgs} args - Arguments to delete one JobPosting.
     * @example
     * // Delete one JobPosting
     * const JobPosting = await prisma.jobPosting.delete({
     *   where: {
     *     // ... filter to delete one JobPosting
     *   }
     * })
     * 
     */
    delete<T extends JobPostingDeleteArgs>(args: SelectSubset<T, JobPostingDeleteArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobPosting.
     * @param {JobPostingUpdateArgs} args - Arguments to update one JobPosting.
     * @example
     * // Update one JobPosting
     * const jobPosting = await prisma.jobPosting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobPostingUpdateArgs>(args: SelectSubset<T, JobPostingUpdateArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobPostings.
     * @param {JobPostingDeleteManyArgs} args - Arguments to filter JobPostings to delete.
     * @example
     * // Delete a few JobPostings
     * const { count } = await prisma.jobPosting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobPostingDeleteManyArgs>(args?: SelectSubset<T, JobPostingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobPostings
     * const jobPosting = await prisma.jobPosting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobPostingUpdateManyArgs>(args: SelectSubset<T, JobPostingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobPostings and returns the data updated in the database.
     * @param {JobPostingUpdateManyAndReturnArgs} args - Arguments to update many JobPostings.
     * @example
     * // Update many JobPostings
     * const jobPosting = await prisma.jobPosting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobPostings and only return the `jobId`
     * const jobPostingWithJobIdOnly = await prisma.jobPosting.updateManyAndReturn({
     *   select: { jobId: true },
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
    updateManyAndReturn<T extends JobPostingUpdateManyAndReturnArgs>(args: SelectSubset<T, JobPostingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobPosting.
     * @param {JobPostingUpsertArgs} args - Arguments to update or create a JobPosting.
     * @example
     * // Update or create a JobPosting
     * const jobPosting = await prisma.jobPosting.upsert({
     *   create: {
     *     // ... data to create a JobPosting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobPosting we want to update
     *   }
     * })
     */
    upsert<T extends JobPostingUpsertArgs>(args: SelectSubset<T, JobPostingUpsertArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingCountArgs} args - Arguments to filter JobPostings to count.
     * @example
     * // Count the number of JobPostings
     * const count = await prisma.jobPosting.count({
     *   where: {
     *     // ... the filter for the JobPostings we want to count
     *   }
     * })
    **/
    count<T extends JobPostingCountArgs>(
      args?: Subset<T, JobPostingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobPostingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobPostingAggregateArgs>(args: Subset<T, JobPostingAggregateArgs>): Prisma.PrismaPromise<GetJobPostingAggregateType<T>>

    /**
     * Group by JobPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobPostingGroupByArgs} args - Group by arguments.
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
      T extends JobPostingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobPostingGroupByArgs['orderBy'] }
        : { orderBy?: JobPostingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobPostingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobPostingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobPosting model
   */
  readonly fields: JobPostingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobPosting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobPostingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    albaAttributes<T extends JobPosting$albaAttributesArgs<ExtArgs> = {}>(args?: Subset<T, JobPosting$albaAttributesArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    fulltimeAttributes<T extends JobPosting$fulltimeAttributesArgs<ExtArgs> = {}>(args?: Subset<T, JobPosting$fulltimeAttributesArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    interviewSlots<T extends JobPosting$interviewSlotsArgs<ExtArgs> = {}>(args?: Subset<T, JobPosting$interviewSlotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applications<T extends JobPosting$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, JobPosting$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the JobPosting model
   */
  interface JobPostingFieldRefs {
    readonly jobId: FieldRef<"JobPosting", 'BigInt'>
    readonly corporateId: FieldRef<"JobPosting", 'BigInt'>
    readonly boardType: FieldRef<"JobPosting", 'BoardType'>
    readonly title: FieldRef<"JobPosting", 'String'>
    readonly description: FieldRef<"JobPosting", 'String'>
    readonly workContentImg: FieldRef<"JobPosting", 'String'>
    readonly status: FieldRef<"JobPosting", 'PostStatus'>
    readonly isPremium: FieldRef<"JobPosting", 'Boolean'>
    readonly premiumStartAt: FieldRef<"JobPosting", 'DateTime'>
    readonly premiumEndAt: FieldRef<"JobPosting", 'DateTime'>
    readonly closingDate: FieldRef<"JobPosting", 'DateTime'>
    readonly isRecruitmentEnd: FieldRef<"JobPosting", 'Boolean'>
    readonly displayAddress: FieldRef<"JobPosting", 'String'>
    readonly actualAddress: FieldRef<"JobPosting", 'String'>
    readonly workIntensity: FieldRef<"JobPosting", 'Intensity'>
    readonly benefits: FieldRef<"JobPosting", 'Json'>
    readonly allowedVisas: FieldRef<"JobPosting", 'String'>
    readonly minKoreanLevel: FieldRef<"JobPosting", 'Int'>
    readonly contactName: FieldRef<"JobPosting", 'String'>
    readonly contactPhone: FieldRef<"JobPosting", 'String'>
    readonly intervieAPPLICANTwMethod: FieldRef<"JobPosting", 'InterviewType'>
    readonly interviewPlace: FieldRef<"JobPosting", 'String'>
    readonly isActive: FieldRef<"JobPosting", 'Boolean'>
    readonly createdAt: FieldRef<"JobPosting", 'DateTime'>
    readonly updatedAt: FieldRef<"JobPosting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobPosting findUnique
   */
  export type JobPostingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting findUniqueOrThrow
   */
  export type JobPostingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting findFirst
   */
  export type JobPostingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting findFirstOrThrow
   */
  export type JobPostingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPosting to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobPostings.
     */
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting findMany
   */
  export type JobPostingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter, which JobPostings to fetch.
     */
    where?: JobPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobPostings to fetch.
     */
    orderBy?: JobPostingOrderByWithRelationInput | JobPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobPostings.
     */
    cursor?: JobPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobPostings.
     */
    skip?: number
    distinct?: JobPostingScalarFieldEnum | JobPostingScalarFieldEnum[]
  }

  /**
   * JobPosting create
   */
  export type JobPostingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The data needed to create a JobPosting.
     */
    data: XOR<JobPostingCreateInput, JobPostingUncheckedCreateInput>
  }

  /**
   * JobPosting createMany
   */
  export type JobPostingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobPostings.
     */
    data: JobPostingCreateManyInput | JobPostingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobPosting createManyAndReturn
   */
  export type JobPostingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * The data used to create many JobPostings.
     */
    data: JobPostingCreateManyInput | JobPostingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobPosting update
   */
  export type JobPostingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The data needed to update a JobPosting.
     */
    data: XOR<JobPostingUpdateInput, JobPostingUncheckedUpdateInput>
    /**
     * Choose, which JobPosting to update.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting updateMany
   */
  export type JobPostingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobPostings.
     */
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyInput>
    /**
     * Filter which JobPostings to update
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to update.
     */
    limit?: number
  }

  /**
   * JobPosting updateManyAndReturn
   */
  export type JobPostingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * The data used to update JobPostings.
     */
    data: XOR<JobPostingUpdateManyMutationInput, JobPostingUncheckedUpdateManyInput>
    /**
     * Filter which JobPostings to update
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to update.
     */
    limit?: number
  }

  /**
   * JobPosting upsert
   */
  export type JobPostingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * The filter to search for the JobPosting to update in case it exists.
     */
    where: JobPostingWhereUniqueInput
    /**
     * In case the JobPosting found by the `where` argument doesn't exist, create a new JobPosting with this data.
     */
    create: XOR<JobPostingCreateInput, JobPostingUncheckedCreateInput>
    /**
     * In case the JobPosting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobPostingUpdateInput, JobPostingUncheckedUpdateInput>
  }

  /**
   * JobPosting delete
   */
  export type JobPostingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
    /**
     * Filter which JobPosting to delete.
     */
    where: JobPostingWhereUniqueInput
  }

  /**
   * JobPosting deleteMany
   */
  export type JobPostingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobPostings to delete
     */
    where?: JobPostingWhereInput
    /**
     * Limit how many JobPostings to delete.
     */
    limit?: number
  }

  /**
   * JobPosting.albaAttributes
   */
  export type JobPosting$albaAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    where?: JobAttributesAlbaWhereInput
  }

  /**
   * JobPosting.fulltimeAttributes
   */
  export type JobPosting$fulltimeAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    where?: JobAttributesFulltimeWhereInput
  }

  /**
   * JobPosting.interviewSlots
   */
  export type JobPosting$interviewSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    where?: InterviewSlotWhereInput
    orderBy?: InterviewSlotOrderByWithRelationInput | InterviewSlotOrderByWithRelationInput[]
    cursor?: InterviewSlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewSlotScalarFieldEnum | InterviewSlotScalarFieldEnum[]
  }

  /**
   * JobPosting.applications
   */
  export type JobPosting$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    cursor?: JobApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobPosting without action
   */
  export type JobPostingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobPosting
     */
    select?: JobPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobPosting
     */
    omit?: JobPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobPostingInclude<ExtArgs> | null
  }


  /**
   * Model JobAttributesAlba
   */

  export type AggregateJobAttributesAlba = {
    _count: JobAttributesAlbaCountAggregateOutputType | null
    _avg: JobAttributesAlbaAvgAggregateOutputType | null
    _sum: JobAttributesAlbaSumAggregateOutputType | null
    _min: JobAttributesAlbaMinAggregateOutputType | null
    _max: JobAttributesAlbaMaxAggregateOutputType | null
  }

  export type JobAttributesAlbaAvgAggregateOutputType = {
    jobId: number | null
    hourlyWage: number | null
  }

  export type JobAttributesAlbaSumAggregateOutputType = {
    jobId: bigint | null
    hourlyWage: number | null
  }

  export type JobAttributesAlbaMinAggregateOutputType = {
    jobId: bigint | null
    hourlyWage: number | null
    workPeriod: string | null
    workDaysMask: string | null
    workTimeStart: Date | null
    workTimeEnd: Date | null
  }

  export type JobAttributesAlbaMaxAggregateOutputType = {
    jobId: bigint | null
    hourlyWage: number | null
    workPeriod: string | null
    workDaysMask: string | null
    workTimeStart: Date | null
    workTimeEnd: Date | null
  }

  export type JobAttributesAlbaCountAggregateOutputType = {
    jobId: number
    hourlyWage: number
    workPeriod: number
    workDaysMask: number
    workTimeStart: number
    workTimeEnd: number
    _all: number
  }


  export type JobAttributesAlbaAvgAggregateInputType = {
    jobId?: true
    hourlyWage?: true
  }

  export type JobAttributesAlbaSumAggregateInputType = {
    jobId?: true
    hourlyWage?: true
  }

  export type JobAttributesAlbaMinAggregateInputType = {
    jobId?: true
    hourlyWage?: true
    workPeriod?: true
    workDaysMask?: true
    workTimeStart?: true
    workTimeEnd?: true
  }

  export type JobAttributesAlbaMaxAggregateInputType = {
    jobId?: true
    hourlyWage?: true
    workPeriod?: true
    workDaysMask?: true
    workTimeStart?: true
    workTimeEnd?: true
  }

  export type JobAttributesAlbaCountAggregateInputType = {
    jobId?: true
    hourlyWage?: true
    workPeriod?: true
    workDaysMask?: true
    workTimeStart?: true
    workTimeEnd?: true
    _all?: true
  }

  export type JobAttributesAlbaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobAttributesAlba to aggregate.
     */
    where?: JobAttributesAlbaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAttributesAlbas to fetch.
     */
    orderBy?: JobAttributesAlbaOrderByWithRelationInput | JobAttributesAlbaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobAttributesAlbaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAttributesAlbas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAttributesAlbas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobAttributesAlbas
    **/
    _count?: true | JobAttributesAlbaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAttributesAlbaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobAttributesAlbaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobAttributesAlbaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobAttributesAlbaMaxAggregateInputType
  }

  export type GetJobAttributesAlbaAggregateType<T extends JobAttributesAlbaAggregateArgs> = {
        [P in keyof T & keyof AggregateJobAttributesAlba]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobAttributesAlba[P]>
      : GetScalarType<T[P], AggregateJobAttributesAlba[P]>
  }




  export type JobAttributesAlbaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobAttributesAlbaWhereInput
    orderBy?: JobAttributesAlbaOrderByWithAggregationInput | JobAttributesAlbaOrderByWithAggregationInput[]
    by: JobAttributesAlbaScalarFieldEnum[] | JobAttributesAlbaScalarFieldEnum
    having?: JobAttributesAlbaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobAttributesAlbaCountAggregateInputType | true
    _avg?: JobAttributesAlbaAvgAggregateInputType
    _sum?: JobAttributesAlbaSumAggregateInputType
    _min?: JobAttributesAlbaMinAggregateInputType
    _max?: JobAttributesAlbaMaxAggregateInputType
  }

  export type JobAttributesAlbaGroupByOutputType = {
    jobId: bigint
    hourlyWage: number
    workPeriod: string | null
    workDaysMask: string
    workTimeStart: Date | null
    workTimeEnd: Date | null
    _count: JobAttributesAlbaCountAggregateOutputType | null
    _avg: JobAttributesAlbaAvgAggregateOutputType | null
    _sum: JobAttributesAlbaSumAggregateOutputType | null
    _min: JobAttributesAlbaMinAggregateOutputType | null
    _max: JobAttributesAlbaMaxAggregateOutputType | null
  }

  type GetJobAttributesAlbaGroupByPayload<T extends JobAttributesAlbaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobAttributesAlbaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobAttributesAlbaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobAttributesAlbaGroupByOutputType[P]>
            : GetScalarType<T[P], JobAttributesAlbaGroupByOutputType[P]>
        }
      >
    >


  export type JobAttributesAlbaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    hourlyWage?: boolean
    workPeriod?: boolean
    workDaysMask?: boolean
    workTimeStart?: boolean
    workTimeEnd?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobAttributesAlba"]>

  export type JobAttributesAlbaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    hourlyWage?: boolean
    workPeriod?: boolean
    workDaysMask?: boolean
    workTimeStart?: boolean
    workTimeEnd?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobAttributesAlba"]>

  export type JobAttributesAlbaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    hourlyWage?: boolean
    workPeriod?: boolean
    workDaysMask?: boolean
    workTimeStart?: boolean
    workTimeEnd?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobAttributesAlba"]>

  export type JobAttributesAlbaSelectScalar = {
    jobId?: boolean
    hourlyWage?: boolean
    workPeriod?: boolean
    workDaysMask?: boolean
    workTimeStart?: boolean
    workTimeEnd?: boolean
  }

  export type JobAttributesAlbaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"jobId" | "hourlyWage" | "workPeriod" | "workDaysMask" | "workTimeStart" | "workTimeEnd", ExtArgs["result"]["jobAttributesAlba"]>
  export type JobAttributesAlbaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type JobAttributesAlbaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type JobAttributesAlbaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }

  export type $JobAttributesAlbaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobAttributesAlba"
    objects: {
      job: Prisma.$JobPostingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      jobId: bigint
      hourlyWage: number
      workPeriod: string | null
      workDaysMask: string
      workTimeStart: Date | null
      workTimeEnd: Date | null
    }, ExtArgs["result"]["jobAttributesAlba"]>
    composites: {}
  }

  type JobAttributesAlbaGetPayload<S extends boolean | null | undefined | JobAttributesAlbaDefaultArgs> = $Result.GetResult<Prisma.$JobAttributesAlbaPayload, S>

  type JobAttributesAlbaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobAttributesAlbaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobAttributesAlbaCountAggregateInputType | true
    }

  export interface JobAttributesAlbaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobAttributesAlba'], meta: { name: 'JobAttributesAlba' } }
    /**
     * Find zero or one JobAttributesAlba that matches the filter.
     * @param {JobAttributesAlbaFindUniqueArgs} args - Arguments to find a JobAttributesAlba
     * @example
     * // Get one JobAttributesAlba
     * const jobAttributesAlba = await prisma.jobAttributesAlba.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobAttributesAlbaFindUniqueArgs>(args: SelectSubset<T, JobAttributesAlbaFindUniqueArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobAttributesAlba that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobAttributesAlbaFindUniqueOrThrowArgs} args - Arguments to find a JobAttributesAlba
     * @example
     * // Get one JobAttributesAlba
     * const jobAttributesAlba = await prisma.jobAttributesAlba.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobAttributesAlbaFindUniqueOrThrowArgs>(args: SelectSubset<T, JobAttributesAlbaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobAttributesAlba that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesAlbaFindFirstArgs} args - Arguments to find a JobAttributesAlba
     * @example
     * // Get one JobAttributesAlba
     * const jobAttributesAlba = await prisma.jobAttributesAlba.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobAttributesAlbaFindFirstArgs>(args?: SelectSubset<T, JobAttributesAlbaFindFirstArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobAttributesAlba that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesAlbaFindFirstOrThrowArgs} args - Arguments to find a JobAttributesAlba
     * @example
     * // Get one JobAttributesAlba
     * const jobAttributesAlba = await prisma.jobAttributesAlba.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobAttributesAlbaFindFirstOrThrowArgs>(args?: SelectSubset<T, JobAttributesAlbaFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobAttributesAlbas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesAlbaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobAttributesAlbas
     * const jobAttributesAlbas = await prisma.jobAttributesAlba.findMany()
     * 
     * // Get first 10 JobAttributesAlbas
     * const jobAttributesAlbas = await prisma.jobAttributesAlba.findMany({ take: 10 })
     * 
     * // Only select the `jobId`
     * const jobAttributesAlbaWithJobIdOnly = await prisma.jobAttributesAlba.findMany({ select: { jobId: true } })
     * 
     */
    findMany<T extends JobAttributesAlbaFindManyArgs>(args?: SelectSubset<T, JobAttributesAlbaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobAttributesAlba.
     * @param {JobAttributesAlbaCreateArgs} args - Arguments to create a JobAttributesAlba.
     * @example
     * // Create one JobAttributesAlba
     * const JobAttributesAlba = await prisma.jobAttributesAlba.create({
     *   data: {
     *     // ... data to create a JobAttributesAlba
     *   }
     * })
     * 
     */
    create<T extends JobAttributesAlbaCreateArgs>(args: SelectSubset<T, JobAttributesAlbaCreateArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobAttributesAlbas.
     * @param {JobAttributesAlbaCreateManyArgs} args - Arguments to create many JobAttributesAlbas.
     * @example
     * // Create many JobAttributesAlbas
     * const jobAttributesAlba = await prisma.jobAttributesAlba.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobAttributesAlbaCreateManyArgs>(args?: SelectSubset<T, JobAttributesAlbaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobAttributesAlbas and returns the data saved in the database.
     * @param {JobAttributesAlbaCreateManyAndReturnArgs} args - Arguments to create many JobAttributesAlbas.
     * @example
     * // Create many JobAttributesAlbas
     * const jobAttributesAlba = await prisma.jobAttributesAlba.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobAttributesAlbas and only return the `jobId`
     * const jobAttributesAlbaWithJobIdOnly = await prisma.jobAttributesAlba.createManyAndReturn({
     *   select: { jobId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobAttributesAlbaCreateManyAndReturnArgs>(args?: SelectSubset<T, JobAttributesAlbaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobAttributesAlba.
     * @param {JobAttributesAlbaDeleteArgs} args - Arguments to delete one JobAttributesAlba.
     * @example
     * // Delete one JobAttributesAlba
     * const JobAttributesAlba = await prisma.jobAttributesAlba.delete({
     *   where: {
     *     // ... filter to delete one JobAttributesAlba
     *   }
     * })
     * 
     */
    delete<T extends JobAttributesAlbaDeleteArgs>(args: SelectSubset<T, JobAttributesAlbaDeleteArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobAttributesAlba.
     * @param {JobAttributesAlbaUpdateArgs} args - Arguments to update one JobAttributesAlba.
     * @example
     * // Update one JobAttributesAlba
     * const jobAttributesAlba = await prisma.jobAttributesAlba.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobAttributesAlbaUpdateArgs>(args: SelectSubset<T, JobAttributesAlbaUpdateArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobAttributesAlbas.
     * @param {JobAttributesAlbaDeleteManyArgs} args - Arguments to filter JobAttributesAlbas to delete.
     * @example
     * // Delete a few JobAttributesAlbas
     * const { count } = await prisma.jobAttributesAlba.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobAttributesAlbaDeleteManyArgs>(args?: SelectSubset<T, JobAttributesAlbaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobAttributesAlbas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesAlbaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobAttributesAlbas
     * const jobAttributesAlba = await prisma.jobAttributesAlba.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobAttributesAlbaUpdateManyArgs>(args: SelectSubset<T, JobAttributesAlbaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobAttributesAlbas and returns the data updated in the database.
     * @param {JobAttributesAlbaUpdateManyAndReturnArgs} args - Arguments to update many JobAttributesAlbas.
     * @example
     * // Update many JobAttributesAlbas
     * const jobAttributesAlba = await prisma.jobAttributesAlba.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobAttributesAlbas and only return the `jobId`
     * const jobAttributesAlbaWithJobIdOnly = await prisma.jobAttributesAlba.updateManyAndReturn({
     *   select: { jobId: true },
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
    updateManyAndReturn<T extends JobAttributesAlbaUpdateManyAndReturnArgs>(args: SelectSubset<T, JobAttributesAlbaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobAttributesAlba.
     * @param {JobAttributesAlbaUpsertArgs} args - Arguments to update or create a JobAttributesAlba.
     * @example
     * // Update or create a JobAttributesAlba
     * const jobAttributesAlba = await prisma.jobAttributesAlba.upsert({
     *   create: {
     *     // ... data to create a JobAttributesAlba
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobAttributesAlba we want to update
     *   }
     * })
     */
    upsert<T extends JobAttributesAlbaUpsertArgs>(args: SelectSubset<T, JobAttributesAlbaUpsertArgs<ExtArgs>>): Prisma__JobAttributesAlbaClient<$Result.GetResult<Prisma.$JobAttributesAlbaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobAttributesAlbas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesAlbaCountArgs} args - Arguments to filter JobAttributesAlbas to count.
     * @example
     * // Count the number of JobAttributesAlbas
     * const count = await prisma.jobAttributesAlba.count({
     *   where: {
     *     // ... the filter for the JobAttributesAlbas we want to count
     *   }
     * })
    **/
    count<T extends JobAttributesAlbaCountArgs>(
      args?: Subset<T, JobAttributesAlbaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobAttributesAlbaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobAttributesAlba.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesAlbaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobAttributesAlbaAggregateArgs>(args: Subset<T, JobAttributesAlbaAggregateArgs>): Prisma.PrismaPromise<GetJobAttributesAlbaAggregateType<T>>

    /**
     * Group by JobAttributesAlba.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesAlbaGroupByArgs} args - Group by arguments.
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
      T extends JobAttributesAlbaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobAttributesAlbaGroupByArgs['orderBy'] }
        : { orderBy?: JobAttributesAlbaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobAttributesAlbaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobAttributesAlbaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobAttributesAlba model
   */
  readonly fields: JobAttributesAlbaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobAttributesAlba.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobAttributesAlbaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobPostingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobPostingDefaultArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the JobAttributesAlba model
   */
  interface JobAttributesAlbaFieldRefs {
    readonly jobId: FieldRef<"JobAttributesAlba", 'BigInt'>
    readonly hourlyWage: FieldRef<"JobAttributesAlba", 'Int'>
    readonly workPeriod: FieldRef<"JobAttributesAlba", 'String'>
    readonly workDaysMask: FieldRef<"JobAttributesAlba", 'String'>
    readonly workTimeStart: FieldRef<"JobAttributesAlba", 'DateTime'>
    readonly workTimeEnd: FieldRef<"JobAttributesAlba", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobAttributesAlba findUnique
   */
  export type JobAttributesAlbaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesAlba to fetch.
     */
    where: JobAttributesAlbaWhereUniqueInput
  }

  /**
   * JobAttributesAlba findUniqueOrThrow
   */
  export type JobAttributesAlbaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesAlba to fetch.
     */
    where: JobAttributesAlbaWhereUniqueInput
  }

  /**
   * JobAttributesAlba findFirst
   */
  export type JobAttributesAlbaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesAlba to fetch.
     */
    where?: JobAttributesAlbaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAttributesAlbas to fetch.
     */
    orderBy?: JobAttributesAlbaOrderByWithRelationInput | JobAttributesAlbaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobAttributesAlbas.
     */
    cursor?: JobAttributesAlbaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAttributesAlbas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAttributesAlbas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobAttributesAlbas.
     */
    distinct?: JobAttributesAlbaScalarFieldEnum | JobAttributesAlbaScalarFieldEnum[]
  }

  /**
   * JobAttributesAlba findFirstOrThrow
   */
  export type JobAttributesAlbaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesAlba to fetch.
     */
    where?: JobAttributesAlbaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAttributesAlbas to fetch.
     */
    orderBy?: JobAttributesAlbaOrderByWithRelationInput | JobAttributesAlbaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobAttributesAlbas.
     */
    cursor?: JobAttributesAlbaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAttributesAlbas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAttributesAlbas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobAttributesAlbas.
     */
    distinct?: JobAttributesAlbaScalarFieldEnum | JobAttributesAlbaScalarFieldEnum[]
  }

  /**
   * JobAttributesAlba findMany
   */
  export type JobAttributesAlbaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesAlbas to fetch.
     */
    where?: JobAttributesAlbaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAttributesAlbas to fetch.
     */
    orderBy?: JobAttributesAlbaOrderByWithRelationInput | JobAttributesAlbaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobAttributesAlbas.
     */
    cursor?: JobAttributesAlbaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAttributesAlbas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAttributesAlbas.
     */
    skip?: number
    distinct?: JobAttributesAlbaScalarFieldEnum | JobAttributesAlbaScalarFieldEnum[]
  }

  /**
   * JobAttributesAlba create
   */
  export type JobAttributesAlbaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * The data needed to create a JobAttributesAlba.
     */
    data: XOR<JobAttributesAlbaCreateInput, JobAttributesAlbaUncheckedCreateInput>
  }

  /**
   * JobAttributesAlba createMany
   */
  export type JobAttributesAlbaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobAttributesAlbas.
     */
    data: JobAttributesAlbaCreateManyInput | JobAttributesAlbaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobAttributesAlba createManyAndReturn
   */
  export type JobAttributesAlbaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * The data used to create many JobAttributesAlbas.
     */
    data: JobAttributesAlbaCreateManyInput | JobAttributesAlbaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobAttributesAlba update
   */
  export type JobAttributesAlbaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * The data needed to update a JobAttributesAlba.
     */
    data: XOR<JobAttributesAlbaUpdateInput, JobAttributesAlbaUncheckedUpdateInput>
    /**
     * Choose, which JobAttributesAlba to update.
     */
    where: JobAttributesAlbaWhereUniqueInput
  }

  /**
   * JobAttributesAlba updateMany
   */
  export type JobAttributesAlbaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobAttributesAlbas.
     */
    data: XOR<JobAttributesAlbaUpdateManyMutationInput, JobAttributesAlbaUncheckedUpdateManyInput>
    /**
     * Filter which JobAttributesAlbas to update
     */
    where?: JobAttributesAlbaWhereInput
    /**
     * Limit how many JobAttributesAlbas to update.
     */
    limit?: number
  }

  /**
   * JobAttributesAlba updateManyAndReturn
   */
  export type JobAttributesAlbaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * The data used to update JobAttributesAlbas.
     */
    data: XOR<JobAttributesAlbaUpdateManyMutationInput, JobAttributesAlbaUncheckedUpdateManyInput>
    /**
     * Filter which JobAttributesAlbas to update
     */
    where?: JobAttributesAlbaWhereInput
    /**
     * Limit how many JobAttributesAlbas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobAttributesAlba upsert
   */
  export type JobAttributesAlbaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * The filter to search for the JobAttributesAlba to update in case it exists.
     */
    where: JobAttributesAlbaWhereUniqueInput
    /**
     * In case the JobAttributesAlba found by the `where` argument doesn't exist, create a new JobAttributesAlba with this data.
     */
    create: XOR<JobAttributesAlbaCreateInput, JobAttributesAlbaUncheckedCreateInput>
    /**
     * In case the JobAttributesAlba was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobAttributesAlbaUpdateInput, JobAttributesAlbaUncheckedUpdateInput>
  }

  /**
   * JobAttributesAlba delete
   */
  export type JobAttributesAlbaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
    /**
     * Filter which JobAttributesAlba to delete.
     */
    where: JobAttributesAlbaWhereUniqueInput
  }

  /**
   * JobAttributesAlba deleteMany
   */
  export type JobAttributesAlbaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobAttributesAlbas to delete
     */
    where?: JobAttributesAlbaWhereInput
    /**
     * Limit how many JobAttributesAlbas to delete.
     */
    limit?: number
  }

  /**
   * JobAttributesAlba without action
   */
  export type JobAttributesAlbaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesAlba
     */
    select?: JobAttributesAlbaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesAlba
     */
    omit?: JobAttributesAlbaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesAlbaInclude<ExtArgs> | null
  }


  /**
   * Model JobAttributesFulltime
   */

  export type AggregateJobAttributesFulltime = {
    _count: JobAttributesFulltimeCountAggregateOutputType | null
    _avg: JobAttributesFulltimeAvgAggregateOutputType | null
    _sum: JobAttributesFulltimeSumAggregateOutputType | null
    _min: JobAttributesFulltimeMinAggregateOutputType | null
    _max: JobAttributesFulltimeMaxAggregateOutputType | null
  }

  export type JobAttributesFulltimeAvgAggregateOutputType = {
    jobId: number | null
    salaryMin: number | null
    salaryMax: number | null
  }

  export type JobAttributesFulltimeSumAggregateOutputType = {
    jobId: bigint | null
    salaryMin: number | null
    salaryMax: number | null
  }

  export type JobAttributesFulltimeMinAggregateOutputType = {
    jobId: bigint | null
    salaryMin: number | null
    salaryMax: number | null
    experienceLevel: string | null
    educationLevel: string | null
  }

  export type JobAttributesFulltimeMaxAggregateOutputType = {
    jobId: bigint | null
    salaryMin: number | null
    salaryMax: number | null
    experienceLevel: string | null
    educationLevel: string | null
  }

  export type JobAttributesFulltimeCountAggregateOutputType = {
    jobId: number
    salaryMin: number
    salaryMax: number
    experienceLevel: number
    educationLevel: number
    _all: number
  }


  export type JobAttributesFulltimeAvgAggregateInputType = {
    jobId?: true
    salaryMin?: true
    salaryMax?: true
  }

  export type JobAttributesFulltimeSumAggregateInputType = {
    jobId?: true
    salaryMin?: true
    salaryMax?: true
  }

  export type JobAttributesFulltimeMinAggregateInputType = {
    jobId?: true
    salaryMin?: true
    salaryMax?: true
    experienceLevel?: true
    educationLevel?: true
  }

  export type JobAttributesFulltimeMaxAggregateInputType = {
    jobId?: true
    salaryMin?: true
    salaryMax?: true
    experienceLevel?: true
    educationLevel?: true
  }

  export type JobAttributesFulltimeCountAggregateInputType = {
    jobId?: true
    salaryMin?: true
    salaryMax?: true
    experienceLevel?: true
    educationLevel?: true
    _all?: true
  }

  export type JobAttributesFulltimeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobAttributesFulltime to aggregate.
     */
    where?: JobAttributesFulltimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAttributesFulltimes to fetch.
     */
    orderBy?: JobAttributesFulltimeOrderByWithRelationInput | JobAttributesFulltimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobAttributesFulltimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAttributesFulltimes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAttributesFulltimes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobAttributesFulltimes
    **/
    _count?: true | JobAttributesFulltimeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAttributesFulltimeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobAttributesFulltimeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobAttributesFulltimeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobAttributesFulltimeMaxAggregateInputType
  }

  export type GetJobAttributesFulltimeAggregateType<T extends JobAttributesFulltimeAggregateArgs> = {
        [P in keyof T & keyof AggregateJobAttributesFulltime]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobAttributesFulltime[P]>
      : GetScalarType<T[P], AggregateJobAttributesFulltime[P]>
  }




  export type JobAttributesFulltimeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobAttributesFulltimeWhereInput
    orderBy?: JobAttributesFulltimeOrderByWithAggregationInput | JobAttributesFulltimeOrderByWithAggregationInput[]
    by: JobAttributesFulltimeScalarFieldEnum[] | JobAttributesFulltimeScalarFieldEnum
    having?: JobAttributesFulltimeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobAttributesFulltimeCountAggregateInputType | true
    _avg?: JobAttributesFulltimeAvgAggregateInputType
    _sum?: JobAttributesFulltimeSumAggregateInputType
    _min?: JobAttributesFulltimeMinAggregateInputType
    _max?: JobAttributesFulltimeMaxAggregateInputType
  }

  export type JobAttributesFulltimeGroupByOutputType = {
    jobId: bigint
    salaryMin: number | null
    salaryMax: number | null
    experienceLevel: string
    educationLevel: string
    _count: JobAttributesFulltimeCountAggregateOutputType | null
    _avg: JobAttributesFulltimeAvgAggregateOutputType | null
    _sum: JobAttributesFulltimeSumAggregateOutputType | null
    _min: JobAttributesFulltimeMinAggregateOutputType | null
    _max: JobAttributesFulltimeMaxAggregateOutputType | null
  }

  type GetJobAttributesFulltimeGroupByPayload<T extends JobAttributesFulltimeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobAttributesFulltimeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobAttributesFulltimeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobAttributesFulltimeGroupByOutputType[P]>
            : GetScalarType<T[P], JobAttributesFulltimeGroupByOutputType[P]>
        }
      >
    >


  export type JobAttributesFulltimeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    experienceLevel?: boolean
    educationLevel?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobAttributesFulltime"]>

  export type JobAttributesFulltimeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    experienceLevel?: boolean
    educationLevel?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobAttributesFulltime"]>

  export type JobAttributesFulltimeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    experienceLevel?: boolean
    educationLevel?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobAttributesFulltime"]>

  export type JobAttributesFulltimeSelectScalar = {
    jobId?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    experienceLevel?: boolean
    educationLevel?: boolean
  }

  export type JobAttributesFulltimeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"jobId" | "salaryMin" | "salaryMax" | "experienceLevel" | "educationLevel", ExtArgs["result"]["jobAttributesFulltime"]>
  export type JobAttributesFulltimeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type JobAttributesFulltimeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type JobAttributesFulltimeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }

  export type $JobAttributesFulltimePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobAttributesFulltime"
    objects: {
      job: Prisma.$JobPostingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      jobId: bigint
      salaryMin: number | null
      salaryMax: number | null
      experienceLevel: string
      educationLevel: string
    }, ExtArgs["result"]["jobAttributesFulltime"]>
    composites: {}
  }

  type JobAttributesFulltimeGetPayload<S extends boolean | null | undefined | JobAttributesFulltimeDefaultArgs> = $Result.GetResult<Prisma.$JobAttributesFulltimePayload, S>

  type JobAttributesFulltimeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobAttributesFulltimeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobAttributesFulltimeCountAggregateInputType | true
    }

  export interface JobAttributesFulltimeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobAttributesFulltime'], meta: { name: 'JobAttributesFulltime' } }
    /**
     * Find zero or one JobAttributesFulltime that matches the filter.
     * @param {JobAttributesFulltimeFindUniqueArgs} args - Arguments to find a JobAttributesFulltime
     * @example
     * // Get one JobAttributesFulltime
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobAttributesFulltimeFindUniqueArgs>(args: SelectSubset<T, JobAttributesFulltimeFindUniqueArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobAttributesFulltime that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobAttributesFulltimeFindUniqueOrThrowArgs} args - Arguments to find a JobAttributesFulltime
     * @example
     * // Get one JobAttributesFulltime
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobAttributesFulltimeFindUniqueOrThrowArgs>(args: SelectSubset<T, JobAttributesFulltimeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobAttributesFulltime that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesFulltimeFindFirstArgs} args - Arguments to find a JobAttributesFulltime
     * @example
     * // Get one JobAttributesFulltime
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobAttributesFulltimeFindFirstArgs>(args?: SelectSubset<T, JobAttributesFulltimeFindFirstArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobAttributesFulltime that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesFulltimeFindFirstOrThrowArgs} args - Arguments to find a JobAttributesFulltime
     * @example
     * // Get one JobAttributesFulltime
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobAttributesFulltimeFindFirstOrThrowArgs>(args?: SelectSubset<T, JobAttributesFulltimeFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobAttributesFulltimes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesFulltimeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobAttributesFulltimes
     * const jobAttributesFulltimes = await prisma.jobAttributesFulltime.findMany()
     * 
     * // Get first 10 JobAttributesFulltimes
     * const jobAttributesFulltimes = await prisma.jobAttributesFulltime.findMany({ take: 10 })
     * 
     * // Only select the `jobId`
     * const jobAttributesFulltimeWithJobIdOnly = await prisma.jobAttributesFulltime.findMany({ select: { jobId: true } })
     * 
     */
    findMany<T extends JobAttributesFulltimeFindManyArgs>(args?: SelectSubset<T, JobAttributesFulltimeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobAttributesFulltime.
     * @param {JobAttributesFulltimeCreateArgs} args - Arguments to create a JobAttributesFulltime.
     * @example
     * // Create one JobAttributesFulltime
     * const JobAttributesFulltime = await prisma.jobAttributesFulltime.create({
     *   data: {
     *     // ... data to create a JobAttributesFulltime
     *   }
     * })
     * 
     */
    create<T extends JobAttributesFulltimeCreateArgs>(args: SelectSubset<T, JobAttributesFulltimeCreateArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobAttributesFulltimes.
     * @param {JobAttributesFulltimeCreateManyArgs} args - Arguments to create many JobAttributesFulltimes.
     * @example
     * // Create many JobAttributesFulltimes
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobAttributesFulltimeCreateManyArgs>(args?: SelectSubset<T, JobAttributesFulltimeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobAttributesFulltimes and returns the data saved in the database.
     * @param {JobAttributesFulltimeCreateManyAndReturnArgs} args - Arguments to create many JobAttributesFulltimes.
     * @example
     * // Create many JobAttributesFulltimes
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobAttributesFulltimes and only return the `jobId`
     * const jobAttributesFulltimeWithJobIdOnly = await prisma.jobAttributesFulltime.createManyAndReturn({
     *   select: { jobId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobAttributesFulltimeCreateManyAndReturnArgs>(args?: SelectSubset<T, JobAttributesFulltimeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobAttributesFulltime.
     * @param {JobAttributesFulltimeDeleteArgs} args - Arguments to delete one JobAttributesFulltime.
     * @example
     * // Delete one JobAttributesFulltime
     * const JobAttributesFulltime = await prisma.jobAttributesFulltime.delete({
     *   where: {
     *     // ... filter to delete one JobAttributesFulltime
     *   }
     * })
     * 
     */
    delete<T extends JobAttributesFulltimeDeleteArgs>(args: SelectSubset<T, JobAttributesFulltimeDeleteArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobAttributesFulltime.
     * @param {JobAttributesFulltimeUpdateArgs} args - Arguments to update one JobAttributesFulltime.
     * @example
     * // Update one JobAttributesFulltime
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobAttributesFulltimeUpdateArgs>(args: SelectSubset<T, JobAttributesFulltimeUpdateArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobAttributesFulltimes.
     * @param {JobAttributesFulltimeDeleteManyArgs} args - Arguments to filter JobAttributesFulltimes to delete.
     * @example
     * // Delete a few JobAttributesFulltimes
     * const { count } = await prisma.jobAttributesFulltime.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobAttributesFulltimeDeleteManyArgs>(args?: SelectSubset<T, JobAttributesFulltimeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobAttributesFulltimes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesFulltimeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobAttributesFulltimes
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobAttributesFulltimeUpdateManyArgs>(args: SelectSubset<T, JobAttributesFulltimeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobAttributesFulltimes and returns the data updated in the database.
     * @param {JobAttributesFulltimeUpdateManyAndReturnArgs} args - Arguments to update many JobAttributesFulltimes.
     * @example
     * // Update many JobAttributesFulltimes
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobAttributesFulltimes and only return the `jobId`
     * const jobAttributesFulltimeWithJobIdOnly = await prisma.jobAttributesFulltime.updateManyAndReturn({
     *   select: { jobId: true },
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
    updateManyAndReturn<T extends JobAttributesFulltimeUpdateManyAndReturnArgs>(args: SelectSubset<T, JobAttributesFulltimeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobAttributesFulltime.
     * @param {JobAttributesFulltimeUpsertArgs} args - Arguments to update or create a JobAttributesFulltime.
     * @example
     * // Update or create a JobAttributesFulltime
     * const jobAttributesFulltime = await prisma.jobAttributesFulltime.upsert({
     *   create: {
     *     // ... data to create a JobAttributesFulltime
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobAttributesFulltime we want to update
     *   }
     * })
     */
    upsert<T extends JobAttributesFulltimeUpsertArgs>(args: SelectSubset<T, JobAttributesFulltimeUpsertArgs<ExtArgs>>): Prisma__JobAttributesFulltimeClient<$Result.GetResult<Prisma.$JobAttributesFulltimePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobAttributesFulltimes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesFulltimeCountArgs} args - Arguments to filter JobAttributesFulltimes to count.
     * @example
     * // Count the number of JobAttributesFulltimes
     * const count = await prisma.jobAttributesFulltime.count({
     *   where: {
     *     // ... the filter for the JobAttributesFulltimes we want to count
     *   }
     * })
    **/
    count<T extends JobAttributesFulltimeCountArgs>(
      args?: Subset<T, JobAttributesFulltimeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobAttributesFulltimeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobAttributesFulltime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesFulltimeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobAttributesFulltimeAggregateArgs>(args: Subset<T, JobAttributesFulltimeAggregateArgs>): Prisma.PrismaPromise<GetJobAttributesFulltimeAggregateType<T>>

    /**
     * Group by JobAttributesFulltime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAttributesFulltimeGroupByArgs} args - Group by arguments.
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
      T extends JobAttributesFulltimeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobAttributesFulltimeGroupByArgs['orderBy'] }
        : { orderBy?: JobAttributesFulltimeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobAttributesFulltimeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobAttributesFulltimeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobAttributesFulltime model
   */
  readonly fields: JobAttributesFulltimeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobAttributesFulltime.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobAttributesFulltimeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobPostingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobPostingDefaultArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the JobAttributesFulltime model
   */
  interface JobAttributesFulltimeFieldRefs {
    readonly jobId: FieldRef<"JobAttributesFulltime", 'BigInt'>
    readonly salaryMin: FieldRef<"JobAttributesFulltime", 'Int'>
    readonly salaryMax: FieldRef<"JobAttributesFulltime", 'Int'>
    readonly experienceLevel: FieldRef<"JobAttributesFulltime", 'String'>
    readonly educationLevel: FieldRef<"JobAttributesFulltime", 'String'>
  }
    

  // Custom InputTypes
  /**
   * JobAttributesFulltime findUnique
   */
  export type JobAttributesFulltimeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesFulltime to fetch.
     */
    where: JobAttributesFulltimeWhereUniqueInput
  }

  /**
   * JobAttributesFulltime findUniqueOrThrow
   */
  export type JobAttributesFulltimeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesFulltime to fetch.
     */
    where: JobAttributesFulltimeWhereUniqueInput
  }

  /**
   * JobAttributesFulltime findFirst
   */
  export type JobAttributesFulltimeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesFulltime to fetch.
     */
    where?: JobAttributesFulltimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAttributesFulltimes to fetch.
     */
    orderBy?: JobAttributesFulltimeOrderByWithRelationInput | JobAttributesFulltimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobAttributesFulltimes.
     */
    cursor?: JobAttributesFulltimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAttributesFulltimes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAttributesFulltimes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobAttributesFulltimes.
     */
    distinct?: JobAttributesFulltimeScalarFieldEnum | JobAttributesFulltimeScalarFieldEnum[]
  }

  /**
   * JobAttributesFulltime findFirstOrThrow
   */
  export type JobAttributesFulltimeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesFulltime to fetch.
     */
    where?: JobAttributesFulltimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAttributesFulltimes to fetch.
     */
    orderBy?: JobAttributesFulltimeOrderByWithRelationInput | JobAttributesFulltimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobAttributesFulltimes.
     */
    cursor?: JobAttributesFulltimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAttributesFulltimes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAttributesFulltimes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobAttributesFulltimes.
     */
    distinct?: JobAttributesFulltimeScalarFieldEnum | JobAttributesFulltimeScalarFieldEnum[]
  }

  /**
   * JobAttributesFulltime findMany
   */
  export type JobAttributesFulltimeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * Filter, which JobAttributesFulltimes to fetch.
     */
    where?: JobAttributesFulltimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAttributesFulltimes to fetch.
     */
    orderBy?: JobAttributesFulltimeOrderByWithRelationInput | JobAttributesFulltimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobAttributesFulltimes.
     */
    cursor?: JobAttributesFulltimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAttributesFulltimes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAttributesFulltimes.
     */
    skip?: number
    distinct?: JobAttributesFulltimeScalarFieldEnum | JobAttributesFulltimeScalarFieldEnum[]
  }

  /**
   * JobAttributesFulltime create
   */
  export type JobAttributesFulltimeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * The data needed to create a JobAttributesFulltime.
     */
    data: XOR<JobAttributesFulltimeCreateInput, JobAttributesFulltimeUncheckedCreateInput>
  }

  /**
   * JobAttributesFulltime createMany
   */
  export type JobAttributesFulltimeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobAttributesFulltimes.
     */
    data: JobAttributesFulltimeCreateManyInput | JobAttributesFulltimeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobAttributesFulltime createManyAndReturn
   */
  export type JobAttributesFulltimeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * The data used to create many JobAttributesFulltimes.
     */
    data: JobAttributesFulltimeCreateManyInput | JobAttributesFulltimeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobAttributesFulltime update
   */
  export type JobAttributesFulltimeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * The data needed to update a JobAttributesFulltime.
     */
    data: XOR<JobAttributesFulltimeUpdateInput, JobAttributesFulltimeUncheckedUpdateInput>
    /**
     * Choose, which JobAttributesFulltime to update.
     */
    where: JobAttributesFulltimeWhereUniqueInput
  }

  /**
   * JobAttributesFulltime updateMany
   */
  export type JobAttributesFulltimeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobAttributesFulltimes.
     */
    data: XOR<JobAttributesFulltimeUpdateManyMutationInput, JobAttributesFulltimeUncheckedUpdateManyInput>
    /**
     * Filter which JobAttributesFulltimes to update
     */
    where?: JobAttributesFulltimeWhereInput
    /**
     * Limit how many JobAttributesFulltimes to update.
     */
    limit?: number
  }

  /**
   * JobAttributesFulltime updateManyAndReturn
   */
  export type JobAttributesFulltimeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * The data used to update JobAttributesFulltimes.
     */
    data: XOR<JobAttributesFulltimeUpdateManyMutationInput, JobAttributesFulltimeUncheckedUpdateManyInput>
    /**
     * Filter which JobAttributesFulltimes to update
     */
    where?: JobAttributesFulltimeWhereInput
    /**
     * Limit how many JobAttributesFulltimes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobAttributesFulltime upsert
   */
  export type JobAttributesFulltimeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * The filter to search for the JobAttributesFulltime to update in case it exists.
     */
    where: JobAttributesFulltimeWhereUniqueInput
    /**
     * In case the JobAttributesFulltime found by the `where` argument doesn't exist, create a new JobAttributesFulltime with this data.
     */
    create: XOR<JobAttributesFulltimeCreateInput, JobAttributesFulltimeUncheckedCreateInput>
    /**
     * In case the JobAttributesFulltime was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobAttributesFulltimeUpdateInput, JobAttributesFulltimeUncheckedUpdateInput>
  }

  /**
   * JobAttributesFulltime delete
   */
  export type JobAttributesFulltimeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
    /**
     * Filter which JobAttributesFulltime to delete.
     */
    where: JobAttributesFulltimeWhereUniqueInput
  }

  /**
   * JobAttributesFulltime deleteMany
   */
  export type JobAttributesFulltimeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobAttributesFulltimes to delete
     */
    where?: JobAttributesFulltimeWhereInput
    /**
     * Limit how many JobAttributesFulltimes to delete.
     */
    limit?: number
  }

  /**
   * JobAttributesFulltime without action
   */
  export type JobAttributesFulltimeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobAttributesFulltime
     */
    select?: JobAttributesFulltimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobAttributesFulltime
     */
    omit?: JobAttributesFulltimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobAttributesFulltimeInclude<ExtArgs> | null
  }


  /**
   * Model InterviewSlot
   */

  export type AggregateInterviewSlot = {
    _count: InterviewSlotCountAggregateOutputType | null
    _avg: InterviewSlotAvgAggregateOutputType | null
    _sum: InterviewSlotSumAggregateOutputType | null
    _min: InterviewSlotMinAggregateOutputType | null
    _max: InterviewSlotMaxAggregateOutputType | null
  }

  export type InterviewSlotAvgAggregateOutputType = {
    slotId: number | null
    jobId: number | null
  }

  export type InterviewSlotSumAggregateOutputType = {
    slotId: bigint | null
    jobId: bigint | null
  }

  export type InterviewSlotMinAggregateOutputType = {
    slotId: bigint | null
    jobId: bigint | null
    startTime: Date | null
    endTime: Date | null
    isBooked: boolean | null
  }

  export type InterviewSlotMaxAggregateOutputType = {
    slotId: bigint | null
    jobId: bigint | null
    startTime: Date | null
    endTime: Date | null
    isBooked: boolean | null
  }

  export type InterviewSlotCountAggregateOutputType = {
    slotId: number
    jobId: number
    startTime: number
    endTime: number
    isBooked: number
    _all: number
  }


  export type InterviewSlotAvgAggregateInputType = {
    slotId?: true
    jobId?: true
  }

  export type InterviewSlotSumAggregateInputType = {
    slotId?: true
    jobId?: true
  }

  export type InterviewSlotMinAggregateInputType = {
    slotId?: true
    jobId?: true
    startTime?: true
    endTime?: true
    isBooked?: true
  }

  export type InterviewSlotMaxAggregateInputType = {
    slotId?: true
    jobId?: true
    startTime?: true
    endTime?: true
    isBooked?: true
  }

  export type InterviewSlotCountAggregateInputType = {
    slotId?: true
    jobId?: true
    startTime?: true
    endTime?: true
    isBooked?: true
    _all?: true
  }

  export type InterviewSlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewSlot to aggregate.
     */
    where?: InterviewSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSlots to fetch.
     */
    orderBy?: InterviewSlotOrderByWithRelationInput | InterviewSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterviewSlots
    **/
    _count?: true | InterviewSlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterviewSlotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterviewSlotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewSlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewSlotMaxAggregateInputType
  }

  export type GetInterviewSlotAggregateType<T extends InterviewSlotAggregateArgs> = {
        [P in keyof T & keyof AggregateInterviewSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterviewSlot[P]>
      : GetScalarType<T[P], AggregateInterviewSlot[P]>
  }




  export type InterviewSlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewSlotWhereInput
    orderBy?: InterviewSlotOrderByWithAggregationInput | InterviewSlotOrderByWithAggregationInput[]
    by: InterviewSlotScalarFieldEnum[] | InterviewSlotScalarFieldEnum
    having?: InterviewSlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewSlotCountAggregateInputType | true
    _avg?: InterviewSlotAvgAggregateInputType
    _sum?: InterviewSlotSumAggregateInputType
    _min?: InterviewSlotMinAggregateInputType
    _max?: InterviewSlotMaxAggregateInputType
  }

  export type InterviewSlotGroupByOutputType = {
    slotId: bigint
    jobId: bigint
    startTime: Date
    endTime: Date
    isBooked: boolean
    _count: InterviewSlotCountAggregateOutputType | null
    _avg: InterviewSlotAvgAggregateOutputType | null
    _sum: InterviewSlotSumAggregateOutputType | null
    _min: InterviewSlotMinAggregateOutputType | null
    _max: InterviewSlotMaxAggregateOutputType | null
  }

  type GetInterviewSlotGroupByPayload<T extends InterviewSlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewSlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewSlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewSlotGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewSlotGroupByOutputType[P]>
        }
      >
    >


  export type InterviewSlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    slotId?: boolean
    jobId?: boolean
    startTime?: boolean
    endTime?: boolean
    isBooked?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewSlot"]>

  export type InterviewSlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    slotId?: boolean
    jobId?: boolean
    startTime?: boolean
    endTime?: boolean
    isBooked?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewSlot"]>

  export type InterviewSlotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    slotId?: boolean
    jobId?: boolean
    startTime?: boolean
    endTime?: boolean
    isBooked?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interviewSlot"]>

  export type InterviewSlotSelectScalar = {
    slotId?: boolean
    jobId?: boolean
    startTime?: boolean
    endTime?: boolean
    isBooked?: boolean
  }

  export type InterviewSlotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"slotId" | "jobId" | "startTime" | "endTime" | "isBooked", ExtArgs["result"]["interviewSlot"]>
  export type InterviewSlotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type InterviewSlotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type InterviewSlotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }

  export type $InterviewSlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterviewSlot"
    objects: {
      job: Prisma.$JobPostingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      slotId: bigint
      jobId: bigint
      startTime: Date
      endTime: Date
      isBooked: boolean
    }, ExtArgs["result"]["interviewSlot"]>
    composites: {}
  }

  type InterviewSlotGetPayload<S extends boolean | null | undefined | InterviewSlotDefaultArgs> = $Result.GetResult<Prisma.$InterviewSlotPayload, S>

  type InterviewSlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InterviewSlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InterviewSlotCountAggregateInputType | true
    }

  export interface InterviewSlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterviewSlot'], meta: { name: 'InterviewSlot' } }
    /**
     * Find zero or one InterviewSlot that matches the filter.
     * @param {InterviewSlotFindUniqueArgs} args - Arguments to find a InterviewSlot
     * @example
     * // Get one InterviewSlot
     * const interviewSlot = await prisma.interviewSlot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewSlotFindUniqueArgs>(args: SelectSubset<T, InterviewSlotFindUniqueArgs<ExtArgs>>): Prisma__InterviewSlotClient<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InterviewSlot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InterviewSlotFindUniqueOrThrowArgs} args - Arguments to find a InterviewSlot
     * @example
     * // Get one InterviewSlot
     * const interviewSlot = await prisma.interviewSlot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewSlotFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewSlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewSlotClient<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InterviewSlot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSlotFindFirstArgs} args - Arguments to find a InterviewSlot
     * @example
     * // Get one InterviewSlot
     * const interviewSlot = await prisma.interviewSlot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewSlotFindFirstArgs>(args?: SelectSubset<T, InterviewSlotFindFirstArgs<ExtArgs>>): Prisma__InterviewSlotClient<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InterviewSlot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSlotFindFirstOrThrowArgs} args - Arguments to find a InterviewSlot
     * @example
     * // Get one InterviewSlot
     * const interviewSlot = await prisma.interviewSlot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewSlotFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewSlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewSlotClient<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InterviewSlots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterviewSlots
     * const interviewSlots = await prisma.interviewSlot.findMany()
     * 
     * // Get first 10 InterviewSlots
     * const interviewSlots = await prisma.interviewSlot.findMany({ take: 10 })
     * 
     * // Only select the `slotId`
     * const interviewSlotWithSlotIdOnly = await prisma.interviewSlot.findMany({ select: { slotId: true } })
     * 
     */
    findMany<T extends InterviewSlotFindManyArgs>(args?: SelectSubset<T, InterviewSlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InterviewSlot.
     * @param {InterviewSlotCreateArgs} args - Arguments to create a InterviewSlot.
     * @example
     * // Create one InterviewSlot
     * const InterviewSlot = await prisma.interviewSlot.create({
     *   data: {
     *     // ... data to create a InterviewSlot
     *   }
     * })
     * 
     */
    create<T extends InterviewSlotCreateArgs>(args: SelectSubset<T, InterviewSlotCreateArgs<ExtArgs>>): Prisma__InterviewSlotClient<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InterviewSlots.
     * @param {InterviewSlotCreateManyArgs} args - Arguments to create many InterviewSlots.
     * @example
     * // Create many InterviewSlots
     * const interviewSlot = await prisma.interviewSlot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewSlotCreateManyArgs>(args?: SelectSubset<T, InterviewSlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterviewSlots and returns the data saved in the database.
     * @param {InterviewSlotCreateManyAndReturnArgs} args - Arguments to create many InterviewSlots.
     * @example
     * // Create many InterviewSlots
     * const interviewSlot = await prisma.interviewSlot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterviewSlots and only return the `slotId`
     * const interviewSlotWithSlotIdOnly = await prisma.interviewSlot.createManyAndReturn({
     *   select: { slotId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewSlotCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewSlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InterviewSlot.
     * @param {InterviewSlotDeleteArgs} args - Arguments to delete one InterviewSlot.
     * @example
     * // Delete one InterviewSlot
     * const InterviewSlot = await prisma.interviewSlot.delete({
     *   where: {
     *     // ... filter to delete one InterviewSlot
     *   }
     * })
     * 
     */
    delete<T extends InterviewSlotDeleteArgs>(args: SelectSubset<T, InterviewSlotDeleteArgs<ExtArgs>>): Prisma__InterviewSlotClient<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InterviewSlot.
     * @param {InterviewSlotUpdateArgs} args - Arguments to update one InterviewSlot.
     * @example
     * // Update one InterviewSlot
     * const interviewSlot = await prisma.interviewSlot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewSlotUpdateArgs>(args: SelectSubset<T, InterviewSlotUpdateArgs<ExtArgs>>): Prisma__InterviewSlotClient<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InterviewSlots.
     * @param {InterviewSlotDeleteManyArgs} args - Arguments to filter InterviewSlots to delete.
     * @example
     * // Delete a few InterviewSlots
     * const { count } = await prisma.interviewSlot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewSlotDeleteManyArgs>(args?: SelectSubset<T, InterviewSlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterviewSlots
     * const interviewSlot = await prisma.interviewSlot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewSlotUpdateManyArgs>(args: SelectSubset<T, InterviewSlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterviewSlots and returns the data updated in the database.
     * @param {InterviewSlotUpdateManyAndReturnArgs} args - Arguments to update many InterviewSlots.
     * @example
     * // Update many InterviewSlots
     * const interviewSlot = await prisma.interviewSlot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InterviewSlots and only return the `slotId`
     * const interviewSlotWithSlotIdOnly = await prisma.interviewSlot.updateManyAndReturn({
     *   select: { slotId: true },
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
    updateManyAndReturn<T extends InterviewSlotUpdateManyAndReturnArgs>(args: SelectSubset<T, InterviewSlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InterviewSlot.
     * @param {InterviewSlotUpsertArgs} args - Arguments to update or create a InterviewSlot.
     * @example
     * // Update or create a InterviewSlot
     * const interviewSlot = await prisma.interviewSlot.upsert({
     *   create: {
     *     // ... data to create a InterviewSlot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterviewSlot we want to update
     *   }
     * })
     */
    upsert<T extends InterviewSlotUpsertArgs>(args: SelectSubset<T, InterviewSlotUpsertArgs<ExtArgs>>): Prisma__InterviewSlotClient<$Result.GetResult<Prisma.$InterviewSlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InterviewSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSlotCountArgs} args - Arguments to filter InterviewSlots to count.
     * @example
     * // Count the number of InterviewSlots
     * const count = await prisma.interviewSlot.count({
     *   where: {
     *     // ... the filter for the InterviewSlots we want to count
     *   }
     * })
    **/
    count<T extends InterviewSlotCountArgs>(
      args?: Subset<T, InterviewSlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewSlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterviewSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InterviewSlotAggregateArgs>(args: Subset<T, InterviewSlotAggregateArgs>): Prisma.PrismaPromise<GetInterviewSlotAggregateType<T>>

    /**
     * Group by InterviewSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewSlotGroupByArgs} args - Group by arguments.
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
      T extends InterviewSlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewSlotGroupByArgs['orderBy'] }
        : { orderBy?: InterviewSlotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InterviewSlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterviewSlot model
   */
  readonly fields: InterviewSlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterviewSlot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewSlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobPostingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobPostingDefaultArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the InterviewSlot model
   */
  interface InterviewSlotFieldRefs {
    readonly slotId: FieldRef<"InterviewSlot", 'BigInt'>
    readonly jobId: FieldRef<"InterviewSlot", 'BigInt'>
    readonly startTime: FieldRef<"InterviewSlot", 'DateTime'>
    readonly endTime: FieldRef<"InterviewSlot", 'DateTime'>
    readonly isBooked: FieldRef<"InterviewSlot", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * InterviewSlot findUnique
   */
  export type InterviewSlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSlot to fetch.
     */
    where: InterviewSlotWhereUniqueInput
  }

  /**
   * InterviewSlot findUniqueOrThrow
   */
  export type InterviewSlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSlot to fetch.
     */
    where: InterviewSlotWhereUniqueInput
  }

  /**
   * InterviewSlot findFirst
   */
  export type InterviewSlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSlot to fetch.
     */
    where?: InterviewSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSlots to fetch.
     */
    orderBy?: InterviewSlotOrderByWithRelationInput | InterviewSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewSlots.
     */
    cursor?: InterviewSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewSlots.
     */
    distinct?: InterviewSlotScalarFieldEnum | InterviewSlotScalarFieldEnum[]
  }

  /**
   * InterviewSlot findFirstOrThrow
   */
  export type InterviewSlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSlot to fetch.
     */
    where?: InterviewSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSlots to fetch.
     */
    orderBy?: InterviewSlotOrderByWithRelationInput | InterviewSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterviewSlots.
     */
    cursor?: InterviewSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterviewSlots.
     */
    distinct?: InterviewSlotScalarFieldEnum | InterviewSlotScalarFieldEnum[]
  }

  /**
   * InterviewSlot findMany
   */
  export type InterviewSlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * Filter, which InterviewSlots to fetch.
     */
    where?: InterviewSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterviewSlots to fetch.
     */
    orderBy?: InterviewSlotOrderByWithRelationInput | InterviewSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterviewSlots.
     */
    cursor?: InterviewSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterviewSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterviewSlots.
     */
    skip?: number
    distinct?: InterviewSlotScalarFieldEnum | InterviewSlotScalarFieldEnum[]
  }

  /**
   * InterviewSlot create
   */
  export type InterviewSlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * The data needed to create a InterviewSlot.
     */
    data: XOR<InterviewSlotCreateInput, InterviewSlotUncheckedCreateInput>
  }

  /**
   * InterviewSlot createMany
   */
  export type InterviewSlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterviewSlots.
     */
    data: InterviewSlotCreateManyInput | InterviewSlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InterviewSlot createManyAndReturn
   */
  export type InterviewSlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * The data used to create many InterviewSlots.
     */
    data: InterviewSlotCreateManyInput | InterviewSlotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewSlot update
   */
  export type InterviewSlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * The data needed to update a InterviewSlot.
     */
    data: XOR<InterviewSlotUpdateInput, InterviewSlotUncheckedUpdateInput>
    /**
     * Choose, which InterviewSlot to update.
     */
    where: InterviewSlotWhereUniqueInput
  }

  /**
   * InterviewSlot updateMany
   */
  export type InterviewSlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterviewSlots.
     */
    data: XOR<InterviewSlotUpdateManyMutationInput, InterviewSlotUncheckedUpdateManyInput>
    /**
     * Filter which InterviewSlots to update
     */
    where?: InterviewSlotWhereInput
    /**
     * Limit how many InterviewSlots to update.
     */
    limit?: number
  }

  /**
   * InterviewSlot updateManyAndReturn
   */
  export type InterviewSlotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * The data used to update InterviewSlots.
     */
    data: XOR<InterviewSlotUpdateManyMutationInput, InterviewSlotUncheckedUpdateManyInput>
    /**
     * Filter which InterviewSlots to update
     */
    where?: InterviewSlotWhereInput
    /**
     * Limit how many InterviewSlots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterviewSlot upsert
   */
  export type InterviewSlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * The filter to search for the InterviewSlot to update in case it exists.
     */
    where: InterviewSlotWhereUniqueInput
    /**
     * In case the InterviewSlot found by the `where` argument doesn't exist, create a new InterviewSlot with this data.
     */
    create: XOR<InterviewSlotCreateInput, InterviewSlotUncheckedCreateInput>
    /**
     * In case the InterviewSlot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewSlotUpdateInput, InterviewSlotUncheckedUpdateInput>
  }

  /**
   * InterviewSlot delete
   */
  export type InterviewSlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
    /**
     * Filter which InterviewSlot to delete.
     */
    where: InterviewSlotWhereUniqueInput
  }

  /**
   * InterviewSlot deleteMany
   */
  export type InterviewSlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterviewSlots to delete
     */
    where?: InterviewSlotWhereInput
    /**
     * Limit how many InterviewSlots to delete.
     */
    limit?: number
  }

  /**
   * InterviewSlot without action
   */
  export type InterviewSlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewSlot
     */
    select?: InterviewSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterviewSlot
     */
    omit?: InterviewSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewSlotInclude<ExtArgs> | null
  }


  /**
   * Model JobApplication
   */

  export type AggregateJobApplication = {
    _count: JobApplicationCountAggregateOutputType | null
    _avg: JobApplicationAvgAggregateOutputType | null
    _sum: JobApplicationSumAggregateOutputType | null
    _min: JobApplicationMinAggregateOutputType | null
    _max: JobApplicationMaxAggregateOutputType | null
  }

  export type JobApplicationAvgAggregateOutputType = {
    appId: number | null
    jobId: number | null
    applicantId: number | null
    selectedSlotId: number | null
  }

  export type JobApplicationSumAggregateOutputType = {
    appId: bigint | null
    jobId: bigint | null
    applicantId: bigint | null
    selectedSlotId: bigint | null
  }

  export type JobApplicationMinAggregateOutputType = {
    appId: bigint | null
    jobId: bigint | null
    applicantId: bigint | null
    status: $Enums.ApplicationStatus | null
    selectedSlotId: bigint | null
    proposedBy: $Enums.ActorType | null
    proposedTime: Date | null
    rejectionReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobApplicationMaxAggregateOutputType = {
    appId: bigint | null
    jobId: bigint | null
    applicantId: bigint | null
    status: $Enums.ApplicationStatus | null
    selectedSlotId: bigint | null
    proposedBy: $Enums.ActorType | null
    proposedTime: Date | null
    rejectionReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobApplicationCountAggregateOutputType = {
    appId: number
    jobId: number
    applicantId: number
    status: number
    selectedSlotId: number
    proposedBy: number
    proposedTime: number
    rejectionReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobApplicationAvgAggregateInputType = {
    appId?: true
    jobId?: true
    applicantId?: true
    selectedSlotId?: true
  }

  export type JobApplicationSumAggregateInputType = {
    appId?: true
    jobId?: true
    applicantId?: true
    selectedSlotId?: true
  }

  export type JobApplicationMinAggregateInputType = {
    appId?: true
    jobId?: true
    applicantId?: true
    status?: true
    selectedSlotId?: true
    proposedBy?: true
    proposedTime?: true
    rejectionReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobApplicationMaxAggregateInputType = {
    appId?: true
    jobId?: true
    applicantId?: true
    status?: true
    selectedSlotId?: true
    proposedBy?: true
    proposedTime?: true
    rejectionReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobApplicationCountAggregateInputType = {
    appId?: true
    jobId?: true
    applicantId?: true
    status?: true
    selectedSlotId?: true
    proposedBy?: true
    proposedTime?: true
    rejectionReason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobApplication to aggregate.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobApplications
    **/
    _count?: true | JobApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobApplicationMaxAggregateInputType
  }

  export type GetJobApplicationAggregateType<T extends JobApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateJobApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobApplication[P]>
      : GetScalarType<T[P], AggregateJobApplication[P]>
  }




  export type JobApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithAggregationInput | JobApplicationOrderByWithAggregationInput[]
    by: JobApplicationScalarFieldEnum[] | JobApplicationScalarFieldEnum
    having?: JobApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobApplicationCountAggregateInputType | true
    _avg?: JobApplicationAvgAggregateInputType
    _sum?: JobApplicationSumAggregateInputType
    _min?: JobApplicationMinAggregateInputType
    _max?: JobApplicationMaxAggregateInputType
  }

  export type JobApplicationGroupByOutputType = {
    appId: bigint
    jobId: bigint
    applicantId: bigint
    status: $Enums.ApplicationStatus
    selectedSlotId: bigint | null
    proposedBy: $Enums.ActorType | null
    proposedTime: Date | null
    rejectionReason: string | null
    createdAt: Date
    updatedAt: Date
    _count: JobApplicationCountAggregateOutputType | null
    _avg: JobApplicationAvgAggregateOutputType | null
    _sum: JobApplicationSumAggregateOutputType | null
    _min: JobApplicationMinAggregateOutputType | null
    _max: JobApplicationMaxAggregateOutputType | null
  }

  type GetJobApplicationGroupByPayload<T extends JobApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], JobApplicationGroupByOutputType[P]>
        }
      >
    >


  export type JobApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    appId?: boolean
    jobId?: boolean
    applicantId?: boolean
    status?: boolean
    selectedSlotId?: boolean
    proposedBy?: boolean
    proposedTime?: boolean
    rejectionReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobApplication"]>

  export type JobApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    appId?: boolean
    jobId?: boolean
    applicantId?: boolean
    status?: boolean
    selectedSlotId?: boolean
    proposedBy?: boolean
    proposedTime?: boolean
    rejectionReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobApplication"]>

  export type JobApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    appId?: boolean
    jobId?: boolean
    applicantId?: boolean
    status?: boolean
    selectedSlotId?: boolean
    proposedBy?: boolean
    proposedTime?: boolean
    rejectionReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobApplication"]>

  export type JobApplicationSelectScalar = {
    appId?: boolean
    jobId?: boolean
    applicantId?: boolean
    status?: boolean
    selectedSlotId?: boolean
    proposedBy?: boolean
    proposedTime?: boolean
    rejectionReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"appId" | "jobId" | "applicantId" | "status" | "selectedSlotId" | "proposedBy" | "proposedTime" | "rejectionReason" | "createdAt" | "updatedAt", ExtArgs["result"]["jobApplication"]>
  export type JobApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type JobApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }
  export type JobApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobPostingDefaultArgs<ExtArgs>
  }

  export type $JobApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobApplication"
    objects: {
      job: Prisma.$JobPostingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      appId: bigint
      jobId: bigint
      applicantId: bigint
      status: $Enums.ApplicationStatus
      selectedSlotId: bigint | null
      proposedBy: $Enums.ActorType | null
      proposedTime: Date | null
      rejectionReason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobApplication"]>
    composites: {}
  }

  type JobApplicationGetPayload<S extends boolean | null | undefined | JobApplicationDefaultArgs> = $Result.GetResult<Prisma.$JobApplicationPayload, S>

  type JobApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobApplicationCountAggregateInputType | true
    }

  export interface JobApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobApplication'], meta: { name: 'JobApplication' } }
    /**
     * Find zero or one JobApplication that matches the filter.
     * @param {JobApplicationFindUniqueArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobApplicationFindUniqueArgs>(args: SelectSubset<T, JobApplicationFindUniqueArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobApplicationFindUniqueOrThrowArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, JobApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindFirstArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobApplicationFindFirstArgs>(args?: SelectSubset<T, JobApplicationFindFirstArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindFirstOrThrowArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, JobApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobApplications
     * const jobApplications = await prisma.jobApplication.findMany()
     * 
     * // Get first 10 JobApplications
     * const jobApplications = await prisma.jobApplication.findMany({ take: 10 })
     * 
     * // Only select the `appId`
     * const jobApplicationWithAppIdOnly = await prisma.jobApplication.findMany({ select: { appId: true } })
     * 
     */
    findMany<T extends JobApplicationFindManyArgs>(args?: SelectSubset<T, JobApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobApplication.
     * @param {JobApplicationCreateArgs} args - Arguments to create a JobApplication.
     * @example
     * // Create one JobApplication
     * const JobApplication = await prisma.jobApplication.create({
     *   data: {
     *     // ... data to create a JobApplication
     *   }
     * })
     * 
     */
    create<T extends JobApplicationCreateArgs>(args: SelectSubset<T, JobApplicationCreateArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobApplications.
     * @param {JobApplicationCreateManyArgs} args - Arguments to create many JobApplications.
     * @example
     * // Create many JobApplications
     * const jobApplication = await prisma.jobApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobApplicationCreateManyArgs>(args?: SelectSubset<T, JobApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobApplications and returns the data saved in the database.
     * @param {JobApplicationCreateManyAndReturnArgs} args - Arguments to create many JobApplications.
     * @example
     * // Create many JobApplications
     * const jobApplication = await prisma.jobApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobApplications and only return the `appId`
     * const jobApplicationWithAppIdOnly = await prisma.jobApplication.createManyAndReturn({
     *   select: { appId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, JobApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobApplication.
     * @param {JobApplicationDeleteArgs} args - Arguments to delete one JobApplication.
     * @example
     * // Delete one JobApplication
     * const JobApplication = await prisma.jobApplication.delete({
     *   where: {
     *     // ... filter to delete one JobApplication
     *   }
     * })
     * 
     */
    delete<T extends JobApplicationDeleteArgs>(args: SelectSubset<T, JobApplicationDeleteArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobApplication.
     * @param {JobApplicationUpdateArgs} args - Arguments to update one JobApplication.
     * @example
     * // Update one JobApplication
     * const jobApplication = await prisma.jobApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobApplicationUpdateArgs>(args: SelectSubset<T, JobApplicationUpdateArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobApplications.
     * @param {JobApplicationDeleteManyArgs} args - Arguments to filter JobApplications to delete.
     * @example
     * // Delete a few JobApplications
     * const { count } = await prisma.jobApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobApplicationDeleteManyArgs>(args?: SelectSubset<T, JobApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobApplications
     * const jobApplication = await prisma.jobApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobApplicationUpdateManyArgs>(args: SelectSubset<T, JobApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobApplications and returns the data updated in the database.
     * @param {JobApplicationUpdateManyAndReturnArgs} args - Arguments to update many JobApplications.
     * @example
     * // Update many JobApplications
     * const jobApplication = await prisma.jobApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobApplications and only return the `appId`
     * const jobApplicationWithAppIdOnly = await prisma.jobApplication.updateManyAndReturn({
     *   select: { appId: true },
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
    updateManyAndReturn<T extends JobApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, JobApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobApplication.
     * @param {JobApplicationUpsertArgs} args - Arguments to update or create a JobApplication.
     * @example
     * // Update or create a JobApplication
     * const jobApplication = await prisma.jobApplication.upsert({
     *   create: {
     *     // ... data to create a JobApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobApplication we want to update
     *   }
     * })
     */
    upsert<T extends JobApplicationUpsertArgs>(args: SelectSubset<T, JobApplicationUpsertArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationCountArgs} args - Arguments to filter JobApplications to count.
     * @example
     * // Count the number of JobApplications
     * const count = await prisma.jobApplication.count({
     *   where: {
     *     // ... the filter for the JobApplications we want to count
     *   }
     * })
    **/
    count<T extends JobApplicationCountArgs>(
      args?: Subset<T, JobApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobApplicationAggregateArgs>(args: Subset<T, JobApplicationAggregateArgs>): Prisma.PrismaPromise<GetJobApplicationAggregateType<T>>

    /**
     * Group by JobApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationGroupByArgs} args - Group by arguments.
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
      T extends JobApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobApplicationGroupByArgs['orderBy'] }
        : { orderBy?: JobApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobApplication model
   */
  readonly fields: JobApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobPostingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobPostingDefaultArgs<ExtArgs>>): Prisma__JobPostingClient<$Result.GetResult<Prisma.$JobPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the JobApplication model
   */
  interface JobApplicationFieldRefs {
    readonly appId: FieldRef<"JobApplication", 'BigInt'>
    readonly jobId: FieldRef<"JobApplication", 'BigInt'>
    readonly applicantId: FieldRef<"JobApplication", 'BigInt'>
    readonly status: FieldRef<"JobApplication", 'ApplicationStatus'>
    readonly selectedSlotId: FieldRef<"JobApplication", 'BigInt'>
    readonly proposedBy: FieldRef<"JobApplication", 'ActorType'>
    readonly proposedTime: FieldRef<"JobApplication", 'DateTime'>
    readonly rejectionReason: FieldRef<"JobApplication", 'String'>
    readonly createdAt: FieldRef<"JobApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"JobApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobApplication findUnique
   */
  export type JobApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication findUniqueOrThrow
   */
  export type JobApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication findFirst
   */
  export type JobApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobApplications.
     */
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication findFirstOrThrow
   */
  export type JobApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobApplications.
     */
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication findMany
   */
  export type JobApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplications to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication create
   */
  export type JobApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a JobApplication.
     */
    data: XOR<JobApplicationCreateInput, JobApplicationUncheckedCreateInput>
  }

  /**
   * JobApplication createMany
   */
  export type JobApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobApplications.
     */
    data: JobApplicationCreateManyInput | JobApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobApplication createManyAndReturn
   */
  export type JobApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many JobApplications.
     */
    data: JobApplicationCreateManyInput | JobApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobApplication update
   */
  export type JobApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a JobApplication.
     */
    data: XOR<JobApplicationUpdateInput, JobApplicationUncheckedUpdateInput>
    /**
     * Choose, which JobApplication to update.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication updateMany
   */
  export type JobApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobApplications.
     */
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyInput>
    /**
     * Filter which JobApplications to update
     */
    where?: JobApplicationWhereInput
    /**
     * Limit how many JobApplications to update.
     */
    limit?: number
  }

  /**
   * JobApplication updateManyAndReturn
   */
  export type JobApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * The data used to update JobApplications.
     */
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyInput>
    /**
     * Filter which JobApplications to update
     */
    where?: JobApplicationWhereInput
    /**
     * Limit how many JobApplications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobApplication upsert
   */
  export type JobApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the JobApplication to update in case it exists.
     */
    where: JobApplicationWhereUniqueInput
    /**
     * In case the JobApplication found by the `where` argument doesn't exist, create a new JobApplication with this data.
     */
    create: XOR<JobApplicationCreateInput, JobApplicationUncheckedCreateInput>
    /**
     * In case the JobApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobApplicationUpdateInput, JobApplicationUncheckedUpdateInput>
  }

  /**
   * JobApplication delete
   */
  export type JobApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter which JobApplication to delete.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication deleteMany
   */
  export type JobApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobApplications to delete
     */
    where?: JobApplicationWhereInput
    /**
     * Limit how many JobApplications to delete.
     */
    limit?: number
  }

  /**
   * JobApplication without action
   */
  export type JobApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
  }


  /**
   * Model ApplyJob
   */

  export type AggregateApplyJob = {
    _count: ApplyJobCountAggregateOutputType | null
    _avg: ApplyJobAvgAggregateOutputType | null
    _sum: ApplyJobSumAggregateOutputType | null
    _min: ApplyJobMinAggregateOutputType | null
    _max: ApplyJobMaxAggregateOutputType | null
  }

  export type ApplyJobAvgAggregateOutputType = {
    applyId: number | null
    userId: number | null
    jobId: number | null
  }

  export type ApplyJobSumAggregateOutputType = {
    applyId: bigint | null
    userId: bigint | null
    jobId: bigint | null
  }

  export type ApplyJobMinAggregateOutputType = {
    applyId: bigint | null
    userId: bigint | null
    jobId: bigint | null
    interviewDate: Date | null
    title: string | null
    description: string | null
    resumeFile: string | null
    applyType: $Enums.ApplyType | null
    status: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApplyJobMaxAggregateOutputType = {
    applyId: bigint | null
    userId: bigint | null
    jobId: bigint | null
    interviewDate: Date | null
    title: string | null
    description: string | null
    resumeFile: string | null
    applyType: $Enums.ApplyType | null
    status: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApplyJobCountAggregateOutputType = {
    applyId: number
    userId: number
    jobId: number
    interviewDate: number
    title: number
    description: number
    resumeFile: number
    applyType: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApplyJobAvgAggregateInputType = {
    applyId?: true
    userId?: true
    jobId?: true
  }

  export type ApplyJobSumAggregateInputType = {
    applyId?: true
    userId?: true
    jobId?: true
  }

  export type ApplyJobMinAggregateInputType = {
    applyId?: true
    userId?: true
    jobId?: true
    interviewDate?: true
    title?: true
    description?: true
    resumeFile?: true
    applyType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApplyJobMaxAggregateInputType = {
    applyId?: true
    userId?: true
    jobId?: true
    interviewDate?: true
    title?: true
    description?: true
    resumeFile?: true
    applyType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApplyJobCountAggregateInputType = {
    applyId?: true
    userId?: true
    jobId?: true
    interviewDate?: true
    title?: true
    description?: true
    resumeFile?: true
    applyType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApplyJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplyJob to aggregate.
     */
    where?: ApplyJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplyJobs to fetch.
     */
    orderBy?: ApplyJobOrderByWithRelationInput | ApplyJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplyJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplyJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplyJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApplyJobs
    **/
    _count?: true | ApplyJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplyJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplyJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplyJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplyJobMaxAggregateInputType
  }

  export type GetApplyJobAggregateType<T extends ApplyJobAggregateArgs> = {
        [P in keyof T & keyof AggregateApplyJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplyJob[P]>
      : GetScalarType<T[P], AggregateApplyJob[P]>
  }




  export type ApplyJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplyJobWhereInput
    orderBy?: ApplyJobOrderByWithAggregationInput | ApplyJobOrderByWithAggregationInput[]
    by: ApplyJobScalarFieldEnum[] | ApplyJobScalarFieldEnum
    having?: ApplyJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplyJobCountAggregateInputType | true
    _avg?: ApplyJobAvgAggregateInputType
    _sum?: ApplyJobSumAggregateInputType
    _min?: ApplyJobMinAggregateInputType
    _max?: ApplyJobMaxAggregateInputType
  }

  export type ApplyJobGroupByOutputType = {
    applyId: bigint
    userId: bigint
    jobId: bigint
    interviewDate: Date | null
    title: string
    description: string
    resumeFile: string | null
    applyType: $Enums.ApplyType | null
    status: boolean
    createdAt: Date
    updatedAt: Date
    _count: ApplyJobCountAggregateOutputType | null
    _avg: ApplyJobAvgAggregateOutputType | null
    _sum: ApplyJobSumAggregateOutputType | null
    _min: ApplyJobMinAggregateOutputType | null
    _max: ApplyJobMaxAggregateOutputType | null
  }

  type GetApplyJobGroupByPayload<T extends ApplyJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplyJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplyJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplyJobGroupByOutputType[P]>
            : GetScalarType<T[P], ApplyJobGroupByOutputType[P]>
        }
      >
    >


  export type ApplyJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    applyId?: boolean
    userId?: boolean
    jobId?: boolean
    interviewDate?: boolean
    title?: boolean
    description?: boolean
    resumeFile?: boolean
    applyType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["applyJob"]>

  export type ApplyJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    applyId?: boolean
    userId?: boolean
    jobId?: boolean
    interviewDate?: boolean
    title?: boolean
    description?: boolean
    resumeFile?: boolean
    applyType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["applyJob"]>

  export type ApplyJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    applyId?: boolean
    userId?: boolean
    jobId?: boolean
    interviewDate?: boolean
    title?: boolean
    description?: boolean
    resumeFile?: boolean
    applyType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["applyJob"]>

  export type ApplyJobSelectScalar = {
    applyId?: boolean
    userId?: boolean
    jobId?: boolean
    interviewDate?: boolean
    title?: boolean
    description?: boolean
    resumeFile?: boolean
    applyType?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApplyJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"applyId" | "userId" | "jobId" | "interviewDate" | "title" | "description" | "resumeFile" | "applyType" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["applyJob"]>

  export type $ApplyJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApplyJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      applyId: bigint
      userId: bigint
      jobId: bigint
      interviewDate: Date | null
      title: string
      description: string
      resumeFile: string | null
      applyType: $Enums.ApplyType | null
      status: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["applyJob"]>
    composites: {}
  }

  type ApplyJobGetPayload<S extends boolean | null | undefined | ApplyJobDefaultArgs> = $Result.GetResult<Prisma.$ApplyJobPayload, S>

  type ApplyJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplyJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplyJobCountAggregateInputType | true
    }

  export interface ApplyJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApplyJob'], meta: { name: 'ApplyJob' } }
    /**
     * Find zero or one ApplyJob that matches the filter.
     * @param {ApplyJobFindUniqueArgs} args - Arguments to find a ApplyJob
     * @example
     * // Get one ApplyJob
     * const applyJob = await prisma.applyJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplyJobFindUniqueArgs>(args: SelectSubset<T, ApplyJobFindUniqueArgs<ExtArgs>>): Prisma__ApplyJobClient<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApplyJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplyJobFindUniqueOrThrowArgs} args - Arguments to find a ApplyJob
     * @example
     * // Get one ApplyJob
     * const applyJob = await prisma.applyJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplyJobFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplyJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplyJobClient<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplyJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplyJobFindFirstArgs} args - Arguments to find a ApplyJob
     * @example
     * // Get one ApplyJob
     * const applyJob = await prisma.applyJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplyJobFindFirstArgs>(args?: SelectSubset<T, ApplyJobFindFirstArgs<ExtArgs>>): Prisma__ApplyJobClient<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplyJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplyJobFindFirstOrThrowArgs} args - Arguments to find a ApplyJob
     * @example
     * // Get one ApplyJob
     * const applyJob = await prisma.applyJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplyJobFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplyJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplyJobClient<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApplyJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplyJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApplyJobs
     * const applyJobs = await prisma.applyJob.findMany()
     * 
     * // Get first 10 ApplyJobs
     * const applyJobs = await prisma.applyJob.findMany({ take: 10 })
     * 
     * // Only select the `applyId`
     * const applyJobWithApplyIdOnly = await prisma.applyJob.findMany({ select: { applyId: true } })
     * 
     */
    findMany<T extends ApplyJobFindManyArgs>(args?: SelectSubset<T, ApplyJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApplyJob.
     * @param {ApplyJobCreateArgs} args - Arguments to create a ApplyJob.
     * @example
     * // Create one ApplyJob
     * const ApplyJob = await prisma.applyJob.create({
     *   data: {
     *     // ... data to create a ApplyJob
     *   }
     * })
     * 
     */
    create<T extends ApplyJobCreateArgs>(args: SelectSubset<T, ApplyJobCreateArgs<ExtArgs>>): Prisma__ApplyJobClient<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApplyJobs.
     * @param {ApplyJobCreateManyArgs} args - Arguments to create many ApplyJobs.
     * @example
     * // Create many ApplyJobs
     * const applyJob = await prisma.applyJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplyJobCreateManyArgs>(args?: SelectSubset<T, ApplyJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApplyJobs and returns the data saved in the database.
     * @param {ApplyJobCreateManyAndReturnArgs} args - Arguments to create many ApplyJobs.
     * @example
     * // Create many ApplyJobs
     * const applyJob = await prisma.applyJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApplyJobs and only return the `applyId`
     * const applyJobWithApplyIdOnly = await prisma.applyJob.createManyAndReturn({
     *   select: { applyId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApplyJobCreateManyAndReturnArgs>(args?: SelectSubset<T, ApplyJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApplyJob.
     * @param {ApplyJobDeleteArgs} args - Arguments to delete one ApplyJob.
     * @example
     * // Delete one ApplyJob
     * const ApplyJob = await prisma.applyJob.delete({
     *   where: {
     *     // ... filter to delete one ApplyJob
     *   }
     * })
     * 
     */
    delete<T extends ApplyJobDeleteArgs>(args: SelectSubset<T, ApplyJobDeleteArgs<ExtArgs>>): Prisma__ApplyJobClient<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApplyJob.
     * @param {ApplyJobUpdateArgs} args - Arguments to update one ApplyJob.
     * @example
     * // Update one ApplyJob
     * const applyJob = await prisma.applyJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplyJobUpdateArgs>(args: SelectSubset<T, ApplyJobUpdateArgs<ExtArgs>>): Prisma__ApplyJobClient<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApplyJobs.
     * @param {ApplyJobDeleteManyArgs} args - Arguments to filter ApplyJobs to delete.
     * @example
     * // Delete a few ApplyJobs
     * const { count } = await prisma.applyJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplyJobDeleteManyArgs>(args?: SelectSubset<T, ApplyJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApplyJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplyJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApplyJobs
     * const applyJob = await prisma.applyJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplyJobUpdateManyArgs>(args: SelectSubset<T, ApplyJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApplyJobs and returns the data updated in the database.
     * @param {ApplyJobUpdateManyAndReturnArgs} args - Arguments to update many ApplyJobs.
     * @example
     * // Update many ApplyJobs
     * const applyJob = await prisma.applyJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApplyJobs and only return the `applyId`
     * const applyJobWithApplyIdOnly = await prisma.applyJob.updateManyAndReturn({
     *   select: { applyId: true },
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
    updateManyAndReturn<T extends ApplyJobUpdateManyAndReturnArgs>(args: SelectSubset<T, ApplyJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApplyJob.
     * @param {ApplyJobUpsertArgs} args - Arguments to update or create a ApplyJob.
     * @example
     * // Update or create a ApplyJob
     * const applyJob = await prisma.applyJob.upsert({
     *   create: {
     *     // ... data to create a ApplyJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApplyJob we want to update
     *   }
     * })
     */
    upsert<T extends ApplyJobUpsertArgs>(args: SelectSubset<T, ApplyJobUpsertArgs<ExtArgs>>): Prisma__ApplyJobClient<$Result.GetResult<Prisma.$ApplyJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApplyJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplyJobCountArgs} args - Arguments to filter ApplyJobs to count.
     * @example
     * // Count the number of ApplyJobs
     * const count = await prisma.applyJob.count({
     *   where: {
     *     // ... the filter for the ApplyJobs we want to count
     *   }
     * })
    **/
    count<T extends ApplyJobCountArgs>(
      args?: Subset<T, ApplyJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplyJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApplyJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplyJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApplyJobAggregateArgs>(args: Subset<T, ApplyJobAggregateArgs>): Prisma.PrismaPromise<GetApplyJobAggregateType<T>>

    /**
     * Group by ApplyJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplyJobGroupByArgs} args - Group by arguments.
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
      T extends ApplyJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplyJobGroupByArgs['orderBy'] }
        : { orderBy?: ApplyJobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApplyJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplyJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApplyJob model
   */
  readonly fields: ApplyJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApplyJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplyJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ApplyJob model
   */
  interface ApplyJobFieldRefs {
    readonly applyId: FieldRef<"ApplyJob", 'BigInt'>
    readonly userId: FieldRef<"ApplyJob", 'BigInt'>
    readonly jobId: FieldRef<"ApplyJob", 'BigInt'>
    readonly interviewDate: FieldRef<"ApplyJob", 'DateTime'>
    readonly title: FieldRef<"ApplyJob", 'String'>
    readonly description: FieldRef<"ApplyJob", 'String'>
    readonly resumeFile: FieldRef<"ApplyJob", 'String'>
    readonly applyType: FieldRef<"ApplyJob", 'ApplyType'>
    readonly status: FieldRef<"ApplyJob", 'Boolean'>
    readonly createdAt: FieldRef<"ApplyJob", 'DateTime'>
    readonly updatedAt: FieldRef<"ApplyJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApplyJob findUnique
   */
  export type ApplyJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * Filter, which ApplyJob to fetch.
     */
    where: ApplyJobWhereUniqueInput
  }

  /**
   * ApplyJob findUniqueOrThrow
   */
  export type ApplyJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * Filter, which ApplyJob to fetch.
     */
    where: ApplyJobWhereUniqueInput
  }

  /**
   * ApplyJob findFirst
   */
  export type ApplyJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * Filter, which ApplyJob to fetch.
     */
    where?: ApplyJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplyJobs to fetch.
     */
    orderBy?: ApplyJobOrderByWithRelationInput | ApplyJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplyJobs.
     */
    cursor?: ApplyJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplyJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplyJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplyJobs.
     */
    distinct?: ApplyJobScalarFieldEnum | ApplyJobScalarFieldEnum[]
  }

  /**
   * ApplyJob findFirstOrThrow
   */
  export type ApplyJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * Filter, which ApplyJob to fetch.
     */
    where?: ApplyJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplyJobs to fetch.
     */
    orderBy?: ApplyJobOrderByWithRelationInput | ApplyJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplyJobs.
     */
    cursor?: ApplyJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplyJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplyJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplyJobs.
     */
    distinct?: ApplyJobScalarFieldEnum | ApplyJobScalarFieldEnum[]
  }

  /**
   * ApplyJob findMany
   */
  export type ApplyJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * Filter, which ApplyJobs to fetch.
     */
    where?: ApplyJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplyJobs to fetch.
     */
    orderBy?: ApplyJobOrderByWithRelationInput | ApplyJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApplyJobs.
     */
    cursor?: ApplyJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplyJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplyJobs.
     */
    skip?: number
    distinct?: ApplyJobScalarFieldEnum | ApplyJobScalarFieldEnum[]
  }

  /**
   * ApplyJob create
   */
  export type ApplyJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * The data needed to create a ApplyJob.
     */
    data: XOR<ApplyJobCreateInput, ApplyJobUncheckedCreateInput>
  }

  /**
   * ApplyJob createMany
   */
  export type ApplyJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApplyJobs.
     */
    data: ApplyJobCreateManyInput | ApplyJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApplyJob createManyAndReturn
   */
  export type ApplyJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * The data used to create many ApplyJobs.
     */
    data: ApplyJobCreateManyInput | ApplyJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApplyJob update
   */
  export type ApplyJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * The data needed to update a ApplyJob.
     */
    data: XOR<ApplyJobUpdateInput, ApplyJobUncheckedUpdateInput>
    /**
     * Choose, which ApplyJob to update.
     */
    where: ApplyJobWhereUniqueInput
  }

  /**
   * ApplyJob updateMany
   */
  export type ApplyJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApplyJobs.
     */
    data: XOR<ApplyJobUpdateManyMutationInput, ApplyJobUncheckedUpdateManyInput>
    /**
     * Filter which ApplyJobs to update
     */
    where?: ApplyJobWhereInput
    /**
     * Limit how many ApplyJobs to update.
     */
    limit?: number
  }

  /**
   * ApplyJob updateManyAndReturn
   */
  export type ApplyJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * The data used to update ApplyJobs.
     */
    data: XOR<ApplyJobUpdateManyMutationInput, ApplyJobUncheckedUpdateManyInput>
    /**
     * Filter which ApplyJobs to update
     */
    where?: ApplyJobWhereInput
    /**
     * Limit how many ApplyJobs to update.
     */
    limit?: number
  }

  /**
   * ApplyJob upsert
   */
  export type ApplyJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * The filter to search for the ApplyJob to update in case it exists.
     */
    where: ApplyJobWhereUniqueInput
    /**
     * In case the ApplyJob found by the `where` argument doesn't exist, create a new ApplyJob with this data.
     */
    create: XOR<ApplyJobCreateInput, ApplyJobUncheckedCreateInput>
    /**
     * In case the ApplyJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplyJobUpdateInput, ApplyJobUncheckedUpdateInput>
  }

  /**
   * ApplyJob delete
   */
  export type ApplyJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
    /**
     * Filter which ApplyJob to delete.
     */
    where: ApplyJobWhereUniqueInput
  }

  /**
   * ApplyJob deleteMany
   */
  export type ApplyJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplyJobs to delete
     */
    where?: ApplyJobWhereInput
    /**
     * Limit how many ApplyJobs to delete.
     */
    limit?: number
  }

  /**
   * ApplyJob without action
   */
  export type ApplyJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplyJob
     */
    select?: ApplyJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplyJob
     */
    omit?: ApplyJobOmit<ExtArgs> | null
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


  export const IndustryVisaRuleScalarFieldEnum: {
    id: 'id',
    industryCode: 'industryCode',
    allowedVisa: 'allowedVisa'
  };

  export type IndustryVisaRuleScalarFieldEnum = (typeof IndustryVisaRuleScalarFieldEnum)[keyof typeof IndustryVisaRuleScalarFieldEnum]


  export const JobPostingScalarFieldEnum: {
    jobId: 'jobId',
    corporateId: 'corporateId',
    boardType: 'boardType',
    title: 'title',
    description: 'description',
    workContentImg: 'workContentImg',
    status: 'status',
    isPremium: 'isPremium',
    premiumStartAt: 'premiumStartAt',
    premiumEndAt: 'premiumEndAt',
    closingDate: 'closingDate',
    isRecruitmentEnd: 'isRecruitmentEnd',
    displayAddress: 'displayAddress',
    actualAddress: 'actualAddress',
    workIntensity: 'workIntensity',
    benefits: 'benefits',
    allowedVisas: 'allowedVisas',
    minKoreanLevel: 'minKoreanLevel',
    contactName: 'contactName',
    contactPhone: 'contactPhone',
    intervieAPPLICANTwMethod: 'intervieAPPLICANTwMethod',
    interviewPlace: 'interviewPlace',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobPostingScalarFieldEnum = (typeof JobPostingScalarFieldEnum)[keyof typeof JobPostingScalarFieldEnum]


  export const JobAttributesAlbaScalarFieldEnum: {
    jobId: 'jobId',
    hourlyWage: 'hourlyWage',
    workPeriod: 'workPeriod',
    workDaysMask: 'workDaysMask',
    workTimeStart: 'workTimeStart',
    workTimeEnd: 'workTimeEnd'
  };

  export type JobAttributesAlbaScalarFieldEnum = (typeof JobAttributesAlbaScalarFieldEnum)[keyof typeof JobAttributesAlbaScalarFieldEnum]


  export const JobAttributesFulltimeScalarFieldEnum: {
    jobId: 'jobId',
    salaryMin: 'salaryMin',
    salaryMax: 'salaryMax',
    experienceLevel: 'experienceLevel',
    educationLevel: 'educationLevel'
  };

  export type JobAttributesFulltimeScalarFieldEnum = (typeof JobAttributesFulltimeScalarFieldEnum)[keyof typeof JobAttributesFulltimeScalarFieldEnum]


  export const InterviewSlotScalarFieldEnum: {
    slotId: 'slotId',
    jobId: 'jobId',
    startTime: 'startTime',
    endTime: 'endTime',
    isBooked: 'isBooked'
  };

  export type InterviewSlotScalarFieldEnum = (typeof InterviewSlotScalarFieldEnum)[keyof typeof InterviewSlotScalarFieldEnum]


  export const JobApplicationScalarFieldEnum: {
    appId: 'appId',
    jobId: 'jobId',
    applicantId: 'applicantId',
    status: 'status',
    selectedSlotId: 'selectedSlotId',
    proposedBy: 'proposedBy',
    proposedTime: 'proposedTime',
    rejectionReason: 'rejectionReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobApplicationScalarFieldEnum = (typeof JobApplicationScalarFieldEnum)[keyof typeof JobApplicationScalarFieldEnum]


  export const ApplyJobScalarFieldEnum: {
    applyId: 'applyId',
    userId: 'userId',
    jobId: 'jobId',
    interviewDate: 'interviewDate',
    title: 'title',
    description: 'description',
    resumeFile: 'resumeFile',
    applyType: 'applyType',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApplyJobScalarFieldEnum = (typeof ApplyJobScalarFieldEnum)[keyof typeof ApplyJobScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'BoardType'
   */
  export type EnumBoardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BoardType'>
    


  /**
   * Reference to a field of type 'BoardType[]'
   */
  export type ListEnumBoardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BoardType[]'>
    


  /**
   * Reference to a field of type 'PostStatus'
   */
  export type EnumPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostStatus'>
    


  /**
   * Reference to a field of type 'PostStatus[]'
   */
  export type ListEnumPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostStatus[]'>
    


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
   * Reference to a field of type 'Intensity'
   */
  export type EnumIntensityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Intensity'>
    


  /**
   * Reference to a field of type 'Intensity[]'
   */
  export type ListEnumIntensityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Intensity[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'InterviewType'
   */
  export type EnumInterviewTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InterviewType'>
    


  /**
   * Reference to a field of type 'InterviewType[]'
   */
  export type ListEnumInterviewTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InterviewType[]'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus[]'>
    


  /**
   * Reference to a field of type 'ActorType'
   */
  export type EnumActorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActorType'>
    


  /**
   * Reference to a field of type 'ActorType[]'
   */
  export type ListEnumActorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActorType[]'>
    


  /**
   * Reference to a field of type 'ApplyType'
   */
  export type EnumApplyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplyType'>
    


  /**
   * Reference to a field of type 'ApplyType[]'
   */
  export type ListEnumApplyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplyType[]'>
    


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


  export type IndustryVisaRuleWhereInput = {
    AND?: IndustryVisaRuleWhereInput | IndustryVisaRuleWhereInput[]
    OR?: IndustryVisaRuleWhereInput[]
    NOT?: IndustryVisaRuleWhereInput | IndustryVisaRuleWhereInput[]
    id?: IntFilter<"IndustryVisaRule"> | number
    industryCode?: StringFilter<"IndustryVisaRule"> | string
    allowedVisa?: StringFilter<"IndustryVisaRule"> | string
  }

  export type IndustryVisaRuleOrderByWithRelationInput = {
    id?: SortOrder
    industryCode?: SortOrder
    allowedVisa?: SortOrder
  }

  export type IndustryVisaRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    industryCode_allowedVisa?: IndustryVisaRuleIndustryCodeAllowedVisaCompoundUniqueInput
    AND?: IndustryVisaRuleWhereInput | IndustryVisaRuleWhereInput[]
    OR?: IndustryVisaRuleWhereInput[]
    NOT?: IndustryVisaRuleWhereInput | IndustryVisaRuleWhereInput[]
    industryCode?: StringFilter<"IndustryVisaRule"> | string
    allowedVisa?: StringFilter<"IndustryVisaRule"> | string
  }, "id" | "industryCode_allowedVisa">

  export type IndustryVisaRuleOrderByWithAggregationInput = {
    id?: SortOrder
    industryCode?: SortOrder
    allowedVisa?: SortOrder
    _count?: IndustryVisaRuleCountOrderByAggregateInput
    _avg?: IndustryVisaRuleAvgOrderByAggregateInput
    _max?: IndustryVisaRuleMaxOrderByAggregateInput
    _min?: IndustryVisaRuleMinOrderByAggregateInput
    _sum?: IndustryVisaRuleSumOrderByAggregateInput
  }

  export type IndustryVisaRuleScalarWhereWithAggregatesInput = {
    AND?: IndustryVisaRuleScalarWhereWithAggregatesInput | IndustryVisaRuleScalarWhereWithAggregatesInput[]
    OR?: IndustryVisaRuleScalarWhereWithAggregatesInput[]
    NOT?: IndustryVisaRuleScalarWhereWithAggregatesInput | IndustryVisaRuleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"IndustryVisaRule"> | number
    industryCode?: StringWithAggregatesFilter<"IndustryVisaRule"> | string
    allowedVisa?: StringWithAggregatesFilter<"IndustryVisaRule"> | string
  }

  export type JobPostingWhereInput = {
    AND?: JobPostingWhereInput | JobPostingWhereInput[]
    OR?: JobPostingWhereInput[]
    NOT?: JobPostingWhereInput | JobPostingWhereInput[]
    jobId?: BigIntFilter<"JobPosting"> | bigint | number
    corporateId?: BigIntFilter<"JobPosting"> | bigint | number
    boardType?: EnumBoardTypeFilter<"JobPosting"> | $Enums.BoardType
    title?: StringFilter<"JobPosting"> | string
    description?: StringFilter<"JobPosting"> | string
    workContentImg?: StringNullableFilter<"JobPosting"> | string | null
    status?: EnumPostStatusFilter<"JobPosting"> | $Enums.PostStatus
    isPremium?: BoolFilter<"JobPosting"> | boolean
    premiumStartAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    premiumEndAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    closingDate?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    isRecruitmentEnd?: BoolFilter<"JobPosting"> | boolean
    displayAddress?: StringFilter<"JobPosting"> | string
    actualAddress?: StringFilter<"JobPosting"> | string
    workIntensity?: EnumIntensityFilter<"JobPosting"> | $Enums.Intensity
    benefits?: JsonNullableFilter<"JobPosting">
    allowedVisas?: StringFilter<"JobPosting"> | string
    minKoreanLevel?: IntFilter<"JobPosting"> | number
    contactName?: StringFilter<"JobPosting"> | string
    contactPhone?: StringFilter<"JobPosting"> | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFilter<"JobPosting"> | $Enums.InterviewType
    interviewPlace?: StringNullableFilter<"JobPosting"> | string | null
    isActive?: BoolFilter<"JobPosting"> | boolean
    createdAt?: DateTimeFilter<"JobPosting"> | Date | string
    updatedAt?: DateTimeFilter<"JobPosting"> | Date | string
    albaAttributes?: XOR<JobAttributesAlbaNullableScalarRelationFilter, JobAttributesAlbaWhereInput> | null
    fulltimeAttributes?: XOR<JobAttributesFulltimeNullableScalarRelationFilter, JobAttributesFulltimeWhereInput> | null
    interviewSlots?: InterviewSlotListRelationFilter
    applications?: JobApplicationListRelationFilter
  }

  export type JobPostingOrderByWithRelationInput = {
    jobId?: SortOrder
    corporateId?: SortOrder
    boardType?: SortOrder
    title?: SortOrder
    description?: SortOrder
    workContentImg?: SortOrderInput | SortOrder
    status?: SortOrder
    isPremium?: SortOrder
    premiumStartAt?: SortOrderInput | SortOrder
    premiumEndAt?: SortOrderInput | SortOrder
    closingDate?: SortOrderInput | SortOrder
    isRecruitmentEnd?: SortOrder
    displayAddress?: SortOrder
    actualAddress?: SortOrder
    workIntensity?: SortOrder
    benefits?: SortOrderInput | SortOrder
    allowedVisas?: SortOrder
    minKoreanLevel?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    intervieAPPLICANTwMethod?: SortOrder
    interviewPlace?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    albaAttributes?: JobAttributesAlbaOrderByWithRelationInput
    fulltimeAttributes?: JobAttributesFulltimeOrderByWithRelationInput
    interviewSlots?: InterviewSlotOrderByRelationAggregateInput
    applications?: JobApplicationOrderByRelationAggregateInput
  }

  export type JobPostingWhereUniqueInput = Prisma.AtLeast<{
    jobId?: bigint | number
    AND?: JobPostingWhereInput | JobPostingWhereInput[]
    OR?: JobPostingWhereInput[]
    NOT?: JobPostingWhereInput | JobPostingWhereInput[]
    corporateId?: BigIntFilter<"JobPosting"> | bigint | number
    boardType?: EnumBoardTypeFilter<"JobPosting"> | $Enums.BoardType
    title?: StringFilter<"JobPosting"> | string
    description?: StringFilter<"JobPosting"> | string
    workContentImg?: StringNullableFilter<"JobPosting"> | string | null
    status?: EnumPostStatusFilter<"JobPosting"> | $Enums.PostStatus
    isPremium?: BoolFilter<"JobPosting"> | boolean
    premiumStartAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    premiumEndAt?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    closingDate?: DateTimeNullableFilter<"JobPosting"> | Date | string | null
    isRecruitmentEnd?: BoolFilter<"JobPosting"> | boolean
    displayAddress?: StringFilter<"JobPosting"> | string
    actualAddress?: StringFilter<"JobPosting"> | string
    workIntensity?: EnumIntensityFilter<"JobPosting"> | $Enums.Intensity
    benefits?: JsonNullableFilter<"JobPosting">
    allowedVisas?: StringFilter<"JobPosting"> | string
    minKoreanLevel?: IntFilter<"JobPosting"> | number
    contactName?: StringFilter<"JobPosting"> | string
    contactPhone?: StringFilter<"JobPosting"> | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFilter<"JobPosting"> | $Enums.InterviewType
    interviewPlace?: StringNullableFilter<"JobPosting"> | string | null
    isActive?: BoolFilter<"JobPosting"> | boolean
    createdAt?: DateTimeFilter<"JobPosting"> | Date | string
    updatedAt?: DateTimeFilter<"JobPosting"> | Date | string
    albaAttributes?: XOR<JobAttributesAlbaNullableScalarRelationFilter, JobAttributesAlbaWhereInput> | null
    fulltimeAttributes?: XOR<JobAttributesFulltimeNullableScalarRelationFilter, JobAttributesFulltimeWhereInput> | null
    interviewSlots?: InterviewSlotListRelationFilter
    applications?: JobApplicationListRelationFilter
  }, "jobId">

  export type JobPostingOrderByWithAggregationInput = {
    jobId?: SortOrder
    corporateId?: SortOrder
    boardType?: SortOrder
    title?: SortOrder
    description?: SortOrder
    workContentImg?: SortOrderInput | SortOrder
    status?: SortOrder
    isPremium?: SortOrder
    premiumStartAt?: SortOrderInput | SortOrder
    premiumEndAt?: SortOrderInput | SortOrder
    closingDate?: SortOrderInput | SortOrder
    isRecruitmentEnd?: SortOrder
    displayAddress?: SortOrder
    actualAddress?: SortOrder
    workIntensity?: SortOrder
    benefits?: SortOrderInput | SortOrder
    allowedVisas?: SortOrder
    minKoreanLevel?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    intervieAPPLICANTwMethod?: SortOrder
    interviewPlace?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobPostingCountOrderByAggregateInput
    _avg?: JobPostingAvgOrderByAggregateInput
    _max?: JobPostingMaxOrderByAggregateInput
    _min?: JobPostingMinOrderByAggregateInput
    _sum?: JobPostingSumOrderByAggregateInput
  }

  export type JobPostingScalarWhereWithAggregatesInput = {
    AND?: JobPostingScalarWhereWithAggregatesInput | JobPostingScalarWhereWithAggregatesInput[]
    OR?: JobPostingScalarWhereWithAggregatesInput[]
    NOT?: JobPostingScalarWhereWithAggregatesInput | JobPostingScalarWhereWithAggregatesInput[]
    jobId?: BigIntWithAggregatesFilter<"JobPosting"> | bigint | number
    corporateId?: BigIntWithAggregatesFilter<"JobPosting"> | bigint | number
    boardType?: EnumBoardTypeWithAggregatesFilter<"JobPosting"> | $Enums.BoardType
    title?: StringWithAggregatesFilter<"JobPosting"> | string
    description?: StringWithAggregatesFilter<"JobPosting"> | string
    workContentImg?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    status?: EnumPostStatusWithAggregatesFilter<"JobPosting"> | $Enums.PostStatus
    isPremium?: BoolWithAggregatesFilter<"JobPosting"> | boolean
    premiumStartAt?: DateTimeNullableWithAggregatesFilter<"JobPosting"> | Date | string | null
    premiumEndAt?: DateTimeNullableWithAggregatesFilter<"JobPosting"> | Date | string | null
    closingDate?: DateTimeNullableWithAggregatesFilter<"JobPosting"> | Date | string | null
    isRecruitmentEnd?: BoolWithAggregatesFilter<"JobPosting"> | boolean
    displayAddress?: StringWithAggregatesFilter<"JobPosting"> | string
    actualAddress?: StringWithAggregatesFilter<"JobPosting"> | string
    workIntensity?: EnumIntensityWithAggregatesFilter<"JobPosting"> | $Enums.Intensity
    benefits?: JsonNullableWithAggregatesFilter<"JobPosting">
    allowedVisas?: StringWithAggregatesFilter<"JobPosting"> | string
    minKoreanLevel?: IntWithAggregatesFilter<"JobPosting"> | number
    contactName?: StringWithAggregatesFilter<"JobPosting"> | string
    contactPhone?: StringWithAggregatesFilter<"JobPosting"> | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeWithAggregatesFilter<"JobPosting"> | $Enums.InterviewType
    interviewPlace?: StringNullableWithAggregatesFilter<"JobPosting"> | string | null
    isActive?: BoolWithAggregatesFilter<"JobPosting"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobPosting"> | Date | string
  }

  export type JobAttributesAlbaWhereInput = {
    AND?: JobAttributesAlbaWhereInput | JobAttributesAlbaWhereInput[]
    OR?: JobAttributesAlbaWhereInput[]
    NOT?: JobAttributesAlbaWhereInput | JobAttributesAlbaWhereInput[]
    jobId?: BigIntFilter<"JobAttributesAlba"> | bigint | number
    hourlyWage?: IntFilter<"JobAttributesAlba"> | number
    workPeriod?: StringNullableFilter<"JobAttributesAlba"> | string | null
    workDaysMask?: StringFilter<"JobAttributesAlba"> | string
    workTimeStart?: DateTimeNullableFilter<"JobAttributesAlba"> | Date | string | null
    workTimeEnd?: DateTimeNullableFilter<"JobAttributesAlba"> | Date | string | null
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
  }

  export type JobAttributesAlbaOrderByWithRelationInput = {
    jobId?: SortOrder
    hourlyWage?: SortOrder
    workPeriod?: SortOrderInput | SortOrder
    workDaysMask?: SortOrder
    workTimeStart?: SortOrderInput | SortOrder
    workTimeEnd?: SortOrderInput | SortOrder
    job?: JobPostingOrderByWithRelationInput
  }

  export type JobAttributesAlbaWhereUniqueInput = Prisma.AtLeast<{
    jobId?: bigint | number
    AND?: JobAttributesAlbaWhereInput | JobAttributesAlbaWhereInput[]
    OR?: JobAttributesAlbaWhereInput[]
    NOT?: JobAttributesAlbaWhereInput | JobAttributesAlbaWhereInput[]
    hourlyWage?: IntFilter<"JobAttributesAlba"> | number
    workPeriod?: StringNullableFilter<"JobAttributesAlba"> | string | null
    workDaysMask?: StringFilter<"JobAttributesAlba"> | string
    workTimeStart?: DateTimeNullableFilter<"JobAttributesAlba"> | Date | string | null
    workTimeEnd?: DateTimeNullableFilter<"JobAttributesAlba"> | Date | string | null
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
  }, "jobId">

  export type JobAttributesAlbaOrderByWithAggregationInput = {
    jobId?: SortOrder
    hourlyWage?: SortOrder
    workPeriod?: SortOrderInput | SortOrder
    workDaysMask?: SortOrder
    workTimeStart?: SortOrderInput | SortOrder
    workTimeEnd?: SortOrderInput | SortOrder
    _count?: JobAttributesAlbaCountOrderByAggregateInput
    _avg?: JobAttributesAlbaAvgOrderByAggregateInput
    _max?: JobAttributesAlbaMaxOrderByAggregateInput
    _min?: JobAttributesAlbaMinOrderByAggregateInput
    _sum?: JobAttributesAlbaSumOrderByAggregateInput
  }

  export type JobAttributesAlbaScalarWhereWithAggregatesInput = {
    AND?: JobAttributesAlbaScalarWhereWithAggregatesInput | JobAttributesAlbaScalarWhereWithAggregatesInput[]
    OR?: JobAttributesAlbaScalarWhereWithAggregatesInput[]
    NOT?: JobAttributesAlbaScalarWhereWithAggregatesInput | JobAttributesAlbaScalarWhereWithAggregatesInput[]
    jobId?: BigIntWithAggregatesFilter<"JobAttributesAlba"> | bigint | number
    hourlyWage?: IntWithAggregatesFilter<"JobAttributesAlba"> | number
    workPeriod?: StringNullableWithAggregatesFilter<"JobAttributesAlba"> | string | null
    workDaysMask?: StringWithAggregatesFilter<"JobAttributesAlba"> | string
    workTimeStart?: DateTimeNullableWithAggregatesFilter<"JobAttributesAlba"> | Date | string | null
    workTimeEnd?: DateTimeNullableWithAggregatesFilter<"JobAttributesAlba"> | Date | string | null
  }

  export type JobAttributesFulltimeWhereInput = {
    AND?: JobAttributesFulltimeWhereInput | JobAttributesFulltimeWhereInput[]
    OR?: JobAttributesFulltimeWhereInput[]
    NOT?: JobAttributesFulltimeWhereInput | JobAttributesFulltimeWhereInput[]
    jobId?: BigIntFilter<"JobAttributesFulltime"> | bigint | number
    salaryMin?: IntNullableFilter<"JobAttributesFulltime"> | number | null
    salaryMax?: IntNullableFilter<"JobAttributesFulltime"> | number | null
    experienceLevel?: StringFilter<"JobAttributesFulltime"> | string
    educationLevel?: StringFilter<"JobAttributesFulltime"> | string
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
  }

  export type JobAttributesFulltimeOrderByWithRelationInput = {
    jobId?: SortOrder
    salaryMin?: SortOrderInput | SortOrder
    salaryMax?: SortOrderInput | SortOrder
    experienceLevel?: SortOrder
    educationLevel?: SortOrder
    job?: JobPostingOrderByWithRelationInput
  }

  export type JobAttributesFulltimeWhereUniqueInput = Prisma.AtLeast<{
    jobId?: bigint | number
    AND?: JobAttributesFulltimeWhereInput | JobAttributesFulltimeWhereInput[]
    OR?: JobAttributesFulltimeWhereInput[]
    NOT?: JobAttributesFulltimeWhereInput | JobAttributesFulltimeWhereInput[]
    salaryMin?: IntNullableFilter<"JobAttributesFulltime"> | number | null
    salaryMax?: IntNullableFilter<"JobAttributesFulltime"> | number | null
    experienceLevel?: StringFilter<"JobAttributesFulltime"> | string
    educationLevel?: StringFilter<"JobAttributesFulltime"> | string
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
  }, "jobId">

  export type JobAttributesFulltimeOrderByWithAggregationInput = {
    jobId?: SortOrder
    salaryMin?: SortOrderInput | SortOrder
    salaryMax?: SortOrderInput | SortOrder
    experienceLevel?: SortOrder
    educationLevel?: SortOrder
    _count?: JobAttributesFulltimeCountOrderByAggregateInput
    _avg?: JobAttributesFulltimeAvgOrderByAggregateInput
    _max?: JobAttributesFulltimeMaxOrderByAggregateInput
    _min?: JobAttributesFulltimeMinOrderByAggregateInput
    _sum?: JobAttributesFulltimeSumOrderByAggregateInput
  }

  export type JobAttributesFulltimeScalarWhereWithAggregatesInput = {
    AND?: JobAttributesFulltimeScalarWhereWithAggregatesInput | JobAttributesFulltimeScalarWhereWithAggregatesInput[]
    OR?: JobAttributesFulltimeScalarWhereWithAggregatesInput[]
    NOT?: JobAttributesFulltimeScalarWhereWithAggregatesInput | JobAttributesFulltimeScalarWhereWithAggregatesInput[]
    jobId?: BigIntWithAggregatesFilter<"JobAttributesFulltime"> | bigint | number
    salaryMin?: IntNullableWithAggregatesFilter<"JobAttributesFulltime"> | number | null
    salaryMax?: IntNullableWithAggregatesFilter<"JobAttributesFulltime"> | number | null
    experienceLevel?: StringWithAggregatesFilter<"JobAttributesFulltime"> | string
    educationLevel?: StringWithAggregatesFilter<"JobAttributesFulltime"> | string
  }

  export type InterviewSlotWhereInput = {
    AND?: InterviewSlotWhereInput | InterviewSlotWhereInput[]
    OR?: InterviewSlotWhereInput[]
    NOT?: InterviewSlotWhereInput | InterviewSlotWhereInput[]
    slotId?: BigIntFilter<"InterviewSlot"> | bigint | number
    jobId?: BigIntFilter<"InterviewSlot"> | bigint | number
    startTime?: DateTimeFilter<"InterviewSlot"> | Date | string
    endTime?: DateTimeFilter<"InterviewSlot"> | Date | string
    isBooked?: BoolFilter<"InterviewSlot"> | boolean
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
  }

  export type InterviewSlotOrderByWithRelationInput = {
    slotId?: SortOrder
    jobId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isBooked?: SortOrder
    job?: JobPostingOrderByWithRelationInput
  }

  export type InterviewSlotWhereUniqueInput = Prisma.AtLeast<{
    slotId?: bigint | number
    AND?: InterviewSlotWhereInput | InterviewSlotWhereInput[]
    OR?: InterviewSlotWhereInput[]
    NOT?: InterviewSlotWhereInput | InterviewSlotWhereInput[]
    jobId?: BigIntFilter<"InterviewSlot"> | bigint | number
    startTime?: DateTimeFilter<"InterviewSlot"> | Date | string
    endTime?: DateTimeFilter<"InterviewSlot"> | Date | string
    isBooked?: BoolFilter<"InterviewSlot"> | boolean
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
  }, "slotId">

  export type InterviewSlotOrderByWithAggregationInput = {
    slotId?: SortOrder
    jobId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isBooked?: SortOrder
    _count?: InterviewSlotCountOrderByAggregateInput
    _avg?: InterviewSlotAvgOrderByAggregateInput
    _max?: InterviewSlotMaxOrderByAggregateInput
    _min?: InterviewSlotMinOrderByAggregateInput
    _sum?: InterviewSlotSumOrderByAggregateInput
  }

  export type InterviewSlotScalarWhereWithAggregatesInput = {
    AND?: InterviewSlotScalarWhereWithAggregatesInput | InterviewSlotScalarWhereWithAggregatesInput[]
    OR?: InterviewSlotScalarWhereWithAggregatesInput[]
    NOT?: InterviewSlotScalarWhereWithAggregatesInput | InterviewSlotScalarWhereWithAggregatesInput[]
    slotId?: BigIntWithAggregatesFilter<"InterviewSlot"> | bigint | number
    jobId?: BigIntWithAggregatesFilter<"InterviewSlot"> | bigint | number
    startTime?: DateTimeWithAggregatesFilter<"InterviewSlot"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"InterviewSlot"> | Date | string
    isBooked?: BoolWithAggregatesFilter<"InterviewSlot"> | boolean
  }

  export type JobApplicationWhereInput = {
    AND?: JobApplicationWhereInput | JobApplicationWhereInput[]
    OR?: JobApplicationWhereInput[]
    NOT?: JobApplicationWhereInput | JobApplicationWhereInput[]
    appId?: BigIntFilter<"JobApplication"> | bigint | number
    jobId?: BigIntFilter<"JobApplication"> | bigint | number
    applicantId?: BigIntFilter<"JobApplication"> | bigint | number
    status?: EnumApplicationStatusFilter<"JobApplication"> | $Enums.ApplicationStatus
    selectedSlotId?: BigIntNullableFilter<"JobApplication"> | bigint | number | null
    proposedBy?: EnumActorTypeNullableFilter<"JobApplication"> | $Enums.ActorType | null
    proposedTime?: DateTimeNullableFilter<"JobApplication"> | Date | string | null
    rejectionReason?: StringNullableFilter<"JobApplication"> | string | null
    createdAt?: DateTimeFilter<"JobApplication"> | Date | string
    updatedAt?: DateTimeFilter<"JobApplication"> | Date | string
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
  }

  export type JobApplicationOrderByWithRelationInput = {
    appId?: SortOrder
    jobId?: SortOrder
    applicantId?: SortOrder
    status?: SortOrder
    selectedSlotId?: SortOrderInput | SortOrder
    proposedBy?: SortOrderInput | SortOrder
    proposedTime?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    job?: JobPostingOrderByWithRelationInput
  }

  export type JobApplicationWhereUniqueInput = Prisma.AtLeast<{
    appId?: bigint | number
    AND?: JobApplicationWhereInput | JobApplicationWhereInput[]
    OR?: JobApplicationWhereInput[]
    NOT?: JobApplicationWhereInput | JobApplicationWhereInput[]
    jobId?: BigIntFilter<"JobApplication"> | bigint | number
    applicantId?: BigIntFilter<"JobApplication"> | bigint | number
    status?: EnumApplicationStatusFilter<"JobApplication"> | $Enums.ApplicationStatus
    selectedSlotId?: BigIntNullableFilter<"JobApplication"> | bigint | number | null
    proposedBy?: EnumActorTypeNullableFilter<"JobApplication"> | $Enums.ActorType | null
    proposedTime?: DateTimeNullableFilter<"JobApplication"> | Date | string | null
    rejectionReason?: StringNullableFilter<"JobApplication"> | string | null
    createdAt?: DateTimeFilter<"JobApplication"> | Date | string
    updatedAt?: DateTimeFilter<"JobApplication"> | Date | string
    job?: XOR<JobPostingScalarRelationFilter, JobPostingWhereInput>
  }, "appId">

  export type JobApplicationOrderByWithAggregationInput = {
    appId?: SortOrder
    jobId?: SortOrder
    applicantId?: SortOrder
    status?: SortOrder
    selectedSlotId?: SortOrderInput | SortOrder
    proposedBy?: SortOrderInput | SortOrder
    proposedTime?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobApplicationCountOrderByAggregateInput
    _avg?: JobApplicationAvgOrderByAggregateInput
    _max?: JobApplicationMaxOrderByAggregateInput
    _min?: JobApplicationMinOrderByAggregateInput
    _sum?: JobApplicationSumOrderByAggregateInput
  }

  export type JobApplicationScalarWhereWithAggregatesInput = {
    AND?: JobApplicationScalarWhereWithAggregatesInput | JobApplicationScalarWhereWithAggregatesInput[]
    OR?: JobApplicationScalarWhereWithAggregatesInput[]
    NOT?: JobApplicationScalarWhereWithAggregatesInput | JobApplicationScalarWhereWithAggregatesInput[]
    appId?: BigIntWithAggregatesFilter<"JobApplication"> | bigint | number
    jobId?: BigIntWithAggregatesFilter<"JobApplication"> | bigint | number
    applicantId?: BigIntWithAggregatesFilter<"JobApplication"> | bigint | number
    status?: EnumApplicationStatusWithAggregatesFilter<"JobApplication"> | $Enums.ApplicationStatus
    selectedSlotId?: BigIntNullableWithAggregatesFilter<"JobApplication"> | bigint | number | null
    proposedBy?: EnumActorTypeNullableWithAggregatesFilter<"JobApplication"> | $Enums.ActorType | null
    proposedTime?: DateTimeNullableWithAggregatesFilter<"JobApplication"> | Date | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"JobApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobApplication"> | Date | string
  }

  export type ApplyJobWhereInput = {
    AND?: ApplyJobWhereInput | ApplyJobWhereInput[]
    OR?: ApplyJobWhereInput[]
    NOT?: ApplyJobWhereInput | ApplyJobWhereInput[]
    applyId?: BigIntFilter<"ApplyJob"> | bigint | number
    userId?: BigIntFilter<"ApplyJob"> | bigint | number
    jobId?: BigIntFilter<"ApplyJob"> | bigint | number
    interviewDate?: DateTimeNullableFilter<"ApplyJob"> | Date | string | null
    title?: StringFilter<"ApplyJob"> | string
    description?: StringFilter<"ApplyJob"> | string
    resumeFile?: StringNullableFilter<"ApplyJob"> | string | null
    applyType?: EnumApplyTypeNullableFilter<"ApplyJob"> | $Enums.ApplyType | null
    status?: BoolFilter<"ApplyJob"> | boolean
    createdAt?: DateTimeFilter<"ApplyJob"> | Date | string
    updatedAt?: DateTimeFilter<"ApplyJob"> | Date | string
  }

  export type ApplyJobOrderByWithRelationInput = {
    applyId?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    interviewDate?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    resumeFile?: SortOrderInput | SortOrder
    applyType?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplyJobWhereUniqueInput = Prisma.AtLeast<{
    applyId?: bigint | number
    AND?: ApplyJobWhereInput | ApplyJobWhereInput[]
    OR?: ApplyJobWhereInput[]
    NOT?: ApplyJobWhereInput | ApplyJobWhereInput[]
    userId?: BigIntFilter<"ApplyJob"> | bigint | number
    jobId?: BigIntFilter<"ApplyJob"> | bigint | number
    interviewDate?: DateTimeNullableFilter<"ApplyJob"> | Date | string | null
    title?: StringFilter<"ApplyJob"> | string
    description?: StringFilter<"ApplyJob"> | string
    resumeFile?: StringNullableFilter<"ApplyJob"> | string | null
    applyType?: EnumApplyTypeNullableFilter<"ApplyJob"> | $Enums.ApplyType | null
    status?: BoolFilter<"ApplyJob"> | boolean
    createdAt?: DateTimeFilter<"ApplyJob"> | Date | string
    updatedAt?: DateTimeFilter<"ApplyJob"> | Date | string
  }, "applyId">

  export type ApplyJobOrderByWithAggregationInput = {
    applyId?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    interviewDate?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    resumeFile?: SortOrderInput | SortOrder
    applyType?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApplyJobCountOrderByAggregateInput
    _avg?: ApplyJobAvgOrderByAggregateInput
    _max?: ApplyJobMaxOrderByAggregateInput
    _min?: ApplyJobMinOrderByAggregateInput
    _sum?: ApplyJobSumOrderByAggregateInput
  }

  export type ApplyJobScalarWhereWithAggregatesInput = {
    AND?: ApplyJobScalarWhereWithAggregatesInput | ApplyJobScalarWhereWithAggregatesInput[]
    OR?: ApplyJobScalarWhereWithAggregatesInput[]
    NOT?: ApplyJobScalarWhereWithAggregatesInput | ApplyJobScalarWhereWithAggregatesInput[]
    applyId?: BigIntWithAggregatesFilter<"ApplyJob"> | bigint | number
    userId?: BigIntWithAggregatesFilter<"ApplyJob"> | bigint | number
    jobId?: BigIntWithAggregatesFilter<"ApplyJob"> | bigint | number
    interviewDate?: DateTimeNullableWithAggregatesFilter<"ApplyJob"> | Date | string | null
    title?: StringWithAggregatesFilter<"ApplyJob"> | string
    description?: StringWithAggregatesFilter<"ApplyJob"> | string
    resumeFile?: StringNullableWithAggregatesFilter<"ApplyJob"> | string | null
    applyType?: EnumApplyTypeNullableWithAggregatesFilter<"ApplyJob"> | $Enums.ApplyType | null
    status?: BoolWithAggregatesFilter<"ApplyJob"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ApplyJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApplyJob"> | Date | string
  }

  export type IndustryVisaRuleCreateInput = {
    industryCode: string
    allowedVisa: string
  }

  export type IndustryVisaRuleUncheckedCreateInput = {
    id?: number
    industryCode: string
    allowedVisa: string
  }

  export type IndustryVisaRuleUpdateInput = {
    industryCode?: StringFieldUpdateOperationsInput | string
    allowedVisa?: StringFieldUpdateOperationsInput | string
  }

  export type IndustryVisaRuleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    industryCode?: StringFieldUpdateOperationsInput | string
    allowedVisa?: StringFieldUpdateOperationsInput | string
  }

  export type IndustryVisaRuleCreateManyInput = {
    id?: number
    industryCode: string
    allowedVisa: string
  }

  export type IndustryVisaRuleUpdateManyMutationInput = {
    industryCode?: StringFieldUpdateOperationsInput | string
    allowedVisa?: StringFieldUpdateOperationsInput | string
  }

  export type IndustryVisaRuleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    industryCode?: StringFieldUpdateOperationsInput | string
    allowedVisa?: StringFieldUpdateOperationsInput | string
  }

  export type JobPostingCreateInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    albaAttributes?: JobAttributesAlbaCreateNestedOneWithoutJobInput
    fulltimeAttributes?: JobAttributesFulltimeCreateNestedOneWithoutJobInput
    interviewSlots?: InterviewSlotCreateNestedManyWithoutJobInput
    applications?: JobApplicationCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    albaAttributes?: JobAttributesAlbaUncheckedCreateNestedOneWithoutJobInput
    fulltimeAttributes?: JobAttributesFulltimeUncheckedCreateNestedOneWithoutJobInput
    interviewSlots?: InterviewSlotUncheckedCreateNestedManyWithoutJobInput
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingUpdateInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albaAttributes?: JobAttributesAlbaUpdateOneWithoutJobNestedInput
    fulltimeAttributes?: JobAttributesFulltimeUpdateOneWithoutJobNestedInput
    interviewSlots?: InterviewSlotUpdateManyWithoutJobNestedInput
    applications?: JobApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albaAttributes?: JobAttributesAlbaUncheckedUpdateOneWithoutJobNestedInput
    fulltimeAttributes?: JobAttributesFulltimeUncheckedUpdateOneWithoutJobNestedInput
    interviewSlots?: InterviewSlotUncheckedUpdateManyWithoutJobNestedInput
    applications?: JobApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobPostingCreateManyInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobPostingUpdateManyMutationInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobPostingUncheckedUpdateManyInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobAttributesAlbaCreateInput = {
    hourlyWage: number
    workPeriod?: string | null
    workDaysMask: string
    workTimeStart?: Date | string | null
    workTimeEnd?: Date | string | null
    job: JobPostingCreateNestedOneWithoutAlbaAttributesInput
  }

  export type JobAttributesAlbaUncheckedCreateInput = {
    jobId: bigint | number
    hourlyWage: number
    workPeriod?: string | null
    workDaysMask: string
    workTimeStart?: Date | string | null
    workTimeEnd?: Date | string | null
  }

  export type JobAttributesAlbaUpdateInput = {
    hourlyWage?: IntFieldUpdateOperationsInput | number
    workPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    workDaysMask?: StringFieldUpdateOperationsInput | string
    workTimeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workTimeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job?: JobPostingUpdateOneRequiredWithoutAlbaAttributesNestedInput
  }

  export type JobAttributesAlbaUncheckedUpdateInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    hourlyWage?: IntFieldUpdateOperationsInput | number
    workPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    workDaysMask?: StringFieldUpdateOperationsInput | string
    workTimeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workTimeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobAttributesAlbaCreateManyInput = {
    jobId: bigint | number
    hourlyWage: number
    workPeriod?: string | null
    workDaysMask: string
    workTimeStart?: Date | string | null
    workTimeEnd?: Date | string | null
  }

  export type JobAttributesAlbaUpdateManyMutationInput = {
    hourlyWage?: IntFieldUpdateOperationsInput | number
    workPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    workDaysMask?: StringFieldUpdateOperationsInput | string
    workTimeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workTimeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobAttributesAlbaUncheckedUpdateManyInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    hourlyWage?: IntFieldUpdateOperationsInput | number
    workPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    workDaysMask?: StringFieldUpdateOperationsInput | string
    workTimeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workTimeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobAttributesFulltimeCreateInput = {
    salaryMin?: number | null
    salaryMax?: number | null
    experienceLevel: string
    educationLevel: string
    job: JobPostingCreateNestedOneWithoutFulltimeAttributesInput
  }

  export type JobAttributesFulltimeUncheckedCreateInput = {
    jobId: bigint | number
    salaryMin?: number | null
    salaryMax?: number | null
    experienceLevel: string
    educationLevel: string
  }

  export type JobAttributesFulltimeUpdateInput = {
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    experienceLevel?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    job?: JobPostingUpdateOneRequiredWithoutFulltimeAttributesNestedInput
  }

  export type JobAttributesFulltimeUncheckedUpdateInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    experienceLevel?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
  }

  export type JobAttributesFulltimeCreateManyInput = {
    jobId: bigint | number
    salaryMin?: number | null
    salaryMax?: number | null
    experienceLevel: string
    educationLevel: string
  }

  export type JobAttributesFulltimeUpdateManyMutationInput = {
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    experienceLevel?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
  }

  export type JobAttributesFulltimeUncheckedUpdateManyInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    experienceLevel?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
  }

  export type InterviewSlotCreateInput = {
    slotId?: bigint | number
    startTime: Date | string
    endTime: Date | string
    isBooked?: boolean
    job: JobPostingCreateNestedOneWithoutInterviewSlotsInput
  }

  export type InterviewSlotUncheckedCreateInput = {
    slotId?: bigint | number
    jobId: bigint | number
    startTime: Date | string
    endTime: Date | string
    isBooked?: boolean
  }

  export type InterviewSlotUpdateInput = {
    slotId?: BigIntFieldUpdateOperationsInput | bigint | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isBooked?: BoolFieldUpdateOperationsInput | boolean
    job?: JobPostingUpdateOneRequiredWithoutInterviewSlotsNestedInput
  }

  export type InterviewSlotUncheckedUpdateInput = {
    slotId?: BigIntFieldUpdateOperationsInput | bigint | number
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isBooked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InterviewSlotCreateManyInput = {
    slotId?: bigint | number
    jobId: bigint | number
    startTime: Date | string
    endTime: Date | string
    isBooked?: boolean
  }

  export type InterviewSlotUpdateManyMutationInput = {
    slotId?: BigIntFieldUpdateOperationsInput | bigint | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isBooked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InterviewSlotUncheckedUpdateManyInput = {
    slotId?: BigIntFieldUpdateOperationsInput | bigint | number
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isBooked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JobApplicationCreateInput = {
    appId?: bigint | number
    applicantId: bigint | number
    status?: $Enums.ApplicationStatus
    selectedSlotId?: bigint | number | null
    proposedBy?: $Enums.ActorType | null
    proposedTime?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobPostingCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateInput = {
    appId?: bigint | number
    jobId: bigint | number
    applicantId: bigint | number
    status?: $Enums.ApplicationStatus
    selectedSlotId?: bigint | number | null
    proposedBy?: $Enums.ActorType | null
    proposedTime?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobApplicationUpdateInput = {
    appId?: BigIntFieldUpdateOperationsInput | bigint | number
    applicantId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    selectedSlotId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    proposedBy?: NullableEnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType | null
    proposedTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobPostingUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateInput = {
    appId?: BigIntFieldUpdateOperationsInput | bigint | number
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    applicantId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    selectedSlotId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    proposedBy?: NullableEnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType | null
    proposedTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationCreateManyInput = {
    appId?: bigint | number
    jobId: bigint | number
    applicantId: bigint | number
    status?: $Enums.ApplicationStatus
    selectedSlotId?: bigint | number | null
    proposedBy?: $Enums.ActorType | null
    proposedTime?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobApplicationUpdateManyMutationInput = {
    appId?: BigIntFieldUpdateOperationsInput | bigint | number
    applicantId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    selectedSlotId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    proposedBy?: NullableEnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType | null
    proposedTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationUncheckedUpdateManyInput = {
    appId?: BigIntFieldUpdateOperationsInput | bigint | number
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    applicantId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    selectedSlotId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    proposedBy?: NullableEnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType | null
    proposedTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplyJobCreateInput = {
    applyId?: bigint | number
    userId: bigint | number
    jobId: bigint | number
    interviewDate?: Date | string | null
    title: string
    description: string
    resumeFile?: string | null
    applyType?: $Enums.ApplyType | null
    status?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplyJobUncheckedCreateInput = {
    applyId?: bigint | number
    userId: bigint | number
    jobId: bigint | number
    interviewDate?: Date | string | null
    title: string
    description: string
    resumeFile?: string | null
    applyType?: $Enums.ApplyType | null
    status?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplyJobUpdateInput = {
    applyId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    interviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    resumeFile?: NullableStringFieldUpdateOperationsInput | string | null
    applyType?: NullableEnumApplyTypeFieldUpdateOperationsInput | $Enums.ApplyType | null
    status?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplyJobUncheckedUpdateInput = {
    applyId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    interviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    resumeFile?: NullableStringFieldUpdateOperationsInput | string | null
    applyType?: NullableEnumApplyTypeFieldUpdateOperationsInput | $Enums.ApplyType | null
    status?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplyJobCreateManyInput = {
    applyId?: bigint | number
    userId: bigint | number
    jobId: bigint | number
    interviewDate?: Date | string | null
    title: string
    description: string
    resumeFile?: string | null
    applyType?: $Enums.ApplyType | null
    status?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplyJobUpdateManyMutationInput = {
    applyId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    interviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    resumeFile?: NullableStringFieldUpdateOperationsInput | string | null
    applyType?: NullableEnumApplyTypeFieldUpdateOperationsInput | $Enums.ApplyType | null
    status?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplyJobUncheckedUpdateManyInput = {
    applyId?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: BigIntFieldUpdateOperationsInput | bigint | number
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    interviewDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    resumeFile?: NullableStringFieldUpdateOperationsInput | string | null
    applyType?: NullableEnumApplyTypeFieldUpdateOperationsInput | $Enums.ApplyType | null
    status?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type IndustryVisaRuleIndustryCodeAllowedVisaCompoundUniqueInput = {
    industryCode: string
    allowedVisa: string
  }

  export type IndustryVisaRuleCountOrderByAggregateInput = {
    id?: SortOrder
    industryCode?: SortOrder
    allowedVisa?: SortOrder
  }

  export type IndustryVisaRuleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IndustryVisaRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    industryCode?: SortOrder
    allowedVisa?: SortOrder
  }

  export type IndustryVisaRuleMinOrderByAggregateInput = {
    id?: SortOrder
    industryCode?: SortOrder
    allowedVisa?: SortOrder
  }

  export type IndustryVisaRuleSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumBoardTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BoardType | EnumBoardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BoardType[] | ListEnumBoardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BoardType[] | ListEnumBoardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBoardTypeFilter<$PrismaModel> | $Enums.BoardType
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

  export type EnumPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusFilter<$PrismaModel> | $Enums.PostStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type EnumIntensityFilter<$PrismaModel = never> = {
    equals?: $Enums.Intensity | EnumIntensityFieldRefInput<$PrismaModel>
    in?: $Enums.Intensity[] | ListEnumIntensityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Intensity[] | ListEnumIntensityFieldRefInput<$PrismaModel>
    not?: NestedEnumIntensityFilter<$PrismaModel> | $Enums.Intensity
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumInterviewTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InterviewType | EnumInterviewTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InterviewType[] | ListEnumInterviewTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterviewType[] | ListEnumInterviewTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInterviewTypeFilter<$PrismaModel> | $Enums.InterviewType
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

  export type JobAttributesAlbaNullableScalarRelationFilter = {
    is?: JobAttributesAlbaWhereInput | null
    isNot?: JobAttributesAlbaWhereInput | null
  }

  export type JobAttributesFulltimeNullableScalarRelationFilter = {
    is?: JobAttributesFulltimeWhereInput | null
    isNot?: JobAttributesFulltimeWhereInput | null
  }

  export type InterviewSlotListRelationFilter = {
    every?: InterviewSlotWhereInput
    some?: InterviewSlotWhereInput
    none?: InterviewSlotWhereInput
  }

  export type JobApplicationListRelationFilter = {
    every?: JobApplicationWhereInput
    some?: JobApplicationWhereInput
    none?: JobApplicationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InterviewSlotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobPostingCountOrderByAggregateInput = {
    jobId?: SortOrder
    corporateId?: SortOrder
    boardType?: SortOrder
    title?: SortOrder
    description?: SortOrder
    workContentImg?: SortOrder
    status?: SortOrder
    isPremium?: SortOrder
    premiumStartAt?: SortOrder
    premiumEndAt?: SortOrder
    closingDate?: SortOrder
    isRecruitmentEnd?: SortOrder
    displayAddress?: SortOrder
    actualAddress?: SortOrder
    workIntensity?: SortOrder
    benefits?: SortOrder
    allowedVisas?: SortOrder
    minKoreanLevel?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    intervieAPPLICANTwMethod?: SortOrder
    interviewPlace?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostingAvgOrderByAggregateInput = {
    jobId?: SortOrder
    corporateId?: SortOrder
    minKoreanLevel?: SortOrder
  }

  export type JobPostingMaxOrderByAggregateInput = {
    jobId?: SortOrder
    corporateId?: SortOrder
    boardType?: SortOrder
    title?: SortOrder
    description?: SortOrder
    workContentImg?: SortOrder
    status?: SortOrder
    isPremium?: SortOrder
    premiumStartAt?: SortOrder
    premiumEndAt?: SortOrder
    closingDate?: SortOrder
    isRecruitmentEnd?: SortOrder
    displayAddress?: SortOrder
    actualAddress?: SortOrder
    workIntensity?: SortOrder
    allowedVisas?: SortOrder
    minKoreanLevel?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    intervieAPPLICANTwMethod?: SortOrder
    interviewPlace?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostingMinOrderByAggregateInput = {
    jobId?: SortOrder
    corporateId?: SortOrder
    boardType?: SortOrder
    title?: SortOrder
    description?: SortOrder
    workContentImg?: SortOrder
    status?: SortOrder
    isPremium?: SortOrder
    premiumStartAt?: SortOrder
    premiumEndAt?: SortOrder
    closingDate?: SortOrder
    isRecruitmentEnd?: SortOrder
    displayAddress?: SortOrder
    actualAddress?: SortOrder
    workIntensity?: SortOrder
    allowedVisas?: SortOrder
    minKoreanLevel?: SortOrder
    contactName?: SortOrder
    contactPhone?: SortOrder
    intervieAPPLICANTwMethod?: SortOrder
    interviewPlace?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobPostingSumOrderByAggregateInput = {
    jobId?: SortOrder
    corporateId?: SortOrder
    minKoreanLevel?: SortOrder
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

  export type EnumBoardTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BoardType | EnumBoardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BoardType[] | ListEnumBoardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BoardType[] | ListEnumBoardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBoardTypeWithAggregatesFilter<$PrismaModel> | $Enums.BoardType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBoardTypeFilter<$PrismaModel>
    _max?: NestedEnumBoardTypeFilter<$PrismaModel>
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

  export type EnumPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostStatusFilter<$PrismaModel>
    _max?: NestedEnumPostStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumIntensityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Intensity | EnumIntensityFieldRefInput<$PrismaModel>
    in?: $Enums.Intensity[] | ListEnumIntensityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Intensity[] | ListEnumIntensityFieldRefInput<$PrismaModel>
    not?: NestedEnumIntensityWithAggregatesFilter<$PrismaModel> | $Enums.Intensity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIntensityFilter<$PrismaModel>
    _max?: NestedEnumIntensityFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumInterviewTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InterviewType | EnumInterviewTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InterviewType[] | ListEnumInterviewTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterviewType[] | ListEnumInterviewTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInterviewTypeWithAggregatesFilter<$PrismaModel> | $Enums.InterviewType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInterviewTypeFilter<$PrismaModel>
    _max?: NestedEnumInterviewTypeFilter<$PrismaModel>
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

  export type JobPostingScalarRelationFilter = {
    is?: JobPostingWhereInput
    isNot?: JobPostingWhereInput
  }

  export type JobAttributesAlbaCountOrderByAggregateInput = {
    jobId?: SortOrder
    hourlyWage?: SortOrder
    workPeriod?: SortOrder
    workDaysMask?: SortOrder
    workTimeStart?: SortOrder
    workTimeEnd?: SortOrder
  }

  export type JobAttributesAlbaAvgOrderByAggregateInput = {
    jobId?: SortOrder
    hourlyWage?: SortOrder
  }

  export type JobAttributesAlbaMaxOrderByAggregateInput = {
    jobId?: SortOrder
    hourlyWage?: SortOrder
    workPeriod?: SortOrder
    workDaysMask?: SortOrder
    workTimeStart?: SortOrder
    workTimeEnd?: SortOrder
  }

  export type JobAttributesAlbaMinOrderByAggregateInput = {
    jobId?: SortOrder
    hourlyWage?: SortOrder
    workPeriod?: SortOrder
    workDaysMask?: SortOrder
    workTimeStart?: SortOrder
    workTimeEnd?: SortOrder
  }

  export type JobAttributesAlbaSumOrderByAggregateInput = {
    jobId?: SortOrder
    hourlyWage?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type JobAttributesFulltimeCountOrderByAggregateInput = {
    jobId?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    experienceLevel?: SortOrder
    educationLevel?: SortOrder
  }

  export type JobAttributesFulltimeAvgOrderByAggregateInput = {
    jobId?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
  }

  export type JobAttributesFulltimeMaxOrderByAggregateInput = {
    jobId?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    experienceLevel?: SortOrder
    educationLevel?: SortOrder
  }

  export type JobAttributesFulltimeMinOrderByAggregateInput = {
    jobId?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    experienceLevel?: SortOrder
    educationLevel?: SortOrder
  }

  export type JobAttributesFulltimeSumOrderByAggregateInput = {
    jobId?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type InterviewSlotCountOrderByAggregateInput = {
    slotId?: SortOrder
    jobId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isBooked?: SortOrder
  }

  export type InterviewSlotAvgOrderByAggregateInput = {
    slotId?: SortOrder
    jobId?: SortOrder
  }

  export type InterviewSlotMaxOrderByAggregateInput = {
    slotId?: SortOrder
    jobId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isBooked?: SortOrder
  }

  export type InterviewSlotMinOrderByAggregateInput = {
    slotId?: SortOrder
    jobId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isBooked?: SortOrder
  }

  export type InterviewSlotSumOrderByAggregateInput = {
    slotId?: SortOrder
    jobId?: SortOrder
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EnumActorTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ActorType | EnumActorTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumActorTypeNullableFilter<$PrismaModel> | $Enums.ActorType | null
  }

  export type JobApplicationCountOrderByAggregateInput = {
    appId?: SortOrder
    jobId?: SortOrder
    applicantId?: SortOrder
    status?: SortOrder
    selectedSlotId?: SortOrder
    proposedBy?: SortOrder
    proposedTime?: SortOrder
    rejectionReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobApplicationAvgOrderByAggregateInput = {
    appId?: SortOrder
    jobId?: SortOrder
    applicantId?: SortOrder
    selectedSlotId?: SortOrder
  }

  export type JobApplicationMaxOrderByAggregateInput = {
    appId?: SortOrder
    jobId?: SortOrder
    applicantId?: SortOrder
    status?: SortOrder
    selectedSlotId?: SortOrder
    proposedBy?: SortOrder
    proposedTime?: SortOrder
    rejectionReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobApplicationMinOrderByAggregateInput = {
    appId?: SortOrder
    jobId?: SortOrder
    applicantId?: SortOrder
    status?: SortOrder
    selectedSlotId?: SortOrder
    proposedBy?: SortOrder
    proposedTime?: SortOrder
    rejectionReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobApplicationSumOrderByAggregateInput = {
    appId?: SortOrder
    jobId?: SortOrder
    applicantId?: SortOrder
    selectedSlotId?: SortOrder
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumActorTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActorType | EnumActorTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumActorTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ActorType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumActorTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumActorTypeNullableFilter<$PrismaModel>
  }

  export type EnumApplyTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplyType | EnumApplyTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ApplyType[] | ListEnumApplyTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ApplyType[] | ListEnumApplyTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumApplyTypeNullableFilter<$PrismaModel> | $Enums.ApplyType | null
  }

  export type ApplyJobCountOrderByAggregateInput = {
    applyId?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    interviewDate?: SortOrder
    title?: SortOrder
    description?: SortOrder
    resumeFile?: SortOrder
    applyType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplyJobAvgOrderByAggregateInput = {
    applyId?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
  }

  export type ApplyJobMaxOrderByAggregateInput = {
    applyId?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    interviewDate?: SortOrder
    title?: SortOrder
    description?: SortOrder
    resumeFile?: SortOrder
    applyType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplyJobMinOrderByAggregateInput = {
    applyId?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
    interviewDate?: SortOrder
    title?: SortOrder
    description?: SortOrder
    resumeFile?: SortOrder
    applyType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplyJobSumOrderByAggregateInput = {
    applyId?: SortOrder
    userId?: SortOrder
    jobId?: SortOrder
  }

  export type EnumApplyTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplyType | EnumApplyTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ApplyType[] | ListEnumApplyTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ApplyType[] | ListEnumApplyTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumApplyTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ApplyType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumApplyTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumApplyTypeNullableFilter<$PrismaModel>
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

  export type JobAttributesAlbaCreateNestedOneWithoutJobInput = {
    create?: XOR<JobAttributesAlbaCreateWithoutJobInput, JobAttributesAlbaUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobAttributesAlbaCreateOrConnectWithoutJobInput
    connect?: JobAttributesAlbaWhereUniqueInput
  }

  export type JobAttributesFulltimeCreateNestedOneWithoutJobInput = {
    create?: XOR<JobAttributesFulltimeCreateWithoutJobInput, JobAttributesFulltimeUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobAttributesFulltimeCreateOrConnectWithoutJobInput
    connect?: JobAttributesFulltimeWhereUniqueInput
  }

  export type InterviewSlotCreateNestedManyWithoutJobInput = {
    create?: XOR<InterviewSlotCreateWithoutJobInput, InterviewSlotUncheckedCreateWithoutJobInput> | InterviewSlotCreateWithoutJobInput[] | InterviewSlotUncheckedCreateWithoutJobInput[]
    connectOrCreate?: InterviewSlotCreateOrConnectWithoutJobInput | InterviewSlotCreateOrConnectWithoutJobInput[]
    createMany?: InterviewSlotCreateManyJobInputEnvelope
    connect?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
  }

  export type JobApplicationCreateNestedManyWithoutJobInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobAttributesAlbaUncheckedCreateNestedOneWithoutJobInput = {
    create?: XOR<JobAttributesAlbaCreateWithoutJobInput, JobAttributesAlbaUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobAttributesAlbaCreateOrConnectWithoutJobInput
    connect?: JobAttributesAlbaWhereUniqueInput
  }

  export type JobAttributesFulltimeUncheckedCreateNestedOneWithoutJobInput = {
    create?: XOR<JobAttributesFulltimeCreateWithoutJobInput, JobAttributesFulltimeUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobAttributesFulltimeCreateOrConnectWithoutJobInput
    connect?: JobAttributesFulltimeWhereUniqueInput
  }

  export type InterviewSlotUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<InterviewSlotCreateWithoutJobInput, InterviewSlotUncheckedCreateWithoutJobInput> | InterviewSlotCreateWithoutJobInput[] | InterviewSlotUncheckedCreateWithoutJobInput[]
    connectOrCreate?: InterviewSlotCreateOrConnectWithoutJobInput | InterviewSlotCreateOrConnectWithoutJobInput[]
    createMany?: InterviewSlotCreateManyJobInputEnvelope
    connect?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumBoardTypeFieldUpdateOperationsInput = {
    set?: $Enums.BoardType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPostStatusFieldUpdateOperationsInput = {
    set?: $Enums.PostStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumIntensityFieldUpdateOperationsInput = {
    set?: $Enums.Intensity
  }

  export type EnumInterviewTypeFieldUpdateOperationsInput = {
    set?: $Enums.InterviewType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type JobAttributesAlbaUpdateOneWithoutJobNestedInput = {
    create?: XOR<JobAttributesAlbaCreateWithoutJobInput, JobAttributesAlbaUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobAttributesAlbaCreateOrConnectWithoutJobInput
    upsert?: JobAttributesAlbaUpsertWithoutJobInput
    disconnect?: JobAttributesAlbaWhereInput | boolean
    delete?: JobAttributesAlbaWhereInput | boolean
    connect?: JobAttributesAlbaWhereUniqueInput
    update?: XOR<XOR<JobAttributesAlbaUpdateToOneWithWhereWithoutJobInput, JobAttributesAlbaUpdateWithoutJobInput>, JobAttributesAlbaUncheckedUpdateWithoutJobInput>
  }

  export type JobAttributesFulltimeUpdateOneWithoutJobNestedInput = {
    create?: XOR<JobAttributesFulltimeCreateWithoutJobInput, JobAttributesFulltimeUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobAttributesFulltimeCreateOrConnectWithoutJobInput
    upsert?: JobAttributesFulltimeUpsertWithoutJobInput
    disconnect?: JobAttributesFulltimeWhereInput | boolean
    delete?: JobAttributesFulltimeWhereInput | boolean
    connect?: JobAttributesFulltimeWhereUniqueInput
    update?: XOR<XOR<JobAttributesFulltimeUpdateToOneWithWhereWithoutJobInput, JobAttributesFulltimeUpdateWithoutJobInput>, JobAttributesFulltimeUncheckedUpdateWithoutJobInput>
  }

  export type InterviewSlotUpdateManyWithoutJobNestedInput = {
    create?: XOR<InterviewSlotCreateWithoutJobInput, InterviewSlotUncheckedCreateWithoutJobInput> | InterviewSlotCreateWithoutJobInput[] | InterviewSlotUncheckedCreateWithoutJobInput[]
    connectOrCreate?: InterviewSlotCreateOrConnectWithoutJobInput | InterviewSlotCreateOrConnectWithoutJobInput[]
    upsert?: InterviewSlotUpsertWithWhereUniqueWithoutJobInput | InterviewSlotUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: InterviewSlotCreateManyJobInputEnvelope
    set?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
    disconnect?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
    delete?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
    connect?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
    update?: InterviewSlotUpdateWithWhereUniqueWithoutJobInput | InterviewSlotUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: InterviewSlotUpdateManyWithWhereWithoutJobInput | InterviewSlotUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: InterviewSlotScalarWhereInput | InterviewSlotScalarWhereInput[]
  }

  export type JobApplicationUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJobInput | JobApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJobInput | JobApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJobInput | JobApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobAttributesAlbaUncheckedUpdateOneWithoutJobNestedInput = {
    create?: XOR<JobAttributesAlbaCreateWithoutJobInput, JobAttributesAlbaUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobAttributesAlbaCreateOrConnectWithoutJobInput
    upsert?: JobAttributesAlbaUpsertWithoutJobInput
    disconnect?: JobAttributesAlbaWhereInput | boolean
    delete?: JobAttributesAlbaWhereInput | boolean
    connect?: JobAttributesAlbaWhereUniqueInput
    update?: XOR<XOR<JobAttributesAlbaUpdateToOneWithWhereWithoutJobInput, JobAttributesAlbaUpdateWithoutJobInput>, JobAttributesAlbaUncheckedUpdateWithoutJobInput>
  }

  export type JobAttributesFulltimeUncheckedUpdateOneWithoutJobNestedInput = {
    create?: XOR<JobAttributesFulltimeCreateWithoutJobInput, JobAttributesFulltimeUncheckedCreateWithoutJobInput>
    connectOrCreate?: JobAttributesFulltimeCreateOrConnectWithoutJobInput
    upsert?: JobAttributesFulltimeUpsertWithoutJobInput
    disconnect?: JobAttributesFulltimeWhereInput | boolean
    delete?: JobAttributesFulltimeWhereInput | boolean
    connect?: JobAttributesFulltimeWhereUniqueInput
    update?: XOR<XOR<JobAttributesFulltimeUpdateToOneWithWhereWithoutJobInput, JobAttributesFulltimeUpdateWithoutJobInput>, JobAttributesFulltimeUncheckedUpdateWithoutJobInput>
  }

  export type InterviewSlotUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<InterviewSlotCreateWithoutJobInput, InterviewSlotUncheckedCreateWithoutJobInput> | InterviewSlotCreateWithoutJobInput[] | InterviewSlotUncheckedCreateWithoutJobInput[]
    connectOrCreate?: InterviewSlotCreateOrConnectWithoutJobInput | InterviewSlotCreateOrConnectWithoutJobInput[]
    upsert?: InterviewSlotUpsertWithWhereUniqueWithoutJobInput | InterviewSlotUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: InterviewSlotCreateManyJobInputEnvelope
    set?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
    disconnect?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
    delete?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
    connect?: InterviewSlotWhereUniqueInput | InterviewSlotWhereUniqueInput[]
    update?: InterviewSlotUpdateWithWhereUniqueWithoutJobInput | InterviewSlotUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: InterviewSlotUpdateManyWithWhereWithoutJobInput | InterviewSlotUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: InterviewSlotScalarWhereInput | InterviewSlotScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJobInput | JobApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJobInput | JobApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJobInput | JobApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobPostingCreateNestedOneWithoutAlbaAttributesInput = {
    create?: XOR<JobPostingCreateWithoutAlbaAttributesInput, JobPostingUncheckedCreateWithoutAlbaAttributesInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutAlbaAttributesInput
    connect?: JobPostingWhereUniqueInput
  }

  export type JobPostingUpdateOneRequiredWithoutAlbaAttributesNestedInput = {
    create?: XOR<JobPostingCreateWithoutAlbaAttributesInput, JobPostingUncheckedCreateWithoutAlbaAttributesInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutAlbaAttributesInput
    upsert?: JobPostingUpsertWithoutAlbaAttributesInput
    connect?: JobPostingWhereUniqueInput
    update?: XOR<XOR<JobPostingUpdateToOneWithWhereWithoutAlbaAttributesInput, JobPostingUpdateWithoutAlbaAttributesInput>, JobPostingUncheckedUpdateWithoutAlbaAttributesInput>
  }

  export type JobPostingCreateNestedOneWithoutFulltimeAttributesInput = {
    create?: XOR<JobPostingCreateWithoutFulltimeAttributesInput, JobPostingUncheckedCreateWithoutFulltimeAttributesInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutFulltimeAttributesInput
    connect?: JobPostingWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobPostingUpdateOneRequiredWithoutFulltimeAttributesNestedInput = {
    create?: XOR<JobPostingCreateWithoutFulltimeAttributesInput, JobPostingUncheckedCreateWithoutFulltimeAttributesInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutFulltimeAttributesInput
    upsert?: JobPostingUpsertWithoutFulltimeAttributesInput
    connect?: JobPostingWhereUniqueInput
    update?: XOR<XOR<JobPostingUpdateToOneWithWhereWithoutFulltimeAttributesInput, JobPostingUpdateWithoutFulltimeAttributesInput>, JobPostingUncheckedUpdateWithoutFulltimeAttributesInput>
  }

  export type JobPostingCreateNestedOneWithoutInterviewSlotsInput = {
    create?: XOR<JobPostingCreateWithoutInterviewSlotsInput, JobPostingUncheckedCreateWithoutInterviewSlotsInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutInterviewSlotsInput
    connect?: JobPostingWhereUniqueInput
  }

  export type JobPostingUpdateOneRequiredWithoutInterviewSlotsNestedInput = {
    create?: XOR<JobPostingCreateWithoutInterviewSlotsInput, JobPostingUncheckedCreateWithoutInterviewSlotsInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutInterviewSlotsInput
    upsert?: JobPostingUpsertWithoutInterviewSlotsInput
    connect?: JobPostingWhereUniqueInput
    update?: XOR<XOR<JobPostingUpdateToOneWithWhereWithoutInterviewSlotsInput, JobPostingUpdateWithoutInterviewSlotsInput>, JobPostingUncheckedUpdateWithoutInterviewSlotsInput>
  }

  export type JobPostingCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobPostingCreateWithoutApplicationsInput, JobPostingUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutApplicationsInput
    connect?: JobPostingWhereUniqueInput
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableEnumActorTypeFieldUpdateOperationsInput = {
    set?: $Enums.ActorType | null
  }

  export type JobPostingUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobPostingCreateWithoutApplicationsInput, JobPostingUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobPostingCreateOrConnectWithoutApplicationsInput
    upsert?: JobPostingUpsertWithoutApplicationsInput
    connect?: JobPostingWhereUniqueInput
    update?: XOR<XOR<JobPostingUpdateToOneWithWhereWithoutApplicationsInput, JobPostingUpdateWithoutApplicationsInput>, JobPostingUncheckedUpdateWithoutApplicationsInput>
  }

  export type NullableEnumApplyTypeFieldUpdateOperationsInput = {
    set?: $Enums.ApplyType | null
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

  export type NestedEnumBoardTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BoardType | EnumBoardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BoardType[] | ListEnumBoardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BoardType[] | ListEnumBoardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBoardTypeFilter<$PrismaModel> | $Enums.BoardType
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

  export type NestedEnumPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusFilter<$PrismaModel> | $Enums.PostStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumIntensityFilter<$PrismaModel = never> = {
    equals?: $Enums.Intensity | EnumIntensityFieldRefInput<$PrismaModel>
    in?: $Enums.Intensity[] | ListEnumIntensityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Intensity[] | ListEnumIntensityFieldRefInput<$PrismaModel>
    not?: NestedEnumIntensityFilter<$PrismaModel> | $Enums.Intensity
  }

  export type NestedEnumInterviewTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InterviewType | EnumInterviewTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InterviewType[] | ListEnumInterviewTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterviewType[] | ListEnumInterviewTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInterviewTypeFilter<$PrismaModel> | $Enums.InterviewType
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

  export type NestedEnumBoardTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BoardType | EnumBoardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BoardType[] | ListEnumBoardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BoardType[] | ListEnumBoardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBoardTypeWithAggregatesFilter<$PrismaModel> | $Enums.BoardType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBoardTypeFilter<$PrismaModel>
    _max?: NestedEnumBoardTypeFilter<$PrismaModel>
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

  export type NestedEnumPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostStatusFilter<$PrismaModel>
    _max?: NestedEnumPostStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumIntensityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Intensity | EnumIntensityFieldRefInput<$PrismaModel>
    in?: $Enums.Intensity[] | ListEnumIntensityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Intensity[] | ListEnumIntensityFieldRefInput<$PrismaModel>
    not?: NestedEnumIntensityWithAggregatesFilter<$PrismaModel> | $Enums.Intensity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIntensityFilter<$PrismaModel>
    _max?: NestedEnumIntensityFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumInterviewTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InterviewType | EnumInterviewTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InterviewType[] | ListEnumInterviewTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InterviewType[] | ListEnumInterviewTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInterviewTypeWithAggregatesFilter<$PrismaModel> | $Enums.InterviewType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInterviewTypeFilter<$PrismaModel>
    _max?: NestedEnumInterviewTypeFilter<$PrismaModel>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedEnumActorTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ActorType | EnumActorTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumActorTypeNullableFilter<$PrismaModel> | $Enums.ActorType | null
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumActorTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActorType | EnumActorTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumActorTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ActorType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumActorTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumActorTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumApplyTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplyType | EnumApplyTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ApplyType[] | ListEnumApplyTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ApplyType[] | ListEnumApplyTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumApplyTypeNullableFilter<$PrismaModel> | $Enums.ApplyType | null
  }

  export type NestedEnumApplyTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplyType | EnumApplyTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ApplyType[] | ListEnumApplyTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ApplyType[] | ListEnumApplyTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumApplyTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ApplyType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumApplyTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumApplyTypeNullableFilter<$PrismaModel>
  }

  export type JobAttributesAlbaCreateWithoutJobInput = {
    hourlyWage: number
    workPeriod?: string | null
    workDaysMask: string
    workTimeStart?: Date | string | null
    workTimeEnd?: Date | string | null
  }

  export type JobAttributesAlbaUncheckedCreateWithoutJobInput = {
    hourlyWage: number
    workPeriod?: string | null
    workDaysMask: string
    workTimeStart?: Date | string | null
    workTimeEnd?: Date | string | null
  }

  export type JobAttributesAlbaCreateOrConnectWithoutJobInput = {
    where: JobAttributesAlbaWhereUniqueInput
    create: XOR<JobAttributesAlbaCreateWithoutJobInput, JobAttributesAlbaUncheckedCreateWithoutJobInput>
  }

  export type JobAttributesFulltimeCreateWithoutJobInput = {
    salaryMin?: number | null
    salaryMax?: number | null
    experienceLevel: string
    educationLevel: string
  }

  export type JobAttributesFulltimeUncheckedCreateWithoutJobInput = {
    salaryMin?: number | null
    salaryMax?: number | null
    experienceLevel: string
    educationLevel: string
  }

  export type JobAttributesFulltimeCreateOrConnectWithoutJobInput = {
    where: JobAttributesFulltimeWhereUniqueInput
    create: XOR<JobAttributesFulltimeCreateWithoutJobInput, JobAttributesFulltimeUncheckedCreateWithoutJobInput>
  }

  export type InterviewSlotCreateWithoutJobInput = {
    slotId?: bigint | number
    startTime: Date | string
    endTime: Date | string
    isBooked?: boolean
  }

  export type InterviewSlotUncheckedCreateWithoutJobInput = {
    slotId?: bigint | number
    startTime: Date | string
    endTime: Date | string
    isBooked?: boolean
  }

  export type InterviewSlotCreateOrConnectWithoutJobInput = {
    where: InterviewSlotWhereUniqueInput
    create: XOR<InterviewSlotCreateWithoutJobInput, InterviewSlotUncheckedCreateWithoutJobInput>
  }

  export type InterviewSlotCreateManyJobInputEnvelope = {
    data: InterviewSlotCreateManyJobInput | InterviewSlotCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type JobApplicationCreateWithoutJobInput = {
    appId?: bigint | number
    applicantId: bigint | number
    status?: $Enums.ApplicationStatus
    selectedSlotId?: bigint | number | null
    proposedBy?: $Enums.ActorType | null
    proposedTime?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobApplicationUncheckedCreateWithoutJobInput = {
    appId?: bigint | number
    applicantId: bigint | number
    status?: $Enums.ApplicationStatus
    selectedSlotId?: bigint | number | null
    proposedBy?: $Enums.ActorType | null
    proposedTime?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobApplicationCreateOrConnectWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput>
  }

  export type JobApplicationCreateManyJobInputEnvelope = {
    data: JobApplicationCreateManyJobInput | JobApplicationCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type JobAttributesAlbaUpsertWithoutJobInput = {
    update: XOR<JobAttributesAlbaUpdateWithoutJobInput, JobAttributesAlbaUncheckedUpdateWithoutJobInput>
    create: XOR<JobAttributesAlbaCreateWithoutJobInput, JobAttributesAlbaUncheckedCreateWithoutJobInput>
    where?: JobAttributesAlbaWhereInput
  }

  export type JobAttributesAlbaUpdateToOneWithWhereWithoutJobInput = {
    where?: JobAttributesAlbaWhereInput
    data: XOR<JobAttributesAlbaUpdateWithoutJobInput, JobAttributesAlbaUncheckedUpdateWithoutJobInput>
  }

  export type JobAttributesAlbaUpdateWithoutJobInput = {
    hourlyWage?: IntFieldUpdateOperationsInput | number
    workPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    workDaysMask?: StringFieldUpdateOperationsInput | string
    workTimeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workTimeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobAttributesAlbaUncheckedUpdateWithoutJobInput = {
    hourlyWage?: IntFieldUpdateOperationsInput | number
    workPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    workDaysMask?: StringFieldUpdateOperationsInput | string
    workTimeStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workTimeEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobAttributesFulltimeUpsertWithoutJobInput = {
    update: XOR<JobAttributesFulltimeUpdateWithoutJobInput, JobAttributesFulltimeUncheckedUpdateWithoutJobInput>
    create: XOR<JobAttributesFulltimeCreateWithoutJobInput, JobAttributesFulltimeUncheckedCreateWithoutJobInput>
    where?: JobAttributesFulltimeWhereInput
  }

  export type JobAttributesFulltimeUpdateToOneWithWhereWithoutJobInput = {
    where?: JobAttributesFulltimeWhereInput
    data: XOR<JobAttributesFulltimeUpdateWithoutJobInput, JobAttributesFulltimeUncheckedUpdateWithoutJobInput>
  }

  export type JobAttributesFulltimeUpdateWithoutJobInput = {
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    experienceLevel?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
  }

  export type JobAttributesFulltimeUncheckedUpdateWithoutJobInput = {
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    experienceLevel?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
  }

  export type InterviewSlotUpsertWithWhereUniqueWithoutJobInput = {
    where: InterviewSlotWhereUniqueInput
    update: XOR<InterviewSlotUpdateWithoutJobInput, InterviewSlotUncheckedUpdateWithoutJobInput>
    create: XOR<InterviewSlotCreateWithoutJobInput, InterviewSlotUncheckedCreateWithoutJobInput>
  }

  export type InterviewSlotUpdateWithWhereUniqueWithoutJobInput = {
    where: InterviewSlotWhereUniqueInput
    data: XOR<InterviewSlotUpdateWithoutJobInput, InterviewSlotUncheckedUpdateWithoutJobInput>
  }

  export type InterviewSlotUpdateManyWithWhereWithoutJobInput = {
    where: InterviewSlotScalarWhereInput
    data: XOR<InterviewSlotUpdateManyMutationInput, InterviewSlotUncheckedUpdateManyWithoutJobInput>
  }

  export type InterviewSlotScalarWhereInput = {
    AND?: InterviewSlotScalarWhereInput | InterviewSlotScalarWhereInput[]
    OR?: InterviewSlotScalarWhereInput[]
    NOT?: InterviewSlotScalarWhereInput | InterviewSlotScalarWhereInput[]
    slotId?: BigIntFilter<"InterviewSlot"> | bigint | number
    jobId?: BigIntFilter<"InterviewSlot"> | bigint | number
    startTime?: DateTimeFilter<"InterviewSlot"> | Date | string
    endTime?: DateTimeFilter<"InterviewSlot"> | Date | string
    isBooked?: BoolFilter<"InterviewSlot"> | boolean
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutJobInput, JobApplicationUncheckedUpdateWithoutJobInput>
    create: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutJobInput, JobApplicationUncheckedUpdateWithoutJobInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutJobInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutJobInput>
  }

  export type JobApplicationScalarWhereInput = {
    AND?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
    OR?: JobApplicationScalarWhereInput[]
    NOT?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
    appId?: BigIntFilter<"JobApplication"> | bigint | number
    jobId?: BigIntFilter<"JobApplication"> | bigint | number
    applicantId?: BigIntFilter<"JobApplication"> | bigint | number
    status?: EnumApplicationStatusFilter<"JobApplication"> | $Enums.ApplicationStatus
    selectedSlotId?: BigIntNullableFilter<"JobApplication"> | bigint | number | null
    proposedBy?: EnumActorTypeNullableFilter<"JobApplication"> | $Enums.ActorType | null
    proposedTime?: DateTimeNullableFilter<"JobApplication"> | Date | string | null
    rejectionReason?: StringNullableFilter<"JobApplication"> | string | null
    createdAt?: DateTimeFilter<"JobApplication"> | Date | string
    updatedAt?: DateTimeFilter<"JobApplication"> | Date | string
  }

  export type JobPostingCreateWithoutAlbaAttributesInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fulltimeAttributes?: JobAttributesFulltimeCreateNestedOneWithoutJobInput
    interviewSlots?: InterviewSlotCreateNestedManyWithoutJobInput
    applications?: JobApplicationCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateWithoutAlbaAttributesInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fulltimeAttributes?: JobAttributesFulltimeUncheckedCreateNestedOneWithoutJobInput
    interviewSlots?: InterviewSlotUncheckedCreateNestedManyWithoutJobInput
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingCreateOrConnectWithoutAlbaAttributesInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutAlbaAttributesInput, JobPostingUncheckedCreateWithoutAlbaAttributesInput>
  }

  export type JobPostingUpsertWithoutAlbaAttributesInput = {
    update: XOR<JobPostingUpdateWithoutAlbaAttributesInput, JobPostingUncheckedUpdateWithoutAlbaAttributesInput>
    create: XOR<JobPostingCreateWithoutAlbaAttributesInput, JobPostingUncheckedCreateWithoutAlbaAttributesInput>
    where?: JobPostingWhereInput
  }

  export type JobPostingUpdateToOneWithWhereWithoutAlbaAttributesInput = {
    where?: JobPostingWhereInput
    data: XOR<JobPostingUpdateWithoutAlbaAttributesInput, JobPostingUncheckedUpdateWithoutAlbaAttributesInput>
  }

  export type JobPostingUpdateWithoutAlbaAttributesInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulltimeAttributes?: JobAttributesFulltimeUpdateOneWithoutJobNestedInput
    interviewSlots?: InterviewSlotUpdateManyWithoutJobNestedInput
    applications?: JobApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutAlbaAttributesInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulltimeAttributes?: JobAttributesFulltimeUncheckedUpdateOneWithoutJobNestedInput
    interviewSlots?: InterviewSlotUncheckedUpdateManyWithoutJobNestedInput
    applications?: JobApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobPostingCreateWithoutFulltimeAttributesInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    albaAttributes?: JobAttributesAlbaCreateNestedOneWithoutJobInput
    interviewSlots?: InterviewSlotCreateNestedManyWithoutJobInput
    applications?: JobApplicationCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateWithoutFulltimeAttributesInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    albaAttributes?: JobAttributesAlbaUncheckedCreateNestedOneWithoutJobInput
    interviewSlots?: InterviewSlotUncheckedCreateNestedManyWithoutJobInput
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingCreateOrConnectWithoutFulltimeAttributesInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutFulltimeAttributesInput, JobPostingUncheckedCreateWithoutFulltimeAttributesInput>
  }

  export type JobPostingUpsertWithoutFulltimeAttributesInput = {
    update: XOR<JobPostingUpdateWithoutFulltimeAttributesInput, JobPostingUncheckedUpdateWithoutFulltimeAttributesInput>
    create: XOR<JobPostingCreateWithoutFulltimeAttributesInput, JobPostingUncheckedCreateWithoutFulltimeAttributesInput>
    where?: JobPostingWhereInput
  }

  export type JobPostingUpdateToOneWithWhereWithoutFulltimeAttributesInput = {
    where?: JobPostingWhereInput
    data: XOR<JobPostingUpdateWithoutFulltimeAttributesInput, JobPostingUncheckedUpdateWithoutFulltimeAttributesInput>
  }

  export type JobPostingUpdateWithoutFulltimeAttributesInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albaAttributes?: JobAttributesAlbaUpdateOneWithoutJobNestedInput
    interviewSlots?: InterviewSlotUpdateManyWithoutJobNestedInput
    applications?: JobApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutFulltimeAttributesInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albaAttributes?: JobAttributesAlbaUncheckedUpdateOneWithoutJobNestedInput
    interviewSlots?: InterviewSlotUncheckedUpdateManyWithoutJobNestedInput
    applications?: JobApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobPostingCreateWithoutInterviewSlotsInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    albaAttributes?: JobAttributesAlbaCreateNestedOneWithoutJobInput
    fulltimeAttributes?: JobAttributesFulltimeCreateNestedOneWithoutJobInput
    applications?: JobApplicationCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateWithoutInterviewSlotsInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    albaAttributes?: JobAttributesAlbaUncheckedCreateNestedOneWithoutJobInput
    fulltimeAttributes?: JobAttributesFulltimeUncheckedCreateNestedOneWithoutJobInput
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingCreateOrConnectWithoutInterviewSlotsInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutInterviewSlotsInput, JobPostingUncheckedCreateWithoutInterviewSlotsInput>
  }

  export type JobPostingUpsertWithoutInterviewSlotsInput = {
    update: XOR<JobPostingUpdateWithoutInterviewSlotsInput, JobPostingUncheckedUpdateWithoutInterviewSlotsInput>
    create: XOR<JobPostingCreateWithoutInterviewSlotsInput, JobPostingUncheckedCreateWithoutInterviewSlotsInput>
    where?: JobPostingWhereInput
  }

  export type JobPostingUpdateToOneWithWhereWithoutInterviewSlotsInput = {
    where?: JobPostingWhereInput
    data: XOR<JobPostingUpdateWithoutInterviewSlotsInput, JobPostingUncheckedUpdateWithoutInterviewSlotsInput>
  }

  export type JobPostingUpdateWithoutInterviewSlotsInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albaAttributes?: JobAttributesAlbaUpdateOneWithoutJobNestedInput
    fulltimeAttributes?: JobAttributesFulltimeUpdateOneWithoutJobNestedInput
    applications?: JobApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutInterviewSlotsInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albaAttributes?: JobAttributesAlbaUncheckedUpdateOneWithoutJobNestedInput
    fulltimeAttributes?: JobAttributesFulltimeUncheckedUpdateOneWithoutJobNestedInput
    applications?: JobApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobPostingCreateWithoutApplicationsInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    albaAttributes?: JobAttributesAlbaCreateNestedOneWithoutJobInput
    fulltimeAttributes?: JobAttributesFulltimeCreateNestedOneWithoutJobInput
    interviewSlots?: InterviewSlotCreateNestedManyWithoutJobInput
  }

  export type JobPostingUncheckedCreateWithoutApplicationsInput = {
    jobId?: bigint | number
    corporateId: bigint | number
    boardType: $Enums.BoardType
    title: string
    description: string
    workContentImg?: string | null
    status?: $Enums.PostStatus
    isPremium?: boolean
    premiumStartAt?: Date | string | null
    premiumEndAt?: Date | string | null
    closingDate?: Date | string | null
    isRecruitmentEnd?: boolean
    displayAddress: string
    actualAddress: string
    workIntensity?: $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas: string
    minKoreanLevel?: number
    contactName: string
    contactPhone: string
    intervieAPPLICANTwMethod?: $Enums.InterviewType
    interviewPlace?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    albaAttributes?: JobAttributesAlbaUncheckedCreateNestedOneWithoutJobInput
    fulltimeAttributes?: JobAttributesFulltimeUncheckedCreateNestedOneWithoutJobInput
    interviewSlots?: InterviewSlotUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobPostingCreateOrConnectWithoutApplicationsInput = {
    where: JobPostingWhereUniqueInput
    create: XOR<JobPostingCreateWithoutApplicationsInput, JobPostingUncheckedCreateWithoutApplicationsInput>
  }

  export type JobPostingUpsertWithoutApplicationsInput = {
    update: XOR<JobPostingUpdateWithoutApplicationsInput, JobPostingUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobPostingCreateWithoutApplicationsInput, JobPostingUncheckedCreateWithoutApplicationsInput>
    where?: JobPostingWhereInput
  }

  export type JobPostingUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: JobPostingWhereInput
    data: XOR<JobPostingUpdateWithoutApplicationsInput, JobPostingUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobPostingUpdateWithoutApplicationsInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albaAttributes?: JobAttributesAlbaUpdateOneWithoutJobNestedInput
    fulltimeAttributes?: JobAttributesFulltimeUpdateOneWithoutJobNestedInput
    interviewSlots?: InterviewSlotUpdateManyWithoutJobNestedInput
  }

  export type JobPostingUncheckedUpdateWithoutApplicationsInput = {
    jobId?: BigIntFieldUpdateOperationsInput | bigint | number
    corporateId?: BigIntFieldUpdateOperationsInput | bigint | number
    boardType?: EnumBoardTypeFieldUpdateOperationsInput | $Enums.BoardType
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    workContentImg?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumStartAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumEndAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRecruitmentEnd?: BoolFieldUpdateOperationsInput | boolean
    displayAddress?: StringFieldUpdateOperationsInput | string
    actualAddress?: StringFieldUpdateOperationsInput | string
    workIntensity?: EnumIntensityFieldUpdateOperationsInput | $Enums.Intensity
    benefits?: NullableJsonNullValueInput | InputJsonValue
    allowedVisas?: StringFieldUpdateOperationsInput | string
    minKoreanLevel?: IntFieldUpdateOperationsInput | number
    contactName?: StringFieldUpdateOperationsInput | string
    contactPhone?: StringFieldUpdateOperationsInput | string
    intervieAPPLICANTwMethod?: EnumInterviewTypeFieldUpdateOperationsInput | $Enums.InterviewType
    interviewPlace?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albaAttributes?: JobAttributesAlbaUncheckedUpdateOneWithoutJobNestedInput
    fulltimeAttributes?: JobAttributesFulltimeUncheckedUpdateOneWithoutJobNestedInput
    interviewSlots?: InterviewSlotUncheckedUpdateManyWithoutJobNestedInput
  }

  export type InterviewSlotCreateManyJobInput = {
    slotId?: bigint | number
    startTime: Date | string
    endTime: Date | string
    isBooked?: boolean
  }

  export type JobApplicationCreateManyJobInput = {
    appId?: bigint | number
    applicantId: bigint | number
    status?: $Enums.ApplicationStatus
    selectedSlotId?: bigint | number | null
    proposedBy?: $Enums.ActorType | null
    proposedTime?: Date | string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InterviewSlotUpdateWithoutJobInput = {
    slotId?: BigIntFieldUpdateOperationsInput | bigint | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isBooked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InterviewSlotUncheckedUpdateWithoutJobInput = {
    slotId?: BigIntFieldUpdateOperationsInput | bigint | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isBooked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InterviewSlotUncheckedUpdateManyWithoutJobInput = {
    slotId?: BigIntFieldUpdateOperationsInput | bigint | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    isBooked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JobApplicationUpdateWithoutJobInput = {
    appId?: BigIntFieldUpdateOperationsInput | bigint | number
    applicantId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    selectedSlotId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    proposedBy?: NullableEnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType | null
    proposedTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationUncheckedUpdateWithoutJobInput = {
    appId?: BigIntFieldUpdateOperationsInput | bigint | number
    applicantId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    selectedSlotId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    proposedBy?: NullableEnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType | null
    proposedTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobApplicationUncheckedUpdateManyWithoutJobInput = {
    appId?: BigIntFieldUpdateOperationsInput | bigint | number
    applicantId?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    selectedSlotId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    proposedBy?: NullableEnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType | null
    proposedTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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