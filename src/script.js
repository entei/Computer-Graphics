
//lab to xyz

function lab2xyz() {
 /*
 var  l = lab[0],
      a = lab[1],
      b = lab[2];
 */
 
var l = Math.round(document.getElementById("LAB_sliderL").value);
var a = Math.round(document.getElementById("LAB_sliderA").value);
var b = Math.round(document.getElementById("LAB_sliderB").value); 
//alert("L is: " + l + " A is: " + a + " B is : " + b);


 var  x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

 // alert("x:"+ x + "\ny:"+ y + "\nz:" + z); 
  return [x, y, z];
}

function lab2rgb(){
  var xyz = [];
  xyz = lab2xyz();
  xyz2rgb(xyz);
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;
  
  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);
        
  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = (r < 0) ? 0 : r;
  g = (g < 0) ? 0 : g;
  b = (b < 0) ? 0 : b;

  document.getElementById("RGB_sliderR").value = Math.round(r*255);
  document.getElementById("RGB_sliderG").value = Math.round(g*255);
  document.getElementById("RGB_sliderB").value = Math.round(b*255);

  changeColor(r*255, g*255, b*255);

  return [r * 255, g * 255, b * 255];
  
}

function rgb2lab() {

   var rgb = [Math.round(document.getElementById("RGB_sliderR").value),
    Math.round(document.getElementById("RGB_sliderG").value),
    Math.round(document.getElementById("RGB_sliderB").value)];

changeColor(rgb[0], rgb[1], rgb[2]);
 
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2];
  
  var l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
 // alert("L: "+ l + " A: " + a + " B: " + b);
   document.getElementById("LAB_sliderL").value = Math.round(l);
   document.getElementById("LAB_sliderA").value = Math.round(a);
   document.getElementById("LAB_sliderB").value = Math.round(b);
  return [l, a, b];
}


function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
  
  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

/*LUV Convert*/
/*function xyz2luv(xyz) {
  var x = xyz[0] /100,
      y = xyz[1] /100,
      z = xyz[2] /100;

      var l, u ,v;


         var src = this.munge('XYZ', arguments);

         var wp = this.getWhitePoint();
         var ud = (4 * x) / (x + 15 * y + 3 * z);
        var vd = (9 * y) / (x + 15 * y + 3 * z);
 
         var udr = (4 * wp.X) / (wp.X + 15 * wp.Y + 3 * wp.Z);
         var vdr = (9 * wp.Y) / (wp.X + 15 * wp.Y + 3 * wp.Z);
         var yr = src.Y / wp.Y;
 
         var L = (yr > this.epsilon()) ? 116 * Math.pow(yr, 1/3) - 16 : this.kappa() * yr;
         var u = 13 * L * (ud-udr);
         var v = 13 * L * (vd-vdr);
 
         return [L, u, v];
 }
 */

//lab to luv
function lab2luv(){
  var xyz = [];
  xyz = lab2xyz();
  xyz2luv(xyz);
}

//XYZ->LUV
function xyz2luv(xyz){
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2];

  var U = (4 * x) / (x +(15*y) +(3*z));
  var V = (9 * y) / (x +(15*y) +(3*z));


  var Y = y / 100;  
  Y = Y > 0.008856 ? Y = (Math.pow(Y, 1/3)) : (7.78 * Y + 16/ 116 );

  


  var ref_X = 95.047; //Observer=2, Illuminant = D65;
  var ref_Y = 100.000;
  var ref_Z = 108.883;

  var ref_U = (4 * ref_X) / (ref_X + (15 * ref_Y) + (3 * ref_Z));
  var ref_V = (9 * ref_Y) / (ref_X + (15 * ref_Y) + (3 * ref_Z));

  var l = (116 * Y) - 16;
  var u = 13 * l * (U - ref_U);
  var v = 13 * l * (V - ref_V);

  document.getElementById("LUV_sliderL").value = Math.round(l);
  document.getElementById("LUV_sliderU").value = Math.round(u);
  document.getElementById("LUV_sliderV").value = Math.round(v);

  return [l, u, v];
}

/*LUV to LAB*/
function luv2lab(){
  
  var xyz = luv2xyz(),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2];
  
  var l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
 // alert("L: "+ l + " A: " + a + " B: " + b);
   document.getElementById("LAB_sliderL").value = Math.round(l);
   document.getElementById("LAB_sliderA").value = Math.round(a);
   document.getElementById("LAB_sliderB").value = Math.round(b);
  return [l, a, b];

}

/*Luv to XYZ */
function luv2xyz() { 
// CIE-L*uv —> XYZ  
  var l = Math.round(document.getElementById("LUV_sliderL").value);
  var u = Math.round(document.getElementById("LUV_sliderU").value);
  var v = Math.round(document.getElementById("LUV_sliderV").value);
  
  var Y = ( l + 16 ) / 116;  
  var Y = ( Math.pow(Y,3) > 0.008856 )? Math.pow(Y,3):(( Y - 16/116 ) / 7.787);  
    
  var ref_X = 95.047;   //Observer= 2°, Illuminant= D65  
  var ref_Y = 100.000;  
  var ref_Z = 108.883;  
    
  var ref_U = ( 4 * ref_X ) / ( ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );  
  var ref_V = ( 9 * ref_Y ) / ( ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );  
    
  var U = u / ( 13 * l ) + ref_U;  
  var V = v / ( 13 * l ) + ref_V;  
    
  var y = Y * 100;  
  var x = - ( 9 * y * U ) / ( ( U - 4 ) * V - U * V );  
  var z = ( 9 * y - ( 15 * V * y ) - ( V * x ) ) / ( 3 * V );  

 // alert("X: "+x+ " Y: " + y + " Z: " +  z);

  return [x, y, z];  
}  

//for colors
function changeColor(r, g, b){
var colorBlock = document.getElementById("ugolkrug");
var currentColor = "rgb(" + Math.round(r) + ", " + Math.round(g) + ", " + Math.round(b) + ")";
colorBlock.style.background = currentColor;
}

//update all value
 function update_all_value(){
    document.getElementById("LAB_valueL").innerHTML = document.getElementById("LAB_sliderL").value + '%';
    document.getElementById("LAB_valueA").innerHTML = document.getElementById("LAB_sliderA").value;
    document.getElementById("LAB_valueB").innerHTML = document.getElementById("LAB_sliderB").value;
            
    document.getElementById("RGB_valueR").innerHTML = document.getElementById("RGB_sliderR").value;
    document.getElementById("RGB_valueG").innerHTML = document.getElementById("RGB_sliderG").value;
    document.getElementById("RGB_valueB").innerHTML = document.getElementById("RGB_sliderB").value;

    document.getElementById("LUV_valueL").innerHTML = document.getElementById("LUV_sliderL").value + '%';
    document.getElementById("LUV_valueU").innerHTML = document.getElementById("LUV_sliderU").value;
    document.getElementById("LUV_valueV").innerHTML = document.getElementById("LUV_sliderV").value;

} 