//====================================================================================================
//　全削除関数
//====================================================================================================
function all_delete(counter)
{
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

		for ( var j=1; j <= counter.get( type ); j++ ){
			//alert( type );
			if( i <= 6 ){
				try{
					document.getElementById("gatebox").removeChild( document.getElementById("g_"+ type + "_" + j ) );
				}catch(e){
				}
			}else if( i == 7 ){
				try{
					document.getElementById("textbox").removeChild( document.getElementById("g_"+ type + "_" + j ) );
				}catch(e){
				}
			}else if( i >= 8 && i <= 10 ){
				try{
					document.getElementById("linebox").removeChild( document.getElementById("g_"+ type + "_" + j ) );
				}catch(e){
				}
			}else if( i >= 11 ){
				try{
					document.getElementById("ffbox").removeChild( document.getElementById("g_"+ type + "_" + j ) );
				}catch(e){
				}
			}
		}
	}
	counter.reset();//カウンターの値のリセット
}