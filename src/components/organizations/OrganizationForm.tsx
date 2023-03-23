import React, { Component, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

type Props = {
  orgHandler: (org: object) => void;
  orgList: any;
  updateHandler: (org: object) => void;
  formUpdate?: boolean;

  closeEditHandler: () => void;
  closeCreateHandler: () => void;
};

type State = {
  id: string;
  name: string;
  parent: string;
  type: string;
  status: string;
};

class OrganizationForm extends Component<Props, State> {
  state = {
    id: this.props.orgList.id || uuidv4(),
    name: this.props.orgList.name || "",
    parent: this.props.orgList.parent || "",
    type: this.props.orgList.type || "",
    status: this.props.orgList.status || "",
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  addOrg = (e: any) => {
    this.setState({
      id: uuidv4(),
    });
    e.preventDefault();
    this.props.orgHandler(this.state);
    this.props.closeCreateHandler();
  };

  update = () => {
    this.props.updateHandler(this.state);
    this.props.closeEditHandler();
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addOrg}>
          <Form.Group className="mb" controlId="">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              placeholder="Organization Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb" controlId="">
            <Form.Label>Parent Organization Name</Form.Label>
            <Form.Select
              aria-label="Select"
              value={this.state.parent}
              onChange={(e) => this.setState({ parent: e.target.value })}
              required
            >
              <option defaultValue="Select">Select</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Vodafone">Vodafone</option>
              <option value="Apple">Apple</option>
              <option value="HCL">HCL</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb" controlId="formBasicType">
            <Form.Label>Type</Form.Label>
            <Form.Select
              aria-label="Select"
              value={this.state.type}
              onChange={(e) => this.setState({ type: e.target.value })}
              required
            >
              <option defaultValue="Select">Select</option>
              <option value="Company">Company</option>
              <option value="Branch">Branch</option>
              <option value="Department">Department</option>
              <option value="BYOx Fed">BYOx Fed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb" controlId="formBasicEmail">
            <Form.Label>Organization Status</Form.Label>
            <Form.Select
              aria-label="Select"
              value={this.state.status}
              onChange={(e) => this.setState({ status: e.target.value })}
              required
            >
              <option defaultValue="Select">Select</option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            {this.props.formUpdate ? (
              <>
                <Button
                  variant="outline-secondary"
                  className="modal-btn"
                  onClick={this.props.closeEditHandler}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="modal-btn"
                  type="button"
                  onClick={this.update}
                  // onSubmit={this.update}
                >
                  Edit Organization
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-secondary"
                  className="modal-btn"
                  onClick={this.props.closeCreateHandler}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="modal-btn"
                  type="submit"
                  // onClick={this.addOrg}
                  onSubmit={this.addOrg}
                >
                  Create Organization
                </Button>
              </>
            )}
          </Modal.Footer>
        </Form>
      </div>
    );
  }
}

export default OrganizationForm;
