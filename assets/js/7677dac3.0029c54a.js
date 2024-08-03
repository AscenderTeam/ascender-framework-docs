"use strict";(self.webpackChunkascender_framework=self.webpackChunkascender_framework||[]).push([[697],{5352:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var r=t(4848),i=t(8453),a=t(1470),s=t(9365);const l={sidebar_position:3,sidebar_label:"Base CLI"},o="Base CLI - Ascender Framework Integrated CLI",c={id:"cli/base-cli",title:"Base CLI - Ascender Framework Integrated CLI",description:"Introduction",source:"@site/docs/cli/base-cli.md",sourceDirName:"cli",slug:"/cli/base-cli",permalink:"/ascender-framework-docs/docs/cli/base-cli",draft:!1,unlisted:!1,editUrl:"https://github.com/AscenderTeam/ascender-framework-docs/docs/cli/base-cli.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_label:"Base CLI"},sidebar:"tutorialSidebar",previous:{title:"CLI Types",permalink:"/ascender-framework-docs/docs/cli/cli-types"},next:{title:"Generic CLI",permalink:"/ascender-framework-docs/docs/cli/generic-cli"}},u={},d=[{value:"Introduction",id:"introduction",level:3},{value:"Implementation",id:"implementation",level:3},{value:"Registering CLI",id:"registering-cli",level:3},{value:"Context Application in CLI",id:"context-application-in-cli",level:3},{value:"Purpose of Context Application",id:"purpose-of-context-application",level:4}];function p(e){const n={code:"code",h1:"h1",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"base-cli---ascender-framework-integrated-cli",children:"Base CLI - Ascender Framework Integrated CLI"}),"\n",(0,r.jsx)(n.h3,{id:"introduction",children:"Introduction"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"BaseCLI"})," in the Ascender Framework is a simplified type of command-line interface (CLI) that allows you to define a single command per class. This is useful for straightforward CLI operations that do not require multiple subcommands."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"BaseCLI"})," is intended for simpler command-line tasks within the Ascender Framework. Each class inheriting from BaseCLI represents one command, making it easier to manage and implement basic CLI functionalities"]}),"\n",(0,r.jsx)(n.h3,{id:"implementation",children:"Implementation"}),"\n",(0,r.jsxs)(n.p,{children:["There are no limitation in the file structure of CLIs so let's create our first and very simple CLI which will output ",(0,r.jsx)(n.code,{children:"Hello world"})," text."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Create ",(0,r.jsx)(n.code,{children:"clis/"})," directory in your project root if it doesn't exist"]}),"\n",(0,r.jsxs)(n.li,{children:["Create ",(0,r.jsx)(n.code,{children:"example_cli.py"})," in the ",(0,r.jsx)(n.code,{children:"clis/"})," directory of your project"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from core.cli import BaseCLI\nfrom core.cli.application import ContextApplication\nfrom core.cli.models import OptionCMD\n\n\nclass ExampleCLI(BaseCLI):\n    # Define arguments here\n    name: str = OptionCMD("-n", ctype=str, required=True)\n\n    def callback(self, ctx: ContextApplication):\n        ctx.console_print(f"[green]Hello world![/green] How are you doing `{self.name}`")\n'})}),"\n",(0,r.jsx)(n.p,{children:"Alright, we succeed with creating basic CLI, but this isn't over yet, now we have to register it in CLI registry."}),"\n",(0,r.jsx)(n.h3,{id:"registering-cli",children:"Registering CLI"}),"\n",(0,r.jsxs)(n.p,{children:["Navigate into ",(0,r.jsx)(n.code,{children:"bootstrap.py"})," located in your project root directory. Find the ",(0,r.jsx)(n.code,{children:"cli_boot_up"})," method."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from core.application import Application\nfrom core.cli.processor import CLI\nfrom clis.example_cli import ExampleCLI\n\n\nclass Bootstrap:\n    ...\n\n    @staticmethod\n    def cli_boot_up(app: Application, cli: CLI):\n        cli.register_base("example", ExampleCLI)\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Alright! Everything is setup, as we defined ",(0,r.jsx)(n.code,{children:"example"})," as first argument now it will be available through this cli endpoint: ",(0,r.jsx)(n.code,{children:"ascender run example"})]}),"\n",(0,r.jsx)(n.p,{children:"Let's check it up!"}),"\n",(0,r.jsxs)(a.A,{children:[(0,r.jsx)(s.A,{value:"withCLI",label:"With Ascender CLI",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ ascender run example --name John\n"})})}),(0,r.jsx)(s.A,{value:"withoutCLI",label:"Without Ascender CLI",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ python start.py example --name John\n"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:">> Hello world! How are you doing John\n"})}),"\n",(0,r.jsx)(n.h3,{id:"context-application-in-cli",children:"Context Application in CLI"}),"\n",(0,r.jsxs)(n.p,{children:["The Context Application (",(0,r.jsx)(n.code,{children:"ctx"}),") in the Ascender Framework's CLI commands serves as a vital component for interacting with the command-line interface in a structured and enriched manner. It provides several built-in functionalities to streamline command execution and enhance the developer experience."]}),"\n",(0,r.jsx)(n.h4,{id:"purpose-of-context-application",children:"Purpose of Context Application"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Integration with Core Application"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Allows access to the Core Application class."}),"\n",(0,r.jsx)(n.li,{children:"Facilitates management of singletons within the framework."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Enhanced Console Output"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Enables outputting complex and stylized data to the console."}),"\n",(0,r.jsx)(n.li,{children:"Supports tables, progress bars, colorful texts, prompts, and option selection."}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>s});t(6540);var r=t(4164);const i={tabItem:"tabItem_Ymn6"};var a=t(4848);function s(e){let{children:n,hidden:t,className:s}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.A)(i.tabItem,s),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>C});var r=t(6540),i=t(4164),a=t(3104),s=t(6347),l=t(205),o=t(7485),c=t(1682),u=t(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:i}}=e;return{value:n,label:t,attributes:r,default:i}}))}(t);return function(e){const n=(0,c.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const i=(0,s.W6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,o.aZ)(a),(0,r.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(i.location.search);n.set(a,e),i.replace({...i.location,search:n.toString()})}),[a,i])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:i}=e,a=p(e),[s,o]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[c,d]=m({queryString:t,groupId:i}),[f,x]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,a]=(0,u.Dv)(t);return[i,(0,r.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:i}),b=(()=>{const e=c??f;return h({value:e,tabValues:a})?e:null})();(0,l.A)((()=>{b&&o(b)}),[b]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),x(e)}),[d,x,a]),tabValues:a}}var x=t(2303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=t(4848);function j(e){let{className:n,block:t,selectedValue:r,selectValue:s,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),u=e=>{const n=e.currentTarget,t=o.indexOf(n),i=l[t].value;i!==r&&(c(n),s(i))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;n=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;n=o[t]??o[o.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},n),children:l.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>o.push(e),onKeyDown:d,onClick:u,...a,className:(0,i.A)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:i}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===i));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function I(e){const n=f(e);return(0,g.jsxs)("div",{className:(0,i.A)("tabs-container",b.tabList),children:[(0,g.jsx)(j,{...n,...e}),(0,g.jsx)(v,{...n,...e})]})}function C(e){const n=(0,x.A)();return(0,g.jsx)(I,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>l});var r=t(6540);const i={},a=r.createContext(i);function s(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);