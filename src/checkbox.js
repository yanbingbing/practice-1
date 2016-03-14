require('./checkbox.less');
const Icon = require('icon');

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {actived: this.props.actived};
    }
    render() {
        let className = "mycheckbox" + (this.state.actived ? " actived" : "");
        let onClick = () => {
            this.setState({actived:!this.state.actived})
        };
        return <a className={className} onClick={onClick}>
            <Icon name="check" className="checkIcon" />
        </a>;
    }
}

ReactDOM.render(<Checkbox />, document.getElementById('demo2'));