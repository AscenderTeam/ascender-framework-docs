"use strict";(self.webpackChunkascender_framework=self.webpackChunkascender_framework||[]).push([[248],{8726:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>u});var r=t(4848),o=t(8453),i=t(1470),l=t(9365);const a={sidebar_position:4,sidebar_label:"Generic CLI"},s="Generic CLI - Ascender Framework Integrated CLI",c={id:"cli/generic-cli",title:"Generic CLI - Ascender Framework Integrated CLI",description:"Introduction",source:"@site/docs/cli/generic-cli.md",sourceDirName:"cli",slug:"/cli/generic-cli",permalink:"/ascender-framework-docs/docs/cli/generic-cli",draft:!1,unlisted:!1,editUrl:"https://github.com/AscenderTeam/ascender-framework-docs/docs/cli/generic-cli.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,sidebar_label:"Generic CLI"},sidebar:"tutorialSidebar",previous:{title:"Base CLI",permalink:"/ascender-framework-docs/docs/cli/base-cli"},next:{title:"Asynchronous Module",permalink:"/ascender-framework-docs/docs/cli/async-cli"}},d={},u=[{value:"Introduction",id:"introduction",level:3},{value:"Implementation",id:"implementation",level:3},{value:"Registering CLI",id:"registering-cli",level:3},{value:"Context Application in CLI",id:"context-application-in-cli",level:3},{value:"Purpose of Context Application",id:"purpose-of-context-application",level:4},{value:"Example of Enhanced Console Output",id:"example-of-enhanced-console-output",level:3},{value:"Registering Enhanced CLI",id:"registering-enhanced-cli",level:3}];function p(e){const n={code:"code",h1:"h1",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"generic-cli---ascender-framework-integrated-cli",children:"Generic CLI - Ascender Framework Integrated CLI"}),"\n",(0,r.jsx)(n.h3,{id:"introduction",children:"Introduction"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"GenericCLI"})," in the Ascender Framework is an advanced type of command-line interface (CLI) that allows you to define multiple commands within a single class. This is useful for more complex CLI operations that require multiple subcommands and greater flexibility."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"GenericCLI"})," is intended for more sophisticated command-line tasks within the Ascender Framework. Each class inheriting from GenericCLI can represent multiple commands, making it easier to manage and implement a comprehensive set of CLI functionalities."]}),"\n",(0,r.jsx)(n.h3,{id:"implementation",children:"Implementation"}),"\n",(0,r.jsxs)(n.p,{children:["There are no limitations in the file structure of CLIs, so let's create our first and very simple GenericCLI, which will output ",(0,r.jsx)(n.code,{children:"Hello world"})," text in different formats."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Create the ",(0,r.jsx)(n.code,{children:"clis/"})," directory in your project root if it doesn't exist."]}),"\n",(0,r.jsxs)(n.li,{children:["Create ",(0,r.jsx)(n.code,{children:"hello_cli.py"})," in the ",(0,r.jsx)(n.code,{children:"clis/"})," directory of your project."]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from core.cli import GenericCLI\nfrom core.cli.main import console_command\nfrom core.cli.application import ContextApplication\nfrom core.cli.models import OptionCMD\n\nclass HelloCLI(GenericCLI):\n\n    @console_command(name="hello-world")\n    def hello_world(self, ctx: ContextApplication):\n        ctx.console_print("[bold green]Hello world![/bold green] YAY the CLI works!")\n        \n    @console_command()\n    def greet(self, ctx: ContextApplication, name: str = OptionCMD("-n", ctype=str, required=True)):\n        ctx.console_print(f"[bold blue]Hello, {name}![/bold blue] This is the greet command.")\n'})}),"\n",(0,r.jsx)(n.p,{children:"Alright, we succeeded with creating a basic GenericCLI, but this isn't over yet. Now we have to register it in the CLI registry."}),"\n",(0,r.jsx)(n.h3,{id:"registering-cli",children:"Registering CLI"}),"\n",(0,r.jsxs)(n.p,{children:["Navigate to ",(0,r.jsx)(n.code,{children:"bootstrap.py"})," located in your project root directory. Find the ",(0,r.jsx)(n.code,{children:"cli_boot_up"})," method."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"from core.application import Application\nfrom core.cli.processor import CLI\nfrom clis.hello_cli import HelloCLI\n\nclass Bootstrap:\n    ...\n\n    @staticmethod\n    def cli_boot_up(app: Application, cli: CLI):\n        cli.register_generic(HelloCLI)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Alright! Everything is set up. Now the commands will be available through this CLI endpoint: ",(0,r.jsx)(n.code,{children:"ascender run hello-world"})," and ",(0,r.jsx)(n.code,{children:"ascender run greet --name John"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Let's check it up!"}),"\n",(0,r.jsxs)(i.A,{children:[(0,r.jsx)(l.A,{value:"withCLI",label:"With Ascender CLI",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ ascender run hello-world\n$ ascender run greet --name John\n"})})}),(0,r.jsx)(l.A,{value:"withoutCLI",label:"Without Ascender CLI",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ python start.py hello-world\n$ python start.py greet --name John\n"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:">> Hello world! YAY the CLI works!\n>> Hello, John! This is the greet command.\n"})}),"\n",(0,r.jsx)(n.h3,{id:"context-application-in-cli",children:"Context Application in CLI"}),"\n",(0,r.jsxs)(n.p,{children:["The Context Application (",(0,r.jsx)(n.code,{children:"ctx"}),") in the Ascender Framework's CLI commands serves as a vital component for interacting with the command-line interface in a structured and enriched manner. It provides several built-in functionalities to streamline command execution and enhance the developer experience."]}),"\n",(0,r.jsx)(n.h4,{id:"purpose-of-context-application",children:"Purpose of Context Application"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Integration with Core Application"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Allows access to the Core Application class."}),"\n",(0,r.jsx)(n.li,{children:"Facilitates management of singletons within the framework."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Enhanced Console Output"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Enables outputting complex and stylized data to the console."}),"\n",(0,r.jsx)(n.li,{children:"Supports tables, progress bars, colorful texts, prompts, and option selection."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"example-of-enhanced-console-output",children:"Example of Enhanced Console Output"}),"\n",(0,r.jsx)(n.p,{children:"Here\u2019s an example demonstrating the enhanced console output capabilities of the Context Application:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from core.cli import GenericCLI\nfrom core.cli.main import console_command\nfrom core.cli.application import ContextApplication\nfrom rich.table import Table # Uses Rich Console under hood\n\nclass EnhancedCLI(GenericCLI):\n\n    @console_command(name="display-table")\n    def display_table(self, ctx: ContextApplication):\n        table = Table(title="Sample Table")\n        table.add_column("Column 1", justify="right", style="cyan", no_wrap=True)\n        table.add_column("Column 2", style="magenta")\n        table.add_column("Column 3", justify="right", style="green")\n        table.add_row("Row 1", "Row 2", "Row 3")\n        ctx.console_print(table=table)\n\n    @console_command(name="show-progress")\n    def show_progress(self, ctx: ContextApplication):\n        from rich.progress import Progress # Uses Rich Console under hood\n\n        with Progress() as progress:\n            task = progress.add_task("[green]Processing...", total=100)\n            while not progress.finished:\n                progress.update(task, advance=0.5)\n'})}),"\n",(0,r.jsx)(n.h3,{id:"registering-enhanced-cli",children:"Registering Enhanced CLI"}),"\n",(0,r.jsxs)(n.p,{children:["As with the previous examples, register the new CLI commands in ",(0,r.jsx)(n.code,{children:"bootstrap.py"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"from core.application import Application\nfrom core.cli.processor import CLI\nfrom clis.enhanced_cli import EnhancedCLI\n\nclass Bootstrap:\n    ...\n\n    @staticmethod\n    def cli_boot_up(app: Application, cli: CLI):\n        cli.register_generic(EnhancedCLI)\n"})}),"\n",(0,r.jsx)(n.p,{children:"Now, you can run the new commands as follows:"}),"\n",(0,r.jsxs)(i.A,{children:[(0,r.jsx)(l.A,{value:"withCLI",label:"With Ascender CLI",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ ascender run display-table\n$ ascender run show-progress\n"})})}),(0,r.jsx)(l.A,{value:"withoutCLI",label:"Without Ascender CLI",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ python start.py display-table\n$ python start.py show-progress\n"})})})]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>l});t(6540);var r=t(4164);const o={tabItem:"tabItem_Ymn6"};var i=t(4848);function l(e){let{children:n,hidden:t,className:l}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,r.A)(o.tabItem,l),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>v});var r=t(6540),o=t(4164),i=t(3104),l=t(6347),a=t(205),s=t(7485),c=t(1682),d=t(679);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:o}}=e;return{value:n,label:t,attributes:r,default:o}}))}(t);return function(e){const n=(0,c.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const o=(0,l.W6)(),i=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,s.aZ)(i),(0,r.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(o.location.search);n.set(i,e),o.replace({...o.location,search:n.toString()})}),[i,o])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:o}=e,i=p(e),[l,s]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:i}))),[c,u]=m({queryString:t,groupId:o}),[f,g]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[o,i]=(0,d.Dv)(t);return[o,(0,r.useCallback)((e=>{t&&i.set(e)}),[t,i])]}({groupId:o}),x=(()=>{const e=c??f;return h({value:e,tabValues:i})?e:null})();(0,a.A)((()=>{x&&s(x)}),[x]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),g(e)}),[u,g,i]),tabValues:i}}var g=t(2303);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=t(4848);function j(e){let{className:n,block:t,selectedValue:r,selectValue:l,tabValues:a}=e;const s=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.a_)(),d=e=>{const n=e.currentTarget,t=s.indexOf(n),o=a[t].value;o!==r&&(c(n),l(o))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=s.indexOf(e.currentTarget)+1;n=s[t]??s[0];break}case"ArrowLeft":{const t=s.indexOf(e.currentTarget)-1;n=s[t]??s[s.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":t},n),children:a.map((e=>{let{value:n,label:t,attributes:i}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>s.push(e),onKeyDown:u,onClick:d,...i,className:(0,o.A)("tabs__item",x.tabItem,i?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function C(e){let{lazy:n,children:t,selectedValue:o}=e;const i=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=i.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:i.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==o})))})}function w(e){const n=f(e);return(0,b.jsxs)("div",{className:(0,o.A)("tabs-container",x.tabList),children:[(0,b.jsx)(j,{...n,...e}),(0,b.jsx)(C,{...n,...e})]})}function v(e){const n=(0,g.A)();return(0,b.jsx)(w,{...e,children:u(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>a});var r=t(6540);const o={},i=r.createContext(o);function l(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);