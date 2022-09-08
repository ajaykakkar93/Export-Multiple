define( [ "qlik"
],
function ( qlik) {

function exportChart(app, ObjId) {
	app.visualization.get(ObjId).then(function(vis) {
		vis.exportData().then(function(link) {
			//////console.log('Download link: ', link);
			//window.open();
			let newTab = window.open();
			newTab.location.href = link;
			//newTab.close();
		});
	});
}
	return {
		initialProperties: {
            exportObjectList: []
        },
		definition : {
			type : "items",
			component : "accordion",
			items: {
				settings: {
					uses: "settings",
					items: {
					
								btnlabel: {
									type: "string",
									ref: "btnlabel",
									label: "Button Label"
									//expression: "optional"
								},
						MyObjectList: {
							type: "array",
                            ref: "exportObjectList",
                            label: "Object ID",
                            itemTitleRef: "label",
                            allowAdd: true,
                            allowRemove: true,
                            addTranslation: "Add Object ID",
                            items: {
								label: {
									type: "string",
									ref: "label",
									label: "Label"
									//expression: "optional"
								}
                            }
						}
					}
				}
			}
		},
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		paint: function ($element,layout) {
			//add your rendering code here
			//console.log(layout);
			$element.html( `
			<button id="btn" style="width: 100%;height: 100%;transition: transform .1s ease-in-out;position: absolute;bottom: 0;left: 0; top: 0;right: 0;margin: auto;cursor: pointer;color: #ffffff;font-weight: bold;background-color: #006580;border: none;" >`+layout.btnlabel+`</button>
			` );
			var app = qlik.currApp();
			$('#btn').click(function(){
				$.each(layout.exportObjectList,function(k,ObjId){
					//console.log(ObjId.label);
					exportChart(app, ObjId.label);
				});
			});
			
			//needed for export
			return qlik.Promise.resolve();
		}
	};

} );


