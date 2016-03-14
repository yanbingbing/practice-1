require('./icons.less');
const ReactDOM = require('react-dom');
const Icon = require('icon');

ReactDOM.render(<div>
    <Icon name="smile" className="emoji smile" />
    <Icon name="cry" className="emoji cry" />
    <Icon name="angry" className="emoji angry" />
    <Icon name="happy" className="emoji happy" />
</div>, document.getElementById('demo1'));