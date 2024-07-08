/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createAccountRouter from "./Account.router";
import createUserRouter from "./User.router";
import createSessionRouter from "./Session.router";
import createRoleRouter from "./Role.router";
import createStartupRouter from "./Startup.router";
import createDocumentRouter from "./Document.router";
import createInvestorRouter from "./Investor.router";
import createInvestmentRouter from "./Investment.router";
import createOrganizationRouter from "./Organization.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as SessionClientType } from "./Session.router";
import { ClientType as RoleClientType } from "./Role.router";
import { ClientType as StartupClientType } from "./Startup.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as InvestorClientType } from "./Investor.router";
import { ClientType as InvestmentClientType } from "./Investment.router";
import { ClientType as OrganizationClientType } from "./Organization.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        account: createAccountRouter(router, procedure),
        user: createUserRouter(router, procedure),
        session: createSessionRouter(router, procedure),
        role: createRoleRouter(router, procedure),
        startup: createStartupRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        investor: createInvestorRouter(router, procedure),
        investment: createInvestmentRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    account: AccountClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
    role: RoleClientType<AppRouter>;
    startup: StartupClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    investor: InvestorClientType<AppRouter>;
    investment: InvestmentClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
}
