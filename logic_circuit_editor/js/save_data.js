//====================================================================================================
//@‘®‚ğ®‚¦‚éŠÖ”
//====================================================================================================
function save_data(counter)
{
	document.getElementById("result_read").value = "";

	var type;
	for(var i = 1; i<=14; i++)
	{
		if( i == 1 )
		{
			type = "AND";
		}else if( i == 2 )
		{
			type = "OR";
		}else if( i == 3 )
		{
			type = "NOT";
		}else if( i == 4 )
		{
			type = "NAND";
		}else if( i == 5 )
		{
			type = "NOR";
		}else if( i == 6 )
		{
			type = "EXOR";
		}else if( i == 7 )
		{
                        type = "TEXT";
		}else if( i == 8 )
		{
			type = "LINE";
		}else if( i == 9 )
		{
			type = "In";
		}else if( i == 10 )
		{
			type = "Out";
		}else if( i == 11 )
		{
			type = "RSFF";
		}else if( i == 12 )
		{
			type = "JKFF";
		}else if( i == 13 )
		{
			type = "TFF";
		}else if( i == 14 )
		{
			type = "DFF";
		}

		if( i <= 6 || i>=11 ){
			document.getElementById("result_read").value = document.getElementById("result_read").value + "count_" + type + ":" + counter.get( type )+";";
			for( var j=1 ; j <= counter.get( type ) ; j++ )
			{
				try{
					document.getElementById("result_read").value = document.getElementById("result_read").value + document.getElementById( "g_" + type + "_" + j).getAttribute("id") + ":" + document.getElementById( "g_" + type + "_" + j).getAttribute("transform") + ";";
				}catch(e)
				{
				}
			}
                        //document.getElementById("result_read").value = document.getElementById("result_read").value + "\n";
		}else if( i == 7 ){
                        document.getElementById("result_read").value = document.getElementById("result_read").value + "count_" + type + ":" + counter.get( type )+";";
			for( var j=1 ; j <= counter.get( type ) ; j++ )
			{
				try{
					document.getElementById("result_read").value = document.getElementById("result_read").value + document.getElementById( "g_" + type + "_" + j).getAttribute("id") + ":" + document.getElementById( "g_" + type + "_" + j).getAttribute("transform") + " " + document.getElementById( "txt_" + type + "_" + j).textContent + ";";
				}catch(e)
				{
				}
			}
                        //document.getElementById("result_read").value = document.getElementById("result_read").value + "\n";
                }else if( i == 8){
                        document.getElementById("result_read").value = document.getElementById("result_read").value + "count_" + type + ":" + counter.get( type )+";";
			for( var j=1 ; j <= counter.get( type ) ; j++ )
			{
				try{
					document.getElementById("result_read").value = document.getElementById("result_read").value + document.getElementById( "l_" + type + "_" + j).getAttribute("id") + ":" + document.getElementById( "l_" + type + "_" + j).getAttribute("d") + ";";
				}catch(e)
				{
				}
			}
                        //document.getElementById("result_read").value = document.getElementById("result_read").value + "\n";
                }else if( i==9 || i==10 ){
                        document.getElementById("result_read").value = document.getElementById("result_read").value + "count_" + type + ":" + counter.get( type )+";";
			for( var j=1 ; j <= counter.get( type ) ; j++ )
			{
				try{
					document.getElementById("result_read").value = document.getElementById("result_read").value + document.getElementById( "l_" + type + "_" + j).getAttribute("id") + ":" + document.getElementById( "l_" + type + "_" + j).getAttribute("d") + " " + document.getElementById( "text_" + type + "_" + j).textContent + ";";
				}catch(e)
				{
				}
			} 
                        //document.getElementById("result_read").value = document.getElementById("result_read").value + "\n";
                }
	}
}
