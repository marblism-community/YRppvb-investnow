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

        create: procedure.input($Schema.DocumentInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).document.create(input as any))),

        delete: procedure.input($Schema.DocumentInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).document.delete(input as any))),

        findFirst: procedure.input($Schema.DocumentInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).document.findFirst(input as any))),

        findMany: procedure.input($Schema.DocumentInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).document.findMany(input as any))),

        findUnique: procedure.input($Schema.DocumentInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).document.findUnique(input as any))),

        update: procedure.input($Schema.DocumentInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).document.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.DocumentCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentGetPayload<T>, Context>) => Promise<Prisma.DocumentGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DocumentDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentGetPayload<T>, Context>) => Promise<Prisma.DocumentGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DocumentFindFirstArgs, TData = Prisma.DocumentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DocumentFindManyArgs, TData = Array<Prisma.DocumentGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DocumentGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DocumentGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DocumentGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DocumentFindUniqueArgs, TData = Prisma.DocumentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DocumentFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DocumentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DocumentFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DocumentFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DocumentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DocumentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.DocumentUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DocumentUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DocumentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DocumentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DocumentUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DocumentUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DocumentGetPayload<T>, Context>) => Promise<Prisma.DocumentGetPayload<T>>
            };

    };
}
