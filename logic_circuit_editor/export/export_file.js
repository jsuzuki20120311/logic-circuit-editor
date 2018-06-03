function export_file( link )
{
	var content = document.getElementById("output_area").value;
  var blob = new Blob([content], { "type" : "text/plain" });
  window.URL = window.URL || window.webkitURL;
  $(link).prop('download', 'new-file.txt');
  $(link).prop("href", window.URL.createObjectURL(blob));
}
