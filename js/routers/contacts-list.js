define([
  'backbone',
  'views/root',
  'collections/contacts',
  'views/contacts-list/index',
  'views/contacts-list/contact-details'
], function(Backbone, RootView, ContactCollection, ContactListIndexView, ContactListDetailView) {
  return Backbone.Router.extend({
    routes: {
      "foo1": "index",
      "foo2/:id": "details",
      "" : "vimeoVideos"
    },
    vimeoVideos: function() {
      $.ajax({
        url: "http://vimeo.com/api/v2/channel/kinetictypography/videos.json" 
      }).done(function(data){
        console.dir(data)
      })
    },
    index: function() {
      var contacts = new ContactCollection();
      contacts.fetch();
      var view = new ContactListIndexView({
        collection: contacts
      });
      RootView.getInstance().setView(view);
    },
    details: function(id){
      var contacts = new ContactCollection();
      contacts.fetch();
      console.dir(contacts)
      var model = contacts.get(id)
      var detailView = new ContactListDetailView({
        model: model
      });
      RootView.getInstance().setView(detailView);
    }
  });
}); 
