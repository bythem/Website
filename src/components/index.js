import React, {Component} from "react";
import ReactTypingEffect from "react-typing-effect";


class IndexPage extends Component {
  

  componentDidMount = () =>{
    document.title = "THEM ";
  }

  render(){
    return(

      <div className="container index-page text-center">
        <div className="row h-100">
          <div className="col-12 my-auto">
            <h1 className="">
               <ReactTypingEffect className="typing-effect"
                text={["Hello!!", "We Design Beautiful Interiors!!"]}
              /> 
              <br />
              
            </h1>
            {/* <Link to="/about" className="btn btn-primary mt-5" >
              Know More About Me
      </Link> */}
          </div>
        </div>
    
    </div>
    )

  }

 
  
 
};

export default IndexPage;