var app = (function () {
	var ROWS = 3;
	var COLS = 3;
	var NUMCELLS = ROWS * COLS;
	var nums = [],
		inners = document.getElementsByClassName('inner'),
		cells = document.getElementsByClassName('cell'),
		initNums = function () {
			for(var i=0; i<NUMCELLS-1; i++) {
				nums[i] = i+1;
			}
		},
		render = function () {
			var table = document.getElementById('field');
			for (var i = 0; i<ROWS; i++) {
				var tr = document.createElement('tr');
				for (var k=0; k<COLS; k++) {
					var td = document.createElement('td');
					td.classList.add('cell');
					td.style.width = 100/COLS + '%';

					if ((COLS*i)+(k+1) < NUMCELLS) {
						td.dataset.index = (COLS*i)+(k+1);
						var div = document.createElement('div');
						div.classList.add('inner');
						div.id = 'inner' + td.dataset.index;
						div.draggable = true;
						td.appendChild(div);
					}
					tr.appendChild(td);
				}
				table.appendChild(tr);
			}
		},
		mix = function () {
			nums.sort(function () {
				return Math.random()-0.5;
			});
		},
		assign = function () {
			initNums();
			mix();
			nums.forEach( function(elem, i) {
				inners[i].innerHTML = elem;
			});
		},
		allowDrop = function (e) {
			e.preventDefault();
		},
		drag = function (e) {
			e.dataTransfer.setData('text', e.target.id);
		},
		drop = function (e) {
			e.preventDefault();
			var data = e.dataTransfer.getData('text');
			var elem = document.getElementById(data);
			console.log(elem);
			function isMovable (t, el) {// function-helper: returns true if you can drop draggable element to empty cell and vice versa.
				var isCurrentRow = (t.parentElement.rowIndex === el.parentElement.parentElement.rowIndex),
					isCurrentCell = (t.cellIndex === el.parentElement.cellIndex),
					isNearCell = Math.abs(t.cellIndex - el.parentElement.cellIndex) === 1,
					isNearRow = Math.abs(t.parentElement.rowIndex - el.parentElement.parentElement.rowIndex) === 1;
				return (isCurrentRow && isNearCell) || (isCurrentCell && isNearRow);
			}
			if (e.target === elem) {
				return;
			}
			if (e.target.classList.contains('inner')) {
				return;
			}
			if (isMovable(e.target, elem)) {
				e.target.appendChild(elem);
			}
			if(isWin()) {
				console.log('you win');
				stop();
			}
		},
		dragNdrop = function () {
			for (var i=0; i<cells.length; i++) {
				var cell = cells[i];
				cell.addEventListener('drop', drop);
				cell.addEventListener('dragover', allowDrop);
			}
			for (var j=0; j<inners.length; j++) {
				var inner = inners[j];
				inner.addEventListener('dragstart', drag);
			}
		},
		isWin = function () {
			var result = false;
			for (var i =0; i<inners.length; i++) {
				if (inners[i].innerHTML !== cells[i].dataset.index) {
					return false;
				}
			}
			return true;
		},
		stop = function () {
			for (var i=0; i<cells.length; i++) {
				var cell = cells[i];
				cell.removeEventListener('drop', drop);
				cell.removeEventListener('dragover', allowDrop);
			}
			for (var j=0; j<inners.length; j++) {
				var inner = inners[j];
				inner.removeEventListener('dragstart', drag);
			}
		};
		init = function () {
			render();
			assign();
			dragNdrop();
		}
		return {
			init: init
		};
}());

app.init();