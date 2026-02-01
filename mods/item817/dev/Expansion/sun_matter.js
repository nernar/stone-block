const SunCore = {

   setModel: function(id) {
      var render = new ICRender.Model();
      var shape = new ICRender.CollisionShape();
      BlockRenderer.setStaticICRender(id, 0, render);

      var model = BlockRenderer.createModel();
      model.addBox(0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, id, 0);
      render.addEntry(model);

      Block.setBlockShape(id, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 });
   }

};
SunCore.SunMatter = {
   value: {},

   setValue: function(id, value) {
      return this.value[id] = value
   },

   getValue: function(id) {
      return this.value[id]
   }

}