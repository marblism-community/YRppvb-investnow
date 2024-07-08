/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        create: procedure.input($Schema.StartupInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).startup.create(input as any))),

        delete: procedure.input($Schema.StartupInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).startup.delete(input as any))),

        findFirst: procedure.input($Schema.StartupInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).startup.findFirst(input as any))),

        findMany: procedure.input($Schema.StartupInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).startup.findMany(input as any))),

        findUnique: procedure.input($Schema.StartupInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).startup.findUnique(input as any))),

        update: procedure.input($Schema.StartupInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).startup.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.StartupCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StartupCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StartupGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StartupGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StartupCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StartupCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StartupGetPayload<T>, Context>) => Promise<Prisma.StartupGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.StartupDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StartupDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StartupGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StartupGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StartupDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StartupDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StartupGetPayload<T>, Context>) => Promise<Prisma.StartupGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.StartupFindFirstArgs, TData = Prisma.StartupGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.StartupFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.StartupGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StartupFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StartupFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.StartupGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.StartupGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.StartupFindManyArgs, TData = Array<Prisma.StartupGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.StartupFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.StartupGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StartupFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StartupFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.StartupGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.StartupGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.StartupFindUniqueArgs, TData = Prisma.StartupGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.StartupFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.StartupGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.StartupFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.StartupFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.StartupGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.StartupGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.StartupUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.StartupUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.StartupGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.StartupGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.StartupUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.StartupUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.StartupGetPayload<T>, Context>) => Promise<Prisma.StartupGetPayload<T>>
            };

    };
}
