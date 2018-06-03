var main = function( count , conf )
{
	this.counter = count;
	this.config = conf;

	var AND = new Array();	//ゲートの配列作成
	var OR  = new Array();
	var NOT = new Array();
	var NAND = new  Array();
	var EXOR = new  Array();
	var NOR = new  Array();

	var RS = new Array();
	var JK = new Array();
	var DF = new Array();
	var TF = new Array();

	var LI = new Array();	//線のための配列作成

        var Txt = new Array();   //テキストのための配列

	var In = new Array();
	var Out = new Array();
        
        var Kuro = new Array();

        this.debug_show = function( str )
        {
                document.getElementById("debug_monitor").textContent = document.getElementById("debug_monitor").textContent + "" + str +";";
       }
        
        this.search_Out = function()
        {
                for( var i = 1; i <= this.counter.get("Out"); i++ )
                {
                        this.debug_show( "START" );
                        Out[i].set_prop();
                        alert( this.search_point( Out[i].id , Out[i].x_te2 , Out[i].y_te2 ) );
                }
        }

        this.move_line_with_gate = function( obj_list , te_list , x , y )
        {
                for(var i=1; i<=obj_list.length-1; i++)
                {
                        var d_line = obj_list[i].path_line.getAttribute("d").split(" ");
                        
                        if( te_list[i] == "1")
                        {
                                obj_list[i].gla_te1.setAttribute( "cx", x );
                                obj_list[i].gla_te1.setAttribute( "cy", y );
                                
                                obj_list[i].path_line.setAttribute( "d", "M " + x + " " + y + " L " + d_line[4] + " " + d_line[5] );
                                
                                if( obj_list[i].type  == "In" || obj_list[i].type  == "Out" )
                                {
                                        obj_list[i].txt.setAttribute( "x" , x-10 );
                                        obj_list[i].txt.setAttribute( "y" , y-10 ); 
                                }
                        }
                        
                        if( te_list[i] == "2" )
                        {
                                obj_list[i].gla_te2.setAttribute( "cx", x );
                                obj_list[i].gla_te2.setAttribute( "cy", y );
                                obj_list[i].path_line.setAttribute( "d", "M " + d_line[1] + " " + d_line[2] + " L " + x + " " + y );
                        }
                }
        }
        
        
        this.search_line = function( obj_list , te_list , x , y )
        {
                var count_obj = 0;
                var count_te  = 0;
            
                for(var i = 1; i<= this.counter.get("LINE"); i++)
                {
                        try{
                        LI[i].set_prop();
                        if(x == LI[i].x_te1 && y == LI[i].y_te1)
                        {
                                count_obj = count_obj + 1;
                                count_te  = count_te  + 1;
                                
                                obj_list[count_obj] = LI[i];
                                te_list[count_te]   = "1";
                        }else if(x == LI[i].x_te2 && y == LI[i].y_te2)
                        {
                                count_obj = count_obj + 1;
                                count_te  = count_te  + 1;
                                
                                obj_list[count_obj] = LI[i];
                                te_list[count_te]   = "2";
                        }
                        }catch(e)
                        {
                        }
                }
                
                for(var i = 1; i<= this.counter.get("In"); i++)
                {
                        try{
                        In[i].set_prop();
                        if(x == In[i].x_te1 && y == In[i].y_te1)
                        {
                                count_obj = count_obj + 1;
                                count_te  = count_te  + 1;
                                
                                obj_list[count_obj] = In[i];
                                te_list[count_te]   = "1";
                        }else if(x == In[i].x_te2 && y == In[i].y_te2)
                        {
                                count_obj = count_obj + 1;
                                count_te  = count_te  + 1;
                                
                                obj_list[count_obj] = In[i];
                                te_list[count_te]   = "2";
                        }
                        }catch(e)
                        {
                        }
                }
                
                for(var i = 1; i<= this.counter.get("Out"); i++)
                {
                        try{
                        Out[i].set_prop();
                        if(x == Out[i].x_te1 && y == Out[i].y_te1)
                        {
                                count_obj = count_obj + 1;
                                count_te  = count_te  + 1;
                                
                                obj_list[count_obj] = Out[i];
                                te_list[count_te]   = "1";                            
                        }else if(x == Out[i].x_te2 && y == Out[i].y_te2)
                        {
                                count_obj = count_obj + 1;
                                count_te  = count_te  + 1;
                                
                                obj_list[count_obj] = Out[i];
                                te_list[count_te]   = "2";
                        }
                        }catch(e)
                        {
                        }
                }
        }


        this.search_point = function( id , x , y )
        {
                var tmp_obj = new Array();
                var count_obj = 0;
                var tmp_result ="";
                
                var type;
                for(var i = 1; i <= 9; i++)
                {
                        if( i == 1 )
                        {
                                type = "LINE";
                        }else if( i == 2 )
                        {
                                type = "In";                            
                        }else if( i == 3 )
                        {
                                type = "Out";                            
                        }else if( i == 4 )
                        {
                                type = "AND";                            
                        }else if( i == 5 )
                        {
                                type = "OR";                            
                        }else if( i == 6 )
                        {
                                type = "NOT";                            
                        }else if( i == 7 )
                        {
                                type = "NAND";                            
                        }else if( i == 8 )
                        {
                                type = "NOR";                            
                        }else if( i == 9 )
                        {
                                type = "EXOR";                            
                        }
                        
                        //alert(this.counter.get(type));
                        
                        if( type == "LINE" )
                        {
                                    for( var j=1; j<= this.counter.get(type); j++){                                            
                                            LI[j].set_prop();
                                            
                                            if( id != LI[j].id && x == LI[j].x_te1 && y == LI[j].y_te1 )
                                            {
                                                    this.debug_show(LI[j].id);
                                                    
                                                    var tmp =  this.search_point( LI[j].id , LI[j].x_te2 , LI[j].y_te2 ) ; 
                                                    //alert( tmp );
                                                    //return( tmp );
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                                    
                                            }else if( id != LI[j].id && x == LI[j].x_te2 && y == LI[j].y_te2 )
                                            {
                                                    
                                                    this.debug_show(LI[j].id);
                                                    //alert("2");
                                                    var tmp =  this.search_point( LI[j].id , LI[j].x_te1 , LI[j].y_te1 ) ;
                                                    //alert( tmp );
                                                    //return( tmp );
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                                    
                                            }else{
                                            }
                                    }
                        }else if( type == "In" )
                        {
                                    for( var j=1; j<= this.counter.get(type); j++){
                                            In[j].set_prop();                                          
                                            if( id != In[j].id && x == In[j].x_te2 && y == In[j].y_te2 )
                                            {
                                                    this.debug_show(In[j].id);  
                                                    //return( In[j].id );
                                                    var tmp = In[j].id;
                                                    
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            }else{
                                            }
                                    }                                
                        }else if( type == "Out" )
                        {
                                    /*for( var j=1; j<= this.counter.get(type); j++){
                                            In[j].set_prop();
                                            
                                            if( id != In[j].id && x == In[j].x_te2 && y == In[j].y_te2 )
                                            {
                                                    return( In[j].id );
                                            }else{
                                            }
                               }*/  
                        }else if( type == "AND" )
                        {
                                    for( var j=1; j<= this.counter.get(type); j++){
                                            AND[j].set_prop();
                                            //this.debug_show(AND[j].id);
                                            if( id != AND[j].id && x == AND[j].x_out && y == AND[j].y_out )
                                            {
                                                    this.debug_show(AND[j].id);
                                                    //var tmp = ("AND");
                                                    var tmp =  ( this.search_point( AND[j].id , AND[j].x_in1 , AND[j].y_in1 ) ) + " ∧ " + ( this.search_point( AND[j].id , AND[j].x_in2 , AND[j].y_in2 ) ) ; 
                                                    //return( tmp );
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            }else{
                                                
                                            }
                                            /*else if( id != AND[j].id && ( (x == AND[j].x_in1 && y == AND[j].y_in1) || (x == AND[j].x_in2 && y == AND[j].y_in2 ) ) ){
                                                    this.debug_show(AND[j].id);
                                                    //var tmp = ("AND");
                                                    var tmp =  "0" ; 
                                                    //return( tmp );
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            }*/
                                    }                                
                        }else if( type == "OR" )
                        {
                                    for( var j=1; j<= this.counter.get(type); j++){
                                            OR[j].set_prop();
                                            if( id != OR[j].id && x == OR[j].x_out && y == OR[j].y_out )
                                            {
                                                    this.debug_show(OR[j].id);
                                                    //var tmp = ("AND");
                                                    var tmp =  ( this.search_point( OR[j].id , OR[j].x_in1 , OR[j].y_in1 ) ) + " ∨ " + ( this.search_point( OR[j].id , OR[j].x_in2 , OR[j].y_in2 ) ) ; 
                                                    //return( tmp );
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            }else{
                                                /*
                                                    this.debug_show(OR[j].id);
                                                    //var tmp = ("AND");
                                                    var tmp =  ( "input" ) ; 
                                                    //return( tmp );
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            */
                                            }
                                    }                                
                        }else if( type == "NOT" )
                        {
                                    for( var j=1; j<= this.counter.get(type); j++){
                                            NOT[j].set_prop();
                                            if( id != NOT[j].id && x == NOT[j].x_out )
                                            {
                                                    this.debug_show(NOT[j].id);
                                                    //var tmp = ("AND");
                                                    var tmp =  ( " ￢ ( " + this.search_point( NOT[j].id , NOT[j].x_in1 , NOT[j].y_in1 ) + " ) " ) ; 
                                                    //return( tmp );
                                                    
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            }else{
                                            }
                                    }                                
                        }else if( type == "NAND" )
                        {
                                    for( var j=1; j<= this.counter.get(type); j++){
                                            NAND[j].set_prop();
                                            if( id != NAND[j].id && x == NAND[j].x_out && y == NAND[j].y_out )
                                            {
                                                    this.debug_show(NAND[j].id);
                                                    //var tmp = ("AND");
                                                    var tmp =  ( " ￢ ( " + this.search_point( NAND[j].id , NAND[j].x_in1 , NAND[j].y_in1 ) ) + " ∧ " + ( this.search_point( NAND[j].id , NAND[j].x_in2 , NAND[j].y_in2 ) + " ) " ) ; 
                                                    //return( tmp );
                                                    
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            }else{
                                            }
                                    }                                
                        }else if( type == "NOR" )
                        {
                                    for( var j=1; j<= this.counter.get(type); j++){
                                            NOR[j].set_prop();
                                            if( id != NOR[j].id && x == NOR[j].x_out && y == NOR[j].y_out )
                                            {
                                                    this.debug_show(NOR[j].id);
                                                    //var tmp = ("AND");
                                                    var tmp =  ( " ￢ ( " + this.search_point( NOR[j].id , NOR[j].x_in1 , NOR[j].y_in1 ) ) + " ∨ " + ( this.search_point( NOR[j].id , NOR[j].x_in2 , NOR[j].y_in2 )  + " ) " ) ; 
                                                    //return( tmp );
                                                    
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            }else{
                                            }
                                    }                                
                        }else if( type == "EXOR" )
                        {
                                    for( var j=1; j<= this.counter.get(type); j++){
                                            EXOR[j].set_prop();
                                            if( id != EXOR[j].id && x == EXOR[j].x_out && y == EXOR[j].y_out )
                                            {
                                                    this.debug_show(EXOR[j].id);
                                                    //var tmp = ("AND");
                                                    var tmp =  ( this.search_point( EXOR[j].id , EXOR[j].x_in1 , EXOR[j].y_in1 ) ) + " XOR " + ( this.search_point( EXOR[j].id , EXOR[j].x_in2 , EXOR[j].y_in2 ) ) ; 
                                                    //return( tmp );
                                                    
                                                    count_obj ++;
                                                    tmp_obj[ count_obj ] = tmp;
                                            }else{
                                            }
                                    }                                
                        }
                        
                }                        
                        if( count_obj != 0 )
                        {             
                                var flag_tasita = false;
                                tmp_result = "( ";
                                for( var k=1; k<=count_obj; k++ )
                                {
                                        if( flag_tasita == false && tmp_obj[ k ] != "not_output" ){
                                                tmp_result = tmp_result + tmp_obj[ k ];
                                                flag_tasita = true;
                                        }else if( flag_tasita == true && tmp_obj[ k ] != "not_output" ){
                                                tmp_result = tmp_result + " ∨ " +  tmp_obj[ k ];
                                        }
                                }
                                tmp_result = tmp_result + " )";
                                if( tmp_result == "(  )" ){
                                        return( "not_output" );    
                                }else
                                {
                                        return(tmp_result);
                                }
                        }else{
                                return( "not_output" );
                        }
        }
        
	//AND追加時のボタン
	this.click_AND =function( x , y )
	{
		this.counter.add("AND");
		AND[ this.counter.get("AND") ] = new ANDGate( this.counter.get("AND") , this.config , x , y );
		AND[ this.counter.get("AND") ].create_AND();
                
                //AND[ this.counter.get("AND") ].show_id();
	};

	//NAND追加時のボタン
	this.click_NAND =function( x , y )
	{
		this.counter.add("NAND");
		NAND[ this.counter.get("NAND") ] = new NANDGate( this.counter.get("NAND") , this.config , x , y  );
		NAND[ this.counter.get("NAND") ].create_NAND();
	};

	//OR追加時のボタン
	this.click_OR =function( x , y )
	{
		this.counter.add("OR");
		OR[ this.counter.get("OR") ] = new ORGate( this.counter.get("OR") , this.config , x , y  );
		OR[ this.counter.get("OR") ].create_OR();
	};

	//EXOR追加時のボタン
	this.click_EXOR =function( x , y )
	{
		this.counter.add("EXOR");
		EXOR[ this.counter.get("EXOR") ] = new EXORGate( this.counter.get("EXOR") , this.config , x , y  );
		EXOR[ this.counter.get("EXOR") ].create_EXOR();
	};

	//NOT追加時のボタン
	this.click_NOT =function( x , y )
	{
		this.counter.add("NOT");
		NOT[ this.counter.get("NOT") ] = new NOTGate( this.counter.get("NOT") , this.config , x , y );
		NOT[ this.counter.get("NOT") ].create_NOT();
	};

	//NOR追加時のボタン
	this.click_NOR =function( x , y )
	{
		this.counter.add("NOR");
		NOR[ this.counter.get("NOR") ] = new NORGate( this.counter.get("NOR") , this.config , x , y );
		NOR[ this.counter.get("NOR") ].create_NOR();
	};

	//全消しボタン押した時
	this.click_alldelete = function()
	{
		all_delete(this.counter);
	};

	//LINE追加時のボタン
	this.click_LINE =function( x1, y1, x2, y2 )
	{
		this.counter.add("LINE");
		LI[ this.counter.get("LINE") ] = new LINE( this.counter.get("LINE") , this.config ,x1, y1, x2, y2 );
		LI[ this.counter.get("LINE") ].create_LINE();
	};
        
        //LINE追加時のボタン２
	this.click_LINEdrag =function()
	{
                this.change_mode_LINE( "LINE" );
	};
        
        //入力端子追加時のボタン２
	this.click_Indrag =function()
	{
                this.change_mode_LINE( "In" );
	};

        //出力端子追加時のボタン２
	this.click_Outdrag =function()
	{
                this.change_mode_LINE( "Out" );
	};

	//In追加時のボタン
	this.click_In =function( x1, y1, x2, y2 )
	{
		this.counter.add("In");
		In[ this.counter.get("In") ] = new Inp( this.counter.get("In") , this.config ,x1, y1, x2, y2 , "In_"+this.counter.get("In") );	
		In[ this.counter.get("In") ].create_In();
	};

	//Out追加時のボタン
	this.click_Out =function( x1, y1, x2, y2 )
	{
		this.counter.add("Out");
		Out[ this.counter.get("Out") ] = new Outp( this.counter.get("Out") , this.config ,x1, y1, x2, y2 , "Out_"+this.counter.get("Out") );
		Out[ this.counter.get("Out") ].create_Out();
	};

	//RSFF追加時のボタン
	this.click_RSFF =function( x , y )
	{
		this.counter.add("RSFF");
		RS[ this.counter.get("RSFF") ] = new RSFF( this.counter.get("RSFF") , this.config , x , y );
		RS[ this.counter.get("RSFF") ].create_RSFF();
	};

	//JKFF追加時のボタン
	this.click_JKFF =function( x , y )
	{
		this.counter.add("JKFF");
		JK[ this.counter.get("JKFF") ] = new JKFF( this.counter.get("JKFF") , this.config  , x , y );
		JK[ this.counter.get("JKFF") ].create_JKFF();
	};

	//TFF追加時のボタン
	this.click_TFF =function( x , y )
	{
		//alert("aaa");
		this.counter.add("TFF");
		TF[ this.counter.get("TFF") ] = new TFF( this.counter.get("TFF") , this.config  , x , y );
		TF[ this.counter.get("TFF") ].create_TFF();
		
	};

	//DFF追加時のボタン
        this.click_DFF =function( x , y )
	{
		//alert("aaa");
		this.counter.add("DFF");
		DF[ this.counter.get("DFF") ] = new DFF( this.counter.get("DFF") , this.config  , x , y );
		DF[ this.counter.get("DFF") ].create_DFF();
	};
        
        //テキスト追加時のボタン
        this.click_TEXT =function( x , y , str )
	{
		this.counter.add("TEXT");
		Txt[ this.counter.get("TEXT") ] = new TEXT( this.counter.get("TEXT") , this.config  , x , y , str );
		Txt[ this.counter.get("TEXT") ].create_TEXT();
	};
        
        //AND追加時のボタン
	this.click_ANDdrag =function( x , y , evt )
	{
		this.change_mode_normal( "AND" );
                this.counter.add("AND");
                AND[ this.counter.get("AND") ] = new ANDGate( this.counter.get("AND") , this.config , x , y );
		AND[ this.counter.get("AND") ].create_drag_AND(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};
        
        //OR追加時のボタン
	this.click_ORdrag =function( x , y , evt )
	{
		this.change_mode_normal( "OR" );
                this.counter.add("OR");
                OR[ this.counter.get("OR") ] = new ORGate( this.counter.get("OR") , this.config , x , y );
		OR[ this.counter.get("OR") ].create_drag_OR(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};        
        
        //NOT追加時のボタン
	this.click_NOTdrag =function( x , y , evt )
	{
		this.change_mode_normal( "NOT" );
                this.counter.add("NOT");
                NOT[ this.counter.get("NOT") ] = new NOTGate( this.counter.get("NOT") , this.config , x , y );
		NOT[ this.counter.get("NOT") ].create_drag_NOT(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};

        //NAND追加時のボタン
	this.click_NANDdrag =function( x , y , evt )
	{
		this.change_mode_normal( "NAND" );
                this.counter.add("NAND");
                NAND[ this.counter.get("NAND") ] = new NANDGate( this.counter.get("NAND") , this.config , x , y );
		NAND[ this.counter.get("NAND") ].create_drag_NAND(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};        
        
        //NOR追加時のボタン
	this.click_NORdrag =function( x , y , evt )
	{
		this.change_mode_normal( "NOR" );
                this.counter.add("NOR");
                NOR[ this.counter.get("NOR") ] = new NORGate( this.counter.get("NOR") , this.config , x , y );
		NOR[ this.counter.get("NOR") ].create_drag_NOR(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};        
        
        //EXOR追加時のボタン
	this.click_EXORdrag =function( x , y , evt )
	{
		this.change_mode_normal( "EXOR" );
                this.counter.add("EXOR");
                EXOR[ this.counter.get("EXOR") ] = new EXORGate( this.counter.get("EXOR") , this.config , x , y );
		EXOR[ this.counter.get("EXOR") ].create_drag_EXOR(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};       
        
        //RSFF追加時のボタン
	this.click_RSFFdrag =function( x , y , evt )
	{
		this.change_mode_normal( "RSFF" );
                this.counter.add("RSFF");
                RS[ this.counter.get("RSFF") ] = new RSFF( this.counter.get("RSFF") , this.config , x , y );
		RS[ this.counter.get("RSFF") ].create_drag_RSFF(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};   
        
        //JKFF追加時のボタン
	this.click_JKFFdrag =function( x , y , evt )
	{
		this.change_mode_normal( "JKFF" );
                this.counter.add("JKFF");
                JK[ this.counter.get("JKFF") ] = new JKFF( this.counter.get("JKFF") , this.config , x , y );
		JK[ this.counter.get("JKFF") ].create_drag_JKFF(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};   

        //TFF追加時のボタン
	this.click_TFFdrag =function( x , y , evt )
	{
		this.change_mode_normal( "TFF" );
                this.counter.add("TFF");
                TF[ this.counter.get("TFF") ] = new TFF( this.counter.get("TFF") , this.config , x , y );
		TF[ this.counter.get("TFF") ].create_drag_TFF(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};   

        //DFF追加時のボタン
	this.click_DFFdrag =function( x , y , evt )
	{
		this.change_mode_normal( "DFF" );
                this.counter.add("DFF");
                DF[ this.counter.get("DFF") ] = new DFF( this.counter.get("DFF") , this.config , x , y );
		DF[ this.counter.get("DFF") ].create_drag_DFF(evt);
                
                //AND[ this.counter.get("AND") ].show_id();
	};  
        
        //テキスト追加時のボタン
        this.click_TEXTdrag =function( x , y , str , evt )
	{
            	this.change_mode_normal( "テキスト" );
		this.counter.add("TEXT");
		Txt[ this.counter.get("TEXT") ] = new TEXT( this.counter.get("TEXT") , this.config  , x , y , str );
		Txt[ this.counter.get("TEXT") ].create_drag_TEXT(evt);
	};

	//ファイル追加ボタン
	this.click_OPEN = function()
	{
		all_delete( count );
		
		var file = document.getElementById("INPUT_FILE").files;
		var fileContents = "";

		var reader = new FileReader();
                reader.readAsText(file[0], "utf-8");

 		if (file[0].type == "text/plain")
		{
			reader.onload = function(evt)
			{
				var load_data = evt.target.result.split(";");

				for( var i = 0 ; i <= load_data.length-2; i++ )
				{
					var load_number = load_data[i].split(":");
					var load_id = load_number[0].split("_");

					if( load_id[0] == "count" )
					{
						//alert( load_id[1] );
						count.set( load_id[1] , ( load_number[1]-0 ) );
						//alert( ( load_number[1]-0 ) );
					}else if( load_id[0] == "g" || load_id[0] == "l" )
					{
						if( load_id[1] == "AND" || load_id[1] == "OR" || load_id[1] == "NOT" || load_id[1] == "NAND" || load_id[1] == "NOR" || load_id[1] == "EXOR"  )
						{
							var load_pos = load_number[1].split(" ");
							//alert(load_id[1]);
                                                        //create_parts( load_id[1] , load_id[2] , conf , load_pos[1] , load_pos[3] );
                                                        
                                                        if( load_id[1] == "AND" )
                                                        {
                                                                try{
                                                                        //count.add("AND");
                                                                        AND[ (load_id[2]-0) ] = new ANDGate( (load_id[2]-0) , conf , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        AND[ (load_id[2]-0) ].create_AND();
                                                                }catch(e)
                                                                {
                                                                        alert(e);
                                                                }
                                                        }else if( load_id[1] == "OR" )
                                                        {
                                                                try{
                                                                        //count.add("OR");
                                                                        OR[ (load_id[2]-0) ] = new ORGate( (load_id[2]-0) , conf , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        OR[ (load_id[2]-0) ].create_OR();
                                                                }catch(e)
                                                                {
                                                                        alert(e);
                                                                }
                                                        }else if( load_id[1] == "NOT" )
                                                        {
                                                                try{
                                                                        //count.add("NOT");
                                                                        NOT[ (load_id[2]-0) ] = new NOTGate( (load_id[2]-0) , conf , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        NOT[ (load_id[2]-0) ].create_NOT();
                                                                }catch(e)
                                                                {
                                                                        alert(e);
                                                                }
                                                        }else if( load_id[1] == "NAND" )
                                                        {
                                                                try{
                                                                        //count.add("NAND");
                                                                        NAND[ (load_id[2]-0) ] = new NANDGate( (load_id[2]-0) , conf , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        NAND[ (load_id[2]-0) ].create_NAND();
                                                                }catch(e)
                                                                {
                                                                        alert(e);
                                                                }
                                                        }else if( load_id[1] == "NOR" )
                                                        {
                                                                try{
                                                                        //count.add("NOR");
                                                                        NOR[ (load_id[2]-0) ] = new NORGate( (load_id[2]-0) , conf , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        NOR[ (load_id[2]-0) ].create_NOR();
                                                                }catch(e)
                                                                {
                                                                        alert(e);
                                                                }
                                                        }else if( load_id[1] == "EXOR" )
                                                        {
                                                                try{
                                                                        //count.add("EXOR");
                                                                        EXOR[ (load_id[2]-0) ] = new EXORGate( (load_id[2]-0) , conf , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        EXOR[ (load_id[2]-0) ].create_EXOR();
                                                                }catch(e)
                                                                {
                                                                        alert(e);
                                                                }
                                                        }
                                                        
						}else if ( load_id[1] == "JKFF" || load_id[1] == "RSFF" || load_id[1] == "DFF" || load_id[1] == "TFF" )
						{
							var load_pos = load_number[1].split(" ");
							//create_ff( load_id[1] , load_id[2] , conf , load_pos[1] , load_pos[3] );
                                                        
                                                        if( load_id[1] == "JKFF" )
                                                        {   
                                                                try{
                                                                        JK[ (load_id[2]-0) ] = new JKFF( (load_id[2]-0) , conf  , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        JK[ (load_id[2]-0) ].create_JKFF();
                                                                }catch(e)
                                                                {
                                                                        alert(e);    
                                                                }
                                                        }else if( load_id[1] == "RSFF" )
                                                        {
                                                                try{
                                                                        RS[ (load_id[2]-0) ] = new RSFF( (load_id[2]-0) , conf  , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        RS[ (load_id[2]-0) ].create_RSFF();
                                                                }catch(e)
                                                                {
                                                                        alert(e);    
                                                                }
                                                        }else if( load_id[1] == "DFF" )
                                                        {
                                                                try{
                                                                        DF[ (load_id[2]-0) ] = new DFF( (load_id[2]-0) , conf  , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        DF[ (load_id[2]-0) ].create_DFF();
                                                                }catch(e)
                                                                {
                                                                        alert(e);    
                                                                }
                                                        }else if( load_id[1] == "TFF" )
                                                        {
                                                                try{
                                                                        TF[ (load_id[2]-0) ] = new TFF( (load_id[2]-0) , conf  , (load_pos[1]-0) , (load_pos[3]-0) );
                                                                        TF[ (load_id[2]-0) ].create_TFF();
                                                                }catch(e)
                                                                {
                                                                        alert(e);    
                                                                }
                                                        }                                                        
                                                }else if( load_id[1] == "LINE" || load_id[1] == "In" || load_id[1] == "Out" )
                                                {
                                                        var load_pos = load_number[1].split(" ");
                                                        if( load_id[1] == "LINE" )
                                                        {
                                                                //var load_pos = load_number[1].split(" ");
                                                                LI[ (load_id[2]-0) ] = new LINE( (load_id[2]-0) , conf ,(load_pos[1]-0), (load_pos[2]-0),(load_pos[4]-0),(load_pos[5]-0));
                                                                LI[ (load_id[2]-0) ].create_LINE();
                                                                ////create_line( load_id[1] , load_id[2] , conf , load_pos[1] , load_pos[2] , load_pos[4] , load_pos[5] );
                                                                //alert( "," + load[1] +"," + load[3] +"," + load[4] +"," + load[5] );
                                                        }else if( load_id[1] == "In" )
                                                        {
                                                                //var load_pos = load_number[1].split(" ");
                                                                In[ (load_id[2]-0) ] = new Inp( (load_id[2]-0) , conf ,(load_pos[1]-0), (load_pos[2]-0),(load_pos[4]-0),(load_pos[5]-0),load_pos[6] );
                                                                In[ (load_id[2]-0) ].create_In();
                                                        }else if( load_id[1] == "Out" )
                                                        {                                                            
                                                                //var load_pos = load_number[1].split(" ");
                                                                Out[ (load_id[2]-0) ] = new Outp( (load_id[2]-0) , conf ,(load_pos[1]-0), (load_pos[2]-0),(load_pos[4]-0),(load_pos[5]-0),load_pos[6] );
                                                                Out[ (load_id[2]-0) ].create_Out();
                                                        }
                                                }else if( load_id[1] == "TEXT" )
                                                {
                                                        var load_pos = load_number[1].split(" ");
                                                        //create_text( load_id[1] , load_id[2] , conf , load_pos[1] , load_pos[3] , load_pos[5] );
                                                        if( load_id[1] == "TEXT" )
                                                        {
                                                                Txt[ (load_id[2]-0) ] = new TEXT( (load_id[2]-0) , conf , load_pos[1] , load_pos[3] , load_pos[5] );
                                                                Txt[ (load_id[2]-0) ].create_TEXT();
                                                        }
                                                }
					}	
				}
			}
		}
	};

	//ファイルを保存
	this.click_SAVE = function()
	{
		save_data(count);

		var value = document.getElementById("result_read").value;
                //alert(value);
                document.getElementById("output_area").value = value;
                export_file( document.getElementById("BUTTON_SAVE") );
		//var sfile = "data:application/octet-stream," + encodeURIComponent(value);
		//document.getElementById("BUTTON_SAVE").setAttribute("href",sfile);
	}

	var px;
	var py;
	//ドラッグ中の関数
	this.drag = function(evt)
	{
                
               	document.getElementById("label_x_zahyo").textContent = "Ｘ座標：" + evt.pageX + "px" ; 
                document.getElementById("label_y_zahyo").textContent = "Ｙ座標：" + evt.pageY + "px" ;
                
		if(this.config.mode == "normal")
		{
			if(this.config.dragFlag == true)
			{
				var id = this.config.dragObj.getAttribute("id").split("_");


				if( id[1]  == "LINE" || id[1]  == "In" || id[1]  == "Out" )
				{
					px = evt.pageX;
					py = evt.pageY;

					var d_line = document.getElementById("l_" + id[1] + "_" + id[2] ).getAttribute("d").split(" ");


					//alert(this.config.dragObj.getAttribute("id"));


					this.config.dragObj.setAttribute( "cx", px );
					this.config.dragObj.setAttribute( "cy", py );


					if( id[3] == "1" )
					{
						document.getElementById("l_" + id[1] + "_"  + id[2] ).setAttribute( "d", "M " + px + " " + py + " L " + d_line[4] + " " + d_line[5] );

						if(id[1]  == "In" || id[1]  == "Out" )
						{
							document.getElementById( "text_" + id[1] + "_" + id[2] ).setAttribute( "x" , px-10 );
							document.getElementById( "text_" + id[1] + "_" + id[2] ).setAttribute( "y" , py-10 ); 
						}

					}else if( id[3] == "2" )
					{
						document.getElementById("l_"  + id[1] + "_" + id[2] ).setAttribute( "d", "M " + d_line[1] + " " + d_line[2] + " L " + px +" " + py );
					}

				}else if( id[1]  == "TEXT" ){
 					px = evt.pageX;
					py = evt.pageY;
					this.config.dragObj.setAttribute("transform","translate( " + (px-40) +" , " + (py-30) +" )" );                                       
                                }/*else if( id[1] == "kakidashiarea" )
                                {
                                     	px = evt.pageX;
					py = evt.pageY;
                                        
                                        var rect = document.getElementById( "rect_" + id[1] +"_" + id[2] );
                                       
                                        var pls_y_h = (rect.getAttribute("y")-0) + (rect.getAttribute("height")-0);
                                        
                                        var pls_x_w = (rect.getAttribute("x")-0) + (rect.getAttribute("width")-0);                                        
                                        
                                        if( id[3] == "topleft" )
                                        {
                                                //rect.setAttribute("height", ( 300 - (py-50)) );
                                                //rect.setAttribute("width", ( 350 - ( 450 - (px-100))) );        
                                                //rect.setAttribute("y", py-50 );
                                        }else if( id[3] == "topright" )
                                        {
                                                rect.setAttribute("height", ( pls_y_h - py) );
                                                rect.setAttribute("width", ( pls_x_w -  ( pls_x_w+(rect.getAttribute("x")-0)  -px)) );        
                                                rect.setAttribute("y", py);
                                        }else if( id[3] == "bottomleft" )
                                        {
                                                rect.setAttribute("height", ( pls_y_h - ( pls_y_h + (rect.getAttribute("y")-0) - py)) );
                                                rect.setAttribute("width", ( pls_x_w - px) );
                                                rect.setAttribute("x", px );
                                        }else if( id[3] == "bottomright" )
                                        {
                                                rect.setAttribute("height", ( 300 - ( 350 - (py-50))) );
                                                rect.setAttribute("width", ( 350 - ( 450 - (px-100))) );
                                        }
                                        this.config.dragObj.setAttribute("cx",px);
                                        this.config.dragObj.setAttribute("cy",py);
                                        
                                }*/else if( id[1] != "kakidashiarea" )
				{
					px = evt.pageX;
					py = evt.pageY;
					this.config.dragObj.setAttribute("transform","translate( " + (px-100) +" , " + (py-90) +" )" );
                                        
                                        if( id[1] == "AND" )
                                        {
                                                AND[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "OR"  )
                                        {
                                                OR[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "NOT"  )
                                        {
                                                NOT[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "NAND"  )
                                        {
                                                NAND[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "NOR"  )
                                        {
                                                NOR[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "EXOR"  )
                                        {
                                                EXOR[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "RSFF"  )
                                        {
                                                RS[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "JKFF"  )
                                        {
                                                JK[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "TFF"  )
                                        {
                                                TF[ (id[2] - 0) ].move_li();
                                        }else if(  id[1] == "DFF"  )
                                        {
                                                DF[ (id[2] - 0) ].move_li();
                                        }
                                }
			}
		}
                
                if( (this.config.mode == "normal") || (this.config.mode == "view") )
                {
                        if(this.config.dragFlag == true)
			{
                                var id = this.config.dragObj.getAttribute("id").split("_");
                                
                                if( id[1] == "kakidashiarea" )
                                {
                                    
                                     	px = evt.pageX;
					py = evt.pageY;
                                        
                                        var rect = document.getElementById( "rect_" + id[1] +"_" + id[2] );
                                       
                                        var pls_y_h = (rect.getAttribute("y")-0) + (rect.getAttribute("height")-0);
                                        
                                        var pls_x_w = (rect.getAttribute("x")-0) + (rect.getAttribute("width")-0);                                        
                                        
                                        if( id[3] == "topleft" )
                                        {
                                                //rect.setAttribute("height", ( 300 - (py-50)) );
                                                //rect.setAttribute("width", ( 350 - ( 450 - (px-100))) );        
                                                //rect.setAttribute("y", py-50 );
                                        }else if( id[3] == "topright" )
                                        {
                                                rect.setAttribute("height", ( pls_y_h - py) );
                                                rect.setAttribute("width", ( pls_x_w -  ( pls_x_w+(rect.getAttribute("x")-0)  -px)) );        
                                                rect.setAttribute("y", py);
                                        }else if( id[3] == "bottomleft" )
                                        {
                                                rect.setAttribute("height", ( pls_y_h - ( pls_y_h + (rect.getAttribute("y")-0) - py)) );
                                                rect.setAttribute("width", ( pls_x_w - px) );
                                                rect.setAttribute("x", px );
                                        }else if( id[3] == "bottomright" )
                                        {
                                                rect.setAttribute("height", ( 300 - ( 350 - (py-50))) );
                                                rect.setAttribute("width", ( 350 - ( 450 - (px-100))) );
                                        }
                                        this.config.dragObj.setAttribute("cx",px);
                                        this.config.dragObj.setAttribute("cy",py);
                                        
                                }
                        }
                }
                
	};

        this.check_kasanari = function( zahyou_list , count_te , x , y )
        {
                        
                        var count_kuromaru = 0;

                        var flag_te = false;
                        
                        if(  3 <= this.point_check( x , y ) )
                        {
                                for( var j=0; j<zahyou_list.length; j++ )
                                {
                                        if( zahyou_list[j] == x + "," + y ){
                                                flag_te = true;
                                        }else if( zahyou_list[j] != x + "," + y )
                                        {
                                        }
                                }
                                
                                if( flag_te != true )
                                {        
                                        /*
                                        //alert("aaa");
                                        count_kuromaru = count_kuromaru + 1;
                                        create_kuromaru( "kuromaru", count_kuromaru, conf, x , y  );
                                        count_te = count_te + 1;
                                        zahyou_list[ count_te ] = x + "," + y ;
                                        */
                                        count_kuromaru = count_kuromaru + 1;
                                        
                                       	this.counter.add("Kuromaru");
                                        Kuro[ this.counter.get("Kuromaru") ] = new Kuromaru( this.counter.get("Kuromaru") , this.config , x , y  );
                                        Kuro[ this.counter.get("Kuromaru") ].create_Kuromaru();
                                }
                        }
        }

	this.point_check_te = function()
	{

                document.getElementById("kuromarubox").removeChild( document.getElementById("create_kuromarubox") );
    
                var create_g =  document.createElementNS("http://www.w3.org/2000/svg", "g");
                create_g.setAttribute( "id" , "create_kuromarubox" );
                document.getElementById("kuromarubox").appendChild( create_g );
                create_g.setAttribute("transform","translate( 0 , 0 )" );
        
                var zahyou_list = new Array();
                zahyou_list[0] = "0";
                //alert(zahyou_list.length);
                var flag_te = false;
                var count_te = 0;
                
               
                this.counter.reset_Kuromaru();
                


                var x;
                var y;

               for ( var i=1; i <= count.get("AND"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , AND[i].x_in1 , AND[i].y_in1 );     
                                    this.check_kasanari( zahyou_list , count_te , AND[i].x_in2 , AND[i].y_in2 );   
                                    this.check_kasanari( zahyou_list , count_te , AND[i].x_out , AND[i].y_out );
                            }catch(e)
                            {
                            }

               }
               for ( var i=1; i <= count.get("OR"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , OR[i].x_in1 , OR[i].y_in1 );     
                                    this.check_kasanari( zahyou_list , count_te , OR[i].x_in2 , OR[i].y_in2 );   
                                    this.check_kasanari( zahyou_list , count_te , OR[i].x_out , OR[i].y_out );
                            }catch(e)
                            {
                            }
               }
               for ( var i=1; i <= count.get("NOT"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , NOT[i].x_in1 , NOT[i].y_in1 );       
                                    this.check_kasanari( zahyou_list , count_te , NOT[i].x_out , NOT[i].y_out );
                            }catch(e)
                            {
                            }
               }
               for ( var i=1; i <= count.get("NAND"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , NAND[i].x_in1 , NAND[i].y_in1 );     
                                    this.check_kasanari( zahyou_list , count_te , NAND[i].x_in2 , NAND[i].y_in2 );   
                                    this.check_kasanari( zahyou_list , count_te , NAND[i].x_out , NAND[i].y_out );
                            }catch(e)
                            {
                            }
               }
               for ( var i=1; i <= count.get("NOR"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , NOR[i].x_in1 , NOR[i].y_in1 );     
                                    this.check_kasanari( zahyou_list , count_te , NOR[i].x_in2 , NOR[i].y_in2 );   
                                    this.check_kasanari( zahyou_list , count_te , NOR[i].x_out , NOR[i].y_out );
                            }catch(e)
                            {
                            }
               }
               for ( var i=1; i <= count.get("EXOR"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , EXOR[i].x_in1 , EXOR[i].y_in1 );     
                                    this.check_kasanari( zahyou_list , count_te , EXOR[i].x_in2 , EXOR[i].y_in2 );   
                                    this.check_kasanari( zahyou_list , count_te , EXOR[i].x_out , EXOR[i].y_out );
                            }catch(e)
                            {
                            }
               }
               for ( var i=1; i <= count.get("LINE"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , LI[i].x_te1 , LI[i].y_te1 );     
                                    this.check_kasanari( zahyou_list , count_te , LI[i].x_te2 , LI[i].y_te2 );
                            }catch(e)
                            {
                            }
               }
               for ( var i=1; i <= count.get("In"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , In[i].x_te1 , In[i].y_te1 );     
                                    this.check_kasanari( zahyou_list , count_te , In[i].x_te2 , In[i].y_te2 );    
                            }catch(e)
                            {
                            }
               }
               for ( var i=1; i <= count.get("Out"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , Out[i].x_te1 , Out[i].y_te1 );     
                                    this.check_kasanari( zahyou_list , count_te , Out[i].x_te2 , Out[i].y_te2 );
                            }catch(e)
                            {
                            }
                }
               for ( var i=1; i <= count.get("RSFF"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , RS[i].x_r , RS[i].y_r );     
                                    this.check_kasanari( zahyou_list , count_te , RS[i].x_s , RS[i].y_s );   
                                    this.check_kasanari( zahyou_list , count_te , RS[i].x_q , RS[i].y_q );   
                                    this.check_kasanari( zahyou_list , count_te , RS[i].x_nq , RS[i].y_nq );
                            }catch(e)
                            {
                            }
               } 
               for ( var i=1; i <= count.get("JKFF"); i++ )
               {
                            try{
                                    this.check_kasanari( zahyou_list , count_te , RS[i].x_j , RS[i].y_j );     
                                    this.check_kasanari( zahyou_list , count_te , RS[i].x_k , RS[i].y_k );
                                    //this.check_kasanari( zahyou_list , count_te , RS[i].x_clk , RS[i].y_clk );
                                    this.check_kasanari( zahyou_list , count_te , RS[i].x_q , RS[i].y_q );   
                                    this.check_kasanari( zahyou_list , count_te , RS[i].x_nq , RS[i].y_nq );
                            }catch(e)
                            {
                            }
               } 
               for ( var i=1; i <= count.get("TFF"); i++ )
               {
                        try{
                            this.check_kasanari( zahyou_list , count_te , TF[i].x_t , TF[i].y_t );     
                            this.check_kasanari( zahyou_list , count_te , TF[i].x_clk , TF[i].y_clk );   
                            this.check_kasanari( zahyou_list , count_te , TF[i].x_q , TF[i].y_q );   
                            this.check_kasanari( zahyou_list , count_te , TF[i].x_nq , TF[i].y_nq );
                        }catch(e)
                        {    
                        }
               } 
               for ( var i=1; i <= count.get("DFF"); i++ )
               {
                        try{
                            this.check_kasanari( zahyou_list , count_te , DF[i].x_d , DF[i].y_d );     
                            this.check_kasanari( zahyou_list , count_te , DF[i].x_clk , DF[i].y_clk );   
                            this.check_kasanari( zahyou_list , count_te , DF[i].x_q , DF[i].y_q );   
                            this.check_kasanari( zahyou_list , count_te , DF[i].x_nq , DF[i].y_nq );
                        }catch(e)
                        {
                        }
               }
        };

	//３つ以上のオブジェクトの端子が重なっている点の座標を返す関数
	this.point_check = function( x , y )
	{
                var type="";
                var count_te=0;
                //var flag_te = false;
                //alert("yobidasi");
                
                
                for(var k=1; k<=13; k++)
                {
                        if( k == 1 )
                        {
                                type = "LINE";
                                for(var i=1; i<=count.get("LINE");i++)
                                {       
                                        try
                                        {
                                                LI[i].set_prop();
                                                if( (x == LI[i].x_te1 && y == LI[i].y_te1) || (x == LI[i].x_te2 && y == LI[i].y_te2) )
                                                {
                                                        count_te = count_te + 1;
                                                }   
                                        }catch(e){
                                            
                                        }
                                }
                        }else if( k == 2 )
                        {
                                type = "In"; 
                                for(var i=1; i<=count.get("In");i++)
                                {
                                        try{
                                            //alert("aaaaaaaaaaa");
                                            In[i].set_prop();
                                            if( (x == In[i].x_te1 && y == In[i].y_te1) || (x == In[i].x_te2 && y == In[i].y_te2) )
                                            {
                                                    count_te = count_te + 1;
                                            }
                                        }catch(e)
                                        {                                            
                                        }
                                }
                        }else if( k == 3 )
                        {
                                type = "Out";                            
                                for(var i=1; i<=count.get("Out");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                Out[i].set_prop();
                                                if( (x == Out[i].x_te1 && y == Out[i].y_te1) || (x == Out[i].x_te2 && y == Out[i].y_te2) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }
                                }
                        }else if( k == 4 )
                        {
                                type = "AND";
                                for(var i=1; i<=count.get("AND");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                AND[i].set_prop();
                                                if( (x == AND[i].x_in1 && y == AND[i].y_in1) || (x == AND[i].x_in2 && y == AND[i].y_in2) || (x == AND[i].x_out && y == AND[i].y_out) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {    
                                        }
                                }     
                        }else if( k == 5 )
                        {
                                type = "OR";
                                for(var i=1; i<=count.get("OR");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                OR[i].set_prop();
                                                if( (x == OR[i].x_in1 && y == OR[i].y_in1) || (x == OR[i].x_in2 && y == OR[i].y_in2) || (x == OR[i].x_out && y == OR[i].y_out) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                         }catch(e)
                                         {    
                                         }
                                }
                        }else if( k == 6 )
                        {
                                type = "NOT";
                                for(var i=1; i<=count.get("NOT");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                NOT[i].set_prop();
                                                if( (x == NOT[i].x_in1 && y == NOT[i].y_in1) || (x == NOT[i].x_out && y == NOT[i].y_out) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }
                                }                             
                        }else if( k == 7 )
                        {
                                type = "NAND";
                                for(var i=1; i<=count.get("NAND");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                NAND[i].set_prop();
                                                if( (x == NAND[i].x_in1 && y == NAND[i].y_in1) || (x == NAND[i].x_in2 && y == NAND[i].y_in2) || (x == NAND[i].x_out && y == NAND[i].y_out) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }
                                }
                        }else if( k == 8 )
                        {
                                type = "NOR";                            
                                for(var i=1; i<=count.get("NOR");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                NOR[i].set_prop();
                                                if( (x == NOR[i].x_in1 && y == NOR[i].y_in1) || (x == NOR[i].x_in2 && y == NOR[i].y_in2) || (x == NOR[i].x_out && y == NOR[i].y_out) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }
                                }
                        }else if( k == 9 )
                        {
                                type = "EXOR";                            
                                for(var i=1; i<=count.get("EXOR");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                EXOR[i].set_prop();
                                                if( (x == EXOR[i].x_in1 && y == EXOR[i].y_in1) || (x == EXOR[i].x_in2 && y == EXOR[i].y_in2) || (x == EXOR[i].x_out && y == EXOR[i].y_out) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }
                                }
                        }else if( k == 10 )
                        {
                                type = "JKFF";
                                for(var i=1; i<=count.get("JKFF");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                JK[i].set_prop();
                                                if( ( x == JK[i].x_j && y == JK[i].y_j ) || ( x == JK[i].x_k && y == JK[i].y_k ) || ( x == JK[i].x_clk && y == JK[i].y_clk ) || ( x == JK[i].x_q && y == JK[i].y_q ) || ( x == JK[i].x_nq && y == JK[i].y_nq ) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }
                                }
                        }else if( k == 11 )
                        {
                                type = "RSFF";                            
                                for(var i=1; i<=count.get("RSFF");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                RS[i].set_prop();
                                                if( ( x == RS[i].x_r && y == RS[i].y_r ) || ( x == RS[i].x_s && y == RS[i].y_s ) || ( x == RS[i].x_nq && y == RS[i].y_nq ) || ( x == RS[i].x_q && y == RS[i].y_q ) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }                                                
                                }
                        }else if( k == 12 )
                        {
                                type = "TFF"; 
                                for(var i=1; i<=count.get("TFF");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                TF[i].set_prop();
                                                if( ( x == TF[i].x_t && y == TF[i].y_t ) || ( x == TF[i].x_clk && y == TF[i].y_clk ) || ( x == TF[i].x_nq && y == TF[i].y_nq ) || ( x == TF[i].x_q && y == TF[i].y_q ) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }
                                }                                
                        }else if( k == 13 )
                        {
                                type = "DFF";
                                for(var i=1; i<=count.get("DFF");i++)
                                {
                                        try{
                                                //alert("aaaaaaaaaaa");
                                                DF[i].set_prop();
                                                if( ( x == DF[i].x_d && y == DF[i].y_d ) || ( x == DF[i].x_clk && y == DF[i].y_clk ) || ( x == DF[i].x_nq && y == DF[i].y_nq ) || ( x == DF[i].x_q && y == DF[i].y_q ) )
                                                {
                                                        count_te = count_te + 1;
                                                }
                                        }catch(e)
                                        {
                                        }
                                }
                        }                        
                }
                return( count_te );
	};

        //編集モードを通常状態に戻す
	this.change_mode_normal = function( mode )
	{
                //document.getElementById( "editbox" ).appendChild( document.getElementById("back_edit") );
                
                document.getElementById("kuromarubox").removeChild( document.getElementById("create_kuromarubox") );   
                var create_g =  document.createElementNS("http://www.w3.org/2000/svg", "g");
                create_g.setAttribute( "id" , "create_kuromarubox" );
                document.getElementById("kuromarubox").appendChild( create_g );
                create_g.setAttribute("transform","translate( 0 , 0 )" );
            
		this.config.mode = "normal";
		//alert(this.config.mode);

                if( mode == "AND" )
                {
                        document.getElementById("text_mode").textContent = "選択されたオブジェクト：AND";
                }
                else if( mode == "OR" )
                {
                        document.getElementById("text_mode").textContent = "選択されたオブジェクト：OR";                    
                }
                else if( mode == "NOT" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：NOT";
                }
                else if( mode == "NAND" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：NAND";
                }
                else if( mode == "NOR" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：NOR";
                }
                else if( mode == "EXOR" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：EXOR";
                }
                else if( mode == "JKFF" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：JKFF";
                }
                else if( mode == "RSFF" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：RSFF";
                }
                else if( mode == "TFF" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：TFF";
                }
                else if( mode == "DFF" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：DFF";
                }
                else if( mode == "TEXT" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：テキスト";
                }     
                else if( mode == "TEXT" )
                {
                       document.getElementById("text_mode").textContent = "選択されたオブジェクト：なし";
                }   
                
                document.getElementById("main").style.cursor = "default";

                this.not_touka_te();
	};
                
        //編集モードを線移動状態にする        
        this.change_mode_LINE = function( mode )
	{
                //document.getElementById( "editbox" ).appendChild( document.getElementById("back_edit") );
                
                document.getElementById("kuromarubox").removeChild( document.getElementById("create_kuromarubox") );   
                var create_g =  document.createElementNS("http://www.w3.org/2000/svg", "g");
                create_g.setAttribute( "id" , "create_kuromarubox" );
                document.getElementById("kuromarubox").appendChild( create_g );
                create_g.setAttribute("transform","translate( 0 , 0 )" );
            
		if( mode == "LINE" )
                {
                        this.config.mode = "put_LINE";
                        document.getElementById("text_mode").textContent = "選択されたオブジェクト：線";
                }else if( mode == "In" )
                {
                        this.config.mode = "put_In";
                        document.getElementById("text_mode").textContent = "選択されたオブジェクト：入力端子";
                }else if( mode == "Out" )
                {
                        this.config.mode = "put_Out";
                        document.getElementById("text_mode").textContent = "選択されたオブジェクト：出力端子";
                }
                
                document.getElementById("main").style.cursor = "default";
                
                this.not_touka_te();
	};

        //編集モードを消しゴム状態にする
	this.change_mode_eraser = function()
	{
                //document.getElementById( "editbox" ).appendChild( document.getElementById("back_edit") );
                
                document.getElementById("kuromarubox").removeChild( document.getElementById("create_kuromarubox") );   
                var create_g =  document.createElementNS("http://www.w3.org/2000/svg", "g");
                create_g.setAttribute( "id" , "create_kuromarubox" );
                document.getElementById("kuromarubox").appendChild( create_g );
                create_g.setAttribute("transform","translate( 0 , 0 )" );
            
		this.config.mode = "eraser";
		//alert(this.config.mode);
		document.getElementById("text_mode").textContent = "モード：消しゴム";
                
                //document.body.style.cursor = "move";
                document.getElementById("main").style.cursor = "url('image/icon_editor/keshigomu.gif'),url('image/icon_editor/keshigomu.png'),url('image/icon_editor/keshigomu.cur'),pointer";
                
                this.not_touka_te();
	};
        
        //編集モードをビュー状態にする
        this.change_mode_view = function()
	{
                //document.getElementById( "tmp_back" ).appendChild( document.getElementById("back_edit") );
		//document.getElementById("deleteitembox").removeChild( document.getElementById("gomi") );
                //document.getElementById("deleteitembox").appendChild( document.getElementById("gomi") );
                
                this.point_check_te();
                
                this.config.mode = "view";
		//alert(this.config.mode);
		document.getElementById("text_mode").textContent = "モード：ビュー";
                //AND[1].touka();
                
                this.touka_te();
        };

        //====================================================================================================
        //　すべてのオブジェクトの端子を透過していない状態にする関数
        //====================================================================================================
        this.not_touka_te = function()
        { 
               for ( var i=1; i <= count.get("AND"); i++ )
               {
                       try{
                            AND[i].set_prop();
                            AND[i].not_touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("OR"); i++ )
               {
                       try{
                            OR[i].set_prop();
                            OR[i].not_touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NOT"); i++ )
               {
                       try{
                            NOT[i].set_prop();
                            NOT[i].not_touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NAND"); i++ )
               {
                       try{
                            NAND[i].set_prop();
                            NAND[i].not_touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NOR"); i++ )
               {
                       try{
                            NOR[i].set_prop();
                            NOR[i].not_touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("EXOR"); i++ )
               {
                        try{
                                EXOR[i].set_prop();
                                EXOR[i].not_touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("LINE"); i++ )
               {
                       try{
                                LI[i].set_prop();
                                LI[i].not_touka();    
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("In"); i++ )
               {
                       try{
                               In[i].set_prop();
                               In[i].not_touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("Out"); i++ )
               {
                       try{
                                Out[i].set_prop();
                                Out[i].not_touka();
                       }catch(e){
                       }
               }
               for ( var i=1; i <= count.get("RSFF"); i++ )
               {
                       try{
                            RS[i].set_prop();
                            RS[i].not_touka();
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("JKFF"); i++ )
               {
                       try{
                            JK[i].set_prop();
                            JK[i].not_touka();
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("TFF"); i++ )
               {
                       try{
                            TF[i].set_prop();
                            TF[i].not_touka();
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("DFF"); i++ )
               {
                       try{
                            DF[i].set_prop();
                            DF[i].not_touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("TEXT"); i++ )
               {
                       try{
                            Txt[i].set_prop();
                            Txt[i].not_touka();
                       }catch(e)
                       {
                       }
               }
        };

        //====================================================================================================
        //　すべてのオブジェクトの端子を透過する関数
        //====================================================================================================
        this.touka_te = function()
        { 
               for ( var i=1; i <= count.get("AND"); i++ )
               {
                       try{
                            AND[i].set_prop();
                            AND[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("OR"); i++ )
               {
                       try{                   
                            OR[i].set_prop();
                            OR[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NOT"); i++ )
               {
                       try{
                            NOT[i].set_prop();
                            NOT[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NAND"); i++ )
               {
                       try{
                            NAND[i].set_prop();
                            NAND[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NOR"); i++ )
               {
                       try{
                            NOR[i].set_prop();
                            NOR[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("EXOR"); i++ )
               {
                       try{
                            EXOR[i].set_prop();
                            EXOR[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("LINE"); i++ )
               {
                       try{
                            LI[i].set_prop();
                            LI[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("In"); i++ )
               {
                       try{
                             In[i].set_prop();
                             In[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("Out"); i++ )
               {
                       try{
                            Out[i].set_prop();
                            Out[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("RSFF"); i++ )
               {
                       try{ 
                            RS[i].set_prop();
                            RS[i].touka();
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("JKFF"); i++ )
               {
                       try{
                            JK[i].set_prop();
                            JK[i].touka();
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("TFF"); i++ )
               {
                       try{
                            TF[i].set_prop();
                            TF[i].touka();
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("DFF"); i++ )
               {
                       try{
                            DF[i].set_prop();
                            DF[i].touka();
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("TEXT"); i++ )
               {
                       try{
                            Txt[i].set_prop();
                            Txt[i].touka();
                       }catch(e)
                       {
                       }
               }                
        };
        
        //====================================================================================================
        //　オブジェクトの原点座標を取得する関数
        //====================================================================================================
        this.get_position_obj = function( type , x , y , x2 , y2 , str )
        {
                var str_obj = "";
                
                var str_AND   = "gsave\n1 -1 scale\n-75 -75 translate\nnewpath\n75 105 moveto\n128 100 128 50 75 45 curveto\n-40 0 rlineto\n0 60 rlineto\n40 0 rlineto\n%closepath\n35 95 moveto\n-20 0 rlineto\n20 -40 rmoveto\n-20 0 rlineto\n100 20 rmoveto\n20 0 rlineto\nstroke\ngrestore\n";
                var str_OR    = "gsave\n1 -1 scale\n-75 -75 translate\nnewpath\n75 105 moveto\n100 100 110 85 115 75 curveto\n110 65 100 50 75 45 curveto\n-40 0 rlineto\n55 60 55 90 35 105 curveto\n40 0 rlineto\nclosepath\n45 95 moveto\n-30 0 rlineto\n30 -40 rmoveto\n-30 0 rlineto\n100 20 rmoveto\n20 0 rlineto\nstroke\ngrestore\n";
                var str_NOT   = "gsave\n1 -1 scale\n-75 -75 translate\nnewpath\n35 105 moveto\n80 -30 rlineto\nstroke\n120 75 5 0 360 arc\n-10 0 rmoveto\n-80 -30 rlineto\n0 60 rlineto\n35 75 moveto\n-20 0 rlineto\n110 0 rmoveto\n10 0 rlineto\nstroke\ngrestore\n";
                var str_NAND  = "gsave\n1 -1 scale\n-75 -75 translate\nnewpath\n75 105 moveto\n128 100 128 50 75 45 curveto\n-40 0 rlineto\n0 60 rlineto\n40 0 rlineto\nclosepath\nstroke\n120 75 5 0 360 arc\n35 95 moveto\n-20 0 rlineto\n20 -40 rmoveto\n-20 0 rlineto\n110 20 rmoveto\n10 0 rlineto\nstroke\ngrestore\n";
                var str_NOR   = "gsave\n1 -1 scale\n-75 -75 translate\nnewpath\n75 105 moveto\n100 100 110 85 115 75 curveto\n110 65 100 50 75 45 curveto\n-40 0 rlineto\n55 60 55 90 35 105 curveto\n40 0 rlineto\nclosepath\nstroke\n120 75 5 0 360 arc\n45 95 moveto\n-30 0 rlineto\n30 -40 rmoveto\n-30 0 rlineto\n110 20 rmoveto\n10 0 rlineto\nstroke\ngrestore\n";  
                var str_EXOR  = "gsave\n1 -1 scale\n-75 -75 translate\nnewpath\n75 105 moveto\n100 100 110 85 115 75 curveto\n110 65 100 50 75 45 curveto\n-40 0 rlineto\n55 60 55 90 35 105 curveto\n40 0 rlineto\n%closepath\n%stroke\n-50 -60 rmoveto\n45 60 45 90 25 105 curveto\n45 95 moveto\n-30 0 rlineto\n30 -40 rmoveto\n-30 0 rlineto\n100 20 rmoveto\n20 0 rlineto\nstroke\ngrestore\n";
                
                var str_RS = "gsave\n1 -1 scale\nnewpath\n-40 50 moveto\n0 -100 rlineto\n80 0 rlineto\n0 100 rlineto\n-80 0 rlineto\n0 -20 rmoveto\n-20 0 rlineto\n20 -60 rmoveto\n-20 0 rlineto\n100 60 rmoveto\n20 0 rlineto\n-20 -60 rmoveto\n20 0 rlineto\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-90 55 rmoveto\n(R) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-90 -5 rmoveto\n(S) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 55 rmoveto\n(Q) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 -5 rmoveto\n(Q) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 15 rmoveto\n(_) show\ngrestore\nstroke\ngrestore\n";
                var str_TF = "gsave\n1 -1 scale\nnewpath\n-40 50 moveto\n0 -100 rlineto\n80 0 rlineto\n0 100 rlineto\n-80 0 rlineto\n0 -20 rmoveto\n-20 0 rlineto\n20 -60 rmoveto\n-20 0 rlineto\n100 60 rmoveto\n20 0 rlineto\n-20 -60 rmoveto\n20 0 rlineto\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-90 55 rmoveto\n(T) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-90 -5 rmoveto\n(CLK) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 55 rmoveto\n(Q) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 -5 rmoveto\n(Q) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 15 rmoveto\n(_) show\ngrestore\nstroke\ngrestore\n";
                var str_DF = "gsave\n1 -1 scale\nnewpath\n-40 50 moveto\n0 -100 rlineto\n80 0 rlineto\n0 100 rlineto\n-80 0 rlineto\n0 -20 rmoveto\n-20 0 rlineto\n20 -60 rmoveto\n-20 0 rlineto\n100 60 rmoveto\n20 0 rlineto\n-20 -60 rmoveto\n20 0 rlineto\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-90 55 rmoveto\n(D) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-90 -5 rmoveto\n(CLK) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 55 rmoveto\n(Q) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 -5 rmoveto\n(Q) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 15 rmoveto\n(_) show\ngrestore\nstroke\ngrestore\n";
                var str_JK = "gsave\n1 -1 scale\nnewpath\n-40 50 moveto\n0 -100 rlineto\n80 0 rlineto\n0 100 rlineto\n-80 0 rlineto\n0 -20 rmoveto\n-20 0 rlineto\n20 -30 rmoveto\n-20 0 rlineto\n20 -30 rmoveto\n-20 0 rlineto\n100 60 rmoveto\n20 0 rlineto\n-20 -60 rmoveto\n20 0 rlineto\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-90 55 rmoveto\n(J) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-85 25 rmoveto\n(CLK) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-90 -5 rmoveto\n(K) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 55 rmoveto\n(Q) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 -5 rmoveto\n(Q) show\ngrestore\ngsave\n/Times-Roman findfont 20 scalefont setfont\n-45 15 rmoveto\n(_) show\ngrestore\n-100 40 rmoveto\n10 -10 rlineto\n-10 -10 rlineto\nstroke\ngrestore\n";
                
                //var str_TEXT = "";
                
                var str_Kuro = "gsave\n0 0 3 0 360 arc\nclosepath\nfill\nstroke\ngrestore\n";
                
                var str_end = "grestore\n";
            
                if( type == "AND" )
                {
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_AND + str_end;
                }else if( type == "OR" )
                {
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_OR + str_end;
                }else if( type == "NOT" )
                {
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_NOT + str_end;
                }else if( type == "NAND" )
                {
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_NAND + str_end;
                }else if( type == "NOR" )
                {
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";                    
                        str_obj = str_obj + str_NOR + str_end;
                }else if( type == "EXOR" )
                {
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";                    
                        str_obj = str_obj + str_EXOR + str_end;
                }else if( type == "LINE" ){
                        str_obj = str_obj + "gsave\n";                    
                        str_obj = str_obj + "newpath\n" + x + " " + y +" moveto\n" + x2 + " " + y2 + " lineto\nstroke\n" + str_end;
                }else if( type == "In" ){
                        str_obj = str_obj + "gsave\n";                    
                        str_obj = str_obj + "newpath\n" + x + " " + y +" moveto\n" + x2 + " " + y2 + " lineto\nstroke\n"
                        //str_obj = str_obj + "/Times-Roman findfont 20 scalefont setfont\n" + (x-10) + " " + (y-10) + " moveto\n1 -1 scale\n( " + str + " ) show\n"+ str_end;
                        str_obj = str_obj + "/GothicBBB-Medium-UniJIS-UTF8-H findfont 20 scalefont setfont\n" + (x-10) + " " + (y-10) + " moveto\n1 -1 scale\n( " + str + " ) show\n"+ str_end;
                }else if( type == "Out" ){
                        str_obj = str_obj + "gsave\n";                    
                        str_obj = str_obj + "newpath\n" + x + " " + y +" moveto\n" + x2 + " " + y2 + " lineto\nstroke\n"
                        //str_obj = str_obj + "/Times-Roman findfont 20 scalefont setfont\n" + (x-10) + " " + (y-10) + " moveto\n1 -1 scale\n( " + str + " ) show\n"+ str_end;
                        str_obj = str_obj + "/GothicBBB-Medium-UniJIS-UTF8-H findfont 20 scalefont setfont\n" + (x-10) + " " + (y-10) + " moveto\n1 -1 scale\n( " + str + " ) show\n"+ str_end;
                }else if( type == "TEXT" ){
                        str_obj = str_obj + "gsave\n";                    
                        //str_obj = str_obj + "newpath\nstroke\n";
                        str_obj = str_obj + "newpath\n" + (x+30) + " " + y +" moveto\n"
                        //str_obj = str_obj + "/Times-Roman findfont 20 scalefont setfont\n" + (x-10) + " " + (y-10) + " moveto\n1 -1 scale\n( " + str + " ) show\n"+ str_end;
                        str_obj = str_obj + "/GothicBBB-Medium-UniJIS-UTF8-H findfont 20 scalefont setfont\n1 -1 scale\n( " + str + " ) show\n"+ str_end;
                }else if( type == "RSFF" ){
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_RS + str_end;
                }else if( type == "TFF" ){
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_TF + str_end;
                }else if( type == "DFF" ){
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_DF + str_end;
                }else if( type == "JKFF" ){
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_JK + str_end;
                }else if( type == "Kuromaru" ){
                        str_obj = str_obj + "gsave\n";
                        str_obj = str_obj + x + " " + y + " translate\n";
                        str_obj = str_obj + str_Kuro + str_end;                        
                }
                return( str_obj );
        };
        
        //====================================================================================================
        //　オブジェクトの原点座標を取得する関数
        //====================================================================================================
        this.get_position = function(  )
        {
               this.change_mode_view();
               //alert("aaa");

                
               //alert(count.get("Kuromaru"));              
/*
               alert(Kuro[1].get_position("x"));
               alert(Kuro[2].get_position("x"));
               alert(Kuro[3].get_position("x"));

               alert(Kuro[4].get_position("x"));
               alert(Kuro[5].get_position("x"));
               alert(Kuro[6].get_position("x"));

               alert(Kuro[7].get_position("x"));
               alert(Kuro[8].get_position("x"));
               alert(Kuro[9].get_position("x"));*/


               //ここからsvgの領域をpsの座標にあわせる処理
               var x = (document.getElementById("rect_kakidashiarea_1").getAttribute("x") - 0);
               var y = (document.getElementById("rect_kakidashiarea_1").getAttribute("y") - 0);
               var x2 = x + (document.getElementById("rect_kakidashiarea_1").getAttribute("width") - 0);
               var y2 = y + (document.getElementById("rect_kakidashiarea_1").getAttribute("height") - 0);
                
               var width = (document.getElementById("rect_kakidashiarea_1").getAttribute("width") - 0);
               var height = (document.getElementById("rect_kakidashiarea_1").getAttribute("height") - 0);

               y = conf.height_screen - y;      //psではY軸の向きが逆なので
               y2 = conf.height_screen - y2;    //psではY軸の向きが逆なので
               //ここまで
     
               //this.point_check_te();
               
               var value = "";
               value = value + "%!PS-Adobe-3.0 EPSF-3.0\n";
               value = value + "%%BoundingBox: " + x + " " + y2 + " " + x2 + " " + y + "\n";
               //value = value + "%%BoundingBox: 0 0 500 500\n"
               value = value + "gsave\n";
               
               value = value + "0 " + conf.height_screen + " translate" + "\n";
               value = value + "1 -1 scale\n";
               
               //value = value + "gsave\n" + (EXOR[1].get_position("x")) + " " + (EXOR[1].get_position("y")) + " translate\n1 -1 scale\n-75 -75 translate\nnewpath\n75 105 moveto\n100 100 110 85 115 75 curveto\n110 65 100 50 75 45 curveto\n-40 0 rlineto\n55 60 55 90 35 105 curveto\n40 0 rlineto\nclosepath\n45 95 moveto\n-30 0 rlineto\n30 -40 rmoveto\n-30 0 rlineto\n100 20 rmoveto\n20 0 rlineto\nstroke\ngrestore\n";
               
               for ( var i=1; i <= count.get("AND"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "AND" , AND[i].get_position("x") , AND[i].get_position("y") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("OR"); i++ )
               {
                       try{                   
                                value = value + this.get_position_obj( "OR" , OR[i].get_position("x") , OR[i].get_position("y") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NOT"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "NOT" , NOT[i].get_position("x") , NOT[i].get_position("y") ); 
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NAND"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "NAND" , NAND[i].get_position("x") , NAND[i].get_position("y") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("NOR"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "NOR" , NOR[i].get_position("x") , NOR[i].get_position("y") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("EXOR"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "EXOR" , EXOR[i].get_position("x") , EXOR[i].get_position("y") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("LINE"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "LINE" , LI[i].get_position("x1") , LI[i].get_position("y1") , LI[i].get_position("x2") , LI[i].get_position("y2") );         
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("In"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "In" , In[i].get_position("x1") , In[i].get_position("y1") , In[i].get_position("x2") , In[i].get_position("y2") , In[i].get_position("str") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("Out"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "Out" , Out[i].get_position("x1") , Out[i].get_position("y1") , Out[i].get_position("x2") , Out[i].get_position("y2") , Out[i].get_position("str") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("RSFF"); i++ )
               {
                       try{ 
                                value = value + this.get_position_obj( "RSFF" , RS[i].get_position("x") , RS[i].get_position("y") );         
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("JKFF"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "JKFF" , JK[i].get_position("x") , JK[i].get_position("y") );         
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("TFF"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "TFF" , TF[i].get_position("x") , TF[i].get_position("y") );
                       }catch(e)
                       {
                       }
               } 
               for ( var i=1; i <= count.get("DFF"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "DFF" , DF[i].get_position("x") , DF[i].get_position("y") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("TEXT"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "TEXT" , Txt[i].get_position("x") , Txt[i].get_position("y") , 0 , 0 , Txt[i].get_position("str") );
                       }catch(e)
                       {
                       }
               }
               for ( var i=1; i <= count.get("Kuromaru"); i++ )
               {
                       try{
                                value = value + this.get_position_obj( "Kuromaru" , Kuro[i].get_position("x") , Kuro[i].get_position("y") );
                       }catch(e)
                       {
                       }
               }

               value = value + "grestore\n";

               //var sfile = "data:application/octet-stream," + encodeURIComponent(value);
               var sfile = "data:application/octet-stream," + encodeURI(value);
               document.getElementById("BUTTON_pointgetter").setAttribute('download', 'new-file.eps');
               document.getElementById("BUTTON_pointgetter").setAttribute("href",sfile);
               
               this.change_mode_normal(); 
               
        };  
        
        this.click_svgbox = function(evt)
        {
                if( this.config.mode == "put_LINE" )
                {
                        this.counter.add("LINE");
                        LI[ this.counter.get("LINE") ] = new LINE( this.counter.get("LINE") , this.config ,100, 100, 300, 100 );
                        LI[ this.counter.get("LINE") ].create_drag_LINE( evt );
                }else if( this.config.mode == "put_In" )
                {       
                        this.counter.add("In");
                        In[ this.counter.get("In") ] = new Inp( this.counter.get("In") , this.config ,100, 100, 300, 100 , ("In_"+this.counter.get("In")) );
                        In[ this.counter.get("In") ].create_drag_In( evt );                    
                }else if( this.config.mode == "put_Out" )
                {
                        this.counter.add("Out");
                        Out[ this.counter.get("Out") ] = new Outp( this.counter.get("Out") , this.config ,100, 100, 300, 100 , ( "Out_"+this.counter.get("Out")) );
                        Out[ this.counter.get("Out") ].create_drag_Out( evt );                      
                }else if( this.config.mode == "normal" )
                {
                       this.drag( evt );
                }
        }
}

