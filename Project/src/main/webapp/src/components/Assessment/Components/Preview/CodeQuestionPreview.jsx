import React from 'react';

class CodeQuestionPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            answer:'Enter your response here'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({answer: event.target.value});
    }

    render() {

        return (
            <div className="col-lg-12">
                <h2>{this.props.id}. {this.props.content.question}</h2>
                <textarea value={this.state.answer} onChange={this.handleChange} className="form-control"/>
            </div>
        )
    }
}

export default CodeQuestionPreview;