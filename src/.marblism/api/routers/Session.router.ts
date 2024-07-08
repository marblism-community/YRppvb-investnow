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

        create: procedure.input($Schema.SessionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).session.create(input as any))),

        delete: procedure.input($Schema.SessionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).session.delete(input as any))),

        findFirst: procedure.input($Schema.SessionInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).session.findFirst(input as any))),

        findMany: procedure.input($Schema.SessionInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).session.findMany(input as any))),

        findUnique: procedure.input($Schema.SessionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).session.findUnique(input as any))),

        update: procedure.input($Schema.SessionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).session.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.SessionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SessionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SessionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SessionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SessionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SessionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SessionGetPayload<T>, Context>) => Promise<Prisma.SessionGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SessionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SessionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SessionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SessionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SessionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SessionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SessionGetPayload<T>, Context>) => Promise<Prisma.SessionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SessionFindFirstArgs, TData = Prisma.SessionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SessionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SessionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SessionFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SessionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SessionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SessionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SessionFindManyArgs, TData = Array<Prisma.SessionGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.SessionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SessionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SessionFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SessionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SessionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SessionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SessionFindUniqueArgs, TData = Prisma.SessionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SessionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SessionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SessionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SessionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SessionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SessionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.SessionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SessionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SessionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SessionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SessionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SessionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SessionGetPayload<T>, Context>) => Promise<Prisma.SessionGetPayload<T>>
            };

    };
}
