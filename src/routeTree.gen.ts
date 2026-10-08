/* eslint-disable */
// @ts-nocheck
// This file is generated from src/routes by TanStack Router.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AppRouteImport } from './routes/app'
import { Route as PrecosRouteImport } from './routes/precos'
import { Route as AppRelatoriosRouteImport } from './routes/app-relatorios'
import { Route as AppConfiguracoesRouteImport } from './routes/app-configuracoes'
import { Route as AppAssinaturaRouteImport } from './routes/app-assinatura'
import { Route as LoginRouteImport } from './routes/login'
import { Route as CadastroRouteImport } from './routes/cadastro'
import { Route as RecuperarSenhaRouteImport } from './routes/recuperar-senha'
import { Route as NovaSenhaRouteImport } from './routes/nova-senha'
import { Route as OnboardingRouteImport } from './routes/onboarding'
import { Route as AppPlanejamentoRouteImport } from './routes/app-planejamento'
import { Route as AppTransacoesRouteImport } from './routes/app-transacoes'
import { Route as AppChecklistsRouteImport } from './routes/app-checklists'
import { Route as AppMetasRouteImport } from './routes/app-metas'
import { Route as AppDividasRouteImport } from './routes/app-dividas'
import { Route as AppPatrimonioRouteImport } from './routes/app-patrimonio'
import { Route as AppInsightsRouteImport } from './routes/app-insights'
import { Route as AppContasRouteImport } from './routes/app-contas'

const IndexRoute=IndexRouteImport.update({id:'/',path:'/',getParentRoute:()=>rootRouteImport} as any)
const AppRoute=AppRouteImport.update({id:'/app',path:'/app',getParentRoute:()=>rootRouteImport} as any)
const PrecosRoute=PrecosRouteImport.update({id:'/precos',path:'/precos',getParentRoute:()=>rootRouteImport} as any)
const AppRelatoriosRoute=AppRelatoriosRouteImport.update({id:'/app-relatorios',path:'/app-relatorios',getParentRoute:()=>rootRouteImport} as any)
const AppConfiguracoesRoute=AppConfiguracoesRouteImport.update({id:'/app-configuracoes',path:'/app-configuracoes',getParentRoute:()=>rootRouteImport} as any)
const AppAssinaturaRoute=AppAssinaturaRouteImport.update({id:'/app-assinatura',path:'/app-assinatura',getParentRoute:()=>rootRouteImport} as any)
const LoginRoute=LoginRouteImport.update({id:'/login',path:'/login',getParentRoute:()=>rootRouteImport} as any)
const CadastroRoute=CadastroRouteImport.update({id:'/cadastro',path:'/cadastro',getParentRoute:()=>rootRouteImport} as any)
const RecuperarSenhaRoute=RecuperarSenhaRouteImport.update({id:'/recuperar-senha',path:'/recuperar-senha',getParentRoute:()=>rootRouteImport} as any)
const NovaSenhaRoute=NovaSenhaRouteImport.update({id:'/nova-senha',path:'/nova-senha',getParentRoute:()=>rootRouteImport} as any)
const OnboardingRoute=OnboardingRouteImport.update({id:'/onboarding',path:'/onboarding',getParentRoute:()=>rootRouteImport} as any)
const AppPlanejamentoRoute=AppPlanejamentoRouteImport.update({id:'/app-planejamento',path:'/app-planejamento',getParentRoute:()=>rootRouteImport} as any)
const AppTransacoesRoute=AppTransacoesRouteImport.update({id:'/app-transacoes',path:'/app-transacoes',getParentRoute:()=>rootRouteImport} as any)
const AppChecklistsRoute=AppChecklistsRouteImport.update({id:'/app-checklists',path:'/app-checklists',getParentRoute:()=>rootRouteImport} as any)
const AppMetasRoute=AppMetasRouteImport.update({id:'/app-metas',path:'/app-metas',getParentRoute:()=>rootRouteImport} as any)
const AppDividasRoute=AppDividasRouteImport.update({id:'/app-dividas',path:'/app-dividas',getParentRoute:()=>rootRouteImport} as any)
const AppPatrimonioRoute=AppPatrimonioRouteImport.update({id:'/app-patrimonio',path:'/app-patrimonio',getParentRoute:()=>rootRouteImport} as any)
const AppInsightsRoute=AppInsightsRouteImport.update({id:'/app-insights',path:'/app-insights',getParentRoute:()=>rootRouteImport} as any)
const AppContasRoute=AppContasRouteImport.update({id:'/app-contas',path:'/app-contas',getParentRoute:()=>rootRouteImport} as any)

export interface FileRoutesByFullPath {
 '/':typeof IndexRoute; '/app':typeof AppRoute; '/precos':typeof PrecosRoute; '/app-relatorios':typeof AppRelatoriosRoute; '/app-configuracoes':typeof AppConfiguracoesRoute; '/app-assinatura':typeof AppAssinaturaRoute; '/login':typeof LoginRoute; '/cadastro':typeof CadastroRoute; '/recuperar-senha':typeof RecuperarSenhaRoute; '/nova-senha':typeof NovaSenhaRoute; '/onboarding':typeof OnboardingRoute;
 '/app-planejamento':typeof AppPlanejamentoRoute; '/app-transacoes':typeof AppTransacoesRoute; '/app-checklists':typeof AppChecklistsRoute; '/app-metas':typeof AppMetasRoute; '/app-dividas':typeof AppDividasRoute; '/app-patrimonio':typeof AppPatrimonioRoute; '/app-insights':typeof AppInsightsRoute; '/app-contas':typeof AppContasRoute;
}
export interface FileRoutesByTo extends FileRoutesByFullPath {}
export interface FileRoutesById {
 __root__:typeof rootRouteImport; '/':typeof IndexRoute; '/app':typeof AppRoute; '/precos':typeof PrecosRoute; '/app-relatorios':typeof AppRelatoriosRoute; '/app-configuracoes':typeof AppConfiguracoesRoute; '/app-assinatura':typeof AppAssinaturaRoute; '/login':typeof LoginRoute; '/cadastro':typeof CadastroRoute; '/recuperar-senha':typeof RecuperarSenhaRoute; '/nova-senha':typeof NovaSenhaRoute; '/onboarding':typeof OnboardingRoute;
 '/app-planejamento':typeof AppPlanejamentoRoute; '/app-transacoes':typeof AppTransacoesRoute; '/app-checklists':typeof AppChecklistsRoute; '/app-metas':typeof AppMetasRoute; '/app-dividas':typeof AppDividasRoute; '/app-patrimonio':typeof AppPatrimonioRoute; '/app-insights':typeof AppInsightsRoute; '/app-contas':typeof AppContasRoute;
}
export interface FileRouteTypes {fileRoutesByFullPath:FileRoutesByFullPath;fullPaths:keyof FileRoutesByFullPath;fileRoutesByTo:FileRoutesByTo;to:keyof FileRoutesByTo;id:keyof FileRoutesById;fileRoutesById:FileRoutesById}
export interface RootRouteChildren {
 IndexRoute:typeof IndexRoute;AppRoute:typeof AppRoute;PrecosRoute:typeof PrecosRoute;AppRelatoriosRoute:typeof AppRelatoriosRoute;AppConfiguracoesRoute:typeof AppConfiguracoesRoute;AppAssinaturaRoute:typeof AppAssinaturaRoute;LoginRoute:typeof LoginRoute;CadastroRoute:typeof CadastroRoute;RecuperarSenhaRoute:typeof RecuperarSenhaRoute;NovaSenhaRoute:typeof NovaSenhaRoute;OnboardingRoute:typeof OnboardingRoute;
 AppPlanejamentoRoute:typeof AppPlanejamentoRoute;AppTransacoesRoute:typeof AppTransacoesRoute;AppChecklistsRoute:typeof AppChecklistsRoute;AppMetasRoute:typeof AppMetasRoute;AppDividasRoute:typeof AppDividasRoute;AppPatrimonioRoute:typeof AppPatrimonioRoute;AppInsightsRoute:typeof AppInsightsRoute;AppContasRoute:typeof AppContasRoute;
}
declare module '@tanstack/react-router' { interface FileRoutesByPath {
 '/':{id:'/';path:'/';fullPath:'/';preLoaderRoute:typeof IndexRouteImport;parentRoute:typeof rootRouteImport};
 '/app':{id:'/app';path:'/app';fullPath:'/app';preLoaderRoute:typeof AppRouteImport;parentRoute:typeof rootRouteImport};
 '/precos':{id:'/precos';path:'/precos';fullPath:'/precos';preLoaderRoute:typeof PrecosRouteImport;parentRoute:typeof rootRouteImport};
 '/app-relatorios':{id:'/app-relatorios';path:'/app-relatorios';fullPath:'/app-relatorios';preLoaderRoute:typeof AppRelatoriosRouteImport;parentRoute:typeof rootRouteImport};
 '/app-configuracoes':{id:'/app-configuracoes';path:'/app-configuracoes';fullPath:'/app-configuracoes';preLoaderRoute:typeof AppConfiguracoesRouteImport;parentRoute:typeof rootRouteImport};
 '/app-assinatura':{id:'/app-assinatura';path:'/app-assinatura';fullPath:'/app-assinatura';preLoaderRoute:typeof AppAssinaturaRouteImport;parentRoute:typeof rootRouteImport};
 '/login':{id:'/login';path:'/login';fullPath:'/login';preLoaderRoute:typeof LoginRouteImport;parentRoute:typeof rootRouteImport};
 '/cadastro':{id:'/cadastro';path:'/cadastro';fullPath:'/cadastro';preLoaderRoute:typeof CadastroRouteImport;parentRoute:typeof rootRouteImport};
 '/recuperar-senha':{id:'/recuperar-senha';path:'/recuperar-senha';fullPath:'/recuperar-senha';preLoaderRoute:typeof RecuperarSenhaRouteImport;parentRoute:typeof rootRouteImport};
 '/nova-senha':{id:'/nova-senha';path:'/nova-senha';fullPath:'/nova-senha';preLoaderRoute:typeof NovaSenhaRouteImport;parentRoute:typeof rootRouteImport};
 '/onboarding':{id:'/onboarding';path:'/onboarding';fullPath:'/onboarding';preLoaderRoute:typeof OnboardingRouteImport;parentRoute:typeof rootRouteImport};
 '/app-planejamento':{id:'/app-planejamento';path:'/app-planejamento';fullPath:'/app-planejamento';preLoaderRoute:typeof AppPlanejamentoRouteImport;parentRoute:typeof rootRouteImport};
 '/app-transacoes':{id:'/app-transacoes';path:'/app-transacoes';fullPath:'/app-transacoes';preLoaderRoute:typeof AppTransacoesRouteImport;parentRoute:typeof rootRouteImport};
 '/app-checklists':{id:'/app-checklists';path:'/app-checklists';fullPath:'/app-checklists';preLoaderRoute:typeof AppChecklistsRouteImport;parentRoute:typeof rootRouteImport};
 '/app-metas':{id:'/app-metas';path:'/app-metas';fullPath:'/app-metas';preLoaderRoute:typeof AppMetasRouteImport;parentRoute:typeof rootRouteImport};
 '/app-dividas':{id:'/app-dividas';path:'/app-dividas';fullPath:'/app-dividas';preLoaderRoute:typeof AppDividasRouteImport;parentRoute:typeof rootRouteImport};
 '/app-patrimonio':{id:'/app-patrimonio';path:'/app-patrimonio';fullPath:'/app-patrimonio';preLoaderRoute:typeof AppPatrimonioRouteImport;parentRoute:typeof rootRouteImport};
 '/app-insights':{id:'/app-insights';path:'/app-insights';fullPath:'/app-insights';preLoaderRoute:typeof AppInsightsRouteImport;parentRoute:typeof rootRouteImport};
 '/app-contas':{id:'/app-contas';path:'/app-contas';fullPath:'/app-contas';preLoaderRoute:typeof AppContasRouteImport;parentRoute:typeof rootRouteImport};
}}
const rootRouteChildren:RootRouteChildren={IndexRoute,AppRoute,PrecosRoute,AppRelatoriosRoute,AppConfiguracoesRoute,AppAssinaturaRoute,LoginRoute,CadastroRoute,RecuperarSenhaRoute,NovaSenhaRoute,OnboardingRoute,AppPlanejamentoRoute,AppTransacoesRoute,AppChecklistsRoute,AppMetasRoute,AppDividasRoute,AppPatrimonioRoute,AppInsightsRoute,AppContasRoute}
export const routeTree=rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' { interface Register { ssr:true;router:Awaited<ReturnType<typeof getRouter>>;config:Awaited<ReturnType<typeof startInstance.getOptions>> } }
