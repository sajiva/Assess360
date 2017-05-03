import React from 'react';


class Hints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hint: ''
        };
        if(this.props.onHintChanged){

        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var $this=this;
        this.setState({
            hint: event.target.value
        },function(){
            this.props.onHintChanged($this.state);
        });

    }


    render() {
        if (this.props.onChoose) {
            return (<div className="hint-container-input"><div className="form-group">
                    <label htmlFor="hintContent hint-input-label">Hint</label>
                    <textarea placeholder= 'Hint text' className='hint-input' type="text" value={this.state.hint} onChange={this.handleChange}/>
                  </div>
                </div>
            );
        }
        return null;
    }
}



export default Hints;
