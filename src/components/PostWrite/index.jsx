import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import axios from "axios";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class PostWrite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      editorState: EditorState.createEmpty()
    };
  }

  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.PostStore.createPost(
      this.state.title,
      JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  };

  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  uploadImageCallback = image => {
    let formData = new FormData();
    formData.append("imgFile", image);

    return axios
      .post("http://localhost:3001/upload/create", formData)
      .then(res => {
        console.log(res.data);
        return { data: res.data };
      })
      .catch(err => {
        console.error(err);
        console.log("error");
        throw err;
      });
  };

  render() {
    return (
      <div>
        <Container py="4">
          <Row>
            <Col xs="12">
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">제목</Label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="제목을 입력하세요."
                    onChange={this.onChange}
                  />
                  <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                      image: { uploadCallback: this.uploadImageCallback }
                    }}
                    localization={{
                      locale: "ko"
                    }}
                  />
                </FormGroup>
                <Button type="submit">글쓰기</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
