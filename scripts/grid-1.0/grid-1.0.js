(function ($) {
	'use strict';
	function notNullOrUndefined (data) {
		return data !== null && data !== undefined;
	}
	function getDate(date) {
		var date = new Date(parseInt(date.substr(6)));
		
		return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
	}
	function getNumber(number) {
		return number;
	}
	function formatCellData(options) {
		if (options.model.date === true) {
			return getDate(options.data);
		}
		if (options.model.number === true) {
			return getNumber(options.data);
		}
		
		return options.data;
	}
	function numbersOnly(evt) {
		evt = evt || window.event;
		var charCode = evt.which || evt.keyCode,
			charStr = String.fromCharCode(charCode),
			regex = /[0-9]|\./;
		if (!regex.test(charStr)) {
			return false;
		}
	}
	function getRowModel(model) {
		var rowModel = {
			key: '',
			dataIndex: '',
			hidden: false,
			formatter: {},
			title: '',
			date: false,
			number: false,
			width: null,
			id: ''
		};
		return $.extend({}, model, rowModel);
		
	}
	function resizeGridCells(els) {
		var i,
			len = els.length,
			cellTextSize,
			collWidth = 0;

		for (i = 0; i < len; i += 1) {
			cellTextSize = $(els[i]).find('span').width() + 10;
			collWidth = collWidth < cellTextSize ? cellTextSize : collWidth;
		}
		$(els).css('width', collWidth);
		
		return collWidth;
	}
	function resizeGrid(options) {
		var len = options.model.length,
			i,
			cellCss,
			grid = $('.gridWrapper'),
			gridWidth = 0;
			
		for (i = 0; i < len; i += 1) {
			cellCss = '.colCss' + options.model[i].dataIndex;
			if (!notNullOrUndefined(options.model[i].width)) {
				gridWidth += resizeGridCells($(cellCss));
			} else {
				gridWidth += options.model[i].width;
			}
		}
		
		$(grid).css('width', gridWidth + (11 * len));
	}
	function getColModel(options) {
		var model = [], 
			len = options.model.length, 
			i;
		for (i = 0; i < len; i += 1) {
			model.push(getRowModel({model: options.model[i]}));
		}
		return model;
	}
	function createHeader(options) {
		var header = [],
			i, 
			len = options.model.length;
		header.push('<div class="gridHeaderWrapper">');
		for (i = 0; i < len; i += 1) {
			header.push('<div class="gridHeader gridStyle ');
			header.push('colCss');
			header.push(options.model[i].dataIndex);
			if (options.model[i].hidden) {
				header.push(' hidden');
			}
			header.push('"');
			if (notNullOrUndefined(options.model[i].width)) {
				header.push(' style="width:');
				header.push(options.model[i].width);
				header.push('px;"');
			}
			header.push('>');
			header.push('<span>')
			header.push(options.model[i].title);
			header.push('</span>')
			header.push('</div>');
		}
		header.push('<div class="clear"/>');
		header.push('</div>');
		return header;
	}
	function createEmptyGridRow(options) {
		var i,
			len = options.model.length,
			rowData = [],
			cellData;
		rowData.push("<div class='rowData'>");
		for (i = 0; i < len; i += 1) {
			rowData.push("<div class='gridCell gridStyle ");
			rowData.push('colCss');
			rowData.push(options.model[i].dataIndex);
			if (i + 1 < len) {
				rowData.push(" emptyCell");
			}
			if (options.model[i].hidden) {
				rowData.push(' hidden');
			}
			rowData.push("'");
			if (notNullOrUndefined(options.model[i].width)) {
				rowData.push(" style='width:");
				rowData.push(options.model[i].width);
				rowData.push("px;'");
			}
			rowData.push(">");
			rowData.push('<span>&nbsp;')
			rowData.push('</span>');
			rowData.push("</div>");
		}
		rowData.push("<div class='clear'/>");
		rowData.push("</div>");
		return rowData;
	}
	function createGridRow(options) {
		var i,
			len = options.model.length,
			rowData = [],
			cellData;
		rowData.push("<div class='rowData'>");
		for (i = 0; i < len; i += 1) {
			rowData.push("<div class='gridCell gridStyle ");
			rowData.push('colCss');
			rowData.push(options.model[i].dataIndex);
			if (options.model[i].hidden) {
				rowData.push(' hidden');
			}
			rowData.push("'");
			if (notNullOrUndefined(options.model[i].width)) {
				rowData.push(" style='width:");
				rowData.push(options.model[i].width);
				rowData.push("px;'");
			}
			rowData.push(">");
			cellData = options.data[options.model[i].dataIndex];
			rowData.push('<span>')
			rowData.push(notNullOrUndefined(cellData) ? formatCellData({data: cellData, model: options.model[i]}) : "");
			rowData.push('</span>');
			rowData.push("</div>");
		}
		rowData.push("<div class='clear'/>");
		rowData.push("</div>");
		return rowData;
	}
	function createGridBody(options) {
		var data = $.extend([], options.data),
			len = data.length,
			i, 
			gridBody = [],
			rowCount = 0;
		gridBody.push('<div class="gridBody">');	
		for (i = 0; i < len; i += 1) {
			if (!notNullOrUndefined(options.model.pageSize)){
				gridBody.push(createGridRow({data: data[i], model: options.model.colModel}).join(''));
			} else if (i < (options.model.pageSize * options.model.currentPage)) {
				if (i >= (options.model.pageSize * (options.model.currentPage - 1))) {
					gridBody.push(createGridRow({data: data[i], model: options.model.colModel}).join(''));
					rowCount += 1;
				}
			}
		}
		if (notNullOrUndefined(options.model.pageSize) && rowCount < options.model.pageSize){ 
			for (i = 0, len = options.model.pageSize - rowCount; i < len; i += 1){
				gridBody.push(createEmptyGridRow({model: options.model.colModel}).join(''));
			}
		}
		gridBody.push('</div>');
		return gridBody;
	}
	function createGridFooter (options) {
		var footer = [];
		
		footer.push('<div class="gridFooter gridStyle" >');

		if (notNullOrUndefined(options.model.pageSize)) {
			footer.push('<div class="gridPager">');
			footer.push('<input type="button" class="prev" value="<"');
			if (options.model.currentPage < 2) {
				footer.push(' disabled="disabled" ');
			}
			footer.push(' />');
			footer.push('<input type="text" class="pageIndex" value="');
			footer.push(options.model.currentPage);
			footer.push('" />');
			footer.push('<div class="pagerLabel">');
			footer.push("of ");
			footer.push(Math.round(options.data.length / options.model.pageSize));
			footer.push('</div>');
			footer.push('<input type="button" class="next" value=">" ');
			if ((options.model.currentPage * options.model.pageSize) >= options.data.length) {
				footer.push(' disabled="disabled" ');
			}
			footer.push(' />');
			footer.push("<div class='clear' />");
			footer.push('</div>');
		} else {
			footer.push("<div class='recordCounter'>");
			footer.push(options.data.length);
			footer.push(" of ");
			footer.push(options.data.length);
			footer.push("</div>");
			footer.push("<div class='clear' />");
			footer.push("</div>");
		}
		return footer; 
	}
	function assembleGrid (options) {
		var model = getColModel({model: options.model.colModel}),
			grid = [];
			grid.push('<div class="gridWrapper">');
			grid.push(createHeader({model: options.model.colModel}).join(''));
			grid.push(createGridBody({data: options.data, model: options.model}).join(''));
			grid.push(createGridFooter({data: options.data, model: options.model}).join(''));
			grid.push('</div>');
			
		return grid.join('');
	}
	function attachGridActions ($this) {
		var footer = $('.gridFooter');
		
		$('.prev', footer).unbind('click').bind('click', function () {
			$($this).data.gridOptions.currentPage -= 1;
			$($this).simpleGrid('init', $($this).data.gridOptions);
			
		});
		$('.next', footer).unbind('click').bind('click', function () {
			$($this).data.gridOptions.currentPage += 1;
			$($this).simpleGrid('init', $($this).data.gridOptions);
		});
		$('.pageIndex', footer).unbind('change').bind('change', function () {
			$($this).data.gridOptions.currentPage = $(this).val();
			$($this).simpleGrid('init', $($this).data.gridOptions);
		}).unbind('keypress').bind('keypress', function (evt) {
			return numbersOnly(evt);
		});
		
		
	}
	function createGrid($this) {
		$($this).html(assembleGrid({model: $($this).data.gridOptions, data: $($this).data.gridOptions.data}));
		attachGridActions($this);
		resizeGrid({model: $($this).data.gridOptions.colModel});
		
	}
	var methods = {
		init: function($this) {
			createGrid($this);
		},
		nextPage: function ($this) {
		
		},
		prevPage: function ($this) {
			
		},
		getData: function(options) {
		
		},
		getRow: function(options) {
		
		},
	}
	
	$.fn.simpleGrid = function (method, options) {
		return this.each(function () {
			
		var gridOptions = {
			data: [],
			colModel: [],
			pageSize: null,
			currentPage: 1
		},
		$this = $(this);
		
		if (typeof options === 'object' || ! options) {
			$this.data.gridOptions = $.extend({}, gridOptions, options);
		} 
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply($this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist');
		}
    });
  };
})(jQuery);