(function(){
  function ready(fn){
    if(document.readyState !== 'loading'){ fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function(){
    var toggle = document.querySelector('[data-mobile-toggle]');
    var mobileNav = document.getElementById('mobile-nav');
    var page = document.body && document.body.dataset ? document.body.dataset.page : null;

    if(page){
      document.querySelectorAll('[data-nav-page="' + page + '"]').forEach(function(link){
        link.classList.add('active');
        if(!link.getAttribute('aria-current')){
          link.setAttribute('aria-current', 'page');
        }
      });
    }

    if(toggle && mobileNav){
      var openIcon = toggle.querySelector('[data-icon-open]');
      var closeIcon = toggle.querySelector('[data-icon-close]');

      toggle.addEventListener('click', function(){
        var isOpen = mobileNav.classList.toggle('is-visible');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.classList.toggle('is-open', isOpen);
        if(openIcon && closeIcon){
          openIcon.hidden = isOpen;
          closeIcon.hidden = !isOpen;
        }
      });

      document.querySelectorAll('#mobile-nav a').forEach(function(link){
        link.addEventListener('click', function(){
          mobileNav.classList.remove('is-visible');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.classList.remove('is-open');
          if(openIcon && closeIcon){
            openIcon.hidden = false;
            closeIcon.hidden = true;
          }
        });
      });

      document.addEventListener('keyup', function(evt){
        if(evt.key === 'Escape' && mobileNav.classList.contains('is-visible')){
          mobileNav.classList.remove('is-visible');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.classList.remove('is-open');
          if(openIcon && closeIcon){
            openIcon.hidden = false;
            closeIcon.hidden = true;
          }
          toggle.focus();
        }
      });
    }
  });
})();
