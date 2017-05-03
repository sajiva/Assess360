import React from 'react';
import $ from 'jquery';
import Footer from './Footer.jsx';
import Title from './Title.jsx';


class Body extends React.Component{
    /**
     * @description constructor
     * @param {object} props
     */
   constructor(props) {
        super(props);
    }
  render(){
  var questions = this.props.questions
  var questionType = {};

for(var i = 0; i< questions.length; i++) {
    var num = questions[i];
    questionType[num] = questionType[num] ? questionType[num] +1 : 1;
}

var typeCountMap = {
  "text": 0,
  "code": 0,
  "multiple-choice":0,
  "video": 0,
  "audio": 0
}

questions.map(function(question, index){
  typeCountMap[question["type"]]++;
})

  /**
   * @description render
   * @return {ReactElement} markup
   */
    return(
      <div className='container-body'>
        <Title title={this.props.title}/>
        <div className="row custom-row">
          <div className="col-md-4">
            <span className="glyphicon glyphicon-edit"/>
          </div>
          <div className="col-md-4 col-md-offset-4">
            <span className="glyphicon glyphicon-star-empty"/>
            <span className="glyphicon glyphicon-star-empty"/>
            <span className="glyphicon glyphicon-star-empty"/>
          </div>
         </div>
          <div className="content-bottom ">
         <div className="row custom-row">
          <div className="col-md-3">
            <span className="glyphicon glyphicon-facetime-video">{" " + typeCountMap["video"]}</span></div>
          <div className="col-md-3">
            <span className="glyphicon glyphicon-font">{" " + typeCountMap["text"]}</span>
            </div>
          <span className="col-md-3"><i className="fa fa-file-audio-o" aria-hidden="true">Audio</i></span>
        </div>

        <Footer />
          </div>
      </div>
    );
  }
}

export default Body;
