var TABLET_ITEMS = [], TABLET_LIST = {}, TABLET_EMC = 0, TABLET_PAGE = 0, TABLET_CONTAINER = new UI.Container();

Saver.addSavesScope("EE2Tablet",
function read(scope){
  TABLET_ITEMS = [];
  TABLET_LIST = {};
  TABLET_EMC = 0;
  TABLET_PAGE = 0;
  TABLET_CONTAINER = new UI.Container();
  
  if(scope && scope.items && scope.learned){
    for(i in scope.items){
      TABLET_ITEMS.push(scope.items[i]);
    }
	TABLET_LIST = scope.learned;
	TABLET_EMC = Number(scope.emc);
	TABLET_CONTAINER = scope.cont;
  }
},
function save(){
  return {
    items: TABLET_ITEMS,
    learned: TABLET_LIST,
    emc: String(TABLET_EMC),
    cont: TABLET_CONTAINER
  };
});