(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{48:function(e,t,a){e.exports=a(93)},53:function(e,t,a){},54:function(e,t,a){},87:function(e,t){},90:function(e,t,a){},91:function(e,t,a){},93:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(46),o=a.n(l),i=(a(53),a(13)),c=a(1),s=a(6),d=a(7),u=a(9),p=a(8),m=(a(54),function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container home"},r.a.createElement("h1",null,"Welcome to ",r.a.createElement("span",{className:"rainbow"},"r_e_m_o_t_e"),",",r.a.createElement("span",{className:"smaller"},r.a.createElement("br",null),"a web extension for interfacing with"," ",r.a.createElement("span",{className:"recur"},"r_e_c_u_r")," via OSC.")),r.a.createElement("h2",null,"** Choose your fighter **"),r.a.createElement("ul",{className:"interface-list"},r.a.createElement("li",null,r.a.createElement(i.b,{to:"/keyboard"},"Keyboard")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/shaderparams"},"ShaderParams"))))}}]),a}(r.a.Component)),h=[{letter:"a",display:"<",color:"red"},{letter:"b",display:">",color:"red"},{letter:"c",display:"\u25a0",color:"red"},{letter:"d",size:"double",display:"\u2192",color:"cyan"},{letter:"e",display:"[",FN:"CLR ["},{letter:"f",display:"]",FN:"CLR ]"},{letter:"g",display:"\u2b57",FN:"REC"},{letter:"h",display:"DSPLY",color:"magenta"},{letter:"i",display:"FN",color:"yellow"},{letter:"j",display:"0",FN:"PRV BNK"},{letter:"k",display:"1",FN:"NXT BNK"},{letter:"l",display:"2",FN:"CLR BNK"},{letter:"m",display:"3"},{letter:"n",display:"4"},{letter:"o",display:"5",FN:"MIRROR"},{letter:"p",display:"6",FN:"SHADER"},{letter:"q",display:"7",FN:"FRAMES"},{letter:"r",display:"8",FN:"FEEDBCK"},{letter:"s",display:"9",FN:"SHUTDWN"}],y=a(20),v=a.n(y),f=(a(90),v()()),g=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).handleClick=function(t){var a=e.props.handleFNToggle;f.emit("keyPress",t),"i"===t&&a()},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){f.on("keyPress",(function(e){f.emit("keyPress",e)}))}},{key:"render",value:function(){var e=this,t=this.props.isFNOn,a=this.props,n=a.keySettings,l=a.displayMode,o=n.letter,i=n.display,c=n.size,s=void 0===c?"":c,d=n.color,u=n.FN;return r.a.createElement("div",{className:"keyWrapper ".concat(s),onClick:function(){return e.handleClick(o)}},r.a.createElement("div",{className:"key disable-selection",style:{backgroundColor:t&&"FN"===i?"#888":null},"data-letter":o},r.a.createElement("span",{style:{color:"dev"===l?void 0:d,fontSize:t&&u?"2.4vw":"3.0vw",padding:"DSPLY"===i?"8px 0":null}},"dev"===l?o:t&&u?u:i)))}}]),a}(r.a.Component),b=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={isFNOn:!1,displayMode:"normal"},e.handleFNToggle=function(){var t=e.state.isFNOn;e.setState({isFNOn:!t,displayMode:"FN"})},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.state,a=t.isFNOn,n=t.displayMode;return r.a.createElement(r.a.Fragment,null,h.map((function(t){return r.a.createElement(g,{key:t.letter,displayMode:n,keySettings:t,isFNOn:a,handleFNToggle:e.handleFNToggle})})))}}]),a}(r.a.Component),E=(a(91),a(14)),N=a(29),k=v()(),O=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={values:[0]},e.onChangeHandler=function(t){var a=e.props.paramName;e.setState({values:t}),k.emit("sliderChange",{paramName:a,value:t[0]})},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){k.on("sliderChange",(function(e){k.emit("sliderChange",e)}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{class:"slider",style:{display:"flex",alignItems:"center",height:"100%",flexDirection:"column"}},r.a.createElement(N.Range,{direction:"to top",values:this.state.values,step:.01,min:0,max:1,onChange:function(t){return e.onChangeHandler(t)},renderTrack:function(t){var a=t.props,n=t.children;return r.a.createElement("div",{onMouseDown:a.onMouseDown,onTouchStart:a.onTouchStart,style:Object(E.a)(Object(E.a)({},a.style),{},{flexGrow:1,width:"36px",display:"flex",height:"60vh"})},r.a.createElement("div",{ref:a.ref,style:{width:"10px",height:"100%",borderRadius:"4px",background:Object(N.getTrackBackground)({values:e.state.values,colors:["yellow","#ccc"],min:0,max:1,direction:"to top"}),alignSelf:"center"}},n))},renderThumb:function(e){var t=e.props,a=e.isDragged;return r.a.createElement("div",Object.assign({},t,{style:Object(E.a)(Object(E.a)({},t.style),{},{height:"60px",width:"60px",borderRadius:"30px",backgroundColor:"gray",display:"flex",justifyContent:"center",alignItems:"center"})}),r.a.createElement("div",{style:{width:"16px",height:"5px",backgroundColor:a?"yellow":"#CCC"}}))}}),r.a.createElement("output",{style:{marginTop:"50px",marginBottom:"50px",width:"56px"},id:"output"},this.state.values[0].toFixed(2)))}}]),a}(r.a.Component),F=["shaderparam0","shaderparam1","shaderparam2","shaderparam3"],j=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container shaderparams"},r.a.createElement("h3",null,"ShaderParams"),r.a.createElement("div",{class:"slider-panel"},F.map((function(e){return r.a.createElement(O,{key:e,shader:"shader0",paramName:e})}))))}}]),a}(r.a.Component);var C=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(i.a,null,r.a.createElement(c.c,null,r.a.createElement(c.a,{path:"/keyboard"},r.a.createElement(b,null)),r.a.createElement(c.a,{path:"/shaderparams"},r.a.createElement(j,null)),r.a.createElement(c.a,{path:"/"},r.a.createElement(m,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[48,1,2]]]);
//# sourceMappingURL=main.3aff4eb6.chunk.js.map