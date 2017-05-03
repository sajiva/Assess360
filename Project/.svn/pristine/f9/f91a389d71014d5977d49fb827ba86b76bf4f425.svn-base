import React from 'react';
import ParticipantParser from "libaries/ParticipantParser.jsx";
import APIComponent from 'components/Containers/APIComponent.jsx';
import {Modal} from 'react-bootstrap';
import TargetGroupAPI from 'libaries/APIs/TargetGroupAPI.jsx';

/**
 * Emails container which show the parsed emails
 */
export const ImportActualEmails = (props) => {
    return <div className="input-emails-container">
        {/**********************************/}
        {/* Input                          */}
        {/**********************************/}
        <textarea className="emails-textbox" type='text' placeholder="Enter the text" value={props.text}
                  onChange={props.handleChange}/><br/>
        <button className="parse-button" type='submit' onClick={props.startParsing}>Parse</button>

        {/**********************************/}
        {/* Parse Results                  */}
        {/**********************************/}
        {props.isParsing ?
            <ParticipantParserComponent Text={props.text}>
                {function (participants) {
                    return <button className="submit-emails-button" type='submit' onClick={() => {
                        props.change({participants: participants});
                        props.send();
                        props.addingFinished()
                    }}>Add</button>
                }.bind(this)}
            </ParticipantParserComponent> :
            null}
    </div>
};

/**
 * Textbox component for users input.
 * @this {Textbox}
 */

class Textbox extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {string} text user input
         * @property {object} emailsArray arrays of emails which are already parsed
         */
        this.state = {
            text: '',
            emailsArray: []
        };

        this.handleChange = this.handleChange.bind(this);       //Text Box Changes...
        this.startParsing = this.startParsing.bind(this);       //Start Parsing...
        this.addingFinished = this.addingFinished.bind(this);   //Finished Adding them...
    }
    /**
     * Handle change event of user input.
     * @param {SytheticEvent} e
     */
    handleChange(e) {
        this.setState({
            text: e.target.value
        })
    }
    /**
     * handle the parsing event which parses the user input into seperate emails.
     * @param {SytheticEvent} e
     * @property {boolean} isParsing return the state of the event.
     */
    startParsing(e) {
        this.setState({
            isParsing: true
        });
        e.preventDefault();
    }
    /**
     * handle the adding event which add the parsed emails to the array.
     */

    addingFinished() {
        this.setState({
            text: "",
            isParsing: false,
            emailsArray: []
        })
    }
    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        return (<Modal

                show={this.props.showPopup}
                onHide={this.closedPopup}
                container={this}
                aria-labelledby="importFromtext">
                <Modal.Header>
                    <Modal.Title id="importFromtext" className="textbox-label">Import Participants</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <APIComponent APIListener={TargetGroupAPI.instance} Event={"add-participants-to-targetgroup"}
                                  initialInput={{id: this.props.id}}>
                        {function (data, change, send, setData, isLoading) {
                            return (<div className="import-emails">
                                <ImportActualEmails {...this} {...this.state} {...this.props} change={change}
                                                    send={send} setData={setData} isLoading={isLoading}/>

                                {/***********************************************/}
                                {/* Adding Results                              */}
                                {/***********************************************/}
                                {data.participants ?
                                    <div className="adding-results">
                                        {data.participants.map(function (participant) {
                                            return <div className="participant-adding-results">
                                                {"Name(" + participant.name + "), Email(" + participant.email + "), Phone(" + participant.phone + ")"}
                                            </div>
                                        })}
                                    </div> : null
                                }
                            </div>)

                        }.bind(this)}
                    </APIComponent>

                </Modal.Body>

                <Modal.Footer>
                    <div className="btn my-button-class" onClick={this.props.closePopup}>Close</div>
                </Modal.Footer>
            </Modal>
        )
    }
}
Textbox.contextTypes = {
    AssessmentID: React.PropTypes.number
};

/**
 * Participant parser component for adding participants to an assessemt via emails.
 * @this {ParticipantParserComponent}
 */

class ParticipantParserComponent extends React.Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {object} results the results of the adding process.
         * @property {boolean} success the state of the process.
         */
        this.state = {
            results: {
                success: false
            }
        }
    }
    /**
     * handle the parsing data event
     * @param {object} props
     */
    parse(props) {
        let results = ParticipantParser.parseData(props.Text);

        /*******************************************************************/
        this.setState({
            results: results
        }, function () {
            if (this.state.results.participants) {
                this.props.onSuccess(this.state.results);
            }
        }.bind(this));
    }

    componentWillMount() {
        this.parse(this.props);
    }

    componentWillReceiveProps() {
        this.parse(this.props);
    }

    /**
     * render
     * @return {ReactElement} markup
     */
    render() {
        return this.state.results.participants ?
            (<div className="import-results">
                <div className="results" dangerouslySetInnerHTML={{__html: this.state.results.html}}></div>
                {this.props.children(this.state.results.participants)}
            </div>) : <div><h1 className="text-danger">No Participants</h1></div>;

    }
}
ParticipantParserComponent.propTypes = {
    Text: React.PropTypes.string,
    onSuccess: React.PropTypes.func,
    children: React.PropTypes.func
};
ParticipantParserComponent.defaultProps = {
    onSuccess: function () {
    }
};


export default Textbox;
