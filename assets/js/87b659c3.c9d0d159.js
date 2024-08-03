"use strict";(self.webpackChunkascender_framework=self.webpackChunkascender_framework||[]).push([[80],{4933:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>d,toc:()=>c});var r=n(4848),i=n(8453),s=n(1470),a=n(9365);const o={sidebar_position:1,sidebar_label:"Overview"},l="Introduction to Identity Framework",d={id:"identity/overview",title:"Introduction to Identity Framework",description:"Ascender Framework Identity - Introduction",source:"@site/docs/identity/overview.md",sourceDirName:"identity",slug:"/identity/overview",permalink:"/ascender-framework-docs/docs/identity/overview",draft:!1,unlisted:!1,editUrl:"https://github.com/AscenderTeam/ascender-framework-docs/docs/identity/overview.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,sidebar_label:"Overview"},sidebar:"tutorialSidebar",previous:{title:"Ascedner Framework Identity",permalink:"/ascender-framework-docs/docs/category/ascedner-framework-identity"},next:{title:"Authorization Guards",permalink:"/ascender-framework-docs/docs/identity/decorators"}},u={},c=[{value:"Ascender Framework Identity - Introduction",id:"ascender-framework-identity---introduction",level:3},{value:"Initialization",id:"initialization",level:3},{value:"Identity Repository",id:"identity-repository",level:3},{value:"Authorization Registry",id:"authorization-registry",level:3}];function y(e){const t={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"introduction-to-identity-framework",children:"Introduction to Identity Framework"}),"\n",(0,r.jsx)(t.h3,{id:"ascender-framework-identity---introduction",children:"Ascender Framework Identity - Introduction"}),"\n",(0,r.jsx)(t.p,{children:"Ascender Framework Identity - Is built-in core authentication driver that allows to manage users, passwords, profile data, roles, claims, tokens, email confirmation, and more."}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"IdentityRepository"})," is responsible for managing and storing: Passwords, profile data, users, email confirmations and many other."]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"IdentityManager"})," is responsible for managing: Roles, claims, policies and tokens."]}),"\n",(0,r.jsx)(t.h3,{id:"initialization",children:"Initialization"}),"\n",(0,r.jsxs)(t.p,{children:["To initialize an Ascender Framework Identity you need to utilize ",(0,r.jsx)(t.code,{children:"app.add_authorization"})," in ",(0,r.jsx)(t.code,{children:"bootstrap.py"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Before doing it you have to generate an auth controller with already ready ",(0,r.jsx)(t.strong,{children:"IdentityRepository"}),"."]}),"\n",(0,r.jsxs)(s.A,{children:[(0,r.jsx)(a.A,{value:"withCLI",label:"With Ascender CLI",default:!0,children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"$ ascender run ctrls identity --name auth\n"})})}),(0,r.jsx)(a.A,{value:"withoutCLI",label:"Without Ascender CLI",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"$ python start.py ctrls identity --name auth\n"})})})]}),"\n",(0,r.jsx)(t.p,{children:"Now you can proceed with Bootstrap class."}),"\n",(0,r.jsx)(t.p,{children:"Here's how to do it:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-python",children:'\nclass Bootstrap:\n\n    @staticmethod\n    def server_boot_up(app: Application):\n        app.use_database(lambda e: Bootstrap.database_registry(app, e),\n                         ORMEnum.SQLALCHEMY, DATABASE_CONNECTION)\n    \n    @staticmethod\n    def authorization_registry(security: Security):\n        security.add_policy("isUser", lambda p: p.require_role("user"))\n\n    @staticmethod\n    def database_registry(app: Application, engine: DatabaseEngine):\n        engine.load_entity("entities.user")\n        engine.run_database()\n        app.add_authorization(Bootstrap.authorization_registry,\n                              identity_repository=AuthRepo(engine.generate_context()), \n                              auth_scheme="oauth2",\n                              secret="asdwq231")\n'})}),"\n",(0,r.jsxs)(t.p,{children:["We recommend you to initialize identity engine authorization in method where you load database, especially after running a database. Because Ascender Framework Identity uses an ",(0,r.jsx)(t.strong,{children:"IdentityRepository"})," and invokes it's methods."]}),"\n",(0,r.jsx)(t.h3,{id:"identity-repository",children:"Identity Repository"}),"\n",(0,r.jsx)(t.p,{children:"The Identity Repository is typically same repository as an ordinary Controller Repository but with a certain required methods. These methods usually are for authenticating, creating, deleting and getting a user. Identity Engine of Ascender Framework requires a controller made for authentication and has an Identity Repository."}),"\n",(0,r.jsx)(t.p,{children:"So this means you can customize authentication in all ways you want."}),"\n",(0,r.jsx)(t.p,{children:"When you generate an Identity controller via Ascender Framework Integrated CLI you will have an Identity Repository like this:"}),"\n",(0,r.jsxs)(s.A,{children:[(0,r.jsx)(a.A,{value:"SQLAlchemy",label:"SQLAlchemy",default:!0,children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-python",children:"from pydantic import EmailStr\nfrom sqlalchemy import or_\nfrom core.database.dbcontext import AppDBContext\nfrom core.extensions.authentication.password_manager import AuthPassManager\nfrom entities.user import UserEntity\nfrom core.extensions.repositories import IdentityRepository, Repository\n\n\nclass AuthRepo(IdentityRepository):\n    def __init__(self, _context: AppDBContext) -> None:\n        self._context = _context\n    \n    async def create_user(self, username: str, email: EmailStr, password: str) -> UserEntity:\n        async with self._context() as db:\n            entity = UserEntity(username=username, email=email.lower(), password=password)\n            db.add(entity)\n            await db.commit()\n            await db.refresh(entity)\n        \n        return entity\n\n    async def update_user(self, user_id: int, **new_values) -> UserEntity | None:\n        async with self._context() as db:\n            entity = await db.get(UserEntity, user_id)\n            if not entity:\n                return None\n            \n            for key, value in new_values.items():\n                setattr(entity, key, value)\n\n        return entity\n    \n    async def get_user(self, user_id: int) -> UserEntity | None:\n        query = await self._context.construct(UserEntity).filter(UserEntity.id == user_id)\n\n        result = query.first()\n        return result[0] if result else None\n    \n    async def get_user_by_login(self, login: str) -> UserEntity | None:\n        query = await self._context.construct(UserEntity).filter(\n            or_(UserEntity.username == login, UserEntity.email == login.lower()))\n        result = query.first()\n        return result[0] if result else None\n    \n    async def delete_user(self, user_id: int) -> None:\n        async with self._context() as db:\n            entity = await db.get(UserEntity, user_id)\n            if not entity:\n                return None\n                \n            await db.delete(entity)\n"})})}),(0,r.jsx)(a.A,{value:"TortoiseORM",label:"TortoiseORM",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-python",children:"from pydantic import EmailStr\nfrom core.extensions.authentication.password_manager import AuthPassManager\nfrom entities.user import UserEntity\nfrom tortoise.expressions import Q\nfrom core.extensions.repositories import IdentityRepository, Repository\n\n\nclass AuthRepo(IdentityRepository):\n    \n    async def create_user(self, username: str, email: EmailStr, password: str) -> UserEntity:\n        entity = UserEntity(username=username, email=email.lower(), password=password)\n        await db.save(entity)\n        \n        return entity\n\n    async def update_user(self, user_id: int, **new_values) -> UserEntity | None:\n        if not entity := await self.get_user(user_id=user_id):\n            return None\n\n        await entity.update_from_dict(new_values).save()\n\n        return entity\n    \n    async def get_user(self, user_id: int) -> UserEntity | None:\n        return await UserEntity.filter(Q(id=user_id)).first()\n    \n    async def get_user_by_login(self, login: str) -> UserEntity | None:\n        return await UserEntity.filter(Q(username=login) | Q(email=login)).first()\n    \n    async def delete_user(self, user_id: int) -> None:\n        if not entity := await self.get_user(user_id=user_id):\n            return None\n        \n        await entity.delete()\n"})})})]}),"\n",(0,r.jsx)(t.h3,{id:"authorization-registry",children:"Authorization Registry"}),"\n",(0,r.jsx)(t.p,{children:"Authorization Registry is responisble for defining: Roles, Policies or Custom handlers."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-python",children:'class Bootstrap:\n    ...\n\n    @staticmethod\n    def authorization_registry(security: Security):\n        security.add_policy("isUser", lambda p: p.require_role("user"))\n'})}),"\n",(0,r.jsxs)(t.p,{children:["In this example we created a security policy ",(0,r.jsx)(t.code,{children:"isUser"})," which requires ",(0,r.jsx)(t.code,{children:"user"})," role.\nNow we can use it in controller and check if user that makes request meets the requirements of this policy to access certain route."]}),"\n",(0,r.jsxs)(t.p,{children:["To do that, you can wrap an endpoint method in ",(0,r.jsx)(t.code,{children:"endpoints.py"})," of any controller with ",(0,r.jsx)(t.code,{children:"@Authorize"})," decorator from ",(0,r.jsx)(t.code,{children:"core.identity.decorators.authorize"})]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-python",children:'...\nfrom core.identity.decorators.authorize import Authorize\n\n@Controller()\nclass App:\n    \n    @Post()\n    @Authorize("isUser")\n    async def protected_route(self):\n        return "Access granted"\n'})})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(y,{...e})}):y(e)}},9365:(e,t,n)=>{n.d(t,{A:()=>a});n(6540);var r=n(4164);const i={tabItem:"tabItem_Ymn6"};var s=n(4848);function a(e){let{children:t,hidden:n,className:a}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.A)(i.tabItem,a),hidden:n,children:t})}},1470:(e,t,n)=>{n.d(t,{A:()=>_});var r=n(6540),i=n(4164),s=n(3104),a=n(6347),o=n(205),l=n(7485),d=n(1682),u=n(679);function c(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function y(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return c(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:i}}=e;return{value:t,label:n,attributes:r,default:i}}))}(n);return function(e){const t=(0,d.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:n}=e;const i=(0,a.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(i.location.search);t.set(s,e),i.replace({...i.location,search:t.toString()})}),[s,i])]}function m(e){const{defaultValue:t,queryString:n=!1,groupId:i}=e,s=y(e),[a,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[d,c]=p({queryString:n,groupId:i}),[m,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[i,s]=(0,u.Dv)(n);return[i,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:i}),g=(()=>{const e=d??m;return h({value:e,tabValues:s})?e:null})();(0,o.A)((()=>{g&&l(g)}),[g]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),f(e)}),[c,f,s]),tabValues:s}}var f=n(2303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=n(4848);function w(e){let{className:t,block:n,selectedValue:r,selectValue:a,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:d}=(0,s.a_)(),u=e=>{const t=e.currentTarget,n=l.indexOf(t),i=o[n].value;i!==r&&(d(t),a(i))},c=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":n},t),children:o.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>l.push(e),onKeyDown:c,onClick:u,...s,className:(0,i.A)("tabs__item",g.tabItem,s?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function x(e){let{lazy:t,children:n,selectedValue:i}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===i));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==i})))})}function v(e){const t=m(e);return(0,b.jsxs)("div",{className:(0,i.A)("tabs-container",g.tabList),children:[(0,b.jsx)(w,{...t,...e}),(0,b.jsx)(x,{...t,...e})]})}function _(e){const t=(0,f.A)();return(0,b.jsx)(v,{...e,children:c(e.children)},String(t))}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var r=n(6540);const i={},s=r.createContext(i);function a(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);