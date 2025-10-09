(function(){
  function ready(fn){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function(){
    var toggle = document.getElementById('mobile-menu-toggle');
    var mobileNav = document.getElementById('mobile-nav');
    if(toggle && mobileNav){
      toggle.addEventListener('click', function(){
        var hidden = mobileNav.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', String(!hidden));
        var openIcon = document.getElementById('icon-open');
        var closeIcon = document.getElementById('icon-close');
        if(openIcon && closeIcon){
          if(hidden){
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
          } else {
            openIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
          }
        }
      });
    }

    var currentPage = document.body ? document.body.getAttribute('data-page') : null;
    if(currentPage){
      var selector = 'a[data-nav-page="' + currentPage + '"]';
      document.querySelectorAll(selector).forEach(function(link){
        link.classList.add('active-nav');
        link.setAttribute('aria-current', 'page');
      });
    }
  });
})();
