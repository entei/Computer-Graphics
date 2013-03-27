function getInfo(path){
  var file = path;
// define your own callback function
function mycallback() {
   // either call the ImageInfo.getAllFields([file]) function which returns an object holding all the info
   alert(
       "All info about this file: " + ImageInfo.getAllFields(file)
   );
   // or call ImageInfo.getField([file], [field]) to get a specific field
   alert(
       "Format: " + ImageInfo.getField(file, "format") + ", dimensions : " + ImageInfo.getField(file, "width") + "x" + ImageInfo.getField(file, "height")
   );
}
// finally, load the data
ImageInfo.loadInfo(file, mycallback);
};