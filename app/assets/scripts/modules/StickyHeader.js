import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';
class StickyHeader{
 constructor(){
  this.activeLink = $('.active-link');
  this.headerLinks = $('.primary-nav a');
  this.activeLinkWaypoint();
  this.addSmoothScroling();
    }
    addSmoothScroling(){
        this.headerLinks.smoothScroll();
    };
    activeLinkWaypoint(){
        var that = this;
        this.activeLink.each(function(){
            var  currentLink = this;
            new Waypoint({
                element:currentLink,
                handler: function(direction){
                    if(direction== "down"){
                 var matchingLink = $(currentLink).attr('data-matching-link');
                 that.headerLinks.removeClass('link-is-visible');
                 $(matchingLink).addClass('link-is-visible');
                    }
                },
                offset: '46%'
            });
            new Waypoint({
                element:currentLink,
                handler: function(direction){
                    if(direction== "up"){
                 var matchingLink = $(currentLink).attr('data-matching-link');
                 that.headerLinks.removeClass('link-is-visible');
                 $(matchingLink).addClass('link-is-visible');
                    }
                },
                offset: '-10%'
            });
        });
    }
}
export default StickyHeader;