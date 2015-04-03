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

var abstractStyle = {
  order: '4',
  textAlign: 'center',
  fontSize: '20px',
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
      <hr />
      <div style={abstractStyle}>Abstract</div>
      <p style={{order: '5', fontSize: '16px', margin: '16px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <div style={{order: '6'}}>
        <a style={{textDecoration: 'none', fontSize: '16px', marginLeft: '16px'}} href='#'>Acadumia Link</a> 
      </div>
      <div style={{order: '7'}}>
        <a style={{textDecoration: 'none', fontSize: '16px', marginLeft: '16px'}} href='#'>Shine on you crazy Diamond</a> 
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
