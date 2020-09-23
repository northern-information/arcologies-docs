function redraw() {
  $('.grid').empty();
  var mapper = getInput();
  var cells = buildCells(mapper);
  $('.grid').append(cells);
  var totalCellWidth = mapper.cellWidth + (mapper.cellSpacing * 2);
  var gridWidthInPx = mapper.width * totalCellWidth;
  var adjustPadding = mapper.cellSpacing * 2;
  $('.grid').css('padding',adjustPadding);
  $('.grid').css('width', gridWidthInPx);
  $('.push').css('width', $('.wrap').css('width'))
  $('.arcology-name').html(mapper.name);
  for(i=0; i<mapper.cells.length; i++){
    var cell = mapper.cells[i].split(' ');
    var c = '.x' + cell[0] + 'y' + cell[1];
    $(c).addClass('structure-' + cell[2]);
    $(c).html('<img src="/assets/images/structures-svg/arcologies-glyphs_' + cell[2] + '.svg" class="glyph" />');
  }
}

function buildCells(mapper) {
  var out = '';
  var counter = 0;
  for ( h = 1; h < mapper.height + 1; h++) {
    var thisRow = 'mapper-row-' + h;
    out += '<div id="' + thisRow + '" style=" height:' + (mapper.cellHeight + (mapper.cellSpacing * 2)) + 'px;">';
    for ( w = 1; w < mapper.width + 1; w++) {
      out += '<div class="cell x' + w + 'y' + h + ' mapper-col-' + w +
      '" style="width:' + mapper.cellWidth + 
      'px; height:' + mapper.cellHeight + 
      'px; margin:' + mapper.cellSpacing + 
      'px;">' + 
      '<img src="/assets/images/structures-svg/arcologies-glyphs_diamond.svg" class="diamond"/>' +
      '</div>';
      counter++;
    }
    out += '</div>';
  }
  return out;
}

function getInput() {
  mapper = {};
  mapperInput = $('.mapper-input').val().split("\n");
  metadata = mapperInput[0];
  metadataStringSplit = metadata.split(" ");
  mapper.width = Number(metadataStringSplit[0]);
  mapper.height = Number(metadataStringSplit[1]);
  mapper.name = metadataStringSplit[2];
  mapper.cellWidth = 40;
  mapper.cellHeight = 40;
  mapper.cellSpacing = 4;
  mapperInput.shift();
  mapper.cells = mapperInput;
  return mapper;
}

$('.mapper-input').bind('input propertychange', function () {
  redraw();
});

$('input[type=radio]').change(function () {
  $('#theme-wrapper').removeClass().addClass(this.value);
});

$(function() {
  $('.mapper-input').val($('pre.default').html());
  redraw();
});