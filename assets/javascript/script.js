$(function() {
  (function scramble() {
    var o = "";
    var t = ["&gt;", "&lt;"];
    for(i=1;i<5;i++) { o += t[Math.floor(Math.random()*2)]; }
    $(".topography").html(o); setTimeout(scramble, 100);
  })();
});