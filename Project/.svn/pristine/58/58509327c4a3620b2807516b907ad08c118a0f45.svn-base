import React from 'react';
import {Link} from 'react-router';
import AssessmentObject from './Assessment/AssessmentObject.jsx';

/**
* @description create a table
*/
class Table extends React.Component{
	/**
	 * @description constructor
	 * @param {object} props
	 */
	 constructor(props) {
        super(props);

    }
		/**
		 * @description render
		 * @return {ReactElement} markup
		 */
	render() {

		//figure out what element to pass to child
        return <div className="MyTable">{this.props.data.map(function(item,index) {
            return <AssessmentObject obj={item} className="col-md-3 col-lg-2 col-sm-6 cell" key={index} {...this.props}/>

        }.bind(this))}
        </div>;
	}
}
Table.propTypes={
	data:React.PropTypes.arrayOf(React.PropTypes.object)
};
export default Table;
