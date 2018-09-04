import $ from 'jquery';
class Redirect{
    constructor(){
        var eventposted=0;
        this.submit = $('input.submit');
        this.event();
    }
    event(){
        this.submit.click(function() {
            window.setInterval(foo, 300);
          });
    }
    foo(){
        if(($(".form-submission-text").is(':visible')) && (eventposted==0)){
          window.location = "<b>https://answers.squarespace.com/questions/56182/after-a-successful-form-submission-how-do-i-redirect-to-another-page.html</b>";
          eventposted=1;
        }
      }
}
 export default Redirect;




