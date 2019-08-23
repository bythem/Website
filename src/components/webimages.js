import React, {Component}  from "react";
import { fbStorage} from '../firebase';

class WebImages extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
           images: ''
        }
        this.updateState = this.updateState.bind(this);
     };
     updateState(e) {
        this.setState({s_name: this.refs.s_name.value, s_description: this.refs.s_description.value});
     }

    componentWillMount = () => {
        let temp = [];
        let tempLocation = [];
        fbStorage.ref("images").listAll().then((res) => {
            res.items.map((images) => {
                images.getDownloadURL().then(url => {
                   tempLocation[tempLocation.length] = images.location.path_;
                   temp[temp.length] = url;
                   this.setState({images: temp});
                   this.setState({imageLocation: tempLocation});
                })
            })
        })
    }

    deleteImage = (key) =>{
        let imageL =  this.state.imageLocation;
        if (window.confirm('Are you sure you want to delete?')) 
        {
            fbStorage.ref().child(imageL[key]).delete().then(function() {
                // File deleted successfully
                alert("successfully deleted !!")
                window.location.reload();
              }).catch(function(error) {
                // Uh-oh, an error occurred!
                alert(error.message)
              });
        }
    }

    

  render() {
    return (
    <React.Fragment>
            <div className="container page-content">
                <div className="row images-div">
                   
                   {this.state.images && this.state.images.map((url,key) => {
                       return(
                           <div className="col-6">
                              <a href={url} target="_blank"> <img src={url} className="img img-fluid"/></a>
                              <button className="btn btn-danger mt-2" onClick={() => {this.deleteImage(key)}}>DELETE</button>
                           </div>
                       )
                   }
                     )}
                        
                </div>
            </div>

      </React.Fragment>
    );
  }
};

export default WebImages;