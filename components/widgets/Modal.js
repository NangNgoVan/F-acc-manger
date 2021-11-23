import React from 'react'

export const CONFIRM = "confirm"

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        }
        this.onConfirmButtonClick = this.onConfirmButtonClick.bind(this);
    }
    onConfirmButtonClick(accept = false) {
        //
        if (this.props.onConfirm)
            return this.props.onConfirm(accept);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.open != this.state.open) {
            this.setState({
                ...this.state, open: nextProps.open
            })
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className={this.props.open?"modal fade in":"modal fade"} style={{ display: this.props.open ? "block" : "none" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={(e)=>this.onConfirmButtonClick()}>
                                ×
                            </button>
                            <h5>{this.props.title}</h5>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" 
                                onClick={(e)=>this.onConfirmButtonClick()}>Hủy</button>
                            <button type="button" className="btn btn-primary"
                                onClick={(e)=>this.onConfirmButtonClick(true)}>Đồng ý</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        if (props.modalType == CONFIRM) {
            return (
                <ConfirmModal {...props} />
            );
        }
        return null;
    }
}

export default Modal;
