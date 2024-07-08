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

        create: procedure.input($Schema.AccountInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).account.create(input as any))),

        delete: procedure.input($Schema.AccountInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).account.delete(input as any))),

        findFirst: procedure.input($Schema.AccountInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).account.findFirst(input as any))),

        findMany: procedure.input($Schema.AccountInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).account.findMany(input as any))),

        findUnique: procedure.input($Schema.AccountInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).account.findUnique(input as any))),

        update: procedure.input($Schema.AccountInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).account.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.AccountCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AccountCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AccountGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AccountGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AccountCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AccountCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AccountGetPayload<T>, Context>) => Promise<Prisma.AccountGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AccountDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AccountDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AccountGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AccountGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AccountDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AccountDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AccountGetPayload<T>, Context>) => Promise<Prisma.AccountGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AccountFindFirstArgs, TData = Prisma.AccountGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AccountFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AccountGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AccountFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AccountFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AccountGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AccountGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AccountFindManyArgs, TData = Array<Prisma.AccountGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.AccountFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AccountGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AccountFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AccountFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AccountGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AccountGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AccountFindUniqueArgs, TData = Prisma.AccountGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AccountFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AccountGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AccountFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AccountFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AccountGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AccountGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.AccountUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AccountUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AccountGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AccountGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AccountUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AccountUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AccountGetPayload<T>, Context>) => Promise<Prisma.AccountGetPayload<T>>
            };

    };
}
