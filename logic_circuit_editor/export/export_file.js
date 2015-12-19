/*window.onload = function()
{
	//export_file( document.getElementById("link") );
}*/

function export_file( link )
{

	//alert("export_file.js");

	$.ajax({
        async: true,
		type: "POST",
		url: "./export/export_file.php",
		data: {"date": document.getElementById("output_area").value },

        success: function(data){
			//alert(data);
			var url2 = data;
			link.setAttribute("href",url2);
			//alert(link);
		},
		
		error: function(){
			alert("error");
		}
 	});
}

