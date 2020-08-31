import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'

export default class CreateSnippet extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            snippet_short_description: '',
            snippet_description: '',
            snippet_author: '',
            snippet_tags: '',
            snippet_code: ''
        }

        this.onChangeSnippetShortDescription = this.onChangeSnippetShortDescription.bind(this);
        this.onChangeSnippetDescription = this.onChangeSnippetDescription.bind(this);
        this.onChangeSnippetAuthor = this.onChangeSnippetAuthor.bind(this);
        this.onChangeSnippetTags = this.onChangeSnippetTags.bind(this);
        this.onChangeSnippetCode = this.onChangeSnippetCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:4000/codesnippets/')
            .then(response => {
                this.setState({ codesnippets: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    onChangeSnippetShortDescription(e){
        this.setState({
            snippet_short_description: e.target.value
        });
    }

    onChangeSnippetDescription(e){
        this.setState({
            snippet_description: e.target.value
        });
    }

    onChangeSnippetAuthor(e){
        this.setState({
            snippet_author: e.target.value
        });
    }

    onChangeSnippetTags(e){
        this.setState({
            snippet_tags: e.target.value
        });
    }

    onChangeSnippetCode(e){
        this.setState({
            snippet_code: e.target.value
        });
    }

    onSubmit(e){
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
            snippet_description: '',
            snippet_author: '',
            snippet_tags: '',
            snippet_code: ''
        });
    }
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Short Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.snippet_short_description}
                                onChange={this.onChangeSnippetShortDescription}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
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
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.snippet_tags}
                                onChange={this.onChangeSnippetTags}
                                />
                    </div>
                    <div className="form-group">
                        <label>Code: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.snippet_code}
                                onChange={this.onChangeSnippetCode}
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