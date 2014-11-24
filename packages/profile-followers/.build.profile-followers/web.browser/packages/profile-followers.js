(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/profile-followers/template.profile_followers.js                            //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
                                                                                       // 1
Template.__checkName("profileFollowers");                                              // 2
Template["profileFollowers"] = new Template("Template.profileFollowers", (function() { // 3
  var view = this;                                                                     // 4
  return HTML.Raw('<section id="section-followers" class="tab-pane followers fade row m-top-30">\n    <div class="card col-sm-6 row-padding">\n      <div class="following row p-all-10">\n        <div class="col-md-8">\n          <div class="avatar pull-left">\n            <img class="img-circle team-img pull-left m-right-10" src="../../images/profile/mike.jpg">\n          </div>\n          <p class="h4 raleway-light accent m-top-0 m-bottom-025 p-left-35">Mike Allen</p>\n          <p class="h6 raleway-semibold text text-uppercase spacing-125 m-top-0 m-bottom-025 p-left-525 lh-180">executive vp &amp; director of sales</p>\n        </div>\n\n        <div class="col-md-4">\n          <a href="#" class="follow  m-right-10">\n            <button class="btn btn-block btn-small btn-accent raleway-semibold white text-uppercase spacing-0625 small">follow</button>\n          </a>\n          <a href="#" class="unfollow m-right-10 raleway-semibold accent text-uppercase spacing-0625">\n            <p class=" raleway-semibold accent text-uppercase spacing-0625 no-transition text-center">\n              <i class="fa fa-check accent"></i>\n              <span class="un">un</span>follow<span class="ing">ing</span>\n            </p>\n          </a>\n        </div>\n      </div>\n      <hr>\n    </div>\n  </section>');
}));                                                                                   // 6
                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
