class App extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Timer, { initSessionLen: 25, initBreakLen: 5 }));

  }}


class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionLen: this.props.initSessionLen,
      breakLen: this.props.initBreakLen,
      minutes: this.props.initSessionLen,
      seconds: 0,
      playing: false,
      editable: true,
      stage: "Session" };


    this.timerPause = this.timerPause.bind(this);
    this.timerPlay = this.timerPlay.bind(this);
    this.timerReset = this.timerReset.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.finished = this.finished.bind(this);
    this.setSessionLen = this.setSessionLen.bind(this);
    this.setBreakLen = this.setBreakLen.bind(this);
    this.clockify = this.clockify.bind(this);
    this.toggleStage = this.toggleStage.bind(this);
    this.setSessionStage = this.setSessionStage.bind(this);
    this.setBreakStage = this.setBreakStage.bind(this);
  }

  clockify() {
    let minutes = this.state.minutes;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let seconds = this.state.seconds;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }

  handleClickPlay({ target }) {
    if (this.state.playing) {
      this.timerPause();
    } else {
      this.timerPlay();
    }
  }

  timerPause() {
    this.setState({
      playing: false });


    clearInterval(this.timer);

    this.playBtn.classList.remove("fa-pause");
    this.playBtn.classList.add("fa-play");
  }

  timerPlay() {
    this.setState({
      playing: true,
      editable: false });


    this.timer = setInterval(() => {
      this.decrementTimer();
    }, 1000);

    this.playBtn.classList.add("fa-pause");
    this.playBtn.classList.remove("fa-play");
  }

  decrementTimer() {
    if (this.state.seconds == 0) {
      if (this.state.minutes == 0) {
        this.finished();
      } else {
        this.setState({
          minutes: this.state.minutes - 1,
          seconds: 59 });

      }
    } else {
      this.setState({ seconds: this.state.seconds - 1 });
    }
  }

  finished() {
    this.audio.play();
    this.toggleStage();
  }

  toggleStage() {
    if (this.state.stage == "Session") {
      this.setBreakStage();
    } else {
      this.setSessionStage();
    }
  }

  setSessionStage() {
    this.setState({
      stage: "Session",
      minutes: this.state.sessionLen,
      seconds: 0 });

  }

  setBreakStage() {
    this.setState({
      stage: "Break",
      minutes: this.state.breakLen,
      seconds: 0 });

  }

  timerReset() {
    this.setState({
      minutes: this.state.sessionLen,
      seconds: 0,
      editable: true,
      stage: "Session" });

    this.timerPause();
  }

  setSessionLen(value) {
    this.setState({
      sessionLen: value,
      minutes: value });

  }

  setBreakLen(value) {
    this.setState({ breakLen: value });
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "clock" }, /*#__PURE__*/
      React.createElement("h1", { id: "title" }, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement("div", { id: "clock-inputs" }, /*#__PURE__*/
      React.createElement(TimerLengthControl, {
        value: this.props.initSessionLen,
        title: "Session Length",
        onTimerChange: this.setSessionLen,
        editable: this.state.editable }), /*#__PURE__*/

      React.createElement(TimerLengthControl, {
        value: this.props.initBreakLen,
        title: "Break Length",
        onTimerChange: this.setBreakLen,
        editable: this.state.editable })), /*#__PURE__*/


      React.createElement("div", { id: "timer-container" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-box" }, /*#__PURE__*/
      React.createElement("p", { id: "timer-description" }, this.state.stage), /*#__PURE__*/
      React.createElement("p", null, this.clockify())), /*#__PURE__*/

      React.createElement("div", { id: "timer-tools" }, /*#__PURE__*/
      React.createElement("div", { id: "play-btn", className: "btn" }, /*#__PURE__*/
      React.createElement("i", {
        ref: btn => this.playBtn = btn,
        className: "fas fa-play",
        onClick: this.handleClickPlay })), /*#__PURE__*/

      React.createElement("div", { id: "restart-btn", className: "btn" }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-undo", onClick: this.timerReset })))), /*#__PURE__*/



      React.createElement("audio", {
        ref: audio => this.audio = audio,
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



  }}


class TimerLengthControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value };


    this.setValue = this.setValue.bind(this);
  }

  setValue(value) {
    this.setState({
      value: value });

    this.props.onTimerChange(value);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "timerLengthControl" }, /*#__PURE__*/
      React.createElement("div", { className: "timerInfo" }, /*#__PURE__*/
      React.createElement("div", { className: "timerTitle" }, /*#__PURE__*/React.createElement("p", null, this.props.title)), /*#__PURE__*/
      React.createElement("div", { className: "timerValue" }, /*#__PURE__*/React.createElement("p", null, this.state.value))), /*#__PURE__*/

      React.createElement("input", {
        type: "range",
        min: "1",
        max: "59",
        className: this.props.editable ? "timerSlider" : "timerSlider disabled",
        value: this.state.value,
        onChange: e => this.setValue(e.target.value) })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));