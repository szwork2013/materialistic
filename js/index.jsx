var React = require('react');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;
var Paper = mui.Paper;

var cardDivStyle = {
  width: '650px',
  margin: 'auto'

};

var paperDivStyle = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginTop: '32px'

};

var thesisTitleStyle = {
  marginTop: '6px',
  textAlign: 'center',
  fontSize: '22px',
  order: '1'
};

var thesisRatingStyle = {
  textAlign: 'center',
  fontSize: '14px',
  order: '2',
};

var thesisPhotosDivStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  order: '3'
};


var getResearchProfileImageStyle = function(w) {
  return function(position) {
    return {order: position, width: w, height: w};
  };
};

var getImageStyle = getResearchProfileImageStyle('150');

React.render(
  <div style={cardDivStyle}>
    <Paper zDepth={1} style={paperDivStyle}>
      <div style={thesisTitleStyle}>My awesome Thesis Project</div>
      <div style={thesisRatingStyle}>Rating</div>
      <div style={thesisPhotosDivStyle}>
        <img src='http://goo.gl/ALBp65' style={getImageStyle(1)} />
        <img src='http://goo.gl/ALBp65' style={getImageStyle(2)} />
        <img src='http://goo.gl/ALBp65' style={getImageStyle(3)} />
        <img src='http://goo.gl/ALBp65' style={getImageStyle(4)} />
      </div>

    </Paper>
  </div>,
    document.getElementById('inset')
);


//
// React.render(
//   <div style={cardDivStyle}>
//     <span style={{order: '1'}}>Box 1</span>
//     <span style={{order : '2'}}>Box 2</span>
//     <span style={{alignSelf: 'flex-end'}}>Box 3</span>
//   </div>,
//   document.getElementById('inset')
// );
