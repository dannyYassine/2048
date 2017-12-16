/**
 * Created by dannyyassine
 */

const FadeDirective = (function () {
   let directive = {
       link: link,
       restrict: 'A'
   };
   
   function link(scope, element, attr) {
       let indexCount = attr.index;
       let raw = element[0];
       raw.style.opacity = 0.0;
       raw.style.animationDuration = `0.3s`;
       raw.style.animationDelay = `${0.05 * indexCount}s`;
       raw.classList.add('fade-in-scale-bottom');
   }

   return directive;
});

module.exports = FadeDirective;