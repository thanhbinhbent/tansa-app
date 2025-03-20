"use strict";(self.webpackChunktansa_app=self.webpackChunktansa_app||[]).push([["10"],{1722:function(e,t,r){r.r(t),r.d(t,{ExchangeRateContext:()=>B});var a,n=r(8269),l=r(661),s=r(3140),i=r(9971),o=r(5977),c=r(9376),u=r(154),h=r(9983),d=r(2364),x=r(2024),y=r(4396),g=r(7788),p=((a={}).GrossToNet="gross_to_net",a.NetToGross="net_to_gross",a);function m(e,t){let r=Math.min(e,468e5),a=.08*r,n=.015*r,l=.01*Math.min(e,992e5),s=Math.round(a+n+l),i=Math.round(e-s),o=Math.round(44e5*t),c=Math.max(0,i-11e6-o),u=function(e){if(e<=0)return 0;let t=12*e,r=0;return(t<=6e7?.05*t:t<=12e7?3e6+(t-6e7)*.1:t<=216e6?9e6+(t-12e7)*.15:t<=384e6?234e5+(t-216e6)*.2:(t-384e6)*.25+3e6+6e6+144e5+336e5)/12}(c);return{grossSalary:Math.round(e),socialInsurance:a,healthInsurance:n,unemploymentInsurance:l,totalInsurance:s,incomeBeforeTax:i,personalDeduction:11e6,dependentDeduction:o,taxableIncome:c,tax:u,netSalary:Math.round(i-u)}}function f(e,t,r){if("gross_to_net"===r)return m(e,t);let a=1.2*e,n=m(a,t);for(let r=0;r<100;r++){let r=e-n.netSalary;if(1>Math.abs(r))break;a+=r,n=m(a,t)}return n}var v=r(2931),j=r(2145);new j.Fq;let S=e=>{if("number"==typeof e)return e;let t=e.replace(/\D/g,"");return t?Number(t):0};async function N(e){console.log("Fetching latest exchange rates...");try{let t=(await v.Z.get("https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx",{timeout:1e4})).data.replace(/<!--[\s\S]*?-->/g,""),r=new j.Fq({ignoreAttributes:!1,attributeNamePrefix:""}).parse(t);if(!r.ExrateList||!r.ExrateList.Exrate)throw Error("Invalid XML format");let a=Array.isArray(r.ExrateList.Exrate)?r.ExrateList.Exrate:[r.ExrateList.Exrate],n={};a.forEach(e=>{e.CurrencyCode&&e.Sell&&"-"!==e.Sell&&(n[e.CurrencyCode]=parseFloat(e.Sell.replace(/,/g,"")))}),localStorage.setItem("exchangeRates",JSON.stringify(n)),e(n)}catch(e){console.error("Failed to fetch exchange rates:",e)}}function b(e,t,r){let a=t[r];return a?(e/a).toFixed(2):"N/A"}let Z=e=>e?Number(e).toLocaleString("vi-VN"):"";r(7780);var w=r(280);let k=()=>(0,n.jsxs)(w.E.svg,{className:"text-gray-800 dark:text-white",xmlns:"http://www.w3.org/2000/svg",width:"200",height:"200",fill:"none",viewBox:"0 0 24 24",initial:{opacity:0,scale:.5},animate:{opacity:1,scale:1},transition:{duration:.5},children:[(0,n.jsx)("defs",{children:(0,n.jsxs)("linearGradient",{id:"gradientColor",gradientTransform:"rotate(0)",children:[(0,n.jsx)(w.E.stop,{offset:"0%",stopColor:"#1677ff",animate:{stopColor:["#1677ff","#69b1ff","#1677ff"]},transition:{duration:3,repeat:1/0,ease:"linear",repeatType:"mirror"}}),(0,n.jsx)(w.E.stop,{offset:"100%",stopColor:"#69b1ff",animate:{stopColor:["#69b1ff","#1677ff","#69b1ff"]},transition:{duration:3,repeat:1/0,ease:"linear",repeatType:"mirror"}})]})}),(0,n.jsx)(w.E.path,{stroke:"url(#gradientColor)",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.3",d:"M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z",initial:{pathLength:0,opacity:0},animate:{pathLength:1,opacity:1},transition:{duration:1.5,ease:"easeInOut"}})]});var T=r(2277),E=r(5936),C=r(8282);let{Text:G}=i.Z,{useToken:M}=T.Z;function P(e){let{breakdown:t}=e,{token:r}=M(),[a,s]=(0,l.useState)({}),[i,o]=(0,l.useState)(localStorage.getItem("selectedCurrency")||"USD");(0,l.useEffect)(()=>{let e=localStorage.getItem("exchangeRates");e&&s(JSON.parse(e))},[]);let c=[{key:"gross",label:"Lương GROSS",value:t.grossSalary,color:r.colorPrimary},{key:"social",label:"Bảo hiểm x\xe3 hội (8%)",value:t.socialInsurance},{key:"health",label:"Bảo hiểm y tế (1.5%)",value:t.healthInsurance},{key:"unemployment",label:"Bảo hiểm thất nghiệp (1%)",value:t.unemploymentInsurance},{key:"incomeBeforeTax",label:"Thu nhập trước thuế",value:t.incomeBeforeTax},{key:"taxableIncome",label:"Thu nhập chịu thuế",value:t.taxableIncome},{key:"tax",label:"Thuế thu nhập c\xe1 nh\xe2n",value:t.tax},{key:"net",label:"Lương NET",value:t.netSalary,color:r.colorPrimary}],u=[{title:"Mục",dataIndex:"label",key:"label",render:e=>(0,n.jsx)(G,{strong:!0,children:e})},{title:"Gi\xe1 trị",dataIndex:"value",key:"value",render:(e,t)=>(0,n.jsxs)("div",{children:[(0,n.jsxs)(G,{style:{color:t.color||"inherit"},children:[e.toLocaleString("vi-VN")," VNĐ"]}),(0,n.jsx)("br",{}),(0,n.jsx)(G,{type:"secondary",children:a[i]?b(e,a,i)+` ${i}`:"Đang tải..."})]})}];return(0,n.jsx)(E.Z,{defaultActiveKey:["1"],className:"result-section",children:(0,n.jsx)(E.Z.Panel,{header:"Kết quả",children:(0,n.jsx)(C.Z,{dataSource:c,columns:u,pagination:!1,bordered:!0,size:"small"})},"1")})}function L(e,t,r){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,n=e,l=[];for(let s of t){let t;n=Math.round(n*(1+s/100)),t=r===p.GrossToNet?f(n,a,p.GrossToNet):f(n,a,p.NetToGross),l.push({baseSalary:e,increasePercent:s,conversionType:r,newGrossSalary:Math.round(t.grossSalary),newNetSalary:Math.round(t.netSalary)})}return l}let{Text:I}=i.Z;function A(e){let{baseSalary:t,conversionType:r,dependents:a=0,percentageIncreases:s=[10,15,20,25,30]}=e,[i,o]=(0,l.useState)(""),[u,h]=(0,l.useState)(null),[y,p]=(0,l.useState)(localStorage.getItem("selectedCurrency")||"USD"),[m,f]=(0,l.useState)({});(0,l.useEffect)(()=>{N(f)},[]);let v=()=>{h(null),o("")},j=u?[u,...L(t,s,r,a).filter(e=>e.increasePercent!==u.increasePercent)]:L(t,s,r,a),S=[{title:"(%) tăng",dataIndex:"increasePercent",key:"increasePercent",render:(e,t)=>(0,n.jsxs)(I,{strong:t===u,children:[e,"%"]})},{title:"Gi\xe1 trị (VND)",key:"salaryDetails",render:(e,t)=>(0,n.jsxs)(d.Z,{direction:"vertical",children:[(0,n.jsxs)(I,{strong:t===u,children:["GROSS: ",t.newGrossSalary.toLocaleString("vi-VN")]}),(0,n.jsxs)(I,{type:"secondary",children:[m[y]?b(t.newGrossSalary,m,y):"Đang tải..."," ",y]}),(0,n.jsxs)(I,{strong:t===u,children:["NET: ",t.newNetSalary.toLocaleString("vi-VN")]}),(0,n.jsxs)(I,{type:"secondary",children:[m[y]?b(t.newNetSalary,m,y):"Đang tải..."," ",y]})]})},{title:"Xo\xe1",key:"actions",render:(e,t)=>t===u?(0,n.jsx)(g.ZP,{danger:!0,size:"small",onClick:v,children:"Xo\xe1"}):null}];return(0,n.jsx)(E.Z,{className:"result-section",children:(0,n.jsx)(E.Z.Panel,{header:"Xem mức lương c\xf3 thể tăng",children:(0,n.jsxs)(c.Z,{vertical:!0,gap:16,children:[(0,n.jsxs)(c.Z,{gap:8,style:{width:"100%"},children:[(0,n.jsx)(x.Z,{type:"number",placeholder:"Nhập tỉ lệ % mong muốn",value:i,onChange:e=>o(e.target.value),style:{flex:1}}),(0,n.jsx)(g.ZP,{type:"primary",onClick:()=>{let e=parseFloat(i);!isNaN(e)&&e>0?h(L(t,[e],r,a)[0]):h(null)},style:{flex:.2},children:"T\xednh"})]}),(0,n.jsx)(C.Z,{dataSource:j,columns:S,pagination:!1,bordered:!0,rowKey:"increasePercent"})]})},"1")})}let{Title:R,Text:O}=i.Z,{useBreakpoint:V}=o.ZP;function _(){let[e,t]=(0,l.useState)(""),[r,a]=(0,l.useState)(""),[s,i]=(0,l.useState)(p.GrossToNet),[o,m]=(0,l.useState)(null),v=V();return(0,n.jsx)(c.Z,{justify:"center",align:"center",className:"salary-converter-container",children:(0,n.jsx)(u.Z,{className:"salary-converter-card",children:(0,n.jsxs)(c.Z,{gap:32,wrap:"wrap",vertical:!v.md,style:{width:"100%"},children:[(0,n.jsxs)(c.Z,{vertical:!0,flex:1,className:"salary-converter-column-left",children:[(0,n.jsx)(R,{level:2,style:{textAlign:"center"},children:"TANSA"}),(0,n.jsx)(O,{type:"secondary",style:{textAlign:"center"},children:"C\xf4ng cụ t\xednh lương GROSS, NET ch\xednh x\xe1c"}),(0,n.jsx)(h.Z,{}),(0,n.jsxs)(d.Z,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,n.jsxs)(d.Z,{direction:"vertical",style:{width:"100%"},children:[(0,n.jsx)(O,{strong:!0,children:"Nhập mức lương (VNĐ):"}),(0,n.jsx)(x.Z,{type:"text",value:Z(e),onChange:e=>t(S(e.target.value))})]}),(0,n.jsxs)(d.Z,{direction:"vertical",style:{width:"100%"},children:[(0,n.jsx)(O,{strong:!0,children:"Số người phụ thuộc:"}),(0,n.jsx)(x.Z,{type:"text",value:Z(r),onChange:e=>a(S(e.target.value))})]}),(0,n.jsxs)(d.Z,{direction:"vertical",style:{width:"100%"},children:[(0,n.jsx)(O,{strong:!0,children:"Loại chuyển đổi:"}),(0,n.jsx)(y.ZP.Group,{value:s,onChange:e=>i(e.target.value),children:(0,n.jsxs)(d.Z,{direction:"vertical",children:[(0,n.jsx)(y.ZP,{value:p.GrossToNet,children:"GROSS ➜ NET"}),(0,n.jsx)(y.ZP,{value:p.NetToGross,children:"NET ➜ GROSS"})]})})]}),(0,n.jsx)(g.ZP,{type:"primary",block:!0,onClick:()=>{let t=Number(e),a=Number(r);!isNaN(t)&&!(t<=0)&&m(f(t,isNaN(a)?0:a,s))},children:"Chuyển đổi"})]})]}),(0,n.jsx)(c.Z,{vertical:!0,flex:1,align:"center",justify:"center",className:"salary-converter-column-right",children:o?(0,n.jsxs)(w.E.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.5},style:{width:"100%"},children:[(0,n.jsx)(P,{breakdown:o}),(0,n.jsx)(A,{baseSalary:S(e),conversionType:s,dependents:Number(r)||0})]}):(0,n.jsx)(k,{})})]})})})}r(557);let B=(0,l.createContext)({});s.createRoot(document.getElementById("app")).render((0,n.jsx)(()=>{let[e,t]=(0,l.useState)({});return(0,l.useEffect)(()=>{N(t)},[]),(0,n.jsxs)("div",{className:"container",children:[(0,n.jsx)(B.Provider,{value:e,children:(0,n.jsx)(_,{})})," "]})},{}))},7780:function(e,t,r){e.exports={}},557:function(e,t,r){e.exports={}}}]);
//# sourceMappingURL=10.js.map