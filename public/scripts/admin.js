$(function() {

  $("h2#select-all-active").click(function() {
  	$("input.fake-active").click();
  });

  $("h2#select-all-delete").click(function() {
    $("input.check-delete").click();
  });

  $("h2#select-all-delete-sessions").click(function() {
    $("input.check-delete-sessions").click();
  });

  $("h2#select-all-delete-drops").click(function() {
    $("input.check-delete-drops").click();
  });

  $("input.fakecheckbox").click(function() {
    var value = $(this).is(":checked") ? 1 : 0;
    $(this).next().val(value);
  });

});