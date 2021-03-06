import React, { Component } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Snippet = props => (
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey={props.snippet._id}>
        {props.snippet.snippet_description}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={props.snippet._id}>
      <Card.Body>
        <table>
          <tbody>
            <tr>
              <th className="meta-data-column-title">Author</th><td>{props.snippet.snippet_author}</td>
            </tr>
            <tr>
              <th className="meta-data-column-title">Tags</th><td>{props.snippet.snippet_tags}</td>
            </tr>
            <tr>
              <th colSpan="2" scope="row">
                Code
                    <div className="codeBox overflow-auto">
                  <SyntaxHighlighter language="javascript" style={docco}>
                    {props.snippet.snippet_code}
                  </SyntaxHighlighter>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
)


export default class SnippetList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      codesnippets: [],
      filteredSnippets: [],
      search: ''
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:4000/codesnippets/')
      .then(response => {
        this.setState({ 
          codesnippets: response.data,
          filteredSnippets: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  filterSnippets = (e) => {
    const value = e.target.value;
    const filteredSnippets = this.state.codesnippets.filter((snippet) => {
      console.log("Checking for snippet");
      return (snippet.short_description && snippet.snippet_description.includes(value)) || 
        (snippet.snippet_short_description && snippet.snippet_short_description.includes(value)) || 
        (snippet.snippet_code && snippet.snippet_code.includes(value));
    });

    this.setState({
      filteredSnippets: filteredSnippets,
      search: value
    })
  }

  snippetList() {
    return this.state.filteredSnippets.map(function (currentSnippet, i) {
      return <Snippet snippet={currentSnippet} key={i} value={i} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Snippets</h3>
        <div className="md-form active-cyan-2 mb-3">
          <input 
            className="form-control" 
            type="text" 
            placeholder="Search" 
            aria-label="Search"
            onChange={this.filterSnippets} />
        </div>
        <Accordion defaultActiveKey="0">
          {this.snippetList()}
        </Accordion>
      </div>
    )
  }
}