function redraw() {
  $('.grid').empty();
  $('.cells-foreground').empty();
  
  var mapper = getInput();
  var cells = buildCells(mapper);
  $('.grid').append(cells);
  $('.cells-foreground').append(cells);


  var totalCellWidth = mapper.cellWidth + (mapper.cellBorder * 2) + (mapper.cellSpacing * 2)
  var gridWidthInPx = mapper.width * totalCellWidth
  var adjustPadding = mapper.cellSpacing * 2

  $('.grid').css('background-color', mapper.backgroundColor);
  $('.grid').css('padding',adjustPadding);
  $('.grid').css('border-color', mapper.borderColor);
  $('.grid').css('border-width', mapper.gridBorder);
  $('.grid').css('width', gridWidthInPx);
  $('.cells-foreground').css('padding',adjustPadding);
  $('.cells-foreground').css('border-width', mapper.gridBorder);
  $('.cells-foreground').css('width', gridWidthInPx);
  $('.push').css('width', $('.wrap').css('width'));

  $('.cells-foreground .cell').each(function() {
    $(this).css('background-color', mapper.cellForegroundColor);
  });

}

function buildCells(mapper) {
  var out = '';
  var counter = 0;
  for ( h = 0; h < mapper.height; h++) {
    var thisRow = 'mapper-row-' + h;
    out += '<div id="' + thisRow + '" style=" height:' + (mapper.cellHeight + (mapper.cellSpacing * 2) + (mapper.cellBorder * 2)) + 'px;">';
    for ( w = 0; w < mapper.width; w++) {
      out += '<div class="cell val-' + mapper.cells[counter] + ' mapper-col-' + w + '" style="background-color:' + mapper.cellBackgroundColor + 
      '; border-color:' + mapper.borderColor + 
      '; border-width:' + mapper.cellBorder + 
      'px; width:' + mapper.cellWidth + 
      'px; height:' + mapper.cellHeight + 
      'px; margin:' + mapper.cellSpacing + 
      'px;">&nbsp;</div>';
      counter++;
    }
    out += '</div>';
  }
  return out;
}

function getInput() {
  mapper = {};
  mapperInput = $('.mapper-input').val().split(/\s*[\s,]\s*/)
  mapper.width = Number(mapperInput[0])
  mapper.height = Number(mapperInput[1])
  mapper.backgroundColor = mapperInput[2]
  mapper.cellForegroundColor = mapperInput[3]
  mapper.cellBackgroundColor = mapperInput[4]
  mapper.borderColor = mapperInput[5]
  mapper.cellWidth = Number(mapperInput[6])
  mapper.cellHeight = Number(mapperInput[7])
  mapper.cellSpacing = Number(mapperInput[8])
  mapper.gridBorder = Number(mapperInput[9])
  mapper.cellBorder = Number(mapperInput[10])
  mapperInput.splice(0,11)
  mapper.cells = mapperInput
  return mapper
}

$('.mapper-input').bind('input propertychange', function () {
  redraw()
});

$(function() {
  $('.mapper-input').val($('pre.default').html());
  redraw()
});