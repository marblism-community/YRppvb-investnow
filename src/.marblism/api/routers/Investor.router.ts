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

        create: procedure.input($Schema.InvestorInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investor.create(input as any))),

        delete: procedure.input($Schema.InvestorInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investor.delete(input as any))),

        findFirst: procedure.input($Schema.InvestorInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).investor.findFirst(input as any))),

        findMany: procedure.input($Schema.InvestorInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).investor.findMany(input as any))),

        findUnique: procedure.input($Schema.InvestorInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).investor.findUnique(input as any))),

        update: procedure.input($Schema.InvestorInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).investor.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.InvestorCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestorCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InvestorGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InvestorGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestorCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestorCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InvestorGetPayload<T>, Context>) => Promise<Prisma.InvestorGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.InvestorDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestorDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InvestorGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InvestorGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestorDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestorDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InvestorGetPayload<T>, Context>) => Promise<Prisma.InvestorGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.InvestorFindFirstArgs, TData = Prisma.InvestorGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.InvestorFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InvestorGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InvestorFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InvestorFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InvestorGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InvestorGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.InvestorFindManyArgs, TData = Array<Prisma.InvestorGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.InvestorFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.InvestorGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InvestorFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InvestorFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.InvestorGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.InvestorGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.InvestorFindUniqueArgs, TData = Prisma.InvestorGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.InvestorFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.InvestorGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.InvestorFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.InvestorFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.InvestorGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.InvestorGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.InvestorUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.InvestorUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.InvestorGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.InvestorGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.InvestorUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.InvestorUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.InvestorGetPayload<T>, Context>) => Promise<Prisma.InvestorGetPayload<T>>
            };

    };
}
