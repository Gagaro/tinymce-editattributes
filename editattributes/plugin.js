(function(){

tinymce.PluginManager.add('editattributes', function(editor) {
	function showDialog() {
		var selectedNode = editor.selection.getNode();

		var body = [];

		for (var i = 0 ; i < selectedNode.attributes.length ; i++) {
			var attribute = selectedNode.attributes[i];

			body.push({type: 'textbox', name: attribute.name, size: 40, label: attribute.name, value: attribute.value});
		}
		body.push({
			type: 'container',
			label: 'New attribute',
			layout: 'flex',
			direction: 'row',
			align: 'center',
			spacing: 5,
			items: [
				{name: 'mce_new_name', type: 'textbox', ariaLabel: 'Name'},
				{name: 'mce_new_value', type: 'textbox', ariaLabel: 'Value'},
			]
		});

		editor.windowManager.open({
			title: 'Edit Attributes',
			body: body,
			onsubmit: function(e) {
				editor.undoManager.transact(function() {
					var new_name = e.data['mce_new_name'];
					var new_value = e.data['mce_new_value'];

					delete e.data['mce_new_name'];
					delete e.data['mce_new_value'];

					if (new_name.length > 0) {
						e.data[new_name] = new_value;
					}
					for (key in e.data) {
						editor.dom.setAttribs(selectedNode, e.data);
					}
				});
			}
		});
	}

	//editor.addCommand('mceEditAttributes', showDialog);

	editor.addButton('editattributes', {
		icon: 'anchor',
		tooltip: 'Edit Attributes',
		onclick: showDialog
	});

	editor.addMenuItem('editattributes', {
		icon: 'anchor',
		text: 'Edit Attributes',
		onclick: showDialog
	});
});

}());
