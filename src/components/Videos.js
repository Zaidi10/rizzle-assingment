import React, { Component } from 'react';
import { data } from "../shared/data";
import Video from "./Video";

var variable = [];
class Videos extends Component {
    constructor(props) {
        console.log(data);
        super(props);
        this.state = {
            videoRefs: [],
            playIndex: 0
        }

    }
    componentDidMount = () => {
        this.setState({ videoRefs: [...this.state.videoRefs, ...variable] })
    }


    addRef = (newRef) => {

        variable.push(newRef);

    }
    handleWhatisPlaying = (index) => {
        this.setState({ playIndex: index });
    }

    render() {
        return (
            <div className="App">
                {data.map((item, index) => {
                    return <Video addRef={this.addRef} index={index} playingIndex={this.state.playIndex} handleWhatisPlaying={this.handleWhatisPlaying} allRef={this.state.videoRefs} key={item.id} data={item} />
                })}
            </div>
        );
    }
}

export default Videos;
