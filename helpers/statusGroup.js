module.exports = function( startAt,closeAt ){
  if(startAt==null){
    return 'Not Start'
  }else if (closeAt==null) {
    return 'On Progress'
  } else{
    return 'Completed'
  }
}
