define([
  'backbone',
  'views/root',
  'collections/contacts',
  'views/contacts-list/index',
  'views/contacts-list/contact-details',
  'views/vimeo-video-detail-view',
  'views/vimeo-video-view',
  'collections/vimeo-videos',
], function(Backbone, RootView, ContactCollection, ContactListIndexView, ContactListDetailView, VimeoVideoDetailView, VimeoVideoView, VimeoVideos) {
  return Backbone.Router.extend({
    routes: {
      "foo1": "index",
      "foo2/:id": "details",
      "" : "vimeoVideos",
      "videoDetailsView/:id" : "videoDetailsView"
    },
    videoDetailsView: function(id){

      var videoDetailsView = new VimeoVideoDetailView({
        model: VIMEOVIDEOS.vimeoVideosCollection.get(id)
      })

      RootView.getInstance().setView(videoDetailsView)

      $.ajax({
        url: "http://vimeo.com/api/v2/channel/kinetictypography/videos.json" 
      }).done(function(data){

        VIMEOVIDEOS.vimeoVideosCollection.add(data)
        var videosView = new VimeoVideoView({
          collection: VIMEOVIDEOS.vimeoVideosCollection
        });

        RootView.getInstance().setView(videosView);

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
