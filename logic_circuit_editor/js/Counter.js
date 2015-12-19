//====================================================================================================
//　オブジェクトカウンタ
//====================================================================================================
var Counter = function()
{
	this.count_AND = 0;
	this.count_OR = 0;
	this.count_NOT = 0;
	this.count_EXOR = 0;
	this.count_NAND = 0;
	this.count_NOR = 0;
	this.count_LINE = 0;
        
	this.count_TEXT = 0;

	this.count_In = 0;
	this.count_Out = 0;

	this.count_RSFF = 0;
	this.count_JKFF = 0;
	this.count_DFF = 0;
	this.count_TFF = 0;
        
        this.count_Kuromaru = 0;

        this.reset_Kuromaru = function()
        {
                this.count_Kuromaru = 0;
        }

	this.reset = function()
	{
		this.count_AND　= 0;
		this.count_OR　= 0;
		this.count_NOT　= 0;
		this.count_EXOR　= 0;
		this.count_NAND　= 0;
		this.count_NOR　= 0;
		this.count_LINE　= 0;
		this.count_TEXT = 0;

		this.count_In = 0;
		this.count_Out = 0;

		this.count_RSFF = 0;
		this.count_JKFF = 0;
		this.count_DFF = 0;
		this.count_TFF = 0;

                this.count_Kuromaru = 0;

	};

	this.get = function( type )
	{
		if(type == "AND")
		{
			return(this.count_AND);
		}else if(type == "OR")
		{
			return(this.count_OR);
		}else if(type == "NOT")
		{
			return(this.count_NOT);
		}else if(type == "EXOR")
		{
			return(this.count_EXOR);
		}else if(type == "NAND")
		{
			return(this.count_NAND);
		}else if(type == "NOR")
		{
			return(this.count_NOR);
		}else if(type == "LINE")
		{
			return(this.count_LINE);
		}else if(type == "TEXT")
		{
			return(this.count_TEXT);
		}else if(type == "In")
		{
			return(this.count_In);
		}else if(type == "Out")
		{
			return(this.count_Out);
		}else if( type == "RSFF" )
		{
			return(this.count_RSFF);
		}else if( type == "JKFF" )
		{
			return(this.count_JKFF);
		}else if( type == "DFF" )
		{
			return(this.count_DFF);
		}else if( type == "TFF" )
		{
			return(this.count_TFF);
		}else if( type == "Kuromaru" )
                {
                        return(this.count_Kuromaru);
                }
	};

	this.add = function( type )
	{
		if(type == "AND")
		{
			this.count_AND ++;
		}else if(type == "OR")
		{
			this.count_OR ++;
		}else if(type == "NOT")
		{
			this.count_NOT ++;
		}else if(type == "EXOR")
		{
			this.count_EXOR ++;
		}else if(type == "NAND")
		{
			this.count_NAND ++;
		}else if(type == "NOR")
		{
			this.count_NOR ++;
		}else if(type == "LINE")
		{
			this.count_LINE ++;
		}else if(type == "TEXT")
		{
			this.count_TEXT ++;
		}else if(type == "In")
		{
			this.count_In ++;
		}else if(type == "Out")
		{
			this.count_Out ++;
		}else if( type == "RSFF" )
		{
			this.count_RSFF ++;
		}else if( type == "JKFF" )
		{
			this.count_JKFF ++;
		}else if( type == "DFF" )
		{
			this.count_DFF ++;
		}else if( type == "TFF" )
		{
			this.count_TFF ++;
		}else if( type == "Kuromaru" )
                {
                        this.count_Kuromaru ++;
                }
	}

	this.set = function( type , n )
	{
		if(type == "AND")
		{
			this.count_AND = n;
		}else if(type == "OR")
		{
			this.count_OR = n;
		}else if(type == "NOT")
		{
			this.count_NOT = n;
		}else if(type == "EXOR")
		{
			this.count_EXOR = n;
		}else if(type == "NAND")
		{
			this.count_NAND = n;
		}else if(type == "NOR")
		{
			this.count_NOR = n;
		}else if(type == "LINE")
		{
			this.count_LINE = n;
		}else if(type == "TEXT")
		{
			this.count_TEXT = n;
		}else if(type == "In")
		{
			this.count_In = n;
		}else if(type == "Out")
		{
			this.count_Out = n;
		}else if( type == "RSFF" )
		{
			this.count_RSFF = n;
		}else if( type == "JKFF" )
		{
			this.count_JKFF = n;
		}else if( type == "DFF" )
		{
			this.count_DFF = n;
		}else if( type == "TFF" )
		{
			this.count_TFF = n;
		}else if( type == "Kuromaru" )
                {
                        this.count_Kuromaru = n;
                }
	}

	this.show = function( type )
	{
		if(type == "AND")
		{
			window.alert( this.count_AND );
		}else if(type == "OR")
		{
			window.alert( this.count_OR );
		}else if(type == "NOT")
		{
			window.alert( this.count_NOT );
		}else if(type == "EXOR")
		{
			window.alert( this.count_EXOR );
		}else if(type == "NAND")
		{
			window.alert( this.count_NAND );
		}else if(type == "NOR")
		{
			window.alert( this.count_NOR );
		}else if(type == "LINE")
		{
			window.alert( this.count_LINE );
		}else if(type == "TEXT")
		{
			window.alert( this.count_TEXT );
		}else if(type == "In")
		{
			window.alert( this.count_In );
		}else if(type == "Out")
		{
			window.alert( this.count_Out );
		}else if( type == "RSFF" )
		{
			window.alert( this.count_RSFF );
		}else if( type == "JKFF" )
		{
			window.alert( this.count_JKFF );
		}else if( type == "DFF" )
		{
			window.alert( this.count_DFF );
		}else if( type == "TFF" )
		{
			window.alert( this.count_TFF );
		}else if( type == "Kuromaru" )
                {
                        window.alert(this.count_Kuromaru);
                }
	};
}
