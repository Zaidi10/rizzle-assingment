import React, { Component } from 'react';


class Videos extends Component {
    constructor(props) {
        super(props);
        this.ref1 = React.createRef();
        this.ref2 = React.createRef();
        this.state = {
            isPlaying: false,
            start: null,
            startY: null,
            swipeLeft: 0,
            swipeDown: 0,
            scrolled: false,
        }


    }

    componentDidMount = () => {

        window.addEventListener('scroll', () => { this.handleScroll("handlesroll") }, true);
        window.addEventListener('ontouchstart', this.handelTouchStart, true);
        this.props.addRef(this.ref1);
        const ele = this.ref2.current;
        if (ele !== null) {
            ele.style.width = window.innerWidth + "px";
            ele.style.height = window.innerHeight + "px";
            ele.style.left = window.innerWidth + "px";
        }

    }
    handelTouchStart = (ev) => {
        this.setState({ start: ev.touches[0].clientX, startY: ev.touches[0].clientY, swipeDown: 0, swipeLeft: 0, });



    }
    handleTouchMove = (ev) => {
        console.log("touchiing!!");
        let swipe = this.state.start - ev.touches[0].clientX;
        let swipeY = this.state.startY - ev.touches[0].clientY;
        if (this.state.scrolled) {
            return;
        }


        if (Math.abs(swipeY) > Math.abs(swipe)) {
            this.setState({ swipeDown: swipeY });
            this.setState({ swipeLeft: swipe });
            if (Math.abs(swipeY) > 50) {
                console.log("large swipe");
                if (swipeY > 0) {
                    window.scrollTo(0, window.innerHeight * (this.props.index + 1));
                }
                else {
                    window.scrollTo(0, window.innerHeight * (this.props.index - 1));
                }
                this.setState({ scrolled: true });
            }
        }
        else {


            if (this.props.index === this.props.playingIndex) {



                if (swipe < 0 && this.ref2.current.style.left !== window.innerWidth + "px") {
                    if (this.ref2.current.style.left === window.innerWidth) {
                        return;
                    }
                    this.ref2.current.style.left = (-1 * swipe) + "px";
                    this.setState({ swipeLeft: swipe });
                    this.setState({ swipeDown: swipeY });


                }
                else if (swipe > 0) {
                    if (this.ref2.current.style.left === "0px") {
                        return;
                    }

                    this.ref2.current.style.left = window.innerWidth - swipe + "px";
                    this.setState({ swipeLeft: swipe });
                    this.setState({ swipeDown: swipeY });
                }
            }
        }
    }
    handleTouchEnd = (ev) => {
        if (this.state.scrolled) {
            this.setState({ scrolled: false });
            return;
        }
        let swipeDown = this.state.startY - ev.changedTouches[0].clientY;
        console.log(this.state.startY - ev.changedTouches[0].clientY);
        if (Math.abs(swipeDown) > Math.abs(this.state.swipeLeft) && Math.abs(swipeDown) > 30) {
            if (this.state.swipeDown > 0) {
                window.scrollTo(0, (window.innerHeight * (this.props.index + 1)));
                console.log("Scroll down to " + window.innerHeight * (this.props.index + 1))

            }
            else {
                window.scrollTo(0, (window.innerHeight * (this.props.index - 1)));
                console.log("Scroll up to " + window.innerHeight * (this.props.index - 1))
            }

        }
        else {

            if (this.state.swipeLeft > 0) {

                if (this.state.swipeLeft < window.innerWidth / 3) {
                    this.ref2.current.style.left = window.innerWidth + "px";
                }
                else {
                    console.log("show full name");
                    this.ref2.current.style.left = "0px";
                }

            }
            else if (this.state.swipeLeft < 0) {
                if (Math.abs(this.state.swipeLeft) < window.innerWidth / 3) {
                    console.log("show full name if less then 1/3");
                    this.ref2.current.style.left = "0px";

                }
                else {

                    this.ref2.current.style.left = window.innerWidth + "px";
                }
            }
        }

    }

    handlePlay = (e, video) => {

        video.current.muted = !video.current.muted;


    }
    handleScroll = (ar) => {

        var playpromise = this.ref1.current.play();

        if (this.isInViewport(this.ref1.current)) {
            if (this.props.index !== this.props.playingIndex) {
                this.props.handleWhatisPlaying(this.props.index);
            }

            this.ref1.current.play();


        }
        else {

            if (playpromise !== undefined) {
                playpromise.then(() => {
                    this.ref1.current.pause();
                    this.ref1.current.muted = true;

                })
                    .catch(err => {
                        console.log(err);
                    })

            }

        }

    }
    isInViewport(element) {
        if (!element) return false;
        const top = element.getBoundingClientRect().top;
        if (this.props.name === "second") {
            console.log(top);
        }
        if (top <= 200 && top >= -200) {
            return true;
        }
        return false;
    }



    render() {
        return (

            <div className="video-con" onTouchStart={this.handelTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                {this.props.data.channel ?
                    <div className="name" ref={this.ref2}>

                        {this.props.data.channel.user.name}

                    </div>
                    : <div className="name" ref={this.ref2}>

                        "N/A"

                </div>
                }
                {this.props.index === 0 ?
                    <video className="video_" preload='auto' ref={this.ref1} onClick={(e) => this.handlePlay(e, this.ref1)} src={this.props.data.video.smallUrl} autoPlay muted>
                        Your browser does not support the video tag.
                        </video>
                    :
                    <video className="video_" preload='auto' ref={this.ref1} onClick={(e) => this.handlePlay(e, this.ref1)} src={this.props.data.video.smallUrl} muted>
                        Your browser does not support the video tag.
                        </video>

                }

            </div>

        );
    }

}

export default Videos;
