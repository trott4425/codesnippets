import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";

import AsyncSelect from 'react-select/async';

export default class CreateSnippet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snippet_short_description: '',
            snippet_description: '',
            snippet_author: '',
            snippet_tags: null,
            snippet_code: ''
        }

        this.state.available_tags = [];

        this.onChangeSnippetShortDescription = this.onChangeSnippetShortDescription.bind(this);
        this.onChangeSnippetDescription = this.onChangeSnippetDescription.bind(this);
        this.onChangeSnippetAuthor = this.onChangeSnippetAuthor.bind(this);
        this.onChangeSnippetTags = this.onChangeSnippetTags.bind(this);
        this.onChangeSnippetCode = this.onChangeSnippetCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

    }



    onChangeSnippetShortDescription(e) {
        this.setState({
            snippet_short_description: e.target.value
        });
    }

    onChangeSnippetDescription(e) {
        this.setState({
            snippet_description: e.target.value
        });
    }

    onChangeSnippetAuthor(e) {
        this.setState({
            snippet_author: e.target.value
        });
    }

    onChangeSnippetTags = value => {
        console.log(value);
        if(value){
            this.setState({ snippet_tags: value });
        }
        return value;
    }

    loadOptions = inputValue => {
        return new Promise((resolve, reject) => {
            // using setTimeout to emulate a call to server
            axios.get('http://127.0.0.1:4000/tags/')
            .then((response) => {
                return response.data;
            })
            .then(data => {
                console.log(data);
                let tagsFromApi = data.map(tag => {
                    return { value: tag.tag_name, label: tag.tag_name }
                });
                console.log(tagsFromApi);
                resolve(tagsFromApi);

            }).catch(error => {
                console.log(error);
            });
        });
    };

    onChangeSnippetCode(value) {
        this.setState({
            snippet_code: value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('Form submitted:');
        console.log(`Snippet Description: ${this.state.snippet_description}`);
        console.log(`Snippet Responsible: ${this.state.snippet_author}`);
        console.log(`Snippet tags: ${this.state.snippet_tags}`);
        console.log(`Snippet code: ${this.state.snippet_code}`);

        const newSnippet = {
            snippet_short_description: this.state.snippet_short_description,
            snippet_description: this.state.snippet_description,
            snippet_author: this.state.snippet_author,
            snippet_tags: this.state.snippet_tags,
            snippet_code: this.state.snippet_code
        };

        axios.post('http://127.0.0.1:4000/codesnippets/add', newSnippet)
            .then(res => console.log(res.data));


        this.setState({
            snippet_short_description: '',
            snippet_description: '',
            snippet_author: '',
            snippet_tags: null,
            snippet_code: ''
        });
    }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Short Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.snippet_short_description}
                            onChange={this.onChangeSnippetShortDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.snippet_description}
                            onChange={this.onChangeSnippetDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.snippet_author}
                            onChange={this.onChangeSnippetAuthor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tags: </label>
                        <AsyncSelect
                            value={this.state.snippet_tags}
                            cacheOptions
                            loadOptions={this.loadOptions}
                            defaultOptions
                            onInputChange={this.onChangeSnippetTags}
                        />
                    </div>
                    <div className="form-group">
                        <label>Code: </label>
                        <AceEditor
                            mode="javascript"
                            theme="textmate"
                            onChange={this.onChangeSnippetCode}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                            value={this.state.snippet_code}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Snippet" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}