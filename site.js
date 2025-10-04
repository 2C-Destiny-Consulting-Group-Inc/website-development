(function(){
  "use strict";

  function initMobileNav(){
    var toggle = document.getElementById("mobile-menu-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    if(!toggle || !mobileNav || toggle.dataset.bound === "true") return;
    toggle.addEventListener("click", function(){
      var hidden = mobileNav.classList.toggle("hidden");
      toggle.setAttribute("aria-expanded", String(!hidden));
      var iconOpen = document.getElementById("icon-open");
      var iconClose = document.getElementById("icon-close");
      if(iconOpen && iconClose){ iconOpen.classList.toggle("hidden"); iconClose.classList.toggle("hidden"); }
    });
    toggle.dataset.bound = "true";
  }

  function markActiveNav(){
    try{
      var page = document.body && document.body.getAttribute("data-page");
      if(!page) return;
      document.querySelectorAll("a[data-nav-page]").forEach(function(link){
        if(link.dataset.navPage === page){
          link.classList.add("active");
          link.setAttribute("aria-current","page");
        }
      });
    }catch(e){}
  }

  function attachImageFallbacks(){
    var placeholder = "images/placeholder.svg";
    document.querySelectorAll("img").forEach(function(img){
      if(img.dataset.noFallback === "true") return;
      if(!img.getAttribute("loading")) img.setAttribute("loading","lazy");
      function onErr(){
        if(img.__fallbackApplied) return;
        img.__fallbackApplied = true;
        img.src = placeholder;
        img.removeEventListener("error", onErr);
      }
      img.addEventListener("error", onErr);
    });
  }

  function ready(fn){
    if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", fn); }
    else { fn(); }
  }

  ready(function(){
    initMobileNav();
    markActiveNav();
    attachImageFallbacks();
  });
})();
