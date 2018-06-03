//====================================================================================================
//　トップ領域
//====================================================================================================
var Top_frame = function( count )
{
        //this.flag_mousedown = "aaa";
        //document.getElementByClass("sub_menu").style.visibility="hidden";
        
        this.count_button = count;
        
        var button = new Array();
        var sub_menu = new Array();
        var flag_click = new Array();
        this.flag_click_menu = false;
        
	this.set_border = function( number , style )
	{
		//alert("1");
		if( style == "normal" )
		{
			//alert("normal");
			button[ number ].style.borderStyle = "none";
			//alert("2");
		}else if( style == "hover" )
		{
			button[ number ].style.borderStyle = "solid";
			button[ number ].style.borderWidth = "1px";
			button[ number ].style.borderTopColor = "#ffffff";
			button[ number ].style.borderLeftColor = "#ffffff";
			button[ number ].style.borderRightColor = "#000000";
			button[ number ].style.borderBottomColor = "#000000";
		
		}else if( style == "active" )
		{
			//alert("active");
			button[ number ].style.borderStyle = "solid"
			button[ number ].style.borderWidth = "1px";
			button[ number ].style.borderRightColor = "#ffffff";
			button[ number ].style.borderBottomColor = "#ffffff";
			button[ number ].style.borderTopColor = "#000000";
			button[ number ].style.borderLeftColor = "#000000";
			//alert("active");
		}
	}

        this.click_button = function( n )
        {
                if( flag_click[ n ] == false )
                {
                        for( var i = 1; i <= this.count_button; i++ )
                        {
				flag_click[ i ] = false;
                                sub_menu[ i ].style.position = "absolute";
                                sub_menu[ i ].style.top = "-1000px";
                                sub_menu[ i ].style.visibility = "hidden";
				this.set_border( i , "normal" );
                        }
			
                        sub_menu[ n ].style.position = "relative";
                        sub_menu[ n ].style.top = "0px";
                        sub_menu[ n ].style.visibility = "visible";
                        flag_click[ n ] = true;
                        this.flag_click_menu = true;
			this.set_border( n , "active" );
                }else if(flag_click[ n ] == true)
                {
                        sub_menu[ n ].style.position = "absolute";
                        sub_menu[ n ].style.top = "-1000px";
                        sub_menu[ n ].style.visibility = "hidden";
                        flag_click[ n ] = false;
                        this.flag_click_menu = false;
                }
        };
       
        this.hover_button = function( n )
        {
		if( this.flag_click_menu == true )
                {
			if( flag_click[ n ] == false )
                	{
                        	for( var i = 1; i <= this.count_button; i++ )
                        	{
					flag_click[ i ] = false;
                                        sub_menu[ i ].style.position = "absolute";
                                        sub_menu[ i ].style.top = "-1000px";
                                	sub_menu[ i ].style.visibility = "hidden";
					this.set_border( i , "normal" );
                        	}
                        	this.set_border( n , "active" );
                                sub_menu[ n ].style.position = "relative";
                                sub_menu[ n ].style.top = "0px";				
                                sub_menu[ n ].style.visibility = "visible";
                        	flag_click[ n ] = true;
                        	this.flag_click_menu = true;
                	}/*else if(flag_click[ n ] == true)
                	{
                        	sub_menu[ n ].style.visibility = "hidden";
                        	flag_click[ n ] = false;
                        	this.flag_click_menu = false;
                	}*/
		}else if( this.flag_click_menu == false )
		{
			for( var i = 1; i <= this.count_button; i++ )
                        {
				flag_click[ i ] = false;
                                sub_menu[ i ].style.position = "absolute";
                                sub_menu[ i ].style.top = "-1000px";                                
                                sub_menu[ i ].style.visibility = "hidden";
				this.set_border( i , "normal" );
                        }
			this.set_border( n , "hover" );
		}
        };

	this.mouse_out = function( n )
	{
		if( this.flag_click_menu == false )
		{
			this.set_border( n , "normal" );
		}
	};

	this.reset_button = function()
	{
		for( var i = 1; i <= this.count_button; i++ )
                {
			flag_click[ i ] = false;
                        sub_menu[ i ].style.position = "absolute";
                        sub_menu[ i ].style.top = "-1000px";
                        sub_menu[ i ].style.visibility = "hidden";
			this.set_border( i , "normal" );
                }
		this.flag_click_menu = false;
	};

        this.set_button = function()
        {
                for(var i = 1; i <= this.count_button; i++ )
                {
                      	button[ i ] = document.getElementById( "menu_button_"+i );
                      	sub_menu[ i ] = document.getElementById( "sub_menu_"+i );
			this.set_border( i , "normal" );
                      	flag_click[ i ] = false;
                      	this.flag_click_menu = false;
                }
        };
    
	this.change_size = function()
	{
		document.getElementById("itembox").style.top = "0px";
		document.getElementById("itembox").style.left = "0px";
		document.getElementById("itembox").style.height = "20px";
		document.getElementById("itembox").style.width = document.documentElement.clientWidth + "px";
		document.getElementById("itembox").style.position = "absolute";
	};
}

//====================================================================================================
//　メニュー領域
//====================================================================================================
var Right_frame = function()
{
	this.top;
	this.left;
	this.height;
	this.width;

	this.set_top = function()
	{
		this.top = "60px";
	};

	this.set_left = function()
	{
		this.left = (window.innerWidth - 150) + "px";
        }
	this.set_height = function()
	{
		this.height = (window.innerHeight - 120) + "px" ;
	};

	this.set_width = function()
	{
		this.width = 100 + "px" ;
	};

	this.set_size = function()
	{
		this.set_top();
		this.set_left();
		this.set_width();
		this.set_height();
	};


	this.change_size = function()
	{	
		this.set_size();

		document.getElementById("toolbox").style.top = this.top;
		document.getElementById("toolbox").style.left = this.left;
		document.getElementById("toolbox").style.height = this.height;
		document.getElementById("toolbox").style.width = this.width;
		document.getElementById("toolbox").style.position = "absolute";
	};


}

//====================================================================================================
//　作業領域
//====================================================================================================
var Left_frame = function()
{
	this.top;
	this.left;
	this.height;
	this.width;

        this.get_width = function()
        {
		this.set_size();

                //alert( get_num_point( this.width ) );

                return( get_num_point( this.width ) );
        };

        this.get_height = function()
        {
		this.set_size();

                //alert( get_num_point( this.height ) );

                return( get_num_point( this.height ) );
        };

	this.set_top = function()
	{
		this.top = "0px";
	};

	this.set_left = function()
	{
		this.left = "0px";
	};

	this.set_height = function()
	{
		//this.height = window.innerHeight + "px" ;
		this.height = document.documentElement.clientHeight + "px";
	};

	this.set_width = function()
	{
		//this.width = ( window.innerWidth) + "px" ;
		this.width = document.documentElement.clientWidth + "px";
	};


	this.set_size = function()
	{
		this.set_top();
		this.set_left();
		this.set_width();
		this.set_height();
	};

	this.change_size = function()
	{
		
		this.set_size();

		document.getElementById("main").style.top = this.top;
		document.getElementById("main").style.left = this.left;
		//document.getElementById("main").style.height = this.height;
		//document.getElementById("main").style.width = this.width;
                document.getElementById("main").style.height = (get_num_point( this.height )-2) + "px" ;
		document.getElementById("main").style.width = this.width;
              
	};

	this.create_cell = function()
	{
		this.set_size();

		var num_width = get_num_point( this.width );	//文字列状態の縦の長さからpxを外した数字の部分のみを取り出す
		var num_height = get_num_point( this.height );	//文字列状態の横の長さからpxを外した数字の部分のみを取り出す

		var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
		rect.setAttribute("x",0);
		rect.setAttribute("y",0);
		rect.setAttribute("width",num_width);
		rect.setAttribute("height",num_height);
		rect.setAttribute("fill","#FFFFFF");
		document.getElementById("haikei").appendChild(rect);


		var line = new Array();	//線の配列作成

		for(var i = 1 ; i<= num_width ; i++)
		{
			if( i%10 == 0 )
			{
				line[i] = document.createElementNS("http://www.w3.org/2000/svg", "line");

				line[i].setAttribute("x1",i);
				line[i].setAttribute("y1",0);
				line[i].setAttribute("x2",i);
				line[i].setAttribute("y2", num_height );
				line[i].setAttribute("stroke", "#CCCCCC");

				document.getElementById("haikei").appendChild(line[i]);
			}
		}

		for(var i = 1 ; i<= num_height ; i++)
		{
			if( i%10 == 0 )
			{	
				line[i] = document.createElementNS("http://www.w3.org/2000/svg", "line");

				line[i].setAttribute("x1",0);
				line[i].setAttribute("y1",i);
				line[i].setAttribute("x2", num_width );
				line[i].setAttribute("y2",i);
				line[i].setAttribute("stroke", "#CCCCCC");

				document.getElementById("haikei").appendChild(line[i]);
			}
		}
	};
}

//====================================================================================================
//　ツールバー
//====================================================================================================
var Tool_Bar = function( window_width )
{

	this.width = window_width + "px";

        this.obj = document.getElementById("toolbar"); 
        
        this.icon_tb_1 = document.getElementById("BUTTON_Reload");
        this.icon_tb_2 = document.getElementById("BUTTON_hozon");
        this.icon_tb_3 = document.getElementById("BUTTON_normal");
        this.icon_tb_4 = document.getElementById("BUTTON_eraser");


        this.set_size = function( window_width )
        {
                this.width = window_width + "px";
                this.obj = document.getElementById("toolbar");
                this.obj.style.width = this.width;
        };

        this.icon_tb_1.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_shinki_2.jpg" );
        };

        this.icon_tb_1.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_shinki_1.jpg" );
        };
      
        this.icon_tb_1.onmousedown = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_shinki_2.jpg" );
        };
        
        this.icon_tb_2.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_hozon_2.jpg" );
        };

        this.icon_tb_2.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_hozon_1.jpg" );
        };
      
        this.icon_tb_2.onmousedown = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_hozon_2.jpg" );
        };
        
        this.icon_tb_3.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_yajirushi_2.jpg" );
        };

        this.icon_tb_3.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_yajirushi_1.jpg" );
        };
      
        this.icon_tb_3.onmousedown = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_yajirushi_2.jpg" );
        };
        
        this.icon_tb_4.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_keshigomu_2.jpg" );
        };

        this.icon_tb_4.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_keshigomu_1.jpg" );
        };
      
        this.icon_tb_4.onmousedown = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_keshigomu_2.jpg" );
        };        
        
}

//====================================================================================================
//　フッタ
//====================================================================================================
var Bottom_frame = function( window_width , window_height )
{
	this.height = "35px";
	//this.width = window_width + "px";
	this.width = document.documentElement.clientWidth + "px";
        this.top = ( window_height - get_num_point(this.height) -2 ) + "px";
	this.left = "0px";

        this.obj = document.getElementById("footer"); 
        
        this.set_size = function( window_width , window_height )
        {
                this.height = "35px";
                //this.width = window_width + "px";
                this.width = document.documentElement.clientWidth + "px";
                this.top = ( window_height - get_num_point(this.height) -2 )  + "px";
                this.left = "0px";

                this.obj = document.getElementById("footer");
               
                this.obj.style.top = this.top;
                this.obj.style.left = this.left;
                this.obj.style.width = this.width;
                this.obj.style.height = this.height;
        };
        
}

//====================================================================================================
//　オブジェクトパレット
//====================================================================================================
var Object_palette = function( main )
{

        this.obj = document.getElementById("object_palette"); 

        this.icon_op_1 = document.getElementById("icon_op_1");
        this.icon_op_2 = document.getElementById("icon_op_2");
        this.icon_op_3 = document.getElementById("icon_op_3");
        this.icon_op_4 = document.getElementById("icon_op_4");
        
        this.icon_parts_1_1 = document.getElementById("icon_parts_1_1");
        this.icon_parts_1_2 = document.getElementById("icon_parts_1_2"); 
        this.icon_parts_1_3 = document.getElementById("icon_parts_1_3");
        this.icon_parts_1_4 = document.getElementById("icon_parts_1_4"); 
        this.icon_parts_1_5 = document.getElementById("icon_parts_1_5");
        this.icon_parts_1_6 = document.getElementById("icon_parts_1_6"); 
        
        this.icon_parts_2_1 = document.getElementById("icon_parts_2_1");
        this.icon_parts_2_2 = document.getElementById("icon_parts_2_2");
        this.icon_parts_2_3 = document.getElementById("icon_parts_2_3");
        this.icon_parts_2_4 = document.getElementById("icon_parts_2_4");
        
        this.icon_parts_3_1 = document.getElementById("icon_parts_3_1"); 
        
        this.icon_parts_4_1 = document.getElementById("icon_parts_4_1");

        var flag_click = new Array();
        flag_click[1] = false;
        flag_click[2] = false;
        flag_click[3] = false;
        flag_click[4] = false;
        
        var all_reset_op = function(){
                document.getElementById("icon_img_1").setAttribute("src", "image/icon_editor/icon_gate_1.jpg" );
                flag_click[1] = false;
                document.getElementById("icon_img_2").setAttribute("src", "image/icon_editor/icon_ff_1.jpg" );
                flag_click[2] = false;
                document.getElementById("icon_img_3").setAttribute("src", "image/icon_editor/icon_line_1.jpg" );
                flag_click[3] = false;
                document.getElementById("icon_img_4").setAttribute("src", "image/icon_editor/icon_text_1.jpg" );
                flag_click[4] = false;
                
                document.getElementById("op_area_1").style.visibility = "hidden";
                document.getElementById("op_area_2").style.visibility = "hidden";
                document.getElementById("op_area_3").style.visibility = "hidden";
                document.getElementById("op_area_4").style.visibility = "hidden";
        }
        
        this.icon_op_1.onmouseover = function()
        {
                if( flag_click[1] == false )
                {
                        document.getElementById("icon_img_1").setAttribute("src", "image/icon_editor/icon_gate_2.jpg" );
                }
        };

        this.icon_op_1.onmouseout = function()
        {
                if( flag_click[1] == false )
                {                
                        document.getElementById("icon_img_1").setAttribute("src", "image/icon_editor/icon_gate_1.jpg" );
                }
        };
      
        this.icon_op_1.onclick = function()
        {
                if( flag_click[1] == false )
                {
                        all_reset_op();
                        document.getElementById("icon_img_1").setAttribute("src", "image/icon_editor/icon_gate_3.jpg" );
                        document.getElementById("op_area_1").style.visibility = "visible";
                        flag_click[1] = true;
                }
        };
        
        this.icon_op_2.onmouseover = function()
        {
                if( flag_click[2] == false )
                {
                        document.getElementById("icon_img_2").setAttribute("src", "image/icon_editor/icon_ff_2.jpg" );                       
                }
        };

        this.icon_op_2.onmouseout = function()
        {
                if( flag_click[2] == false )
                {                
                        document.getElementById("icon_img_2").setAttribute("src", "image/icon_editor/icon_ff_1.jpg" );
                }
        };
      
        this.icon_op_2.onclick = function()
        {
                if( flag_click[2] == false )
                {
                        all_reset_op();
                        document.getElementById("icon_img_2").setAttribute("src", "image/icon_editor/icon_ff_3.jpg" );
                        document.getElementById("op_area_2").style.visibility = "visible"; 
                        flag_click[2] = true;
                }
        };
        
        this.icon_op_3.onmouseover = function()
        {
                if( flag_click[3] == false )
                {
                        document.getElementById("icon_img_3").setAttribute("src", "image/icon_editor/icon_line_2.jpg" );
                }
        };

        this.icon_op_3.onmouseout = function()
        {
                if( flag_click[3] == false )
                {                
                        document.getElementById("icon_img_3").setAttribute("src", "image/icon_editor/icon_line_1.jpg" );
                }
        };
      
        this.icon_op_3.onclick = function()
        {
                if( flag_click[3] == false )
                {
                        all_reset_op();
                        document.getElementById("icon_img_3").setAttribute("src", "image/icon_editor/icon_line_3.jpg" );
                        document.getElementById("op_area_3").style.visibility = "visible";                        
                        flag_click[3] = true;
                }
        };   
        
        this.icon_op_4.onmouseover = function()
        {
                if( flag_click[4] == false )
                {
                        document.getElementById("icon_img_4").setAttribute("src", "image/icon_editor/icon_text_2.jpg" );
                }
        };

        this.icon_op_4.onmouseout = function()
        {
                if( flag_click[4] == false )
                {                
                        document.getElementById("icon_img_4").setAttribute("src", "image/icon_editor/icon_text_1.jpg" );
                }
        };
      
        this.icon_op_4.onclick = function()
        {
                if( flag_click[4] == false )
                {
                        all_reset_op();
                        document.getElementById("icon_img_4").setAttribute("src", "image/icon_editor/icon_text_3.jpg" );
                        document.getElementById("op_area_4").style.visibility = "visible";                        
                        flag_click[4] = true;
                }
        };  
        
        this.icon_parts_1_1.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_AND_2.jpg" );
        };

        this.icon_parts_1_1.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_AND_1.jpg" );
        };    
        
        this.icon_parts_1_1.onmousedown = function( evt )
        {
                main.click_ANDdrag(0,0,evt);
        };   
        
        this.icon_parts_1_2.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_OR_2.jpg" );
        };

        this.icon_parts_1_2.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_OR_1.jpg" );
        };    
        
        this.icon_parts_1_2.onmousedown = function( evt )
        {
                main.click_ORdrag(0,0,evt);
        };  

        this.icon_parts_1_3.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_NOT_2.jpg" );
        };

        this.icon_parts_1_3.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_NOT_1.jpg" );
        };    
        
        this.icon_parts_1_3.onmousedown = function( evt )
        {
                main.click_NOTdrag(0,0,evt);
        };  
        
        this.icon_parts_1_4.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_NAND_2.jpg" );
        };

        this.icon_parts_1_4.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_NAND_1.jpg" );
        };    
        
        this.icon_parts_1_4.onmousedown = function( evt )
        {
                main.click_NANDdrag(0,0,evt);
        }; 
        
        this.icon_parts_1_5.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_NOR_2.jpg" );
        };

        this.icon_parts_1_5.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_NOR_1.jpg" );
        };    
        
        this.icon_parts_1_5.onmousedown = function( evt )
        {
                main.click_NORdrag(0,0,evt);
        };         

        this.icon_parts_1_6.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_EXOR_2.jpg" );
        };

        this.icon_parts_1_6.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_EXOR_1.jpg" );
        };    
        
        this.icon_parts_1_6.onmousedown = function( evt )
        {
                main.click_EXORdrag(0,0,evt);
        };      

        this.icon_parts_2_1.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_JKFF_2.jpg" );
        };

        this.icon_parts_2_1.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_JKFF_1.jpg" );
        };    
        
        this.icon_parts_2_1.onmousedown = function( evt )
        {
                main.click_JKFFdrag(0,0,evt);
        };         

        this.icon_parts_2_2.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_RSFF_2.jpg" );
        };

        this.icon_parts_2_2.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_RSFF_1.jpg" );
        };    
        
        this.icon_parts_2_2.onmousedown = function( evt )
        {
                main.click_RSFFdrag(0,0,evt);
        };         

        this.icon_parts_2_3.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_DFF_2.jpg" );
        };

        this.icon_parts_2_3.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_DFF_1.jpg" );
        };    
        
        this.icon_parts_2_3.onmousedown = function( evt )
        {
                main.click_DFFdrag(0,0,evt);
        };         

        this.icon_parts_2_4.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_TFF_2.jpg" );
        };

        this.icon_parts_2_4.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_TFF_1.jpg" );
        };    
        
        this.icon_parts_2_4.onmousedown = function( evt )
        {
                main.click_TFFdrag(0,0,evt);
        };         
        
        this.icon_parts_3_1.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_LINEOBJ_2.jpg" );
        };

        this.icon_parts_3_1.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_LINEOBJ_1.jpg" );
        };    
        
        this.icon_parts_3_1.onmousedown = function( evt )
        {
                main.click_LINEdrag(0,0,evt);
        }; 
        
        this.icon_parts_4_1.onmouseover = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_TEXTOBJ_2.jpg" );
        };

        this.icon_parts_4_1.onmouseout = function()
        {
                this.setAttribute("src", "image/icon_editor/icon_TEXTOBJ_1.jpg" );
        };    
        
        this.icon_parts_4_1.onmousedown = function( evt )
        {
                main.click_TEXTdrag(0,0,"ここをダブルクリックして内容を編集",evt);
        }; 
        //this.create_drag_TEXT
        
}

//====================================================================================================
//　書きだしエリア
//====================================================================================================
var Kakidashi_Area = function( n , conf , x, y, width, height)
{
	this.id;
	this.config = conf
        
        this.gla;

	this.x = x;
	this.y = y;
        this.width = width;
        this.height = height;

	this.type = "kakidashiarea";

	this.number = n;

	this.create_kakidashi_area = function()
	{
            this.gla = create_kakidashi_area( this , this.type , this.number ,this.config , x, y, width, height );
            this.set_prop();
        };
        
        this.set_prop = function()
        {
            this.id = this.gla.getAttribute("id");
            /*
            var point = this.gla.getAttribute("transform").split(" ");
            
            this.x_in1 = (point[1]-0) - 60 + 100;
            this.y_in1 = (point[3]-0) - 20 + 90;
            this.x_in2 = (point[1]-0) - 60 + 100;
            this.y_in2 = (point[3]-0) + 20 + 90;
            this.x_out = (point[1]-0) + 60 + 100;
            this.y_out = (point[3]-0) - 0 + 90;               
            */
        };
}
