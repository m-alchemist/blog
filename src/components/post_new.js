import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostNew extends Component{
  renderField(field){
    const {meta:{touched,error} }=field;
    //field.meta
    const className=`form-group ${touched && error  ?'has-danger':''} `
    return (
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input className='form-control'
        type='text'
          {... field.input}
         />
          <div className='text-help'>
          {touched? error: ''}

            </div>
      </div>
    )

  }
  onSubmit(values){
    //this ==component
    this.props.createPost(values,()=>{
        this.props.history.push("/");


    })
  }
  render(){
    const{handleSubmit}=this.props;

    return (
    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <Field
      label="Title"
      name="title"
      component={this.renderField}
      />
      <Field
      label="Categories"
      name="categories"
      component={this.renderField}
      />
      <Field
      label="Post Content"
      name="content"
      component={this.renderField}
      />
      <button type="submit" className='btn btn-primary'>
      Submit
      </button>

        <Link to="/" className="btn btn-danger"> Cancel </Link>
    </form>
    )
  }
}
function validate (values){
//console.log
const errors={}
//validate input from values
if(!values.title){
  errors.title="enter a title"
}


if(!values.categories){
  errors.categories="enter a categories"
}
if(!values.content){
  errors.content="enter a content"
}

// if errors is  empty the form is fine to submit
// if errors of any property redux form assumes invalud

return errors;
}
export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(null,{createPost})(PostNew)
);
