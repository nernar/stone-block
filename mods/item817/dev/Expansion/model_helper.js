const ModelHelper = {
   cache: {},

   getByData: function(data, textures) {
      switch (data) {
         case 0:
            return [textures[0], textures[1], textures[2], textures[3], textures[4], textures[5]];
         case 1:
            return [textures[0], textures[1], textures[3], textures[2], textures[5], textures[4]];
         case 2:
            return [textures[0], textures[1], textures[5], textures[4], textures[2], textures[3]];
         case 3:
            return [textures[0], textures[1], textures[4], textures[5], textures[3], textures[2]];
      }

      return textures;
   },
   
   mapMachine: function (x, y, z, id, data, textures) {
        let key = id + ":" + data + ":" + textures[3];
        let render = this.cache[key];
        if (!render) {
            render = new ICRender.Model();
            let model = BlockRenderer.createModel();

            model.addBox(0, 0, 0, 1, 1, 1, this.getByData(data, textures));

            render.addEntry(model);
            this.cache[key] = render;
        }
        BlockRenderer.enableCoordMapping(id, data, render);
        BlockRenderer.mapAtCoords(x, y, z, render);
    }

};
