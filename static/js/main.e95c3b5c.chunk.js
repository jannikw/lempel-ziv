(this["webpackJsonplempel-ziv-playground"]=this["webpackJsonplempel-ziv-playground"]||[]).push([[0],{72:function(e,t,n){"use strict";n.r(t);n(55);var r=n(0),c=n.n(r),i=n(26),a=n.n(i),s=n(37),l=n(39),o=n(12),j=n(13),u=n(10),d=n(29),b=n(7),h=n(9),x=n(6);var p=n(40),O=n(30),f=n.n(O);function v(e,t){e:for(var n=0;n<=e.length-t.length;n++){for(var r=0;r<t.length;r++)if(e[n+r]!==t[r])continue e;return n}return-1}function g(e,t){e:for(var n=e.length-t.length;n>=0;n--){for(var r=0;r<t.length;r++)if(e[n+r]!==t[r])continue e;return n}return-1}function y(e){for(var t=[],n=0;n<e.length;n++){var r=e.codePointAt(n);if(!r)break;t.push(r)}return t}var m=n(11),z=f.a.mark(C),k=f.a.mark(L),w=f.a.mark(S);function C(e){var t,n,r,c,i;return f.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:t=0;case 1:if(!(t<e.length)){a.next=26;break}n=0,r=0;case 4:if(!(t+n<e.length)){a.next=15;break}if(c=e.slice(t,t+n+1),-1===(i=g(e.slice(0,t+n),c))){a.next=12;break}n++,r=i,a.next=13;break;case 12:return a.abrupt("break",15);case 13:a.next=4;break;case 15:if(0!==n){a.next=21;break}return a.next=18,{type:"literal",symbol:e[t],l:1};case 18:t+=1,a.next=24;break;case 21:return a.next=23,{type:"copy",p:r,l:n};case 23:t+=n;case 24:a.next=1;break;case 26:case"end":return a.stop()}}),z)}function L(e,t){var n,r,c,i,a,s;return f.a.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:n=0;case 1:if(!(n<e.length)){l.next=27;break}r=0,c=0;case 4:if(!(n+r<e.length)){l.next=16;break}if(i=e.slice(n,n+r+1),a=Math.max(0,n-t),-1===(s=g(e.slice(a,Math.min(a+t,n+r)),i))){l.next=13;break}r++,c=s+a,l.next=14;break;case 13:return l.abrupt("break",16);case 14:l.next=4;break;case 16:if(0!==r){l.next=22;break}return l.next=19,{type:"literal",symbol:e[n],l:1};case 19:n+=1,l.next=25;break;case 22:return l.next=24,{type:"copy",p:c,l:r};case 24:n+=r;case 25:l.next=1;break;case 27:case"end":return l.stop()}}),k)}function S(e,t){var n,r,c,i,a;return f.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:n=0;case 1:if(!(n<e.length)){s.next=26;break}r=0,c=0;case 4:if(!(n+r<e.length)){s.next=15;break}if(i=e.slice(n,n+r+1),-1===(a=v(t,i))){s.next=12;break}r++,c=a,s.next=13;break;case 12:return s.abrupt("break",15);case 13:s.next=4;break;case 15:if(0!==r){s.next=21;break}return s.next=18,{rlz:!0,type:"literal",symbol:e[n],l:1};case 18:n+=1,s.next=24;break;case 21:return s.next=23,{rlz:!0,type:"copy",p:c,l:r};case 23:n+=r;case 24:s.next=1;break;case 26:case"end":return s.stop()}}),w)}function P(e,t){for(var n=[],r=[],c=0;c<e.length;){for(var i=0,a=0;c+i<e.length;){var s=e.slice(c,c+i+1),l=g(e.slice(0,Math.min(c,t)),s);if(-1===l)break;i++,a=l}if(0===i){var o={type:"literal",symbol:e[c],l:1};c<t?n.push(o):r.push(o),c+=1}else{var j={type:"copy",p:a,l:i};c<t?n.push(j):r.push(j),c+=i}}return[n,r]}function R(e,t){var n=new Map,r=[],c=[];function i(e){var c,i="literal"===e.type?[e.symbol]:t.slice(e.p,e.p+e.l),a=Object(p.a)(r);try{for(a.s();!(c=a.n()).done;){var s=Object(u.a)(c.value,2),l=s[0],o=s[1];if(Object(m.isEqual)(l,i))return o}}catch(d){a.e(d)}finally{a.f()}var j=n.size;return n.set(j,e),r.push([i,j]),j}var a,s=Object(p.a)(e);try{for(s.s();!(a=s.n()).done;){var l=a.value;c.push(i(l))}}catch(o){s.e(o)}finally{s.f()}return[n,c]}function B(e,t,n,r){for(var c=[],i=0;i<e.length;i++){var a=e[i];if("literal"===a.type){var s=t.get(a.symbol);if(void 0===s)throw new Error("no mapping for symbol "+a.symbol);c.push(s)}else{var l=Object(m.sumBy)(n.slice(0,a.p).map((function(e){return t.get(e)})),(function(e){return e.l}))+r,o=Object(m.sumBy)(n.slice(a.p,a.p+a.l).map((function(e){return t.get(e)})),(function(e){return e.l}));c.push({type:"copy",p:l,l:o})}}return c}function A(e,t){var n=Object(j.a)(P(e,t)),r=n[0],c=n[1],i=[].concat(Object(j.a)(r),Object(j.a)(c)),a=R(i,e),s=Object(u.a)(a,2),l=s[0],o=s[1],d=Object(j.a)(C(o));return{firstPassPhrases:i,metaSymbols:o,metaSymbolPhrases:d,phrases:B(d,l,o,0)}}function I(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;if(0===n)return e.map((function(e){return{type:"literal",symbol:e,l:1}}));var r=Object(j.a)(P(e,t)),c=r[0],i=r[1];if(i.length>0){var a=R(i,e.slice(0,t)),s=Object(u.a)(a,2),l=s[0],o=s[1],d=I(o,t,n&&n-1);return[].concat(Object(j.a)(c),Object(j.a)(B(d,l,o,t)))}return c}var Z=n(23),E=n(53),M=n(1);function H(e){return Object(M.jsx)("div",{style:{display:"inline-block",width:"30px",height:"30px",border:"1px solid black",textAlign:"center",verticalAlign:"middle",lineHeight:"30px"},children:e.character})}function W(){return Object(M.jsxs)("div",{children:[Object(M.jsx)(H,{character:"A"}),Object(M.jsx)(H,{character:"A"})]})}function F(e){return"lz77"===e?{type:"lz77"}:"lz-sw"===e?{type:"lz-sw",windowSize:5}:"rlz"===e?{type:"rlz",reference:""}:"rlz-pref"===e?{type:"rlz-pref",prefixLength:5}:"relz"===e?{type:"relz",prefixLength:5}:{type:"relz-rec",prefixLength:5}}var G={lz77:{type:"lz77",title:"LZ77",needsReference:!1,needsPrefixSize:!1,needsWindowSize:!1,needsRecursionLimit:!1},"lz-sw":{type:"lz-sw",title:"LZ with sliding window",needsReference:!1,needsPrefixSize:!1,needsWindowSize:!0,needsRecursionLimit:!1},rlz:{type:"rlz",title:"RLZ",needsReference:!0,needsPrefixSize:!1,needsWindowSize:!1,needsRecursionLimit:!1},"rlz-pref":{type:"rlz-pref",title:"RLZ using prefix",needsReference:!1,needsPrefixSize:!0,needsWindowSize:!1,needsRecursionLimit:!1},relz:{type:"relz",title:"ReLZ",needsReference:!1,needsPrefixSize:!0,needsWindowSize:!1,needsRecursionLimit:!1},"relz-rec":{type:"relz-rec",title:"Recursive ReLZ",needsReference:!1,needsPrefixSize:!0,needsWindowSize:!1,needsRecursionLimit:!0}};function N(e){function t(t){e.onChange&&e.onChange(t)}if("lz77"===e.current.type)return Object(M.jsxs)(b.a,{children:[Object(M.jsx)(b.a.Header,{children:"LZ77"}),Object(M.jsx)(b.a.Body,{children:"no settings"})]});if("lz-sw"===e.current.type){var n=e.current.windowSize;return Object(M.jsxs)(b.a,{children:[Object(M.jsx)(b.a.Header,{children:"LZ with sliding window"}),Object(M.jsx)(b.a.Body,{children:Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{children:"Window size:"}),Object(M.jsx)(x.a,{children:Object(M.jsx)("input",{type:"number",min:"0",value:n,onChange:function(e){return t({type:"lz-sw",windowSize:parseInt(e.target.value)})}})})]})})]})}if("rlz"===e.current.type)return Object(M.jsxs)(b.a,{children:[Object(M.jsx)(b.a.Header,{children:"Relative LZ"}),Object(M.jsx)(b.a.Body,{children:Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{children:"Reference:"}),Object(M.jsx)(x.a,{children:Object(M.jsx)("input",{value:e.current.reference,onChange:function(e){return t({type:"rlz",reference:e.target.value})}})})]})})]});if("rlz-pref"===e.current.type)return Object(M.jsxs)(b.a,{children:[Object(M.jsx)(b.a.Header,{children:"RLZ with prefix"}),Object(M.jsx)(b.a.Body,{children:Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{children:"Prefix length:"}),Object(M.jsx)(x.a,{children:Object(M.jsx)("input",{value:e.current.prefixLength,type:"number",min:"0",onChange:function(e){return t({type:"rlz-pref",prefixLength:parseInt(e.target.value)})}})})]})})]});if("relz"===e.current.type)return Object(M.jsxs)(b.a,{children:[Object(M.jsx)(b.a.Header,{children:"ReLZ"}),Object(M.jsx)(b.a.Body,{children:Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{children:"Prefix length:"}),Object(M.jsx)(x.a,{children:Object(M.jsx)("input",{type:"number",min:"0",value:e.current.prefixLength,onChange:function(e){return t({type:"relz",prefixLength:parseInt(e.target.value)})}})})]})})]});if("relz-rec"===e.current.type){var r=e.current,c=r.prefixLength,i=r.recursionLimit;return Object(M.jsxs)(b.a,{children:[Object(M.jsx)(b.a.Header,{children:"Recursive ReLZ"}),Object(M.jsxs)(b.a.Body,{children:[Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{children:"Prefix length:"}),Object(M.jsx)(x.a,{children:Object(M.jsx)("input",{type:"number",min:"0",value:e.current.prefixLength,onChange:function(e){return t({type:"relz-rec",prefixLength:parseInt(e.target.value),recursionLimit:i})}})})]}),Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{children:"Recursion limit:"}),Object(M.jsx)(x.a,{children:Object(M.jsx)("input",{type:"number",min:"0",value:e.current.recursionLimit,onChange:function(e){return t({type:"relz-rec",prefixLength:c,recursionLimit:parseInt(e.target.value)})}})})]})]})]})}throw new Error("invalid compressor type")}function T(e){var t=y(e.input);function n(e){return e.map((function(e){if("copy"===e.type)return"(".concat(e.p+1,", ").concat(e.l,")");var t=String.fromCodePoint(e.symbol);return"(".concat(t,", 0)")}))}if("lz77"===e.settings.type){var r=Object(j.a)(C(t));return Object(M.jsx)(b.a,{style:{height:"100%"},children:Object(M.jsxs)(b.a.Body,{children:[Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:n(r).join(", ")})}),Object(M.jsx)(h.a,{children:Object(M.jsxs)(x.a,{children:["z = ",r.length]})})]})})}if("lz-sw"===e.settings.type){var c,i=e.settings.windowSize,a=void 0===i||isNaN(i)?void 0:Object(j.a)(L(t,i));return Object(M.jsx)(b.a,{style:{height:"100%"},children:Object(M.jsxs)(b.a.Body,{children:[Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:Object(M.jsx)(W,{})})}),Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:n(a||[]).join(", ")})}),Object(M.jsx)(h.a,{children:Object(M.jsxs)(x.a,{children:["z = ",null!==(c=null===a||void 0===a?void 0:a.length)&&void 0!==c?c:"?"]})})]})})}if("rlz"===e.settings.type){var s,l=e.settings.reference,o=y(l),d=Object(j.a)(S(t,o));return Object(M.jsx)(b.a,{style:{height:"100%"},children:Object(M.jsxs)(b.a.Body,{children:[Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:function(e){return e.map((function(e){if("copy"===e.type)return"(".concat(e.p+1,", ").concat(e.l,")");var t=String.fromCodePoint(e.symbol);return"(".concat(t,", 0)")}))}(d).join(", ")})}),Object(M.jsx)(h.a,{children:Object(M.jsxs)(x.a,{children:["z = ",null!==(s=null===d||void 0===d?void 0:d.length)&&void 0!==s?s:"?"," (+ ",l.length,")"]})})]})})}if("rlz-pref"===e.settings.type){var p,O=P(t,e.settings.prefixLength),f=Object(u.a)(O,2),v=f[0],g=f[1],m=[].concat(Object(j.a)(v),Object(j.a)(g));return Object(M.jsx)(b.a,{style:{height:"100%"},children:Object(M.jsxs)(b.a.Body,{children:[Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:n(m).join(", ")})}),Object(M.jsx)(h.a,{children:Object(M.jsxs)(x.a,{children:["z = ",null!==(p=null===m||void 0===m?void 0:m.length)&&void 0!==p?p:"?"]})})]})})}if("relz"===e.settings.type){var z,k=A(t,e.settings.prefixLength);return Object(M.jsx)(b.a,{style:{height:"100%"},children:Object(M.jsxs)(b.a.Body,{children:[Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:n(k.phrases).join(", ")})}),Object(M.jsx)(h.a,{children:Object(M.jsxs)(x.a,{children:["z = ",null!==(z=null===k||void 0===k?void 0:k.phrases.length)&&void 0!==z?z:"?"]})})]})})}if("relz-rec"===e.settings.type){var w,R=e.settings,B=I(t,R.prefixLength,R.recursionLimit);return Object(M.jsx)(b.a,{style:{height:"100%"},children:Object(M.jsxs)(b.a.Body,{children:[Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:n(B).join(", ")})}),Object(M.jsx)(h.a,{children:Object(M.jsxs)(x.a,{children:["z = ",null!==(w=null===B||void 0===B?void 0:B.length)&&void 0!==w?w:"?"]})})]})})}throw new Error("invalid compressor type")}function q(){var e=Object(r.useState)("AAABBBCCCC"),t=Object(u.a)(e,2),n=t[0],c=t[1],i=P(y(n),4),a=Object(u.a)(i,2),l=a[0],o=a[1],p=[].concat(Object(j.a)(l),Object(j.a)(o)),O=(function(e,t){for(var n="\\begin{tabular}{c c c}\n    \\toprule\n    $i$ & Input    & $f_i = (p_i, l_i)$ \\\\\n    \\midrule\n    & \n    \\begin{tikzpicture}[baseline=-2]\n",r=0;r<e.length;r++)n+="        \\node[index] (".concat(r+1,")"),r>0&&(n+=" [right of=".concat(r,"]")),n+=" {".concat(r+1,"};\n");n+="    \\end{tikzpicture}\n    & \\\\\n";for(var c=0,i=0;i<t.length;i++){var a=t[i];n+="    ".concat(i+1," &\n        \\begin{tikzpicture}[baseline=-2]\n");for(var s=0;s<e.length;s++)n+="            \\node[squarednode",s<c&&(n+=", used"),n+="] (".concat(s+1,")"),s>0&&(n+=" [right of=".concat(s,"]")),n+=" {".concat(e[s],"};\n");n+="            \\node[fit=";for(var l=0;l<a.l;l++)n+="(".concat(c+l+1,")");n+=", current]{};\n",n+="            \\addvmargin{1mm};\n        \\end{tikzpicture}\n            & ","literal"===a.type?n+="(".concat(a.symbol,", 0) \\\\\n"):n+="(".concat(a.p+1,", ").concat(a.l,") \\\\\n"),c+=a.l}}(n,p),Object(r.useState)("lz77")),f=Object(u.a)(O,2),v=f[0],g=f[1],m=Object(r.useState)([F("lz77"),F("lz-sw"),F("rlz"),F("rlz-pref"),F("relz"),F("relz-rec")]),z=Object(u.a)(m,2),k=z[0],w=z[1];return Object(M.jsx)(M.Fragment,{children:Object(M.jsxs)(s.a,{children:[Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:Object(M.jsx)(b.a,{})})}),Object(M.jsx)(h.a,{children:Object(M.jsx)(x.a,{children:Object(M.jsx)(b.a,{children:Object(M.jsxs)(b.a.Body,{children:["Input:"," ",Object(M.jsx)("input",{type:"text",onChange:function(e){return c(e.target.value)},value:n})]})})})}),Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{lg:"6",children:Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{children:Object(M.jsx)("h1",{children:"Compressors"})}),Object(M.jsx)(x.a,{children:Object(M.jsxs)(Z.a,{as:E.a,children:[Object(M.jsx)(d.a,{onClick:function(){w([].concat(Object(j.a)(k),[F(v)]))},children:"Add "+G[v].title}),Object(M.jsx)(Z.a.Toggle,{split:!0}),Object(M.jsxs)(Z.a.Menu,{children:[Object(M.jsx)(Z.a.Item,{onClick:function(){return g("lz77")},children:"LZ"}),Object(M.jsxs)(Z.a.Item,{onClick:function(){return g("lz-sw")},children:["LZ with sliding window"," "]}),Object(M.jsxs)(Z.a.Item,{onClick:function(){return g("rlz")},children:[" ","RLZ"]}),Object(M.jsx)(Z.a.Item,{onClick:function(){return g("rlz-pref")},children:"RLZ with prefix"}),Object(M.jsx)(Z.a.Item,{onClick:function(){return g("relz")},children:"ReLZ"}),Object(M.jsx)(Z.a.Item,{onClick:function(){return g("relz-rec")},children:"Recursive ReLZ"})]})]})})]})}),Object(M.jsx)(x.a,{lg:"6",children:Object(M.jsx)("h1",{children:"Outputs"})})]}),k.map((function(e,t){return Object(M.jsxs)(h.a,{className:"mt-3",children:[Object(M.jsx)(x.a,{lg:"6",children:Object(M.jsx)(N,{current:e,onChange:function(e){return w(k.map((function(n,r){return t===r?e:n})))}})}),Object(M.jsx)(x.a,{lg:"6",children:Object(M.jsx)(T,{settings:e,input:n})})]})}))]})})}var D=n(14),Y=n(18),$="#E1BE6A",_="#40B0A6";function J(){return Object(M.jsxs)("defs",{children:[Object(M.jsx)("marker",{id:"arrowhead",markerWidth:"100",markerHeight:"7",refX:"9",refY:"3.5",orient:"auto",children:Object(M.jsx)("polygon",{points:"0 0, 10 3.5, 0 7"})}),Object(M.jsxs)("linearGradient",{id:"split-color",gradientTransform:"rotate(45)",children:[Object(M.jsx)("stop",{offset:"75%","stop-color":$}),Object(M.jsx)("stop",{offset:"75%","stop-color":_})]})]})}function Q(e){var t=e.x1,n=e.x2,r=e.y,c=n-t;return Object(M.jsx)("path",{d:"M ".concat(t," ").concat(r," v -20 h ").concat(c," v 19"),"marker-end":"url(#arrowhead)",stroke:"black",fill:"none"})}function X(e){var t=e.x1,n=e.y1,r=e.x2,c=e.y2;if(e.straight){var i=n<c?20:-20,a=n<c?20:-20;return Object(M.jsx)("path",{d:"M ".concat(t," ").concat(n," v ").concat(i," L ").concat(r," ").concat(c-20," v ").concat(a),"marker-end":"url(#arrowhead)",stroke:"black",fill:"none"})}var s=r-t,l=(c-n)/2,o=c<n?l:-l,j=c<n?l:-l;return Object(M.jsx)("path",{d:"m ".concat(t," ").concat(n," v ").concat(o," h ").concat(s," v ").concat(j),"marker-end":"url(#arrowhead)",stroke:"black",fill:"none"})}function K(e){var t=e.x,n=e.y,r=e.text,c=e.color,i=e.w||30,a=e.h||30,s="source"===c?_:"target"===c?$:"source-target"===c?"url(#split-color)":"none";return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("rect",{x:t,y:n,width:i,height:a,fill:s,stroke:"black"}),Object(M.jsx)("foreignObject",{x:t,y:n,width:i,height:a,children:Object(M.jsx)("div",{style:{overflowY:"auto",textAlign:"center",verticalAlign:"middle",lineHeight:"".concat(a,"px"),userSelect:"none"},children:r})})]})}function U(e){var t=e.x1,n=e.y1,r=e.x2,c=e.y2,i=e.w,a=e.q,s=t-r,l=n-c,o=Math.sqrt(s*s+l*l),j=t+a*i*(l/=o),u=n-a*i*(s/=o),d=t-.25*o*s+(1-a)*i*l,b=n-.25*o*l-(1-a)*i*s,h=t-.5*o*s+i*l,x=n-.5*o*l-i*s,p=r+a*i*l,O=c-a*i*s,f=t-.75*o*s+(1-a)*i*l,v=n-.75*o*l-(1-a)*i*s,g="M ".concat(t," ").concat(n," Q ").concat(j," ").concat(u," ").concat(d," ").concat(b," T ").concat(h," ").concat(x," M ").concat(r," ").concat(c," Q ").concat(p," ").concat(O," ").concat(f," ").concat(v," T ").concat(h," ").concat(x);return Object(M.jsx)("path",{d:g,stroke:"black",fill:"none"})}function V(e){var t=e.x,n=e.y,r=e.text;return Object(M.jsx)("foreignObject",{x:t,y:n,width:"60",height:"40",children:Object(M.jsx)("div",{style:{overflowY:"auto",textAlign:"center",verticalAlign:"middle",lineHeight:"40px",userSelect:"none",transform:"rotate(-45deg)"},children:r})})}function ee(e){var t,n=e.x1,r=e.x2,c=e.y,i=e.p,a=e.l,s=null!==(t=e.w)&&void 0!==t?t:50;return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(U,{x1:n,x2:r,y1:c,y2:c,w:10,q:.6}),Object(M.jsx)("foreignObject",{x:n+Math.abs(r-n)/2-s/2,y:c,width:s,height:"40",children:Object(M.jsx)("div",{style:{overflowY:"auto",textAlign:"center",verticalAlign:"middle",lineHeight:"40px",userSelect:"none"},children:"(".concat(i,", ").concat(a,")")})})]})}function te(e){var t,n,r=e.data,c=e.currentPhrase,i=r.input,a=r.phrases,s=new Array(i.length).fill("none");if(void 0!==c&&c<a.length){var l=a[c];if("copy"===l.type){for(var o=0;o<l.l;o++)s[l.p+o]="source";n=l.p}var j=Object(m.sum)(Object(m.take)(a,c).map((function(e){return e.l})));t=j;for(var u=0;u<l.l;u++)s[j+u]="none"===s[j+u]?"target":"source-target"}var d=[],b=[];if(void 0!==c){var h=0;Object(m.take)(a,c+1).forEach((function(e){"literal"===e.type?d.push({x:30*h,y:90,text:"(".concat(String.fromCodePoint(e.symbol),",0)")}):1===e.l?d.push({x:30*h,y:90,text:"(".concat(e.p,",").concat(e.l,")")}):b.push(Object(Y.a)({x1:30*h+22,x2:30*h+30*e.l+18,y:90},e)),h+=e.l}))}return Object(M.jsxs)("svg",{height:"100%",width:"100%",children:[Object(M.jsx)(J,{}),i.split("").map((function(e,t){return Object(M.jsx)(K,{x:30*t+20,y:50,text:e,color:s[t]})})),void 0!==t&&void 0!==n&&Object(M.jsx)(Q,{x1:30*t+35,x2:30*n+35,y:50}),d.map((function(e){return Object(M.jsx)(V,Object(Y.a)({},e))})),b.map((function(e){return Object(M.jsx)(ee,Object(Y.a)({},e))}))]})}function ne(e){var t,n,r=e.data,c=e.currentPhrase,i=r.input,a=r.reference,s=r.phrases,l=new Array(i.length).fill("none"),o=new Array(a.length).fill("none");if(void 0!==c&&c<s.length){var j=s[c];if("copy"===j.type){for(var u=0;u<j.l;u++)o[j.p+u]="source";n=j.p}var d=Object(m.sum)(Object(m.take)(s,c).map((function(e){return e.l})));t=d;for(var b=0;b<j.l;b++)l[d+b]="target"}var h=[],x=[];if(void 0!==c){var p=0;Object(m.take)(s,c+1).forEach((function(e){"literal"===e.type?h.push({x:30*p,y:130,text:"(".concat(String.fromCodePoint(e.symbol),",0)")}):1===e.l?h.push({x:30*p,y:130,text:"(".concat(e.p,",").concat(e.l,")")}):x.push(Object(Y.a)({x1:30*p+22,x2:30*p+30*e.l+18,y:130},e)),p+=e.l}))}return Object(M.jsxs)("svg",{height:"200",width:"100%",children:[Object(M.jsx)(J,{}),a.split("").map((function(e,t){return Object(M.jsx)(K,{x:30*t+20,y:10,text:e,color:o[t]})})),i.split("").map((function(e,t){return Object(M.jsx)(K,{x:30*t+20,y:90,text:e,color:l[t]})})),void 0!==t&&void 0!==n&&Object(M.jsx)(X,{x1:30*t+35,x2:30*n+35,y1:90,y2:50}),h.map((function(e){return Object(M.jsx)(V,Object(Y.a)({},e))})),x.map((function(e){return Object(M.jsx)(ee,Object(Y.a)({},e))}))]})}function re(e){var t,n,r=e.data,c=e.currentPhrase,i=r.input,a=r.phrases,s=r.firstPassPhrases,l=r.metaSymbolPhrases,o=c===r.stepsCount,j=new Array(i.length).fill("none");if(void 0!==c&&c<s.length){var d=s[c];if("copy"===d.type){for(var b=0;b<d.l;b++)j[d.p+b]="source";n=d.p}var h=Object(m.sum)(Object(m.take)(s,c).map((function(e){return e.l})));t=h;for(var x=0;x<d.l;x++)j[h+x]="none"===j[h+x]?"target":"source-target"}var p=[],O=[];if(void 0!==c){var f=0;Object(m.take)(s,c+1).forEach((function(e){"literal"===e.type?p.push({x:30*f,y:90,text:"(".concat(String.fromCodePoint(e.symbol),",0)")}):1===e.l?p.push({x:30*f,y:90,text:"(".concat(e.p,",").concat(e.l,")")}):O.push(Object(Y.a)({x1:30*f+22,x2:30*f+30*e.l+18,y:90},e)),f+=e.l}))}var v=[];if(c===s.length){var g=0;s.forEach((function(e,t){v.push([30*g+35+15*(e.l-1),30*t+35]),g+=e.l}))}var y,z,k=c&&c>=s.length?r.metaSymbols.map((function(e){return String(e)})):[],w=new Array(k.length).fill("none"),C=void 0!==c&&c>s.length?Math.min(c-s.length-1,l.length-1):void 0;if(void 0!==c&&void 0!==C&&c<s.length+l.length+1){var L=l[C];if("copy"===L.type){for(var S=0;S<L.l;S++)w[L.p+S]="source";z=L.p}var P=Object(m.sum)(Object(m.take)(l,C).map((function(e){return e.l})));y=P;for(var R=0;R<L.l;R++)w[P+R]="none"===w[P+R]?"target":"source-target"}if(void 0!==C){var B=0;Object(m.take)(l,C+1).forEach((function(e,t){"literal"===e.type?p.push({x:30*B,y:300,text:"(".concat(k[t],",0)")}):1===e.l?p.push({x:30*B,y:300,text:"(".concat(e.p,",").concat(e.l,")")}):O.push(Object(Y.a)({x1:30*B+22,x2:30*B+30*e.l+18,y:300},e)),B+=e.l}))}var A=[];if(void 0!==c&&c===r.stepsCount){var I=0,Z=0;Object(m.zip)(a,l).forEach((function(e,t){var n=Object(u.a)(e,2),r=n[0],c=n[1];r&&c&&("literal"===r.type?p.push({x:30*I,y:145,text:"(".concat(String.fromCodePoint(r.symbol),",0)")}):1===r.l?p.push({x:30*I,y:145,text:"(".concat(r.p,",").concat(r.l,")")}):O.push(Object(Y.a)({x1:30*I+22,x2:30*I+30*r.l+18,y:145},r)),A.push([30*Z+35+15*(c.l-1),30*I+35+15*+(r.l-1)]),I+=r.l,Z+=null===c||void 0===c?void 0:c.l)}))}return Object(M.jsxs)("svg",{height:"500",width:"100%",children:[Object(M.jsx)(J,{}),i.split("").map((function(e,t){return Object(M.jsx)(K,{x:30*t+20,y:50,text:e,color:j[t]})})),void 0!==t&&void 0!==n&&Object(M.jsx)(Q,{x1:30*t+35,x2:30*n+35,y:50}),p.map((function(e){return Object(M.jsx)(V,Object(Y.a)({},e))})),O.map((function(e){return Object(M.jsx)(ee,Object(Y.a)({},e))})),v.map((function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return Object(M.jsx)(X,{x1:n,y1:130,x2:r,y2:259,straight:!0})})),k.map((function(e,t){return Object(M.jsx)(K,{x:30*t+20,y:260,text:e,color:w[t]})})),void 0!==y&&void 0!==z&&Object(M.jsx)(Q,{x1:30*y+35,x2:30*z+35,y:260}),o&&Object(M.jsx)("line",{x1:"20",y1:"132",x2:30*i.length+20,y2:"132",stroke:"black"}),o&&Object(M.jsx)("line",{x1:"20",y1:"135",x2:30*i.length+20,y2:"135",stroke:"black"}),A.map((function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return Object(M.jsx)(X,{x1:n,y1:260,x2:r,y2:220,straight:!0})}))]})}function ce(){var e,t=Object(r.useState)("ABCCDBCCABDD"),n=Object(u.a)(t,2),c=n[0],i=n[1],a=Object(r.useState)(!1),s=Object(u.a)(a,2),l=(s[0],s[1],Object(r.useState)()),o=Object(u.a)(l,2),p=o[0],O=o[1],f=Object(r.useState)("lz77"),v=Object(u.a)(f,2),g=v[0],z=v[1],k=G[g],w=Object(r.useState)(""),L=Object(u.a)(w,2),P=L[0],R=L[1],B=Object(r.useState)(5),I=Object(u.a)(B,2),Z=I[0],E=I[1],H=Object(r.useState)(5),W=Object(u.a)(H,2),F=W[0],N=W[1],T=Object(r.useState)(5),q=Object(u.a)(T,2),$=q[0],_=q[1],J=function(e,t,n){var r=y(t);if("lz77"===e){var c=Object(j.a)(C(r));return{type:"lz77",input:t,phrases:c,stepsCount:c.length}}if("rlz"===e){var i=n.reference,a=y(i),s=Object(j.a)(S(r,a));return{type:"rlz",input:t,reference:i,phrases:s,stepsCount:s.length}}if("relz"===e){var l=A(r,n.prefixSize);return Object(Y.a)(Object(Y.a)({type:"relz",input:t,prefixLength:n.prefixSize},l),{},{stepsCount:l.firstPassPhrases.length+l.metaSymbolPhrases.length+2})}}(g,c,{reference:P,windowSize:Z,prefixSize:F,recursionLimit:$});return Object(r.useEffect)((function(){void 0!==p&&void 0!==J&&O(Math.min(null===J||void 0===J?void 0:J.stepsCount,p))}),[J,null===J||void 0===J?void 0:J.stepsCount,p]),Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(h.a,{className:"mt-5",children:Object(M.jsx)(x.a,{children:Object(M.jsxs)(b.a,{children:[Object(M.jsx)(b.a.Header,{children:"Settings"}),Object(M.jsx)(b.a.Body,{children:Object(M.jsxs)(D.a,{children:[Object(M.jsxs)(D.a.Group,{children:[Object(M.jsx)(D.a.Label,{children:"Input String"}),Object(M.jsx)(D.a.Control,{value:c,onChange:function(e){return i(e.target.value)}})]}),Object(M.jsxs)(D.a.Row,{children:[Object(M.jsx)(x.a,{children:Object(M.jsxs)(D.a.Group,{children:[Object(M.jsx)(D.a.Label,{children:"Compression Algorithm"}),Object(m.values)(G).map((function(e){return Object(M.jsx)(D.a.Check,{label:e.title,name:"compressor-group",type:"radio",checked:g===e.type,onChange:function(){return z(e.type)}})}))]})}),Object(M.jsxs)(x.a,{children:[k.needsReference&&Object(M.jsxs)(D.a.Group,{children:[Object(M.jsx)(D.a.Label,{children:"Reference"}),Object(M.jsx)(D.a.Control,{placeholder:"Reference String",value:P,onChange:function(e){return R(e.target.value)}})]},"reference-string"),k.needsPrefixSize&&Object(M.jsxs)(D.a.Group,{children:[Object(M.jsx)(D.a.Label,{children:"Prefix Size"}),Object(M.jsx)(D.a.Control,{type:"number",value:F,onChange:function(e){return N(parseInt(e.target.value))}})]}),k.needsWindowSize&&Object(M.jsxs)(D.a.Group,{children:[Object(M.jsx)(D.a.Label,{children:"Window Size"}),Object(M.jsx)(D.a.Control,{type:"number",value:Z,onChange:function(e){return E(parseInt(e.target.value))}})]}),k.needsRecursionLimit&&Object(M.jsxs)(D.a.Group,{children:[Object(M.jsx)(D.a.Label,{children:"Recursion Limit"}),Object(M.jsx)(D.a.Control,{type:"number",value:$,onChange:function(e){return _(parseInt(e.target.value))}})]})]})]})]})})]})})}),Object(M.jsx)(h.a,{className:"mt-5",children:Object(M.jsx)(x.a,{children:Object(M.jsx)(b.a,{children:Object(M.jsxs)(b.a.Body,{children:["lz77"===(null===J||void 0===J?void 0:J.type)&&Object(M.jsx)(te,{data:J,currentPhrase:p}),"rlz"===(null===J||void 0===J?void 0:J.type)&&Object(M.jsx)(ne,{data:J,currentPhrase:p}),"relz"===(null===J||void 0===J?void 0:J.type)&&Object(M.jsx)(re,{data:J,currentPhrase:p})]})})})}),Object(M.jsxs)(h.a,{children:[Object(M.jsx)(x.a,{md:"1",children:Object(M.jsx)(d.a,{disabled:void 0!==p&&p>=(null!==(e=null===J||void 0===J?void 0:J.stepsCount)&&void 0!==e?e:0),onClick:function(){return O(void 0===p?0:p+1)},children:"Next"})}),Object(M.jsx)(x.a,{md:"1",children:Object(M.jsx)(d.a,{disabled:void 0===p,onClick:function(){return O(void 0===p||0===p?void 0:p-1)},children:"Previous"})}),Object(M.jsxs)(x.a,{children:["Step ",p," / ",null===J||void 0===J?void 0:J.stepsCount]})]})]})}var ie=n(51),ae=n(41);var se=function(){return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(ie.a,{bg:"dark",variant:"dark",children:Object(M.jsxs)(s.a,{children:[Object(M.jsx)(ie.a.Brand,{href:"#home",children:"Lempel-Ziv Playground"}),Object(M.jsxs)(ae.a,{className:"mr-auto",children:[Object(M.jsx)(ae.a.Link,{to:"/slides",as:l.b,children:"Slides"}),Object(M.jsx)(ae.a.Link,{to:"/compare",as:l.b,children:"Compare"}),Object(M.jsx)(ae.a.Link,{href:"#pricing",children:"Pricing"})]})]})}),Object(M.jsx)(s.a,{children:Object(M.jsxs)(o.c,{children:[Object(M.jsx)(o.a,{exact:!0,path:"/compare",children:Object(M.jsx)(q,{})}),Object(M.jsx)(o.a,{exact:!0,path:"/slides",children:Object(M.jsx)(ce,{})})]})})]})},le=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,77)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),i(e),a(e)}))};a.a.render(Object(M.jsx)(c.a.StrictMode,{children:Object(M.jsx)(l.a,{children:Object(M.jsx)(se,{})})}),document.getElementById("root")),le()}},[[72,1,2]]]);
//# sourceMappingURL=main.e95c3b5c.chunk.js.map