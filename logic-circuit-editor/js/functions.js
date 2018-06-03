//====================================================================================================
//　オブジェクトを削除する関数
//====================================================================================================
function del_parts(g,type,number)
{
	g.setAttribute("id","g_gomi" + type +"_" + number );
        
        if( type == "LINE" || type == "In" || type == "Out" )
        {
                document.getElementById( "ellipse_" + type + "_" + number + "_1" ).setAttribute("id","ellipse_gomi" + type +"_" + number + "_1" );
                document.getElementById( "ellipse_" + type + "_" + number + "_2" ).setAttribute("id","ellipse_gomi" + type +"_" + number + "_2" );
                document.getElementById( "l_" + type + "_" + number ).setAttribute("id","l_gomi" + type +"_" + number );                
                
                if( type == "In" || type == "Out" )
                {
                        document.getElementById("text_" + type + "_" + number ).setAttribute("id","text_gomi" + type +"_" + number );    
                }
        }

	document.getElementById("gomi").appendChild(g);
}

//====================================================================================================
//　オブジェクトをクリックした時の関数
//====================================================================================================
function click_parts(evt,g,conf)
{	
        //document.getElementById("toolbox").style.visibility = "hidden";

	document.getElementById("tmp").appendChild(g);
        
	conf.dragFlag = true;
	conf.dragObj  = g;

	px = evt.pageX;
	py = evt.pageY;

	conf.dragObj.setAttribute("transform","translate( " + (px-100) +" , " + (py-90) +" )" );

}

//====================================================================================================
//　オブジェクトをクリックした時の関数
//====================================================================================================
function click_area(evt,number,ellipse,conf)
{	
	//document.getElementById("tmp").appendChild(g);
	conf.dragFlag = true;
	conf.dragObj = ellipse;

	var px = evt.pageX;
	var py = evt.pageY;
        
        
        //alert(number);
        //alert(ellipse.getAttribute("id"));
        //alert(conf);

	//ellipse.setAttribute("cx",px);
	//ellipse.setAttribute("cy",py);
        /*
        if( ellipse.getAttribute("id") == "ellipse_kakidashiarea_1_topleft" )
        {
                var rect = document.getElementById("rect_kakidashi_area_1");
                rect.setAttribute("x", x);
                rect.setAttribute("y", y);
                rect.setAttribute("width", width);
                rect.setAttribute("height", height);
        }else if( ellipse.getAttribute("id") == "ellipse_kakidashiarea_1_bottomleft" )
        {
                alert("aaaaaaa");
        }else if( ellipse.getAttribute("id") == "ellipse_kakidashiarea_1_topright" )
        {
                alert("aaaaaaa");
        }else if( ellipse.getAttribute("id") == "ellipse_kakidashiarea_1_bottomright" )
        {
                alert("aaaaaaa");
        }
        
        var rect = document.getElementById("rect_kakidashi_area_1");
	rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", "#86cecb");
	rect.setAttribute("stroke","#373b3e");
        rect.setAttribute("fill-opacity","0.25");
        rect.setAttribute("id", "rect_"  + type + "_" + number );
        */
        
        
}

//====================================================================================================
//　ゲートをクリックして、マウスのボタンを戻した時の関数
//====================================================================================================
function mouseup_parts(evt,g,type,conf)
{
        //document.getElementById("toolbox").style.visibility = "visible";
        jQuery( '#object_palette' ).draggable( 'enable' );
        $("#toolbox").fadeTo("fast", 1);
        $("#object_palette").fadeTo("fast", 1);
        
	if( type=="AND" || type=="OR" || type=="NOT" || type=="NAND" || type=="NOR" || type=="EXOR")
	{
		document.getElementById("gatebox").appendChild(g);
	}else if( type=="JKFF" || type=="RSFF" || type=="DFF" || type=="TFF" )
	{
		document.getElementById("ffbox").appendChild(g);
	}else if( type == "TEXT" ){
                document.getElementById("textbox").appendChild(g);
        }
	conf.dragObj  = g;

	px = evt.pageX;
	py = evt.pageY;

	if( px%10 >= 5)
	{
		stoppx = px+(10-px%10);
	}else if( px%10 <= 4){
		stoppx = px-(px%10);
	}

	if( py%10 >= 5)
	{
		stoppy = py+(10-py%10);
	}else if( py%10 <= 4){
		stoppy = py-(py%10);
	}
        
        if( type == "TEXT" ){
                conf.dragObj.setAttribute("transform","translate( " + (stoppx-40) +" , " + (stoppy-30) +" )" );				
                conf.dragFlag = false;            
        }else if( type == "kakidashiarea" )
        {
                //alert(conf.dragObj.getAttribute("id"));
                //conf.dragObj.setAttribute("cx",stoppx );
                //conf.dragObj.setAttribute("cy",stoppy );
                //alert("mouseup");
                conf.dragFlag = false;   
        }else
        {
                conf.dragObj.setAttribute("transform","translate( " + (stoppx-100) +" , " + (stoppy-90) +" )" );				
                conf.dragFlag = false;
        }
}

//====================================================================================================
//　「px」付きのポイントを表す文字列から数字の部分のみをかえす関数
//====================================================================================================
function get_num_point( point )
{
	var tmp_str = point.split("p");
	return ( tmp_str[0] - 0 );	//文字列状態から　-0　して数値に変換
}
