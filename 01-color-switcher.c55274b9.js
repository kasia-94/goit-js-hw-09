const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),o={colorId:null,isActive:!1};t.addEventListener("click",(function(){if(o.isActive)return;o.isActive=!0,o.colorId=setInterval((()=>{document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){clearInterval(o.colorId),o.isActive=!1,console.log("Stop")}));
//# sourceMappingURL=01-color-switcher.c55274b9.js.map
