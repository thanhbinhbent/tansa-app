"use strict";(self.webpackChunktansa_app=self.webpackChunktansa_app||[]).push([["167"],{7459:function(e,t,r){var n,a=r(8269),l=r(3140);r(557);var s=r(661),i=r(9971),o=r(5977),c=r(9376),h=r(154),u=r(9983),d=r(2364),y=r(2024),x=r(4396),p=r(7788),g=((n={}).GrossToNet="gross_to_net",n.NetToGross="net_to_gross",n);function m(e,t){let r=Math.min(e,468e5),n=.08*r,a=.015*r,l=.01*Math.min(e,992e5),s=Math.round(n+a+l),i=Math.round(e-s),o=Math.round(44e5*t),c=Math.max(0,i-11e6-o),h=function(e){if(e<=0)return 0;let t=12*e,r=0;return(t<=6e7?.05*t:t<=12e7?3e6+(t-6e7)*.1:t<=216e6?9e6+(t-12e7)*.15:t<=384e6?234e5+(t-216e6)*.2:(t-384e6)*.25+3e6+6e6+144e5+336e5)/12}(c);return{grossSalary:Math.round(e),socialInsurance:n,healthInsurance:a,unemploymentInsurance:l,totalInsurance:s,incomeBeforeTax:i,personalDeduction:11e6,dependentDeduction:o,taxableIncome:c,tax:h,netSalary:Math.round(i-h)}}function j(e,t,r){if("gross_to_net"===r)return m(e,t);let n=1.2*e,a=m(n,t);for(let r=0;r<100;r++){let r=e-a.netSalary;if(1>Math.abs(r))break;n+=r,a=m(n,t)}return a}let v=e=>{if("number"==typeof e)return e;let t=e.replace(/\D/g,"");return t?Number(t):0},N=e=>e?Number(e).toLocaleString("vi-VN"):"";r(7780);var f=r(280);let S=()=>(0,a.jsxs)(f.E.svg,{width:"150",height:"150",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",initial:{scale:.9,opacity:.7},animate:{scale:1,opacity:1},transition:{duration:1.5,repeat:1/0,repeatType:"reverse",ease:"easeInOut"},children:[(0,a.jsx)(f.E.path,{d:"M3 7H21V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V7Z",fill:"#1677ff",stroke:"#003a8c",strokeWidth:"1",initial:{y:0},animate:{y:[0,2,0]},transition:{duration:2,repeat:1/0,repeatType:"reverse"}}),(0,a.jsx)(f.E.path,{d:"M16 7V5C16 3.9 15.1 3 14 3H5C3.9 3 3 3.9 3 5V7",fill:"#69c0ff",stroke:"#003a8c",strokeWidth:"1",strokeLinecap:"round",initial:{y:0},animate:{y:[-2,2,-2]},transition:{duration:2,repeat:1/0,repeatType:"reverse"}}),(0,a.jsx)(f.E.rect,{x:"18",y:"10",width:"4",height:"4",fill:"#52c41a",stroke:"#003a8c",strokeWidth:"1",initial:{scale:1},animate:{scale:[1,1.2,1]},transition:{duration:1.5,repeat:1/0,repeatType:"reverse"}}),(0,a.jsx)("circle",{cx:"20",cy:"12",r:"0.5",fill:"#fff"})]});var Z=r(2277),k=r(5936),b=r(8282);let{Text:T}=i.Z,{useToken:w}=Z.Z;function G(e){let{breakdown:t}=e,{token:r}=w(),n=[{key:"gross",label:"Lương GROSS",value:t.grossSalary,color:r.colorPrimary},{key:"social",label:"Bảo hiểm x\xe3 hội (8%)",value:t.socialInsurance},{key:"health",label:"Bảo hiểm y tế (1.5%)",value:t.healthInsurance},{key:"unemployment",label:"Bảo hiểm thất nghiệp (1%)",value:t.unemploymentInsurance},{key:"incomeBeforeTax",label:"Thu nhập trước thuế",value:t.incomeBeforeTax},{key:"taxableIncome",label:"Thu nhập chịu thuế",value:t.taxableIncome},{key:"tax",label:"Thuế thu nhập c\xe1 nh\xe2n",value:t.tax},{key:"net",label:"Lương NET",value:t.netSalary,color:r.colorPrimary}],l=[{title:"Mục",dataIndex:"label",key:"label",render:e=>(0,a.jsx)(T,{strong:!0,children:e})},{title:"Gi\xe1 trị (VNĐ)",dataIndex:"value",key:"value",render:(e,t)=>(0,a.jsx)(T,{style:{color:t.color||"inherit"},children:e.toLocaleString("vi-VN")})}];return(0,a.jsx)(k.Z,{defaultActiveKey:["1"],className:"result-section",children:(0,a.jsx)(k.Z.Panel,{header:"Kết quả",children:(0,a.jsx)(b.Z,{dataSource:n,columns:l,pagination:!1,bordered:!0,size:"small"})},"1")})}function P(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=e,l=[];for(let s of t){let t;a=Math.round(a*(1+s/100)),t=r===g.GrossToNet?j(a,n,g.GrossToNet):j(a,n,g.NetToGross),l.push({baseSalary:e,increasePercent:s,conversionType:r,newGrossSalary:Math.round(t.grossSalary),newNetSalary:Math.round(t.netSalary)})}return l}let C=e=>Number(e.toString().replace(/\D/g,"")).toLocaleString("vi-VN"),{Text:M}=i.Z;function I(e){let{baseSalary:t,conversionType:r,dependents:n=0,percentageIncreases:l=[5,10,15,20,25,30,35,40,45,50]}=e,[i,o]=(0,s.useState)(""),[h,u]=(0,s.useState)(null),d=P(t,l,r,n),x=()=>{u(null),o("")},g=h?[h,...d.filter(e=>e.increasePercent!==h.increasePercent)]:d,m=[{title:"Tỉ lệ tăng (%)",dataIndex:"increasePercent",key:"increasePercent",render:(e,t)=>(0,a.jsxs)(M,{strong:t===h,children:[e,"%"]})},{title:"Lương GROSS (VND)",dataIndex:"newGrossSalary",key:"newGrossSalary",render:(e,t)=>(0,a.jsx)(M,{strong:t===h,children:C(e)})},{title:"Lương NET (VND)",dataIndex:"newNetSalary",key:"newNetSalary",render:(e,t)=>(0,a.jsx)(M,{strong:t===h,children:C(e)})},{title:"Thao t\xe1c",key:"actions",render:(e,t)=>t===h?(0,a.jsx)(p.ZP,{danger:!0,size:"small",onClick:x,children:"Xo\xe1"}):null}];return(0,a.jsx)(k.Z,{className:"result-section",children:(0,a.jsx)(k.Z.Panel,{header:"Xem mức lương c\xf3 thể tăng",children:(0,a.jsxs)(c.Z,{vertical:!0,gap:16,children:[(0,a.jsxs)(c.Z,{gap:8,style:{width:"100%"},children:[(0,a.jsx)(y.Z,{type:"number",placeholder:"Nhập tỉ lệ % mong muốn",value:i,onChange:e=>o(e.target.value),style:{flex:1}}),(0,a.jsx)(p.ZP,{type:"primary",onClick:()=>{let e=parseFloat(i);!isNaN(e)&&e>0?u(P(t,[e],r,n)[0]):u(null)},style:{flex:.2},children:"T\xednh"})]}),(0,a.jsx)(b.Z,{dataSource:g,columns:m,pagination:!1,bordered:!0,rowKey:"increasePercent"})]})},"1")})}let{Title:E,Text:V}=i.Z,{useBreakpoint:L}=o.ZP;function _(){let[e,t]=(0,s.useState)(""),[r,n]=(0,s.useState)(""),[l,i]=(0,s.useState)(g.GrossToNet),[o,m]=(0,s.useState)(null),Z=L();return(0,a.jsx)(c.Z,{justify:"center",align:"center",className:"salary-converter-container",children:(0,a.jsx)(h.Z,{className:"salary-converter-card",children:(0,a.jsxs)(c.Z,{gap:32,wrap:"wrap",vertical:!Z.md,style:{width:"100%"},children:[(0,a.jsxs)(c.Z,{vertical:!0,flex:1,className:"salary-converter-column-left",children:[(0,a.jsx)(E,{level:2,style:{textAlign:"center"},children:"TANSA"}),(0,a.jsx)(V,{type:"secondary",style:{textAlign:"center"},children:"C\xf4ng cụ t\xednh lương GROSS, NET ch\xednh x\xe1c"}),(0,a.jsx)(u.Z,{}),(0,a.jsxs)(d.Z,{direction:"vertical",size:"large",style:{width:"100%"},children:[(0,a.jsxs)(d.Z,{direction:"vertical",style:{width:"100%"},children:[(0,a.jsx)(V,{strong:!0,children:"Nhập mức lương (VNĐ):"}),(0,a.jsx)(y.Z,{type:"text",value:N(e),onChange:e=>t(v(e.target.value))})]}),(0,a.jsxs)(d.Z,{direction:"vertical",style:{width:"100%"},children:[(0,a.jsx)(V,{strong:!0,children:"Số người phụ thuộc:"}),(0,a.jsx)(y.Z,{type:"text",value:N(r),onChange:e=>n(v(e.target.value))})]}),(0,a.jsxs)(d.Z,{direction:"vertical",style:{width:"100%"},children:[(0,a.jsx)(V,{strong:!0,children:"Loại chuyển đổi:"}),(0,a.jsx)(x.ZP.Group,{value:l,onChange:e=>i(e.target.value),children:(0,a.jsxs)(d.Z,{children:[(0,a.jsx)(x.ZP,{value:g.GrossToNet,children:"GROSS ➜ NET"}),(0,a.jsx)(x.ZP,{value:g.NetToGross,children:"NET ➜ GROSS"})]})})]}),(0,a.jsx)(p.ZP,{type:"primary",block:!0,onClick:()=>{let t=Number(e),n=Number(r);!isNaN(t)&&!(t<=0)&&m(j(t,isNaN(n)?0:n,l))},children:"Chuyển đổi"})]})]}),(0,a.jsx)(c.Z,{vertical:!0,flex:1,align:"center",justify:"center",className:"salary-converter-column-right",children:o?(0,a.jsxs)(f.E.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.5},style:{width:"100%"},children:[(0,a.jsx)(G,{breakdown:o}),(0,a.jsx)(I,{baseSalary:v(e),conversionType:l,dependents:Number(r)||0})]}):(0,a.jsx)(S,{})})]})})})}l.createRoot(document.getElementById("app")).render((0,a.jsx)(()=>(0,a.jsx)("div",{className:"container",children:(0,a.jsx)(_,{})}),{}))},7780:function(e,t,r){e.exports={}},557:function(e,t,r){e.exports={}}}]);
//# sourceMappingURL=167.js.map