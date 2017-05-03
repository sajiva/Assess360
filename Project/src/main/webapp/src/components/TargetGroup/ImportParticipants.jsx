import React from 'react';
import TargetGroupAPI from '../../libaries/APIs/TargetGroupAPI.jsx';
import {Modal} from 'react-bootstrap';
import ParticipantParser from "libaries/ParticipantParser.jsx";

class ImportParticipants extends React.Component {

    constructor(props) {
        super(props);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            file: '',
            format: {
                edit: false,
                participant: {
                    search:/(.*)(?:[,\n\r]|$)/g,
                    name:{
                        search:/([A-Za-z]+\s*[A-Za-z\s]+)/,
                        replace:"$1"
                    },
                    email:{
                        search:/([0-9a-zA-Z\-_\.=+]*@\w+\.\w+)/i,
                        replace:"$1"
                    },
                    phone:{
                        search:/(\d{3}-?\d{3}-?\d{4}-?)/i,
                        replace:"$1"
                    }
                }
            },
            results: {
                finished: false,
                participants: [],
                html: ""
            },
            errorMsg: ''
        };
    }

    handleFileSelect(event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    handleImport(event) {
        event.preventDefault();
        console.log(this.state.file);

        // if (this.state.file.type === 'text/plain') {
        const reader = new FileReader();
        reader.readAsText(this.state.file);
        reader.onload = this.handleOnLoad;
        // }
    }

    handleSubmit(event) {
        event.preventDefault();
        TargetGroupAPI.instance.addParticipants(this.props.id, this.state.results.participants);
        this.setState({

            results: {
                finished: false,
                participants: [],
                html: ""
            },

        });
        this.props.closePopup();

    }

    handleOnLoad(event) {
        let results = ParticipantParser.parseData(event.target.result);
        this.setState({
            results: results
        });
    }


    render() {

        return (
            <Modal
                show={this.props.showPopup}
                container={this}
                aria-labelledby="importFromFile">
                <Modal.Header>
                    <Modal.Title id="importFromFile" className="textbox-label">Select file to import Participants</Modal.Title>
                </Modal.Header>
            <Modal.Body>
            <form onSubmit={this.handleImport} className="main-content">
                <input type="file" required="true" onChange={this.handleFileSelect}/>
                {(this.state.format.edit ?
                        (<input type="text" value={this.state.format.participant.entry}/>) : ""
                )}
                <button type="submit" className="btn my-button-class">Parse</button>
                {(this.state.format.edit ?
                    (<button onClick={this.handleImport} className="btn my-button-class">Edit Formats</button>) : "")}
                {(this.state.results.finished ?
                        (<div className="import-results">
                                <div><span className=" results-count">{this.state.results.participants.length}</span>
                                </div>
                                <div>
                                    <pre className=" results"
                                         dangerouslySetInnerHTML={{__html: this.state.results.html}}/>
                                </div>
                                <button onClick={this.handleSubmit} className="btn my-button-class">Submit</button>
                            </div>

                        ) : ""
                )}
            </form>
            </Modal.Body>
                <Modal.Footer>
                    <div className="btn my-button-class" onClick={this.props.closePopup}>Close</div>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ImportParticipants;