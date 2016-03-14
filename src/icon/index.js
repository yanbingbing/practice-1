require('./index.less');
const React = require('react');

function getIcon(name) {
    try {
        return require('./svgs/' + name + '.svg');
    } catch (ex) {
        return null;
    }
}

class Icon extends React.Component {
    render() {
        let SvgIcon = getIcon(this.props.name);
        if (!SvgIcon) {
            return null;
        }
        return <SvgIcon className={"icon" + (this.props.className ? ` ${this.props.className}` : '')} />
    }
}

module.exports = Icon;