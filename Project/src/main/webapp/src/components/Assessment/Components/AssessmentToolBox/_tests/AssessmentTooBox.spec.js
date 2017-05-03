
/***************************************************************************/
/* Hector - Start Here                                                     */
/***************************************************************************/
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import AssessmentToolBox from 'components/Assessment/Components/AssessmentToolBox/AssessmentToolBox.jsx';
import expectJSX from 'expect-jsx';


expect.extend(expectJSX);

describe('<AssessmentToolBox/>', () => {

    beforeEach(function () {
        this.onAssessmentChangesHit=false;
        this.onAssessmentChanges=function(){
            this.onAssessmentChangesHit=true;
        }.bind(this);
        this.assessment={
            id:1,
            allowed_time_sec:100,
            createdAt:312323123,
            expirationDate:3212312312,
            istimed:true,
            name:"Test Assessment",
            subtitle:"Test 2 Assessment"
        };

        this.TestUtils = TestUtils;
        this.renderer = this.TestUtils.createRenderer();
        this.component = this.TestUtils.renderIntoDocument(<AssessmentToolBox onAssessmentChanges={this.onAssessmentChanges} Assessment={this.assessment}/>);

    });

    it('should render without problems', function () {
        expect(this.component).toExist();
    });
});



