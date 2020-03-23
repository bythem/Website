import React, { Component } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";


class GalleryU extends Component {
    constructor(props) {
      super(props);
      this.state = {
       validate: false,
    viewerIsOpen: false,
      modalIsOpen: false
  
      }
    };
  componentDidMount = () => {
  }
  //  openLightbox = (event,{index}) => {
  //   this.viewerIsOpen(true,index);
  // }

  openLightbox = (i) => {
    
    this.viewerIsOpen(true,i);
  }
  viewerIsOpen = (bool,index) => {
    // setCurrentImage(index);
    // setViewerIsOpen(true);

    this.setState({modalIsOpen:bool,currentIndex:index})
  }

   closeLightbox = () => {
    this.setState({modalIsOpen:false,currentIndex:0})
  }



  render() {
    const  currentIndex  = this.state.currentIndex;
      return (
            <div>
              <Gallery>
            {this.props.images.map(({ src }, j) => (
              <Image onClick={() => this.openLightbox(j)} key={src}>
                <div style={{backgroundImage:`url(${src})`,height:'200px',backgroundPosition:'center',backgroundSize:'cover'}}></div>
                
              </Image>
            ))}
          </Gallery>
          <ModalGateway>
            {this.state.modalIsOpen ? (
              <Modal onClose={this.closeLightbox}>
                <Carousel views={this.props.images} currentIndex={currentIndex} />
              </Modal>
            ) : null}
          </ModalGateway>
            </div>
          );
      
  }
  
}

const Gallery = (props) => (
  <div
    style={{
      overflow: 'hidden',
      marginLeft: -gutter,
      marginRight: -gutter,
    }}
    {...props}
  />
);


const gutter = 2;
const Image = (props) => (
  <div
    style={{
      backgroundColor: '#eee',
      boxSizing: 'border-box',
      backgroundPosition:'center',
      float: 'left',
      margin: gutter,
      overflow: 'hidden',
      height: '200px',
      paddingBottom: '16%',
      position: 'relative',
      width: `calc(33.33% - ${gutter * 2}px)`,

      ':hover': {
        opacity: 0.9,
      },
    }}
    {...props}
  />
);

export default  GalleryU;