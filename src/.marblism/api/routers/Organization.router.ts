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

        create: procedure.input($Schema.OrganizationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.create(input as any))),

        delete: procedure.input($Schema.OrganizationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.delete(input as any))),

        findFirst: procedure.input($Schema.OrganizationInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).organization.findFirst(input as any))),

        findMany: procedure.input($Schema.OrganizationInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).organization.findMany(input as any))),

        findUnique: procedure.input($Schema.OrganizationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).organization.findUnique(input as any))),

        update: procedure.input($Schema.OrganizationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).organization.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.OrganizationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationGetPayload<T>, Context>) => Promise<Prisma.OrganizationGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.OrganizationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationGetPayload<T>, Context>) => Promise<Prisma.OrganizationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.OrganizationFindFirstArgs, TData = Prisma.OrganizationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.OrganizationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.OrganizationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.OrganizationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.OrganizationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.OrganizationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.OrganizationFindManyArgs, TData = Array<Prisma.OrganizationGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.OrganizationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.OrganizationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.OrganizationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.OrganizationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.OrganizationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.OrganizationFindUniqueArgs, TData = Prisma.OrganizationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.OrganizationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.OrganizationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.OrganizationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.OrganizationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.OrganizationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.OrganizationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.OrganizationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.OrganizationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.OrganizationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.OrganizationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.OrganizationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.OrganizationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.OrganizationGetPayload<T>, Context>) => Promise<Prisma.OrganizationGetPayload<T>>
            };

    };
}
