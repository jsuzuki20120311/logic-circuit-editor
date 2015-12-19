window.onload = function()
{
	$("#toolbox_content").css("border", "2px solid #474747");
        $("#debug_monitor").css("border", "2px solid #474747");
        $("#OPEN_DIALOG").css("border", "2px solid #474747");
        $("#SAVE_DIALOG").css("border", "2px solid #474747");
        $("#VERSION_DIALOG").css("border", "2px solid #474747");

    	jQuery( '#toolbox' ) . draggable();
        jQuery( '#OPEN_DIALOG' ) . draggable();
        jQuery( '#SAVE_DIALOG' ) . draggable();
        jQuery( '#debug_monitor' ) . draggable();
        jQuery( '#VERSION_DIALOG' ) . draggable();
        jQuery( '#object_palette' ) . draggable();

	var counter1 = new Counter();
	counter1.reset();

	var conf1 = new Config();
	conf1.reset();

        //create_kakidashi_area("export_zone",1,conf1,0,0,0,0);
        var kakidashi_area1 = new Kakidashi_Area( 1 , conf1 , 300 , 300 , 250 , 250 );
	kakidashi_area1.create_kakidashi_area();

	//====================================================================================================
	//　ここからメニューバー構築の処理
	//====================================================================================================

	var top_frame1 = new Top_frame( 3 );
	
        //スクロールバー分を考えてトップフレームのサイズ調整は２回行なう
        top_frame1.change_size();
        top_frame1.set_button();
        //top_frame1.change_size();
        top_frame1.reset_button();
        
        document.getElementById("menu_button_1").onmousedown =  function () 
        {
                top_frame1.click_button(1);
        };

        document.getElementById("menu_button_2").onmousedown =  function () 
        {
                 top_frame1.click_button(2);
        };
        
        document.getElementById("menu_button_3").onmousedown =  function () 
        {
                top_frame1.click_button(3);
        };

        document.getElementById("menu_button_1").onmouseover =  function () 
        {
                top_frame1.hover_button(1);
        };

        document.getElementById("menu_button_2").onmouseover =  function () 
        {
                top_frame1.hover_button(2);
        };

        document.getElementById("menu_button_3").onmouseover =  function () 
        {
                top_frame1.hover_button(3);
        };

        document.getElementById("menu_button_1").onmouseout =  function () 
        {
                top_frame1.mouse_out(1);
        };

        document.getElementById("menu_button_2").onmouseout =  function () 
        {
                top_frame1.mouse_out(2);
        };

        document.getElementById("menu_button_3").onmouseout =  function () 
        {
                top_frame1.mouse_out(3);
        };

        document.getElementById("main").onmousedown =  function () 
        {
                top_frame1.reset_button();
        };

	//====================================================================================================
	//　ここまでメニューバー構築の処理
	//====================================================================================================

	//====================================================================================================
	//　ここからSVG領域とメニューバー構築の処理
	//====================================================================================================
	var left_frame1 = new Left_frame();
	left_frame1.create_cell();
        left_frame1.change_size();	

	var right_frame1 = new Right_frame();
	right_frame1.change_size();

        conf1.width_screen = left_frame1.get_width() ;    //コンフィグに幅を設定
        conf1.height_screen = left_frame1.get_height() ;    //コンフィにの高さを設定

        var bottom_frame1 = new Bottom_frame( left_frame1.get_width() , left_frame1.get_height() );
        bottom_frame1.set_size( left_frame1.get_width() , left_frame1.get_height() );
        bottom_frame1.set_size( left_frame1.get_width() , left_frame1.get_height() );        
        
        var tool_bar1 = new Tool_Bar( left_frame1.get_width() );
        tool_bar1.set_size( left_frame1.get_width() );
        tool_bar1.set_size( left_frame1.get_width() );


        window.onresize= function()//ブラウザのサイズ変更時の処理
	{
		top_frame1.change_size();
                top_frame1.reset_button();
                
                left_frame1.change_size();
                left_frame1.create_cell();
		right_frame1.change_size();
                tool_bar1.set_size( left_frame1.get_width() );
                
                bottom_frame1.set_size( left_frame1.get_width() , left_frame1.get_height() );
                
                //↓スクロールバー分の調整のためにもう一度リサイズ
		top_frame1.change_size();
                top_frame1.reset_button();
                
                left_frame1.change_size();
                left_frame1.create_cell();
                right_frame1.change_size();
                tool_bar1.set_size( left_frame1.get_width() );
                
                bottom_frame1.set_size( left_frame1.get_width() , left_frame1.get_height() );
                
                conf1.width_screen = left_frame1.get_width() ;    //コンフィグに幅を設定
                conf1.height_screen = left_frame1.get_height() ;    //コンフィグに高さを設定
                  
	}
	//====================================================================================================
	//　ここまでSVG領域構築の処理
	//====================================================================================================
	
	var main1 = new main( counter1 , conf1 );
        conf1.main = main1;                             //コンフィグにメインのオブジェクトを設定
        
        var object_palette1 = new Object_palette( main1 );
        object_palette1.icon_op_1.onclick();


	document.getElementById("BUTTON_normal").onmousedown =  function () 
	{
		main1.change_mode_normal();
	};

	document.getElementById("BUTTON_eraser").onmousedown =  function () 
	{
		main1.change_mode_eraser();
	};
        
	document.getElementById("BUTTON_Reload").onmousedown =  function () 
	{
		main1.click_alldelete();
	};

	document.getElementById("BUTTON_OPEN").onmousedown =  function () 
	{
		main1.click_OPEN();
                document.getElementById("OPEN_DIALOG").style.visibility = "hidden";
	};
        
	document.getElementById("BUTTON_CLOSE").onmousedown =  function () 
	{
		document.getElementById("OPEN_DIALOG").style.visibility = "hidden";
	};        
        
	document.getElementById("sub_savedia_BUTTON_CLOSE").onmousedown =  function () 
	{
                document.getElementById( "tmp_back" ).appendChild( document.getElementById( "g_kakidashiarea_1" ) );
		document.getElementById("SAVE_DIALOG").style.visibility = "hidden";
	};

	document.getElementById("sub_verdia_BUTTON_CLOSE").onmousedown =  function () 
	{
                document.getElementById("VERSION_DIALOG").style.visibility = "hidden";
	};    

	document.getElementById("BUTTON_SAVE").onmousedown =  function () 
	{
		main1.click_SAVE();
	};
        
        document.getElementById("BUTTON_write_svg").onmousedown =  function () 
	{                
                //SVG形式で書き出す機能

		document.getElementById( "g_kakidashiarea_1" ).setAttribute("opacity","0");
                document.getElementById( "haikei" ).setAttribute("opacity","0");
                
                main1.point_check_te();
                main1.change_mode_view();
                
                var source =  document.getElementById("main").innerHTML;
                
                var x = (document.getElementById("rect_kakidashiarea_1").getAttribute("x") - 0);
                var y = (document.getElementById("rect_kakidashiarea_1").getAttribute("y") - 0);
                var x2 = x + (document.getElementById("rect_kakidashiarea_1").getAttribute("width") - 0);
                var y2 = y + (document.getElementById("rect_kakidashiarea_1").getAttribute("height") - 0);
                
                var width = (document.getElementById("rect_kakidashiarea_1").getAttribute("width") - 0);
                var height = (document.getElementById("rect_kakidashiarea_1").getAttribute("height") - 0);

                source = source.replace(/<svg id="svgbox" width="100%" height="100%">/,"<svg width=\""+ width +"px\" height=\"" + height + "px\" viewBox=\"" + (x) + " " + (y) + " " + (width) + " " + (height) + "\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\">");

                var sfile = "data:image/svg+xml,"+encodeURIComponent(source);;
		document.getElementById("BUTTON_write_svg").setAttribute("href",sfile);  
                
		document.getElementById( "g_kakidashiarea_1" ).setAttribute("opacity","1");
                document.getElementById( "haikei" ).setAttribute("opacity","1");

                document.getElementById("kuromarubox").removeChild( document.getElementById("create_kuromarubox") );   
                var create_g =  document.createElementNS("http://www.w3.org/2000/svg", "svg:g");
                create_g.setAttribute( "id" , "create_kuromarubox" );
                document.getElementById("kuromarubox").appendChild( create_g );
                create_g.setAttribute("transform","translate( 0 , 0 )" );
                                
                main1.change_mode_normal();

	};
        
	document.getElementById("haikei").onmousedown =  function () 
	{

	};

        document.getElementById("menu_new").onmousedown =  function () 
        {
		main1.click_alldelete();
		top_frame1.reset_button();
        };

        document.getElementById("menu_open").onclick =  function () 
	{
		document.getElementById("OPEN_DIALOG").style.top = "100px";
		document.getElementById("OPEN_DIALOG").style.left = "100px";
                document.getElementById("OPEN_DIALOG").style.visibility = "visible";
		top_frame1.reset_button();
        };
        
        document.getElementById("BUTTON_hozon").onclick =  function () 
	{
                document.getElementById( "kakidashi_area" ).appendChild( document.getElementById( "g_kakidashiarea_1" ) );
            
		document.getElementById("SAVE_DIALOG").style.top = "100px";
		document.getElementById("SAVE_DIALOG").style.left = "100px";
                document.getElementById("SAVE_DIALOG").style.visibility = "visible";
	        top_frame1.reset_button();
        };

        document.getElementById("menu_save").onclick =  function () 
	{
                document.getElementById( "kakidashi_area" ).appendChild( document.getElementById( "g_kakidashiarea_1" ) );
            
		document.getElementById("SAVE_DIALOG").style.top = "100px";
		document.getElementById("SAVE_DIALOG").style.left = "100px";
                document.getElementById("SAVE_DIALOG").style.visibility = "visible";
	        top_frame1.reset_button();
        };
        
        document.getElementById("menu_version").onclick =  function () 
	{
		document.getElementById("VERSION_DIALOG").style.top = "100px";
		document.getElementById("VERSION_DIALOG").style.left = "100px";
                document.getElementById("VERSION_DIALOG").style.visibility = "visible";
		top_frame1.reset_button();
        };
        

        document.getElementById("BUTTON_pointgetter").onclick =  function () 
	{
                main1.get_position();
        };

        var flag_menu_kakidashi = false;
        document.getElementById("menu_kakidashi").onclick =  function () 
	{
                if( flag_menu_kakidashi == false )
                {
                        document.getElementById( "kakidashi_area" ).appendChild( document.getElementById( "g_kakidashiarea_1" ) );
                        flag_menu_kakidashi = true;
                        top_frame1.reset_button();
                }else if( flag_menu_kakidashi == true ){
                        document.getElementById( "tmp_back" ).appendChild( document.getElementById( "g_kakidashiarea_1" ) );
                        flag_menu_kakidashi = false;
                        top_frame1.reset_button();
                }
        };

        
        document.getElementById("svgbox").onmousedown =  function (evt) 
	{
                main1.click_svgbox(evt);
        }

	window.document.onmousemove = function(evt)
	{
		main1.drag(evt);		
	};
}