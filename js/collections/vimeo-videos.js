define(['collection', 'models/vimeo-video', 'localstorage'], function (Collection, Model, localstorage) {
  return Collection.extend({
    name: 'vimeoVideos',
    model: Model,
    localStorage: new Backbone.LocalStorage("OurVeryOwnVideoCollection")
  });
});
