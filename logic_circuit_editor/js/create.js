//====================================================================================================
//　テキストを作成する関数
//====================================================================================================
function create_text(type,number,conf,x,y,str)
{
	var d;

	var px;
	var py;
	var stoppx = null;
	var stoppy = null;

	// g(group)要素を作成
	var g = document.createElementNS("http://www.w3.org/2000/svg", "svg:g");
	g.setAttribute("id","g_"+ type + "_" + number );
	document.getElementById("textbox").appendChild(g);
	g.setAttribute("transform","translate( " + x + " , " + y +" )" );
	//グループ作成完了

	var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
	text1.textContent = str;
        text1.setAttribute("id","txt_" + type + "_" + number );
	text1.setAttribute("font-family", "MS-Gothic"); 
	text1.setAttribute("font-size", "20"); 
	text1.setAttribute("x", 50);
	text1.setAttribute("y", 50);
	document.getElementById( "g_"+ type + "_" + number ).appendChild(text1);

	var ellipse_point = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_point.setAttribute("id","ellipse_" + type + "_" + number + "_point" );
	ellipse_point.setAttribute("cx",50-10);
	ellipse_point.setAttribute("cy",50-20);
	ellipse_point.setAttribute("rx","5" );
	ellipse_point.setAttribute("ry","5" );
	ellipse_point.setAttribute("stroke","black");
	ellipse_point.setAttribute("fill","white");
	document.getElementById( "g_"+ type + "_" + number ).appendChild(ellipse_point);

	//テキストをダブルクリックした時の振る舞い
	text1.ondblclick = function (evt) 
	{
                var str_input = prompt("テキストの内容を入力して下さい。", "");
                
                if ( str_input == "" || str_input == null )
                {    
                }else
                {
                    if( str_input.indexOf(";") != -1 || str_input.indexOf(":") != -1 || str_input.indexOf(" ") != -1 )
                    {
                        alert("使用できない文字が含まれています。「;（半角セミコロン）」と「:（半角コロン）」と「 (半角スペース)」は使用できません")
                    }else{
                        text1.textContent = str_input;
                    }
                }
	};
        /*
        text1.onclick = function (evt) 
	{
                alert( document.getElementById( "txt_"+ type + "_" + number ).id );
	};
        */
	//テキスト左上の丸をクリックした時の振る舞い
	ellipse_point.onmousedown = function (evt) 
	{

		if( evt.button == 2)
		{
		
		}else if( conf.mode == "eraser" )
		{
			//alert(conf.mode);
			document.getElementById("textbox").removeChild( document.getElementById("g_"+ type + "_" + number ) );

		}else if( conf.mode == "normal" )
		{
			document.getElementById("tmp").appendChild(g);

			conf.dragFlag = true;
			
			conf.dragObj  = document.getElementById("g_"+ type + "_" + number );

			px = evt.pageX;
			py = evt.pageY;

			conf.dragObj.setAttribute("transform","translate( " + (px-40) +" , " + (py-30) +" )" );
			
		}
	};
	
	//FFをクリックして、マウスのボタンを戻した時の振る舞い
	ellipse_point.onmouseup = function (evt)
	{
		mouseup_parts(evt,g,type,conf)
	};
        
        
        return g;
}

//====================================================================================================
//　黒丸を作成する関数
//====================================================================================================
function create_kuromaru( type,number,conf,x,y )
{
        
        // g(group)要素を作成
	var g = document.createElementNS("http://www.w3.org/2000/svg", "svg:g");
	g.setAttribute("id","g_"+ type + "_" + number );
	document.getElementById("create_kuromarubox").appendChild(g);
	g.setAttribute("transform","translate( 0 , 0 )" );
	//グループ作成完了
        
	var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse.setAttribute("id","ellipse_" + type + "_" + number);
	ellipse.setAttribute("cx",x);
	ellipse.setAttribute("cy",y);
	ellipse.setAttribute("rx","3" );
	ellipse.setAttribute("ry","3" );
	ellipse.setAttribute("stroke","black" );
	ellipse.setAttribute("fill","black" );
	
        document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse);
        
        return( g );
}

//====================================================================================================
//　SVGで書き出し領域を示す四角形をを作成する関数
//====================================================================================================
function create_kakidashi_area(obj,type,number,conf,x,y,width,height)
{

	var d;

	var px;
	var py;
	var stoppx = null;
	var stoppy = null;

	// g(group)要素を作成
	var g = document.createElementNS("http://www.w3.org/2000/svg", "svg:g");
	g.setAttribute("id","g_"+ type + "_" + number );
	document.getElementById("tmp_back").appendChild(g);
	g.setAttribute("transform","translate( 0 , 0 )" );
	//グループ作成完了
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "svg:rect");
	rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", "#86cecb");
	rect.setAttribute("stroke","#373b3e");
        rect.setAttribute("fill-opacity","0.5");
        rect.setAttribute("id", "rect_"  + type + "_" + number );
        
	document.getElementById("g_"+ type + "_" + number ).appendChild(rect);

var ellipse_bottomleft = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_bottomleft.setAttribute("id","ellipse_" + type + "_" + number + "_bottomleft" );
	ellipse_bottomleft.setAttribute("cx",x);
	ellipse_bottomleft.setAttribute("cy", y + height );
	ellipse_bottomleft.setAttribute("rx","5" );
	ellipse_bottomleft.setAttribute("ry","5" );
	ellipse_bottomleft.setAttribute("stroke","black" );
	ellipse_bottomleft.setAttribute("fill","white" );
	
	document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_bottomleft);        

        var ellipse_topright = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_topright.setAttribute("id","ellipse_" + type + "_" + number + "_topright" );
	ellipse_topright.setAttribute("cx", x + width );
	ellipse_topright.setAttribute("cy", y );
	ellipse_topright.setAttribute("rx","5" );
	ellipse_topright.setAttribute("ry","5" );
	ellipse_topright.setAttribute("stroke","black" );
	ellipse_topright.setAttribute("fill","white" );
	
	document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_topright);

	ellipse_topright.onmousedown = function (evt) 
	{
                click_area(evt,number,ellipse_topright,conf);
	};
        
	//円をクリックした時の振る舞い
	ellipse_bottomleft.onmousedown = function (evt) 
	{
                click_area(evt,number,ellipse_bottomleft,conf);
	};

        ellipse_bottomleft.onmouseup = function (evt)
	{
                	mouseup_parts(evt,ellipse_bottomleft,type,conf);
	};

        ellipse_topright.onmouseup = function (evt)
	{
                	mouseup_parts(evt,ellipse_topright,type,conf);
	};

        return g;

}

//====================================================================================================
//　SVGでフリップフロップを作成する関数
//====================================================================================================
function create_ff(obj,type,number,conf,x,y)
{
	var d;

	var px;
	var py;
	var stoppx = null;
	var stoppy = null;

	if( type == "RSFF" )
	{
		d = " m -40 -50 l 0 100 l 80 0 l 0 -100 l -80 0 m -20 20 l 20 0 m -20 60 l 20 0 m 80 -60 l 20 0 m -20 60 l 20 0";
	}else if(type == "JKFF")
	{
		d = " m -40 -50 l 0 100 l 80 0 l 0 -100 l -80 0 m -20 20 l 20 0 m -20 30 l 20 0 m -20 30 l 20 0 m 80 -60 l 20 0 m -20 60 l 20 0 m -100 -40 l 10 10 m -10 10 l 10 -10";
	}else if( type == "TFF" || type == "DFF" )
	{
		d = " m -40 -50 l 0 100 l 80 0 l 0 -100 l -80 0 m -20 20 l 20 0 m -20 60 l 20 0 m 80 -60 l 20 0 m -20 60 l 20 0 m -100 -10 l 10 10 m -10 10 l 10 -10";
	}else
	{
		alert("oixi?");
	}

	// g(group)要素を作成
	var g = document.createElementNS("http://www.w3.org/2000/svg", "svg:g");
	g.setAttribute("id","g_"+ type + "_" + number );
	document.getElementById("ffbox").appendChild(g);
	g.setAttribute("transform","translate( " + x + " , " + y +" )" );
	//グループ作成完了

	var path = document.createElementNS("http://www.w3.org/2000/svg", "svg:path");
	path.setAttribute("fill", "#FFFFFF");
	path.setAttribute("d", "M 100 90" + d);
	path.setAttribute("id", "path_" + type + "_" + number );
	path.setAttribute("stroke","#000000");
        path.setAttribute("style","stroke-linecap:square");
	
	document.getElementById("g_"+ type + "_" + number ).appendChild(path);


	var ellipse_in1 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_in1.setAttribute("id","ellipse_" + type + "_" + number + "_in1" );
	ellipse_in1.setAttribute("cx","40");
	ellipse_in1.setAttribute("cy","60");
	ellipse_in1.setAttribute("rx","5" );
	ellipse_in1.setAttribute("ry","5" );
	ellipse_in1.setAttribute("stroke","black" );
	ellipse_in1.setAttribute("fill","white" );
	
	document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_in1);


	var ellipse_in2 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_in2.setAttribute("id","ellipse_" + type + "_" + number + "_in2" );
	ellipse_in2.setAttribute("cx","40");
	ellipse_in2.setAttribute("cy","120");
	ellipse_in2.setAttribute("rx","5" );
	ellipse_in2.setAttribute("ry","5" );
	ellipse_in2.setAttribute("stroke","black" );
	ellipse_in2.setAttribute("fill","white" );
	
	document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_in2);


	var ellipse_out1 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_out1.setAttribute("id","ellipse_" + type + "_" + number + "_out1" );
	ellipse_out1.setAttribute("cx","160");
	ellipse_out1.setAttribute("cy","60");
	ellipse_out1.setAttribute("rx","5" );
	ellipse_out1.setAttribute("ry","5" );
	ellipse_out1.setAttribute("stroke","black" );
	ellipse_out1.setAttribute("fill","white" );
	
	document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_out1);


	var ellipse_out2 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_out2.setAttribute("id","ellipse_" + type + "_" + number + "_out2" );
	ellipse_out2.setAttribute("cx","160");
	ellipse_out2.setAttribute("cy","120");
	ellipse_out2.setAttribute("rx","5" );
	ellipse_out2.setAttribute("ry","5" );
	ellipse_out2.setAttribute("stroke","black" );
	ellipse_out2.setAttribute("fill","white" );
	
	document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_out2);

	if( type == "JKFF" )
	{
		var ellipse_clk = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
		ellipse_clk.setAttribute("id","ellipse_" + type + "_" + number + "_clk" );
		ellipse_clk.setAttribute("cx","40");
		ellipse_clk.setAttribute("cy","90");
		ellipse_clk.setAttribute("rx","5" );
		ellipse_clk.setAttribute("ry","5" );
		ellipse_clk.setAttribute("stroke","black" );
		ellipse_clk.setAttribute("fill","white" );
	
		document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_clk);
	}


	if( type == "RSFF" )
	{/*
		var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text1.textContent = "R　　　Q";
		//text1.textContent = "R";
                text1.setAttribute("font-size", "20"); 
		text1.setAttribute("x", "67");
		text1.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text1);

		var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text2.textContent = "S　　　Q";
                //text2.textContent = "S"+" "+" "+" "+" "+" "+" "+" "+"Q";
		text2.setAttribute("font-size", "20");
		text2.setAttribute("x", "67");
		text2.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text2);

		var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text3.textContent = "￣";
		text3.setAttribute("font-size", "20");
		text3.setAttribute("x", "113");
		text3.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text3);
        */
                var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text1.textContent = "R";
                text1.setAttribute("font-size", "20"); 
		text1.setAttribute("x", "65");
		text1.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text1);
               
		var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text2.textContent = "S";
                text2.setAttribute("font-size", "20");
		text2.setAttribute("x", "65");
		text2.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text2);

                 var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text3.textContent = "Q";
                text3.setAttribute("font-size", "20"); 
		text3.setAttribute("x", "120");
		text3.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text3);
               
		var text4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text4.textContent = "Q";
                text4.setAttribute("font-size", "20");
		text4.setAttribute("x", "120");
		text4.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text4);
                
                var text5 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text5.setAttribute("font-size", "20");
		text5.textContent = "__";
                text5.setAttribute("x", "120");
		text5.setAttribute("y", "105");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text5);
                
	}else if( type == "JKFF" )
	{/*
		var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text1.textContent = "J　　　Q";
		text1.setAttribute("font-size", "20"); 
		text1.setAttribute("x", "67");
		text1.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text1);

		var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text2.textContent = "K　　　Q";
		text2.setAttribute("font-size", "20");
		text2.setAttribute("x", "67");
		text2.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text2);

		var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text3.textContent = "￣";
		text3.setAttribute("font-size", "20");
		text3.setAttribute("x", "113");
		text3.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text3);

		var text4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text4.textContent = "CLK";
		text4.setAttribute("font-size", "12");
		text4.setAttribute("x", "73");
		text4.setAttribute("y", "95");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text4);
          */
                var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text1.textContent = "J";
                text1.setAttribute("font-size", "20"); 
		text1.setAttribute("x", "65");
		text1.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text1);
               
		var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text2.textContent = "K";
                text2.setAttribute("font-size", "20");
		text2.setAttribute("x", "65");
		text2.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text2);

                 var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text3.textContent = "Q";
                text3.setAttribute("font-size", "20"); 
		text3.setAttribute("x", "120");
		text3.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text3);
               
		var text4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text4.textContent = "Q";
                text4.setAttribute("font-size", "20");
		text4.setAttribute("x", "120");
		text4.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text4);
                
                var text5 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text5.setAttribute("font-size", "20");
		text5.textContent = "__";
                text5.setAttribute("x", "120");
		text5.setAttribute("y", "105");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text5);
                
                var text6 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text6.textContent = "CLK";
		text6.setAttribute("font-size", "13");
		text6.setAttribute("x", "70");
		text6.setAttribute("y", "95");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text6);
                
	}else if(type == "TFF"){
                var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text1.textContent = "T";
                text1.setAttribute("font-size", "20"); 
		text1.setAttribute("x", "65");
		text1.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text1);
               
		var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text2.textContent = "CLK";
                text2.setAttribute("font-size", "15");
		text2.setAttribute("x", "75");
		text2.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text2);

                 var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text3.textContent = "Q";
                text3.setAttribute("font-size", "20"); 
		text3.setAttribute("x", "120");
		text3.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text3);
               
		var text4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text4.textContent = "Q";
                text4.setAttribute("font-size", "20");
		text4.setAttribute("x", "120");
		text4.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text4);
                
                var text5 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text5.setAttribute("font-size", "20");
		text5.textContent = "__";
                text5.setAttribute("x", "120");
		text5.setAttribute("y", "105");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text5);
	}else if(type == "DFF"){
                var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text1.textContent = "D";
                text1.setAttribute("font-size", "20"); 
		text1.setAttribute("x", "65");
		text1.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text1);
               
		var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text2.textContent = "CLK";
                text2.setAttribute("font-size", "15");
		text2.setAttribute("x", "75");
		text2.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text2);

                 var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text3.textContent = "Q";
                text3.setAttribute("font-size", "20"); 
		text3.setAttribute("x", "120");
		text3.setAttribute("y", "70");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text3);
               
		var text4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text4.textContent = "Q";
                text4.setAttribute("font-size", "20");
		text4.setAttribute("x", "120");
		text4.setAttribute("y", "125");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text4);
                
                var text5 = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text5.setAttribute("font-size", "20");
		text5.textContent = "__";
                text5.setAttribute("x", "120");
		text5.setAttribute("y", "105");
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text5);
	}

	//FFをクリックした時の振る舞い
	path.onmousedown = function (evt) 
	{
		if( evt.button == 2)
		{
		
		}else if( conf.mode == "eraser" )
		{
                        obj.del_prop();
			del_parts(g,type,number);

		}else if( conf.mode == "normal" )
		{

                        obj.search_li(); 
                        //search_line( obj_list_out , te_list_out , x+100+60 , y+90 );
                            //alert("aaa");                    
                        //search_line( obj_list_in1 , te_list_in1 ,  ,  )
                        
                        click_parts(evt,g,conf);
                        
                        
                        //move_line_with_gate( obj_list_out , te_list_out , x+100+60 , y+90 );
                        
                        obj.move_li();
		}            
	};
	
        
        path.onclick = function (evt) 
	{
            
	};
        
        
        
	//FFをクリックして、マウスのボタンを戻した時の振る舞い
	path.onmouseup = function (evt)
	{
		mouseup_parts(evt,g,type,conf);
                obj.move_li();
	};

        return( g );

}

//====================================================================================================
//　SVGで論理ゲートを作成する関数
//====================================================================================================
function create_parts(obj,type,number,conf,x,y)
{

	var d;

	var d2;

	var px;
	var py;
	var stoppx = null;
	var stoppy = null;

	if( type == "AND" )
	{
		d = " m -40 -30 l 40 0 a 40 30 3.14 0 1 0 60 l -40 0 l 0 -60 m 79 30 l 21 0 m -100 -20 l -20 0 m 20 40 l -20 0";
	}else if(type == "OR")
	{
		d = " m -40 30 q 20 -30 0 -60 l 40 0 q 30 5 40 30 q -10 25 -40 30 l -40 0 m 80 -30 l 20 0 m -93 -20 l -27 0 m 27 40 l -27 0";
	}else if(type == "NOT")
	{
		d = " m -40 -30 l 80 30 a 5 5 3.14 0 1 10 0 a 5 5 3.14 0 1 -10 0 l -80 30 l 0 -60 m -20 30 l 20 0 m 90 0 l 10 0";
	}else if(type == "NAND")
	{
		d = " m -40 -30 l 40 0 a 40 30 3.14 0 1 0 60 l -40 0 l 0 -60 m 80 30 a 5 5 3.14 0 1 10 0 a 5 5 3.14 0 1 -10 0 m 10 0 l 10 0 m -100 -20 l -20 0 m 20 40 l -20 0";
	}else if(type == "NOR")
	{
		d  = " m -40 30 q 20 -30 0 -60 l 40 0 q 30 5 40 30 q -10 25 -40 30 l -40 0 m 80 -30 a 5 5 3.14 0 1 10 0 a 5 5 3.14 0 1 -10 0  m 10 0 l 10 0 m -93 -20 l -27 0 m 27 40 l -27 0";
	}else if(type == "EXOR")
	{
		d = " m -40 30 q 20 -30 0 -60 l 40 0 q 30 5 40 30 q -10 25 -40 30 l -40 0 m 80 -30 l 20 0 m -93 -20 l -27 0 m 27 40 l -27 0";
		d2 = " m -47 30 q 20 -30 0 -60 ";
	}
	

	// g(group)要素を作成
	var g = document.createElementNS("http://www.w3.org/2000/svg", "svg:g");
	g.setAttribute("id","g_"+ type + "_" + number );
	document.getElementById("gatebox").appendChild(g);
	g.setAttribute("transform","translate( " + x + " , " + y +" )" );
	//グループ作成完了


	var path = document.createElementNS("http://www.w3.org/2000/svg", "svg:path");
	path.setAttribute("fill", "#FFFFFF");
	path.setAttribute("d", "M 100 90" + d);
	path.setAttribute("id", "path_" + type + "_" + number );
	path.setAttribute("stroke","#000000");
        path.setAttribute("style","stroke-linecap:square");

	document.getElementById("g_"+ type + "_" + number ).appendChild(path);

	if(type == "EXOR")
	{
		var path2 = document.createElementNS("http://www.w3.org/2000/svg", "svg:path");
		path2.setAttribute("fill", "none");
		path2.setAttribute("d", "M 100 90" + d2);
		path2.setAttribute("id", "path2_" + type + "_" + number );
		path2.setAttribute("stroke","#000000");

		document.getElementById("g_"+ type + "_" + number ).appendChild(path2);
	}


	var ellipse_out = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_out.setAttribute("id","ellipse_" + type + "_" + number + "_out" );
	ellipse_out.setAttribute("cx", "160" );
	ellipse_out.setAttribute("cy", "90" );
	ellipse_out.setAttribute("rx","5" );
	ellipse_out.setAttribute("ry","5" );
	ellipse_out.setAttribute("stroke","black" );
	ellipse_out.setAttribute("fill","white" );

        /*
	ellipse_out.onmousedown = function (evt)
	{
		if( evt.button == 2)
		{
		
		}else if( conf.mode == "eraser" )
		{
			del_parts(g,type,number);

		}else if( conf.mode == "normal" )	
		{
			click_parts(evt,g,conf);
		}
	};
        */



	document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_out);

	if( type == "NOT" )	//NOTゲートは入力端子が１個なので例外処理
	{
		var ellipse_in1 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
		ellipse_in1.setAttribute("id","ellipse_" + type + "_" + number + "_in1" );
		ellipse_in1.setAttribute("cx","40");
		ellipse_in1.setAttribute("cy","90" );
		ellipse_in1.setAttribute("rx","5" );
		ellipse_in1.setAttribute("ry","5" );
		ellipse_in1.setAttribute("stroke","black" );
		ellipse_in1.setAttribute("fill","white" );

                /*
		ellipse_in1.onmousedown = function (evt)
		{
			if( evt.button == 2)
			{
			
			}else if( conf.mode == "eraser" )
			{
				del_parts(g,type,number);

			}else if( conf.mode == "normal" )	
			{
				click_parts(evt,g,conf);
			}
		};
                */

		document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_in1);
	}else{
		var ellipse_in1 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
		ellipse_in1.setAttribute("id","ellipse_" + type + "_" + number + "_in1" );
		ellipse_in1.setAttribute("cx","40");
		ellipse_in1.setAttribute("cy","70");
		ellipse_in1.setAttribute("rx","5" );
		ellipse_in1.setAttribute("ry","5" );
		ellipse_in1.setAttribute("stroke","black" );
		ellipse_in1.setAttribute("fill","white" );

		document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_in1);

                /*
		ellipse_in1.onmousedown = function (evt)
		{
			if( evt.button == 2)
			{
			
			}else if( conf.mode == "eraser" )
			{
				del_parts(g,type,number);

			}else if( conf.mode == "normal" )	
			{
				click_parts(evt,g,conf);
			}
		};
                */
               
		var ellipse_in2 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
		ellipse_in2.setAttribute("id","ellipse_" + type + "_" + number + "_in2" );
		ellipse_in2.setAttribute("cx","40");
		ellipse_in2.setAttribute("cy","110");
		ellipse_in2.setAttribute("rx","5" );
		ellipse_in2.setAttribute("ry","5" );
		ellipse_in2.setAttribute("stroke","black" );
		ellipse_in2.setAttribute("fill","white" );

                /*
		ellipse_in2.onmousedown = function (evt)
		{
			if( evt.button == 2)
			{
			
			}else if( conf.mode == "eraser" )
			{
				del_parts(g,type,number);

			}else if( conf.mode == "normal" )	
			{
				click_parts(evt,g,conf);
			}
		};
                */
                
		document.getElementById("g_"+ type + "_" + number ).appendChild(ellipse_in2);
	}

	//ゲートをクリックした時の振る舞い
	path.onmousedown = function (evt) 
	{

		if( evt.button == 2)
		{
		
		}else if( conf.mode == "eraser" )
		{
                        obj.del_prop();
			del_parts(g,type,number);

		}else if( conf.mode == "normal" )
		{

                        obj.search_li(); 
                        //search_line( obj_list_out , te_list_out , x+100+60 , y+90 );
                            //alert("aaa");                    
                        //search_line( obj_list_in1 , te_list_in1 ,  ,  )
                        
                        click_parts(evt,g,conf);
                        
                        //move_line_with_gate( obj_list_out , te_list_out , x+100+60 , y+90 );
                        
                        obj.move_li();
		}
	};
	
	//ゲートをクリックして、マウスのボタンを戻した時の振る舞い
	path.onmouseup = function (evt)
	{
		mouseup_parts(evt,g,type,conf);
                obj.move_li();
                
                //jQuery( '#object_palette' ).draggable( 'enable' );
	};

        return( g );
}

//====================================================================================================
//　svgで線を作る関数
//====================================================================================================
function create_line(type,number,conf , x1 , y1 , x2 , y2 , str )
{

	// g(group)要素を作成
	var g = document.createElementNS("http://www.w3.org/2000/svg", "svg:g");
	g.setAttribute("id","g_"+ type + "_" + number );
	document.getElementById("linebox").appendChild(g);
	//グループ作成完了

	var line = document.createElementNS("http://www.w3.org/2000/svg", "svg:path");
	line.setAttribute( "d", "M " + x1 + " " + y1 + " L " + x2 + " " + y2 );
	line.setAttribute("stroke","black");
        line.setAttribute("style","stroke-linecap:square");
	line.setAttribute("id","l_" + type + "_"  + number );

	document.getElementById( "g_"+ type + "_" + number ).appendChild(line);	

	var ellipse_1 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_1.setAttribute("id","ellipse_" + type + "_" + number + "_1" );
	ellipse_1.setAttribute("cx", x1 );
	ellipse_1.setAttribute("cy", y1 );
	ellipse_1.setAttribute("rx","5" );
	ellipse_1.setAttribute("ry","5" );
	ellipse_1.setAttribute("stroke","black" );
	ellipse_1.setAttribute("fill","white" );
	
	document.getElementById( "g_"+ type + "_" + number ).appendChild(ellipse_1);


	var ellipse_2 = document.createElementNS("http://www.w3.org/2000/svg", "svg:ellipse");
	ellipse_2.setAttribute("id","ellipse_" + type + "_" + number + "_2" );
	ellipse_2.setAttribute("cx", x2 );
	ellipse_2.setAttribute("cy", y2 );
	ellipse_2.setAttribute("rx","5" );
	ellipse_2.setAttribute("ry","5" );
	ellipse_2.setAttribute("stroke","black" );
	ellipse_2.setAttribute("fill","white" );

	document.getElementById( "g_"+ type + "_" + number ).appendChild(ellipse_2);


	if( type == "In" || type == "Out" )
	{
		var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.setAttribute("id", "text_" + type + "_" + number );
		text.textContent = str; 
                text.setAttribute("font-family", "MS-Gothic");                 
                text.setAttribute("font-size", "20"); 
		text.setAttribute("x", x1-10 );
		text.setAttribute("y", y1-10 );
                
                	//テキストをダブルクリックした時の振る舞い
                text.ondblclick = function (evt) 
                {
                        var str_input = prompt("テキストの内容を入力して下さい。", "");
                
                        if ( str_input == "" || str_input == null )
                        {    
                        }else
                        {
                                if( str_input.indexOf(";") != -1 || str_input.indexOf(":") != -1 || str_input.indexOf(" ") != -1 )
                                {
                                        alert("使用できない文字が含まれています。「;（半角セミコロン）」と「:（半角コロン）」と「 (半角スペース)」は使用できません")
                                }else
                                {
                                        text.textContent = str_input;
                                }
                        }
                };
		document.getElementById( "g_"+ type + "_" + number ).appendChild(text);
	}        
        
	var px;
	var py;
	var stoppx = null;
	var stoppy = null;
	ellipse_1.onmousedown = function (evt)
	{
		if( evt.button == 2)
		{
		
		}else if( conf.mode == "eraser" )
		{
			//alert(conf.mode);
			//document.getElementById("linebox").removeChild( document.getElementById("g_"+ type + "_" + number ) );
                        del_parts(g,type,number);

		}else if( conf.mode == "normal" )
		{

			document.getElementById("tmp").appendChild(g);		//作業用のグループにパーツを移動することで移動時は常に最全面に


			conf.dragFlag = true;
			conf.dragObj = ellipse_1;

			px = evt.pageX;
			py = evt.pageY;
		
			ellipse_1.setAttribute( "cx", px );
			ellipse_1.setAttribute( "cy", py );

			var d_line = line.getAttribute("d").split(" ");
			line.setAttribute( "d","M " + px + " " + py + " L " + d_line[4] + " "  + d_line[5] );
		}
	} ;

	ellipse_2.onmousedown = function (evt)
	{
		if( evt.button == 2)
		{
		
		}else if( conf.mode == "eraser" )
		{
			//alert(conf.mode);
			//document.getElementById("linebox").removeChild( document.getElementById("g_"+ type + "_" + number ) );
                        del_parts(g,type,number);

		}else if( conf.mode == "normal" )
		{
			document.getElementById("tmp").appendChild(g);		//作業用のグループにパーツを移動することで移動時は常に最全面に


			conf.dragFlag = true;
			conf.dragObj = ellipse_2;

			px = evt.pageX;
			py = evt.pageY;
			
			ellipse_2.setAttribute( "cx", px );
			ellipse_2.setAttribute( "cy", py );

			var d_line = line.getAttribute("d").split(" ");
			line.setAttribute( "d","M " + d_line[1] + " " + d_line[2] + " L " + px + " "  + py );
		}
	} ;


	ellipse_1.onmouseup = function (evt)
	{

		document.getElementById("linebox").appendChild(g);		//移動後は元のグループに入れる

		conf.dragObj = ellipse_1;

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

		ellipse_1.setAttribute( "cx", stoppx );
		ellipse_1.setAttribute( "cy", stoppy );

		var d_line = line.getAttribute("d").split(" ");
		line.setAttribute( "d","M " + stoppx + " " + stoppy + " L " + d_line[4] + " "  + d_line[5] );

		if( type  == "In" || type  == "Out" )
		{
			text.setAttribute( "x" , stoppx-10 );
			text.setAttribute( "y" , stoppy-10 ); 
		}



		conf.dragFlag = false ;

	} ;

	ellipse_2.onmouseup = function (evt)
	{
		document.getElementById("linebox").appendChild(g);	//移動後は元のグループに入れる

		conf.dragObj = ellipse_2;

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

		ellipse_2.setAttribute( "cx", stoppx );
		ellipse_2.setAttribute( "cy", stoppy );

		var d_line = line.getAttribute("d").split(" ");
		line.setAttribute( "d","M " + d_line[1] + " " + d_line[2] + " L " + stoppx + " "  + stoppy );

		conf.dragFlag = false ;
	} ;
        return( g );
}
