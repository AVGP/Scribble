RemoteStorage.defineModule('scribbles', function(privateClient, publicClient) {
  privateClient.declareType('scribble', {
    "description": "Markdown document",
    "type": "object",
    "properties": {
      "filename": {
        "type": "string",
        "format": "id"
      },
      "content": {
        "type": "string"
      },
    }
  });

  return {
    exports: {
      saveScribble: function (filename, content) {
        return privateClient.storeObject("scribble", filename, {
          filename: filename,
          content: content
        });
      },
      
      getScribbles: function() {
        return privateClient.getAll("");
      },
      
      loadScribble: function(filename) {
        return privateClient.getObject(filename);
      }
    }
  };
});

remoteStorage.access.claim('scribbles', 'rw');