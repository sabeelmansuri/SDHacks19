import React, {Component} from 'react';
import './Question.css';
import {fdb} from "../db";

class Question extends Component {
    state = {
        numUpvotes: this.props.numUpvotes,
        status: this.props.status,
        text: this.props.text,
        backgroundColor: "black",
        buttonText: "None"
    };

    getBackgroundColor = (status) => {
        if (status === "new") {
            return "#b7c3ed";
        } else if (status === "active") {
            return "#FFDC53";
        } else {
            return "#51a13a";
        }
    };

    getButtonText = (status) => {
        if (this.props.isStudent) {
            return "+1";
        } else {
            if (status === "new") {
                return "Accept";
            } else if (status === "active") {
                return "Complete";
            } else {
                return "Done";
            }
        }
    };

    componentDidMount = () =>  {
        this.setState({backgroundColor: this.getBackgroundColor(this.props.status)});
        this.setState({buttonText: this.getButtonText(this.props.status)});
    };

    addOne = (e) => {
        e.preventDefault();
        fdb.collection("questions").doc(this.props.id).update({
            upvotes: (this.state.numUpvotes + 1)
        });

        e.currentTarget.disabled = true;
        e.currentTarget.style.background = "#72A172";
        e.currentTarget.innerHTML = "✓";
    };

    acceptQuestion = (e) => {
        e.preventDefault();

       if (this.state.status === "new") {
           fdb.collection("questions").doc(this.props.id).update({
               status: "active"
           });
       } else if (this.state.status = "active") {
           fdb.collection("questions").doc(this.props.id).update({
               status: "done"
           });
       }
    }

    render () {
        let addOne = <button className="oneUp" onClick={e => this.addOne(e)}>{this.state.buttonText}</button>;
        let acceptQ = <button className="acceptQ" onClick={e => this.acceptQuestion(e)}>{this.state.buttonText}</button>;

        return (
            <div className="questionWrapper" style={{background: this.state.backgroundColor}}>
                <div className="questionTextWrapper">
                    <div className="questionText">{this.state.text}</div>
                </div>
                <div className="actionsWrapper">
                    <div>{this.props.numUpvotes}</div>
                    {this.props.isStudent ? addOne : acceptQ}
                </div>
            </div>
        );
    }
}

export default Question;