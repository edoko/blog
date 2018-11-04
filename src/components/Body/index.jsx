import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import List from "../List";
import PostList from "../PostList";

export default class Body extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col xs="3">
              <List />
            </Col>
            <Col xs="9">
              <PostList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
