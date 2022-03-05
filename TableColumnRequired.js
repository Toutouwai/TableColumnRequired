(function($) {

	// Highlight rows with empty required columns
	function highlightErrorRows($inputfield) {
		// Get row and column error data
		var key = $inputfield.data('tcr-key');
		var error_data = ProcessWire.config.TableColumnRequired[key];
		// Does this inputfield have nested tables (multi-row)?
		var is_nested = $inputfield.find('.InputfieldTableHasNested').length;
		error_data.forEach(function(item) {
			var $row = $inputfield.find('.InputfieldTableRowID[value="' + item.id + '"]').closest('tr');
			item.columns.forEach(function(column) {
				// Highlight the <td>
				var $td = $row.find('div.col-' +  column).parent('td');
				$td.addClass('error-required');
				if(is_nested) {
					// Highlight the relevant <th> also
					var $table = $td.closest('table');
					var td_index = $td.parent().find('td').index($td);
					$table.find('th').eq(td_index).addClass('error-required');
				}
			});
		});
	}

	// Highlight on DOM ready
	$(document).ready(function() {
		$('.InputfieldTable[data-tcr-key]').each(function() {
			highlightErrorRows($(this));
		});
	});

	// Highlight when InputfieldTable reloaded
	$(document).on('reloaded', 'li.InputfieldTable[data-tcr-key]', function() {
		highlightErrorRows($(this));
	});

}(jQuery));
