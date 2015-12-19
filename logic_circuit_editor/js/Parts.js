//====================================================================================================
//　黒丸
//====================================================================================================
var Kuromaru = function( n , conf , x , y )
{
	this.config = conf

	this.id;
 
        this.gla;
        
        this.gla_po;
 
        this.x;
        this.y;

	this.type = "Kuromaru";
        this.number = n;

	this.create_Kuromaru = function()
	{
                this.gla = create_kuromaru(  this.type , this.number ,this.config , x, y);
                this.set_prop();
	};
        
        this.set_prop = function()
        {
                this.id = this.gla.getAttribute("id");
                
                this.gla_po = document.getElementById( "ellipse_" + this.type + "_" + this.number );
                
                this.x = this.gla_po.getAttribute("cx");
                this.y = this.gla_po.getAttribute("cy");

        }        

        this.del_prop = function()
        {
            this.gla = null;

            this.gla_po = null;

            this.id = null;
    
            this.x = null;
            this.y = null;
    
        }

        this.get_position = function( point )
        {
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x );
                        
                }else if( point == "y" )
                {
                        return( this.y );
                }
        }
}

//====================================================================================================
//　ANDゲート
//====================================================================================================
var ANDGate = function( n , conf , x , y )
{
	this.config = conf

	this.id;
        
        this.gla;
        this.gla_path;
        this.gla_in1;
        this.gla_in2;
        this.gla_out;

        this.x_po;
        this.y_po;

	this.x_in1;
	this.y_in1;

	this.x_in2;
	this.y_in2;

	this.x_out;
	this.y_out;
        
	this.type = "AND";

	this.number = n;
        
        var obj_list_in1 = new Array();
        var te_list_in1 = new Array();
        var obj_list_in2 = new Array();
        var te_list_in2 = new Array();
        var obj_list_out = new Array();
        var te_list_out = new Array();

	this.create_AND = function()
	{
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();
	};
        
        this.create_drag_AND =function(evt)
        {
                        
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();            
            
            this.search_li(); 
            $("#toolbox").fadeTo("fast", 0.33);
            jQuery( '#object_palette' ).draggable('disable');
            $("#object_palette").fadeTo("fast", 0.33);
            click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
                this.id = this.gla.getAttribute("id");
            
                var point = this.gla.getAttribute("transform").split(" ");
           
                this.x_po = (point[1]-0) + 100;
                this.y_po = (point[3]-0) + 90;
           
                this.x_in1 = (point[1]-0) - 60 + 100;
                this.y_in1 = (point[3]-0) - 20 + 90;
                this.x_in2 = (point[1]-0) - 60 + 100;
                this.y_in2 = (point[3]-0) + 20 + 90;
                this.x_out = (point[1]-0) + 60 + 100;
                this.y_out = (point[3]-0) - 0 + 90;
            
                this.gla_path = document.getElementById( "path_" + this.type + "_" + this.number ); 
                this.gla_in1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
                this.gla_in2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
                this.gla_out = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out" );
                //"id","ellipse_" + type + "_" + number + "_out" 
        }
        
        this.touka = function()
        {
                this.gla_in1.setAttribute("opacity","0");
                this.gla_in2.setAttribute("opacity","0"); 
                this.gla_out.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_in1.setAttribute("opacity","1");
                this.gla_in2.setAttribute("opacity","1"); 
                this.gla_out.setAttribute("opacity","1"); 
        }

        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_in1.length = 0;
                te_list_in1.length = 0;
                obj_list_in2.length = 0;
                te_list_in2.length = 0;
                obj_list_out.length = 0;
                te_list_out.length = 0;
                
                this.set_prop();
                
                conf.main.search_line( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.search_line( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.search_line( obj_list_out , te_list_out , this.x_out , this.y_out );

        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.move_line_with_gate( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.move_line_with_gate( obj_list_out , te_list_out , this.x_out , this.y_out );
        }        
        
        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;

            this.x_po = null;
            this.y_po = null;

            this.x_in1 = null;
            this.y_in1 = null;
            this.x_in2 = null;
            this.y_in2 = null;
            this.x_out = null;
            this.y_out = null;            
        }

        this.get_position = function( point )
        {
            
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }

        /*
        this.get_prop = function( name , pos )
        {
            this.set_prop();
            
            if( name == "id" )
            {
                return(this.id);
            }else if( name == "in1" )
            {
                if( pos == "x" )
                {
                    return( x_in1 );
                }else if( pos == "y" )
                {
                    return( y_in1 );
                }
            }else if( name == "in2" )
            {
                if( pos == "x" )
                {
                    return( x_in2 );
                }else if( pos == "y" )
                {
                    return( y_in2 );
                }
            }else if( name == "out" )
            {
                if( pos == "x" )
                {
                    return( x_out );
                }else if( pos == "y" )
                {
                    return( y_out );
                }                
            }
        }*/
}

//====================================================================================================
//　NANDゲート
//====================================================================================================
var NANDGate = function( n , conf , x , y )
{
	this.id;
	this.config = conf
        
        this.gla;
        this.gla_in1;
        this.gla_in2;
        this.gla_out;

        this.x_po;
        this.y_po;

	this.x_in1;
	this.y_in1;

	this.x_in2;
	this.y_in2;

	this.x_out;
	this.y_out;

	this.type = "NAND";

	this.number = n;
        
        var obj_list_in1 = new Array();
        var te_list_in1 = new Array();
        var obj_list_in2 = new Array();
        var te_list_in2 = new Array();
        var obj_list_out = new Array();
        var te_list_out = new Array();

	this.create_NAND = function()
	{
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();
        };

        this.create_drag_NAND =function(evt)
        {
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();            
            
            this.search_li(); 
            $("#toolbox").fadeTo("fast", 0.33);
            jQuery( '#object_palette' ).draggable('disable');
            $("#object_palette").fadeTo("fast", 0.33);            
            click_parts(evt,this.gla,conf);
        };

        this.set_prop = function()
        {
            this.id = this.gla.getAttribute("id");
            
            var point = this.gla.getAttribute("transform").split(" ");
            
            this.x_po = (point[1]-0) + 100;
            this.y_po = (point[3]-0) + 90;
            
            this.x_in1 = (point[1]-0) - 60 + 100;
            this.y_in1 = (point[3]-0) - 20 + 90;
            this.x_in2 = (point[1]-0) - 60 + 100;
            this.y_in2 = (point[3]-0) + 20 + 90;
            this.x_out = (point[1]-0) + 60 + 100;
            this.y_out = (point[3]-0) - 0 + 90;                
            
            this.gla_in1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
            this.gla_in2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
            this.gla_out = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out" );
            //"id","ellipse_" + type + "_" + number + "_out" 
        }
        
        this.touka = function()
        {
                this.gla_in1.setAttribute("opacity","0");
                this.gla_in2.setAttribute("opacity","0"); 
                this.gla_out.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_in1.setAttribute("opacity","1");
                this.gla_in2.setAttribute("opacity","1"); 
                this.gla_out.setAttribute("opacity","1"); 
        }
        
        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_in1.length = 0;
                te_list_in1.length = 0;
                obj_list_in2.length = 0;
                te_list_in2.length = 0;
                obj_list_out.length = 0;
                te_list_out.length = 0;
                
                this.set_prop();
                
                conf.main.search_line( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.search_line( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.search_line( obj_list_out , te_list_out , this.x_out , this.y_out );

        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.move_line_with_gate( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.move_line_with_gate( obj_list_out , te_list_out , this.x_out , this.y_out );
        }  
        
        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
           
            this.x_po = null;
            this.y_po = null;
           
            this.x_in1 = null;
            this.y_in1 = null;
            this.x_in2 = null;
            this.y_in2 = null;
            this.x_out = null;
            this.y_out = null;            
        }
        
        this.get_position = function( point )
        {
            
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }
        
}

//====================================================================================================
//　ORゲート
//====================================================================================================
var ORGate = function( n , conf  , x, y)
{
	this.id;
	this.config = conf
        
        this.gla;
        this.gla_in1;
        this.gla_in2;
        this.gla_out;

        this.x_po;
        this.y_po;

	this.x_in1;
	this.y_in1;

	this.x_in2;
	this.y_in2;

	this.x_out;
	this.y_out;

	this.type = "OR";

	this.number = n;
        
        var obj_list_in1 = new Array();
        var te_list_in1 = new Array();
        var obj_list_in2 = new Array();
        var te_list_in2 = new Array();
        var obj_list_out = new Array();
        var te_list_out = new Array();

	this.create_OR = function()
	{
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();
        };
        
        this.create_drag_OR = function(evt)
        {
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();            
            
            this.search_li(); 
            $("#toolbox").fadeTo("fast", 0.33);
            jQuery( '#object_palette' ).draggable('disable');
            $("#object_palette").fadeTo("fast", 0.33);            
            click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
            this.id = this.gla.getAttribute("id");
            
            var point = this.gla.getAttribute("transform").split(" ");
            
            this.x_po = (point[1]-0) + 100;
            this.y_po = (point[3]-0) + 90;
            
            this.x_in1 = (point[1]-0) - 60 + 100;
            this.y_in1 = (point[3]-0) - 20 + 90;
            this.x_in2 = (point[1]-0) - 60 + 100;
            this.y_in2 = (point[3]-0) + 20 + 90;
            this.x_out = (point[1]-0) + 60 + 100;
            this.y_out = (point[3]-0) - 0 + 90;               
            
            this.gla_in1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
            this.gla_in2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
            this.gla_out = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out" );
            //"id","ellipse_" + type + "_" + number + "_out" 
        }
        
        this.touka = function()
        {
                this.gla_in1.setAttribute("opacity","0");
                this.gla_in2.setAttribute("opacity","0"); 
                this.gla_out.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_in1.setAttribute("opacity","1");
                this.gla_in2.setAttribute("opacity","1"); 
                this.gla_out.setAttribute("opacity","1"); 
        }
        
        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_in1.length = 0;
                te_list_in1.length = 0;
                obj_list_in2.length = 0;
                te_list_in2.length = 0;
                obj_list_out.length = 0;
                te_list_out.length = 0;
                
                this.set_prop();
                
                conf.main.search_line( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.search_line( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.search_line( obj_list_out , te_list_out , this.x_out , this.y_out );

        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.move_line_with_gate( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.move_line_with_gate( obj_list_out , te_list_out , this.x_out , this.y_out );
        }  
        
        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
           
            this.x_po = null;
            this.y_po = null;
           
            this.x_in1 = null;
            this.y_in1 = null;
            this.x_in2 = null;
            this.y_in2 = null;
            this.x_out = null;
            this.y_out = null;            
        }
        
        this.get_position = function( point )
        {
            
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }

}

//====================================================================================================
//　NORゲート
//====================================================================================================
var NORGate = function( n , conf , x, y)
{
	this.id;
	this.config = conf
        
        this.gla;
        this.gla_in1;
        this.gla_in2;
        this.gla_out;
        
        this.x_po;
        this.y_po;

	this.x_in1;
	this.y_in1;

	this.x_in2;
	this.y_in2;

	this.x_out;
	this.y_out;

	this.type = "NOR";

	this.number = n;
        
        var obj_list_in1 = new Array();
        var te_list_in1 = new Array();
        var obj_list_in2 = new Array();
        var te_list_in2 = new Array();
        var obj_list_out = new Array();
        var te_list_out = new Array();

	this.create_NOR = function()
	{
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();
	};
        
        this.create_drag_NOR =function(evt)
        {
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();            
            
            this.search_li(); 
            $("#toolbox").fadeTo("fast", 0.33);
            jQuery( '#object_palette' ).draggable('disable');
            $("#object_palette").fadeTo("fast", 0.33);            
            click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
            this.id = this.gla.getAttribute("id");
            
            var point = this.gla.getAttribute("transform").split(" ");
            
            this.x_po = (point[1]-0) + 100;
            this.y_po = (point[3]-0) + 90;
            
            this.x_in1 = (point[1]-0) - 60 + 100;
            this.y_in1 = (point[3]-0) - 20 + 90;
            this.x_in2 = (point[1]-0) - 60 + 100;
            this.y_in2 = (point[3]-0) + 20 + 90;
            this.x_out = (point[1]-0) + 60 + 100;
            this.y_out = (point[3]-0) - 0 + 90;    
            
            this.gla_in1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
            this.gla_in2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
            this.gla_out = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out" );
            //"id","ellipse_" + type + "_" + number + "_out" 
        }
        
        this.touka = function()
        {
                this.gla_in1.setAttribute("opacity","0");
                this.gla_in2.setAttribute("opacity","0"); 
                this.gla_out.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_in1.setAttribute("opacity","1");
                this.gla_in2.setAttribute("opacity","1"); 
                this.gla_out.setAttribute("opacity","1"); 
        }
        
        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_in1.length = 0;
                te_list_in1.length = 0;
                obj_list_in2.length = 0;
                te_list_in2.length = 0;
                obj_list_out.length = 0;
                te_list_out.length = 0;
                
                this.set_prop();
                
                conf.main.search_line( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.search_line( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.search_line( obj_list_out , te_list_out , this.x_out , this.y_out );

        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.move_line_with_gate( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.move_line_with_gate( obj_list_out , te_list_out , this.x_out , this.y_out );
        }  
        
        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
           
            this.x_po = null;
            this.y_po = null;
           
            this.x_in1 = null;
            this.y_in1 = null;
            this.x_in2 = null;
            this.y_in2 = null;
            this.x_out = null;
            this.y_out = null;            
        }
        
        this.get_position = function( point )
        {
            
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }      
}

//====================================================================================================
//　EXORゲート
//====================================================================================================
var EXORGate = function( n , conf , x, y)
{
	this.id;
	this.config = conf

        this.gla;
        this.gla_in1;
        this.gla_in2;
        this.gla_out;
        
        this.x_po;
        this.y_po;

	this.x_in1;
	this.y_in1;

	this.x_in2;
	this.y_in2;

	this.x_out;
	this.y_out;

	this.type = "EXOR";

	this.number = n;
        
        var obj_list_in1 = new Array();
        var te_list_in1 = new Array();
        var obj_list_in2 = new Array();
        var te_list_in2 = new Array();
        var obj_list_out = new Array();
        var te_list_out = new Array();

	this.create_EXOR = function()
	{
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();
	};
        
        this.create_drag_EXOR =function(evt)
        {
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();            
            
            this.search_li(); 
            $("#toolbox").fadeTo("fast", 0.33);
            jQuery( '#object_palette' ).draggable('disable');
            $("#object_palette").fadeTo("fast", 0.33);            
            click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
            this.id = this.gla.getAttribute("id");
            
            var point = this.gla.getAttribute("transform").split(" ");
            
            this.x_po = (point[1]-0) + 100;
            this.y_po = (point[3]-0) + 90;
                
            this.x_in1 = (point[1]-0) - 60 + 100;
            this.y_in1 = (point[3]-0) - 20 + 90;
            this.x_in2 = (point[1]-0) - 60 + 100;
            this.y_in2 = (point[3]-0) + 20 + 90;
            this.x_out = (point[1]-0) + 60 + 100;
            this.y_out = (point[3]-0) - 0 + 90;
            
            this.gla_in1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
            this.gla_in2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
            this.gla_out = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out" );
            //"id","ellipse_" + type + "_" + number + "_out" 
        }
        
        this.touka = function()
        {
                this.gla_in1.setAttribute("opacity","0");
                this.gla_in2.setAttribute("opacity","0"); 
                this.gla_out.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_in1.setAttribute("opacity","1");
                this.gla_in2.setAttribute("opacity","1"); 
                this.gla_out.setAttribute("opacity","1"); 
        }
        
        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_in1.length = 0;
                te_list_in1.length = 0;
                obj_list_in2.length = 0;
                te_list_in2.length = 0;
                obj_list_out.length = 0;
                te_list_out.length = 0;
                
                this.set_prop();
                
                conf.main.search_line( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.search_line( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.search_line( obj_list_out , te_list_out , this.x_out , this.y_out );
        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.move_line_with_gate( obj_list_in2 , te_list_in2 , this.x_in2 , this.y_in2 );
                conf.main.move_line_with_gate( obj_list_out , te_list_out , this.x_out , this.y_out );
        }

        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
            
            this.x_po = null;
            this.y_po = null;           
            
            this.x_in1 = null;
            this.y_in1 = null;
            this.x_in2 = null;
            this.y_in2 = null;
            this.x_out = null;
            this.y_out = null;            
        }
        
        this.get_position = function( point )
        {
            
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }
}

//====================================================================================================
//　NOTゲート
//====================================================================================================
var NOTGate = function( n , conf , x, y)
{
	this.id;
	this.config = conf

        this.gla;
        this.gla_in1;
        this.gla_out;

        this.x_po;
        this.y_po;

	this.x_in1;
	this.y_in1;

	this.x_out;
	this.y_out;

	this.type = "NOT";

	this.number = n;

        var obj_list_in1 = new Array();
        var te_list_in1 = new Array();
        var obj_list_out = new Array();
        var te_list_out = new Array();

	this.create_NOT = function()
	{
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();
        };
        
        this.create_drag_NOT =function(evt)
        {
            this.gla = create_parts( this , this.type , this.number ,this.config , x, y);
            this.set_prop();            
            
            this.search_li(); 
            $("#toolbox").fadeTo("fast", 0.33);
            jQuery( '#object_palette' ).draggable('disable');
            $("#object_palette").fadeTo("fast", 0.33);            
            click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
            this.id = this.gla.getAttribute("id");
            
            var point = this.gla.getAttribute("transform").split(" ");
            
            this.x_po = (point[1]-0) + 100;
            this.y_po = (point[3]-0) + 90;
            
            this.x_in1 = (point[1]-0) - 60 + 100;
            this.y_in1 = (point[3]-0) - 0 + 90;
            this.x_out = (point[1]-0) + 60 + 100;
            this.y_out = (point[3]-0) - 0 + 90;
            
            this.gla_in1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
            this.gla_out = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out" );
            //"id","ellipse_" + type + "_" + number + "_out" 
        }
        
        this.touka = function()
        {
                this.gla_in1.setAttribute("opacity","0");
                this.gla_out.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_in1.setAttribute("opacity","1");
                this.gla_out.setAttribute("opacity","1"); 
        }
        
        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_in1.length = 0;
                te_list_in1.length = 0;
                obj_list_out.length = 0;
                te_list_out.length = 0;
                
                this.set_prop();
                
                conf.main.search_line( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.search_line( obj_list_out , te_list_out , this.x_out , this.y_out );

        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_in1 , te_list_in1 , this.x_in1 , this.y_in1 );
                conf.main.move_line_with_gate( obj_list_out , te_list_out , this.x_out , this.y_out );
        } 
        
        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
           
            this.x_po = null;
            this.y_po = null;
                
            this.x_in1 = null;
            this.y_in1 = null;
            this.x_out = null;
            this.y_out = null;            
        }
        
        this.get_position = function( point )
        {    
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }
}

//====================================================================================================
//　LINE
//====================================================================================================
var LINE = function( n , conf , x1 , y1 , x2 , y2 )
{
	this.id;
	this.config = conf

	this.type = "LINE";

        this.gla;
        this.gla_te1;
        this.gla_te2;

        this.x_te1;
        this.y_te1;
        this.x_te2;
        this.x_te2;

        var px;
	var py;
        var stoppx;
        var stoppy;

        this.path_line;

	this.number = n;

	this.create_LINE = function()
	{
		this.gla = create_line( this.type , this.number ,this.config , x1 , y1 , x2 , y2 );
                //alert( this.gla.getAttribute("id") )
                this.set_prop();
                //alert( this.x_te1 );
	};
        
        this.create_drag_LINE = function( evt )
        {
                    //alert("aaa");
                
                        this.config.main.change_mode_normal();

                        this.gla = create_line( this.type , this.number ,this.config , x1 , y1 , x2 , y2 );
                        //alert( this.gla.getAttribute("id") )
                        this.set_prop();
                        //alert( this.x_te1 );
                
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

                        this.gla_te1.setAttribute( "cx", stoppx );
                        this.gla_te1.setAttribute( "cy", stoppy );
                        
                        var d_line = this.path_line.getAttribute("d").split(" ");
                        this.path_line.setAttribute( "d","M " + stoppx + " " + stoppy + " L " + d_line[4] + " "  + d_line[5] );

                        this.set_prop();

                        document.getElementById("tmp").appendChild( this.gla );		//作業用のグループにパーツを移動することで移動時は常に最全面に
			
                        this.gla_te2.setAttribute( "cx", px );
                	this.gla_te2.setAttribute( "cy", py );
                        
                        var d_line = this.path_line.getAttribute("d").split(" ");
                        this.path_line.setAttribute( "d","M " + d_line[1] + " " + d_line[2] + " L " + px + " "  + py );

                        conf.dragFlag = true;
                        conf.dragObj = this.gla_te2;
        };
        
        this.set_prop = function()
        {
                this.id = this.gla.getAttribute("id")
                this.x_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" ).getAttribute("cx");
                this.y_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" ).getAttribute("cy");
                this.x_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" ).getAttribute("cx");
                this.y_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" ).getAttribute("cy");
                
                this.gla_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" );
                this.gla_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" );
                
                this.path_line = document.getElementById( "l_" + this.type + "_" + this.number );
        }
        
        this.touka = function()
        {
                this.gla_te1.setAttribute("opacity","0");
                this.gla_te2.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_te1.setAttribute("opacity","1");
                this.gla_te2.setAttribute("opacity","1"); 
        }
        
        this.get_position = function( point )
        {
                this.set_prop();       
                
                if( point == "x1" )
                {
                        return( this.x_te1 );
                        
                }else if( point == "y1" )
                {
                        return( this.y_te1 );
                }else if( point == "x2" )
                {
                        return( this.x_te2 );
                }else if( point == "y2" )
                {
                        return( this.y_te2 );
                }
        }        
}

//====================================================================================================
//　入力端子
//====================================================================================================
var Inp = function( n , conf , x1 , y1 , x2 , y2 , str )
{
	this.id;
	this.config = conf

	this.type = "In";
        
        this.gla;
        this.gla_te1;
        this.gla_te2;

        this.x_te1;
        this.y_te1;
        this.x_te2;
        this.x_te2;
        
        var px;
	var py;
        var stoppx;
        var stoppy;
        
        this.path_line;
        
        this.txt;
        this.str;

	this.number = n;

	this.create_In = function()
	{
		this.gla = create_line( this.type , this.number ,this.config , x1 , y1 , x2 , y2 , str );
                this.set_prop();                
        };
        
        this.create_drag_In = function( evt )
        {
                //alert("aaa");
                
                this.config.main.change_mode_normal();

                this.gla = create_line( this.type , this.number ,this.config , x1 , y1 , x2 , y2 , str );
                        //alert( this.gla.getAttribute("id") )
                this.set_prop();
                        //alert( this.x_te1 );
                
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

                this.gla_te1.setAttribute( "cx", stoppx );
                this.gla_te1.setAttribute( "cy", stoppy );
                
                this.txt.setAttribute( "x" , stoppx-10 );
		this.txt.setAttribute( "y" , stoppy-10 ); 
                        
                var d_line = this.path_line.getAttribute("d").split(" ");
                this.path_line.setAttribute( "d","M " + stoppx + " " + stoppy + " L " + d_line[4] + " "  + d_line[5] );

                this.set_prop();

                document.getElementById("tmp").appendChild( this.gla );		//作業用のグループにパーツを移動することで移動時は常に最全面に
			
                this.gla_te2.setAttribute( "cx", px );
                this.gla_te2.setAttribute( "cy", py );
                        
                var d_line = this.path_line.getAttribute("d").split(" ");
                this.path_line.setAttribute( "d","M " + d_line[1] + " " + d_line[2] + " L " + px + " "  + py );

                conf.dragFlag = true;
                conf.dragObj = this.gla_te2;
        };
        
        this.set_prop = function()
        {
                this.id = this.gla.getAttribute("id");
                this.x_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" ).getAttribute("cx");
                this.y_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" ).getAttribute("cy");
                this.x_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" ).getAttribute("cx");
                this.y_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" ).getAttribute("cy");
                
                this.str = document.getElementById( "text_" + this.type + "_" + this.number ).textContent;
                this.txt = document.getElementById( "text_" + this.type + "_" + this.number );
        
                this.gla_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" );
                this.gla_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" );
                
                this.path_line = document.getElementById( "l_" + this.type + "_" + this.number );
        }
        
        this.touka = function()
        {
                this.gla_te1.setAttribute("opacity","0");
                this.gla_te2.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_te1.setAttribute("opacity","1");
                this.gla_te2.setAttribute("opacity","1"); 
        }
        
        
        this.get_position = function( point )
        {
                this.set_prop();       
                
                if( point == "x1" )
                {
                        return( this.x_te1 );
                        
                }else if( point == "y1" )
                {
                        return( this.y_te1 );
                }else if( point == "x2" )
                {
                        return( this.x_te2 );
                        
                }else if( point == "y2" )
                {
                        return( this.y_te2 );
                }else if( point == "str" )
                {
                        return( this.str );
                }
        }
}

//====================================================================================================
//　出力端子
//====================================================================================================
var Outp = function( n , conf , x1 , y1 , x2 , y2 , str )
{
	this.id;
	this.config = conf

	this.type = "Out";
        
        this.gla;
        this.gla_te1;
        this.gla_te2;        

        this.x_te1;
        this.y_te1;
        this.x_te2;
        this.x_te2;
        
        var px;
	var py;
        var stoppx;
        var stoppy;
        
        this.path_line;
        
        this.str;
        this.txt;

	this.number = n;

	this.create_Out = function()
	{
            
		this.gla = create_line( this.type , this.number ,this.config , x1 , y1 , x2 , y2 , str );
                this.set_prop();
	};

        this.create_drag_Out = function( evt )
        {
            
                this.config.main.change_mode_normal();

                this.gla = create_line( this.type , this.number ,this.config , x1 , y1 , x2 , y2 , str );
                this.set_prop();
                
                px = evt.pageX;
                py = evt.pageY;

        	if( px%10 >= 5)
        	{
                	stoppx = px+(10-px%10);
                }
                else if( px%10 <= 4)
                {
                        stoppx = px-(px%10);
                }

                if( py%10 >= 5)
                {
                        stoppy = py+(10-py%10);
                }
                else if( py%10 <= 4)
                {
                        stoppy = py-(py%10);
                }

                this.gla_te2.setAttribute( "cx", stoppx );
                this.gla_te2.setAttribute( "cy", stoppy );
                
                //this.txt.setAttribute( "x" , stoppx-10 );
		//this.txt.setAttribute( "y" , stoppy-10 ); 
                        
                var d_line = this.path_line.getAttribute("d").split(" ");
                this.path_line.setAttribute( "d","M " + d_line[1] + " " + d_line[2] + " L " + stoppx + " "  + stoppy );

                this.set_prop();

                document.getElementById("tmp").appendChild( this.gla );		//作業用のグループにパーツを移動することで移動時は常に最全面に
			
                this.gla_te1.setAttribute( "cx", px );
                this.gla_te1.setAttribute( "cy", py );
                        
                var d_line = this.path_line.getAttribute("d").split(" ");
                this.path_line.setAttribute( "d","M " + px + " " + py + " L " + d_line[4] + " "  + d_line[5] );
                this.txt.setAttribute( "x" , px-10 );
		this.txt.setAttribute( "y" , py-10 ); 

                conf.dragFlag = true;
                conf.dragObj = this.gla_te1;
        };

        this.set_prop = function()
        {
                this.id = this.gla.getAttribute("id");
                this.x_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" ).getAttribute("cx");
                this.y_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" ).getAttribute("cy");
                this.x_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" ).getAttribute("cx");
                this.y_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" ).getAttribute("cy");
                
                this.str = document.getElementById( "text_" + this.type + "_" + this.number ).textContent;
                this.txt = document.getElementById( "text_" + this.type + "_" + this.number );
                
                this.gla_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" );
                this.gla_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" );
                
                this.path_line = document.getElementById( "l_" + this.type + "_" + this.number );
        }
        
        this.touka = function()
        {
                this.gla_te1.setAttribute("opacity","0");
                this.gla_te2.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_te1.setAttribute("opacity","1");
                this.gla_te2.setAttribute("opacity","1"); 
        }
        
        this.get_position = function( point )
        {
                this.set_prop();       
                
                if( point == "x1" )
                {
                        return( this.x_te1 );
                        
                }else if( point == "y1" )
                {
                        return( this.y_te1 );
                }else if( point == "x2" )
                {
                        return( this.x_te2 );
                        
                }else if( point == "y2" )
                {
                        return( this.y_te2 );
                }else if( point == "str" )
                {
                        return( this.str );
                }
        }        
}

//====================================================================================================
//　RSFFゲート
//====================================================================================================
var RSFF = function( n , conf  , x , y )
{
	this.id;
	this.config = conf;

	this.type = "RSFF";

        this.gla;
        this.gla_r;
        this.gla_s;
        this.gla_q;
        this.gla_nq;
        
        this.x_po;
        this.y_po;

        this.x_r;
        this.y_r;
        this.x_s;
        this.y_s;
        this.x_q;
        this.y_q;
        this.x_nq;
        this.y_nq;

	this.number = n;

        var obj_list_r = new Array();
        var te_list_r = new Array();
        var obj_list_s = new Array();
        var te_list_s = new Array();
        var obj_list_q = new Array();
        var te_list_q = new Array();
        var obj_list_nq = new Array();
        var te_list_nq = new Array();

	this.create_RSFF = function()
	{
		this.gla = create_ff( this , this.type , this.number ,this.config  , x , y );
                this.set_prop();
	};
        
        this.create_drag_RSFF =function(evt)
        {
                this.gla = create_ff( this , this.type , this.number ,this.config , x, y);
                this.set_prop();            
            
                this.search_li(); 
                $("#toolbox").fadeTo("fast", 0.33);
                jQuery( '#object_palette' ).draggable('disable');
                $("#object_palette").fadeTo("fast", 0.33);
                click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
                this.id = this.gla.getAttribute("id");
                
                var point = this.gla.getAttribute("transform").split(" ");
        
                this.x_po = (point[1]-0) + 100 ;
                this.y_po = (point[3]-0) + 90 ;

                this.x_r = (point[1]-0) - 60 + 100;
                this.y_r = (point[3]-0) - 30 + 90;
                this.x_s = (point[1]-0) - 60 + 100;
                this.y_s = (point[3]-0) + 30 + 90;
                this.x_q = (point[1]-0) + 60 + 100;
                this.y_q = (point[3]-0) - 30 + 90;        
                this.x_nq = (point[1]-0) + 60 + 100;
                this.y_nq = (point[3]-0) + 30 + 90;
                
                this.gla_r = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
                this.gla_s = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
                this.gla_q = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out1" );
                this.gla_nq = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out2" );
        }
        
                
        this.touka = function()
        {
                this.gla_r.setAttribute("opacity","0");
                this.gla_s.setAttribute("opacity","0"); 
                this.gla_q.setAttribute("opacity","0");
                this.gla_nq.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_r.setAttribute("opacity","1");
                this.gla_s.setAttribute("opacity","1"); 
                this.gla_q.setAttribute("opacity","1");
                this.gla_nq.setAttribute("opacity","1"); 
        }
        
        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_r.length = 0;
                te_list_r.length = 0;
                obj_list_s.length = 0;
                te_list_s.length = 0;
                obj_list_q.length = 0;
                te_list_q.length = 0;
                obj_list_nq.length = 0;
                te_list_nq.length = 0;
                                
                this.set_prop();
                
                conf.main.search_line( obj_list_r , te_list_r , this.x_r , this.y_r );
                conf.main.search_line( obj_list_s , te_list_s , this.x_s , this.y_s );
                conf.main.search_line( obj_list_q , te_list_q , this.x_q , this.y_q );
                conf.main.search_line( obj_list_nq , te_list_nq , this.x_nq , this.y_nq );
        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_r , te_list_r , this.x_r , this.y_r );
                conf.main.move_line_with_gate( obj_list_s , te_list_s , this.x_s , this.y_s );
                conf.main.move_line_with_gate( obj_list_q , te_list_q , this.x_q , this.y_q );
                conf.main.move_line_with_gate( obj_list_nq , te_list_nq , this.x_nq , this.y_nq );
        }

        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
           
            this.x_po = null;
            this.y_po = null;
           
            this.x_r = null;
            this.y_r = null;
            this.x_s = null;
            this.y_s = null;
            this.x_q = null;
            this.y_q = null;
            this.x_nq = null;
            this.y_nq = null;            
        }

        this.get_position = function( point )
        {    
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }
}

//====================================================================================================
//　JKFFゲート
//====================================================================================================
var JKFF = function( n , conf  , x , y )
{
	this.id;
	this.config = conf

	this.type = "JKFF";

        this.gla;
        this.gla_j;
        this.gla_k;
        this.gla_clk;
        this.gla_q;
        this.gla_nq;
        
        this.x_po;
        this.y_po;

        this.x_j;
        this.y_j;
        this.x_k;
        this.y_k;
        this.x_clk;
        this.y_clk;
        this.x_q;
        this.y_q;
        this.x_nq;
        this.y_nq;

	this.number = n;

        var obj_list_j = new Array();
        var te_list_j = new Array();
        var obj_list_k = new Array();
        var te_list_k = new Array();
        var obj_list_clk = new Array();
        var te_list_clk = new Array();
        var obj_list_q = new Array();
        var te_list_q = new Array();
        var obj_list_nq = new Array();
        var te_list_nq = new Array();

	this.create_JKFF = function()
	{
		this.gla = create_ff( this , this.type , this.number ,this.config  , x , y );
                this.set_prop();
        };
        
        this.create_drag_JKFF =function(evt)
        {
                this.gla = create_ff( this , this.type , this.number ,this.config , x, y);
                this.set_prop();            
            
                this.search_li(); 
                $("#toolbox").fadeTo("fast", 0.33);
                jQuery( '#object_palette' ).draggable('disable');
                $("#object_palette").fadeTo("fast", 0.33);                
                click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
                this.id = this.gla.getAttribute("id");
                
                var point = this.gla.getAttribute("transform").split(" ");
                
                this.x_po = (point[1]-0) + 100;
                this.y_po = (point[3]-0) + 90;
                
                this.x_j = (point[1]-0) - 60 + 100;
                this.y_j = (point[3]-0) - 30 + 90;
                this.x_k = (point[1]-0) - 60 + 100;
                this.y_k = (point[3]-0) + 30 + 90;
                this.x_clk = (point[1]-0) - 60 + 100;
                this.y_clk = (point[3]-0) - 0 + 90;
                this.x_q = (point[1]-0) + 60 + 100;
                this.y_q = (point[3]-0) - 30 + 90;        
                this.x_nq = (point[1]-0) + 60 + 100;
                this.y_nq = (point[3]-0) + 30 + 90;
                //alert(this.y_nq);
                
                this.gla_j = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
                this.gla_k = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
                this.gla_clk = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_clk" );
                this.gla_q = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out1" );
                this.gla_nq = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out2" );
        }
        
        this.touka = function()
        {
                this.gla_j.setAttribute("opacity","0");
                this.gla_k.setAttribute("opacity","0"); 
                this.gla_clk.setAttribute("opacity","0");
                this.gla_q.setAttribute("opacity","0");
                this.gla_nq.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_j.setAttribute("opacity","1");
                this.gla_k.setAttribute("opacity","1"); 
                this.gla_clk.setAttribute("opacity","1");
                this.gla_q.setAttribute("opacity","1");
                this.gla_nq.setAttribute("opacity","1"); 
        }
        
        
        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_j.length = 0;
                te_list_j.length = 0;
                obj_list_k.length = 0;
                te_list_k.length = 0;
                obj_list_clk.length = 0;
                te_list_clk.length = 0;
                obj_list_q.length = 0;
                te_list_q.length = 0;
                obj_list_nq.length = 0;
                te_list_nq.length = 0;
                                
                this.set_prop();
                
                conf.main.search_line( obj_list_j , te_list_j , this.x_j , this.y_j );
                conf.main.search_line( obj_list_k , te_list_k , this.x_k , this.y_k );
                conf.main.search_line( obj_list_clk , te_list_clk , this.x_clk , this.y_clk );                
                conf.main.search_line( obj_list_q , te_list_q , this.x_q , this.y_q );
                conf.main.search_line( obj_list_nq , te_list_nq , this.x_nq , this.y_nq );
        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_j , te_list_j , this.x_j , this.y_j );
                conf.main.move_line_with_gate( obj_list_k , te_list_k , this.x_k , this.y_k );
                conf.main.move_line_with_gate( obj_list_clk , te_list_clk , this.x_clk , this.y_clk );                    
                conf.main.move_line_with_gate( obj_list_q , te_list_q , this.x_q , this.y_q );
                conf.main.move_line_with_gate( obj_list_nq , te_list_nq , this.x_nq , this.y_nq );
        }

        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
           
            this.x_po = null;
            this.y_po = null;
           
            this.x_j = null;
            this.y_j = null;
            this.x_k = null;
            this.y_k = null;
            this.x_clk = null;
            this.y_clk = null;
            this.x_q = null;
            this.y_q = null;
            this.x_nq = null;
            this.y_nq = null;            
        }        

        this.get_position = function( point )
        {    
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }
}

//====================================================================================================
//　TFFゲート
//====================================================================================================
var TFF = function( n , conf  , x , y )
{
	this.id;
	this.config = conf

	this.type = "TFF";

        this.gla;
        this.gla_t;
        this.gla_clk;
        this.gla_q;
        this.gla_nq;        

        this.x_po;
        this.y_po;

        this.x_t;
        this.y_t;
        this.x_clk;
        this.y_clk;
        this.x_q;
        this.y_q;
        this.x_nq;
        this.y_nq;

	this.number = n;
        
        var obj_list_t = new Array();
        var te_list_t = new Array();
        var obj_list_clk = new Array();
        var te_list_clk = new Array();
        var obj_list_q = new Array();
        var te_list_q = new Array();
        var obj_list_nq = new Array();
        var te_list_nq = new Array();

        this.create_TFF = function()
	{
		this.gla = create_ff( this , this.type , this.number ,this.config  , x , y );
                this.set_prop();                
	};
        
        this.create_drag_TFF =function(evt)
        {
                this.gla = create_ff( this , this.type , this.number ,this.config , x, y);
                this.set_prop();            
            
                this.search_li(); 
                $("#toolbox").fadeTo("fast", 0.33);
                jQuery( '#object_palette' ).draggable('disable');
                $("#object_palette").fadeTo("fast", 0.33);                
                click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
                this.id = this.gla.getAttribute("id");
                
                var point = this.gla.getAttribute("transform").split(" ");
                
                this.x_po = (point[1]-0) + 100;
                this.y_po = (point[3]-0) + 90;
                
                this.x_t = (point[1]-0) - 60 + 100;
                this.y_t = (point[3]-0) - 30 + 90;
                this.x_clk = (point[1]-0) - 60 + 100;
                this.y_clk = (point[3]-0) + 30 + 90;
                this.x_q = (point[1]-0) + 60 + 100;
                this.y_q = (point[3]-0) - 30 + 90;        
                this.x_nq = (point[1]-0) + 60 + 100;
                this.y_nq = (point[3]-0) + 30 + 90;
                
                this.gla_t = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
                this.gla_clk = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
                this.gla_q = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out1" );
                this.gla_nq = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out2" );
        }
                       
        this.touka = function()
        {
                this.gla_t.setAttribute("opacity","0");
                this.gla_clk.setAttribute("opacity","0"); 
                this.gla_q.setAttribute("opacity","0");
                this.gla_nq.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_t.setAttribute("opacity","1");
                this.gla_clk.setAttribute("opacity","1"); 
                this.gla_q.setAttribute("opacity","1");
                this.gla_nq.setAttribute("opacity","1"); 
        }
        
        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_t.length = 0;
                te_list_t.length = 0;
                obj_list_clk.length = 0;
                te_list_clk.length = 0;
                obj_list_q.length = 0;
                te_list_q.length = 0;
                obj_list_nq.length = 0;
                te_list_nq.length = 0;
                                
                this.set_prop();
                
                conf.main.search_line( obj_list_t , te_list_t , this.x_t , this.y_t );
                conf.main.search_line( obj_list_clk , te_list_clk , this.x_clk , this.y_clk );                
                conf.main.search_line( obj_list_q , te_list_q , this.x_q , this.y_q );
                conf.main.search_line( obj_list_nq , te_list_nq , this.x_nq , this.y_nq );
        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_t , te_list_t , this.x_t , this.y_t );
                conf.main.move_line_with_gate( obj_list_clk , te_list_clk , this.x_clk , this.y_clk );                    
                conf.main.move_line_with_gate( obj_list_q , te_list_q , this.x_q , this.y_q );
                conf.main.move_line_with_gate( obj_list_nq , te_list_nq , this.x_nq , this.y_nq );
        }

        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
           
            this.x_po = null;
            this.y_po = null;
           
            this.x_t = null;
            this.y_t = null;
            this.x_clk = null;
            this.y_clk = null;
            this.x_q = null;
            this.y_q = null;
            this.x_nq = null;
            this.y_nq = null;            
        }

        this.get_position = function( point )
        {    
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }
}

//====================================================================================================
//　DFFゲート
//====================================================================================================
var DFF = function( n , conf  , x , y )
{
	this.id;
	this.config = conf

	this.type = "DFF";
        
        this.gla;
        this.gla_d;
        this.gla_clk;
        this.gla_q;
        this.gla_nq;   

        this.x_po;
        this.y_po;

        this.x_d;
        this.y_d;
        this.x_clk;
        this.y_clk;
        this.x_q;
        this.y_q;
        this.x_nq;
        this.y_nq;

	this.number = n;
        
        var obj_list_d = new Array();
        var te_list_d = new Array();
        var obj_list_clk = new Array();
        var te_list_clk = new Array();
        var obj_list_q = new Array();
        var te_list_q = new Array();
        var obj_list_nq = new Array();
        var te_list_nq = new Array();

	this.create_DFF = function()
	{
		this.gla = create_ff( this , this.type , this.number ,this.config  , x , y );
                this.set_prop();
	};
        
        this.create_drag_DFF =function(evt)
        {
                this.gla = create_ff( this , this.type , this.number ,this.config , x, y);
                this.set_prop();            
            
                this.search_li(); 
                $("#toolbox").fadeTo("fast", 0.33);
                jQuery( '#object_palette' ).draggable('disable');
                $("#object_palette").fadeTo("fast", 0.33);                
                click_parts(evt,this.gla,conf);
        };
        
        this.set_prop = function()
        {
                //alert("asdf");
                this.id = this.gla.getAttribute("id");
                
                var point = this.gla.getAttribute("transform").split(" ");
                
                this.x_po = (point[1]-0) + 100;
                this.y_po = (point[3]-0) + 90;
                
                this.x_d = (point[1]-0) - 60 + 100;
                this.y_d = (point[3]-0) - 30 + 90;
                this.x_clk = (point[1]-0) - 60 + 100;
                this.y_clk = (point[3]-0) + 30 + 90;
                this.x_q = (point[1]-0) + 60 + 100;
                this.y_q = (point[3]-0) - 30 + 90;        
                this.x_nq = (point[1]-0) + 60 + 100;
                this.y_nq = (point[3]-0) + 30 + 90;  
                                
                this.gla_d = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in1" );
                this.gla_clk = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_in2" );
                this.gla_q = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out1" );
                this.gla_nq = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_out2" );
        }
                              
        this.touka = function()
        {
                this.gla_d.setAttribute("opacity","0");
                this.gla_clk.setAttribute("opacity","0"); 
                this.gla_q.setAttribute("opacity","0");
                this.gla_nq.setAttribute("opacity","0"); 
        }

        this.not_touka = function()
        {
                this.gla_d.setAttribute("opacity","1");
                this.gla_clk.setAttribute("opacity","1"); 
                this.gla_q.setAttribute("opacity","1");
                this.gla_nq.setAttribute("opacity","1"); 
        }

        this.search_li = function()
        {
                //var tr_g = this.config.dragObj.getAttribute("transform").split(" ");
                
                obj_list_d.length = 0;
                te_list_d.length = 0;
                obj_list_clk.length = 0;
                te_list_clk.length = 0;
                obj_list_q.length = 0;
                te_list_q.length = 0;
                obj_list_nq.length = 0;
                te_list_nq.length = 0;
                                
                this.set_prop();
                
                conf.main.search_line( obj_list_d , te_list_d , this.x_d , this.y_d );
                conf.main.search_line( obj_list_clk , te_list_clk , this.x_clk , this.y_clk );                
                conf.main.search_line( obj_list_q , te_list_q , this.x_q , this.y_q );
                conf.main.search_line( obj_list_nq , te_list_nq , this.x_nq , this.y_nq );
        }
        
        this.move_li = function()
        {
                this.set_prop();
                conf.main.move_line_with_gate( obj_list_d , te_list_d , this.x_d , this.y_d );
                conf.main.move_line_with_gate( obj_list_clk , te_list_clk , this.x_clk , this.y_clk );                    
                conf.main.move_line_with_gate( obj_list_q , te_list_q , this.x_q , this.y_q );
                conf.main.move_line_with_gate( obj_list_nq , te_list_nq , this.x_nq , this.y_nq );
        }

        this.del_prop = function()
        {
            this.gla = null;
            
            this.id = null;
           
            this.x_po = null;
            this.y_po = null;
           
            this.x_d = null;
            this.y_d = null;
            this.x_clk = null;
            this.y_clk = null;
            this.x_q = null;
            this.y_q = null;
            this.x_nq = null;
            this.y_nq = null;            
        }

        this.get_position = function( point )
        {    
                this.set_prop();
            
                if( point == "x" )
                {
                        return( this.x_po );
                        
                }else if( point == "y" )
                {
                        return( this.y_po );
                }
        }
}

//====================================================================================================
//　テキスト
//====================================================================================================
var TEXT = function( n , conf , x , y , str )
{
        this.id;
	this.config = conf;

	this.type = "TEXT";

        this.gla;
        this.gla_point;
        
        //this.x;
        //this.y;
        //this.str;

	this.number = n;

	this.create_TEXT = function()
	{
		this.gla = create_text( this.type , this.number ,this.config  , x , y , str );
                this.set_prop();
        };
        
        this.create_drag_TEXT =function(evt)
        {
		this.gla = create_text( this.type , this.number ,this.config  , evt.pageX , evt.pageY , str );
                this.set_prop();            
            
                //this.search_li(); 
                $("#toolbox").fadeTo("fast", 0.33);
                jQuery( '#object_palette' ).draggable('disable');
                $("#object_palette").fadeTo("fast", 0.33);                
                click_parts(evt,this.gla,conf);
                
                
                var px = evt.pageX;
                var py = evt.pageY;
                
                this.gla.setAttribute("transform","translate( " + (px-40) +" , " + (py-30) +" )" );
        };        
        
        this.set_prop = function()
        {
                this.gla_point = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_point" );
                
                //this.gla.setAttribute("transform","translate( " + x-30 +" , " + y-40 +" )" );
                
                var point = this.gla.getAttribute("transform").split(" ");
                this.x = ((point[1]-0) +10);
                this.y = ( (point[3]-0) +50);
                
                this.str = document.getElementById( "txt_" + this.type + "_" + this.number ).textContent;
                
                //this.id = this.gla.getAttribute("id");
                //this.x_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" ).getAttribute("cx");
                //this.y_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" ).getAttribute("cy");
                //this.x_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" ).getAttribute("cx");
                //this.y_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" ).getAttribute("cy");
                //this.txt = document.getElementById( "text_" + this.type + "_" + this.number );
                //this.gla_te1 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_1" );
                //this.gla_te2 = document.getElementById( "ellipse_" + this.type + "_" + this.number + "_2" );
                //this.path_line = document.getElementById( "l_" + this.type + "_" + this.number );
        }
        
        
        this.get_position = function( point )
        {
                this.set_prop();
                if( point == "x" )
                {
                        return( this.x );
                }else if( point == "y" )
                {
                        return( this.y );
                }else if( point == "str" )
                {
                        return( this.str );
                }
        }

        this.touka = function()
        {
                this.gla_point.setAttribute("opacity","0");
        }

        this.not_touka = function()
        {
                this.gla_point.setAttribute("opacity","1");
        }
}


