var WIDTH = 32;
var HEIGHT = 32;


function point_name(x,y) {
  if (x<0 || y<0) return "none";
  return "p"+("00"+x).substr((""+x).length)+("00"+y).substr((""+y).length);
}


/*horizontal*/
function draw_hline(x1, x2, y){
	if(x1>x2){
		//swap(x1, x2)
		var t = x1;
		x1 = x2;
		x2 = t;
	}
	while (x1 <= x2) set_pixel(x1++, y);
}
/*vertical*/
function draw_vline(y1, y2, x){
	if(y1 > y2){
		//swap
		var t =y1;
		y1 = y2;
		y2 = t;
	}
	while(y1 < y2) set_pixel(x, y1++);
}

/*draw line*/
function draw_line(x1, y1, x2, y2){
	if(y1 == y2){
		draw_hline(x1, x2, y1);
	} else if(x2==x1) {
		draw_vline(y1, y2, x1);
	} else if (cut_line(x1, y1, x2, y2)){
		var Z = 0;
		var kx, ky, max_dev, step_small;
		//choise the directuion
		if(abs(x1-x2)) >=abs(y1-y2) ) {
	//horizontal ...left to right
			if (x1>x2) {
				//swap(x1, x2)
				var t = x1;
				x1 = x2;
				x2 = t;
				//swap(y1, y2)
				t = y1;
				y1 = y2;
				y2 = t;
			}
		//kx - koef pryamoi
		kx = abs(y2-y1);
		ky = x2-x1;
		//start draw
		step_small = (y1>y2) ? -1 : 1;
		max_dev = ky >> 1;
		while (x1<= x2){
			swt_pixel(x1, y1);
			x1++;
			Z +=kx;
			if ( Z > max_dev){
				y1 += step_small;
				Z -=ky;
			}
		}else {
			//on vert
			//from top to bottom
			// всегда рисуем сверху вниз
      if (y1>y2) { 
        // swap(x1,x2); 
        var t = x1; x1 = x2; x2 = t;
        // swap(y1,y2); 
        t = y1; y1 = y2; y2 = t;
      }
      // коэффициенты прямой
      kx = y2-y1; ky = abs(x2-x1);
      // начинаем рисовать
      step_small = (x1>x2) ? -1 : 1;
      max_dev = kx >> 1;
      while (y1<=y2) {
        set_pixel(x1,y1);
        y1++;
        Z += ky;
        if (Z>max_dev) { 
        	x1 += step_small; 
        	Z -= kx;
        	 }
		}
		}

	}
}


function draw_dash() {
	alert("hello");
  document.write("<table border=0 cellpadding=0 cellspacing=0 bgco</table0080><tr><td><table border=0 cellpadding=0 cellspacing=1>");
  for (j = 0; j<HEIGHT; j++) {
    document.write("<tr>");
    for (i = 0; i<WIDTH; i++)
      document.write("<td><img src=\"/img/white.gif\" width=6 height=6 alt=\"\" name=\""+point_name(i,j)+"\" /></td>");
    document.write("</tr>");
  }
  document.write("</table></td></tr></table>");
}


function set_pixel(x,y) {
  try {
    document[point_name(x,y)].src = "/img/navy.gif";
  } catch(E) {
  }
}


function abs(x) {
  return Math.abs(x);
}


function draw_scr_line() {
  var x1 = parseInt(document.getElementById("x1").value);
  var x2 = parseInt(document.getElementById("x2").value);
  var y1 = parseInt(document.getElementById("y1").value);
  var y2 = parseInt(document.getElementById("y2").value);
  if (isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2))
    alert("Координаты должны быть числами!");
  else
    draw_line(x1,y1,x2,y2);
}